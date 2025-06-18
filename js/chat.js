function appendMessage(sender, message) { 
    const responseBox = document.getElementById("responseBox"); // Get responseBox from index.html
    const messageRow = document.createElement("div"); // We want to stack messages, so we create a div
    messageRow.className = "message-row"; // Add class of 'message-row'

    let nameSpan = document.createElement("span"); // Span for the name, so we can wrap it around with a coloring
    if (sender === "user") {
        nameSpan.className = "username"; // Refer to styles.css for username color
        nameSpan.innerText = "You:"; // If sender is user, add "You:"
    } else {
        nameSpan.className = "ainame"; 
        nameSpan.innerText = "AI:";
    }

    let msgSpan = document.createElement("span"); 
    msgSpan.innerText = message;

    messageRow.appendChild(nameSpan); // Add username or ai name
    messageRow.appendChild(msgSpan); // Add the message displayed by that entity
    responseBox.appendChild(messageRow); // Stack messages
    responseBox.scrollTop = responseBox.scrollHeight; // Can scroll the messages 
}

function sendMessage() {
    const inputElem = document.getElementById("userInput"); // Select userInput from index.html
    const input = inputElem.value.trim();
    if (!input) return;

    appendMessage("user", input); // sender is user, input is the message 
    inputElem.value = ""; // Clear input box 

    fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }) // We send our input prompt to the AI backend
    })
    .then(res => res.json())
    .then(data => {
        appendMessage("ai", data.response); // Show AI response, sender is now AI, the msg is the data.response
    });
}

// Allow Enter key to send
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('userInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
});