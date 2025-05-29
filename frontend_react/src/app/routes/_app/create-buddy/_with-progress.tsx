import type { createBuddyFormSchema } from '@/pages/create-buddy/api/create-buddy-form-schema';
import { useCreateBuddyStep } from '@/pages/create-buddy/api/use-create-buddy-step';
import { CreateBuddyPreview } from '@/pages/create-buddy/ui/create-buddy-preview';
import { CreateBuddyProgressBar } from '@/pages/create-buddy/ui/create-buddy-progress-bar';
import { TaaksBuddyLogo } from '@/pages/create-buddy/ui/taaks-buddy-logo';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageMain } from '@/shared/ui/layouts/page-main';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { useFormContext } from 'react-hook-form';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import type { z } from 'zod';

export const Route = createFileRoute('/_app/create-buddy/_with-progress')({
  context: ({ context }) => ({
    ...context,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { currentStep, motionId, faceId, size } = useCreateBuddyStep();
  const form = useFormContext<z.infer<typeof createBuddyFormSchema>>();

  return (
    <>
      <PageHeader>
        <PageTitleContainer>
          <TaaksBuddyLogo />
        </PageTitleContainer>
      </PageHeader>
      <PageMain>
        <CreateBuddyProgressBar
          className="mt-4 h-12 w-full"
          step={currentStep}
        />
        <PageSection className="flex flex-1 flex-col">
          <CreateBuddyPreview
            className="mt-auto"
            hairId={Number(form.watch('hairStyleId'))}
            clothesId={Number(form.watch('clothesId'))}
            colorId={Number(form.watch('colorId'))}
            motionId={motionId}
            faceId={faceId}
            size={size}
          />
          <Outlet />
        </PageSection>
      </PageMain>
    </>
  );
}
