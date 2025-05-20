import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import type { MessagePayload } from 'firebase/messaging';
import firebaseApp from './config';

const messaging = getMessaging(firebaseApp);

export const requestFirebaseMessagingPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
    console.log('Firebase messaging token:', token);
    return token;
  } catch (error) {
    console.error('Error getting Firebase messaging token:', error);
  }
};

export const onForegroundMessage = (
  callback: (payload: MessagePayload) => void
) => {
  onMessage(messaging, (payload) => {
    callback(payload);
  });
};
