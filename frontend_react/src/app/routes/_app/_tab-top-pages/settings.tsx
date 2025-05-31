import { cn } from '@/shared/lib/utils';
import { ChevronLeftIcon } from '@/shared/ui/components/icons/chevron-left';
import { ChevronRightIcon } from '@/shared/ui/components/icons/chevron-right-icon';
import { BackButton } from '@/shared/ui/components/router/back-button';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Card, CardContent } from '@/shared/ui/components/shadcn/card';
import { Heading } from '@/shared/ui/components/typography/heading';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageMain } from '@/shared/ui/layouts/page-main';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';
import { PageTitle } from '@/shared/ui/layouts/page-title';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { useCallback } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top-pages/settings')({
  context: ({ context }) => ({
    ...context,
    htmlClassName: cn(context.htmlClassName, 'bg-muted'),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const handleLogout = useCallback(() => {
    // トークンの無効化
    localStorage.removeItem('token');
    localStorage.removeItem('user_me');
    // 画面をリロード
    window.location.reload();
  }, []);

  return (
    <>
      <PageHeader>
        <PageTitleContainer className="pr-10">
          <Button variant="ghost" size="icon" asChild>
            <BackButton>
              <ChevronLeftIcon />
            </BackButton>
          </Button>
          <PageTitle className="mx-auto">Settings</PageTitle>
        </PageTitleContainer>
      </PageHeader>
      <PageMain className="flex flex-col">
        <PageSection>
          <PageSectionTitle>Buddy</PageSectionTitle>
          <div className="flex flex-1 flex-col gap-4">
            <Link className="contents" to="/create-buddy/nickname">
              <Card>
                <CardContent className="flex items-center justify-between py-4">
                  <Heading>Buddyの設定</Heading>
                  <ChevronRightIcon />
                </CardContent>
              </Card>
            </Link>
          </div>
        </PageSection>
        <PageSection>
          <PageSectionTitle>Account</PageSectionTitle>
          <div className="flex flex-1 flex-col gap-4">
            <Link className="contents" to="/">
              <Card>
                <CardContent className="flex items-center justify-between py-4">
                  <Heading>パスワード再設定</Heading>
                  <ChevronRightIcon />
                </CardContent>
              </Card>
            </Link>
            <Button size="lg" onClick={handleLogout}>
              ログアウト
            </Button>
          </div>
        </PageSection>
      </PageMain>
    </>
  );
}
