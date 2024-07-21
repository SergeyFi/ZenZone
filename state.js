const app = Object.freeze({
    states: {
        work: "work",
        break: "break",
        chill: "chill"
    },
    manager: new class {
        constructor() {
            this._state = this.getState();
            if (!this._state) this.setState('work');
        }
        getState() {
            return localStorage.getItem('appState');
        }
        setState(state) {
            this._state = state;
            localStorage.setItem('appState', state);
        }
    }
});
