// POUR IMPORTER LES DONNES DU JSON DANS JS OU UTILISER UN REQUIRE MAIS FONCTIONNAIT PAS 
fetch("./regularite_mensuelle.json")
    .then(response => {
        return response.json()
    })
    .then(jsondata => {
        console.log(jsondata);
        creationchart(jsondata['data'])
        // le jsondata contient toutes les données de mon json et creation chart et la foncction du dessous qui va créer mon graphique
    })
    
function creationchart(chartData) {
    let chartValuesPonctuality = [];
    let chartValuesYears = [];

    let previousYear = null;
    chartData.forEach(el => {
        chartValuesPonctuality.push(el['ponctualite_origine']);

        // pour extraire l'année
        const date = new Date(el['date']);
        const year = date.getFullYear();

        // pour vérifier 
        if (year !== previousYear) {
            chartValuesYears.push(year);
            previousYear = year;
        } else {
            chartValuesYears.push('');
        }

    });
    


    const graph = document.getElementById('graphique');

    new Chart(graph, {
        type: 'line',
        data: {
            labels: chartValuesYears,
            datasets: [{
                data: chartValuesPonctuality,
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
                    suggestedMin: 75,
                    suggestedMax: 95,
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
}
