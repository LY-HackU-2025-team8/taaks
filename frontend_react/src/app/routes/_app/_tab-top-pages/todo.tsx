import { VerticalTaskList } from '@/pages/todo/vertical-task-list';
import { PageHeader } from '@/shared/ui/page/page-header';
import { PageMain } from '@/shared/ui/page/page-main';
import { PageTitle } from '@/shared/ui/page/page-title';
import { PageTitleContainer } from '@/shared/ui/page/page-title-container';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top-pages/todo')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PageHeader className="bg-custom text-custom-foreground rounded-b-[32px] pb-8">
        <PageTitleContainer>
          <PageTitle>Todo</PageTitle>
        </PageTitleContainer>
        <div className="py-3.5">
          <h3 className="text-2xl font-bold">4月</h3>
        </div>
      </PageHeader>
      <PageMain>
        <VerticalTaskList />
      </PageMain>
    </>
  );
}
