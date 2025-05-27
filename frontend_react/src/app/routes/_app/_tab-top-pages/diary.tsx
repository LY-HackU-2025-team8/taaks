import { BuddySuggestTask } from '@/pages/diary/ui/buddy-suggest-task';
import { PlusIcon } from '@/shared/ui/components/icons/plus-icon';
import { Button } from '@/shared/ui/components/shadcn/button';
import { PageHeader } from '@/shared/ui/page/page-header';
import { PageTitle } from '@/shared/ui/page/page-title';
import { PageTitleContainer } from '@/shared/ui/page/page-title-container';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top-pages/diary')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PageHeader>
        <PageTitleContainer>
          <PageTitle className="mr-auto">Diary</PageTitle>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/diary/new">
              <PlusIcon />
            </Link>
          </Button>
        </PageTitleContainer>
      </PageHeader>
      <BuddySuggestTask />
    </>
  );
}
