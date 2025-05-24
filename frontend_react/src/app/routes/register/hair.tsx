import { hairOptions } from '@/features/create-buddy/constants/registerOptions';
import { BuddyPreview } from '@/features/create-buddy/ui/buddy-preview';
import { ProgressBar } from '@/features/create-buddy/ui/progress-bar';
import { RegisterNavigation } from '@/features/create-buddy/ui/register-navigation';
import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from '@/shared/ui/components/shadcn/form';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/ui/components/shadcn/toggle-group';
import { useFormContext } from 'react-hook-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { registerBuddyFormSchema } from '../register';

export const Route = createFileRoute('/register/hair')({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useFormContext<z.infer<typeof registerBuddyFormSchema>>();
  const navigate = useNavigate();
  const inputName = 'hairStyle';

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isValid = await form.trigger(inputName);
    if (isValid) navigate({ to: '/register/clothes' });
  };

  return (
    <>
      <ProgressBar className="mt-4 h-12 w-full" progress={1} />
      <form
        onSubmit={handleSubmit}
        className="mb-22 flex flex-1 flex-col justify-center px-3"
      >
        <BuddyPreview
          hairId={form.watch('hairStyle') ?? 1}
          clothesId={form.watch('clothes') ?? 1}
          motionId={1}
          faceId={5}
          size="large-top"
        />

        <p className="pt-6 pb-2 text-[1.25rem] font-bold">ヘアスタイルを選択</p>

        <FormField
          control={form.control}
          name={inputName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  className="flex h-40 gap-2 overflow-x-scroll"
                  type="single"
                  {...field}
                  value={field.value ? String(field.value) : '1'}
                  onValueChange={(value) => {
                    if (value) field.onChange(Number(value));
                  }}
                >
                  {hairOptions.map((item) => (
                    <ToggleGroupItem
                      key={item.value}
                      value={item.value}
                      className="flex h-[8.625rem] w-[6.6875rem] flex-col items-center justify-center rounded-2xl border-2"
                    >
                      <item.icon className="size-18" />
                      <span className="mt-2">{item.name}</span>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <RegisterNavigation prev_path="/register/nickname" />
      </form>
    </>
  );
}
