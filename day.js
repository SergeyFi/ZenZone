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
    let timeWorkStr = millisToString(dt.getWorkTime());
    timeWorkText.innerText = timeWorkStr.hours + ":" + timeWorkStr.minutes;
}