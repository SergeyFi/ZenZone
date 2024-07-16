let notifyTimer;

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('cache-v1').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html'
        ]);
      })
    );
  });
  
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });

self.addEventListener('activate', function(event) {
    log('SW has activated');
});

  self.addEventListener('message', function(event) {
    if (event.data.action == 'notify') {
      scheduleNotification(event.data.value);
    } else if (event.data.action == 'cancelNotify') {
      if (notifyTimer) {
        this.clearTimeout(notifyTimer);
        log('Notify has canceled');
      }
    }
  });

function scheduleNotification(delay) {
    log('Notify has set')
    notifyTimer = setTimeout(function() {
      showNotification();
    }, delay);
}

function showNotification() {
  log('Notify has show')
  self.registration.showNotification('Time for a break', {
    body: 'ZenZone'
});
}

function log(message) {
  const now = new Date();
  const timestamp = `${now.toLocaleTimeString()} -`;
  console.log(timestamp, message);
}
