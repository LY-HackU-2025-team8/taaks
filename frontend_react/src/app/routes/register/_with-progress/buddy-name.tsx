import { colorOptions } from '@/features/create-buddy/constants/colorOptions';
import { BuddyPreview } from '@/features/create-buddy/ui/buddy-preview';
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
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { registerBuddyFormSchema } from '../../register';

export const Route = createFileRoute('/register/_with-progress/buddy-name')({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useFormContext<z.infer<typeof registerBuddyFormSchema>>();
  const navigate = useNavigate();
  const inputName = 'name';
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = $api.useMutation('put', '/buddy');

  const handleSubmit = form.handleSubmit((data) => {
    mutate(
      {
        body: data,
      },
      {
        onSuccess: () => {
          // キャッシュを無効化して最新のデータを取得
          queryClient.invalidateQueries({
            queryKey: ['get', '/buddy'],
          });

          navigate({ to: '/dashboard' });
        },
      }
    );
  });

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col justify-center px-3"
      >
        <div className="flex items-center justify-center p-3.5">
          <BuddyPreview
            motionId={2}
            faceId={6}
            hairStyleId={form.watch('hairStyleId')}
            clothesId={form.watch('clothesId')}
            color={colorOptions[Number(form.watch('colorId'))] ?? 'green'}
          />
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
                  className="w-full border-b-1 py-4"
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
