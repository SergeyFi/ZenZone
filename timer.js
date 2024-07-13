const work = Symbol('work');
const pause = Symbol('pause');
const reset = Symbol('reset');

class Timer {
    constructor(minutes, period, onUpdate, onStart, onPause, onEnd) {
        this._timeInitial = minutes * 60 * 1000;
        this._timeCurrent = this._timeInitial;
        this._period = period;
        this._state = reset;
        this._onStart = onStart;
        this._onUpdate = onUpdate;
        this._onPause = onPause;
        this._onEnd = onEnd;
    }

    start() {
        if (this._state !== work) {
            this._timeScheduled = Date.now() + this._timeInitial;
            this._timer = setInterval(this._update.bind(this), this._period);
            this._state = work;
            this._onStart?.();

            return true;
        }

        return false;
    }

    pause() {
        clearInterval(this._timer);
        this._state = pause;
        this._onPause?.();
    }

    reset(minutes) {
        clearInterval(this._timer);
        if (minutes) this._timeInitial = minutes * 60 * 1000;
        this._timeCurrent = this._timeInitial;
        this._state = reset;
        this._onUpdate();
    }

    _update() {
        this._timeCurrent -= this._period;
        this._onUpdate();


        if (Date.now() >= this._timeScheduled) {
            this.reset();
            this._onEnd?.();
            console.log('Timer is end');
        }
    }

    getTime() {
        return this._timeCurrent;
    }

    isWork() {
        return this._state == work;
    }
}
