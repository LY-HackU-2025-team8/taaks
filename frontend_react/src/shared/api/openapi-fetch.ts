import createFetchClient, { type Middleware } from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from './api-spec';

/** バックエンドの基底URL */
export const baseUrl =
  import.meta.env.VITE_BACKEND_HOST || 'http://localhost:8080';

/** OpenAPI仕様に基づいて型が推論されるFetchClient */
export const fetchClient = createFetchClient<paths>({
  baseUrl: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** 認証トークンをリクエストヘッダーに追加するミドルウェア */
const addAuthHeader: Middleware = {
  async onRequest({ request }) {
    const token = localStorage.getItem('token');
    if (token) {
      request.headers.set('X-Auth-Token', `Bearer ${token}`);
    }
  },
};

/** バックエンドがエラー時にBodyを返さなかった時に、強制的にエラーを投げる */
const forceThrowError: Middleware = {
  async onResponse({ response }) {
    if (!response.ok && (await response.text()) === '') {
      throw new Error('Unexpected error');
    }
  },
};

// ミドルウェアをFetchClientに追加
fetchClient.use(addAuthHeader);
fetchClient.use(forceThrowError);

/**
 * @see https://openapi-ts.dev/ja/openapi-react-query/
 */
export const $api = createClient(fetchClient);
