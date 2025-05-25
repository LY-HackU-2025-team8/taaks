import { cn } from '@/shared/lib/utils';
import { ClockIcon } from '@/shared/ui/components/icons/clock-icon';
import { MemoPadIcon } from '@/shared/ui/components/icons/memo-pad-icon';
import { DatePicker } from '@/shared/ui/components/input/date-picker';
import { InlineTextarea } from '@/shared/ui/components/input/inline-textarea';
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
import { format } from 'date-fns';
import { z } from 'zod';
import type { taskFormSchema } from '../api/task-form-schema';

export const TaskForm = ({
  className,
  children,
  ...props
}: React.ComponentProps<'form'>) => {
  const form = useFormContext<z.infer<typeof taskFormSchema>>();

  const isAllDay = form.watch('isAllDay');

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
                <ClockIcon className="shrink-0" />
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
                <MemoPadIcon className="shrink-0" />
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
      {children}
    </form>
  );
};
