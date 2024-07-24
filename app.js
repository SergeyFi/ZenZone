export class App {
    constructor() {
        this._observers = [];
    }
    getState() {
        return localStorage.getItem('appState')??app.states.work;
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
