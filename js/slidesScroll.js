window.addEventListener("DOMContentLoaded", function () {

    const scrollButtons = document.querySelectorAll('.slider-controls button');
    const globalWrapper = document.querySelector('.global-wrapper');

    function scrollNext(next = true) {
        const slide = document.querySelector('main > div');

        const scrollSize = (next ? slide.offsetWidth : -slide.offsetWidth);

        globalWrapper.scrollBy({
            left: scrollSize,
            behavior: 'smooth'
        });
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
            case 'Space':
                scrollNext(true);
                break;
        }
    });

    function onScreen(element) {
        console.log(element);
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