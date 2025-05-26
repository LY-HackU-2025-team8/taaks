import { $api } from '@/shared/api/openapi-fetch';
import { Button } from '@/shared/ui/components/shadcn/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/shared/ui/components/shadcn/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/components/shadcn/form';
import { Input } from '@/shared/ui/components/shadcn/input';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { LucideChevronLeft } from 'lucide-react';
import { z } from 'zod';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
});

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = $api.useMutation('post', '/login', {
    onSuccess: (data) => {
      const token = data.token;
      if (!token) return;
      localStorage.setItem('token', token);
      queryClient.invalidateQueries($api.queryOptions('get', '/users/me'));
      navigate({
        to: '/dashboard',
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const handleSubmit = useMemo(
    () => form.handleSubmit((data) => mutate({ body: data })),
    [mutate, form]
  );

  return (
    <div className="flex h-full flex-col p-7">
      <Form {...form}>
        <form className="mt-auto" onSubmit={handleSubmit}>
          <Card className="gap-5 rounded-5xl py-5">
            <CardContent className="mb-[env(safe-area-inset-bottom)] space-y-5 px-5">
              <CardTitle className="text-center">ログイン</CardTitle>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ユーザーID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ユーザーIDを入力してください"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>パスワード</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="パスワードを入力してください"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <div className="text-destructive">
                  {error?.message ?? 'ログインに失敗しました'}
                </div>
              )}
            </CardContent>
            <CardFooter className="gap-2 px-5">
              <Button size="icon-lg" className="size-14" asChild>
                <Link to="/">
                  <LucideChevronLeft />
                </Link>
              </Button>
              <Button
                size="lg"
                type="submit"
                className="h-14 flex-1"
                disabled={isPending}
              >
                ログイン
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
