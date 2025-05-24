import { PageHeader } from '@/shared/ui/page/page-header';
import { PageTitle } from '@/shared/ui/page/page-title';
import { PageTitleContainer } from '@/shared/ui/page/page-title-container';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top-pages/diary')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PageHeader>
        <PageTitleContainer>
          <PageTitle>Diary</PageTitle>
        </PageTitleContainer>
      </PageHeader>
    </>
  );
}
