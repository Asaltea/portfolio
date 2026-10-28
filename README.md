# Portfolio · Fatima-Zohra Tahiri

Site statique (HTML, CSS, JavaScript, sans framework ni compilation).
Il fonctionne en ouvrant simplement `index.html` dans un navigateur.

## Structure

```
index.html            la page
css/style.css         la mise en forme (couleurs dans :root, en haut)
js/data.js            ← TOUT LE CONTENU : profil, compétences, parcours, projets
js/main.js            la logique (cartes, filtres, fiches, frise)
assets/img/           photo et visuels des projets
netlify.toml          configuration Netlify
.nojekyll             nécessaire pour GitHub Pages
```

## À faire avant la mise en ligne

Dans `js/data.js`, objet `PROFIL` :
- remplir `email`, `linkedin`, `github` ;
- déposer ton CV en PDF dans `assets/` et indiquer son chemin dans `cv` ;
- préciser `stage` (durée, date de début).

Dans `COMPETENCES.informatique`, ajuste la liste aux matières que tu suis vraiment au CNAM.

## Ajouter un projet

1. Dépose une capture d’écran dans `assets/img/projets/` (format paysage, environ 1200 px de large).
2. Dans `js/data.js`, copie le modèle en bas du fichier et colle-le dans `PROJETS`.
3. Choisis la `categorie` : `dev`, `web`, `design`, `video` ou `projet`.
4. Enregistre, recharge la page : la carte, le filtre et la fiche se créent tout seuls.

Pour créer une nouvelle catégorie, ajoute une ligne dans l’objet `CATEGORIES`.

Chaque catégorie a aussi un lien direct, par exemple `…/#dev` ouvre la grille filtrée sur le développement web.

## Mettre en ligne

### Avec GitHub Pages
1. Crée un dépôt sur GitHub (par exemple `portfolio`).
2. Envoie les fichiers :
   ```bash
   git init
   git add .
   git commit -m "Premier commit du portfolio"
   git branch -M main
   git remote add origin https://github.com/TON-PSEUDO/portfolio.git
   git push -u origin main
   ```
3. Sur GitHub : Settings → Pages → Source : « Deploy from a branch », branche `main`, dossier `/ (root)`.
4. Le site sera visible à `https://TON-PSEUDO.github.io/portfolio/`.

### Avec Netlify
- **Le plus rapide** : sur app.netlify.com, « Add new site » → « Deploy manually », puis glisse le dossier.
- **Le plus pratique** : « Import from Git » et choisis ton dépôt GitHub. Laisse la commande de build vide, dossier de publication `.`. Chaque `git push` mettra le site à jour.

## Mode sombre

Le site suit automatiquement le réglage clair ou sombre de l’appareil.
