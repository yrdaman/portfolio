let emailjsLoaded = false;
let emailjsLoadPromise = null;

function loadEmailJS() {
    if (emailjsLoadPromise) return emailjsLoadPromise;
    
    emailjsLoadPromise = new Promise((resolve, reject) => {
        if (window.emailjs) {
            emailjsLoaded = true;
            window.emailjs.init("c-ECyzHypb5LFJUIo");
            resolve(window.emailjs);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        
        script.onload = () => {
            if (window.emailjs) {
                emailjsLoaded = true;
                window.emailjs.init("c-ECyzHypb5LFJUIo");
                resolve(window.emailjs);
            } else {
                reject(new Error('EmailJS failed to initialize'));
            }
        };
        
        script.onerror = () => reject(new Error('EmailJS script failed to load'));
        
        document.head.appendChild(script);
    });
    
    return emailjsLoadPromise;
}

export function initEmailForm() {
    const form = document.getElementById("contactForm");
    const statusBox = document.getElementById("quoteBox");
    if (!form) return;
    const btn = form.querySelector("button[type='submit']");

    // Start loading EmailJS immediately (don't await)
    loadEmailJS().catch(err => {
        console.warn('EmailJS preload failed:', err);
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = form.querySelector("#name").value.trim();
        const email = form.querySelector("#email").value.trim();
        const message = form.querySelector("#message").value.trim();

        // --- Validation ---
        if (!name || !email || !message) {
            return showStatus("⚠️ Please fill in all fields.", true);
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return showStatus("⚠️ Invalid email format.", true);
        }

        // --- Disable button while sending ---
        btn.disabled = true;
        const originalText = btn.textContent;
        btn.textContent = "Sending...";

        try {
            // Wait for EmailJS to load if not already loaded
            const emailjs = await loadEmailJS();
            
            await emailjs.send("service_lftffba", "template_76imdng", {
                name: name,
                email: email,
                message: message,
                to_email: "yrdaman196+portfolio@gmail.com",
                reply_to: email,
                subject: "📩 Message From Portfolio ⚡",
            });

            showStatus("✅ Message sent successfully!", false);
            form.reset();
        } catch (err) {
            console.error("EmailJS Error:", err);
            showStatus("❌ Failed to send. Try again later.", true);
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    });

    function showStatus(text, isError) {
        if (!statusBox) return alert(text);
        statusBox.textContent = text;
        statusBox.style.color = isError ? "#b91c1c" : "#064e3b";
        statusBox.style.background = isError ? "#fee2e2" : "#d1fae5";
        setTimeout(() => {
            statusBox.textContent = "";
            statusBox.style.background = "";
            statusBox.style.color = "";
        }, 4000);
    }
}
