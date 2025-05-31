import { createBuddyFormSchema } from '@/pages/create-buddy/api/create-buddy-form-schema';
import { $api } from '@/shared/api/openapi-fetch';
import { cn } from '@/shared/lib/utils';
import { Form } from '@/shared/ui/components/shadcn/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { z } from 'zod';
import { redirectUnlessLoggedIn } from '../api/redirect-unless-logged-in';

export const Route = createFileRoute('/create-buddy')({
  context: ({ context }) => ({
    ...context,
    htmlClassName: cn(context.htmlClassName, 'bg-background'),
  }),
  beforeLoad: async ({ context: { queryClient } }) => {
    await redirectUnlessLoggedIn(queryClient, { to: '/login' });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: buddy } = $api.useQuery('get', '/buddy');

  const form = useForm<z.infer<typeof createBuddyFormSchema>>({
    resolver: zodResolver(createBuddyFormSchema),
    defaultValues: {
      nickname: buddy?.nickname || '',
      hairStyleId: buddy?.hairStyleId || 1,
      clothesId: buddy?.clothesId || 1,
      colorId: buddy?.colorId || 1,
      name: buddy?.name || '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  return (
    <>
      <Form {...form}>
        <Outlet />
      </Form>
    </>
  );
}
