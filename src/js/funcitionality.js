// Keyboard shortcuts for navigation and resume
export function initfuncShortcuts() {
    document.addEventListener("keydown", function (e) {
        const isTyping =
            e.target.tagName === 'INPUT' ||
            e.target.tagName === 'TEXTAREA' ||
            e.target.isContentEditable;

        if (isTyping) return;

        // Keyboard shortcuts
        switch (e.key.toLowerCase()) {
            case 'h':
                document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                break;
            case 'm':
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                break;
            case 'b':
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                break;
            case 's':
                document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
                break;
            case 'c':
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                break;
            case 'f':
                window.location.href = "hall-of-fame.html";
                break;
            case 'r':
                // Open resume overlay
                const resumeOverlay = document.getElementById("resumeOverlay");
                const resumeControls = document.getElementById("resumeControls");
                if (resumeOverlay && resumeOverlay.classList.contains('hidden')) {
                    resumeOverlay.classList.remove('hidden');
                    if (resumeControls) resumeControls.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                    const navbar = document.getElementById('mainNav');
                    if (navbar) navbar.style.display = 'none';
                }
                break;
        }
    });
}


