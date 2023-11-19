const videoProperties = _globalData['slide4']['rails_map.json'];

const videoFrameRate = videoProperties['videoFrameRate'];
const safetyMultiplier = 2;

const startDate = videoProperties['startDate'];

const video = document.querySelector('.slide4 .rails-map video')
const slider = document.querySelector('.slide4 .map-slider');
const yearInput = document.querySelector('.slide4 .year-input');

slider.max = video.duration * videoFrameRate - 1;

yearInput.min = startDate;
yearInput.max = video.duration * videoFrameRate - 1 + startDate;

let lastExecutionTime = 0;
const delay = 1000 / videoFrameRate * safetyMultiplier;

slider.addEventListener('input', function () {
    const currentTime = Date.now();

    if (currentTime - lastExecutionTime >= delay) {
        lastExecutionTime = currentTime;
        video.currentTime = slider.value / videoFrameRate;

        yearInput.value = startDate + parseInt(slider.value);
    }
});

yearInput.addEventListener('change', function () {
    const sliderValue = parseInt(yearInput.value) - startDate;
    video.currentTime = sliderValue / videoFrameRate;
    slider.value = sliderValue;
});