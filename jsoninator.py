




# this loads datasets and puts them in json format 
# rmb to add the dataset to the model 



from datasets import load_dataset
import json

# Load the dataset (train split is usually enough for fine-tuning or embedding)
dataset = load_dataset("openai/gsm8k", "main")["train"]

# View one sample
converted = []
for entry in dataset:
    converted.append({"prompt": entry["question"],"response": entry["answer"]})


# Save it to a file
with open("dataset/basic-maths.json", "w", encoding="utf-8") as f:
    json.dump(dataset, f, indent=2)

