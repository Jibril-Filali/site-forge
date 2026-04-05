'use strict';

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

function buildSite(sessionId, content, formData, niche) {
  const outDir = path.join(__dirname, '..', 'tmp', sessionId);
  fs.mkdirSync(outDir, { recursive: true });

  const primaryColor = formData.primaryColor || '#2563eb';
  const colorVars = buildColorVars(primaryColor);

  const css = fs.readFileSync(path.join(TEMPLATES_DIR, 'assets', 'style.css'), 'utf8');
  const js = fs.readFileSync(path.join(TEMPLATES_DIR, 'assets', 'script.js'), 'utf8');

  // Inject couleur dans le CSS
  const finalCss = css.replace('--primary: #2563eb;', `--primary: ${primaryColor};`)
    .replace('--primary-dark: #1d4ed8;', `--primary-dark: ${darken(primaryColor)};`)
    .replace('--primary-light: #dbeafe;', `--primary-light: ${lighten(primaryColor)};`);

  fs.mkdirSync(path.join(outDir, 'assets'), { recursive: true });
  fs.writeFileSync(path.join(outDir, 'assets', 'style.css'), finalCss);
  fs.writeFileSync(path.join(outDir, 'assets', 'script.js'), js);

  const shared = { content, formData, niche, colorVars };

  fs.writeFileSync(path.join(outDir, 'index.html'), buildIndex(shared));
  fs.writeFileSync(path.join(outDir, 'services.html'), buildServices(shared));
  fs.writeFileSync(path.join(outDir, 'realisations.html'), buildRealisations(shared));
  fs.writeFileSync(path.join(outDir, 'contact.html'), buildContact(shared));

  return outDir;
}

// ---- Composants réutilisables ----

function buildNav(formData, content, activePage) {
  const pages = [
    { href: 'index.html', label: 'Accueil' },
    { href: 'services.html', label: 'Services' },
    { href: 'realisations.html', label: 'Réalisations' },
    { href: 'contact.html', label: 'Contact' }
  ];

  const links = pages.map(p =>
    `<li><a href="${p.href}"${activePage === p.href ? ' class="active"' : ''}>${p.label}</a></li>`
  ).join('\n          ');

  return `<nav>
  <div class="container nav-inner">
    <a href="index.html" class="nav-logo">${esc(formData.businessName)}</a>
    <ul class="nav-links">
      ${links}
      <li><a href="contact.html" class="btn btn-primary">${esc(content.niche?.cta || 'Nous contacter')}</a></li>
    </ul>
    <div class="hamburger" aria-label="Menu" role="button" tabindex="0">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>`;
}

function buildFooter(formData, content) {
  const footer = content.footer || {};
  const phone = formData.phone || '';
  const email = formData.email || '';
  const city = formData.city || '';

  return `<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="logo">${esc(formData.businessName)}</div>
        <p>${esc(footer.tagline || '')}</p>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="index.html">Accueil</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="realisations.html">Réalisations</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          ${phone ? `<li><a href="tel:${esc(phone)}">${esc(phone)}</a></li>` : ''}
          ${email ? `<li><a href="mailto:${esc(email)}">${esc(email)}</a></li>` : ''}
          ${city ? `<li>${esc(city)}</li>` : ''}
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>${esc(footer.copyright || `© ${new Date().getFullYear()} ${formData.businessName}. Tous droits réservés.`)}</p>
    </div>
  </div>
</footer>`;
}

function buildWhatsApp(phone) {
  if (!phone) return '';
  const clean = phone.replace(/\D/g, '');
  const wa = clean.startsWith('0') ? '33' + clean.slice(1) : clean;
  return `<a href="https://wa.me/${wa}" class="whatsapp-btn" aria-label="Contacter sur WhatsApp" target="_blank" rel="noopener">💬</a>`;
}

function htmlHead(title, description, activePage, primaryColor) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${esc(description)}">
  <title>${esc(title)}</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>`;
}

function htmlFoot() {
  return `<script src="assets/script.js"></script>
</body>
</html>`;
}

// ---- Pages ----

function buildIndex({ content, formData, niche }) {
  const home = content.home || {};
  const meta = content.meta || {};

  const services = (home.services || []).map(s => `
    <div class="card">
      <div class="card-icon">${s.icon || '⚡'}</div>
      <h3>${esc(s.name)}</h3>
      <p>${esc(s.desc)}</p>
    </div>`).join('');

  const testimonials = (home.testimonials || []).map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'★'.repeat(t.stars || 5)}</div>
      <p class="testimonial-text">"${esc(t.text)}"</p>
      <div class="testimonial-author">${esc(t.name)} <span>— ${esc(t.city)}</span></div>
    </div>`).join('');

  const trustBadges = (home.trust_badges || []).map(b => `
    <div class="trust-item">${esc(b)}</div>`).join('');

  return `${htmlHead(meta.title || formData.businessName, meta.description || '', 'index.html', formData.primaryColor)}

${buildNav(formData, { niche }, 'index.html')}

<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1>${esc(home.hero_title || formData.businessName)}</h1>
      <p>${esc(home.hero_subtitle || '')}</p>
      <div class="hero-btns">
        <a href="contact.html" class="btn btn-white">${esc(home.hero_cta || niche.cta)}</a>
        <a href="realisations.html" class="btn btn-secondary" style="border-color:rgba(255,255,255,.6);color:#fff">${esc(home.hero_cta_secondary || 'Voir nos réalisations')}</a>
      </div>
      ${trustBadges ? `<div class="trust-bar">${trustBadges}</div>` : ''}
    </div>
  </div>
</section>

<section class="section-alt">
  <div class="container">
    <div class="about-grid">
      <div class="about-img">🏢</div>
      <div class="about-content">
        <span class="section-tag">À propos</span>
        <h2>${esc(home.about_title || 'Qui sommes-nous ?')}</h2>
        <p>${esc(home.about_text || '')}</p>
        <div class="about-stats">
          <div class="stat-item"><div class="number">10+</div><div class="label">Ans d'expérience</div></div>
          <div class="stat-item"><div class="number">200+</div><div class="label">Clients satisfaits</div></div>
          <div class="stat-item"><div class="number">100%</div><div class="label">Satisfaction</div></div>
        </div>
        <a href="contact.html" class="btn btn-primary" style="margin-top:28px">${esc(niche.cta)}</a>
      </div>
    </div>
  </div>
</section>

${services ? `<section>
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Nos services</span>
      <h2>${esc(home.services_title || 'Ce que nous proposons')}</h2>
    </div>
    <div class="grid-3">${services}</div>
    <div style="text-align:center;margin-top:40px">
      <a href="services.html" class="btn btn-secondary">Voir tous nos services →</a>
    </div>
  </div>
</section>` : ''}

${testimonials ? `<section class="section-alt">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Témoignages</span>
      <h2>Ce que disent nos clients</h2>
    </div>
    <div class="grid-3">${testimonials}</div>
  </div>
</section>` : ''}

<div class="cta-band">
  <div class="container">
    <h2>${esc(home.cta_section_title || 'Prêt à démarrer votre projet ?')}</h2>
    <p>${esc(home.cta_section_text || 'Contactez-nous dès aujourd\'hui pour un devis gratuit.')}</p>
    <a href="contact.html" class="btn btn-white">${esc(niche.cta)}</a>
  </div>
</div>

${buildFooter(formData, content)}
${buildWhatsApp(formData.phone)}
${htmlFoot()}`;
}

function buildServices({ content, formData, niche }) {
  const sp = content.services_page || {};
  const meta = content.meta || {};

  const items = (sp.items || []).map(item => {
    const details = (item.details || []).map(d => `<li>${esc(d)}</li>`).join('');
    return `<div class="service-item">
      <h3>${esc(item.name)}</h3>
      <p>${esc(item.desc)}</p>
      ${details ? `<ul class="service-details">${details}</ul>` : ''}
    </div>`;
  }).join('');

  return `${htmlHead((sp.page_title || 'Nos services') + ' — ' + formData.businessName, meta.description || '', 'services.html', formData.primaryColor)}

${buildNav(formData, { niche }, 'services.html')}

<div class="page-hero">
  <div class="container">
    <h1>${esc(sp.page_title || 'Nos services')}</h1>
    <p>${esc(sp.intro || '')}</p>
  </div>
</div>

<section>
  <div class="container">
    <div class="grid-2">${items}</div>
    <div style="text-align:center;margin-top:48px">
      <a href="contact.html" class="btn btn-primary">${esc(niche.cta)}</a>
    </div>
  </div>
</section>

${buildFooter(formData, content)}
${buildWhatsApp(formData.phone)}
${htmlFoot()}`;
}

function buildRealisations({ content, formData, niche }) {
  const rp = content.realisations_page || {};
  const meta = content.meta || {};
  const icons = ['🏗️', '🔨', '🏠', '⚙️', '🌿', '✨'];

  const items = (rp.items || []).map((item, i) => `
    <div class="realisation-card">
      <div class="realisation-img">${icons[i % icons.length]}</div>
      <div class="realisation-body">
        <span class="realisation-tag">${esc(item.tag || niche.label)}</span>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.desc)}</p>
      </div>
    </div>`).join('');

  return `${htmlHead((rp.page_title || 'Nos réalisations') + ' — ' + formData.businessName, meta.description || '', 'realisations.html', formData.primaryColor)}

${buildNav(formData, { niche }, 'realisations.html')}

<div class="page-hero">
  <div class="container">
    <h1>${esc(rp.page_title || 'Nos réalisations')}</h1>
    <p>${esc(rp.intro || '')}</p>
  </div>
</div>

<section>
  <div class="container">
    <div class="grid-4">${items}</div>
    <div style="text-align:center;margin-top:48px">
      <a href="contact.html" class="btn btn-primary">${esc(niche.cta)}</a>
    </div>
  </div>
</section>

${buildFooter(formData, content)}
${buildWhatsApp(formData.phone)}
${htmlFoot()}`;
}

function buildContact({ content, formData, niche }) {
  const cp = content.contact_page || {};
  const meta = content.meta || {};

  return `${htmlHead((cp.page_title || 'Contact') + ' — ' + formData.businessName, meta.description || '', 'contact.html', formData.primaryColor)}

${buildNav(formData, { niche }, 'contact.html')}

<div class="page-hero">
  <div class="container">
    <h1>${esc(cp.page_title || 'Contactez-nous')}</h1>
    <p>${esc(cp.intro || '')}</p>
  </div>
</div>

<section>
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info">
        <h2>Nos coordonnées</h2>
        <p>${esc(cp.intro || 'Nous sommes disponibles pour répondre à toutes vos questions.')}</p>
        ${formData.phone ? `<div class="contact-detail">
          <div class="contact-detail-icon">📞</div>
          <div class="contact-detail-text">
            <div class="label">Téléphone</div>
            <div class="value"><a href="tel:${esc(formData.phone)}">${esc(formData.phone)}</a></div>
          </div>
        </div>` : ''}
        ${formData.email ? `<div class="contact-detail">
          <div class="contact-detail-icon">✉️</div>
          <div class="contact-detail-text">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${esc(formData.email)}">${esc(formData.email)}</a></div>
          </div>
        </div>` : ''}
        ${cp.address ? `<div class="contact-detail">
          <div class="contact-detail-icon">📍</div>
          <div class="contact-detail-text">
            <div class="label">Adresse</div>
            <div class="value">${esc(cp.address)}</div>
          </div>
        </div>` : ''}
        ${cp.hours ? `<div class="contact-detail">
          <div class="contact-detail-icon">🕒</div>
          <div class="contact-detail-text">
            <div class="label">Horaires</div>
            <div class="value">${esc(cp.hours)}</div>
          </div>
        </div>` : ''}
        ${cp.response_time ? `<div class="contact-detail">
          <div class="contact-detail-icon">⚡</div>
          <div class="contact-detail-text">
            <div class="label">Réactivité</div>
            <div class="value">${esc(cp.response_time)}</div>
          </div>
        </div>` : ''}
        <div class="map-placeholder">
          <div class="icon">📍</div>
          <div>${esc(formData.city || 'Votre ville')}</div>
        </div>
      </div>
      <div class="form">
        <h3 style="margin-bottom:24px;font-size:1.25rem">Envoyez-nous un message</h3>
        <form id="contact-form" data-email="${esc(formData.email || '')}">
          <div class="form-group">
            <label for="name">Nom complet *</label>
            <input type="text" id="name" name="name" placeholder="Votre nom" required>
          </div>
          <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" placeholder="votre@email.com" required>
          </div>
          <div class="form-group">
            <label for="phone">Téléphone</label>
            <input type="tel" id="phone" name="phone" placeholder="06 00 00 00 00">
          </div>
          <div class="form-group">
            <label for="message">Message *</label>
            <textarea id="message" name="message" placeholder="Décrivez votre projet..." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">
            ${esc(cp.form_cta || niche.cta)}
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

${buildFooter(formData, content)}
${buildWhatsApp(formData.phone)}
${htmlFoot()}`;
}

// ---- Utilitaires couleur ----

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 37, g: 99, b: 235 };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('');
}

function darken(hex, amount = 20) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(r - amount, g - amount, b - amount);
}

function lighten(hex, amount = 200) {
  const { r, g, b } = hexToRgb(hex);
  const avg = (r + g + b) / 3;
  const factor = amount / 255;
  return rgbToHex(
    Math.round(r + (255 - r) * factor),
    Math.round(g + (255 - g) * factor),
    Math.round(b + (255 - b) * factor)
  );
}

function buildColorVars(hex) {
  return `--primary: ${hex}; --primary-dark: ${darken(hex)}; --primary-light: ${lighten(hex)};`;
}

// Echappement HTML
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = { buildSite };
