const app = Object.freeze({
    states: {
        work: "work",
        break: "break",
        chill: "chill"
    },
    manager: new class {
        constructor() {
            this._observers = [];
            this._state = this.getState();
            if (!this._state) this.setState('work');
        }
        getState() {
            return localStorage.getItem('appState');
        }
        setState(state) {
            this._state = state;
            localStorage.setItem('appState', state);
            this._observers.forEach(function(observer) {
                observer({state: state});
            });
        }
        addEventListener(type, callback) {
            if (type == 'state') {
                this._observers.push(callback);
            }
        }
    }
});
