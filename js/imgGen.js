document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('messageInput');
    if (input) {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                generateImages();
            }
        });
    }
});