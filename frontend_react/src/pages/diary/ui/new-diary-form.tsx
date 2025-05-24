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
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  body: z.string().min(1, '本文を入力してください'),
  date: z.date(),
});

export const NewDiaryForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: '',
      date: new Date(),
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  return (
    <Form {...form}>
      <form className="flex flex-1 flex-col">
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
        <footer className="mt-auto flex gap-2">
          <Button variant="secondary" className="flex-1">
            キャンセル
          </Button>
          <Button type="submit" className="flex-1">
            保存
          </Button>
        </footer>
      </form>
    </Form>
  );
};
