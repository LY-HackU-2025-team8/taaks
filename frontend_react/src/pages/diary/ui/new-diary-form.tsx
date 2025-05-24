import { $api } from '@/shared/api/openapi-fetch';
import { cn } from '@/shared/lib/utils';
import { InlineTextarea } from '@/shared/ui/components/input/inline-textarea';
import { Button } from '@/shared/ui/components/shadcn/button';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/components/shadcn/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { format } from 'date-fns';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string(),
  body: z.string().min(1, '本文を入力してください'),
  date: z.date(),
});

export type NewDiaryFormProps = React.ComponentPropsWithoutRef<'form'> & {
  date?: Date;
};

export const NewDiaryForm = ({
  date: propDate,
  className,
  ...props
}: NewDiaryFormProps) => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = $api.useMutation('post', '/diaries');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: '',
      date: propDate || new Date(),
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const handleSubmit = form.handleSubmit((data) => {
    mutate(
      {
        body: {
          ...data,
          date: format(data.date, 'yyyy-MM-dd'),
        },
      },
      {
        onSuccess: () => {
          form.reset();
          navigate({
            to: '/diary',
          });
        },
      }
    );
  });

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-1 flex-col', className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <InlineTextarea
                {...field}
                placeholder="今日あったことをここに記録しましょう。"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <footer className="mt-auto">
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1">
              キャンセル
            </Button>
            <Button type="submit" className="flex-1" disabled={isPending}>
              保存
            </Button>
          </div>
          {error && (
            <div className="text-destructive">
              {error.message || 'エラーが発生しました。'}
            </div>
          )}
        </footer>
      </form>
    </Form>
  );
};
