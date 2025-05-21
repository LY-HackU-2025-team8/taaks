import { $api } from '@/shared/api/openapi-fetch';
import { DatePicker } from '@/shared/ui/components/input/date-picker';
import { InlineTextarea } from '@/shared/ui/components/input/inline-textarea';
import { Button } from '@/shared/ui/components/shadcn/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/components/shadcn/drawer';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/components/shadcn/form';
import { Separator } from '@/shared/ui/components/shadcn/separator';
import { Switch } from '@/shared/ui/components/shadcn/switch';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { LucideClock, LucideNotepadText } from 'lucide-react';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  memo: z.string(),
  dueAt: z.string(),
  completedAt: z.undefined(),
  isAllDay: z.boolean(),
  loadScore: z.number(),
});

export type AddTaskDrawerProps = {
  triggerComponent?: React.ReactNode;
};

export const AddTaskDrawer = ({ triggerComponent }: AddTaskDrawerProps) => {
  const { mutate, isPending, error } = $api.useMutation('post', '/tasks');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      memo: '',
      dueAt: format(
        Number(new Date()) + 18 * 60 * 60 * 1000,
        'yyyy-MM-dd HH:mm:ss'
      ),
      completedAt: undefined,
      isAllDay: false,
      loadScore: 0,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const isAllDay = form.watch('isAllDay');

  const handleSubmit = form.handleSubmit((data) => {
    const dueAt = new Date(data.dueAt).toISOString();

    mutate({
      body: {
        ...data,
        dueAt,
      },
    });
  });

  useEffect(() => {
    form.setValue(
      'dueAt',
      isAllDay
        ? format(Number(new Date(form.getValues('dueAt'))), 'yyyy-MM-dd')
        : format(
            Number(new Date(form.getValues('dueAt'))) - 9 * 60 * 60 * 1000,
            'yyyy-MM-dd HH:mm:ss'
          )
    );
  }, [form, isAllDay]);

  return (
    <Drawer>
      <DrawerTrigger asChild>{triggerComponent}</DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form
            className="flex h-[80vh] flex-col overflow-y-auto"
            onSubmit={handleSubmit}
          >
            <DrawerHeader>
              <DrawerTitle>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <InlineTextarea
                        className="w-full text-2xl"
                        placeholder="タイトル"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </DrawerTitle>
            </DrawerHeader>
            <Separator />
            <div className="space-y-8 p-7">
              <FormField
                control={form.control}
                name="dueAt"
                render={({ field }) => (
                  <FormItem className="flex gap-4">
                    <FormLabel>
                      <LucideClock className="shrink-0" />
                    </FormLabel>
                    <DatePicker
                      className="w-full"
                      withTime={!form.watch('isAllDay')}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAllDay"
                render={({ field }) => (
                  <FormItem className="flex gap-4">
                    <FormLabel>終日</FormLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            <div className="p-7">
              <FormField
                control={form.control}
                name="memo"
                render={({ field }) => (
                  <FormItem className="flex gap-4">
                    <FormLabel>
                      <LucideNotepadText className="shrink-0" />
                    </FormLabel>
                    <InlineTextarea
                      className="w-full"
                      placeholder="メモ"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && (
              <div className="text-destructive p-7">
                {error?.message ?? 'タスクの追加に失敗しました'}
              </div>
            )}
            <DrawerFooter className="flex-row-reverse">
              <Button className="flex-1" type="submit" disabled={isPending}>
                保存
              </Button>
              <DrawerClose asChild>
                <Button variant="secondary" className="flex-1">
                  キャンセル
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
