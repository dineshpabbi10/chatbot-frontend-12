// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyD6_cEhjYmGtA5XoW3PhPQaoFqUEEZw99Q",
    authDomain: "elasbotchatbot.firebaseapp.com",
    projectId: "elasbotchatbot",
    storageBucket: "elasbotchatbot.appspot.com",
    messagingSenderId: "742241989692",
    appId: "1:742241989692:web:3cdc0f927256be516b3f39",
    measurementId: "G-C8LYF79RSR"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
});

