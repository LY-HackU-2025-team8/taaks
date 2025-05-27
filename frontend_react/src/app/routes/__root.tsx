import { useEffect } from 'react';
import type { QueryClient } from '@tanstack/react-query';
import {
  Outlet,
  createRootRouteWithContext,
  useMatches,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

interface RootRouteContext {
  queryClient: QueryClient;
  htmlClassName: string;
  appClassName: string;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => <RouteComponent />,
});

const RouteComponent = () => {
  const matches = useMatches();

  useEffect(() => {
    // 最後のマッチからclassNameを取得
    const lastMatch = matches[matches.length - 1];
    const htmlClassName = lastMatch?.context?.htmlClassName || '';
    const appClassName = lastMatch?.context?.appClassName || '';
    const meta = document.querySelector('meta[name="theme-color"]');
    const html = document.documentElement;
    const app = document.getElementById('app');
    const htmlClassNameArray = htmlClassName.split(' ');
    const appClassNameArray = appClassName.split(' ');
    // html, bodyにクラス名を追加
    if (htmlClassName !== '') html.classList.add(...htmlClassNameArray);
    if (appClassName !== '') app?.classList.add(...appClassNameArray);
    // htmlのcomputedStyleから最終的な色を取得
    const resolvedColor = getComputedStyle(html).backgroundColor;
    // <meta name="theme-color"> をセット
    if (meta) meta.setAttribute('content', resolvedColor);

    return () => {
      // クリーンアップ: html, bodyからクラス名を削除
      if (htmlClassName !== '') html.classList.remove(...htmlClassNameArray);
      if (appClassName !== '') app?.classList.remove(...appClassNameArray);
      // クリーンアップ: <meta name="theme-color"> を元の色に戻す
      const resolvedColor = getComputedStyle(html).backgroundColor;
      if (meta) meta.setAttribute('content', resolvedColor);
    };
  }, [matches]);

  return (
    <>
      <Outlet />
      {import.meta.env.VITE_SHOW_TANSTACK_ROUTER_DEVTOOLS === 'true' && (
        <TanStackRouterDevtools position="top-right" />
      )}
    </>
  );
};
