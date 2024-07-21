const app = Object.freeze({
    states: {
        work: "work",
        break: "break",
        chill: "chill"
    },
    manager: new class {
        constructor() {
            this._state = 'work';
        }
        getState() {
            return this._state;
        }
        setState(state) {
            console.log('State: ' + state);
            this._state = state;
            localStorage.setItem('appState', state);
        }
    }
});
