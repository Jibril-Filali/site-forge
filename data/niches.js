'use strict';

const NICHES = [
  {
    id: 'paysagiste',
    label: 'Paysagiste',
    secteur: 'BTP / Rénovation',
    focus: 'Mettre en avant les réalisations avant/après, les zones d\'intervention et faciliter la demande de devis.',
    cta: 'Demander un devis gratuit',
    sections: ['hero', 'services', 'realisations', 'zones', 'temoignages', 'contact'],
    keywords: ['jardinage', 'aménagement paysager', 'entretien jardin', 'terrasse', 'gazon']
  },
  {
    id: 'renovation',
    label: 'Entreprise de rénovation générale',
    secteur: 'BTP / Rénovation',
    focus: 'Prouver la fiabilité (assurances, garanties), montrer les chantiers réalisés, attirer des projets à haute valeur.',
    cta: 'Obtenir un devis gratuit',
    sections: ['hero', 'services', 'realisations', 'garanties', 'temoignages', 'contact'],
    keywords: ['rénovation', 'travaux', 'aménagement intérieur', 'salle de bain', 'cuisine']
  },
  {
    id: 'architecte',
    label: 'Architecte (cabinet)',
    secteur: 'Services aux particuliers',
    focus: 'Mettre en valeur le style et le portfolio, positionner le cabinet comme spécialiste identifiable.',
    cta: 'Prendre contact',
    sections: ['hero', 'portfolio', 'methode', 'equipe', 'temoignages', 'contact'],
    keywords: ['architecture', 'maison contemporaine', 'rénovation architecturale', 'permis de construire']
  },
  {
    id: 'expert_comptable',
    label: 'Cabinet d\'expertise-comptable',
    secteur: 'Services B2B',
    focus: 'Démontrer la spécialisation par niche, clarifier l\'offre et faciliter la prise de RDV.',
    cta: 'Prendre rendez-vous',
    sections: ['hero', 'offres', 'niches', 'equipe', 'temoignages', 'contact'],
    keywords: ['comptabilité', 'fiscalité', 'bilan', 'gestion d\'entreprise', 'TVA']
  },
  {
    id: 'cabinet_recrutement',
    label: 'Cabinet de recrutement spécialisé',
    secteur: 'Services B2B',
    focus: 'Prouver la spécialisation et le réseau, convaincre les entreprises de confier leurs mandats.',
    cta: 'Confier un recrutement',
    sections: ['hero', 'specialisation', 'methode', 'references', 'temoignages', 'contact'],
    keywords: ['recrutement', 'chasseur de têtes', 'ressources humaines', 'talent']
  },
  {
    id: 'dentiste',
    label: 'Clinique dentaire',
    secteur: 'Santé / Bien-être',
    focus: 'Rassurer sur l\'hygiène et le matériel, montrer l\'équipe, faciliter la prise de RDV.',
    cta: 'Prendre rendez-vous',
    sections: ['hero', 'soins', 'equipe', 'equipement', 'temoignages', 'contact'],
    keywords: ['dentiste', 'implant dentaire', 'orthodontie', 'blanchiment', 'soins dentaires']
  },
  {
    id: 'clinique_esthetique',
    label: 'Clinique esthétique / médicale',
    secteur: 'Santé / Bien-être',
    focus: 'Créer confiance et désirabilité, guider vers le bon parcours patient.',
    cta: 'Prendre rendez-vous',
    sections: ['hero', 'soins', 'praticiens', 'avant_apres', 'temoignages', 'contact'],
    keywords: ['médecine esthétique', 'laser', 'rajeunissement', 'traitement corps']
  },
  {
    id: 'centre_formation',
    label: 'Centre de formation / école privée',
    secteur: 'Formation',
    focus: 'Vendre la promesse de transformation, répondre aux objections et pousser à l\'inscription.',
    cta: 'Demander une brochure',
    sections: ['hero', 'formations', 'resultats', 'temoignages', 'financement', 'contact'],
    keywords: ['formation professionnelle', 'certification', 'reconversion', 'CPF']
  },
  {
    id: 'bureau_etudes',
    label: 'Bureau d\'études',
    secteur: 'Services B2B',
    focus: 'Prouver la compétence technique et les références, convaincre dans les appels d\'offre.',
    cta: 'Nous contacter',
    sections: ['hero', 'expertises', 'references', 'certifications', 'equipe', 'contact'],
    keywords: ['bureau d\'études', 'ingénierie', 'thermique', 'structure', 'environnement']
  },
  {
    id: 'cabinet_conseil',
    label: 'Cabinet de conseil B2B',
    secteur: 'Services B2B',
    focus: 'Rendre la valeur tangible via les cas clients et la méthode, générer des prises de RDV.',
    cta: 'Planifier un appel stratégique',
    sections: ['hero', 'offres', 'methode', 'cas_clients', 'equipe', 'contact'],
    keywords: ['conseil', 'stratégie', 'transformation', 'performance', 'management']
  },
  {
    id: 'couvreur',
    label: 'Couvreur (toiture)',
    secteur: 'BTP / Rénovation',
    focus: 'Capter l\'urgence, rassurer sur certifications et garanties, convertir en appel immédiat.',
    cta: 'Appeler maintenant pour un devis',
    sections: ['hero', 'services', 'certifications', 'realisations', 'temoignages', 'contact'],
    keywords: ['couvreur', 'toiture', 'ardoise', 'tuile', 'réfection toiture', 'fuite']
  },
  {
    id: 'gestion_patrimoine',
    label: 'Gestion de patrimoine (CGP)',
    secteur: 'Services aux particuliers',
    focus: 'Inspirer confiance sur la gestion d\'argent, qualifier les clients (profil investisseur).',
    cta: 'Prendre rendez-vous',
    sections: ['hero', 'services', 'methode', 'conformite', 'equipe', 'contact'],
    keywords: ['gestion de patrimoine', 'investissement', 'fiscalité', 'retraite', 'placement']
  },
  {
    id: 'kine',
    label: 'Centre de kinésithérapie',
    secteur: 'Santé / Bien-être',
    focus: 'Mettre en avant les spécialités, l\'équipe et faciliter la prise de RDV en ligne.',
    cta: 'Prendre rendez-vous',
    sections: ['hero', 'specialites', 'equipe', 'equipement', 'temoignages', 'contact'],
    keywords: ['kinésithérapie', 'rééducation', 'sport', 'dos', 'massages']
  },
  {
    id: 'salle_sport',
    label: 'Salle de sport premium / studio',
    secteur: 'Santé / Bien-être',
    focus: 'Vendre l\'expérience et les résultats, pousser à un essai gratuit.',
    cta: 'Essayer gratuitement',
    sections: ['hero', 'programmes', 'equipement', 'coaches', 'resultats', 'contact'],
    keywords: ['salle de sport', 'fitness', 'musculation', 'coaching', 'bien-être']
  },
  {
    id: 'deratisation',
    label: 'Dératisation / désinsectisation',
    secteur: 'Services aux particuliers',
    focus: 'Capter l\'urgence, rassurer sur la méthode et la sécurité, déclencher un appel immédiat.',
    cta: 'Intervention rapide : appelez maintenant',
    sections: ['hero', 'services', 'methode', 'securite', 'zones', 'contact'],
    keywords: ['dératisation', 'désinsectisation', 'punaises de lit', 'cafards', 'nuisibles']
  },
  {
    id: 'transport_b2b',
    label: 'Transport B2B / logistique',
    secteur: 'Services B2B',
    focus: 'Prouver la capacité et la fiabilité, simplifier la demande de devis transport.',
    cta: 'Demander un devis transport',
    sections: ['hero', 'services', 'zones', 'flotte', 'references', 'contact'],
    keywords: ['transport', 'logistique', 'messagerie', 'livraison', 'fret']
  },
  {
    id: 'climatisation',
    label: 'Climatisation / chauffage',
    secteur: 'BTP / Rénovation',
    focus: 'Capter la demande saisonnière et urgente, convertir via devis rapide.',
    cta: 'Devis gratuit sous 24h',
    sections: ['hero', 'services', 'marques', 'certifications', 'realisations', 'contact'],
    keywords: ['climatisation', 'chauffage', 'pompe à chaleur', 'PAC', 'entretien clim']
  },
  {
    id: 'hotel',
    label: 'Hôtel 4 étoiles et plus',
    secteur: 'Loisirs / Hôtellerie',
    focus: 'Vendre l\'expérience premium, augmenter les réservations directes (sans OTA).',
    cta: 'Réserver directement',
    sections: ['hero', 'chambres', 'experiences', 'restaurant', 'avis', 'contact'],
    keywords: ['hôtel', 'chambre', 'séjour', 'spa', 'restaurant gastronomique']
  },
  {
    id: 'animaux',
    label: 'Services aux animaux (toilettage, garde, dressage)',
    secteur: 'Services aux particuliers',
    focus: 'Rassurer sur la bienveillance et l\'expérience, montrer les installations, faciliter la réservation.',
    cta: 'Réserver une prestation',
    sections: ['hero', 'services', 'installations', 'equipe', 'temoignages', 'contact'],
    keywords: ['toilettage chien', 'pension animaux', 'dressage', 'garde chien', 'vétérinaire']
  },
  {
    id: 'coach',
    label: 'Coach (sport, business, santé, carrière)',
    secteur: 'Services aux particuliers',
    focus: 'Vendre la transformation, rendre la promesse concrète, pousser à un appel découverte.',
    cta: 'Réserver un appel découverte',
    sections: ['hero', 'offre', 'methode', 'resultats', 'temoignages', 'contact'],
    keywords: ['coaching', 'coach', 'accompagnement', 'transformation', 'objectifs']
  },
  {
    id: 'escape_game',
    label: 'Escape game / salle de loisirs',
    secteur: 'Loisirs / Hôtellerie',
    focus: 'Vendre l\'expérience et l\'immersion, pousser à la réservation de groupe.',
    cta: 'Réserver une session',
    sections: ['hero', 'scenarios', 'infos_pratiques', 'groupes', 'avis', 'contact'],
    keywords: ['escape game', 'jeu d\'évasion', 'team building', 'loisirs', 'activité groupe']
  },
  {
    id: 'saas',
    label: 'SaaS / startup structurée',
    secteur: 'Services B2B',
    focus: 'Expliquer la valeur produit, répondre aux objections, convertir vers une démo.',
    cta: 'Demander une démo',
    sections: ['hero', 'fonctionnalites', 'benefices', 'tarifs', 'temoignages', 'contact'],
    keywords: ['logiciel', 'SaaS', 'application', 'automatisation', 'productivité']
  },
  {
    id: 'agence_com',
    label: 'Agence de branding / communication',
    secteur: 'Services B2B',
    focus: 'Prouver la compétence par le site lui-même, attirer des clients à budget élevé.',
    cta: 'Discuter de votre projet',
    sections: ['hero', 'services', 'portfolio', 'methode', 'clients', 'contact'],
    keywords: ['branding', 'communication', 'identité visuelle', 'logo', 'marketing']
  },
  {
    id: 'menuiserie',
    label: 'Menuiserie haut de gamme (sur-mesure)',
    secteur: 'BTP / Rénovation',
    focus: 'Justifier le prix via la qualité perçue et les réalisations, attirer des projets rentables.',
    cta: 'Demander un devis sur-mesure',
    sections: ['hero', 'realisations', 'savoir_faire', 'materiaux', 'temoignages', 'contact'],
    keywords: ['menuiserie', 'sur-mesure', 'cuisine', 'dressing', 'bois', 'artisan']
  },
  {
    id: 'isolation',
    label: 'Isolation thermique / rénovation énergétique',
    secteur: 'BTP / Rénovation',
    focus: 'Simplifier les aides disponibles (MaPrimeRénov), convertir en demande de devis.',
    cta: 'Vérifier mon éligibilité aux aides',
    sections: ['hero', 'services', 'aides', 'economie', 'certifications', 'contact'],
    keywords: ['isolation', 'rénovation énergétique', 'MaPrimeRénov', 'combles', 'DPE']
  }
];

module.exports = { NICHES };
