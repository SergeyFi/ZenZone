import { App } from "./app.js";
import { ZenTimer } from "./zenTimer.js";

window.app = {self: new App(), timer: new ZenTimer()};

document.addEventListener('DOMContentLoaded', function() {
    initBackground();
});

function initBackground() {
    if (!localStorage.getItem('resDefaultBackground')) {
        localStorage.setItem('resDefaultBackground', 'https://studywithme.io/aesthetic-pomodoro-timer/c629a813b3561cfa40dd.jpg');
    }
    
    document.body.style.backgroundImage = "url('" + localStorage.getItem('resDefaultBackground') + "')";
}