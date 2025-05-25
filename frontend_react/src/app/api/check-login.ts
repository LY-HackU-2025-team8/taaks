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
    await queryClient.ensureQueryData($api.queryOptions('get', '/users/me'));
  } catch {
    // ユーザーデータの取得に失敗した場合
    if (onError) throw redirect({ to: onError });
  }
  // ユーザーデータの取得に成功した場合
  if (onSuccess) throw redirect({ to: onSuccess });
};
