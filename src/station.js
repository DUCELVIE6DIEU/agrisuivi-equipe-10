// BONUS — Station connectée : simuler des capteurs qui répondent après un délai.

// Renvoie une promesse qui se résout après capteur.delai millisecondes avec
// { parcelle, humidite }, ou qui est rejetée si le capteur n'est pas en ligne.
export function interrogerCapteur(capteur) {
  return new Promise((resolve, reject) => {
    // On simule le temps de réponse du réseau avec setTimeout
    setTimeout(() => {
      // Si le capteur est explicitement hors ligne
      if (capteur.enLigne === false) {
        // On récupère le nom (ou l'id) du capteur pour le message d'erreur
        const nomCapteur = capteur.nom || capteur.id || "inconnu";
        reject(new Error(`Capteur ${nomCapteur} hors ligne`));
      } else {
        // Sinon, on renvoie les données attendues
        resolve({ parcelle: capteur.parcelle, humidite: capteur.humidite });
      }
    }, capteur.delai);
  });
}

// Même travail que interrogerCapteur, mais ne rejette jamais :
// en cas d'erreur, renvoie { parcelle, erreur } avec le message de l'erreur.
export async function interrogerSansPlanter(capteur) {
  try {
    return await interrogerCapteur(capteur);
  } catch (erreur) {
    return { parcelle: capteur.parcelle, erreur: erreur.message };
  }
}

// Interroge les capteurs L'UN APRÈS L'AUTRE (on attend chaque réponse).
export async function releverUnParUn(capteurs) {
  const resultats = [];
  
  for (const capteur of capteurs) {
    const resultat = await interrogerSansPlanter(capteur);
    resultats.push(resultat);
  }
  
  return resultats;
}

// Interroge tous les capteurs EN MÊME TEMPS. Les résultats gardent l'ordre des capteurs.
export async function releverEnParallele(capteurs) {
  const promesses = capteurs.map((capteur) => interrogerSansPlanter(capteur));
  
  // Promise.all attend que toutes les promesses soient terminées
  return await Promise.all(promesses);
}