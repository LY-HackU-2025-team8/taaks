import { NewDiaryForm } from '@/pages/diary/ui/new-diary-form';
import { CloseIcon } from '@/shared/ui/components/icons/close-icon';
import { Button } from '@/shared/ui/components/shadcn/button';
import { PageHeader } from '@/shared/ui/page/page-header';
import { PageMain } from '@/shared/ui/page/page-main';
import { PageTitleContainer } from '@/shared/ui/page/page-title-container';
import { createFileRoute, Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export const Route = createFileRoute('/_app/diary/new')({
  component: RouteComponent,
});

function RouteComponent() {
  const date = new Date();

  return (
    <div className="flex h-full flex-col">
      <PageHeader>
        <PageTitleContainer>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/diary">
              <CloseIcon />
            </Link>
          </Button>
        </PageTitleContainer>
      </PageHeader>
      <PageMain className="flex flex-1 flex-col gap-7">
        <div className="flex flex-col items-start gap-2">
          <span className="block text-3xl font-bold">
            {format(date, 'M月dd日')}
          </span>
          <span className="block text-3xl font-bold">
            {format(date, 'EEEE', { locale: ja })}
          </span>
        </div>
        <NewDiaryForm />
      </PageMain>
    </div>
  );
}
