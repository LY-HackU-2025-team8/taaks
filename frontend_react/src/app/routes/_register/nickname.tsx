import { RegisterNavigation } from '@/shared/ui/components/custom/register-navigation';
import { InlineInput } from '@/shared/ui/components/input/inline-input';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_register/nickname')({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-3">
      <p>
        <span className="block text-2xl font-bold">まずはあなたの呼び方を</span>
        <span className="block text-2xl font-bold">教えてください</span>
        <span className="block text-[0.8125rem]">5文字以内</span>
      </p>
      <div className="mt-4">
        <InlineInput
          name="nickname"
          placeholder="ユーザー"
          className="w-full border-b-1 border-b-[##D9DCD1] py-4"
          autoFocus
        />
      </div>
      <RegisterNavigation
        next_path="/hair"
        prev_path="/account"
        disabledNext={false}
        onClickNext={handleSubmit}
      />
    </div>
  );
}
