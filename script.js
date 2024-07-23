import { ZenTimer } from "./zenTimer.js";

const btnStart = document.getElementById('btnStart');
const btnReset = document.getElementById('btnReset');
const btnTimeIncrease = document.getElementById('btnTimeIncrease');
const btnTimeDecrease = document.getElementById('btnTimeDecrease');
const states = {none: 'none', work: 'work', pause: 'pause'};
const props = {startTime: 'startTime', endTime: 'endTime', pauseTime: 'pauseTime', state: 'timerState', defaultTime: 'defaultTime'};
const sourceTime = 25 * 60 * 1000;
const timeLimits = {min: 1 * 60 * 1000, max: 99 * 60 * 1000};
let timer;

btnTimeIncrease.addEventListener('click', function () {
    shiftDefaultTime(1000 * 60);
});

btnTimeDecrease.addEventListener('click', function () {
    shiftDefaultTime(-1000 * 60);
});

document.addEventListener('DOMContentLoaded', function() {
    
});

function onStart() {
    // setState(states.work);
    // localStorage.setItem(props.startTime, Date.now());
    // localStorage.setItem(props.endTime, getDefaultTime() + Date.now());
    // timer = setInterval(onUpdate, 1000);
    // btnStart.innerText = 'pause';
    // requestNotify(getCurrentTime());
}

function onUpdate() {
    // let currentTime = getCurrentTime();
    // if (currentTime <= 0) {
    //     reset();
    // }
    // updateTimerDisplay(getCurrentTime());
}

function onPause() {
    // setState(states.pause);
    // clearInterval(timer);
    // localStorage.setItem(props.pauseTime, Date.now());
    // btnStart.innerText = 'start';
    // requestCancelNotify();
}

function onResume() {
    // setState(states.work);
    // let pauseTime = parseInt(localStorage.getItem(props.pauseTime));
    // let targetTime = parseInt(localStorage.getItem(props.endTime));
    // localStorage.setItem(props.endTime, targetTime + Date.now() - pauseTime);
    // timer = setInterval(onUpdate, 1000);
    // btnStart.innerText = 'pause';
    // requestNotify(getCurrentTime());
}

function reset() {
    // if (timer) clearInterval(timer);
    // setState(states.none);
    // localStorage.removeItem(props.startTime);
    // localStorage.removeItem(props.endTime);
    // localStorage.removeItem(props.pauseTime);
    // updateTimerDisplay(getCurrentTime());
    // requestCancelNotify();
    // btnStart.innerText = 'start';
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
    const appStates = Object.keys(app.states);
    appStates.forEach(function(appState) {
        createUnsetProperty(props.defaultTime + appState, sourceTime);
    });

    createUnsetProperty(props.state, states.none);
}

function createUnsetProperty(name, value) {
    let property = localStorage.getItem(name);
    if (!property) {
        localStorage.setItem(name, value);
    }
}

function getDefaultTime() {
    return parseInt(localStorage.getItem(props.defaultTime+app.manager.getState()));
}

function shiftDefaultTime(value) {
    let newDefaultTime = getDefaultTime() + value;
    if (newDefaultTime >= timeLimits.min && newDefaultTime <= timeLimits.max) {
        localStorage.setItem(props.defaultTime+app.manager.getState(), newDefaultTime);
        updateTimerDisplay(getDefaultTime());
    }
}

function getCurrentTime() {
    let state = getState();
    if (state == states.none) {
        return getDefaultTime();
    } else if (state == states.work) {
        return (parseInt(localStorage.getItem(props.endTime)) - Date.now());
    } else if (state == states.pause) {
        let pauseTime = parseInt(localStorage.getItem(props.pauseTime));
        let targetTime = parseInt(localStorage.getItem(props.endTime));
        return targetTime - pauseTime;
    }
}
