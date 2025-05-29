import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DATA_FORMAT, DATE_DISPLAY_FORMAT } from '@/shared/constants';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { z } from 'zod';
import type { diaryFormSchema } from './diary-form-schema';

/** 日記を作成する関数を返すHook */
export const useCreateDiary = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...rest } = $api.useMutation('post', '/diaries', {
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
    (
      options?: Parameters<typeof mutateAsync>[1],
      toastOptions?: Parameters<typeof toast.promise>[1]
    ) =>
      (data: z.infer<typeof diaryFormSchema>) => {
        // DateTimeをサーバーが受け付ける形式にフォーマット
        const date = format(data.date, DATE_DATA_FORMAT);

        return toast.promise(
          mutateAsync(
            {
              body: {
                ...data,
                date,
              },
            },
            options
          ),
          {
            loading: '日記を作成しています...',
            success: (res) =>
              `${format(res.date, DATE_DISPLAY_FORMAT)}の日記を作成しました！`,
            error: (err) => {
              return err.message || '日記の作成に失敗しました。';
            },
            ...toastOptions,
          }
        );
      },
    [mutateAsync]
  );

  return { createDiary, ...rest };
};
