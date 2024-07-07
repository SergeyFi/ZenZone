let buttonText = "start";
let timerIsWork = false;
let timer;
let currentTimeSpan = { minutes: 25, seconds: 0 };
const btnStart = document.getElementById('btnStart');
const btnReset = document.getElementById('btnReset');

function updateTimerDisplay() {
    document.getElementById("timerDisplay").innerText = `${currentTimeSpan.minutes.toString().padStart(2, '0')}:${currentTimeSpan.seconds.toString().padStart(2, '0')}`;
}

function timerCallback() {
    if (timerIsWork) {
        if (currentTimeSpan.minutes === 0 && currentTimeSpan.seconds === 0) {
            stopTimer();
            return;
        }

        if (currentTimeSpan.seconds === 0) {
            currentTimeSpan.minutes--;
            currentTimeSpan.seconds = 59;
        } else {
            currentTimeSpan.seconds--;
        }

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

btnStart.addEventListener("click", function () {

    if (!timerIsWork) {
        startTimer();
    } else {
        stopTimer();
    }
    
    updateTimerDisplay();
});

btnReset.addEventListener("click", function () {
    currentTimeSpan.minutes = 25;
    currentTimeSpan.seconds = 0;
    stopTimer();
    updateTimerDisplay();
});