import type { createBuddyFormSchema } from '@/pages/create-buddy/api/create-buddy-form-schema';
import { useCreateBuddyStep } from '@/pages/create-buddy/api/use-create-buddy-step';
import { CreateBuddyNavigation } from '@/pages/create-buddy/ui/create-buddy-navigation';
import { CUSTOM_COLORS } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
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
import { useFormContext } from 'react-hook-form';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_app/create-buddy/_with-progress/color')(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  const { nextStep } = useCreateBuddyStep();
  const form = useFormContext<z.infer<typeof createBuddyFormSchema>>();
  const navigate = Route.useNavigate();
  const inputName = 'colorId';

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isValid = await form.trigger(inputName);
    if (isValid) navigate({ to: nextStep.pathname });
  };

  return (
    <form onSubmit={handleSubmit} className="contents">
      <Heading size="lg">色を選択</Heading>
      <FormField
        control={form.control}
        name={inputName}
        render={({ field }) => (
          <FormItem className="mb-auto w-full overflow-x-auto py-3.5">
            <FormControl>
              <ToggleGroup
                className="h-36"
                type="single"
                variant="outline"
                value={String(field.value)}
                onValueChange={field.onChange}
              >
                {[...CUSTOM_COLORS].map(([value, theme]) => (
                  <FormControl key={value}>
                    <ToggleGroupItem
                      value={String(value)}
                      className="size-20 items-center justify-center rounded-full p-0"
                    >
                      <div
                        className={cn('bg-custom size-18 rounded-full', theme)}
                      />
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
