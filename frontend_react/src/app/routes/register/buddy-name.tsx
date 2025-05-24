import { colorOptions } from '@/features/create-buddy/constants/registerOptions';
import { BuddyPreview } from '@/features/create-buddy/ui/buddy-preview';
import { ProgressBar } from '@/features/create-buddy/ui/progress-bar';
import { RegisterNavigation } from '@/features/create-buddy/ui/register-navigation';
import { $api } from '@/shared/api/openapi-fetch';
import { InlineInput } from '@/shared/ui/components/input/inline-input';
import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from '@/shared/ui/components/shadcn/form';
import { useFormContext } from 'react-hook-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { registerBuddyFormSchema } from '../register';

export const Route = createFileRoute('/register/buddy-name')({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useFormContext<z.infer<typeof registerBuddyFormSchema>>();
  const navigate = useNavigate();
  const inputName = 'name';

  const { mutate, isPending, error } = $api.useMutation('put', '/buddy');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isValid = await form.trigger(inputName);
    if (isValid) {
      const values = form.getValues();
      mutate(
        {
          body: {
            name: values.name,
            hairStyleId: values.hairStyle,
            clothesId: values.clothes,
            colorId: values.color,
            nickname: values.nickname,
          },
        },
        {
          onSuccess: () => {
            navigate({ to: '/dashboard' });
          },
          onError: (err) => {
            console.error('Error creating buddy:', err);
          },
        }
      );

      // navigate({ to: '/dashboard' });
    }
  };

  return (
    <>
      <ProgressBar className="mt-4 h-12 w-full" progress={4} />
      <form
        onSubmit={handleSubmit}
        className="mb-22 flex flex-1 flex-col justify-center px-3"
      >
        <div className="flex items-center justify-center p-3.5">
          {(() => {
            const selectedValue = String(form.watch('color') ?? '1');
            const selectedColor =
              colorOptions.find((item) => item.value === selectedValue)
                ?.color ?? '#EAEBE7';
            return (
              <BuddyPreview
                motionId={2}
                faceId={6}
                hairId={form.watch('hairStyle')}
                clothesId={form.watch('clothes')}
                color={selectedColor}
              />
            );
          })()}
        </div>
        <p className="pt-6 pb-2 text-[1.25rem] font-bold">Buddyの名前</p>

        <FormField
          control={form.control}
          name={inputName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InlineInput
                  placeholder="Buddy"
                  className="w-full border-b-1 border-b-[##D9DCD1] py-4"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <div className="text-destructive">
            {error.message || 'エラーが発生しました。'}
          </div>
        )}
        <RegisterNavigation prev_path="/register/color" disabled={isPending} />
      </form>
    </>
  );
}
