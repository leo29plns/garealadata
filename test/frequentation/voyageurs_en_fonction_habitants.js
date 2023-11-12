fetch("./nombre_voyageurs.json")
    .then(response => {
        return response.json()
    })
    .then(jsondata => {
        const voyageursParAnnee = jsondata['data'];
        console.log(voyageursParAnnee);
        // creationchart(jsondata['data'])
        return fetch("./french_inhabitants_per_years.json")

        .then(response => {
            return response.json()
        })
        .then(jsondonnees => {
            const habitantsParAnnee = jsondonnees['data'];
            console.log(habitantsParAnnee);
            
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
            
            console.log(objetYearFusion);

            // CREER NOUVEAU TABLEAU POUR SUPPRIMER LES DONNES SANS CHIFFRES SUR LES HABITANTS
            let tabVoyageurHabitantParAnnee = objetYearFusion.filter(objet => objet.hasOwnProperty('habitants'));
            

            // CERATION D4UN NOUVEAU TABLEAU D4OBJET AVEC L'ANNEE ET LE NOMBRE MOYEN DE VOYAGE PAR HABITANTS
            let TabnbrMoyenParAnnee = [];
        
            tabVoyageurHabitantParAnnee.forEach(el => {
                let nbrMoyenParAnnee = {};
                const nbrMoyen = el['travellers'] / el['habitants'];
                nbrMoyenParAnnee.annee = el['annee'];
                nbrMoyenParAnnee.nombre_moyen = nbrMoyen;
                TabnbrMoyenParAnnee.push(nbrMoyenParAnnee);
            });
            console.log(TabnbrMoyenParAnnee);

            // METTRE DANS UN TABLEAU LES DONNES POUR LES LABELS ET LES NOMBRE MOYENS 
            let chartValuesYear = [];
            let chartValuesAverageNbr = [];
            TabnbrMoyenParAnnee.forEach(el => {
                chartValuesYear.push(el['annee']);
                chartValuesAverageNbr.push(el['nombre_moyen']);
            })


            // CREATION DU GRAPHIQUE
            

            const graph = document.getElementById('graphique');

            new Chart(graph, {
                type: 'line',
                data: {
                    labels: chartValuesYear,
                    datasets: [{
                        data: chartValuesAverageNbr,
                        borderWidth: 1,
                        backgroundColor: "#89DAFA",
                        borderColor: "#0284DD",
                        // fill: true,
                    }]
                },
                options: {
        
                    maintainAspectRatio: true,
                    scales: {
                        y: {
                            stacked: true,
                            suggestedMin: 0,
                            suggestedMax: 20,
                            grid: {
                                display: true,
                                color: "rgba(255,99,132,0.2)"
                            }
                        },
        
        
                        x: {
                            grid: {
                                display: true,
                            },
        
                            ticks: {
                                autoSkip: false, //pour que mes labels ne disparaissent jamais
                                maxTicksLimit:11,
        
                              
                                
        
                            }
                        }
                    },
        
            
            
        
        
                }
            });


    
    
        })
    
    
    
    
    
    })
    

