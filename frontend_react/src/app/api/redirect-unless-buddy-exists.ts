import { $api } from '@/shared/api/openapi-fetch';
import type { QueryClient } from '@tanstack/react-query';
import { redirect } from '@tanstack/react-router';

/** Buddyが作成されていない場合にリダイレクトする */
export const redirectUnlessBuddyExists = async (
  queryClient: QueryClient,
  options: Parameters<typeof redirect>[0]
) => {
  try {
    await queryClient.fetchQuery($api.queryOptions('get', '/buddy'));
  } catch {
    // ユーザーデータの取得に失敗した場合
    throw redirect(options);
  }
};
