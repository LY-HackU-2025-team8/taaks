import { $api } from '@/shared/api/openapi-fetch';
import { DATETIME_DATA_FORMAT } from '@/shared/constant';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import type { z } from 'zod';
import type { taskFormSchema } from './task-form-schema';

/** タスクを作成する関数を返すHook */
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = $api.useMutation('post', '/tasks', {
    // なんらかのエラーが発生してもタスクが更新される場合があるのでonSettledを使用
    onSettled: () => {
      // タスク一覧のキャッシュを破棄
      queryClient.invalidateQueries($api.queryOptions('get', '/tasks'));
    },
  });

  /**
   * タスクを作成する関数
   * @param TanstackQueryのmutateのoptions
   * @return taskFormSchemaのdataを受け取るコールバック
   */
  const createTask = useCallback(
    (options?: Parameters<typeof mutate>[1]) =>
      (data: z.infer<typeof taskFormSchema>) => {
        // DateTimeをサーバーが会社機できる形にフォーマット
        const dueAt = format(data.dueAt, DATETIME_DATA_FORMAT);
        const completedAt =
          data.completedAt && format(data.completedAt, DATETIME_DATA_FORMAT);

        return mutate(
          {
            body: {
              ...data,
              dueAt,
              completedAt,
            },
          },
          options
        );
      },
    [mutate]
  );

  return { createTask, ...rest };
};
