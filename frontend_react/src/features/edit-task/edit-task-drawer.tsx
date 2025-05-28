import { taskFormSchema } from '@/entities/task/api/task-form-schema';
import type { TaskResponseModel } from '@/entities/task/api/task-model';
import { useEditTask } from '@/entities/task/api/use-edit-task';
import { TaskForm } from '@/entities/task/ui/task-form';
import { Button } from '@/shared/ui/components/shadcn/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
  useDrawerState,
} from '@/shared/ui/components/shadcn/drawer';
import { Form } from '@/shared/ui/components/shadcn/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export type EditTaskDrawerProps = React.ComponentProps<typeof Drawer> & {
  /** 編集対象のタスク */
  task?: TaskResponseModel;
};

export const EditTaskDrawer = ({
  onOpenChange,
  open,
  task,
  children,
  ...props
}: EditTaskDrawerProps) => {
  const { editTask, isPending, error } = useEditTask(
    z.number().parse(task?.id)
  );
  const drawerState = useDrawerState({
    open,
    onOpenChange,
  });

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: taskFormSchema.parse(task),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  // FormのSubmit時にタスクを編集する
  const handleSubmit = form.handleSubmit(
    editTask({
      onSuccess: () => {
        // タスクの編集に成功したらフォームをリセットし、Drawerを閉じる
        form.reset();
        drawerState.onOpenChange(false);
      },
    })
  );

  return (
    <Drawer repositionInputs={false} autoFocus {...drawerState} {...props}>
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
