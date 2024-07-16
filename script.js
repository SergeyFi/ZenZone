const btnStart = document.getElementById('btnStart');
const btnReset = document.getElementById('btnReset');
const btnTimeIncrease = document.getElementById('btnTimeIncrease');
const btnTimeDecrease = document.getElementById('btnTimeDecrease');
const states = {none: 'none', work: 'work', pause: 'pause'};
const props = {startTime: 'startTime', targetTime: 'targetTime', pauseTime: 'pauseTime', state: 'state', defaultTime: 'defaultTime'};
const sourceTime = 25 * 60 * 1000;
const timeLimits = {min: 1 * 60 * 1000, max: 99 * 60 * 1000};
let timer;

btnStart.addEventListener('click', function () {
    let state = getState();
    if (state == states.none) {
        onStart();
    } else if (state == states.work) {
        onPause();
    } else if (state == states.pause) {
        onResume();
    }
});

btnReset.addEventListener('click', function () {
    reset();
});

btnTimeIncrease.addEventListener('click', function () {
    shiftDefaultTime(1000 * 60);
});

btnTimeDecrease.addEventListener('click', function () {
    shiftDefaultTime(-1000 * 60);
});

document.addEventListener('DOMContentLoaded', function() {
    setupDefaultProperties();
    updateTimerDisplay(getCurrentTime());
    tryGetNotifyPermission();
});

function onStart() {
    setState(states.work);
    localStorage.setItem(props.startTime, Date.now());
    localStorage.setItem(props.targetTime, getDefaultTime() + Date.now());
    timer = setInterval(onUpdate, 1000);
    btnStart.innerText = 'pause';
    requestNotify(getCurrentTime());
}

function onUpdate() {
    let currentTime = getCurrentTime();
    if (currentTime <= 0) {
        reset();
    }
    updateTimerDisplay(getCurrentTime());
}

function onPause() {
    setState(states.pause);
    clearInterval(timer);
    localStorage.setItem(props.pauseTime, Date.now());
    btnStart.innerText = 'start';
    requestCancelNotify();
}

function onResume() {
    setState(states.work);
    let pauseTime = parseInt(localStorage.getItem(props.pauseTime));
    let targetTime = parseInt(localStorage.getItem(props.targetTime));
    localStorage.setItem(props.targetTime, targetTime + Date.now() - pauseTime);
    timer = setInterval(onUpdate, 1000);
    btnStart.innerText = 'pause';
    requestNotify(getCurrentTime());
}

function reset() {
    if (timer) clearInterval(timer);
    setState(states.none);
    localStorage.removeItem(props.startTime);
    localStorage.removeItem(props.targetTime);
    localStorage.removeItem(props.pauseTime);
    updateTimerDisplay(getCurrentTime());
    requestCancelNotify();
    btnStart.innerText = 'start';
}

function setState(state) {
    localStorage.setItem(props.state, state);
}

function getState() {
    let state = localStorage.getItem(props.state);
    if (state) {
        return state;
    } else {
        return states.none;
    }
}

function updateTimerDisplay(time) {
    document.getElementById("timerDisplay").innerText = `${(Math.floor(time/1000/60)).toString().padStart(2, '0')}:${(Math.ceil(time/1000)%60).toString().padStart(2, '0')}`;
}

function setupDefaultProperties() {
    createUnsetProperty(props.defaultTime, sourceTime);
    createUnsetProperty(props.state, states.none);
}

function createUnsetProperty(name, value) {
    let property = localStorage.getItem(name);
    if (!property) {
        localStorage.setItem(name, value);
    }
}

function getDefaultTime() {
    return parseInt(localStorage.getItem(props.defaultTime));
}

function shiftDefaultTime(value) {
    let newDefaultTime = getDefaultTime() + value;
    if (newDefaultTime >= timeLimits.min && newDefaultTime <= timeLimits.max) {
        localStorage.setItem(props.defaultTime, newDefaultTime);
        updateTimerDisplay(getDefaultTime());
    }
}

function getCurrentTime() {
    let state = getState();
    if (state == states.none) {
        return getDefaultTime();
    } else if (state == states.work) {
        return (parseInt(localStorage.getItem(props.targetTime)) - Date.now());
    } else if (state == states.pause) {
        let pauseTime = parseInt(localStorage.getItem(props.pauseTime));
        let targetTime = parseInt(localStorage.getItem(props.targetTime));
        return targetTime - pauseTime;
    }
}

function tryGetNotifyPermission() {
    if (Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function requestNotify(time) {
    navigator.serviceWorker.controller.postMessage({ action: 'notify', value: time });
}

function requestCancelNotify() {
    navigator.serviceWorker.controller.postMessage({ action: 'cancelNotify' });
}