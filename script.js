let timerIsWork = false;
let timer;
let defaultTimeSpan = minutesToSeconds(25);
let currentTimeSpan = defaultTimeSpan;
const btnStart = document.getElementById('btnStart');
const btnReset = document.getElementById('btnReset');

// Need add timer status via enum or something similar
// Mb need use localStorage or db for save current state\time\other data

function updateTimerDisplay() {
    document.getElementById("timerDisplay").innerText = 
    `${(Math.floor(currentTimeSpan/60)).toString().padStart(2, '0')}:${(Math.floor(currentTimeSpan%60)).toString().padStart(2, '0')}`;
}

function timerCallback() {
    if (timerIsWork) {

        if (currentTimeSpan <= 0) {
            resetTimer();
            return;
        }

        currentTimeSpan -= 1;

        updateTimerDisplay();
    }
}

function startTimer() {
    btnStart.innerText = "pause";
    timerIsWork = true;
    timer = setInterval(timerCallback, 1000);
}

function stopTimer() {
    btnStart.innerText = "start";
    timerIsWork = false;
    clearInterval(timer);
}

function resetTimer() {
    navigator.serviceWorker.controller.postMessage({action: 'resetTimer' });
    currentTimeSpan = defaultTimeSpan;
    stopTimer();
    updateTimerDisplay();
}

btnStart.addEventListener("click", function () {

    if (!timerIsWork) {
        startTimer();
        navigator.serviceWorker.controller.postMessage({value: defaultTimeSpan, action: 'startTimer' });
    } else {
        stopTimer();
    }

    updateTimerDisplay();
});

btnReset.addEventListener("click", function () {
    resetTimer();
});

document.addEventListener("DOMContentLoaded", function () {
    resetTimer();
});

function decreaseDefaultTime() {
    if (defaultTimeSpan > minutesToSeconds(1)) {
        defaultTimeSpan -= minutesToSeconds(1);
    }

    resetTimer();
}

function increaseDefaultTime() {
    if (defaultTimeSpan < minutesToSeconds(99)) {
        defaultTimeSpan += minutesToSeconds(1);
    }

    resetTimer();
}

function minutesToSeconds(minutes) {
    return minutes * 60;
}

navigator.serviceWorker.addEventListener('message', event => {

    if (event.data.action === 'updateTime') {

        currentTimeSpan = event.data.value;
        console.log('Time is updated:', event.data.value);
    }
});

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {

        navigator.serviceWorker.controller.postMessage({action: 'visible' });
    }
});
