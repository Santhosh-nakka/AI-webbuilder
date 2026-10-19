import { generateWebsite } from './ai.js?v=3.0';
import { renderSection } from './renderer.js?v=3.0';
import { presetTemplates } from './templates.js?v=3.0';

// Default initial website configuration
const defaultInitialConfig = {
  websiteType: "business",
  themeType: "dark",
  fontFamily: "'Inter', sans-serif",
  customTitle: "AI-WebBuilder",
  customSubtitle: "Pure HTML5 & CSS3 Dynamic Website Engine powered by Generative AI.",
  customBackgroundColor: "#0f172a",
  customTextColor: "#f8fafc",
  sections: [
    {
      type: "editorial",
      props: {
        headline: "WE BUILD THE FUTURE",
        text: "AI-WebBuilder dynamically designs, styles, and renders modular web components in real-time.",
        imageKeyword: "futuristic architecture minimalism",
        reverse: false
      }
    },
    {
      type: "stats",
      props: {
        stats: [
          { label: "Generation Speed", value: "< 3s" },
          { label: "Pure HTML/CSS", value: "100%" },
          { label: "Active Creators", value: "25K+" }
        ]
      }
    },
    {
      type: "services",
      props: {
        title: "Platform Capabilities",
        services: [
          { name: "Instant Iteration", description: "Refine layouts and visual hierarchy conversationally." },
          { name: "Modular Component Engine", description: "Over 10 production-ready responsive section blocks." },
          { name: "One-Click HTML Export", description: "Download production-ready, standalone HTML files instantly." }
        ]
      }
    },
    {
      type: "cta",
      props: {
        title: "Ready to Create Your Dream Site?",
        subtitle: "Type any prompt in the left sidebar to customize this page.",
        buttonText: "Start Prompting"
      }
    }
  ]
};

// Theme color definitions
const themePresets = {
  dark: { bg: "#0f172a", text: "#f8fafc" },
  light: { bg: "#f8fafc", text: "#0f172a" },
  purple: { bg: "#2e1065", text: "#f3e8ff" },
  brutalist: { bg: "#000000", text: "#ffffff" },
  editorial: { bg: "#fafafa", text: "#1a1a1a" },
  vibrant: { bg: "#ffcc00", text: "#000000" },
  warm: { bg: "#a0522d", text: "#fff8f0" }
};

class AIWebBuilderApp {
  constructor() {
    this.apiKey = localStorage.getItem("ai-webbuilder-api-key") || localStorage.getItem("nexsite-api-key") || "";
    this.chatHistory = [];
    this.isLoading = false;

    // Load saved configuration or fall back to default
    const savedConfig = localStorage.getItem("ai-webbuilder-site-config") || localStorage.getItem("nexsite-site-config");
    this.siteConfig = savedConfig ? JSON.parse(savedConfig) : defaultInitialConfig;

    this.cacheDomElements();
    this.bindEvents();
    this.init();
  }

  cacheDomElements() {
    this.apiKeyInput = document.getElementById("api-key-input");
    this.apiKeyStatus = document.getElementById("api-key-status");
    this.promptInput = document.getElementById("prompt-input");
    this.sendBtn = document.getElementById("send-btn");
    this.resetBtn = document.getElementById("reset-btn");
    this.chatHistoryEl = document.getElementById("chat-history");
    this.previewContainer = document.getElementById("website-preview");
    this.sectionsContainer = document.getElementById("dynamic-sections");
    this.heroTitle = document.getElementById("preview-hero-title");
    this.heroSubtitle = document.getElementById("preview-hero-subtitle");
    
    // Modals & Navigation buttons
    this.templatesModal = document.getElementById("templates-modal");
    this.templatesGrid = document.getElementById("templates-grid");
    this.closeModalBtn = document.getElementById("close-modal-btn");
    this.navTemplatesBtn = document.getElementById("nav-templates-btn");
    this.navExportBtn = document.getElementById("nav-export-btn");
    this.navHomeBtn = document.getElementById("nav-home-btn");
    this.navBuilderBtn = document.getElementById("nav-builder-btn");
    this.navContactBtn = document.getElementById("nav-contact-btn");
    this.suggestionChips = document.querySelectorAll(".chip-btn");
  }

  bindEvents() {
    // API Key input
    this.apiKeyInput.value = this.apiKey;
    this.updateApiKeyBadge();
    this.apiKeyInput.addEventListener("input", (e) => {
      this.apiKey = e.target.value.trim();
      localStorage.setItem("ai-webbuilder-api-key", this.apiKey);
      this.updateApiKeyBadge();
    });

    // Form submission
    const form = document.getElementById("chat-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handlePromptSubmit();
    });

    this.promptInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.handlePromptSubmit();
      }
    });

    // Reset button
    this.resetBtn.addEventListener("click", () => this.handleReset());

    // Navigation & Modal triggers
    this.navTemplatesBtn.addEventListener("click", () => this.openTemplatesModal());
    this.closeModalBtn.addEventListener("click", () => this.closeTemplatesModal());
    this.navExportBtn.addEventListener("click", () => this.exportStandaloneHtml());
    this.navHomeBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    this.navBuilderBtn.addEventListener("click", () => {
      this.promptInput.focus();
    });
    this.navContactBtn.addEventListener("click", () => {
      const footer = document.querySelector("footer");
      if (footer) footer.scrollIntoView({ behavior: "smooth" });
    });

    // Suggestion chips
    this.suggestionChips.forEach(chip => {
      chip.addEventListener("click", () => {
        this.promptInput.value = chip.dataset.prompt;
        this.promptInput.focus();
      });
    });

    // Close modal on background click or Esc key
    this.templatesModal.addEventListener("click", (e) => {
      if (e.target === this.templatesModal) this.closeTemplatesModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.templatesModal.classList.contains("hidden")) {
        this.closeTemplatesModal();
      }
    });
  }

  async init() {
    if (!this.apiKey) {
      try {
        const config = await import('./config.js');
        if (config && config.DEFAULT_GEMINI_KEY) {
          this.apiKey = config.DEFAULT_GEMINI_KEY;
          this.apiKeyInput.value = this.apiKey;
          this.updateApiKeyBadge();
        }
      } catch (e) {
        // config.js not found or ignored
      }
    }
    this.populateTemplatesGrid();
    this.applyConfiguration(this.siteConfig);
  }

  updateApiKeyBadge() {
    if (this.apiKey) {
      this.apiKeyStatus.textContent = "Active";
      this.apiKeyStatus.className = "status-badge active";
    } else {
      this.apiKeyStatus.textContent = "Required";
      this.apiKeyStatus.className = "status-badge missing";
    }
  }

  applyConfiguration(config) {
    this.siteConfig = config;
    localStorage.setItem("ai-webbuilder-site-config", JSON.stringify(config));

    // Determine colors
    const theme = themePresets[config.themeType] || themePresets.dark;
    const bgColor = config.customBackgroundColor || theme.bg;
    const textColor = config.customTextColor || theme.text;
    const fontFamily = config.fontFamily || "'Inter', sans-serif";

    // Update CSS custom properties on preview container
    this.previewContainer.style.setProperty("--current-bg", bgColor);
    this.previewContainer.style.setProperty("--current-text", textColor);
    this.previewContainer.style.backgroundColor = bgColor;
    this.previewContainer.style.color = textColor;
    this.previewContainer.style.fontFamily = fontFamily;
    this.previewContainer.setAttribute("data-theme", config.themeType || "dark");

    // Update Hero Title & Subtitle
    this.heroTitle.textContent = config.customTitle || "AI-WebBuilder";
    this.heroSubtitle.textContent = config.customSubtitle || "";

    // Render all dynamic sections
    this.sectionsContainer.innerHTML = "";
    if (Array.isArray(config.sections)) {
      config.sections.forEach(section => {
        const sectionHtml = renderSection(section);
        this.sectionsContainer.insertAdjacentHTML("beforeend", sectionHtml);
      });
    }
  }

  async handlePromptSubmit() {
    const prompt = this.promptInput.value.trim();
    if (!prompt) return;

    if (!this.apiKey) {
      alert("Please enter your Google Gemini API Key in the sidebar to generate websites.");
      this.apiKeyInput.focus();
      return;
    }

    if (this.isLoading) return;

    // Append user message
    this.appendChatMessage("user", prompt);
    this.promptInput.value = "";
    this.setLoading(true);

    try {
      const updatedConfig = await generateWebsite(this.apiKey, prompt, this.siteConfig);
      this.applyConfiguration(updatedConfig);
      this.appendChatMessage("ai", "Layout updated successfully!");
    } catch (err) {
      console.error(err);
      this.appendChatMessage("ai", `Error: ${err.message}`);
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(loading) {
    this.isLoading = loading;
    this.sendBtn.disabled = loading;
    this.promptInput.disabled = loading;
    if (loading) {
      this.sendBtn.textContent = "Generating...";
      this.loadingMessageEl = this.appendChatMessage("ai", "⏳ Analyzing prompt and generating layout...");
    } else {
      this.sendBtn.textContent = "Send";
      if (this.loadingMessageEl) {
        this.loadingMessageEl.remove();
        this.loadingMessageEl = null;
      }
    }
  }

  appendChatMessage(role, text) {
    const msg = document.createElement("div");
    msg.className = `chat-bubble ${role}`;
    msg.textContent = text;
    this.chatHistoryEl.appendChild(msg);
    this.chatHistoryEl.scrollTop = this.chatHistoryEl.scrollHeight;
    return msg;
  }

  handleReset() {
    if (confirm("Reset layout to default?")) {
      this.applyConfiguration(defaultInitialConfig);
      this.chatHistoryEl.innerHTML = "";
      this.appendChatMessage("ai", "Layout reset to default. What would you like to build?");
    }
  }

  openTemplatesModal() {
    this.templatesModal.classList.remove("hidden");
  }

  closeTemplatesModal() {
    this.templatesModal.classList.add("hidden");
  }

  populateTemplatesGrid() {
    this.templatesGrid.innerHTML = "";
    presetTemplates.forEach(template => {
      const card = document.createElement("div");
      card.className = "template-card";
      card.innerHTML = `
        <h3>${template.name}</h3>
        <p>${template.description}</p>
        <span class="apply-text">+ Click to Apply</span>
      `;
      card.addEventListener("click", () => {
        this.applyConfiguration(template.config);
        this.closeTemplatesModal();
        this.appendChatMessage("ai", `Applied template: "${template.name}". What adjustments would you like to make?`);
      });
      this.templatesGrid.appendChild(card);
    });
  }

  exportStandaloneHtml() {
    const previewContent = document.getElementById("exportable-area").innerHTML;
    const theme = themePresets[this.siteConfig.themeType] || themePresets.dark;
    const bgColor = this.siteConfig.customBackgroundColor || theme.bg;
    const textColor = this.siteConfig.customTextColor || theme.text;
    const fontFamily = this.siteConfig.fontFamily || "'Inter', sans-serif";

    // Grab linked fonts and style sheets
    const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.siteConfig.customTitle || "AI-WebBuilder Website"}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=Playfair+Display:wght@400;700;900&family=Space+Mono:wght@400;700&family=Poppins:wght@400;600;800&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: ${bgColor};
      color: ${textColor};
      font-family: ${fontFamily};
      --current-bg: ${bgColor};
      --current-text: ${textColor};
    }
    .exported-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
  </style>
</head>
<body data-theme="${this.siteConfig.themeType || 'dark'}">
  <div class="exported-container">
    ${previewContent}
  </div>
</body>
</html>`;

    const blob = new Blob([standaloneHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(this.siteConfig.customTitle || "ai-webbuilder-website").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  new AIWebBuilderApp();
});
