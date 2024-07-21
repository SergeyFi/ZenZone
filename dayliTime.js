export class DayliTime {
    constructor(dayStartHour, dayEndHour, workHours) {
        this._timeStart = new Date().setHours(dayStartHour, 0, 0, 0);
        this._clearOutdatedData(this._timeStart);
        localStorage.setItem('dayStart', this._timeStart);
        this._timeEnd = new Date().setHours(dayEndHour, 0, 0, 0);
        localStorage.setItem('dayEnd', this._timeEnd);
        let workTimeSaved = localStorage.getItem('workTime');
        this._workTime = workTimeSaved? workTimeSaved : (workHours * 60 * 60 * 1000);
    }

    removeWorkTime(time) {
        this._workTime = Math.max(this._workTime - time, 0);
        if (this._workTime < 0) {
            this._workTime = 0;
        }
        localStorage.setItem('workTime', this._workTime);
    }

    getWorkTime() {
        return this._workTime;
    }

    getDayTime() {
        return Math.max((Math.min(this._timeEnd - Date.now(), this._timeEnd - this._timeStart)), 0);
    }

    _clearData() {
        localStorage.removeItem('dayStart');
        localStorage.removeItem('dayEnd');
        localStorage.removeItem('workTime');
    }

    _clearOutdatedData(dayStart) {
        let dayStartPrev = parseInt(localStorage.getItem('dayStart'));
        if (dayStartPrev && dayStart > dayStartPrev) {
            this._clearData();
        }
    }
}