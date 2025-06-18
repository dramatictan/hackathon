from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForQuestionAnswering
from sentence_transformers import SentenceTransformer, util
import torch
import json
import re

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# model loading and dataset loading here...
qa_model_name = "distilbert-base-uncased-distilled-squad"
tokenizer = AutoTokenizer.from_pretrained(qa_model_name)
model = AutoModelForQuestionAnswering.from_pretrained(qa_model_name)
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

dataset1 = load_json("dataset/dataset.json")
dataset2 = load_json("dataset/basic-logic.json")
dataset3 = load_json("dataset/basic-logic2.json")
dataset4 = load_json("dataset/gsm8k_converted.json")
dataset = dataset1 + dataset2 + dataset3 + dataset4
prompts = [entry["prompt"] for entry in dataset]
prompt_embeddings = embedding_model.encode(prompts, convert_to_tensor=True)

def is_simple_math(expr):
    return bool(re.fullmatch(r"[0-9+\-*/(). ]+", expr.strip()))

def extract_math_expression(text):
    match = re.search(r"\d+(\s*[\+\-\*/]\s*\d+)+", text)
    return match.group(0) if match else None

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("prompt", "").strip()
    print("USER INPUT:", user_input)

    math_expr = extract_math_expression(user_input)
    if math_expr and is_simple_math(math_expr):
        try:
            result = eval(math_expr)
            return jsonify({"response": str(result)})
        except:
            pass

    exact_match = next(
        (item for item in dataset if item["prompt"].strip().lower() == user_input.lower()),
        None
    )
    if exact_match:
        return jsonify({"response": exact_match["response"]})

    input_embedding = embedding_model.encode(user_input, convert_to_tensor=True)
    hits = util.semantic_search(input_embedding, prompt_embeddings, top_k=1)[0]
    top_hit = dataset[hits[0]["corpus_id"]]
    context = top_hit["response"]

    qa_input = tokenizer.encode_plus(user_input, context, return_tensors="pt")
    output = model(**qa_input)
    start = torch.argmax(output.start_logits)
    end = torch.argmax(output.end_logits) + 1

    reply = tokenizer.convert_tokens_to_string(
        tokenizer.convert_ids_to_tokens(qa_input["input_ids"][0][start:end])
    )

    if reply.strip() in ["<s>", "", tokenizer.cls_token]:
        reply = "Sorry, I couldn't find a good answer."

    print("SELECTED CONTEXT:", context)
    print("RAW MODEL OUTPUT:", reply)

    return jsonify({"response": reply})

@app.route("/")
def serve_index():
    return send_from_directory(".", "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)
