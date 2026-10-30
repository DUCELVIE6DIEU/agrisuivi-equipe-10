// MEMBRE 4 — Données : lire et écrire les fichiers JSON de façon asynchrone.
// Fiche : fiches/4-donnees.md · Vérifier : npm run test:donnees
// À faire EN PREMIER : sans lireJson et chargerDonnees, l'application ne peut rien afficher.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DOSSIER = path.join(process.cwd(), "donnees");

// Lit un fichier JSON et renvoie son contenu converti en valeur JavaScript.
export async function lireJson(nomFichier) {
  const chemin = nomFichier.includes('/') || nomFichier.includes('\\')
    ? nomFichier
    : path.join(DOSSIER, nomFichier);

  try {
    const texte = await readFile(chemin, "utf8");
    return JSON.parse(texte);
  } catch (err) {
    if (err.code === "ENOENT") throw new Error(`Impossible de lire le fichier : ${nomFichier}`, { cause: err });
    if (err instanceof SyntaxError) throw new Error(`Impossible de lire le fichier (JSON invalide) : ${nomFichier}`, { cause: err });
    throw err;
  }
}

// Étape 4.4 (PDF) - Écrire dans un fichier JSON
export async function ecrireJson(nomFichier, contenu) {
  const chemin = nomFichier.includes('/') || nomFichier.includes('\\')
    ? nomFichier
    : path.join(DOSSIER, nomFichier);
  await writeFile(chemin, JSON.stringify(contenu, null, 2), "utf8");
}

// Lit les quatre fichiers EN MÊME TEMPS avec Promise.all.
export async function chargerDonnees(dossier = DOSSIER) {
  const [parcelles, cultures, releves, recoltes] = await Promise.all([
    lireJson(path.join(dossier, "parcelles.json")),
    lireJson(path.join(dossier, "cultures.json")),
    lireJson(path.join(dossier, "releves.json")),
    lireJson(path.join(dossier, "recoltes.json")),
  ]);
  return { parcelles, cultures, releves, recoltes };
}

// Vérifie les textes tapés dans le terminal et renvoie un nouveau relevé.
export function creerReleve(parcelle, humiditeTexte, temperatureTexte, date) {
  if (!parcelle) {
    throw new Error("Identifiant de parcelle manquant ou invalide");
  }

  const h = Number(humiditeTexte);
  const t = Number(temperatureTexte);

  if (!Number.isFinite(h) || h < 0 || h > 100) {
    throw new Error(`Humidite invalide : ${humiditeTexte} (0-100 attendu)`);
  }
  if (!Number.isFinite(t)) {
    throw new Error(`Temperature invalide : ${temperatureTexte}`);
  }

  return {
    parcelle: String(parcelle).toUpperCase(),
    date: date || new Date().toISOString().slice(0, 10),
    humidite: h,
    temperature: t,
  };
}

// Ajoute le relevé à la fin du fichier JSON, enregistre le fichier,
// puis renvoie le nouveau nombre de relevés.
export async function ajouterReleve(chemin, releve) {
  const releves = await lireJson(chemin);
  releves.push(releve);
  await ecrireJson(chemin, releves);
  return releves.length;
}