import {
  Sweatshirt,
  Hoodie,
  Cardigan,
  Suit,
  Yshirt,
  Unique,
} from '@/features/create-buddy/icons/clothes';
import { ProgressBar } from '@/features/create-buddy/ui/progress-bar';
import { RegisterNavigation } from '@/features/create-buddy/ui/register-navigation';
import { RiveBuddy } from '@/shared/ui/components/custom/rive-buddy';
import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from '@/shared/ui/components/shadcn/form';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/ui/components/shadcn/toggle-group';
import { useFormContext } from 'react-hook-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { registerBuddyFormSchema } from '../register';

export const Route = createFileRoute('/register/clothes')({
  component: RouteComponent,
});

// TODO: constにまとめる？
const array = [
  { value: '1', icon: <Sweatshirt className="size-18" />, name: 'トレーナー' },
  { value: '2', icon: <Hoodie className="size-18" />, name: 'パーカー' },
  { value: '3', icon: <Cardigan className="size-18" />, name: 'カーディガン' },
  { value: '4', icon: <Suit className="size-18" />, name: 'スーツ' },
  { value: '5', icon: <Yshirt className="size-18" />, name: 'ワイシャツ' },
  { value: '6', icon: <Unique className="size-18" />, name: 'ユニーク' },
];

function RouteComponent() {
  const form = useFormContext<z.infer<typeof registerBuddyFormSchema>>();
  const navigate = useNavigate();
  const inputName = 'clothes';

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isValid = await form.trigger(inputName);
    if (isValid) navigate({ to: '/register/color' });
  };

  return (
    <>
      <ProgressBar className="mt-4 h-12 w-full" progress={2} />
      <form
        onSubmit={handleSubmit}
        className="mb-22 flex flex-1 flex-col justify-center px-3"
      >
        <div className="flex items-center justify-center p-3.5">
          <div className="relative size-71 overflow-hidden rounded-[105px] bg-[#EAEBE7]">
            <RiveBuddy
              className="absolute -bottom-6 -left-12 size-95"
              motionId={2}
              hairId={form.watch('hairStyle') ?? 1}
              clothesId={form.watch('clothes') ?? 1}
            />
          </div>
        </div>
        <p className="pt-6 pb-2 text-[1.25rem] font-bold">服装を選択</p>

        <FormField
          control={form.control}
          name={inputName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  className="flex h-40 overflow-x-scroll gap-2"
                  type="single"
                  defaultValue="1"
                  {...field}
                  value={field.value ? String(field.value) : '1'}
                  onValueChange={(value) => {
                    field.onChange(Number(value));
                  }}
                >
                  {array.map((item) => (
                    <ToggleGroupItem
                      key={item.value}
                      value={item.value}
                      className="flex h-[8.625rem] w-[6.6875rem] flex-col items-center justify-center rounded-2xl border-2"
                    >
                      {item.icon}
                      <span className="mt-2">{item.name}</span>
                    </ToggleGroupItem>
                  ))}

                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <RegisterNavigation prev_path="/register/hair" />
      </form>
    </>
  );
}
