import type { FileRoutesByTo } from '@/route-tree.gen';
import { $api } from '@/shared/api/openapi-fetch';
import type { QueryClient } from '@tanstack/react-query';
import { redirect } from '@tanstack/react-router';

/** ログインされていなければログイン画面に飛ばす */
export const requireLogin = async (
  queryClient: QueryClient,
  {
    to,
  }: {
    to: keyof FileRoutesByTo;
  }
) => {
  try {
    await queryClient.ensureQueryData($api.queryOptions('get', '/users/me'));
  } catch {
    // ユーザーデータの取得に失敗した場合
    throw redirect({ to });
  }
};
