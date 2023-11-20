(function () {
    
})();

function slide6Active() {
    const trainMistral = document.querySelector('.slide6 .mistral > img');
    const trainTGV = document.querySelector('.slide6 .tgv > img');

    const trainMistralSpeed = document.querySelector('.slide6 .mistral .speed');
    const trainTGVSpeed = document.querySelector('.slide6 .tgv .speed');

    const trainMistralClone = trainMistral.cloneNode(true);
    const trainTGVClonelone = trainTGV.cloneNode(true);

    (trainMistral.closest('div')).insertBefore(trainMistralClone, trainMistral);
    (trainTGV.closest('div')).insertBefore(trainTGVClonelone, trainTGV);

    trainMistral.remove();
    trainTGV.remove();

    countFromTo(trainMistralSpeed, 0, 160, 2000);
    countFromTo(trainTGVSpeed, 0, 320, 4000);
}