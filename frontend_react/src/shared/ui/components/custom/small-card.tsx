import { CLIPING_PATH } from '@/shared/constant';
import { RiveCheckButton } from '@/shared/ui/components/custom/rive-check-button';
import { useState, useCallback } from 'react';
import { Edit, MoreHorizontal } from 'lucide-react';

export type SmallCardProps = {
  /* タスクのタイトル */
  title: string;
  /* タスクの締切 */
  deadline: string;
};

/** タスクを横並びで複数表示するためのカード */
export const SmallCard = ({ title, deadline }: SmallCardProps) => {
  const [done, setDone] = useState(false);

  const handleEdit: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      console.log('edit');
    }, []);

  const handleMore: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      console.log('more');
    }, []);

  const handleDone: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      setDone((prev) => !prev);
      console.log('done');
    }, []);

  return (
    <div className="relative flex h-38.75 w-44.75">
      <div
        className="bg-card relative z-0 flex h-38.75 w-44.75"
        style={{
          clipPath: `path("${CLIPING_PATH}")`,
        }}
      >
        <div className="z-1 p-3">
          <p className="text-muted-foreground pt-1 text-sm font-bold">
            {deadline}
          </p>
          <p className="max-w-37.85 font-noto-sans-jp line-clamp-3 pt-6 leading-5 font-[600]">
            {title}
          </p>
        </div>
        <button
          onClick={handleMore}
          className="absolute bottom-2.25 left-4 z-1"
        >
          <MoreHorizontal className="size-5" />
        </button>
        <button
          onClick={handleEdit}
          className="absolute right-4 bottom-2.25 z-1"
        >
          <Edit className="size-5" />
        </button>
      </div>

      {/* 右上のボタン */}
      <button onClick={handleDone}>
        <RiveCheckButton
          className="absolute top-0 right-0 h-11.25 w-13.25"
          type="todo"
          done={done}
        />
      </button>
    </div>
  );
};
