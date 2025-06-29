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
    { prompt: "Hospital Care and Financial Planning Roadmap Graph"},
    { prompt: "A financial roadmap infographic showing key milestones in Integrated Shield Plans coverage"},
    { prompt: "An infographic comparing different Integrated Shield Plan providers in Singapore with icons, benefits, premiums, and exclusions"},
    { prompt: "A hospital bed with a shield symbol and a chart explaining cost coverage levels for government vs private hospitals"},
    { prompt: "A step-by-step infographic titled 'How to choose your Integrated Shield Plan"},
    { prompt: "Tablet with visual charts of insurance coverage for Singaporeans"},
    { prompt: "Flowchart explaining the difference between MediShield Life and Integrated Shield Plans" },
    { prompt: "Visual comparison of monthly premiums across different age groups for Singaporean ISPs" },
    { prompt: "Infographic showing what happens when you get hospitalized and how ISPs help pay" },
    { prompt: "A modern infographic comparing ISP riders and add-ons with prices and benefits" },
    { prompt: "A hospital-to-home recovery journey chart, covered by different Shield Plans" },
    { prompt: "Timeline showing ISP claim process from admission to reimbursement" },
    { prompt: "Infographic explaining which treatments are covered by public vs private hospitals under ISP" },
    { prompt: "Icons and diagrams explaining common terms in insurance: deductible, co-insurance, premiums" },
    { prompt: "Smartphone screen showing a virtual insurance agent with ISP options" },
    { prompt: "A decision tree infographic titled 'Which Shield Plan is Right for You?'" },
    { prompt: "Chart comparing claims limit and coverage tiers among top 5 ISPs in Singapore" },
    { prompt: "Friendly cartoon doctor explaining ISP to a family using a whiteboard" },
    { prompt: "Professional visual for a government healthcare support system tied to ISPs" },
    { prompt: "A Singaporean family planning healthcare finances with visual aid on a tablet" }
]

function generateRandomImgPrompt(count = 5) {
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