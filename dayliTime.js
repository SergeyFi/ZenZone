export class DayliTime {
    constructor(dayStartHour, dayEndHour, workHours) {
        this._startHour = dayStartHour;
        this._endHour = dayEndHour;
        this._workHours = workHours;
        this._setDayTime();
        if (!localStorage.getItem('workTimeCurrent')) localStorage.setItem('workTimeCurrent', workHours * 60 * 60 * 1000);
        setInterval(this._onUpdate.bind(this), 1000);
    }

    removeWorkTime(time) {
        let workTime = parseInt(localStorage.getItem('workTimeCurrent'));
        workTime = Math.max(workTime - time, 0);
        localStorage.setItem('workTimeCurrent', workTime);
    }

    getWorkTime() {
        return localStorage.getItem('workTimeCurrent');
    }

    getDayTime() {
        let time = Math.max((Math.min(this._timeEnd - Date.now(), this._timeEnd - this._timeStart)), 0);
        return time;
    }

    _isDayEnd() {
        if (this._timeEnd < Date.now()) {
            return true;
        }
        return false;
    }

    _startNewDay() {
        localStorage.setItem('workTimeCurrent', this._workHours * 60 * 60 * 1000);
        this._setDayTime();
    }

    _onUpdate() {
        if (this._isDayEnd()) {
            this._startNewDay();
        }
    }

    _setDayTime() {
        this._timeStart = new Date().setHours(this._startHour, 0, 0, 0);
        this._timeEnd = new Date().setHours(this._endHour, 0, 0, 0);
    }
}