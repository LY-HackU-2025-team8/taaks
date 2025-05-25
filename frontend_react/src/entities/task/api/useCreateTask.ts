import { $api } from '@/shared/api/openapi-fetch';
import { SERVER_DATETIME_FORMAT } from '@/shared/constant';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import type { z } from 'zod';
import type { taskFormSchema } from './task-form-schema';

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = $api.useMutation('post', '/tasks', {
    onSuccess: () => {
      queryClient.invalidateQueries($api.queryOptions('get', '/tasks'));
    },
  });

  const createTask =
    (options?: Parameters<typeof mutate>[1]) =>
    (data: z.infer<typeof taskFormSchema>) => {
      const dueAt = format(data.dueAt, SERVER_DATETIME_FORMAT);
      const completedAt =
        data.completedAt && format(data.completedAt, SERVER_DATETIME_FORMAT);

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
    };

  return { createTask, ...rest };
};
