import { $api } from '@/shared/api/openapi-fetch';
import { DATETIME_DATA_FORMAT } from '@/shared/constants';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { z } from 'zod';
import type { taskFormSchema } from './task-form-schema';

/** タスクを編集する関数を返すHook */
export const useEditTask = (taskId: number) => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...rest } = $api.useMutation('put', '/tasks/{taskId}', {
    // なんらかのエラーが発生してもタスクが更新される場合があるのでonSettledを使用
    onSettled: (data) => {
      // タスク一覧のキャッシュを破棄
      queryClient.invalidateQueries($api.queryOptions('get', '/tasks'));
      // タスクの詳細のキャッシュを破棄
      queryClient.invalidateQueries(
        $api.queryOptions('get', '/tasks/{taskId}', {
          params: { path: { taskId } },
        })
      );
      // 今日の進捗のキャッシュを破棄
      queryClient.invalidateQueries($api.queryOptions('get', '/days/today'));
      queryClient.invalidateQueries(
        $api.queryOptions('get', '/days/{day}', {
          params: {
            path: {
              day: format(new Date(data?.dueAt || Date.now()), 'yyyy-MM-dd'),
            },
          },
        })
      );
    },
  });

  /**
   * タスクを編集する関数
   * @param TanstackQueryのmutateのoptions
   * @return taskFormSchemaのdataを受け取るコールバック
   */
  const editTask = useCallback(
    (
      options?: Parameters<typeof mutateAsync>[1],
      toastOptions?: Parameters<typeof toast.promise>[1]
    ) =>
      (data: z.infer<typeof taskFormSchema>) => {
        // DateTimeをサーバーが受け付ける形にフォーマット
        const dueAt = format(data.dueAt, DATETIME_DATA_FORMAT);
        const completedAt = data.completedAt
          ? format(data.completedAt, DATETIME_DATA_FORMAT)
          : undefined;

        return toast.promise(
          mutateAsync(
            {
              params: { path: { taskId } },
              body: {
                ...data,
                dueAt,
                completedAt,
              },
            },
            options
          ),
          {
            loading: 'タスクを更新しています...',
            success: (res) => `タスク「${res.title}」を更新しました！`,
            error: (err) => {
              return err.message || 'タスクの更新に失敗しました。';
            },
            ...toastOptions,
          }
        );
      },
    [mutateAsync, taskId]
  );

  return { editTask, ...rest };
};
