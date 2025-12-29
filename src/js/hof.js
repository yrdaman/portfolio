import '../css/main.css';
import '../css/base.css';
import '../css/layout.css';
import '../css/components.css';
import '../css/animations.css';
import '../css/theme.css';
import '../css/pages/hall-of-fame.css';

import { certificates } from './data.js';
import { renderGallery, initMobileSidebar, initThemeToggle } from './ui.js';
import { initPreloader } from './animations.js';

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

// Prevent browser scroll restoration
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Initialize preloader immediately (before load event)
initPreloader();

// Minimal page boot
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    renderGallery('gallery', certificates);
    initMobileSidebar();
    initThemeToggle();
    initResumeOverlay();
  });
}
