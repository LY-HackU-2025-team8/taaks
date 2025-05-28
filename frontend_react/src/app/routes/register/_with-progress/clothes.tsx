import { clothesOptions } from '@/features/create-buddy/constants/registerOptions';
import { BuddyPreview } from '@/features/create-buddy/ui/buddy-preview';
import { RegisterNavigation } from '@/features/create-buddy/ui/register-navigation';
import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from '@/shared/ui/components/shadcn/form';
import {
  CustomToggleGroup,
  CustomToggleGroupItem,
} from '@/shared/ui/components/wrappers/toggle-group-wrapper';
import { useFormContext } from 'react-hook-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { registerBuddyFormSchema } from '../../register';

export const Route = createFileRoute('/register/_with-progress/clothes')({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useFormContext<z.infer<typeof registerBuddyFormSchema>>();
  const navigate = useNavigate();
  const inputName = 'clothesId';

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isValid = await form.trigger(inputName);
    if (isValid) navigate({ to: '/register/color' });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mb-22 flex flex-1 flex-col justify-center px-3"
      >
        <BuddyPreview
          size="large-bottom"
          motionId={2}
          hairStyleId={form.watch('hairStyleId')}
          clothesId={form.watch('clothesId')}
          faceId={5}
        />
        <p className="pt-6 pb-2 text-[1.25rem] font-bold">服装を選択</p>

        <FormField
          control={form.control}
          name={inputName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomToggleGroup
                  className="flex h-40 gap-2 overflow-x-scroll"
                  type="single"
                  // {...field}
                  value={field.value ? String(field.value) : '1'}
                  onValueChange={(value) => {
                    if (value) field.onChange(Number(value));
                  }}
                >
                  {clothesOptions.map(({ value, icon: Icon, name }) => (
                    <CustomToggleGroupItem
                      key={value}
                      value={value}
                      className="flex h-34.5 w-27 flex-col items-center justify-center rounded-2xl border-2"
                    >
                      <Icon className="size-18" />
                      <span className="mt-2">{name}</span>
                    </CustomToggleGroupItem>
                  ))}
                </CustomToggleGroup>
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
