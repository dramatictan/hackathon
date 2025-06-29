document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('messageInput');
    if (input) {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                generateImages();
            }
        });
    }

    generateRandomImgPrompt();
});


const prompts = [
    {prompt: "Hospital Care and Financial Planning Roadmap Graph"},
    {prompt: "A financial roadmap infographic showing key milestones in Integrated Shield Plans coverage"},
    {prompt: "An infographic comparing different Integrated Shield Plan providers in Singapore with icons, benefits, premiums, and exclusions"},
    {prompt: "A hospital bed with a shield symbol and a chart explaining cost coverage levels for government vs private hospitals"},
    {prompt: "A step-by-step infographic titled 'How to choose your Integrated Shield Plan"},
    {prompt: "Tablet with visual charts of insurance coverage for Singaporeans"}
]

function generateRandomImgPrompt(count = 3) {
    const container = document.getElementById("suggestedButtons");
    container.innerHTML = "";

    const shuffled = prompts.sort(() => 0.5 - Math.random()).slice(0, count);
    shuffled.forEach(({ prompt }) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-light btn-sm";
        btn.innerText = prompt;
        btn.onclick = () => {
            document.getElementById("messageInput").value = prompt;
            generateImages();
        };
        container.appendChild(btn);
    });
}