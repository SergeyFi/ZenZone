const btnWork = document.getElementById('btnWork');
const btnBreak= document.getElementById('btnBreak');
const btnChill = document.getElementById('btnChill');
const btnTimeIncrease = document.getElementById('btnTimeIncrease');
const btnTimeDecrease = document.getElementById('btnTimeDecrease');
const timeLimits = Object.freeze({ min: 1 * 60 * 1000, max: 99 * 60 * 1000 });

btnWork.addEventListener('click', function () {
    window.app.self.setState(app.states.work);
    setDefaultTimeInTimer();
    select(btnWork);
});

btnBreak.addEventListener('click', function () {
    window.app.self.setState(app.states.break);
    setDefaultTimeInTimer();
    select(btnBreak);
});

btnChill.addEventListener('click', function () {
    window.app.self.setState(app.states.chill);
    setDefaultTimeInTimer();
    select(btnChill);
});

document.addEventListener('DOMContentLoaded', function () {
    let state = window.app.self.getState();
    switch (state) {
        case app.states.work:
            select(btnWork);
            break;
        case app.states.break:
            select(btnBreak);
            break;
        case app.states.chill:
            select(btnChill);
            break;
    }

    setupDefaultTime();
    setDefaultTimeInTimer();
});

function select(btn) {
    unselect(btnWork, btnBreak, btnChill);
    btn.classList.remove('unselect');
    btn.classList.add('select');
}

function unselect(...btns) {
    btns.forEach(btn => {
        btn.classList.add('unselect');
    });
}

btnTimeIncrease.addEventListener('click', function () {
    localStorage.setItem('defauiltTime' + window.app.self.getState(), 
    Math.min((parseInt(localStorage.getItem('defauiltTime' + window.app.self.getState())) + 1000*60), timeLimits.max));
    setDefaultTimeInTimer();
});

btnTimeDecrease.addEventListener('click', function () {
    localStorage.setItem('defauiltTime' + window.app.self.getState(), 
    Math.max((parseInt(localStorage.getItem('defauiltTime' + window.app.self.getState())) - 1000*60), timeLimits.min));
    setDefaultTimeInTimer();
});

function setupDefaultTime() {
    setIfNotExist('defauiltTime' + app.states.work, 25*60*1000);
    setIfNotExist('defauiltTime' + app.states.break, 5*60*1000);
    setIfNotExist('defauiltTime' + app.states.chill, 20*60*1000);
}

function setDefaultTimeInTimer() {
    window.app.timer.setDefaultTime(localStorage.getItem('defauiltTime' + window.app.self.getState()));
}