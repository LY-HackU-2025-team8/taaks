import { DiaryCreateForm } from '@/pages/diary/ui/diary-create-form';
import { DiaryEditForm } from '@/pages/diary/ui/diary-edit-form';
import { $api } from '@/shared/api/openapi-fetch';
import { refineDateFormat } from '@/shared/api/zod/refine-date-format';
import { DATE_DATA_FORMAT } from '@/shared/constants';
import { CloseIcon } from '@/shared/ui/components/icons/close-icon';
import { Button } from '@/shared/ui/components/shadcn/button';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageMain } from '@/shared/ui/layouts/page-main';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { createFileRoute, Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { z } from 'zod';

const paramsSchema = z.object({
  date: z.string().refine(refineDateFormat, {
    message: '日付は yyyy-MM-dd 形式で指定してください。',
  }),
});

export const Route = createFileRoute('/_app/diary/$date')({
  params: paramsSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { date: dateStr } = Route.useParams();
  const date = new Date(dateStr);
  const { data: diaries } = $api.useSuspenseQuery('get', '/diaries', {
    params: {
      query: {
        date_eq: format(date, DATE_DATA_FORMAT),
      },
    },
  });
  const diary = diaries?.content?.[0];

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
        {diary ? (
          <DiaryEditForm diary={diary} />
        ) : (
          <DiaryCreateForm date={date} />
        )}
      </PageMain>
    </>
  );
}
