document.addEventListener('DOMContentLoaded', function() {
    tryGetNotifyPermission();
});

function tryGetNotifyPermission() {
    if (Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function requestNotify(time) {
    navigator.serviceWorker.controller.postMessage({ action: 'notify', value: time });
}

function requestCancelNotify() {
    navigator.serviceWorker.controller.postMessage({ action: 'cancelNotify' });
}