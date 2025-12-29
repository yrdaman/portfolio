// ==============================================
// 1. IMPORTS (Crucial for Vite)
// ==============================================
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

// Register plugins on whichever gsap instance is being used at runtime.
// In dev environments we may have a global CDN-loaded `window.gsap` and
// also a bundled `gsap` import; ensure we register plugins on the global
// instance if it exists so scrollTrigger is available to code that uses
// the global gsap (avoids "Missing plugin? gsap.registerPlugin()" errors).
if (typeof window !== 'undefined' && window.gsap) {
    try {
        // prefer registering on the global instance
        window.gsap.registerPlugin(window.ScrollTrigger || ScrollTrigger, window.Draggable || Draggable);
    } catch (err) {
        // fallback to registering on the imported gsap
        gsap.registerPlugin(ScrollTrigger, Draggable);
    }
} else {
    gsap.registerPlugin(ScrollTrigger, Draggable);
}


// ==============================================
// 2. PRELOADER & HEADER
// ==============================================
export function initPreloader() {
    window.addEventListener("load", function () {
        const preloader = document.getElementById("preloader");
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = "0";
                preloader.style.pointerEvents = "none";
                setTimeout(() => preloader.style.display = "none", 500);
            }, 1500);
        }
    });

    // Fun Easter Egg: Make the preloader image draggable while waiting
    const preloaderImg = document.querySelector("#preloader img");
    if (preloaderImg) {
        Draggable.create(preloaderImg, {
            type: "x,y",
            inertia: true,
            bounds: window
        });
    }
}

export function initHeaderAnimation() {
    gsap.from(".header-text", {
        opacity: 0,
        x: 100,
        duration: 1.2,
        stagger: 0.3,
        ease: "power2.out",
    });
}


// ==============================================
// 3. SECTION ANIMATIONS
// ==============================================
export function initAboutAnimation() {
    gsap.from("#about p, #about .about-bullet", {
        opacity: 0.1,
        y: 60,
        rotate: 3,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // Animate timeline cards with same effect
    gsap.from(".timeline-card", {
        opacity: 0.1,
        y: 60,
        rotate: 3,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
}

export function initContactAnimation() {
    gsap.from("#contactForm input, #contactForm textarea, #contactForm button", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: { trigger: "#contact", start: "top 80%" },
    });
}

export function initFooterAnimation() {
    // Animate footer when scrolled into view
    gsap.from("footer", {
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: "footer", start: "top 90%" },
    });
}


// ==============================================
// 4. INTERACTIVITY (Draggable, Scroll)
// ==============================================
export function initDraggableCard() {
    const card = document.getElementById("draggableContainer");
    if (card) {
        Draggable.create(card, {
            type: "x,y",
            bounds: window,
            inertia: true,
            edgeResistance: 0.65,
            onPress() {
                this.target.style.cursor = "grabbing";
            },
            onRelease() {
                this.target.style.cursor = "grab";
            }
        });
    }
}

export function initSmoothScroll() {
    // Smooth scroll for all nav links (desktop + mobile)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Keep native accessibility/fallback: href remains #id in the markup.
            // Intercept the click to perform JS smooth scroll and then remove the hash
            // from the URL so it doesn't persist after reload.
            // Allow modified clicks (ctrl/cmd/shift/alt) and non-left clicks to proceed normally.
            if (e.defaultPrevented) return;
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            e.preventDefault();
            const selector = this.getAttribute('href');
            if (selector === '#' || !selector) return; // Skip empty or bare hash
            const target = document.querySelector(selector);
            if (!target) return;

            // Smooth scroll to target. We do not rely on hash navigation.
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Remove any hash from the URL without adding a history entry.
            // Use pathname+search so query parameters remain intact.
            const cleanUrl = window.location.pathname + window.location.search;
            history.replaceState(null, '', cleanUrl);
        });
    });
}

export function initNavbarScroll() {
    let lastScroll = 0;
    const navbar = document.getElementById('mainNav');
    const scrollThreshold = 100;
    let ticking = false;

    if (!navbar) return;

    function updateNavbar(currentScroll) {
        if (currentScroll > scrollThreshold) {
            if (currentScroll > lastScroll) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (!ticking) {
            requestAnimationFrame(() => updateNavbar(currentScroll));
            ticking = true;
        }
    });
}


// ==============================================
// 5. TYPING EFFECT
// ==============================================
const CONFIG = {
    TYPING_DELAY: 150,
    DELETING_DELAY: 100,
    PAUSE_BEFORE_DELETE: 2000,
    PAUSE_BEFORE_TYPE: 100,
    PAUSE_BETWEEN_CYCLES: 1000,
    CONSTANT_TEXT: "I'm "
};

const roles = [
    { text: "Data Science Graduate", color: "#11181f" },
    { text: "Python-Focused Developer", color: "#11181f" },
    { text: "Applied Machine Learning", color: "#11181f" },
    { text: "Backend Development (Flask)", color: "#11181f" },
    { text: "Building Data-Driven Systems", color: "#11181f" }
];


let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isCyclePaused = false;

export function typeEffect(element) {
    if (!element) return;

    if (isCyclePaused) {
        return setTimeout(() => {
            isCyclePaused = false;
            typeEffect(element);
        }, CONFIG.PAUSE_BETWEEN_CYCLES);
    }

    const role = roles[roleIndex];
    let text;

    if (isDeleting) {
        charIndex--;
        text = CONFIG.CONSTANT_TEXT + role.text.substring(0, charIndex);
    } else {
        text = CONFIG.CONSTANT_TEXT + role.text.substring(0, ++charIndex);
    }

    element.innerText = text;
    element.style.color = role.color;

    let delay = isDeleting ? CONFIG.DELETING_DELAY : CONFIG.TYPING_DELAY;

    if (!isDeleting && charIndex === role.text.length) {
        isDeleting = true;
        delay = CONFIG.PAUSE_BEFORE_DELETE;
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
        delay = CONFIG.PAUSE_BEFORE_TYPE;
        isCyclePaused = true;
    }

    setTimeout(() => typeEffect(element), delay);
}