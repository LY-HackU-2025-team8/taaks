import { $api } from '@/shared/api/openapi-fetch';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { z } from 'zod';
import type { TaskResponseModel } from './task-model';

/** タスクを編集する関数を返すHook */
export const useDeleteTask = (task: TaskResponseModel) => {
  const queryClient = useQueryClient();
  const taskId = z.number().parse(task.id);
  const { mutateAsync, ...rest } = $api.useMutation(
    'delete',
    '/tasks/{taskId}',
    {
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
        // 今日の進捗のキャッシュを破棄
        queryClient.invalidateQueries($api.queryOptions('get', '/days/today'));
        queryClient.invalidateQueries(
          $api.queryOptions('get', '/days/{day}', {
            params: {
              path: {
                day: format(new Date(task?.dueAt || Date.now()), 'yyyy-MM-dd'),
              },
            },
          })
        );
      },
    }
  );

  const deleteTask = useCallback(
    ({
      mutateOptions,
      toastOptions,
    }: {
      mutateOptions?: Parameters<typeof mutateAsync>[1];
      toastOptions?: Parameters<
        typeof toast.promise<Awaited<ReturnType<typeof mutateAsync>>>
      >[1];
    } = {}) => {
      const promise = mutateAsync(
        {
          params: { path: { taskId } },
        },
        mutateOptions
      );

      const toastPromise = toast.promise(promise, {
        loading: 'タスクを削除しています...',
        success: `「${task.title}」を削除しました！`,
        error: (err) => {
          return err.message || 'タスクの更新に失敗しました。';
        },
        ...toastOptions,
      });

      return toastPromise;
    },
    [mutateAsync, taskId, task.title]
  );

  return { deleteTask, ...rest };
};
