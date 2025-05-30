import { BuddyGreeting } from '@/features/buddy-greeting/ui/buddy-greeting';
import { $api } from '@/shared/api/openapi-fetch';
import { cn } from '@/shared/lib/utils';
import { ChevronLeftIcon } from '@/shared/ui/components/icons/chevron-left';
import { SettingsIcon } from '@/shared/ui/components/icons/settings-icon';
import { BackButton } from '@/shared/ui/components/router/back-button';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Heading } from '@/shared/ui/components/typography/heading';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageMain } from '@/shared/ui/layouts/page-main';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top-pages/buddy')({
  context: ({ context }) => ({
    ...context,
    htmlClassName: cn(context.htmlClassName, 'bg-custom'),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { data: buddy } = $api.useSuspenseQuery('get', '/buddy');

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
        <BuddyGreeting>
          <Heading className="break-keep" size="4xl" variant="custom">
            おはよう
            <wbr />
            {buddy?.nickname}さん！
          </Heading>
        </BuddyGreeting>
      </PageHeader>
      <PageMain>
        <PageSection></PageSection>
      </PageMain>
    </>
  );
}
