import { cn } from '@/shared/lib/utils';
import { UnstyledTextarea } from '@/shared/ui/components/input/unstyled-textarea';
import {
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/components/shadcn/form';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import type { diaryFormSchema } from '../api/diary-form-schema';

/** 日記を作成・編集するためのフォーム */
export const DiaryForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof FormItem>) => {
  const form = useFormContext<z.infer<typeof diaryFormSchema>>();

  return (
    <FormField
      control={form.control}
      name="body"
      render={({ field }) => (
        <FormItem className={cn('w-full', className)} {...props}>
          <UnstyledTextarea
            {...field}
            placeholder="今日あったことをここに記録しましょう。"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
