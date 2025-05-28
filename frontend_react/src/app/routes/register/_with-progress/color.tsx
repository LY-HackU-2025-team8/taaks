import { colorOptions } from '@/features/create-buddy/constants/colorOptions';
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
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { registerBuddyFormSchema } from '../../register';

export const Route = createFileRoute('/register/_with-progress/color')({
  component: RouteComponent,
});

function RouteComponent() {
  const [color, setColor] = useState<string>('green');
  const form = useFormContext<z.infer<typeof registerBuddyFormSchema>>();
  const navigate = useNavigate();
  const inputName = 'colorId';

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isValid = await form.trigger(inputName);
    if (isValid) navigate({ to: '/register/buddy-name' });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mb-22 flex flex-1 flex-col justify-center px-3"
      >
        <div className="flex items-center justify-center p-3.5">
          {/* {(() => {
            const selectedValue = String(form.watch(inputName) ?? '1');
            const selectedColor =
              colorOptions.find((item) => item.value === selectedValue)
                ?.color ?? 'green';
            return ( */}
          <BuddyPreview
            motionId={1}
            faceId={3}
            hairStyleId={form.watch('hairStyleId') ?? 1}
            clothesId={form.watch('clothesId') ?? 1}
            color={color}
          />
          {/* })()} */}
        </div>
        <p className="pt-6 pb-2 text-[1.25rem] font-bold">色を選択</p>

        <FormField
          control={form.control}
          name={inputName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomToggleGroup
                  className="flex h-40 gap-2 overflow-x-scroll"
                  type="single"
                  value={String(field.value || '1')}
                  onValueChange={(value) => {
                    if (value) {
                      field.onChange(Number(value));
                      setColor(colorOptions[Number(value)]);
                    }
                  }}
                >
                  {Object.entries(colorOptions).map(([value, item]) => (
                    <CustomToggleGroupItem
                      key={value}
                      value={value}
                      className="flex size-20 flex-col items-center justify-center rounded-full border-2 p-0"
                    >
                      <div
                        className="size-18 rounded-full"
                        // className={cn("size-18 rounded-full", `bg-custom-${item}$`)}
                        style={{ backgroundColor: `var(--custom-${item})` }}
                      ></div>
                    </CustomToggleGroupItem>
                  ))}
                </CustomToggleGroup>
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
