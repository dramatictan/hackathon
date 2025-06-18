from datasets import load_dataset
import json
import os

os.makedirs("dataset", exist_ok=True)

# Load BoolQ train split explicitly
dataset = load_dataset("google/boolq", split="train")

converted = []
for entry in dataset:
    answer_text = "true" if entry["answer"] else "false"
    converted.append({
        "prompt": entry["question"],
        "response": answer_text
    })

# Save converted to a JSON file
with open("dataset/basic-logic2.json", "w", encoding="utf-8") as f:
    json.dump(converted, f, indent=2)
