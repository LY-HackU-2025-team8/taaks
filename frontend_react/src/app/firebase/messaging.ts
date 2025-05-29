import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import type { MessagePayload } from 'firebase/messaging';
import firebaseApp from './config';

const messaging = getMessaging(firebaseApp);

/** WEB通知に関する許可と，デバイストークンを取得 */
export const requestFirebaseMessagingPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
    return token;
  } catch (error) {
    console.error('Failed to get Firebase messaging token', error);
    throw new Error(
      'Failed to get Firebase messaging token: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
};

/**
 * フロントエンドでの通知受信時のコールバックを設定
 * @param callback 通知受信時に呼び出されるコールバック関数
 */
export const onForegroundMessage = (
  callback: (payload: MessagePayload) => void
) => {
  onMessage(messaging, (payload) => {
    callback(payload);
  });
};
