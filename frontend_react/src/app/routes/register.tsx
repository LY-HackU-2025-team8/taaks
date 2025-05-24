import { createFileRoute, Outlet } from '@tanstack/react-router';
import { checkLogin } from '../api/check-login';
import { useForm } from 'react-hook-form';
import { Form } from '@/shared/ui/components/shadcn/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const Route = createFileRoute('/register')({
  beforeLoad: async ({ context: { queryClient } }) =>
    checkLogin(queryClient, { onError: '/' }),
  component: RouteComponent,
});

// TODO: 最大値と最小値を定数で設定する
export const registerBuddyFormSchema = z.object({
  nickname: z.string().min(1, { message: 'ニックネームを入力してください' }),
  hairStyle: z.number().int().min(1, { message: '髪型を選択してください' }),
  clothes: z.number().int().min(1, { message: '服装を選択してください' }),
  color: z.number().int().min(1, { message: '色を選択してください' }),
  name: z.string().min(1, { message: 'Buddyの名前を入力してください' }),
});

function RouteComponent() {
  const form = useForm<z.infer<typeof registerBuddyFormSchema>>({
    resolver: zodResolver(registerBuddyFormSchema),
    defaultValues: {
      nickname: '',
      hairStyle: 1,
      clothes: 1,
      color: 1,
      name: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-center p-3.5">
        <img src="/TaaksBuddy.svg" className="w-42.75" />
      </div>
      <Form {...form}>
        <Outlet />
      </Form>
    </div>
  );
}
