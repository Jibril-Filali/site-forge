'use strict';

(async function () {
  let config;
  try {
    const res = await fetch('data/config.json');
    if (!res.ok) return;
    config = await res.json();
  } catch (e) {
    return;
  }

  // ─── TARIFS ────────────────────────────────────────────────────
  const tarifsCards = document.getElementById('tarifs-cards');
  if (tarifsCards && config.tarifs) {
    const sessions = config.tarifs.sessions;

    function priceCard(s, showFeatures) {
      const featured = !!s.featured;
      return `
        <div class="price-card${featured ? ' featured' : ''}">
          ${featured ? '<div class="price-card-badge"><span class="badge badge-gold">Le plus choisi</span></div>' : ''}
          <h3>${s.joueurs} joueurs</h3>
          <div class="price-amount">${s.prix} <span>€ / session</span></div>
          <p class="price-desc">${s.parPersonne} € par personne</p>
          ${showFeatures ? `
          <ul class="price-features">
            <li>Session 60 minutes</li>
            <li>Salle au choix</li>
            <li>Introduction par le maître du jeu</li>
            <li>Parking gratuit</li>
          </ul>` : ''}
          <a href="reservation.html" class="btn ${featured ? 'btn-gold' : 'btn-outline'}" style="width:100%;justify-content:center;${showFeatures ? '' : 'margin-top:16px;'}">Réserver</a>
        </div>`;
    }

    tarifsCards.innerHTML =
      `<div class="grid-3 reveal visible" style="margin-bottom:48px;">
        ${sessions.slice(0, 3).map(s => priceCard(s, true)).join('')}
      </div>
      <div class="grid-2 reveal visible" style="max-width:740px; margin:0 auto 48px;">
        ${sessions.slice(3).map(s => priceCard(s, false)).join('')}
      </div>`;
  }

  // ─── HORAIRES ──────────────────────────────────────────────────
  function renderRows(rows, tableId) {
    const table = document.getElementById(tableId);
    if (!table || !rows) return;
    table.innerHTML = rows.map(r => {
      const ferme = /ferm/i.test(r.horaire);
      return `<tr><td>${r.jour}</td><td${ferme ? ' class="ferme"' : ''}>${r.horaire}</td></tr>`;
    }).join('');
  }

  if (config.horaires) {
    renderRows(config.horaires.interieures, 'table-interieures');
    renderRows(config.horaires.exterieures, 'table-exterieures');
  }

  // ─── FAQ ───────────────────────────────────────────────────────
  const faqSections = document.getElementById('faq-sections');
  if (faqSections && config.faq) {
    faqSections.innerHTML = config.faq.map(cat => `
      <h3 style="color:var(--gold);margin-bottom:24px;font-size:.85rem;letter-spacing:.2em;text-transform:uppercase;">${cat.categorie}</h3>
      <div style="margin-bottom:48px;" class="reveal visible">
        ${cat.questions.map(q => `
          <div class="faq-item">
            <div class="faq-question">
              ${q.question}
              <div class="faq-icon">+</div>
            </div>
            <div class="faq-answer">
              <div class="faq-answer-inner">${q.reponse}</div>
            </div>
          </div>`).join('')}
      </div>`).join('');

    faqSections.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  // ─── SALLES ────────────────────────────────────────────────────
  if (config.salles) {
    config.salles.forEach(salle => {
      const section = document.getElementById(salle.id);
      if (!section) return;

      const set = (field, value) => {
        const el = section.querySelector(`[data-field="${field}"]`);
        if (el) el.textContent = value;
      };

      set('type',         salle.type);
      set('tagline',      `"${salle.tagline}"`);
      set('description1', salle.description1);
      set('description2', salle.description2);

      const badges = section.querySelector('[data-field="badges"]');
      if (badges) {
        badges.innerHTML = `
          <span class="badge badge-gold">${salle.joueurs}</span>
          <span class="badge badge-purple">${salle.duree}</span>
          <span class="badge badge-purple">Difficulté : ${salle.difficulte}</span>
          <span class="badge badge-gold">${salle.ageMin}</span>`;
      }
    });
  }

})();
