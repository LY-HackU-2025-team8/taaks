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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/components/shadcn/form';
import { Separator } from '@/shared/ui/components/shadcn/separator';
import { Slider } from '@/shared/ui/components/shadcn/slider';
import { Switch } from '@/shared/ui/components/shadcn/switch';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { LucideClock, LucideNotepadText } from 'lucide-react';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  memo: z.string(),
  dueAt: z.date(),
  completedAt: z.undefined(),
  isAllDay: z.boolean(),
  loadScore: z.number(),
});

export type AddTaskDrawerProps = {
  /** drawerの開閉状態が変更された時に呼び出されるコールバック関数 */
  onOpenChange?: (open: boolean) => void;
  /** drawerの開閉状態を示すフラグ */
  open?: boolean;
  triggerComponent?: React.ReactNode;
};

export const AddTaskDrawer = ({
  onOpenChange,
  open: propsOpen = false,
  triggerComponent,
}: AddTaskDrawerProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = $api.useMutation('post', '/tasks', {
    onSettled: () => {
      queryClient.invalidateQueries($api.queryOptions('get', '/tasks'));
    },
  });
  const [open, setOpen] = useState(propsOpen);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const isAllDay = form.watch('isAllDay');

  const handleSubmit = form.handleSubmit((data) => {
    const dueAt = format(new Date(data.dueAt), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    mutate(
      {
        body: {
          ...data,
          dueAt,
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
    >
      <DrawerTrigger asChild>{triggerComponent}</DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="overflow-y-auto overscroll-y-contain"
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
                        disableLineBreaks
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </DrawerTitle>
            </DrawerHeader>
            <Separator />
            <div className="space-y-8 overflow-y-auto py-7">
              <FormField
                control={form.control}
                name="dueAt"
                render={({ field }) => (
                  <FormItem className="flex gap-4 px-7">
                    <FormLabel>
                      <LucideClock className="shrink-0" />
                    </FormLabel>
                    <DatePicker
                      className="w-full"
                      withTime={!isAllDay}
                      onChange={(e) => {
                        field.onChange(new Date(e.target.value));
                      }}
                      value={format(
                        field.value,
                        isAllDay ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss'
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAllDay"
                render={({ field }) => (
                  <FormItem className="flex gap-4 px-7">
                    <FormLabel>終日</FormLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="loadScore"
                render={({ field }) => (
                  <FormItem className="flex gap-4 px-7">
                    <FormLabel className="shrink-0">負荷スコア</FormLabel>
                    <Slider
                      className="flex-1"
                      value={[field.value]}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                      }}
                      min={0}
                      max={10}
                      step={1}
                    />
                    <FormDescription className="w-3 text-center">
                      {field.value}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="memo"
                render={({ field }) => (
                  <FormItem className="flex gap-4 px-7">
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
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
