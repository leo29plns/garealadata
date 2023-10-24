fetch("./temps_parcours.json")
    .then(response => {
        return response.json()
    })
    .then(jsondata => {
        moyenne_temps(jsondata)
        // le jsondata contient toutes les données de mon jsonet creation chart et la foncction du dessous qui va créer mon graphique

    })


    function moyenne_temps(donnees){
        let tempsParAnnee={};

        donnees.forEach(el => {
            const annee = el['annee'];
            const tempsEstime = el['temps_estime_en_minutes'];

            if(!tempsParAnnee[annee]){ // le ! signifie si la variable n'existe pas alors elle crée un tableau vide
                tempsParAnnee[annee] = [];
            }

            tempsParAnnee[annee].push(tempsEstime);
        });


        // calcul moyenne pour chaque annee
        const moyenneParAnnee = {};
        

        for (const annee in tempsParAnnee){
            const temps = tempsParAnnee[annee];
            const moyenne = temps.reduce((accumulator,currentValue)=> accumulator+currentValue,0)/temps.length;

            
            moyenneParAnnee[annee] = moyenne;
        }

        

    }

