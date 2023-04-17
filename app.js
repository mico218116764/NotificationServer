const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Inisialisasi Firebase Admin SDK
const serviceAccount = require('C:/Users/ogheyyy/Documents/Node JS/serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Endpoint untuk menerima permintaan dari aplikasi Flutter
app.post('/send-notification', async (req, res) => {
    try {
        // console.log(req.body)
        const { registrationToken, data } = req.body;
        // Buat pesan
        const message = {
            notification: {
                title: 'Notification Title',
                body: 'Notification Body'
            },
            data: data,
            token: registrationToken
        };

        // Kirim pesan menggunakan Firebase Admin SDK
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
        res.status(200).send('Notification sent');
    } catch (error) {
        console.log('Error sending message:', error);
        res.status(500).send('Error sending notification');
    }
});

app.listen(3000, () => console.log('Server started on port 3000'));