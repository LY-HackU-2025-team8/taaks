import {
  Fusafusa,
  Sarasara,
  Mocomoco,
  Ikeike,
  Tied,
  Elegant,
  Togetoge,
} from '@/features/create-buddy/icons/hair';
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

export const Route = createFileRoute('/register/hair')({
  component: RouteComponent,
});

// TODO: constにまとめる？
const array = [
  { value: '1', icon: <Ikeike className="size-18" />, name: 'いけいけ' },
  { value: '2', icon: <Fusafusa className="size-18" />, name: 'ふさふさ' },
  { value: '3', icon: <Tied className="size-18" />, name: '結んでる' },
  { value: '4', icon: <Sarasara className="size-18" />, name: 'さらさら' },
  { value: '5', icon: <Mocomoco className="size-18" />, name: 'もこもこ' },
  { value: '6', icon: <Togetoge className="size-18" />, name: 'とげとげ' },
  { value: '7', icon: <Elegant className="size-18" />, name: 'エレガント' },
];

function RouteComponent() {
  const form = useFormContext<z.infer<typeof registerBuddyFormSchema>>();
  const navigate = useNavigate();
  const inputName = 'hairStyle';

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isValid = await form.trigger(inputName);
    if (isValid) navigate({ to: '/register/clothes' });
  };

  return (
    <>
      <ProgressBar className="mt-4 h-12 w-full" progress={1} />
      <form
        onSubmit={handleSubmit}
        className="mb-22 flex flex-1 flex-col justify-center px-3"
      >
        <div className="flex items-center justify-center p-3.5">
          <div className="relative size-71 overflow-hidden rounded-[105px] bg-[#EAEBE7]">
            <RiveBuddy
              className="absolute -top-1 -left-12 size-95"
              motionId={1}
              hairId={form.watch('hairStyle') ?? 1}
              clothesId={form.watch('clothes') ?? 1}
            />
          </div>
        </div>
        <p className="pt-6 pb-2 text-[1.25rem] font-bold">ヘアスタイルを選択</p>

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
        <RegisterNavigation prev_path="/register/nickname" />
      </form>
    </>
  );
}
