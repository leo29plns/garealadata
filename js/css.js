HTMLElement.prototype.addResizeListener = function (cssVariable, axis, applyGlobally = false, elementValue = this) {
    const element = this;
    const targetElement = applyGlobally ? document.documentElement : elementValue;
    const sizeProperty = (axis.toLowerCase() === 'x') ? 'offsetWidth' : 'offsetHeight';

    function updateSize() {
        const size = element[sizeProperty];
        targetElement.style.setProperty(cssVariable, size + 'px');
    }

    updateSize();

    window.addEventListener('resize', updateSize);
};

window.getCSSvar = function (variableName) {
    const computedStyle = getComputedStyle(document.documentElement);
    return computedStyle.getPropertyValue(variableName).trim();
}

document.documentElement.style.setProperty('--vh', window.innerHeight + 'px');
document.querySelector('.global-wrapper').addResizeListener('--vw', 'x', true)