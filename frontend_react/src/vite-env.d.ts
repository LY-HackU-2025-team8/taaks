/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * バックエンドAPIのホスト名
   */
  readonly VITE_BACKEND_HOST: string;
  /**
   * Tanstack RouterのDevToolsを表示するか
   */
  readonly VITE_SHOW_TANSTACK_ROUTER_DEVTOOLS: string;
  /**
   * FirebaseのAPIキー
   */
  readonly VITE_FIREBASE_API_KEY: string;
  /**
   * Firebaseの認証ドメイン
   */
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  /**
   * FirebaseのプロジェクトID
   */
  readonly VITE_FIREBASE_PROJECT_ID: string;
  /**
   * Firebaseのストレージバケット
   */
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  /**
   * Firebaseのメッセージング送信者ID
   */
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  /**
   * FirebaseのアプリID
   */
  readonly VITE_FIREBASE_APP_ID: string;
  /**
   * FirebaseのVAPIDキー
   */
  readonly VITE_FIREBASE_VAPID_KEY: string;
}

interface ImportMeta {
  /**
   * 環境変数
   */
  readonly env: ImportMetaEnv;
}
