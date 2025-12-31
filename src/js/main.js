// ==========================================
// 1. CSS IMPORTS (Critical for Vite)
// ==========================================
import '../css/main.css';       // Tailwind & Fonts (must be first)
import '../css/base.css';       // Reset & Body
import '../css/layout.css';     // Navbar & Footer
import '../css/components.css'; // UI Components
import '../css/animations.css'; // Keyframes
import '../css/theme.css';      // Dark/Light Mode

// ==========================================
// 2. MODULE IMPORTS
// ==========================================
// Data: Raw information only
import { projectsData, skills, quotes, certificates, journeyTimeline, aboutme } from './data.js';

// UI: HTML Builders
import {
  renderProjects,
  renderSkills,
  renderGallery,
  renderCombined,
  showRandomQuote,
  initThemeToggle,
  initMobileSidebar
} from './ui.js';

// Animations: GSAP & Visual Effects
import {
  initHeaderAnimation,
  initAboutAnimation,
  initContactAnimation,
  initFooterAnimation,
  initDraggableCard,
  initNavbarScroll,
  initSmoothScroll,
  initPreloader,
  typeEffect
} from './animations.js';

// Utilities: Forms
import { initEmailForm } from './email.js';
// functionality.js
import { initfuncShortcuts } from './funcitionality.js';
// ==========================================
// RESUME OVERLAY HANDLER
// ==========================================
function initResumeOverlay() {
  const overlay = document.getElementById('resumeOverlay');
  const controls = document.getElementById('resumeControls');
  const closeBtn = document.getElementById('resumeOverlayClose');
  const resumeLinks = document.querySelectorAll('.resume-link');
  const navbar = document.getElementById('mainNav');

  if (!overlay || resumeLinks.length === 0) return;

  // Open overlay when Resume link is clicked
  resumeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.remove('hidden');
      if (controls) controls.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (navbar) navbar.style.display = 'none';
    });
  });

  // Close overlay function with animation
  const closeOverlay = () => {
    overlay.classList.add('closing');
    setTimeout(() => {
      overlay.classList.add('hidden');
      overlay.classList.remove('closing');
      if (controls) controls.classList.add('hidden');
      document.body.style.overflow = '';
      if (navbar) navbar.style.display = '';
    }, 300);
  };

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeOverlay);
  }

  // Close on clicking outside images (backdrop area)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('fixed')) {
      closeOverlay();
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
      closeOverlay();
    }
  });
}


// Block right-click & dev tools shortcuts (as requested)
// Note: client-side prevention can be bypassed by determined users.
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
  // F12
  if (e.key === "F12") e.preventDefault();
  // Ctrl/Cmd + Shift + I/J/C (DevTools) — normalize case
  const keyUpper = (e.key || '').toUpperCase();
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["I", "J", "C"].includes(keyUpper)) e.preventDefault();
  // Ctrl/Cmd + U (view source)
  if ((e.ctrlKey || e.metaKey) && (e.key || '').toLowerCase() === 'u') e.preventDefault();
});

// ==========================================
// 3. SCROLL RESTORATION
// ==========================================
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// ==========================================
// 4. PRELOADER (Must run immediately)
// ==========================================
initPreloader();
// ==========================================
// 5. DOM READY - INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log(`
███╗   ███╗ █████╗ ████████╗██████╗ ██╗██╗  ██╗
████╗ ████║██╔══██╗╚══██╔══╝██╔══██╗██║╚██╗██╔╝
██╔████╔██║███████║   ██║   ██████╔╝██║ ╚███╔╝ 
██║╚██╔╝██║██╔══██║   ██║   ██╔══██╗██║ ██╔██╗ 
██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
`);

  console.log(
    '%cSYSTEM ONLINE  ▓▓▓  INITIALIZING PORTFOLIO',
    'color:#00ff9c;font-weight:bold;font-family:monospace;'
  );

  console.log(
    '%c✔ Modules loaded\n✔ Animations armed\n✔ UI ready\n✔ Welcome, Neo.',
    'color:#00ff9c;font-family:monospace;'
  );



  // A. RENDER STATIC CONTENT
  renderProjects(projectsData);
  renderSkills(skills);
  renderGallery('gallery', certificates);
  renderCombined(aboutme, journeyTimeline);

  // B. START QUOTE ROTATION
  showRandomQuote(quotes);
  setInterval(() => showRandomQuote(quotes), 4000);

  // C. UI INITIALIZATION

  const typingEl = document.getElementById('typing');
  if (typingEl) typeEffect(typingEl);

  // D. SCROLL & NAVIGATION
  initSmoothScroll();
  initNavbarScroll();
  initMobileSidebar();

  // E. GSAP ANIMATIONS
  initHeaderAnimation();
  initAboutAnimation();
  initContactAnimation();
  initFooterAnimation();
  initDraggableCard();

  // F. INTERACTIVITY
  initfuncShortcuts();
  initEmailForm();
  initThemeToggle();
  initResumeOverlay();
  
});
