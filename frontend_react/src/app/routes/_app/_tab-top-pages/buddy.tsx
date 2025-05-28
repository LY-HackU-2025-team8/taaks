import { cn } from '@/shared/lib/utils';
import { ChevronLeftIcon } from '@/shared/ui/components/icons/chevron-left';
import { SettingsIcon } from '@/shared/ui/components/icons/settings-icon';
import { BackButton } from '@/shared/ui/components/router/back-button';
import { Button } from '@/shared/ui/components/shadcn/button';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top-pages/buddy')({
  context: ({ context }) => ({
    ...context,
    htmlClassName: cn(context.htmlClassName, 'bg-custom'),
    appClassName: cn(context.appClassName, 'bg-custom'),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-custom text-custom-foreground h-full">
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
      </PageHeader>
    </div>
  );
}
