import {fetchAndGroupFiles} from '../functions.js';

function groupByYearAndCategory(objets) {
    const groupes = {};

    for (const el of objets) {
        const annee = el.date.split('-')[0];
        if (!groupes[annee]) {
            groupes[annee] = {};
        }

        if (!groupes[annee][el.indicateur]) {
            groupes[annee][el.indicateur] = [];
        }
        groupes[annee][el.indicateur].push(el);
    }

    return groupes;
}


function moyenneTableau(tableau) {
    const somme = tableau.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return somme / tableau.length;
}


function moyenneParAnneeEtCategorie(groupedData) {
    let moyenneParAnneeEtCategorie = {};

    for (const annee in groupedData) {
        const statAnnee = groupedData[annee];

        let moyennesIndicateursAnnee = {};

        for (const nomIndicateur in statAnnee) {
            const indicateur = statAnnee[nomIndicateur];

            let notesIndicateurAnnee = [];

            indicateur.forEach(function (mois) {
                const noteIndicateurMois = mois['global'];

                notesIndicateurAnnee.push(noteIndicateurMois);
            });

            moyennesIndicateursAnnee[nomIndicateur] = Math.round(moyenneTableau(notesIndicateurAnnee));
        }

        // annee correspond la clé et moyenneIndicateursAnnee est donc la valeur qui est lui même un objet
        moyenneParAnneeEtCategorie[annee] = moyennesIndicateursAnnee;
    }
    
    return moyenneParAnneeEtCategorie;
}




// Usage
const fileNames = [
    "./opinion_2015_2017.json",
    "./opinion_2018_2021.json",
    "./opinion_2022_2023.json"
];


fetchAndGroupFiles(fileNames);

console.log(
    fetchAndGroupFiles(fileNames),
    // moyenneParAnneeEtCategorie(patate)
);