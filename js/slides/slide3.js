(function () {

    // VARIABLE QUI CONTIENT MON JEU DE DONNES
    const temps_parcours_global = _globalData['slide3']['temps_parcours.json'];
    const logo_global = _globalData["slide3"]["logo_history.json"];

    // POUR TRIER DONNES PAR ORDRE CROISSANT SELON LEUR ANNEE
    function triTempsParcoursParAnnee(tempsParcoursAnnee) {
        tempsParcoursAnnee.forEach(element => {
            element.annee = parseInt(element.annee);
        });
        tempsParcoursAnnee.sort((annee1, annee2) => annee1.annee - annee2.annee);

        return tempsParcoursAnnee;
    }
    const temps_parcours_global_trier = triTempsParcoursParAnnee(temps_parcours_global);

    // FONCTION QUI TRANSFOME DUREE MINUTES EN DUREE HEURE/MINUTES
    function transformeDureeEnHeureEtMinutes (dureeEnMinutes){
        const heures = Math.floor(dureeEnMinutes/60);
        const minutes = dureeEnMinutes % 60;

        // rajouter un zeo si les minutes osnt comprise entre 0 et 9
        const minutesaveczero = minutes < 10 ? '0'+minutes : minutes; 

        return heures+ 'h' +minutesaveczero;
    }

    // FONCTION QUI CREE UN OBJET AVEC LA DEST SELECTIONNE
    function recupereDest (temps_parcours_trier, nomDest){
        let objetDest = {};
        temps_parcours_trier.forEach(destination =>{
            if (destination["relations"] === "PARIS - "+ nomDest){
                objetDest[destination["annee"]] = transformeDureeEnHeureEtMinutes(destination["temps_estime_en_minutes"]);
            }
        })
        return objetDest;
    }


    // FONCTION POUR ASSOCIER LE LOGO EN FONCTION DE L'ANNEE
    function associeLogoParAnnee (annee){
        for (const logo of logo_global){
            if ( annee >= logo["firstYear"] && annee <= logo["lastYear"]){
                const logoResultat = logo["logoUrl"];
                return logoResultat;
            }
        }
    }

    // FONCTION POUR GARDER UNIQUEMENT 10 DATES DE LA DEST A ESPACE DE TEMPS REGULIER
    function garder10Annees(destchoisie){
        let objet10Dest ={};
        const clesAnnees = Object.keys(destchoisie);
        const step = Math.ceil(clesAnnees.length/10);

        for (let i = 0; i<clesAnnees.length && Object.keys(objet10Dest).length < 10; i += step){
            const annee = clesAnnees[i];
            objet10Dest[annee] = {
                temps_parcours : destchoisie[annee],
                logo : associeLogoParAnnee(annee),
            }
        }
        return objet10Dest;
    }

    // TABLEAU AVEC LE NOM DES DESTINATIONS EN PARTANT DE PARIS 
    const tabDest = ["LYON","NANTES","MARSEILLE","BORDEAUX","STRASBOURG"];

    // CIBLER LA LISTE DEROULANTE DES DESTINATIONS
    const selectDest = document.querySelector('#destinations');

    // JE PARCOURS LES DEST DE MON TABLEAU ET POUR CHACUNE JE L'AJOUTE EN OPTION DANS MON SELECT
    for (const dest of tabDest){
        // console.log(dest);
        selectDest.innerHTML += `<option value=${dest}>PARIS - ${dest}</option>`;
    }

    // JE RECUPERE LES VALEURS DE LA PREMIERE OPTION AFFICHEE
    const destAffichee = selectDest.value;
    const valeursDestAffichee = recupereDest(temps_parcours_global_trier,destAffichee);


    // RECUPERE LA VALUE DE LA DEST A CHAQUE FOIS QU'ON SELECTIONNE DANS LE SELECT
    selectDest.addEventListener("change",function(){
        const destSelectionner = selectDest.value;
        const afficheDestSelectionner = recupereDest(temps_parcours_global_trier,destSelectionner);
        console.log(garder10Annees(afficheDestSelectionner));
    })

})();

function slide3Active() {

}