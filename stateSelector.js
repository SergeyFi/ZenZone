const btnWork = document.getElementById('btnWork');
const btnBreak= document.getElementById('btnBreak');
const btnChill = document.getElementById('btnChill');

btnWork.addEventListener('click', function () {
    window.app.self.setState(app.states.work);
    window.app.timer.setDefaultTime();
    select(btnWork);
});

btnBreak.addEventListener('click', function () {
    window.app.self.setState(app.states.break);
    select(btnBreak);
});

btnChill.addEventListener('click', function () {
    window.app.self.setState(app.states.chill);
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