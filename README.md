# AgriSuivi — mini-projet d'équipe

## Le scénario

La coopérative agricole **Terre d'Avenir** regroupe huit producteurs à Soubré, Daloa, Korhogo, Bouaké, Yamoussoukro et Gagnoa. Elle a installé des **capteurs d'humidité du sol** dans les parcelles et note chaque récolte.

Aujourd'hui, tout est dans des fichiers JSON et personne n'a le temps de les lire. La coopérative vous demande un outil simple, utilisable dans le terminal :

- Quelles parcelles faut-il **arroser** ou **drainer** ?
- Combien a-t-on **récolté**, et combien cela peut-il **rapporter** ?
- Peut-on ajouter un **nouveau relevé** de capteur ?
- Peut-on produire un **rapport du jour** dans un fichier ?

Votre équipe de quatre construit cet outil : **AgriSuivi**.

## Ce que vous allez pratiquer

| Notion du cours                                                       | Où dans le projet                                          |
| --------------------------------------------------------------------- | ---------------------------------------------------------- |
| Variables, chaînes, conversions avec `Number` (J03)                   | `formaterParcelle`, `creerReleve`                          |
| Conditions et boucles (J04)                                           | `etatIrrigation`, `resumeParCulture`                       |
| Fonctions, paramètres, `return` (J05)                                 | toutes les fonctions de `src`                              |
| `find`, `filter`, `map`, `reduce`, tri sans modifier l'original (J06) | parcelles, irrigation, récoltes                            |
| Objets et JSON (J07)                                                  | les fichiers du dossier `donnees`                          |
| Modules `import` / `export`, arguments du terminal, fichiers (J08)    | `app.js`, `src/*.js`                                       |
| Promesses, `async` / `await`, `try` / `catch` (J09)                   | `src/donnees.js`, `src/rapport.js`, bonus `src/station.js` |
| Tests `node:test` (J10)                                               | dossier `test`                                             |
| Git et GitHub (J02)                                                   | un dépôt partagé par l'équipe                              |

Aucune bibliothèque externe : seulement Node.js.

## Les rôles

Chaque membre est responsable d'**un fichier** et de sa **fiche** dans le dossier `fiches`. Vous travaillez chacun dans votre fichier : vous vous gênez très peu dans Git.

| Rôle                      | Fichier             | Fiche                        | Vérifier son travail      |
| ------------------------- | ------------------- | ---------------------------- | ------------------------- |
| Membre 1 — Parcelles      | `src/parcelles.js`  | `fiches/1-parcelles.md`      | `npm run test:parcelles`  |
| Membre 2 — Irrigation     | `src/irrigation.js` | `fiches/2-irrigation.md`     | `npm run test:irrigation` |
| Membre 3 — Récoltes       | `src/recoltes.js`   | `fiches/3-recoltes.md`       | `npm run test:recoltes`   |
| Membre 4 — Données        | `src/donnees.js`    | `fiches/4-donnees.md`        | `npm run test:donnees`    |
| Toute l'équipe — Rapport  | `src/rapport.js`    | `fiches/5-equipe-rapport.md` | `npm run test:rapport`    |
| Bonus — Station connectée | `src/station.js`    | `fiches/6-bonus-station.md`  | `npm run test:station`    |

> **Membre 4 commence par `lireJson` et `chargerDonnees`.** Sans elles, l'application ne peut rien afficher. Pendant ce temps, les autres avancent grâce aux tests, qui n'ont pas besoin des fichiers JSON.

Ne modifiez pas `app.js` ni les tests fournis. Vous pouvez **ajouter** vos propres tests.

## Démarrer (30 minutes)

1. **Ensemble** : répartissez les quatre rôles. Le chef d'équipe les note dans le tableau « Notre équipe » en bas de ce fichier. Lui seul modifie ce tableau : cela évite un conflit Git dès le départ.
2. **Chef d'équipe** : créez un dépôt GitHub `agrisuivi-equipe-XX`, ajoutez les trois autres membres comme collaborateurs (_Settings > Collaborators_), puis envoyez le dossier de départ :
   ```powershell
   cd agrisuivi
   git init
   git add .
   git commit -m "Départ du projet AgriSuivi"
   git branch -M main
   git remote add origin https://github.com/VOTRE-COMPTE/agrisuivi-equipe-XX.git
   git push -u origin main
   ```
3. **Les autres membres** : acceptez l'invitation reçue sur GitHub, puis clonez le dépôt et ouvrez le dossier `agrisuivi` dans VS Code (_Fichier > Ouvrir le dossier_).
4. **Tout le monde**, dans le terminal de VS Code :
   ```powershell
   node app.js aide
   npm test
   ```
   La première commande affiche l'aide. La seconde montre **43 tests rouges** : c'est normal, rien n'est encore codé.

## Travailler ensemble avec Git

Pour chaque fonction terminée :

```powershell
npm run test:parcelles          # vos tests passent au vert
git add src/parcelles.js
git commit -m "parcelles : surfaceTotale avec reduce"
git pull                            # récupérer le travail des autres
git push                            # partager le vôtre
```

- Un commit = une petite étape qui marche. Écrivez un message qui dit **ce que** vous avez fait.
- Faites toujours `git pull` avant `git push`.
- La commande `node app.js releve ...` modifie `donnees/releves.json`. Pour retrouver le fichier d'origine : `git restore donnees/releves.json`.

## Les commandes de l'application

Le fichier `app.js` est fourni. Chaque commande marche dès que les fonctions qu'elle utilise sont codées.

| Commande                       | Ce qu'elle fait                                         | Fonctions utilisées  |
| ------------------------------ | ------------------------------------------------------- | -------------------- |
| `node app.js aide`             | Affiche l'aide                                          | aucune               |
| `node app.js parcelles`        | Liste les parcelles et la surface totale                | Membres 1 et 4       |
| `node app.js parcelles cacao`  | Liste seulement les parcelles de cacao                  | Membres 1 et 4       |
| `node app.js parcelle P03`     | Fiche complète d'une parcelle                           | Membres 1, 2, 3 et 4 |
| `node app.js irrigation`       | Parcelles à arroser ou à drainer                        | Membres 2 et 4       |
| `node app.js recoltes`         | Classement par revenu estimé                            | Membres 3 et 4       |
| `node app.js releve P07 64 29` | Ajoute un relevé : parcelle, humidité %, température °C | Membres 1 et 4       |
| `node app.js rapport`          | Écrit `sorties/rapport-AAAA-MM-JJ.txt`                  | Toute l'équipe       |
| `node app.js station`          | Interroge les capteurs connectés                        | Bonus                |

Si une fonction n'est pas encore codée, la commande affiche par exemple :

```text
Erreur : TODO Membre 4 : coder chargerDonnees dans src/donnees.js
```

## Les étapes

**Étape 1 — Chacun sa partie.** Codez les fonctions de votre fiche, une par une. Après chaque fonction : lancez vos tests, puis faites un commit.

**Étape 2 — L'application tourne.** Quand le Membre 4 a terminé `chargerDonnees`, essayez les commandes de vos fonctions. Vérifiez les résultats avec la section « Résultats attendus » ci-dessous.

**Étape 3 — Le rapport, ensemble.** Codez `src/rapport.js` à quatre, sur un seul ordinateur : une personne tape, les autres guident, puis vous changez de clavier toutes les 15 minutes. Objectif : `npm test` affiche **38 tests verts** (tous sauf les 5 du bonus).

**Étape 4 — Améliorer.** Ajoutez vos propres tests (cas limites), corrigez les défauts avec le débogueur de VS Code, puis tentez le bonus `station`.

**Étape 5 — Présenter.** Préparez une démonstration de cinq minutes. Chaque membre doit pouvoir expliquer **sa** fonction la plus difficile et répondre à une question sur une fonction d'un autre membre.

## Résultats attendus

Avec les données fournies (avant tout ajout de relevé), `node app.js rapport` affiche :

```text
=== RAPPORT AGRISUIVI DU 2026-10-29 ===
Parcelles suivies : 8
Surface totale : 15.5 ha

--- Irrigation ---
À arroser : P02, P04
À drainer : P05, P08
Sans relevé : P07

--- Récoltes ---
Production totale : 26800 kg
Revenu estimé : 10650000 FCFA
Meilleure parcelle : P01 (Awa Diallo) avec 3300000 FCFA
```

La date de la première ligne est celle du jour. Le formateur testera aussi votre programme avec **d'autres données** : n'écrivez jamais un résultat « en dur » dans le code.

## Ce que vous remettez

- L'adresse de votre dépôt GitHub, avec les commits de **chaque** membre.
- Un `npm test` qui passe, et le fichier `sorties/rapport-AAAA-MM-JJ.txt`.
- Le tableau « Notre équipe » ci-dessous, complété.

## Comment vous serez évalués (sur 20)

| Critère                                                                            | Points     |
| ---------------------------------------------------------------------------------- | ---------- |
| Les tests fournis passent (hors bonus)                                             | 6          |
| L'application fonctionne avec d'autres données et affiche des erreurs claires      | 3          |
| Code lisible : noms clairs, indentation, pas de code inutile                       | 1          |
| Git : chaque membre a fait des commits avec des messages clairs                    | 2          |
| **Individuel** : vous expliquez votre code et vous le modifiez devant le formateur | 8          |
| Bonus : vos propres tests, station connectée                                       | jusqu'à +2 |

## Notre équipe

| Rôle                  | Prénom et nom | Compte GitHub |
| --------------------- | ------------- | ------------- |
| Membre 1 — Parcelles  | BATSIMBA      | DUCELVIE6DIEU |
| Membre 2 — Irrigation | KAKEU         | kakeu-df      |
| Membre 3 — Récoltes   | MAHAN         |    mahanj67   |
| Membre 4 — Données    | VIEGNEKOU     |  Viegnekou    |
