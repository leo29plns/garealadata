// VARIABLE QUI CONTIENT MON JEU DE DONNEES
const regularite_global = _globalData['slide7']['regularite_mensuelle.json'];

function creationchart(chartData) {
    let chartValuesPonctuality = [];
    let chartValuesYears = [];

    let previousYear = null;
    chartData.forEach(el => {
        chartValuesPonctuality.push(el['ponctualite_origine'].toFixed(2));

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
    


    const graph = document.getElementById('graphique_regularite');

    new Chart(graph, {
        type: 'line',
        data: {
            labels: chartValuesYears,
            datasets: [{
                data: chartValuesPonctuality,
                borderWidth: 1,
                backgroundColor: "#651C32",
                borderColor: "#651C32",
                // fill: true,
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
                tooltip:{
                    enabled:true,
                    callbacks: {
                        label: function(context) {
                            // Utilisez context pour accéder aux données de l'infobulle
                            const value = context.parsed.y;
    
                            return  'ponctualité : ' + value + '%';
                        }
                    }
                },
            },

            maintainAspectRatio: true,
            scales: {
                y: {
                    stacked: true,
                    suggestedMin: 75,
                    suggestedMax: 95,
                    
                    grid: {
                        display: true,
                        color: "#F2827F",
                    },

                    ticks:{
                        color:"#651C32",
                    },
                },


                x: {
                    grid: {
                        display: true,
                        color: "#F2827F",
                    },

                    ticks: {
                        autoSkip: false, //pour que mes labels ne disparaissent jamais
                        maxTicksLimit:20,
                        color:"#651C32",

                      
                        

                    }
                }
            },

    
    


        }
    });
}

creationchart(regularite_global);