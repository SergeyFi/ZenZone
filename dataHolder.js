export const isWork = 'isWork';
export const isPaused = 'isPaused';
export const isNotSet = 'isNotSet';

export class timeKeeper {
    constructor(onStart, onPaused) {
        this._onStart = onStart;
        this._onPaused = onPaused;
        
        let status = this.getStatus();
        if (status) {
            this._setStatus(status);
        } else {
            this._setStatus(isNotSet);
        }
        
    }

    start() {
        if (this.getStatus() == isNotSet) {
            localStorage.setItem('scheduledTime', (Date.now() + 25 * 60 * 1000 + 1000).toString());
            this._setStatus(isWork);
            this._onStart?.();
        } else if (this.getStatus() == isWork) {
            this._pause();
        } else if (this.getStatus() == isPaused) {
            localStorage.setItem('scheduledTime', (Date.now() + parseInt(localStorage.getItem('remainingTime'))).toString());
            localStorage.removeItem('remainingTime');
            this._setStatus(isWork);
            this._onStart?.();
        }
    }

    getStatus() {
        let currentStatus = localStorage.getItem('status');
        if (currentStatus) {
            return currentStatus;
        } else {
            return isNotSet;
        }
    }

    getRemainingTime() {
        if (this.getStatus() == isWork) {
            return parseInt(localStorage.getItem('scheduledTime')) - Date.now();
        } else if (this.getStatus() == isNotSet) {
            return 25 * 60 * 1000;
        } else {
            return parseInt(localStorage.getItem('remainingTime'));
        }
    }

    _pause() {
        if (this.getStatus() == isWork) {
            this._setStatus(isPaused);
            localStorage.setItem('remainingTime', ((parseInt(localStorage.getItem('scheduledTime')) - Date.now())).toString());
            localStorage.removeItem('scheduledTime');
            this._onPaused?.();
        }
    }

    _setStatus(status) {
        localStorage.setItem('status', status);
    }
}