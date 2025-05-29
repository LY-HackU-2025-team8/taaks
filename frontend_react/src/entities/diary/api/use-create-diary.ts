import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DATA_FORMAT } from '@/shared/constants';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import type { z } from 'zod';
import type { diaryFormSchema } from './diary-form-schema';

/** 日記を作成する関数を返すHook */
export const useCreateDiary = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = $api.useMutation('post', '/diaries', {
    // なんらかのエラーが発生しても日記が更新される場合があるのでonSettledを使用
    onSettled: () => {
      // 日記一覧のキャッシュを破棄
      queryClient.invalidateQueries($api.queryOptions('get', '/diaries'));
    },
  });

  /**
   * タスクを作成する関数
   * @param TanstackQueryのmutateのoptions
   * @return taskFormSchemaのdataを受け取るコールバック
   */
  const createDiary = useCallback(
    (options?: Parameters<typeof mutate>[1]) =>
      (data: z.infer<typeof diaryFormSchema>) => {
        // DateTimeをサーバーが受け付ける形式にフォーマット
        const date = format(data.date, DATE_DATA_FORMAT);

        return mutate(
          {
            body: {
              ...data,
              date,
            },
          },
          options
        );
      },
    [mutate]
  );

  return { createDiary, ...rest };
};
