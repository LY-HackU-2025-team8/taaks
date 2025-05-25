import { colorOptions } from '@/features/create-buddy/constants/registerOptions';
import { BuddyPreview } from '@/features/create-buddy/ui/buddy-preview';
import { ProgressBar } from '@/features/create-buddy/ui/progress-bar';
import { RegisterNavigation } from '@/features/create-buddy/ui/register-navigation';
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

export const Route = createFileRoute('/register/color')({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useFormContext<z.infer<typeof registerBuddyFormSchema>>();
  const navigate = useNavigate();
  const inputName = 'color';

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isValid = await form.trigger(inputName);
    if (isValid) navigate({ to: '/register/buddy-name' });
  };

  return (
    <>
      <ProgressBar className="mt-4 h-12 w-full" progress={3} />
      <form
        onSubmit={handleSubmit}
        className="mb-22 flex flex-1 flex-col justify-center px-3"
      >
        <div className="flex items-center justify-center p-3.5">
          {(() => {
            const selectedValue = String(form.watch(inputName) ?? '1');
            const selectedColor =
              colorOptions.find((item) => item.value === selectedValue)
                ?.color ?? '#EAEBE7';
            return (
              <BuddyPreview
                motionId={1}
                faceId={3}
                hairId={form.watch('hairStyle') ?? 1}
                clothesId={form.watch('clothes') ?? 1}
                color={selectedColor}
              />
            );
          })()}
        </div>
        <p className="pt-6 pb-2 text-[1.25rem] font-bold">色を選択</p>

        <FormField
          control={form.control}
          name={inputName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  className="flex h-40 gap-2 overflow-x-scroll"
                  type="single"
                  {...field}
                  value={field.value ? String(field.value) : '1'}
                  onValueChange={(value) => {
                    if (value) field.onChange(Number(value));
                  }}
                >
                  {colorOptions.map((item) => (
                    <ToggleGroupItem
                      key={item.value}
                      value={item.value}
                      className="flex size-20 flex-col items-center justify-center rounded-full border-2 p-0"
                    >
                      <div
                        className="size-18 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <RegisterNavigation prev_path="/register/clothes" />
      </form>
    </>
  );
}
