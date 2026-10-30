export function totalRecolte(recoltes, idParcelle) {
  return recoltes
    .filter((recolte) => recolte.parcelle === idParcelle)
    .reduce((somme, recolte) => somme + recolte.kg, 0);
}
