import type { createBuddyFormSchema } from '@/pages/create-buddy/api/create-buddy-form-schema';
import { CreateBuddyNavigation } from '@/pages/create-buddy/ui/create-buddy-navigation';
import { $api } from '@/shared/api/openapi-fetch';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/components/shadcn/form';
import { Input } from '@/shared/ui/components/shadcn/input';
import { Heading } from '@/shared/ui/components/typography/heading';
import { useFormContext } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { z } from 'zod';

export const Route = createFileRoute('/create-buddy/_with-progress/buddy-name')(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  const form = useFormContext<z.infer<typeof createBuddyFormSchema>>();
  const navigate = useNavigate();
  const inputName = 'name';
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = $api.useMutation('put', '/buddy');

  const handleSubmit = form.handleSubmit((data) => {
    toast.promise(
      mutateAsync(
        {
          body: data,
        },
        {
          onSuccess: () => {
            // キャッシュを無効化して最新のデータを取得
            queryClient.invalidateQueries($api.queryOptions('get', '/buddy'));
            navigate({ to: '/dashboard' });
          },
        }
      ),
      {
        loading: 'Buddyを作成しています…',
        success: (res) => {
          return `${res.name}が今日からあなたのBuddyです！`;
        },
        error: (err) => {
          return err.message || 'Buddyの名前の登録に失敗しました。';
        },
      }
    );
  });

  return (
    <form onSubmit={handleSubmit} className="contents">
      <Heading size="lg">Buddyの名前</Heading>
      <div className="mb-auto py-3.5">
        <FormField
          control={form.control}
          name={inputName}
          render={({ field }) => (
            <FormItem className="h-36">
              <FormControl>
                <Input
                  placeholder="Buddy"
                  variant="flushed"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {error && (
        <div className="text-destructive">
          {error.message || 'エラーが発生しました。'}
        </div>
      )}
      <CreateBuddyNavigation submitDisabled={isPending} />
    </form>
  );
}
