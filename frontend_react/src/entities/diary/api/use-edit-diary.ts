import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DATA_FORMAT, DATE_DISPLAY_FORMAT } from '@/shared/constants';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { z } from 'zod';
import type { diaryFormSchema } from './diary-form-schema';
import type { DiaryResponseModel } from './diary-model';

/** 日記を編集する関数を返すHook */
export const useEditDiary = (diary: DiaryResponseModel) => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...rest } = $api.useMutation('put', '/diaries/{id}', {
    // なんらかのエラーが発生しても日記が更新される場合があるのでonSettledを使用
    onSettled: () => {
      // 日記一覧のキャッシュを破棄
      queryClient.invalidateQueries($api.queryOptions('get', '/diaries'));
      // 日記の詳細のキャッシュを破棄
      queryClient.invalidateQueries(
        $api.queryOptions('get', '/diaries/{id}', {
          params: { path: { id: diary.id } },
        })
      );
    },
  });

  /**
   * 日記を編集する関数
   * @param TanstackQueryのmutateのoptions
   * @return taskFormSchemaのdataを受け取るコールバック
   */
  const editDiary = useCallback(
    (
      data: z.infer<typeof diaryFormSchema>,
      {
        mutateOptions,
        toastOptions,
      }: {
        mutateOptions?: Parameters<typeof mutateAsync>[1];
        toastOptions?: Parameters<
          typeof toast.promise<Awaited<ReturnType<typeof mutateAsync>>>
        >[1];
      } = {}
    ) => {
      // DateTimeをサーバーが受け付ける形式にフォーマット
      const date = format(data.date, DATE_DATA_FORMAT);

      return toast.promise(
        mutateAsync(
          {
            params: { path: { id: diary.id } },
            body: {
              ...data,
              date,
            },
          },
          mutateOptions
        ),
        {
          loading: '日記を更新しています...',
          success: (res) =>
            `${format(res.date, DATE_DISPLAY_FORMAT)}の日記を更新しました！`,
          error: (err) => {
            return err.message || '日記の更新に失敗しました。';
          },
          ...toastOptions,
        }
      );
    },
    [mutateAsync, diary.id]
  );

  return { editDiary, ...rest };
};
