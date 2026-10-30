export function totalRecolte(recoltes, idParcelle) {
  return recoltes
    .filter((recolte) => recolte.parcelle === idParcelle)
    .reduce((somme, recolte) => somme + recolte.kg, 0);
}

export function rendement(kg, surface) {
  if (surface <= 0) {
    throw new RangeError("La surface doit être supérieure à 0");
  }
  return Math.round(kg / surface);
}
