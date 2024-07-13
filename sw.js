importScripts('./timer.js');

let defaultTime = 25;
const timer = new Timer(defaultTime, 1000, onUpdate, onStart, onPause, onEnd);

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('cache-v1').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html'
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
  const action = event.data.action;
  if (action === 'start') {
    if (timer.start()) {
      console.log('Timer is start');
    } else {
      timer.pause();
      console.log('Timer is paused');
    }
  } else if (action === 'reset') {
    timer.reset();
  } else if (action === 'increase') {
    defaultTime = Math.min(defaultTime + 1, 99);
    timer.reset(defaultTime);
  } else if (action === 'decrease') {
    defaultTime = Math.max(defaultTime - 1, 1);
    timer.reset(defaultTime);
  } else if (action === 'update') {
    onUpdate();
    if (timer.isWork()) {
      onStart();
    } else {
      onPause();
    }
  }

});

function onUpdate() {
  toFront({action: 'timeUpdate', value: timer.getTime()});
}

function onStart() {
  toFront({action: 'start'});
}

function onPause() {
  toFront({action: 'pause'});
}

function onEnd() {
  showNotification();
}

function toFront(message) {
  clients.matchAll().then(function(clients) {
    clients.forEach(function(client) {
      client.postMessage(message);
    });
  });
}

function showNotification() {
  self.registration.showNotification('Time for a break', {
    body: 'ZenZone'
});
}
