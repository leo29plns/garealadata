window.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector('head');
    const slidesCount = 9;
    const slidesList = [];

    const mainEl = document.querySelector('.global-wrapper > main');

    // LOADING OF SLIDE'S FILE
    function loadSlideFile(slideName) {
        const slideEl = document.querySelector('.' + slideName);

        fetch(`slides/${slideName}.html`)
            .then(response => response.text())
            .then(data => {
                slideEl.innerHTML = data;
            })
            .catch(error => {
                console.error(`Can't load ${slideName} (${error})`);
            });
    }

    // DIVS' SLIDES CREATION
    function createSlides() {
        for (let i = 1; i <= slidesCount; i++) {
            const slideName = `slide${i}`;
            slidesList.push(slideName);

            const slide = document.createElement('div');
            slide.classList.add(slideName);
            slide.onScreenEnter(0.75);
            mainEl.appendChild(slide);

            loadSlideFile(slideName);

            const css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = `css/slides/${slideName}.css`;
            header.appendChild(css);
        }
    }

    createSlides();

});