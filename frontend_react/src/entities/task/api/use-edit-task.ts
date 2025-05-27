import { $api } from '@/shared/api/openapi-fetch';
import { SERVER_POST_DATETIME_FORMAT } from '@/shared/constant';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { z } from 'zod';
import type { taskFormSchema } from './task-form-schema';

export const useEditTask = (taskId: number) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = $api.useMutation('put', '/tasks/{taskId}', {
    onSettled: () => {
      queryClient.invalidateQueries($api.queryOptions('get', '/tasks'));
      queryClient.invalidateQueries(
        $api.queryOptions('get', '/tasks/{taskId}', {
          params: { path: { taskId } },
        })
      );
    },
  });

  const editTask = useCallback(
    (options?: Parameters<typeof mutate>[1]) =>
      (data: z.infer<typeof taskFormSchema>) => {
        const dueAt = format(data.dueAt, SERVER_POST_DATETIME_FORMAT);
        const completedAt = data.completedAt
          ? format(data.completedAt, SERVER_POST_DATETIME_FORMAT)
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
