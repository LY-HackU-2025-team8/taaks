import { useCallback } from 'react';
import { Check, Edit, MoreHorizontal } from 'lucide-react';

/**
 * Props for the SmallCard component.
 *
 * @property {string} title - タスクのタイトル (The title of the task)
 * @property {string} deadline - タスクの締切 (The deadline of the task)
 */
export type SmallCardProps = {
  /* タスクのタイトル */
  title: string;
  /* タスクの締切 */
  deadline: string;
};

export const SmallCard = ({ title, deadline }: SmallCardProps) => {
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
      console.log('done');
    }, []);

  return (
    <div className="relative flex h-38.75 w-44.75">
      <div className="small-card-container bg-taaks-white relative z-0 flex h-38.75 w-44.75">
        <div className="z-10 p-3">
          <p className="text-taaks-subtitle pt-1 text-[12px] font-bold">
            {deadline}
          </p>
          <p className="max-w-37.85 font-noto-sans-jp line-clamp-3 pt-6 text-[15px] leading-5 font-[600]">
            {title}
          </p>
        </div>
        <button
          onClick={handleMore}
          className="absolute bottom-2.25 left-4 z-10"
        >
          <MoreHorizontal className="size-5" />
        </button>
        <button
          onClick={handleEdit}
          className="absolute right-4 bottom-2.25 z-10"
        >
          <Edit className="size-5" />
        </button>
      </div>

      {/* 右上のボタン */}
      <button
        onClick={handleDone}
        className="bg-taaks-white hover:bg-primary absolute top-0 right-0 z-10 flex h-11.25 w-13.25 items-center justify-center rounded-full"
      >
        <Check className="size-7.5" />
      </button>

      <style>
        {`
          .small-card-container {
            clip-path: path(
              "M106.504 2.5C113.365 2.5 117.826 11.4574 116.879 18.2528C116.686 19.6408 116.586 21.0587 116.586 22.5C116.586 39.3447 130.241 53 147.086 53H157.921C159.462 53 160.977 52.8856 162.457 52.6649C169.422 51.626 179 56.2234 179 63.2654V134.5C179 145.546 170.046 154.5 159 154.5H20C8.95431 154.5 3.8658e-07 145.546 0 134.5V22.5C0 11.4543 8.95431 2.5 20 2.5H106.504Z"
            );
          }
        `}
      </style>
    </div>
  );
};
