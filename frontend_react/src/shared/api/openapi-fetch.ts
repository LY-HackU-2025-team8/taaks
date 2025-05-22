import createFetchClient, { type Middleware } from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from './api-spec';

export const baseUrl =
  import.meta.env.VITE_BACKEND_HOST || 'http://localhost:8080';

export const fetchClient = createFetchClient<paths>({
  baseUrl: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const addAuthHeader: Middleware = {
  async onRequest({ request }) {
    const token = localStorage.getItem('token');
    if (token) {
      request.headers.set('X-Auth-Token', `Bearer ${token}`);
    }
  },
};

/** バックエンドがエラー時にBodyを返すまでは、強制的にエラーを投げる */
const forceThrowError: Middleware = {
  async onResponse({ response }) {
    if (!response.ok && (await response.text()) === '') {
      throw new Error('Unexpected error');
    }
  },
};

fetchClient.use(addAuthHeader);
fetchClient.use(forceThrowError);

// https://openapi-ts.dev/ja/openapi-react-query/
export const $api = createClient(fetchClient);
