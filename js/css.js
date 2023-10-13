window.addEventListener("DOMContentLoaded", function () {

    HTMLElement.prototype.addResizeListener = function (cssVariable, axis, applyGlobally = false, elementValue = this) {
        let element = this;
        let targetElement = applyGlobally ? document.documentElement : elementValue;
        let sizeProperty = (axis.toLowerCase() === 'x') ? 'offsetWidth' : 'offsetHeight';

        function updateSize() {
            var size = element[sizeProperty];
            targetElement.style.setProperty(cssVariable, size + 'px');
        }

        updateSize();

        window.addEventListener('resize', updateSize);
    };
    
    window.getCSSvar = function (variableName) {
        let computedStyle = getComputedStyle(document.documentElement);
        return computedStyle.getPropertyValue(variableName).trim();
    }
    
    document.documentElement.style.setProperty('--vh', window.innerHeight + 'px');
    document.querySelector('.global-wrapper').addResizeListener('--vw', 'x', true)

});