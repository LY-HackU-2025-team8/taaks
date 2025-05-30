import { $api } from '@/shared/api/openapi-fetch';
import { DATETIME_DATA_FORMAT } from '@/shared/constants';
import { RiveBuddy } from '@/shared/ui/components/rive/rive-buddy';
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
      // DateTimeをサーバーが受け付ける形式にフォーマット
      const dueAt = format(data.dueAt, DATETIME_DATA_FORMAT);
      const completedAt = data.completedAt
        ? format(data.completedAt, DATETIME_DATA_FORMAT)
        : undefined;

      const promise = mutateAsync(
        {
          body: {
            ...data,
            dueAt,
            completedAt,
          },
        },
        mutateOptions
      );

      const toastPromise = toast.promise(promise, {
        loading: `${buddy?.name}がタスクの負荷スコアを考えています...`,
        success: (res) => ({
          icon: (
            <RiveBuddy
              faceId={6}
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
          description: (
            <div className="break-keep">
              「{res.title}」の
              <wbr />
              負荷スコアは
              <wbr />
              {res.loadScore}です！
            </div>
          ),
          action: (
            <Button
              size="sm"
              className="ml-auto"
              onClick={async () => toast.dismiss()}
              asChild
            >
              <Link to="/todo/$taskId" params={{ taskId: res.id }}>
                詳細
              </Link>
            </Button>
          ),
        }),
        error: (err) => {
          return err.message || 'タスクの登録に失敗しました。';
        },
        ...toastOptions,
      });

      return toastPromise;
    },
    [mutateAsync, buddy]
  );

  return { createTask, ...rest };
};
