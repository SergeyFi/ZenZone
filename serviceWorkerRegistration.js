if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(function (registration) {
            console.log('Service Worker зарегистрирован успешно:', registration);
        })
        .catch(function (error) {
            console.error('Ошибка при регистрации Service Worker:', error);
        });
}