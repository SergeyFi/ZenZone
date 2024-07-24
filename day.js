import { DayliTime } from "./dayliTime.js";

const timeDayText = document.getElementById("timeDay");
const timeDaySecondsText = document.getElementById("timeDaySeconds");
const timeWorkText = document.getElementById("timeWork");
let dt = new DayliTime(12, 24, 6);

document.addEventListener('DOMContentLoaded', function() {
    update();
    setInterval(update, 1000);
});

function update() {
    setDayTimerText();
    setTimeWorkText();
}

function setDayTimerText() {
    let timeWorkStr = millisToString(dt.getDayTime());
    timeDayText.innerText = timeWorkStr.hours + ":" + timeWorkStr.minutes;
    timeDaySecondsText.innerText = timeWorkStr.seconds;
  }

  function setTimeWorkText() {
    let time = dt.getWorkTime() - window.app.timer.getPassedTime();
    let timeWorkStr = millisToString(Math.max(time, 0));
    timeWorkText.innerText = timeWorkStr.hours + ':' + timeWorkStr.minutes;
}

window.app.timer.addEventListener((event)=>{
    if (event.type == 'onReset' && (event.state == 'work' || event.state == 'pause')) {
        dt.removeWorkTime(window.app.timer.getPassedTime());
    }
});