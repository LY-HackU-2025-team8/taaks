import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import './fonts.css';
import './index.css';
import { routeTree } from './route-tree.gen';
import reportWebVitals from './shared/lib/reportWebVitals.ts';
import { zodConfig } from './shared/lib/zod-config.ts';

// Zodの設定を行う
zodConfig();

// tanstackQueryのQueryClientを作成
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // ネットワークエラーの場合のみリトライする
        if (error instanceof Error && error.name === 'NetworkError') {
          return failureCount < 3; // 最大3回リトライする
        }
        return false; // その他のエラーではリトライしない
      },
      staleTime: 1000 * 30, // 30秒以内に取得したデータがあるときは再取得しない
    },
  },
});

// TanstackRouterのRouterの作成
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    htmlClassName: '',
    appClassName: '',
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// 型安全のために型情報を登録
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Reactをレンダリングするためのルート要素を取得し、ReactDOMを使用してレンダリング
const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
