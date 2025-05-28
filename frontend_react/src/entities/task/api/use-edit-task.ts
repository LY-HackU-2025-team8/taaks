import { $api } from '@/shared/api/openapi-fetch';
import { DATETIME_DATA_FORMAT } from '@/shared/constant';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { z } from 'zod';
import type { taskFormSchema } from './task-form-schema';

/** タスクを編集する関数を返すHook */
export const useEditTask = (taskId: number) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = $api.useMutation('put', '/tasks/{taskId}', {
    // なんらかのエラーが発生してもタスクが更新される場合があるのでonSettledを使用
    onSettled: () => {
      // タスク一覧のキャッシュを破棄
      queryClient.invalidateQueries($api.queryOptions('get', '/tasks'));
      // タスクの詳細のキャッシュを破棄
      queryClient.invalidateQueries(
        $api.queryOptions('get', '/tasks/{taskId}', {
          params: { path: { taskId } },
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
    (options?: Parameters<typeof mutate>[1]) =>
      (data: z.infer<typeof taskFormSchema>) => {
        // DateTimeをサーバーが受け付ける形にフォーマット
        const dueAt = format(data.dueAt, DATETIME_DATA_FORMAT);
        const completedAt = data.completedAt
          ? format(data.completedAt, DATETIME_DATA_FORMAT)
          : undefined;

        return mutate(
          {
            params: { path: { taskId } },
            body: {
              ...data,
              dueAt,
              completedAt,
            },
          },
          options
        );
      },
    [mutate, taskId]
  );

  return { editTask, ...rest };
};
