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

  self.addEventListener('message', function(event) {
    if (event.data.action == 'notify') {
      scheduleNotification(event.data.value);
    } else if (event.data.action == 'cancelNotify') {
      if (notifyTimer) {
        this.clearTimeout(notifyTimer);
      }
    }
  });

  function scheduleNotification(delay) {
    notifyTimer = setTimeout(function() {
      showNotification();
    }, delay);
}

function showNotification() {
  self.registration.showNotification('Time for a break', {
    body: 'ZenZone'
});
}
