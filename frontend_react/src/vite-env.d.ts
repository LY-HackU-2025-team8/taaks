/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * APIのエンドポイント
   */
  readonly VITE_BACKEND_HOST: string;
}

interface ImportMeta {
  /**
   * 環境変数
   */
  readonly env: ImportMetaEnv;
}
