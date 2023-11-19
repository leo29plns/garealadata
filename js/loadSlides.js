const _globalData = {};

window.addEventListener("DOMContentLoaded", function () {

    const $_scripts = document.querySelector('._scripts');
    const $head = document.querySelector('head');
    const $main = document.querySelector('.global-wrapper > main');

    // LOADING JSON DATA AND JS FILE
    function loadDataJsFile(id, jsonFiles) {
        const slideJs = document.createElement('script');
        slideJs.src = `js/slides/slide${id}.js`;

        const slideData = {};
        const promises = [];

        jsonFiles.forEach(function (jsonFileName) {
            const jsonFilePromise = fetch(`data/slide${id}/${jsonFileName}`)
                .then(response => {
                    return response.text();
                })
                .then(jsonResponse => {
                    const parsedJsonResponse = JSON.parse(jsonResponse);
                    const jsonFile = parsedJsonResponse['data'];

                    slideData[jsonFileName] = jsonFile;
                });

            promises.push(jsonFilePromise);
        });

        Promise.all(promises).then(() => {
            _globalData[`slide${id}`] = slideData;
            $_scripts.appendChild(slideJs);
        });
    }

    // LOADING SLIDE FILE
    function loadSlideFile(id) {
        const slideName = `slide${id}`;
        const slideEl = document.querySelector('.' + slideName);

        fetch(`slides/${slideName}.html`)
            .then(response => response.text())
            .then(data => {
                slideEl.innerHTML = data;
            });
    }

    // CREATION OF SLIDES DIVS
    function createSlides(id) {
        const slideName = `slide${id}`;

        const slide = document.createElement('div');
        slide.classList.add(slideName);
        slide.onScreenEnter(0.75);
        $main.appendChild(slide);

        loadSlideFile(id);

        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = `css/slides/${slideName}.css`;
        $head.appendChild(css);
    }

    // GET SLIDES INFOS
    fetch('data/slides.json')
        .then(response => response.json())
        .then(parsedJsonResponse => {
            const slidesList = parsedJsonResponse['data'];

            slidesList.forEach(function (slide) {
                createSlides(slide['id']);
                loadDataJsFile(slide['id'], slide['jsonFiles']);
            });
        });

});