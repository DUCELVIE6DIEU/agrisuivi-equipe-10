import fs from 'fs/promises';
import path from 'path';

import { surfaceTotale } from './parcelles.js';
import { alertesIrrigation } from './irrigation.js';
import { bilanRecoltes, classerParRevenu } from './recoltes.js';

export function listerParEtat(alertes, etat) {
  const resultat = alertes.filter(a => a.etat === etat).map(a => a.id);
  if (resultat.length === 0) {
    return "aucune";
  }
  return resultat.join(', ');
}

// On ajoute un 2ème paramètre 'date' avec la date du jour par défaut
export function construireRapport(donnees, date = new Date().toISOString().split('T')[0]) {
  
  const surface = surfaceTotale(donnees.parcelles);
  const alertes = alertesIrrigation(donnees.parcelles, donnees.releves, donnees.cultures);
  
  const aArroser = listerParEtat(alertes, 'ARROSER');
  const aDrainer = listerParEtat(alertes, 'DRAINER');
  const sansReleve = listerParEtat(alertes, 'INCONNU');

  const bilan = bilanRecoltes(donnees.parcelles, donnees.recoltes, donnees.cultures);
  const productionTotale = bilan.reduce((total, item) => total + item.kg, 0);
  const revenuTotal = bilan.reduce((total, item) => total + item.revenu, 0);
  const classement = classerParRevenu(bilan);
  const meilleureParcelle = classement[0]; 

  let texte = `=== RAPPORT AGRISUIVI DU ${date} ===\n`;
  texte += `Parcelles suivies : ${donnees.parcelles.length}\n`;
  texte += `Surface totale : ${surface} ha\n\n`;
  
  texte += `--- Irrigation ---\n`;
  texte += `À arroser : ${aArroser}\n`;
  texte += `À drainer : ${aDrainer}\n`;
  texte += `Sans relevé : ${sansReleve}\n\n`;

  texte += `--- Récoltes ---\n`;
  texte += `Production totale : ${productionTotale} kg\n`;
  texte += `Revenu estimé : ${revenuTotal} FCFA\n`;
  
  if (meilleureParcelle) {
    texte += `Meilleure parcelle : ${meilleureParcelle.id} (${meilleureParcelle.producteur}) avec ${meilleureParcelle.revenu} FCFA\n`;
  }

  return texte;
}

// On prend le chemin du fichier ET le texte en paramètres
export async function enregistrerRapport(cheminFichier, texte) {
  try {
    // On extrait le nom du dossier depuis le chemin pour le créer
    const dossier = path.dirname(cheminFichier);
    
    // Crée le dossier (s'il n'existe pas déjà)
    await fs.mkdir(dossier, { recursive: true });
    
    // Écrit le fichier
    await fs.writeFile(cheminFichier, texte, 'utf-8');
    
    console.log("Rapport généré avec succès : " + cheminFichier);
  } catch (erreur) {
    console.error("Erreur lors de l'écriture du fichier : " + erreur.message);
  }
}