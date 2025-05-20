importScripts(
  'https://www.gstatic.com/firebasejs/11.7.3/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/11.7.3/firebase-messaging-compat.js'
);

// 公開してもいいAPIキーらしい
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyCZ_MlYQfXU6JW62n-XQTZJbHe0_lWdnpk',
  authDomain: 'taaks-message-proto.firebaseapp.com',
  projectId: 'taaks-message-proto',
  storageBucket: 'taaks-message-proto.firebasestorage.app',
  messagingSenderId: '127683435347',
  appId: '1:127683435347:web:c437396492c07e647cdfa6',
});

// Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// background message handler
messaging.onBackgroundMessage((payload) => {
  // Firebase SDKが自動で showNotification() を呼び出してくれる
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
});
