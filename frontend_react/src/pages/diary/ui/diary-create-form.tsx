import { diaryFormSchema } from '@/entities/diary/api/diary-form-schema';
import { useCreateDiary } from '@/entities/diary/api/use-create-diary';
import { DiaryForm } from '@/entities/diary/ui/diary-form';
import { DiarySummary } from '@/pages/diary/ui/diary-summary';
import { fetchClient } from '@/shared/api/openapi-fetch';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Form } from '@/shared/ui/components/shadcn/form';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

type Props = {
  date: Date;
};

export const DiaryCreateForm = ({ date }: Props) => {
  const navigate = useNavigate();
  const { createDiary, isPending, error } = useCreateDiary();

  const form = useForm({
    resolver: zodResolver(diaryFormSchema),
    defaultValues: {
      title: '',
      body: '',
      date,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const handleSubmit = form.handleSubmit((data) =>
    createDiary(data, {
      mutateOptions: {
        onSuccess: async (res) => {
          form.reset(data);
          navigate({ to: '/diary' });
          console.log(
            await fetchClient.GET('/diaries/{id}/suggested-tasks', {
              params: { path: { id: res.id } },
            })
          );
        },
      },
    })
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="contents">
        <PageSection className="flex-1">
          <div className="flex flex-col items-start gap-2">
            <span className="block text-2xl font-bold">
              {format(date, 'M月dd日')}
            </span>
            <span className="block text-2xl font-bold">
              {format(date, 'EEEE', { locale: ja })}
            </span>
          </div>
          <DiaryForm />
        </PageSection>
        <DiarySummary date={date} />
        <PageSection asChild>
          <footer>
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" asChild>
                <Link to="/diary">キャンセル</Link>
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
        </PageSection>
      </form>
    </Form>
  );
};
