window.addEventListener("DOMContentLoaded", function () {

    const slidesCount = 8;
    const slidesList = [];

    const mainEl = document.querySelector('.global-wrapper > main');

    // LOADING OF SLIDE'S FILE
    function loadSlideFile(slideName) {
        const slideEl = document.querySelector('.' + slideName);

        fetch(`/slides/${slideName}.html`)
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

            let slide = document.createElement('div');
            slide.classList.add(slideName);
            mainEl.appendChild(slide);

            loadSlideFile(slideName);
        }
    }

    createSlides();
    
});