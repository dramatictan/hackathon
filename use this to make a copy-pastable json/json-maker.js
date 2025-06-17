document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("jsoner");
  const outputDiv = document.getElementById("json");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); 

    const prompt = document.getElementById("prompt").value.trim();
    const response = document.getElementById("response").value.trim();

    var formatted =''
    if (prompt && response) {
      formatted += `{"prompt":"${prompt.replace(/"/g, '\\"')}","response":"${response.replace(/"/g, '\\"')}"},`;

      const para = document.createElement("pre");
      para.textContent = formatted;
      outputDiv.appendChild(para);

      document.getElementById("prompt").value = "";
      document.getElementById("response").value = "";
    } else {
      alert("Please fill in both Prompt and Response.");
    }
  });
});



document.getElementById("copyBtn").addEventListener("click", () => {
  const jsonDiv = document.getElementById("json");
  const textToCopy = Array.from(jsonDiv.querySelectorAll("pre"))
    .map(pre => pre.textContent)
    .join("\n");

  if (!textToCopy.trim()) {
    alert("No entries to copy!");
    return;
  }

  navigator.clipboard.writeText(textToCopy)
    .then(() => alert("Copied to clipboard!"))
    .catch(err => alert("Failed to copy: " + err));
});
