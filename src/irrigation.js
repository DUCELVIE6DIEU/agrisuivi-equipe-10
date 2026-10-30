
export function relevesDeParcelle(releves, idParcelle) {
  return releves.filter((releve) => releve.parcelle === idParcelle);
}

// Renvoie la moyenne des humidités, arrondie à l'entier le plus proche.
// Liste vide : null (on ne peut pas calculer de moyenne).
export function moyenneHumidite(releves) {
  throw new Error(
    "TODO Membre 2 : coder moyenneHumidite dans src/irrigation.js",
  );
}

// Renvoie 'INCONNU', 'ARROSER', 'DRAINER' ou 'OK'.
// Les bornes humiditeMin et humiditeMax font partie de la zone 'OK'.
export function etatIrrigation(humidite, culture) {
  throw new Error(
    "TODO Membre 2 : coder etatIrrigation dans src/irrigation.js",
  );
}

// Renvoie un tableau d'alertes, une par parcelle, dans le même ordre que parcelles.
// Chaque alerte : { id, producteur, culture, moyenne, etat }
export function alertesIrrigation(parcelles, releves, cultures) {
  throw new Error(
    "TODO Membre 2 : coder alertesIrrigation dans src/irrigation.js",
  );
}
