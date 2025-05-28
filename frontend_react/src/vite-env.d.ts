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
}

interface ImportMeta {
  /**
   * 環境変数
   */
  readonly env: ImportMetaEnv;
}
