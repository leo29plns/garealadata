function isBrowser(browserName) {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes(browserName.toLowerCase());
}

function countFromTo(element, start, end, duration) {
    let startTime;

    function updateCounter(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const interpolatedSpeed = (1 - Math.cos(progress * Math.PI)) / 2;

        const value = Math.floor(start + (end - start) * interpolatedSpeed);
        element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}