import { $api } from '@/shared/api/openapi-fetch';
import { DATETIME_DATA_FORMAT } from '@/shared/constants';
import { RiveBuddy } from '@/shared/ui/components/rive/rive-buddy';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { z } from 'zod';
import { taskFormSchema } from './task-form-schema';
import type { TaskResponseModel } from './task-model';

/** タスクを編集する関数を返すHook */
export const useEditTask = (task: TaskResponseModel) => {
  const queryClient = useQueryClient();
  const taskId = z.number().parse(task.id);
  const { data: buddy } = $api.useSuspenseQuery('get', '/buddy');
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

  const editTask = useCallback(
    (
      data: z.infer<typeof taskFormSchema>,
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
      // DateTimeをサーバーが受け付ける形にフォーマット
      const dueAt = format(data.dueAt, DATETIME_DATA_FORMAT);
      const completedAt = data.completedAt
        ? format(data.completedAt, DATETIME_DATA_FORMAT)
        : undefined;

      const promise = mutateAsync(
        {
          params: { path: { taskId } },
          body: {
            ...data,
            dueAt,
            completedAt,
          },
        },
        mutateOptions
      );

      const toastPromise = toast.promise(promise, {
        loading: 'タスクを更新しています...',
        success: (res) => `「${res.title}」を更新しました！`,
        error: (err) => {
          return err.message || 'タスクの更新に失敗しました。';
        },
        ...toastOptions,
      });

      return toastPromise;
    },
    [mutateAsync, taskId]
  );

  /**
   * タスクを完了するコールバック関数を返す
   * @param TanstackQueryのmutateのoptions
   * @return taskFormSchemaのdataを受け取るコールバック
   */
  const handleCompleteTask = useCallback(() => {
    editTask(taskFormSchema.parse({ ...task, completedAt: new Date() }), {
      toastOptions: {
        loading: 'タスクを完了しています...',
        success: (res) => ({
          icon: (
            <RiveBuddy
              faceId={5}
              motionId={2}
              clothesId={buddy?.clothesId}
              hairId={buddy?.hairStyleId}
              className="bg-custom absolute top-0 left-0 hidden size-14 rounded-lg first:block" // なぜかアイコン二つになるのでfirst:blockとhidden
            />
          ),
          classNames: {
            icon: 'p-7',
          },
          message: buddy.name || 'Buddy',
          description: `「${res.title}」 を完了しました！お疲れ様！`,
        }),
      },
    });
  }, [editTask, buddy, task]);

  /**
   * タスクを未完了にするコールバック関数を返す
   * @param TanstackQueryのmutateのoptions
   * @return taskFormSchemaのdataを受け取るコールバック
   */
  const handleUnCompleteTask = useCallback(() => {
    editTask(taskFormSchema.parse({ ...task, completedAt: null }), {
      toastOptions: {
        loading: 'タスクを未完了にしています...',
        success: (res) => ({
          icon: (
            <RiveBuddy
              faceId={3}
              motionId={2}
              clothesId={buddy?.clothesId}
              hairId={buddy?.hairStyleId}
              className="bg-custom absolute top-0 left-0 hidden size-14 rounded-lg first:block"
            />
          ),
          classNames: {
            icon: 'p-7 relative',
          },
          message: buddy.name || 'Buddy',
          description: `「${res.title}」 を未完了にしました！`,
        }),
      },
    });
  }, [editTask, buddy, task]);

  return { editTask, handleCompleteTask, handleUnCompleteTask, ...rest };
};
