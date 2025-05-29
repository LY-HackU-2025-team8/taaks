import { $api } from '@/shared/api/openapi-fetch';
import { DATETIME_DATA_FORMAT } from '@/shared/constants';
import { Button } from '@/shared/ui/components/shadcn/button';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { z } from 'zod';
import type { taskFormSchema } from './task-form-schema';

/** タスクを作成する関数を返すHook */
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...rest } = $api.useMutation('post', '/tasks', {
    // なんらかのエラーが発生してもタスクが更新される場合があるのでonSettledを使用
    onSettled: (data) => {
      // タスク一覧のキャッシュを破棄
      queryClient.invalidateQueries($api.queryOptions('get', '/tasks'));
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
  const { data: buddy } = $api.useSuspenseQuery('get', '/buddy');

  /**
   * タスクを作成する関数
   * @param TanstackQueryのmutateのoptions
   * @return taskFormSchemaのdataを受け取るコールバック
   */
  const createTask = useCallback(
    (
      options?: Parameters<typeof mutateAsync>[1],
      toastOptions?: Parameters<typeof toast.promise>[1]
    ) =>
      (data: z.infer<typeof taskFormSchema>) => {
        // DateTimeをサーバーが受け付ける形式にフォーマット
        const dueAt = format(data.dueAt, DATETIME_DATA_FORMAT);
        const completedAt = data.completedAt
          ? format(data.completedAt, DATETIME_DATA_FORMAT)
          : undefined;

        return toast.promise(
          mutateAsync(
            {
              body: {
                ...data,
                dueAt,
                completedAt,
              },
            },
            options
          ),
          {
            loading: `${buddy?.name}がタスクの負荷スコアを考えています...`,
            success: (res) => {
              return {
                message: `負荷スコアは${res.loadScore}です！`,
                action: (
                  <Button size="sm" className="ml-auto" asChild>
                    <Link to="/todo/$taskId" params={{ taskId: res.id }}>
                      登録されたタスクを見る
                    </Link>
                  </Button>
                ),
              };
            },
            error: (err) => {
              return err.message || 'タスクの登録に失敗しました。';
            },
            ...toastOptions,
          }
        );
      },
    [mutateAsync, buddy?.name]
  );

  return { createTask, ...rest };
};
