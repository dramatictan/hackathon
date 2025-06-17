from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForQuestionAnswering
from sentence_transformers import SentenceTransformer, util
import torch, json

app = Flask(__name__)
CORS(app)

model_name = "deepset/roberta-base-squad2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForQuestionAnswering.from_pretrained(model_name)

embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

with open(r'dataset\dataset.json') as f:
    dataset = json.load(f)

prompts = [entry["prompt"] for entry in dataset]
prompt_embeddings = embedding_model.encode(prompts, convert_to_tensor=True)

# Main endpoint
@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json["prompt"]

    input_embedding = embedding_model.encode(user_input, convert_to_tensor=True)
    top_k = 1
    hits = util.semantic_search(input_embedding, prompt_embeddings, top_k=top_k)[0]

    context_blocks = [dataset[hit["corpus_id"]]["response"] for hit in hits]
    context = "\n\n".join(context_blocks)

    qa_input = tokenizer.encode_plus(user_input, context, return_tensors="pt")
    output = model(**qa_input)

    start = torch.argmax(output.start_logits)
    end = torch.argmax(output.end_logits) + 1

    reply = tokenizer.convert_tokens_to_string(
        tokenizer.convert_ids_to_tokens(qa_input["input_ids"][0][start:end])
    )

    return jsonify({"response": reply})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
