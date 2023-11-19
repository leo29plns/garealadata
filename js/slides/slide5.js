// VARIABLES QUI CONTIENNE MES JEUX DE DONNEES
const voyageur_global = _globalData['slide5']['nombre_voyageurs.json'];
const habitant_global = _globalData['slide5']['french_inhabitants_per_years.json'];

// FUSIONNER LES DONNES DANS UN SEUL TABLEAU
function fusionDatainTab (voyageursParAnnee,habitantsParAnnee){
    let objetYearFusion = [];
        voyageursParAnnee.forEach(voyageurs => {
            const annee = voyageurs['year'];
            if(!objetYearFusion[annee]){
                objetYearFusion[annee] = {};
                objetYearFusion[annee]['annee'] = annee;
            }
            objetYearFusion[annee]['travellers'] = voyageurs['travellers'];
        });
            
        habitantsParAnnee.forEach(habitants => {
            const annee = habitants['year'];
            if(!objetYearFusion[annee]){
                objetYearFusion[annee] = {};
                objetYearFusion[annee]['annee'] = annee;
            }
            objetYearFusion[annee]['habitants'] = habitants['french-inhabitant'];
        });   

    return objetYearFusion;  
}

// TABLEAU AVEC LES VALEURS FUSIONNEES ET SUPPRESSION DE CELLES OU LE NOMBRE D'HABITANTS N'EXISTE PAS
const TabVoyageurEtHabitant = fusionDatainTab(voyageur_global,habitant_global).filter(objet => objet.hasOwnProperty('habitants'));

// FONCTION QUI CALCUL LE NOMBRE MOYEN DE VOYAGE PAR HABITANTS
function moyenneVoyageParHabitant (tabVoyageHab){
    let TabnbrMoyenParAnnee = [];
        
    tabVoyageHab.forEach(el => {
        let nbrMoyenParAnnee = {};
        const nbrMoyen = (el['travellers'] / el['habitants']).toFixed(2);
        nbrMoyenParAnnee.annee = el['annee'];
        nbrMoyenParAnnee.nombre_moyen = nbrMoyen;
        TabnbrMoyenParAnnee.push(nbrMoyenParAnnee);
    });

    return TabnbrMoyenParAnnee;
}

// TABLEAU AVEC LE NOMBRE MOYEN DE VOYAGES MOYEN POUR CHAQUE ANNEE
const moyenneNbrVoyage = moyenneVoyageParHabitant(TabVoyageurEtHabitant);
// console.log(moyenneNbrVoyage);


// CREATION DU GRAPHIQUE
function creationchart(chartData) {
    let chartValuesYear = [];
    let chartValuesAverageNbr = [];
    chartData.forEach(el => {
        chartValuesYear.push(el['annee']);
        chartValuesAverageNbr.push(el['nombre_moyen']);
    })
    const graph = document.getElementById('graphique_frequentation');

    new Chart(graph, {
        type: 'line',
        data: {
            labels: chartValuesYear,
            datasets: [{
                data: chartValuesAverageNbr,
                borderWidth: 1,
                backgroundColor: "#4A412AFF",
                borderColor: "#4A412AFF",
                // fill: true,
            }]
        },
       
        options: {
            responsive: true,

            plugins: {
                legend: {
                    display: false,
                },
            },
            maintainAspectRatio: true,
            scales: {
                y: {
                    stacked: true,
                    suggestedMin: 0,
                    suggestedMax: 20,
                    grid: {
                        display: true,
                        color: "4A412A"
                    },

                    title: {
                        display: true,
                        text: 'Nombre de voyages moyen par habitant',
                        color: '#4A412AFF',
                        font: {
                          family: 'Avenir',
                          size: 18,
                          weight: 700,
                          lineHeight: 1.2
                        },
                    },

                    ticks:{
                        color:"#4A412AFFA",
                    },
                },


                x: {
                    grid: {
                        display: false,
                    },

                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 8,
                        callback: function (value, index, values) {
                           // Afficher le label tous les (nombre total d'années / nombre de labels souhaité) ans
                            const step = Math.ceil(chartValuesYear.length / 8);
                            return index % step === 0 ? chartValuesYear[index] : '';
                        },
                        color:"#4A412AFF",

                    },
                },
            },
            onResize: function (chart, size) {
                // Ajustez la taille du titre en fonction de la largeur du conteneur
                const newSize = Math.min(size.width / 45, 18); 
                chart.options.scales.y.title.font.size = newSize;
                chart.update();
            },

        },
    });
}

creationchart(moyenneNbrVoyage);