import type { FileRoutesByTo } from '@/route-tree.gen';
import { $api } from '@/shared/api/openapi-fetch';
import type { QueryClient } from '@tanstack/react-query';
import { redirect } from '@tanstack/react-router';

/** ログインされているかいないかでリダイレクトする */
export const checkLogin = async (
  queryClient: QueryClient,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: keyof FileRoutesByTo;
    onError?: keyof FileRoutesByTo;
  } = {}
) => {
  try {
    await queryClient.ensureQueryData($api.queryOptions('get', '/auth-check'));
    return (
      onSuccess &&
      redirect({
        to: onSuccess,
      })
    );
  } catch {
    // ユーザーデータの取得に失敗した場合はリダイレクト
    return (
      onError &&
      redirect({
        to: onError,
      })
    );
  }
};
