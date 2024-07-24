const zenTimer = window.app.timer;

document.addEventListener('DOMContentLoaded', function() {
    tryGetNotifyPermission();
});

function tryGetNotifyPermission() {
    if (Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function requestNotify(time) {
    navigator.serviceWorker.controller.postMessage({ action: 'notify', value: zenTimer.getCurrentTime()});
}

function requestCancelNotify() {
    navigator.serviceWorker.controller.postMessage({ action: 'cancelNotify' });
}

zenTimer. addEventListener((event)=>{
    if (event.type == 'onStart' || event.type == 'onResume') {
        requestNotify();
    } else if (event.type == 'onPause' || event.type == 'onReset') {
        requestCancelNotify();
    }
});