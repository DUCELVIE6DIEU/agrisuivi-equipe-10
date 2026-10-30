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

export function revenu(kg, prixKg) {
  return kg * prixKg;
}

export function bilanRecoltes(parcelles, recoltes, cultures) {
  return parcelles.map((parcelle) => {
    const culture = cultures.find((c) => c.code === parcelle.culture);
    const prixKg = culture ? culture.prixKg : 0;
    const kg = totalRecolte(recoltes, parcelle.id);

    return {
      id: parcelle.id,
      producteur: parcelle.producteur,
      culture: parcelle.culture,
      kg,
      rendement: rendement(kg, parcelle.surface),
      revenu: revenu(kg, prixKg),
    };
  });

  }

export function classerParRevenu(bilan) {
  return [...bilan].sort((a, b) => b.revenu - a.revenu);
}
