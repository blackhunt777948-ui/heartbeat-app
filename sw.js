self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {
    title: '❤️ Kalp Sinyali',
    body: 'Seni düşündü ve kalp gönderdi!',
    vibrate: [500, 200, 500, 200, 1000]
  };
  
  const options = {
    body: data.body || 'Sana özel bir kalp sinyali geldi!',
    icon: '/icon.png',
    vibrate: [500, 200, 500, 200, 1000, 300, 1000], // یہ فون کو زبردست وائبریٹ کرے گا
    tag: 'love-signal',
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '❤️ Kalp Atışı', options)
  );
});
