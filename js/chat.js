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

// Sample prompt list for randomised 
const prompts = [
    { prompt: "Do Integrated Shield Plans cover cancer treatment?" },
    { prompt: "Are outpatient treatments covered under IPs?" },
    { prompt: "Do IPs cover psychiatric hospitalisation?" },
    { prompt: "What are typical exclusions in IPs?" },
    { prompt: "Can I view my Integrated Shield Plan online?" },
    { prompt: "Can AI help me choose the right Integrated Shield Plan?" },
    { prompt: "I travel often. Can IPs cover overseas treatments?" },
    { prompt: "What should I consider before buying an Integrated Shield Plan?" },
    { prompt: "What is an Integrated Shield Plan?"},
    { prompt: "How many authorized Integrated Shield Plan (ISP) providers are there in Singapore?"},
    { prompt: "What are the authorized Integrated Shield Plan (ISP) providers are there in Singapore?"},
    { prompt: "What is an integrated shield plan?"},
    { prompt: "What is mediShield life?"},
    { prompt: "What is outpatient treatment?"},
    { prompt: "Can Integrated Shield Plans cover specialist consultations?"},
    { prompt: "Are day surgeries covered under Integrated Shield Plans?"},
    { prompt: "What is the claim process for an Integrated Shield Plan?"},
    { prompt: "What is a panel doctor in an Integrated Shield Plan?"},
    { prompt: "Do Integrated Shield Plans cover cancer treatment?"},
    { prompt: "Can I claim for traditional Chinese medicine (TCM) under an Integrated Shield Plan?"},
    { prompt: "What is the minimum age to be covered under an Integrated Shield Plan?"}
];

// Function to randomly pick and show buttons
function generateRandomButtons(count = 4) {
    const container = document.getElementById("suggestedButtons");
    container.innerHTML = ""; // clear previous buttons

    const shuffled = prompts.sort(() => 0.5 - Math.random()).slice(0, count);

    shuffled.forEach(({ prompt }) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-light btn-sm";
        btn.innerText = prompt;
        btn.onclick = () => {
            document.getElementById("userInput").value = prompt;
            sendMessage();
        };
        container.appendChild(btn);
    });
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
    generateRandomButtons(); // show prompt buttons on page load
    document.getElementById('userInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
});