const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const publicVapidKey = 'YOUR_PUBLIC_VAPID_KEY';
const privateVapidKey = 'YOUR_PRIVATE_VAPID_KEY';

webpush.setVapidDetails(
  'mailto:manzoor@example.com',
  publicVapidKey,
  privateVapidKey
);

let savedSubscription = null;

app.post('/subscribe', (req, res) => {
  savedSubscription = req.body;
  res.status(201).json({});
  console.log('Cihaz başarıyla kaydedildi!');
});

app.post('/send-vibration', async (req, res) => {
  if (!savedSubscription) {
    return res.status(400).json({ error: 'Bağlı cihaz bulunamadı!' });
  }

  const payload = JSON.stringify({
    title: '❤️ Kalp Sinyali (Love Signal)',
    body: 'Manzoor seni düşündü ve kalp gönderdi!',
    vibrate: [500, 200, 500, 200, 1000, 300, 1000]
  });

  try {
    await webpush.sendNotification(savedSubscription, payload);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Bildirim gönderme hatası:', error);
    res.status(500).json({ error: 'Sinyal gönderilemedi' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
