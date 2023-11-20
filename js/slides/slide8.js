(function () {

    // VARIABLES CONTENANT CHACUNE UN JEU DE DONNES
    const data_opinion_2018 = _globalData['slide8']['opinion_2018_2021.json'];
    const data_opinion_2015 = _globalData['slide8']['opinion_2015_2017.json'];
    const data_opinion_2022 = _globalData['slide8']['opinion_2022_2023.json'];

    // VARIABLE GLOBALE INSERANT TOUTES LES DONNES DANS UN SEUL TABLEAU
    const opinion_global = data_opinion_2015.concat(data_opinion_2018, data_opinion_2022);

    // GROUP DATA BY YEAR AND CATEGORY
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
    const groupYearCategory = groupByYearAndCategory(opinion_global);

    // CALCUL MOYENNE DES NOTES
    function moyenneTableau(tableau) {
        const somme = tableau.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return somme / tableau.length;
    }

    // FONCTION QUI CALCULE LA NOTE MOYENNE POUR CHAQUE CATEGORIE DE CHAQUE ANNEE
    function moyenneParAnneeEtCategorie(groupedData) {
        let moyenneParAnneeEtCategorie = {};

        for (const annee in groupedData) {
            const statAnnee = groupedData[annee];

            let moyennesIndicateursAnnee = [];

            for (const nomIndicateur in statAnnee) {
                const indicateur = statAnnee[nomIndicateur];
                let categorieIndicateurAnnee = {};

                categorieIndicateurAnnee.categorie = nomIndicateur;

                let notesIndicateurAnnee = [];

                indicateur.forEach(function (mois) {
                    const noteIndicateurMois = mois['global'];
                    notesIndicateurAnnee.push(noteIndicateurMois);
                });

                categorieIndicateurAnnee.note = (moyenneTableau(notesIndicateurAnnee)).toFixed(2);

                moyennesIndicateursAnnee.push(categorieIndicateurAnnee);
            }
            moyenneParAnneeEtCategorie[annee] = moyennesIndicateursAnnee;
        }
        return moyenneParAnneeEtCategorie;
    }

    const noteByCategorie = moyenneParAnneeEtCategorie(groupYearCategory);

    // TABLEAU AVEC ORDRE DE NOS CATEGORIES POSITIONNEES SUR AXE DES X SUR LE GRAPHIQUE
    const categoriesOrderTest = ["ponctualite", "prix", "innovation", "environnement", "infos-voyageurs", "globale"];

    // AFFICHER LE BON GRAPHIQUE QUAND ON CLIQUE SUR LE BOUTON
    const anneeBouton = document.querySelectorAll('.select-year button');
    const firstButton = document.querySelector('.select-year button');
    firstButton.classList.add('selected');
    let currentChart = creationchart(noteByCategorie['2015'], categoriesOrderTest);

    anneeBouton.forEach(function (annee) {
        annee.addEventListener('click', function () {
            const anneeBtnSelected = this.id;
            // console.log(anneeBtnSelected);

            if (noteByCategorie[anneeBtnSelected]) {
                updateChart(currentChart, noteByCategorie[anneeBtnSelected], categoriesOrderTest);

                anneeBouton.forEach(function (button) {
                    button.classList.remove('selected');
                });
                this.classList.add('selected');
            } else {
                console.error("Données non disponibles pour l'année sélectionnée");
            }
        });
    });

    // CREATION DE MON GRAPHIQUE
    function creationchart(noteByCategorieYear, categoriesOrderTest) {
        let chartValuesCategory = [];
        let chartValuesNotes = [];

        categoriesOrderTest.forEach(categoryName => {
            const categoryData = noteByCategorieYear.find(el => el['categorie'] === categoryName);

            if (categoryData) {
                chartValuesCategory.push(categoryData['categorie']);
                chartValuesNotes.push(categoryData['note']);
            }
        });

        const graph = document.getElementById('graphique_opinion').getContext('2d');

        const newChart = new Chart(graph, {
            type: 'bar',
            data: {
                labels: chartValuesCategory,
                datasets: [{
                    label: '2018',
                    data: chartValuesNotes,
                    backgroundColor: "#00205B",
                    borderColor: "#0284DD",
                }]
            },
            options: {
                animation: {
                    duration: 1000,
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: noteByCategorieYear[0].annee,
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function (context) {
                                const value = context.parsed.y;
                                return 'note : ' + value;
                            }
                        }
                    },
                },
                maintainAspectRatio: true,
                scales: {
                    x: {
                        ticks: {
                            color: "#00205B",
                        },
                        grid: {
                            color: "#7C7BAC",
                        },
                    },
                    y: {
                        stacked: true,
                        suggestedMin: 0,
                        suggestedMax: 7,
                        ticks: {
                            color: "#00205B",
                        },
                        grid: {
                            color: "#7C7BAC",
                        },
                    },
                },
                onHover: (event, chartElement) => {
                    if (chartElement.length == 1) {
                        event.native.target.style.cursor = 'pointer';
                    }
                    if (chartElement.length == 0) {
                        event.native.target.style.cursor = 'default';
                    }
                },
            },
        });
        return newChart;
    }

    function updateChart(chart, noteByCategorieYear, categoriesOrderTest) {
        let chartValuesCategory = [];
        let chartValuesNotes = [];

        categoriesOrderTest.forEach(categoryName => {
            const categoryData = noteByCategorieYear.find(el => el['categorie'] === categoryName);

            if (categoryData) {
                chartValuesCategory.push(categoryData['categorie']);
                chartValuesNotes.push(categoryData['note']);
            }
        });

        chart.data.labels = chartValuesCategory;
        chart.data.datasets[0].data = chartValuesNotes;

        chart.options.plugins.title.text = noteByCategorieYear[0].annee;

        chart.update();
    }

})();

function slide8Active() {

}