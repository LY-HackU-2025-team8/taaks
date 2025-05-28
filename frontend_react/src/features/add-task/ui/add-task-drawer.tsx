import { taskFormSchema } from '@/entities/task/api/task-form-schema';
import { useCreateTask } from '@/entities/task/api/use-create-task';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type AddTaskDrawerProps = React.ComponentProps<typeof Drawer>;

/**
 * タスクを追加するドロワー
 * @param children ドロワーのトリガーとなる要素
 */
export const AddTaskDrawer = ({
  onOpenChange,
  open,
  children,
  ...props
}: AddTaskDrawerProps) => {
  const { createTask, isPending, error } = useCreateTask();
  const drawerState = useDrawerState({
    open,
    onOpenChange,
  });

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      memo: '',
      dueAt: new Date(),
      completedAt: undefined,
      isAllDay: false,
      loadScore: 0,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  // FormのSubmit時にタスクを作成する
  const handleSubmit = form.handleSubmit(
    createTask({
      onSuccess: () => {
        // タスクの作成に成功したらフォームをリセットし、Drawerを閉じる
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
