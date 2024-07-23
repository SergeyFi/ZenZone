const states = Object.freeze({ none: 'none', work: 'work', pause: 'pause' });

export class ZenTimer {
    constructor() {
        this._btnStart = document.getElementById('btnStart');
        this._bindToButton(this._btnStart, this._timerModeSelection.bind(this));
        this._btnReset = document.getElementById('btnReset');
        this._bindToButton(this._btnReset, this._onReset.bind(this));
        this._timerDisplay = document.getElementById("timerDisplay");
        this._timeLimits = Object.freeze({ min: 1 * 60 * 1000, max: 99 * 60 * 1000 });
        this._onUpdate();
        this._startAutoUpdate();
    }
    getCurrentTime() {
        if (this._getState() == states.work) {
            return parseInt(localStorage.getItem('timerEndTime')) - Date.now();
        } else if (this._getState() == states.pause) {
            let timePause = parseInt(localStorage.getItem('timerPauseTime'));
            let timeEnd = parseInt(localStorage.getItem('timerEndTime'));
            return timeEnd - timePause;
        } else {
            return this._getDefaultTime();
        }
    }

    _bindToButton(btn, callback) {
        btn.addEventListener('click', callback);
    }
    _onStart() {
        this._setState(states.work);
        this._btnStart.innerText = 'pause';
        localStorage.setItem('timerEndTime', this._getDefaultTime() + Date.now());
    }
    _onPause() {
        this._setState(states.pause);
        localStorage.setItem('timerPauseTime', Date.now());
        this._btnStart.innerText = 'start';
    }
    _onResume() {
        this._setState(states.work);
        this._btnStart.innerText = 'pause';
        localStorage.setItem('timerEndTime', parseInt(localStorage.getItem('timerEndTime')) + 
        Date.now() - parseInt(localStorage.getItem('timerPauseTime')));
    }
    _onReset() {
        this._setState(states.none);
        localStorage.removeItem('timerCurrentTime');
        localStorage.removeItem('timerEndTime');
        localStorage.removeItem('timerPauseTime');
        this._btnStart.innerText = 'start';
        this._onUpdate();
    }
    _onUpdate() {
        if (this._getState() != states.pause) {
            let time = millisToString(this.getCurrentTime());
            this._timerDisplay.innerText = time.minutes + ':' + time.seconds;
        }
    }

    _timerModeSelection() {
        if (this._getState() == states.none) {
            this._onStart();
        } else if (this._getState() == states.work) {
            this._onPause();
        } else {
            this._onResume();
        }
    }
    _getState() {
        return localStorage.getItem('timerState')??states.none;
    }
    _setState(state) {
        localStorage.setItem('timerState', state);
    }

    _getDefaultTime() {
        return 25*60*1000;
    }
    _startAutoUpdate() {
        this._updateTimer = setInterval(this._onUpdate.bind(this), 1000);
    }
    _stopAutoUpdate() {
        clearInterval(this._updateTimer);
    }
}