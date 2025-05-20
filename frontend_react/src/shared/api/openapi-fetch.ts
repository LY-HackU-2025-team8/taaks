import createFetchClient, { type Middleware } from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from './api-spec';

export const baseUrl = import.meta.env.VITE_BACKEND_HOST || 'http://localhost:8080';

export const fetchClient = createFetchClient<paths>({
  baseUrl: baseUrl + '/v2',
  headers: {
    'Content-Type': 'application/json',
    ...(localStorage.getItem('token') && {
      'X-Auth-TOKEN': localStorage.getItem('token'),
    }),
  },
});

const addAuthHeader: Middleware = {
  async onRequest({ request }) {
    const token = localStorage.getItem('token');
    if (token) {
      request.headers.set('X-Auth-TOKEN', token);
    }
  },
};

fetchClient.use(addAuthHeader);

// https://openapi-ts.dev/ja/openapi-react-query/
export const $api = createClient(fetchClient);
