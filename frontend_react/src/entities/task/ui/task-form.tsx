import { cn } from '@/shared/lib/utils';
import { ClockIcon } from '@/shared/ui/components/icons/clock-icon';
import { MemoPadIcon } from '@/shared/ui/components/icons/memo-pad-icon';
import { DatePicker } from '@/shared/ui/components/input/date-picker';
import { TimePicker } from '@/shared/ui/components/input/time-picker';
import { UnstyledTextarea } from '@/shared/ui/components/input/unstyled-textarea';
import {
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui/components/shadcn/drawer';
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/components/shadcn/form';
import { Separator } from '@/shared/ui/components/shadcn/separator';
import { Slider } from '@/shared/ui/components/shadcn/slider';
import { Switch } from '@/shared/ui/components/shadcn/switch';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import type { taskFormSchema } from '../api/task-form-schema';

/** タスクを作成・編集するためのフォーム */
export const TaskForm = ({
  className,
  children,
  ...props
}: React.ComponentProps<'form'>) => {
  const form = useFormContext<z.infer<typeof taskFormSchema>>();

  return (
    <form
      className={cn('overflow-y-auto overscroll-y-contain', className)}
      {...props}
    >
      <DrawerHeader>
        <DrawerTitle>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <UnstyledTextarea
                  className="w-full text-xl"
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
                <ClockIcon className="shrink-0" />
              </FormLabel>
              <div className="flex">
                <DatePicker {...field} />
                <TimePicker {...field} />
              </div>
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
              <Switch checked={field.value} onCheckedChange={field.onChange} />
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
                  // -1 is for auto calculation
                  if (value[0] === -1) {
                    form.setValue('autoCalculateLoadScore', true);
                  } else {
                    form.setValue('autoCalculateLoadScore', false);
                  }
                }}
                min={-1}
                max={10}
                step={1}
              />
              <FormDescription className="w-8 text-center">
                {field.value === -1 ? '自動' : field.value}
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
                <MemoPadIcon className="shrink-0" />
              </FormLabel>
              <UnstyledTextarea
                className="w-full"
                placeholder="メモ"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {children}
    </form>
  );
};
