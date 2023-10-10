window.addEventListener("DOMContentLoaded", function () {

    const revealElements = document.querySelectorAll(".reveal");
    const treshold = .5;

    const headerBurger = document.querySelector('.callNav');
    const scrollTreshold = 10 + (document.querySelector('.preHeader') ? document.querySelector('.preHeader').offsetHeight : 0);

    // Observer : is vw containing DOM element
    const intersectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= treshold) {
                entry.target.classList.add("active");
            }
        });
    }, {threshold: treshold});

    // Observer applying on reveal elements
    revealElements.forEach(function (el) {
        intersectionObserver.observe(el);
    });

    // is on top... or not function
    function notTop(selector, className) {
        const scrollTarget = document.querySelector(selector);

        function handleScroll() {
            if (window.scrollY > scrollTreshold) {
                scrollTarget.classList.add(className);
            } else if (!headerBurger.classList.contains('visible')) {
                scrollTarget.classList.remove(className);
            }
        }

        window.addEventListener("scroll", handleScroll);
    }

    notTop(".header .bar", "headerBarScrolled");
    
});