import { DayliTime } from "./dayliTime.js";

const timeDayText = document.getElementById("timeDay");
let dt = new DayliTime(12, 24, 6);

document.addEventListener('DOMContentLoaded', function() {
    setInterval(update, 1000);
});

function update() {
    console.log(dt.getDayTime()/60/60/1000);
    timeDayText.innerText = millisToTimeString(dt.getDayTime());
}

function millisToTimeString(millis) {
    //var seconds = Math.floor((millis / 1000) % 60);
    var minutes = Math.floor((millis / (1000 * 60)) % 60);
    var hours = Math.floor((millis / (1000 * 60 * 60)));

    //seconds = String(seconds).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    hours = String(hours).padStart(2, '0');
  
    return hours + ":" + minutes; 
  }