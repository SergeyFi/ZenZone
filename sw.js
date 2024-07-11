let timerIsStart = false;
let initialTime;
let scheduledTime;
let timer;

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

self.addEventListener('message', event => {

  if (event.data.action === 'startTimer') {

    if (!timerIsStart) {

      startTimer(event);
    }
    return;
  }

  if (event.data.action === 'visible') {

    if (timerIsWork) {
      updateTimeOnClient();
    }
    return;
  }

  if (event.data.action === 'resetTimer') {

    if (timerIsStart) {

      stopTimer();
    }

    return;
  }
});

function startTimer(event) {

  timerIsWork = true;
  initialTime = Date.now();
  scheduledTime = initialTime + event.data.value * 1000;
  timer = setInterval(timerCallback, 1000 * 60);
  console.log('Timer is start', event.data.value);
}

function stopTimer() {

  timerIsWork = false;
  clearInterval(timer);
  console.log('Timer is stop');
}

function timerCallback() {
  if (Date.now() >= scheduledTime) {
    showNotification();
    stopTimer();
  }
}

function updateTimeOnClient() {

  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
        // Отправляем сообщение клиенту
        client.postMessage({
            action: 'updateTime',
            value: (scheduledTime - Date.now()) / 1000
        });
    });
  });
}

function showNotification() {

  self.registration.showNotification('Time for a break', {
    body: 'ZenZone'
});
}
