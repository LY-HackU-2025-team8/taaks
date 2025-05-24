import { cn } from '@/shared/lib/utils';
import { InlineTextarea } from '@/shared/ui/components/input/inline-textarea';
import {
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/components/shadcn/form';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

export const newDiaryFormSchema = z.object({
  title: z.string(),
  body: z.string().min(1, '本文を入力してください'),
  date: z.date(),
});

export const NewDiaryForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof FormItem>) => {
  const form = useFormContext<z.infer<typeof newDiaryFormSchema>>();

  return (
    <FormField
      control={form.control}
      name="body"
      render={({ field }) => (
        <FormItem className={cn('w-full', className)} {...props}>
          <InlineTextarea
            {...field}
            placeholder="今日あったことをここに記録しましょう。"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
