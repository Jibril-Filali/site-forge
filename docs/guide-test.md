# Comment tester le site tout seul

---

## Ouvrir le site en local

1. Ouvrir le dossier du projet sur ton ordinateur
2. Double-cliquer sur **`index.html`**
3. Le site s'ouvre directement dans ton navigateur — aucun serveur, aucune installation nécessaire

---

## Tester chaque page

Ouvre chaque fichier HTML directement :

| Page | Fichier |
|------|---------|
| Accueil | `index.html` |
| Nos Aventures | `nos-aventures.html` |
| Nos Tarifs | `nos-tarifs.html` |
| Réservation | `reservation.html` |
| Team Building | `team-building.html` |
| Événements | `evenements.html` |
| FAQ | `faq.html` |
| Qui sommes-nous | `qui-sommes-nous.html` |
| Histoire de l'Isba | `histoire-isba.html` |
| Contact | `nous-contacter.html` |
| Horaires | `nos-horaires.html` |
| Panier | `panier.html` |

---

## Checklist de test

### Navigation
- [ ] Cliquer sur chaque lien du menu — vérifie qu'il amène à la bonne page
- [ ] Réduire la fenêtre à moins de 768px — le menu hamburger doit apparaître
- [ ] Cliquer sur le hamburger — le menu mobile s'ouvre/ferme
- [ ] Scroller vers le bas — la nav doit devenir opaque avec un fond sombre

### Animations
- [ ] Scroller doucement vers le bas — les blocs doivent apparaître un par un
- [ ] Remonter vers le haut — les blocs doivent disparaître puis réapparaître en redescendant

### Pages
- [ ] Page réservation : sélectionner une salle, le nom s'affiche dans le récapitulatif
- [ ] Page réservation : changer le nombre de joueurs, le prix total se met à jour
- [ ] Page FAQ : cliquer sur une question, la réponse s'ouvre / se ferme
- [ ] Page contact : remplir et envoyer le formulaire (simulation — message "Envoi..." puis "Message envoyé !")

### Responsive
- [ ] Ouvrir les DevTools (F12) > icône mobile en haut
- [ ] Tester sur iPhone SE (375px), iPad (768px), Desktop (1200px)
- [ ] Vérifier que les grilles passent en colonne sur mobile

### Images
- [ ] Les emplacements d'images avec `onerror` s'affichent en fond sombre si l'image manque — c'est normal
- [ ] Ajouter les vraies images dans le dossier `images/` et rafraîchir

---

## Ajouter les images

Dépose tes images dans le dossier `images/` avec ces noms exacts :

| Image | Fichier attendu |
|-------|----------------|
| Hero principal | `images/hero.jpg` |
| Salle Athazagoraphobia | `images/athazagoraphobia.jpg` |
| Salle Héros de Midgard | `images/heros-de-midgard.jpg` |
| Salle Ho-Ho-Ho | `images/ho-ho-ho.jpg` |
| Intérieur isba | `images/isba-interieur.jpg` |
| Extérieur isba | `images/isba-exterieur.jpg` |
| Équipe | `images/equipe.jpg` |
| Team building | `images/team-building.jpg` |
| Galerie 1, 2, 3 | `images/galerie-1.jpg`, `galerie-2.jpg`, `galerie-3.jpg` |

---

## Mettre en ligne

1. Compresser le dossier entier en ZIP (sans `node_modules`, sans `docs/`, sans `tasks/`)
2. L'uploader sur l'hébergeur (OVH, Infomaniak, o2switch, Hostinger...)
3. Ou connecter le repo GitHub à Railway/Vercel/Netlify pour un déploiement automatique
