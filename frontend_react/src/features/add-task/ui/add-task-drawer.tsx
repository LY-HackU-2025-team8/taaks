import { DatePicker } from '@/shared/ui/components/input/date-picker';
import { InlineInput } from '@/shared/ui/components/input/inline-input';
import { Button } from '@/shared/ui/components/shadcn/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/components/shadcn/drawer';
import { Separator } from '@/shared/ui/components/shadcn/separator';
import { Switch } from '@/shared/ui/components/shadcn/switch';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/ui/components/shadcn/toggle-group';
import { useState } from 'react';
import {
  LucideBell,
  LucideClock,
  LucideNotepadText,
  LucideTag,
} from 'lucide-react';

export type AddTaskDrawerProps = {
  triggerComponent?: React.ReactNode;
};

export const AddTaskDrawer = ({ triggerComponent }: AddTaskDrawerProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAllDay, setIsAllDay] = useState(false);

  return (
    <Drawer>
      <DrawerTrigger asChild>{triggerComponent}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <InlineInput
              className="mx-2.5 my-2 w-full text-2xl"
              type="text"
              placeholder="タイトル"
            />
          </DrawerTitle>
        </DrawerHeader>
        <Separator />
        <div className="py-3">
          <div className="flex h-13 items-center px-[27px] py-4">
            <LucideClock className="mr-4 shrink-0" />
            <DatePicker date={date} onChange={setDate} />
            {!isAllDay && (
              <>
                <Separator
                  orientation="vertical"
                  className="bg-foreground mx-2.5 data-[orientation=vertical]:w-0.5"
                />
                <span className="font-bold">15:00</span>
              </>
            )}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-muted-foreground text-sm font-bold">
                終日
              </span>
              <Switch checked={isAllDay} onCheckedChange={setIsAllDay} />
            </div>
          </div>
          <div className="flex items-center gap-4 px-[27px] py-4">
            <LucideBell className="shrink-0" />

            <InlineInput
              className="w-full text-base font-bold"
              type="text"
              placeholder="5分前"
            />
          </div>
        </div>
        <Separator />
        <div className="flex gap-4 px-[27px] py-7">
          <div className="flex h-10 w-6 shrink-0 items-center">
            <LucideTag />
          </div>
          <ToggleGroup type="single" className="wrap flex items-center gap-1.5">
            <ToggleGroupItem value="work">仕事</ToggleGroupItem>
            <ToggleGroupItem value="private">プライベート</ToggleGroupItem>
            <ToggleGroupItem value="school">学校</ToggleGroupItem>
            <ToggleGroupItem value="job">就活</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <Separator />
        <div className="flex items-center gap-4 px-[27px] pt-7 pb-3">
          <LucideNotepadText className="shrink-0" />
          <InlineInput
            className="w-full text-base font-bold"
            type="text"
            placeholder="メモ"
          />
        </div>
        <DrawerFooter className="flex-row-reverse">
          <Button className="flex-1" type="submit">
            保存
          </Button>
          <DrawerClose asChild>
            <Button variant="secondary" className="flex-1">
              キャンセル
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
