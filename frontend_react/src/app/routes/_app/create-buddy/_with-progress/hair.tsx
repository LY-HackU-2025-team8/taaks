import type { createBuddyFormSchema } from '@/pages/create-buddy/api/create-buddy-form-schema';
import { useCreateBuddyStep } from '@/pages/create-buddy/api/use-create-buddy-step';
import { CreateBuddyNavigation } from '@/pages/create-buddy/ui/create-buddy-navigation';
import { HAIR_OPTIONS } from '@/shared/constants/buddy-options';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/components/shadcn/form';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/ui/components/shadcn/toggle-group';
import { Heading } from '@/shared/ui/components/typography/heading';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_app/create-buddy/_with-progress/hair')({
  component: RouteComponent,
});

function RouteComponent() {
  const { nextStep } = useCreateBuddyStep();
  const form = useFormContext<z.infer<typeof createBuddyFormSchema>>();
  const navigate = Route.useNavigate();
  const inputName = 'hairStyleId';

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const isValid = await form.trigger(inputName);
      if (isValid) navigate({ to: nextStep.pathname });
    },
    [form, inputName, navigate, nextStep]
  );

  return (
    <form onSubmit={handleSubmit} className="contents">
      <Heading size="lg">ヘアスタイルを選択</Heading>
      <FormField
        control={form.control}
        name={inputName}
        render={({ field }) => (
          <FormItem className="mb-auto w-full overflow-x-auto py-3.5">
            <FormControl>
              <ToggleGroup
                type="single"
                variant="outline"
                value={String(field.value)}
                onValueChange={field.onChange}
              >
                {HAIR_OPTIONS.map(({ value, icon: Icon, name }) => (
                  <FormControl key={value}>
                    <ToggleGroupItem
                      value={value}
                      className="h-36 w-28 shrink-0 flex-col justify-between rounded-2xl p-3.5"
                    >
                      <Icon className="size-18" />
                      <Heading size="sm">{name}</Heading>
                    </ToggleGroupItem>
                  </FormControl>
                ))}
              </ToggleGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <CreateBuddyNavigation />
    </form>
  );
}
