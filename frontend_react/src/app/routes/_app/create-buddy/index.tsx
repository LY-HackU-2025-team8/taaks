import type { createBuddyFormSchema } from '@/pages/create-buddy/api/create-buddy-form-schema';
import { useCreateBuddyStep } from '@/pages/create-buddy/api/use-create-buddy-step';
import { CreateBuddyNavigation } from '@/pages/create-buddy/ui/create-buddy-navigation';
import { TaaksBuddyLogo } from '@/pages/create-buddy/ui/taaks-buddy-logo';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/components/shadcn/form';
import { Input } from '@/shared/ui/components/shadcn/input';
import { Heading } from '@/shared/ui/components/typography/heading';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageMain } from '@/shared/ui/layouts/page-main';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_app/create-buddy/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { nextStep } = useCreateBuddyStep();
  const form = useFormContext<z.infer<typeof createBuddyFormSchema>>();
  const navigate = Route.useNavigate();
  const inputName = 'nickname';

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const isValid = await form.trigger(inputName);
      if (isValid) navigate({ to: nextStep.pathname });
    },
    [form, inputName, navigate, nextStep]
  );

  return (
    <>
      <PageHeader>
        <PageTitleContainer>
          <TaaksBuddyLogo className="w-42.75" />
        </PageTitleContainer>
      </PageHeader>
      <PageMain>
        <form onSubmit={handleSubmit} className="contents">
          <PageSection className="flex flex-1 flex-col gap-3.5">
            <Heading size="2xl" className="mt-auto break-keep">
              まずはあなたの呼び方を
              <wbr />
              教えてください
            </Heading>
            <div className="mb-auto">
              <FormField
                control={form.control}
                name={inputName}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        variant="flushed"
                        placeholder="ユーザー"
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>5文字以内</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CreateBuddyNavigation />
          </PageSection>
        </form>
      </PageMain>
    </>
  );
}
