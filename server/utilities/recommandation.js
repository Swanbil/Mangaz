
const MIN_COEFF_RECOMMANDATION = 3.2;


//pref => list contains in p1 =>all mangas rated by p2, in p2 => all mangas rated by p1
//calcul similarity between two user (p1, p2) with pref dictionnary of manga
const eucl_sim = (p1, p2, pref) => {
    const mangasRatedByP1 = Object.keys(pref[p1]);
    var communMangasRated = mangasRatedByP1.filter(k => pref[p2].hasOwnProperty(k))
    if (communMangasRated.length == 0) return 0;
    var carres = communMangasRated.reduce((a, v) => a + (pref[p1][v] - pref[p2][v]) ** 2, 0);
    return 1 / (1 + Math.sqrt(carres));
}

//return array of eucl sim for each users
const meilleurs_critiques = (pers, pref, fnct_sim = eucl_sim) => {
    Object.keys(pref).map(p =>
        p != pers ? [p, fnct_sim(pers, p, pref)] : [p, -1])
        .sort((a, b) => b[1] - a[1])
        .slice(0, -1)
        .join('\n')
}


//recommande mangas for user 'pers' depending on his pref list
const recommande = (pers, pref, fnct_sim = eucl_sim) => {
    var totaux = {}
    var usersSim = {}
    for (var p in pref) {
        if (p == pers) continue
        var sim = fnct_sim(pers, p, pref)
        if (sim <= 0) continue
        for (var l in pref[p]) {
            if (!pref[pers].hasOwnProperty(l)) {
                totaux[l] = (totaux[l] || 0) + sim * pref[p][l]
                usersSim[l] = (usersSim[l] || 0) + sim
            }
        }
    }
    const mangaRecommanded =  Object.entries(totaux);
    return mangaRecommanded
        .map(([l, v]) => [l, v / usersSim[l]])
        .filter((a) => a[1] >= MIN_COEFF_RECOMMANDATION)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
}

module.exports = {
    recommande,
    eucl_sim,
    meilleurs_critiques
}
