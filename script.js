let buttonText = "start";
let timerIsWork = false;
let timer;
let currentTimeSpan = { minutes: 25, seconds: 0 };
const btnStart = document.getElementById('btnStart');
const btnRestart = document.getElementById('btnRestart');

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
    buttonText = "pause";
    timerIsWork = true;
    timer = setInterval(timerCallback, 1000);
}

function stopTimer() {
    buttonText = "start";
    timerIsWork = false;
    clearInterval(timer);
}

btnStart.addEventListener("click", function () {

    if (!timerIsWork) {
        startTimer();
    } else {
        stopTimer();
    }

    btnStart.innerText = buttonText;
    updateTimerDisplay();
});

btnRestart.addEventListener("click", function () {
    currentTimeSpan.minutes = 25;
    currentTimeSpan.seconds = 0;
    updateTimerDisplay();
});