import { diaryFormSchema } from '@/entities/diary/api/diary-form-schema';
import { useCreateDiary } from '@/entities/diary/api/use-create-diary';
import { DiaryForm } from '@/entities/diary/ui/diary-form';
import { DiarySummary } from '@/pages/diary/ui/diary-summary';
import { refineDateFormat } from '@/shared/api/zod/refine-date-format';
import { DATE_DATA_FORMAT } from '@/shared/constants';
import { CloseIcon } from '@/shared/ui/components/icons/close-icon';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Form } from '@/shared/ui/components/shadcn/form';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageMain } from '@/shared/ui/layouts/page-main';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { z } from 'zod';

const newDiaryParamsSchema = z.object({
  date: z
    .string()
    .default(() => format(new Date(), DATE_DATA_FORMAT))
    .refine(refineDateFormat, {
      message: '日付は yyyy-MM-dd の形式で指定してください。',
    }),
});

export const Route = createFileRoute('/_app/diary/new')({
  validateSearch: newDiaryParamsSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { date: dateStr } = Route.useSearch();
  const { createDiary, isPending, error } = useCreateDiary();

  const form = useForm({
    resolver: zodResolver(diaryFormSchema),
    defaultValues: {
      title: '',
      body: '',
      date: new Date(dateStr),
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const handleSubmit = form.handleSubmit(
    createDiary({
      onSuccess: () => {
        form.reset();
        navigate({
          to: '/diary',
        });
      },
    })
  );

  const date = form.watch('date');

  return (
    <>
      <PageHeader>
        <PageTitleContainer>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/diary">
              <CloseIcon />
            </Link>
          </Button>
        </PageTitleContainer>
      </PageHeader>
      <PageMain className="flex-1">
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
      </PageMain>
    </>
  );
}
