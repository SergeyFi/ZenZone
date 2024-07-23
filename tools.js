function millisToString(millis) {
    var seconds = Math.floor((millis / 1000) % 60);
    var minutes = Math.floor((millis / (1000 * 60)) % 60);
    var hours = Math.floor((millis / (1000 * 60 * 60)));

    seconds = String(seconds).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    hours = String(hours).padStart(2, '0');

    return {hours: hours, minutes: minutes, seconds: seconds};
}

const app = Object.freeze({
    states: {
        work: 'work',
        break: 'break',
        chill: 'chill'
    }
});