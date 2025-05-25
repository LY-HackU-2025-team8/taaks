import { taskFormSchema } from '@/entities/task/api/task-form-schema';
import type { TaskResponseModel } from '@/entities/task/api/task-model';
import { TaskForm } from '@/entities/task/ui/task-form';
import { $api } from '@/shared/api/openapi-fetch';
import { Button } from '@/shared/ui/components/shadcn/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/shared/ui/components/shadcn/drawer';
import { Form } from '@/shared/ui/components/shadcn/form';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { z } from 'zod';

export type AddTaskDrawerProps = React.ComponentProps<typeof Drawer> & {
  /** 編集対象のタスク */
  task?: TaskResponseModel;
};

export const EditTaskDrawer = ({
  onOpenChange,
  open: propsOpen = false,
  task,
  children,
  ...props
}: AddTaskDrawerProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = $api.useMutation(
    'put',
    '/tasks/{taskId}',
    {
      onSettled: () => {
        queryClient.invalidateQueries($api.queryOptions('get', '/tasks'));
        queryClient.invalidateQueries(
          $api.queryOptions('get', '/tasks/{taskId}', {
            params: { path: { taskId: task?.id ?? 0 } },
          })
        );
      },
    }
  );
  const [open, setOpen] = useState(propsOpen);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: taskFormSchema.parse(task),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const handleSubmit = form.handleSubmit((data) => {
    const dueAt = format(new Date(data.dueAt), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    const completedAt =
      data.completedAt &&
      format(new Date(data.completedAt), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    mutate(
      {
        body: {
          ...data,
          dueAt,
          completedAt,
        },
        params: {
          path: {
            taskId: task?.id ?? 0,
          },
        },
      },
      {
        onSuccess: () => {
          form.reset();
          setOpen(false);
        },
      }
    );
  });

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      repositionInputs={false}
      autoFocus
      {...props}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <Form {...form}>
          <TaskForm onSubmit={handleSubmit}>
            {error && (
              <div className="text-destructive p-7">
                {error?.message ?? 'タスクの保存に失敗しました'}
              </div>
            )}
            <DrawerFooter className="flex-row-reverse pt-0">
              <Button className="flex-1" type="submit" disabled={isPending}>
                保存
              </Button>
              <DrawerClose asChild>
                <Button variant="secondary" className="flex-1">
                  キャンセル
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </TaskForm>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
