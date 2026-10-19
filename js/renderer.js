/**
 * NexSite AI - Dynamic Section Renderer Engine (Pure JavaScript & HTML/CSS)
 * Translates AI-generated JSON layouts into clean, accessible, semantic HTML.
 */

export function renderSection(section) {
  if (!section) return '';
  const type = typeof section === 'string' ? section : section.type;
  const props = typeof section === 'string' ? {} : (section.props || {});

  switch (type) {
    case 'hero':
      return renderHero(props);
    case 'editorial':
      return renderEditorial(props);
    case 'magazine':
      return renderMagazine(props);
    case 'about':
      return renderAbout(props);
    case 'services':
      return renderServices(props);
    case 'projects':
      return renderProjects(props);
    case 'testimonials':
      return renderTestimonials(props);
    case 'pricing':
      return renderPricing(props);
    case 'faq':
      return renderFAQ(props);
    case 'cta':
      return renderCTA(props);
    case 'stats':
      return renderStats(props);
    default:
      console.warn(`Unknown section type: ${type}`);
      return '';
  }
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str || '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderHero(props) {
  const title = escapeHtml(props.title || 'Welcome to NexSite AI');
  const subtitle = escapeHtml(props.subtitle || 'Build modern websites dynamically with AI.');
  return `
    <section class="section hero-section">
      <div class="hero-content">
        <h1 class="hero-title">${title}</h1>
        <p class="hero-subtitle">${subtitle}</p>
      </div>
    </section>
  `;
}

function renderEditorial(props) {
  const headline = escapeHtml(props.headline || 'VISUAL POETRY');
  const text = escapeHtml(props.text || 'Elevating the human experience through design.');
  const keyword = encodeURIComponent(props.imageKeyword || 'architecture');
  const reverseClass = props.reverse ? 'reverse' : '';
  const imageUrl = `https://image.pollinations.ai/prompt/${keyword}?width=800&height=1000&nologo=true`;

  return `
    <section class="section editorial-section ${reverseClass}">
      <div class="editorial-text-col">
        <h2 class="editorial-headline">${headline}</h2>
        <p class="editorial-quote">${text}</p>
      </div>
      <div class="editorial-img-col" style="background-image: url('${imageUrl}');" role="img" aria-label="${escapeHtml(props.imageKeyword || 'Editorial illustration')}"></div>
    </section>
  `;
}

function renderMagazine(props) {
  const items = Array.isArray(props.items) && props.items.length > 0 ? props.items : [
    { category: 'Design', title: 'BOLD INNOVATIONS', description: 'Breaking the mold with relentless creativity.' },
    { category: 'Art', title: 'VISUAL HARMONY', description: 'Crafting aesthetics that resonate globally.' }
  ];

  const itemsHtml = items.map((item, i) => `
    <div class="magazine-card ${i % 2 !== 0 ? 'alt' : ''}">
      <div class="magazine-tag">0${i + 1} // ${escapeHtml(item.category || 'FEATURE')}</div>
      <div class="magazine-body">
        <h3 class="magazine-title">${escapeHtml(item.title || '')}</h3>
        <p class="magazine-desc">${escapeHtml(item.description || '')}</p>
      </div>
    </div>
  `).join('');

  return `
    <section class="section magazine-grid">
      ${itemsHtml}
    </section>
  `;
}

function renderAbout(props) {
  const title = escapeHtml(props.title || 'About Us');
  const description = escapeHtml(props.description || 'We craft high-performance digital products and unforgettable brand interactions.');

  return `
    <section class="section card-section about-section">
      <h2 class="section-title">${title}</h2>
      <p class="section-desc">${description}</p>
    </section>
  `;
}

function renderServices(props) {
  const title = escapeHtml(props.title || 'Our Services');
  const services = Array.isArray(props.services) && props.services.length > 0 ? props.services : [
    { name: 'Digital Strategy', description: 'Transforming goals into scalable roadmaps.' },
    { name: 'UI / UX Design', description: 'Intuitive and accessible design systems.' },
    { name: 'Engineering', description: 'Modern, secure, and performant web architecture.' }
  ];

  const cardsHtml = services.map(svc => `
    <div class="card service-card">
      <h3 class="card-title">${escapeHtml(svc.name || '')}</h3>
      <p class="card-desc">${escapeHtml(svc.description || '')}</p>
    </div>
  `).join('');

  return `
    <section class="section card-section services-section">
      <h2 class="section-title">${title}</h2>
      <div class="cards-grid">
        ${cardsHtml}
      </div>
    </section>
  `;
}

function renderProjects(props) {
  const title = escapeHtml(props.title || 'Featured Projects');
  const projects = Array.isArray(props.projects) && props.projects.length > 0 ? props.projects : [
    { name: 'Apex Dashboard', description: 'Next-generation fintech analytics.' },
    { name: 'Vanguard Studios', description: 'Interactive 3D agency portfolio.' }
  ];

  const cardsHtml = projects.map(proj => `
    <div class="card project-card">
      <h3 class="card-title">${escapeHtml(proj.name || '')}</h3>
      <p class="card-desc">${escapeHtml(proj.description || '')}</p>
    </div>
  `).join('');

  return `
    <section class="section card-section projects-section">
      <h2 class="section-title">${title}</h2>
      <div class="cards-grid">
        ${cardsHtml}
      </div>
    </section>
  `;
}

function renderTestimonials(props) {
  const title = escapeHtml(props.title || 'What People Say');
  const testimonials = Array.isArray(props.testimonials) && props.testimonials.length > 0 ? props.testimonials : [
    { quote: 'NexSite AI revolutionized how we prototype and launch client websites.', author: 'Sarah Jenkins, Design Lead' }
  ];

  const cardsHtml = testimonials.map(t => `
    <div class="card testimonial-card">
      <span class="quote-mark">“</span>
      <p class="quote-text">${escapeHtml(t.quote || '')}</p>
      <div class="quote-author">— ${escapeHtml(t.author || 'Anonymous')}</div>
    </div>
  `).join('');

  return `
    <section class="section card-section testimonials-section">
      <h2 class="section-title text-center">${title}</h2>
      <div class="cards-grid">
        ${cardsHtml}
      </div>
    </section>
  `;
}

function renderPricing(props) {
  const title = escapeHtml(props.title || 'Transparent Pricing');
  const plans = Array.isArray(props.plans) && props.plans.length > 0 ? props.plans : [
    { name: 'Starter', price: '$19/mo', features: ['Core platform access', 'Community support'], highlight: false, cta: 'Get Started' },
    { name: 'Professional', price: '$49/mo', features: ['All Core features', 'Priority AI generation', 'Custom domain'], highlight: true, cta: 'Go Pro' }
  ];

  const plansHtml = plans.map(plan => `
    <div class="pricing-card ${plan.highlight ? 'highlight' : ''}">
      ${plan.highlight ? '<div class="highlight-badge">MOST POPULAR</div>' : ''}
      <h3 class="plan-name">${escapeHtml(plan.name || '')}</h3>
      <div class="plan-price">${escapeHtml(plan.price || '')}</div>
      <ul class="plan-features">
        ${(plan.features || []).map(f => `<li><span class="check">✓</span> ${escapeHtml(f)}</li>`).join('')}
      </ul>
      <button class="plan-cta-btn ${plan.highlight ? 'btn-primary' : 'btn-outline'}">${escapeHtml(plan.cta || 'Choose Plan')}</button>
    </div>
  `).join('');

  return `
    <section class="section pricing-section">
      <h2 class="section-title text-center">${title}</h2>
      <div class="pricing-grid">
        ${plansHtml}
      </div>
    </section>
  `;
}

function renderFAQ(props) {
  const title = escapeHtml(props.title || 'Frequently Asked Questions');
  const questions = Array.isArray(props.questions) && props.questions.length > 0 ? props.questions : [
    { question: 'How does NexSite AI work?', answer: 'It translates natural language prompts into structured JSON website components and renders them dynamically.' }
  ];

  const itemsHtml = questions.map(q => `
    <div class="faq-item">
      <h4 class="faq-question">${escapeHtml(q.question || '')}</h4>
      <p class="faq-answer">${escapeHtml(q.answer || '')}</p>
    </div>
  `).join('');

  return `
    <section class="section card-section faq-section">
      <h2 class="section-title">${title}</h2>
      <div class="faq-list">
        ${itemsHtml}
      </div>
    </section>
  `;
}

function renderCTA(props) {
  const title = escapeHtml(props.title || 'Ready to Build Something Unforgettable?');
  const subtitle = escapeHtml(props.subtitle || 'Join thousands of creators using NexSite AI today.');
  const buttonText = escapeHtml(props.buttonText || 'Get Started Now');

  return `
    <section class="section cta-section">
      <h2 class="cta-title">${title}</h2>
      <p class="cta-subtitle">${subtitle}</p>
      <button class="cta-btn">${buttonText}</button>
    </section>
  `;
}

function renderStats(props) {
  const stats = Array.isArray(props.stats) && props.stats.length > 0 ? props.stats : [
    { label: 'Active Users', value: '50K+' },
    { label: 'Sites Generated', value: '120K+' },
    { label: 'Uptime', value: '99.9%' }
  ];

  const statsHtml = stats.map(s => `
    <div class="stat-card">
      <div class="stat-value">${escapeHtml(s.value || '')}</div>
      <div class="stat-label">${escapeHtml(s.label || '')}</div>
    </div>
  `).join('');

  return `
    <section class="section stats-section">
      <div class="stats-grid">
        ${statsHtml}
      </div>
    </section>
  `;
}
