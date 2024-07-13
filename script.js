const btnStart = document.getElementById('btnStart');
const btnReset = document.getElementById('btnReset');
const btnTimeIncrease = document.getElementById('btnTimeIncrease');
const btnTimeDecrease = document.getElementById('btnTimeDecrease');


btnStart.addEventListener('click', function () {
    toBack('start');
});

btnReset.addEventListener('click', function () {
    toBack('reset');
});

btnTimeIncrease.addEventListener('click', function () {
    toBack('increase');
});

btnTimeDecrease.addEventListener('click', function () {
    toBack('decrease');
});

document.addEventListener('DOMContentLoaded', function () {
    //toBack('update');
});

function updateTimerDisplay(time) {
    document.getElementById('timerDisplay').innerText = 
    `${(Math.floor(time/60/1000)).toString().padStart(2, '0')}:${(Math.floor(time/1000%60)).toString().padStart(2, '0')}`;
}

function toBack(message) {
    navigator.serviceWorker.controller.postMessage({ action: message });
}

navigator.serviceWorker.addEventListener('message', function(event) {
    const action = event.data.action;
    if (action === 'timeUpdate') {
        updateTimerDisplay(event.data.value);
    } else if (action === 'start') {
        btnStart.innerText = 'pause';
    } else if (action === 'pause') {
        btnStart.innerText = 'start';
    }
});
