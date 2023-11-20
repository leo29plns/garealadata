# Gare à la Data
[https://leo29plns.github.io/garealadata/](https://leo29plns.github.io/garealadata/)

Ce projet front-end a pour but de présenter la SNCF à travers les âges et les datas. En outre, il se présente sous la forme de slides, sur lesquelles ont retrouve des composantes caractéristiques de la SNCF (pour caricaturer, les retards, les opinions utilisateurs mais aussi le développement du réseau, par exemple).

## Dépendances
Ce projet repose en partie sur la librairie [chartjs.org](https://www.chartjs.org/) pour la génération des graphiques.

## Données
Les données proviennent majoritairement de [data.sncf.com](https://data.sncf.com/). Toutes les ressources utilisées dans ce projet sont créditées dans la dernière slide de ce site.

## Une création "La team Provins"
- [@leavillain](https://github.com/anaismm)
- [@anaismm](https://github.com/leavillain)
- [@leo29plns](https://github.com/leo29plns)

## Quels détails
La carte provient d'un gif sur wikipedia. Chaque frame a été extraite au format PNG, puis a été assemblée dans un conteneur vidéo. Pourquoi ? En utilisant le format vidéo, on bénéficie de la compression basée sur des séquences d'images, et non pas une compression image par image. Grâce à cela, le fichier pèse 700ko en mp4, contre 30Mo pour les images en png.

Le fichier js/loadSlides.js a été un défi technique: réussir à charger indépendamment les différents fichiers HTML, JS et CSS. Nous avons en effet fait le choix de compartimenter nos fichiers et d'automatiser leur imports. Tous les fichiers sont enregistrés dans le fichier data/slides.json et appelés en fonction de celui-ci. Les données sont d'abord chargées, puis ensuite chaque fichier js de slide est appelé (dans cet ordre précis). Le fichier HTML est bien évidemment incorporé en premier (dans le répertoire slides/). Toutes les données sont accessibles depuis la variable globale _globalData.

Chaque fichier js comporte une fonction slideIndexActive() qui est appelée lorsque la slide entre dans la vue pour au moins 500ms. Cela permet de déclencher des animations en JS.

Le site est onepage, mais les slides sont accessibles via différentes URLs interprétées par le JS (les ids #slide1, #slide2... n'existent pas réellement). Si nous n'utilisons pas le comportement par défaut, c'est parce que le HTML est chargé légèrement en différé (à cause du fetch).

La base du CSS permet une conversion rapide au format mobile (le site étant partiellement responsive pour le moment).

## Ce projet est sous licence GNU General Public License v3.0

