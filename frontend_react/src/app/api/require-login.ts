import { userQueryOptions } from '@/entities/user/api/user-query-options';
import type { FileRoutesByTo } from '@/route-tree.gen';
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
    // ユーザーデータを取得
    await queryClient.ensureQueryData(userQueryOptions());
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
