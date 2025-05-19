import { userQueryOptions } from '@/entities/user/api/user-query-options';
import { type User } from '@/entities/user/model/user';
import { Button } from '@/shared/ui/components/shadcn/button';
import {
  Card,
  CardContent,
  CardFooter,
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

const responseSchema = z.object({
  token: z.string(),
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation<
    User,
    Error,
    z.infer<typeof formSchema>
  >({
    mutationFn: async (data) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST}/login`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error( 'Login failed');
      }
      const responseData = responseSchema.parse(await response.json());
      localStorage.setItem('token', responseData.token);
      /** @Todo レスポンスからid, nameを返す */
      return {
        id: '',
        name: 'のざわな',
      };
    },
    onSuccess: (user) => {
      localStorage.setItem('user_me', JSON.stringify(user));
      queryClient.invalidateQueries(userQueryOptions());
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
    () => form.handleSubmit((data) => mutate(data)),
    [mutate, form]
  );

  return (
    <div className="flex h-full flex-col p-7">
      <Form {...form}>
        <form className="mt-auto" onSubmit={handleSubmit}>
          <Card>
            <CardContent className="mb-[env(safe-area-inset-bottom)] space-y-7">
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
            </CardContent>
            <CardFooter className="gap-4">
              <Button size="icon" className="size-10" asChild>
                <Link to="/">
                  <LucideChevronLeft />
                </Link>
              </Button>
              <Button
                size="lg"
                type="submit"
                className="flex-1"
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
