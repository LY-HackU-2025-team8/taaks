import { BuddyGreeting } from '@/features/buddy-greeting/ui/buddy-greeting';
import { DiarySuggestTasks } from '@/pages/diary/ui/diary-suggest-tasks';
import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DATA_FORMAT } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { ChevronLeftIcon } from '@/shared/ui/components/icons/chevron-left';
import { SettingsIcon } from '@/shared/ui/components/icons/settings-icon';
import { BackButton } from '@/shared/ui/components/router/back-button';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Heading } from '@/shared/ui/components/typography/heading';
import { Loading } from '@/shared/ui/layouts/loading';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageMain } from '@/shared/ui/layouts/page-main';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { Suspense, useMemo } from 'react';
import { useIsFetching } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { addDays, format } from 'date-fns';
import { z } from 'zod';

const paramsSchema = z.object({
  diaryId: z.coerce.number(),
});

export const Route = createFileRoute('/_app/diary/$diaryId/suggest-tasks')({
  params: paramsSchema,
  context: ({ context }) => ({
    ...context,
    htmlClassName: cn(context.htmlClassName, 'bg-custom'),
    appClassName: cn(context.appClassName, 'bg-muted'),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { diaryId } = Route.useParams();
  const { data: diary } = $api.useSuspenseQuery('get', '/diaries/{id}', {
    params: {
      path: {
        id: diaryId,
      },
    },
  });

  const { data: buddy } = $api.useSuspenseQuery('get', '/buddy');
  const isFetchingSuggestedTasks = useIsFetching(
    $api.queryOptions('get', '/diaries/{id}/suggested-tasks', {
      params: {
        path: {
          id: diaryId,
        },
      },
    })
  );

  const footerElement = useMemo(
    () => (
      <PageSection>
        <div className="flex gap-3.5">
          <Button variant="secondary" className="flex-1" asChild>
            <Link
              to="/diary"
              search={{
                date: format(new Date(diary?.date), DATE_DATA_FORMAT),
              }}
            >
              日記に戻る
            </Link>
          </Button>
          <Button className="flex-1" asChild>
            <Link
              to="/todo"
              search={{
                date: format(
                  addDays(new Date(diary?.date), 1),
                  DATE_DATA_FORMAT
                ),
              }}
            >
              タスク一覧を見る
            </Link>
          </Button>
        </div>
      </PageSection>
    ),
    [diary]
  );

  return (
    <>
      <PageHeader className="bg-custom text-custom-foreground rounded-b-4xl pb-8">
        <PageTitleContainer className="justify-between">
          <Button variant="ghost" size="icon" asChild>
            <BackButton>
              <ChevronLeftIcon />
            </BackButton>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings">
              <SettingsIcon />
            </Link>
          </Button>
        </PageTitleContainer>
        <BuddyGreeting buddyFaceId={isFetchingSuggestedTasks ? 4 : 6}>
          <Heading
            size="4xl"
            variant="custom"
            className="text-center break-keep"
          >
            {buddy?.nickname}さん、
            <wbr />
            今日もお疲れ様！
          </Heading>
        </BuddyGreeting>
      </PageHeader>
      <PageMain>
        <Suspense
          fallback={
            <>
              <PageSection>
                <PageSectionTitle>
                  {buddy?.name}が日記を読んでいます。
                </PageSectionTitle>
              </PageSection>
              <Loading />
              {footerElement}
            </>
          }
        >
          <DiarySuggestTasks className="flex-1" diaryId={diaryId} />
          {footerElement}
        </Suspense>
      </PageMain>
    </>
  );
}
