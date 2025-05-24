import { RegisterNavigation } from '@/shared/ui/components/custom/register-navigation';
import { InlineInput } from '@/shared/ui/components/input/inline-input';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { FormField, FormItem, FormMessage, FormControl } from '@/shared/ui/components/shadcn/form';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { registerBuddyFormSchema } from '../register';

export const Route = createFileRoute('/register/nickname')({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useFormContext<z.infer<typeof registerBuddyFormSchema>>();
  const navigate = useNavigate();
  const inputName = 'nickname';

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isValid = await form.trigger(inputName);
    if (isValid) navigate({ to: '/register/hair' })
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col justify-center px-3">
      <p>
        <span className="block text-2xl font-bold">まずはあなたの呼び方を</span>
        <span className="block text-2xl font-bold">教えてください</span>
        <span className="block text-[0.8125rem]">5文字以内</span>
      </p>
      <div className="mt-4">
        <FormField
          control={form.control}
          name={inputName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InlineInput
                  placeholder="ユーザー"
                  className="w-full border-b-1 border-b-[##D9DCD1] py-4"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <RegisterNavigation
        prev_path="/account"
      />
    </form>
  );
}
