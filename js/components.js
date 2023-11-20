function isBrowser(browserName) {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes(browserName.toLowerCase());
}

function countFromTo($element, start, end, duration) {
    let startTime;

    function updateCounter(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const interpolatedSpeed = (1 - Math.cos(progress * Math.PI)) / 2;

        const value = Math.floor(start + (end - start) * interpolatedSpeed);
        $element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

function fadeStopVideo($video, slowdownFactor = 0.1) {
    if (slowdownFactor < 0.1) {
        slowdownFactor = 0.1
    }

    const currentTime = $video.currentTime;
    const duration = $video.duration;

    if (currentTime < duration) {
        const progress = currentTime / duration;
        const speedFactor = 1 + (slowdownFactor - 1) * (1 - Math.cos(progress * Math.PI)) / 2;

        $video.playbackRate = speedFactor.toFixed(2);

        setTimeout(() => {
            fadeStopVideo($video, slowdownFactor);
        }, 1000);
    } else {
        $video.playbackRate = 1;
    }
}