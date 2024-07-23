const dataType = Object.freeze({
    int: Symbol('int'),
    float: Symbol('float'),
    str: Symbol('string')
});

class Key {
    constructor(key, dataType) {
        this._key = key;
        this._dataType = dataType;
    }
    getKey() {
        return this._key;
    }
    getDataType() {
        this._dataType;
    }
}

const keys = Object.freeze({
    timer: {
        state: new Key('timerState', dataType.str),
        startTime: new Key('startTime', dataType.int),
        endTime: new Key('endTime', dataType.int)
    }
});

export class DataBase {
    saveData(key, data) {
        localStorage.setItem(key.getKey(), data);
    }
    getData(key) {
        if (key.getDataType() == dataType.str) {
            return localStorage.getItem(key.getKey());
        } else if (key.getDataType() == dataType.int) {
            return parseInt(localStorage.getItem(key.getKey()));
        } else if (key.getDataType() == dataType.float) {
            return parseFloat(localStorage.getItem(key.getKey()));
        }
    }
}
