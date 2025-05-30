import { cn } from '@/shared/lib/utils';
import { ClockIcon } from '@/shared/ui/components/icons/clock-icon';
import { MemoPadIcon } from '@/shared/ui/components/icons/memo-pad-icon';
import { DatePicker } from '@/shared/ui/components/input/date-picker';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/components/shadcn/select';
import { Separator } from '@/shared/ui/components/shadcn/separator';
import { Slider } from '@/shared/ui/components/shadcn/slider';
import { Switch } from '@/shared/ui/components/shadcn/switch';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { z } from 'zod';
import type { taskFormSchema } from '../api/task-form-schema';

/** タスクを作成・編集するためのフォーム */
export const TaskForm = ({
  className,
  children,
  ...props
}: React.ComponentProps<'form'>) => {
  const form = useFormContext<z.infer<typeof taskFormSchema>>();

  // datepickerで使うため
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
      
        <FormField
          control={form.control}
          name="remainderAt"
          render={({ field }) => (
            <FormItem className="flex gap-4 px-7">
              {/* <FormLabel>リマインダー</FormLabel> */}
              <Select
                onValueChange={(e) => {
                  field.onChange(e === 'null' ? null : new Date(e));
                }}
              >
                <SelectTrigger className="w-[12rem]">
                  <SelectValue placeholder="リマインド時刻" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="banana">5分前</SelectItem>
                    <SelectItem value="blueberry">1時間前</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        >
        </FormField>
        
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
