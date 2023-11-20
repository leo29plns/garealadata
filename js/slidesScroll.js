window.addEventListener('DOMContentLoaded', function () {

    const sliderControls = document.querySelectorAll('.slider-controls');
    const scrollButtons = document.querySelectorAll('.slider-controls button');
    const globalWrapper = document.querySelector('.global-wrapper');

    function scrollNext(next = true) {
        const slide = document.querySelector('main > div');

        if ((window.matchMedia('screen and (min-width: 36rem)')).matches) {
            const scrollSize = (next ? slide.offsetWidth : -slide.offsetWidth);

            globalWrapper.scrollBy({
                left: scrollSize,
                behavior: 'smooth'
            });
        } else {
            const scrollSize = (next ? slide.offsetHeight : -slide.offsetHeight);

            globalWrapper.scrollBy({
                top: scrollSize,
                behavior: 'smooth'
            });
        }
        
    }

    scrollButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            scrollNext(JSON.parse(this.dataset.scroll_next));
        });
    });

    document.addEventListener('keydown', function (event) {
        switch (event.code) {
            case 'ArrowRight':
                scrollNext(true);
                break;
            case 'ArrowLeft':
                scrollNext(false);
                break;
            case 'ArrowDown':
                scrollNext(true);
                break;
            case 'ArrowUp':
                scrollNext(false);
                break;
            case 'Space':
                scrollNext(true);
                break;
        }
    });

    function onScreen(element) {
        const elementClass = element.classList.value;
        window[`${elementClass}Active`]();

        window.location.hash = elementClass;
    }

    Element.prototype.onScreenEnter = function (threshold) {
        let entered = false;
        let timeout;

        const observer = new IntersectionObserver(function (entries) {
            const entry = entries[0];
            if (entry.intersectionRatio >= threshold) {
                if (!entered) {
                    clearTimeout(timeout);
                    timeout = setTimeout(function () {
                        onScreen(entry.target);
                        entered = true;
                    }, 500);
                }
            } else {
                clearTimeout(timeout);
                entered = false;
            }
        }, { threshold: threshold });

        observer.observe(this);
    };

});