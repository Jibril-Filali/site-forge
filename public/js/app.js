'use strict';

// ---- Données niches (tips) ----
const NICHE_TIPS = {
  paysagiste: 'Focus réalisations avant/après et zones d\'intervention. CTA = demande de devis.',
  renovation: 'Prouver la fiabilité (assurances, garanties). Cibler les projets à haute valeur.',
  architecte: 'Mettre en valeur le style et le portfolio. Positionner comme spécialiste.',
  expert_comptable: 'Démontrer la spécialisation par niche, clarifier l\'offre, faciliter la prise de RDV.',
  cabinet_recrutement: 'Prouver la spécialisation et le réseau. Convaincre les entreprises.',
  dentiste: 'Rassurer sur l\'hygiène et l\'équipe. Faciliter la prise de RDV en ligne.',
  clinique_esthetique: 'Créer confiance et désirabilité. Guider vers le bon parcours patient.',
  centre_formation: 'Vendre la transformation. Répondre aux objections financement/débouchés.',
  bureau_etudes: 'Prouver la compétence et les références. Différenciation en appel d\'offre.',
  cabinet_conseil: 'Rendre la valeur tangible via cas clients et méthode. Générer des RDV.',
  couvreur: 'Capter l\'urgence (fuites). Rassurer sur certifications. Appel immédiat.',
  gestion_patrimoine: 'Inspirer confiance. Qualifier les clients (profil investisseur haut de gamme).',
  kine: 'Mettre en avant spécialités et équipe. RDV en ligne facilitée.',
  salle_sport: 'Vendre l\'expérience et les résultats. Pousser à un essai gratuit.',
  deratisation: 'Urgence et réactivité. Méthode et sécurité. Appel immédiat.',
  transport_b2b: 'Prouver capacité et fiabilité. Simplifier la demande de devis transport.',
  climatisation: 'Demande saisonnière et urgente. Devis rapide sous 24h.',
  hotel: 'Vendre l\'expérience premium. Augmenter les réservations directes (sans OTA).',
  animaux: 'Rassurer sur la bienveillance. Montrer les installations. Réservation facile.',
  coach: 'Vendre la transformation. Promesse concrète. Appel découverte gratuit.',
  escape_game: 'Vendre l\'immersion. Pousser à la réservation de groupe / team building.',
  saas: 'Expliquer la valeur produit. Répondre aux objections. Convertir vers une démo.',
  agence_com: 'Le site lui-même est une preuve de compétence. Filtrer les clients low-cost.',
  menuiserie: 'Justifier le prix via qualité perçue. Attirer des projets rentables sur-mesure.',
  isolation: 'Simplifier les aides (MaPrimeRénov). Éligibilité + devis rapide.'
};

// ---- Refs DOM ----
const formView = document.getElementById('form-view');
const loaderView = document.getElementById('loader-view');
const previewView = document.getElementById('preview-view');
const form = document.getElementById('generator-form');
const nicheSelect = document.getElementById('nicheId');
const nicheTip = document.getElementById('niche-tip');
const nicheTipText = document.getElementById('niche-tip-text');
const descCount = document.getElementById('desc-count');
const descField = document.getElementById('description');
const servicesList = document.getElementById('services-list');
const addServiceBtn = document.getElementById('add-service');
const colorInput = document.getElementById('primaryColor');
const generateBtn = document.getElementById('generate-btn');
const backBtn = document.getElementById('back-btn');
const previewFrame = document.getElementById('preview-frame');
const downloadBtn = document.getElementById('download-btn');
const previewTitle = document.getElementById('preview-title');

// ---- Niche tip ----
nicheSelect.addEventListener('change', () => {
  const tip = NICHE_TIPS[nicheSelect.value];
  if (tip) {
    nicheTipText.textContent = tip;
    nicheTip.hidden = false;
  } else {
    nicheTip.hidden = true;
  }
});

// ---- Compteur description ----
descField.addEventListener('input', () => {
  descCount.textContent = descField.value.length;
});

// ---- Services dynamiques ----
addServiceBtn.addEventListener('click', () => {
  const rows = servicesList.querySelectorAll('.service-row');
  if (rows.length >= 8) return;

  const row = document.createElement('div');
  row.className = 'service-row';
  row.innerHTML = `
    <input type="text" name="services[]" placeholder="Service supplémentaire" maxlength="80">
    <button type="button" class="btn-remove-service" aria-label="Supprimer">×</button>
  `;
  servicesList.appendChild(row);
  row.querySelector('input').focus();
  bindRemoveService(row.querySelector('.btn-remove-service'));
});

function bindRemoveService(btn) {
  btn.addEventListener('click', () => {
    const rows = servicesList.querySelectorAll('.service-row');
    if (rows.length > 1) btn.closest('.service-row').remove();
  });
}
servicesList.querySelectorAll('.btn-remove-service').forEach(bindRemoveService);

// ---- Couleur presets ----
document.querySelectorAll('.color-preset').forEach(btn => {
  btn.addEventListener('click', () => {
    colorInput.value = btn.dataset.color;
    document.querySelectorAll('.color-preset').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ---- Soumission formulaire ----
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();

  if (!validateForm()) return;

  const formData = collectFormData();
  showLoader();
  animateLoaderSteps();

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      const msg = data.error || (data.errors && data.errors[0]?.msg) || 'Erreur lors de la génération.';
      showForm();
      showError(msg);
      return;
    }

    completeLoaderSteps();
    setTimeout(() => showPreview(data, formData.businessName), 400);
  } catch (err) {
    showForm();
    showError('Erreur réseau. Vérifiez votre connexion et réessayez.');
  }
});

// ---- Validation ----
function validateForm() {
  let valid = true;

  if (!nicheSelect.value) {
    markError(nicheSelect, 'Sélectionnez une niche');
    valid = false;
  }
  const businessName = document.getElementById('businessName');
  if (!businessName.value.trim()) {
    markError(businessName, 'Le nom de l\'entreprise est requis');
    valid = false;
  }
  const city = document.getElementById('city');
  if (!city.value.trim()) {
    markError(city, 'La ville est requise');
    valid = false;
  }
  const email = document.getElementById('email');
  if (email.value && !isValidEmail(email.value)) {
    markError(email, 'Format d\'email invalide');
    valid = false;
  }
  return valid;
}

function markError(field, msg) {
  field.classList.add('error');
  const hint = document.createElement('span');
  hint.className = 'field-error';
  hint.style.cssText = 'color:#dc2626;font-size:.8rem;margin-top:4px;display:block';
  hint.textContent = msg;
  field.parentNode.appendChild(hint);
}

function clearErrors() {
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  document.querySelectorAll('.field-error').forEach(el => el.remove());
  document.querySelectorAll('.error-banner').forEach(el => el.remove());
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---- Collecte données ----
function collectFormData() {
  const services = Array.from(document.querySelectorAll('[name="services[]"]'))
    .map(i => i.value.trim())
    .filter(Boolean);

  return {
    nicheId: nicheSelect.value,
    businessName: document.getElementById('businessName').value.trim(),
    tagline: document.getElementById('tagline').value.trim(),
    description: descField.value.trim(),
    services,
    city: document.getElementById('city').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    ownerName: document.getElementById('ownerName').value.trim(),
    address: document.getElementById('address').value.trim(),
    primaryColor: colorInput.value
  };
}

// ---- Vues ----
function showLoader() {
  formView.hidden = true;
  loaderView.hidden = false;
  previewView.hidden = true;
}

function showForm() {
  formView.hidden = false;
  loaderView.hidden = true;
  previewView.hidden = true;
}

function showPreview(data, businessName) {
  formView.hidden = true;
  loaderView.hidden = true;
  previewView.hidden = false;

  previewTitle.textContent = businessName;
  previewFrame.src = data.preview_url;
  previewFrame.className = 'preview-frame device-desktop';
  downloadBtn.href = data.download_url;
}

function showError(msg) {
  const banner = document.createElement('div');
  banner.className = 'error-banner';
  banner.innerHTML = `<span>⚠️</span><span>${escHtml(msg)}</span>`;
  form.insertBefore(banner, form.firstChild);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Loader animation ----
let loaderTimers = [];

function animateLoaderSteps() {
  const steps = ['step-1', 'step-2', 'step-3', 'step-4'];
  const delays = [0, 1500, 3000, 4500];

  loaderTimers = steps.map((id, i) =>
    setTimeout(() => {
      if (i > 0) document.getElementById(steps[i - 1])?.classList.replace('active', 'done');
      document.getElementById(id)?.classList.add('active');
    }, delays[i])
  );
}

function completeLoaderSteps() {
  loaderTimers.forEach(t => clearTimeout(t));
  const steps = ['step-1', 'step-2', 'step-3', 'step-4'];
  steps.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('active');
    el.classList.add('done');
  });
}

// ---- Retour formulaire ----
backBtn.addEventListener('click', () => {
  showForm();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Device switcher ----
document.querySelectorAll('.device-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    previewFrame.className = `preview-frame device-${btn.dataset.device}`;
  });
});

function escHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
