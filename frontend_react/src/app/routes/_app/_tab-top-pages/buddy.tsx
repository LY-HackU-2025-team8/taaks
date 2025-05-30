import { BuddyGreeting } from '@/features/buddy-greeting/ui/buddy-greeting';
import { BuddyMainTask } from '@/pages/buddy/buddy-main-task';
import { BuddyScore } from '@/pages/buddy/buddy-score';
import { BuddySuggestion } from '@/pages/buddy/buddy-suggestion';
import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DATA_FORMAT } from '@/shared/constants';
import { useCurrentDate } from '@/shared/hooks/use-current-date';
import { useGreeting } from '@/shared/hooks/use-greeting';
import { cn } from '@/shared/lib/utils';
import { ChevronLeftIcon } from '@/shared/ui/components/icons/chevron-left';
import { SettingsIcon } from '@/shared/ui/components/icons/settings-icon';
import { BackButton } from '@/shared/ui/components/router/back-button';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Card, CardContent } from '@/shared/ui/components/shadcn/card';
import { Heading } from '@/shared/ui/components/typography/heading';
import { Loading } from '@/shared/ui/layouts/loading';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageMain } from '@/shared/ui/layouts/page-main';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { Suspense } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { format } from 'date-fns';

export const Route = createFileRoute('/_app/_tab-top-pages/buddy')({
  context: ({ context }) => ({
    ...context,
    htmlClassName: cn(context.htmlClassName, 'bg-custom'),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { data: buddy } = $api.useSuspenseQuery('get', '/buddy');
  const { casual } = useGreeting();
  const date = useCurrentDate({ timeResolution: 'day' });
  const { data: stats } = $api.useSuspenseQuery('get', '/days/{day}', {
    params: {
      path: {
        day: format(date, DATE_DATA_FORMAT),
      },
    },
  });

  return (
    <>
      <PageHeader>
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
        <BuddyGreeting className="flex flex-col">
          <div className="flex w-full flex-row items-center gap-4">
            <div className="flex flex-1 flex-col">
              <Heading className="break-keep" size="4xl" variant="custom">
                {casual}
                <wbr />
                {buddy?.nickname}さん！
              </Heading>
              {/* FIXME: ここハードコーディングしてる */}
              <p className="text-md text-[#33362C]">
                今日は忙しい1日になりそうだね、 こまめな休憩を忘れないようにね。
              </p>
            </div>
            <Card className="bg-primary text-primary-foreground mt-auto w-24 flex-shrink-0">
              <CardContent className="flex flex-1 flex-col items-center">
                <p className="text-[13px] font-bold">タスクの数</p>
                <p className="text-primary-foreground text-[40px]">
                  {stats.taskCount}
                </p>
              </CardContent>
            </Card>
          </div>
        </BuddyGreeting>
      </PageHeader>
      <PageMain>
        <Suspense fallback={<Loading />}>
          <BuddyMainTask />
          <BuddySuggestion />
          <BuddyScore />
        </Suspense>
      </PageMain>
    </>
  );
}
