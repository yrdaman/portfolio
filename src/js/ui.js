//render projects
import { projectsData } from './data.js';

// Helper: Highlight specific keywords in text (About section only)
function highlightKeywords(text, keywords) {
    let result = text;
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
        result = result.replace(regex, `<span class="brush-highlight">$1</span>`);
    });
    return result;
}

// Render Combined About & Journey
export function renderCombined(aboutmeData, timelineData) {
    // Keywords to highlight in About section
    const highlightKeywords_list = ["data_science",
        "Python", "LLM-based applications", "machine learning",
        "Exploratory Data Analysis",
        "Flask", "MongoDB"];

    // Render About section (left side) - LIMITED to 3 blocks max
    const aboutContainer = document.getElementById('about-text');
    if (aboutContainer) {
        // Show only first 3 paragraphs for hierarchy
        const limitedData = aboutmeData.slice(0, 3);
        aboutContainer.innerHTML = limitedData.map((paragraph, index) => {
            // Apply highlighting to all about paragraphs
            const highlighted = highlightKeywords(paragraph, highlightKeywords_list);

            // First paragraph: headline style
            if (index === 0) {
                return `<p class="text-2xl font-bold text-gray-900 leading-tight about-headline mb-6">${highlighted}</p>`;
            }
            // Second paragraph: supporting
            if (index === 1) {
                return `<p class="text-base text-gray-700 leading-relaxed about-supporting mb-6">${highlighted}</p>`;
            }
            // Third: bullet list style
            return `<div class="text-sm text-gray-600 about-bullet mb-6">• ${highlighted}</div>`;
        }).join('');
    }

    // Render Timeline cards (right side) - stacked vertically
    const timelineContainer = document.getElementById('timeline-cards');
    if (timelineContainer) {
        timelineContainer.innerHTML = timelineData.map(item => `
            <div class="timeline-card">
                <div class="timeline-card-header">
                    <div class="timeline-label-title">${item.label} - ${item.title}</div>
                    <div class="timeline-period">${item.period}</div>
                </div>
                <div class="timeline-institute">${item.institute}</div>
            </div>
        `).join('');
    }
}

export function renderProjects(projects) {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    container.innerHTML = projects.map(project => `
      <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition duration-300 flex flex-col">
        <div class="p-6 flex flex-col flex-grow">
          <h4 class="text-xl font-extrabold mb-2 text-gray-800">${project.title}</h4>
          <p class="text-gray-600 text-sm mb-4">
            ${project.desc}
          </p>
          
          <div class="flex flex-wrap justify-center gap-2 mt-2 mb-3">
            ${project.tags.map(tag => `
              <span class="bg-gray-200 text-gray-800 text-sm font-semibold px-2 py-1 rounded">${tag}</span>
            `).join('')}
          </div>

          <a href="${project.link}" 
             target="_blank" rel="noopener noreferrer"
             class="inline-block mt-auto bg-black text-white text-sm font-semibold px-3 py-2 rounded transition duration-300 transform hover:scale-110">
            View on GitHub
          </a>
        </div>
      </div>
    `).join('');
}

//render skills
import { skills } from './data.js';
export function renderSkills() {
    const skillsGrid = document.getElementById("skills-grid");
    skillsGrid.innerHTML = "";

    skills.forEach(skill => {
        const skillDiv = document.createElement("div");
        skillDiv.className = `
        skill-item
        bg-white
        text-black
        border border-black
        p-4
        rounded
        text-center
        transition-all
        duration-300
        transform
        hover:scale-105
        cursor-pointer
    `;

        skillDiv.innerHTML = `
        <p class="text-xl font-bold mb-2 gradient-text-animate">${skill.category}</p>
        <p class="text-base">${skill.description}</p>
    `;

        skillsGrid.appendChild(skillDiv);
    });
}




import { quotes } from './data.js';
export function showRandomQuote() {
    const quoteBox = document.getElementById('quoteBox');
    if (quoteBox) {
        const random = Math.floor(Math.random() * quotes.length);
        quoteBox.textContent = quotes[random];
    }
}

export function startQuoteRotation(interval = 4000) {
    showRandomQuote();
    return setInterval(showRandomQuote, interval);
}

// Mobile Sidebar Toggle
export function initMobileSidebar() {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const navLinks = sidebar.querySelectorAll('a');

    if (!toggleBtn || !sidebar) return;

    // Toggle sidebar open/close
    toggleBtn.addEventListener('click', () => {
        const isOpen = sidebar.classList.contains('active');

        if (isOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    // Close sidebar when overlay clicked
    overlay.addEventListener('click', closeSidebar);

    // Close sidebar when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
    }
}

// Theme Toggle (handles both desktop and mobile buttons)
export function initThemeToggle() {
    const desktopToggle = document.getElementById('themeToggle');
    const mobileToggle = document.getElementById('mobileThemeToggle');

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    function toggleTheme() {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    if (desktopToggle) {
        desktopToggle.addEventListener('click', toggleTheme);
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleTheme);
    }
}

// Reusable Gallery Renderer
export function renderGallery(containerId, data) {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container || !Array.isArray(data)) return;

    container.innerHTML = data.map(item => `
                <div class="img-box">
                    <img src="${item.image}" alt="${item.title}" />
                    <div class="transparent-box">   
                        <div class="caption">
                            <p>${item.title}</p>
                            <p class="opacity-low">${item.subtitle || ''}</p>
                        </div>
                    </div>
                </div>
        `).join('');
}