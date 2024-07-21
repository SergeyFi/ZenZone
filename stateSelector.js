const btnWork = document.getElementById('btnWork');
const btnBreak= document.getElementById('btnBreak');
const btnChill = document.getElementById('btnChill');

btnWork.addEventListener('click', function () {
    app.manager.setState(app.states.work);
});

btnBreak.addEventListener('click', function () {
    app.manager.setState(app.states.break);
});

btnChill.addEventListener('click', function () {
    app.manager.setState(app.states.chill);
});