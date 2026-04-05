'use strict';

const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function generateSiteContent(formData, niche) {
  const prompt = buildPrompt(formData, niche);

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ],
    system: buildSystemPrompt()
  });

  const raw = message.content[0].text;
  return parseJSON(raw);
}

function buildSystemPrompt() {
  return `Tu es un expert en copywriting de sites vitrine pour les petites et moyennes entreprises françaises.
Tu génères uniquement du contenu en français, optimisé pour la conversion.
Tu réponds TOUJOURS avec un objet JSON valide, sans markdown, sans texte avant ou après.
Le contenu doit être percutant, professionnel, et adapté à la niche ciblée.
Utilise le vouvoiement dans les textes adressés aux prospects.`;
}

function buildPrompt(formData, niche) {
  const servicesStr = Array.isArray(formData.services)
    ? formData.services.filter(Boolean).join(', ')
    : formData.services || '';

  return `Génère le contenu complet d'un site vitrine pour cette entreprise.

INFORMATIONS ENTREPRISE :
- Nom : ${formData.businessName}
- Niche : ${niche.label} (${niche.secteur})
- Tagline : ${formData.tagline || 'à générer'}
- Description : ${formData.description || 'entreprise locale de qualité'}
- Services : ${servicesStr || niche.keywords.join(', ')}
- Ville / Zone : ${formData.city || 'votre région'}
- Téléphone : ${formData.phone || ''}
- Email : ${formData.email || ''}
- Nom du dirigeant : ${formData.ownerName || ''}

OBJECTIF DU SITE :
${niche.focus}

CTA PRINCIPAL : "${niche.cta}"

Génère un JSON avec cette structure EXACTE (tous les champs sont obligatoires) :
{
  "meta": {
    "title": "titre SEO page accueil (60 car max)",
    "description": "meta description (155 car max)",
    "og_title": "titre pour partage réseaux sociaux"
  },
  "nav": {
    "links": ["Accueil", "Services", "Réalisations", "Contact"]
  },
  "home": {
    "hero_title": "titre accrocheur H1 (max 8 mots)",
    "hero_subtitle": "sous-titre percutant (1-2 phrases)",
    "hero_cta": "${niche.cta}",
    "hero_cta_secondary": "texte bouton secondaire (ex: Voir nos réalisations)",
    "trust_badges": ["badge1", "badge2", "badge3"],
    "about_title": "titre section À propos",
    "about_text": "texte de présentation (3-4 phrases, ton humain et professionnel)",
    "services_title": "titre section services",
    "services": [
      { "icon": "emoji", "name": "nom service", "desc": "description courte (1 phrase)" },
      { "icon": "emoji", "name": "nom service", "desc": "description courte (1 phrase)" },
      { "icon": "emoji", "name": "nom service", "desc": "description courte (1 phrase)" }
    ],
    "testimonials": [
      { "name": "Prénom N.", "city": "Ville", "text": "témoignage réaliste (2-3 phrases)", "stars": 5 },
      { "name": "Prénom N.", "city": "Ville", "text": "témoignage réaliste (2-3 phrases)", "stars": 5 },
      { "name": "Prénom N.", "city": "Ville", "text": "témoignage réaliste (2-3 phrases)", "stars": 5 }
    ],
    "cta_section_title": "titre section appel à l'action final",
    "cta_section_text": "texte d'accompagnement (1-2 phrases urgentes)"
  },
  "services_page": {
    "page_title": "titre H1 page services",
    "intro": "introduction (2-3 phrases)",
    "items": [
      { "name": "Nom service", "desc": "description longue (3-4 phrases)", "details": ["point1", "point2", "point3"] },
      { "name": "Nom service", "desc": "description longue (3-4 phrases)", "details": ["point1", "point2", "point3"] },
      { "name": "Nom service", "desc": "description longue (3-4 phrases)", "details": ["point1", "point2", "point3"] }
    ]
  },
  "realisations_page": {
    "page_title": "titre H1 page réalisations",
    "intro": "introduction (1-2 phrases)",
    "items": [
      { "title": "Titre réalisation", "desc": "description du projet (2-3 phrases)", "tag": "catégorie" },
      { "title": "Titre réalisation", "desc": "description du projet (2-3 phrases)", "tag": "catégorie" },
      { "title": "Titre réalisation", "desc": "description du projet (2-3 phrases)", "tag": "catégorie" },
      { "title": "Titre réalisation", "desc": "description du projet (2-3 phrases)", "tag": "catégorie" }
    ]
  },
  "contact_page": {
    "page_title": "titre H1 page contact",
    "intro": "texte d'invitation à contacter (1-2 phrases)",
    "form_cta": "texte bouton envoi formulaire",
    "address": "${formData.address || formData.city || 'Votre ville'}",
    "hours": "Lun-Ven 8h-18h, Sam 9h-12h",
    "response_time": "Réponse sous 24h"
  },
  "footer": {
    "tagline": "slogan court pied de page",
    "copyright": "© ${new Date().getFullYear()} ${formData.businessName}. Tous droits réservés."
  }
}`;
}

function parseJSON(raw) {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error('Claude n\'a pas retourné de JSON valide');
  }
  return JSON.parse(match[0]);
}

module.exports = { generateSiteContent };
