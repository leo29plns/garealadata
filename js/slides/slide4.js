let slide4_autoTimeupdate = true;

(function () {

    const $video = document.querySelector('.slide4 .rails-map video');

    const videoProperties = _globalData['slide4']['rails_map.json'];

    const videoFrameRate = videoProperties['videoFrameRate'];
    const safetyMultiplier = 2;

    const startDate = videoProperties['startDate'];

    const slider = document.querySelector('.slide4 .map-slider');
    const yearInput = document.querySelector('.slide4 .year-input');

    slider.max = $video.duration * videoFrameRate - 1;

    yearInput.min = startDate;
    yearInput.max = $video.duration * videoFrameRate - 1 + startDate;

    let lastExecutionTime = 0;
    const delay = 1000 / videoFrameRate * safetyMultiplier;

    // QUAND ON MODIFIE LE SLIDER RANGE
    slider.addEventListener('input', function () {
        $video.pause();
        const currentTime = Date.now();

        if (currentTime - lastExecutionTime >= delay) {
            lastExecutionTime = currentTime;
            $video.currentTime = slider.value / videoFrameRate;

            yearInput.value = startDate + parseInt(slider.value);
        }
    });

    // QUAND ON ENTRE DATE A LA MAIN
    yearInput.addEventListener('change', function () {
        const sliderValue = parseInt(yearInput.value) - startDate;

        autoTimeupdate = false;

        $video.currentTime = sliderValue / videoFrameRate;
        slider.value = sliderValue;
    });

    $video.addEventListener('timeupdate', function () {
        if (autoTimeupdate) {
            slider.value = $video.currentTime * videoFrameRate;
            yearInput.value = startDate + parseInt(slider.value);
        }
    });

    // POUR SAFARI UNIQUEMENT
    $video.addEventListener('loadedmetadata', function () {
        slider.max = $video.duration * videoFrameRate - 1;
    });

})();

function slide4Active() {
    const $video = document.querySelector('.slide4 .rails-map video');

    autoTimeupdate = true;

    $video.currentTime = 0;
    $video.play();

    fadeStopVideo($video);
}
