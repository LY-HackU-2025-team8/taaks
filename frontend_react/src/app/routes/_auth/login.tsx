import { userQueryOptions } from '@/entities/user/api/user-query-options';
import { UserSchema, type User } from '@/entities/user/model/user';
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
  name: UserSchema.shape.name,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation<
    User,
    Error,
    z.infer<typeof formSchema>
  >({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const user = {
        id: crypto.randomUUID ? crypto.randomUUID() : '', // 手元端末テスト用
        name: data.name,
      };
      localStorage.setItem('user_me', JSON.stringify(user));
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(userQueryOptions());
      navigate({
        to: '/dashboard',
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
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
        <form
          onSubmit={handleSubmit}
          className="mt-auto mb-[env(safe-area-inset-bottom)] space-y-7"
        >
          <Card>
            <CardContent>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ニックネーム</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="あなたはなんと呼ばれていますか？"
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
