// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyB0jFiFcMCEZJiRxfoabVHRo_6yCVAHfWo",
    authDomain: "foodhunt-20680.firebaseapp.com",
    projectId: "foodhunt-20680",
    storageBucket: "foodhunt-20680.appspot.com",
    messagingSenderId: "744761034195",
    appId: "1:744761034195:web:36d35935e5702afc9f1b26",
    measurementId: "G-ZDMMWW0756"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
});

