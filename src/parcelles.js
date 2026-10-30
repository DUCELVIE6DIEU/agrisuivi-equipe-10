
export function formaterParcelle(parcelle) {
  return `${parcelle.id} | ${parcelle.producteur} | ${parcelle.localite} | ${parcelle.culture} | ${parcelle.surface} ha`;
}

export function trouverParcelle(parcelles, id) {
  return parcelles.find((parcelle) => {
    return parcelle.id === id
  });
}

export function parcellesParCulture(parcelles, culture) {
  return parcelles.filter(
    (parcelle)=> {
    return parcelle.culture === culture
  });

}
export function surfaceTotale(parcelles) {
  if (parcelles.length === 0){
    return 0
  } else{
    return parcelles.reduce((accum,valeur)=> accum + valeur.surface, 0
  )
  }
}


export function resumeParCulture(parcelles) {
  const resume = {};
  for (const parcelle of parcelles){
    const culture = parcelles.culture; 
    if (!resume[parcelle.culture]) {
      resume[parcelle.culture] = { nombre: 0, surface: 0};
    }

    resume[parcelle.culture].nombre++;
    resume[parcelle.culture].surface += parcelle.surface;
  }

  return resume;
}
