import { colorOptions } from '@/features/create-buddy/constants/colorOptions';
import {
  hairOptions,
  clothesOptions,
} from '@/features/create-buddy/constants/registerOptions';
// import { checkLogin } from '../api/check-login';
import { BuddyHeader } from '@/features/create-buddy/icons/buddy-header';
import { Form } from '@/shared/ui/components/shadcn/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { z } from 'zod';
import { redirectUnlessLoggedIn } from '../api/require-login';

export const Route = createFileRoute('/register')({
  beforeLoad: async ({ context: { queryClient } }) => {
    await redirectUnlessLoggedIn(queryClient, { to: '/login' });
  },
  component: RouteComponent,
});

export const registerBuddyFormSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: 'ニックネームを入力してください' })
    .max(5, {
      message: 'ニックネームは5文字以内で入力してください',
    }),
  hairStyleId: z
    .number()
    .int()
    .min(1, { message: '髪型を選択してください' })
    .max(hairOptions.length, {
      message: `髪型は${hairOptions.length}種類から選択してください`,
    }),
  clothesId: z
    .number()
    .int()
    .min(1, { message: '服装を選択してください' })
    .max(clothesOptions.length, {
      message: `服装は${clothesOptions.length}種類から選択してください`,
    }),
  colorId: z
    .number()
    .int()
    .min(1, { message: '色を選択してください' })
    .max(Object.keys(colorOptions).length, {
      message: `色は${Object.keys(colorOptions).length}種類から選択してください`,
    }),
  name: z.string().min(1, { message: 'Buddyの名前を入力してください' }).max(5, {
    message: 'Buddyの名前は5文字以内で入力してください',
  }),
});

function RouteComponent() {
  const form = useForm<z.infer<typeof registerBuddyFormSchema>>({
    resolver: zodResolver(registerBuddyFormSchema),
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
    <div className="bg-background flex min-h-screen flex-col">
      <div className="flex items-center justify-center p-3.5">
        <BuddyHeader className="w-42.75" />
      </div>
      <Form {...form}>
        <Outlet />
      </Form>
    </div>
  );
}
