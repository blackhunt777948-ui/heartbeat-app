importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAq9YcI7elloPxpARxpq1nIi4",
  authDomain: "kalp-atisi-31908.firebaseapp.com",
  projectId: "kalp-atisi-31908",
  storageBucket: "kalp-atisi-31908.appspot.com",
  messagingSenderId: "528037346484",
  appId: "1:528037346484:web:3ac7608dc689"
});

const messaging = firebase.messaging();

// کروم اور ایپ بند ہونے کی صورت میں بیک گراؤنڈ وائبریشن ہینڈلر
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification ? payload.notification.title : '❤️ Kalp Sinyali';
  const notificationOptions = {
    body: payload.notification ? payload.notification.body : 'Manzoor seni düşündü ve kalp gönderdi!',
    icon: '/icon.png',
    vibrate: [500, 200, 500, 200, 1000],
    tag: 'love-signal',
    renotify: true
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
