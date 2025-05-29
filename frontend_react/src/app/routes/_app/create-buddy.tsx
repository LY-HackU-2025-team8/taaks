import { createBuddyFormSchema } from '@/pages/create-buddy/api/create-buddy-form-schema';
import { cn } from '@/shared/lib/utils';
import { Form } from '@/shared/ui/components/shadcn/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_app/create-buddy')({
  context: ({ context }) => ({
    ...context,
    htmlClassName: cn(context.htmlClassName, 'bg-background'),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<z.infer<typeof createBuddyFormSchema>>({
    resolver: zodResolver(createBuddyFormSchema),
    defaultValues: {
      nickname: '',
      hairStyleId: 1,
      clothesId: 1,
      colorId: 1,
      name: '',
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
