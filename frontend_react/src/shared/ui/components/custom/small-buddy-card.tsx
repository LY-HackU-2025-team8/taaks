import { TASK_CARD_SMALL_PATH } from '@/shared/constants';
import { RiveCheckButton } from '@/shared/ui/components/custom/rive-check-button';
import { useState, useCallback } from 'react';
import { MoreHorizontal } from 'lucide-react';

export type SmallCardProps = {
  /* タスクのタイトル */
  title: string;
};

/** Buddyからサジェストされたタスクが表示されるカード */
export const SmallBuddyCard = ({ title }: SmallCardProps) => {
  const [done, setDone] = useState(false);

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
    <div className="text-taaks-card relative flex h-38.75 w-44.75">
      <div
        className="bg-buddy from-buddy-blue via-buddy-green to-buddy-yellow relative z-0 flex h-38.75 w-44.75 bg-gradient-to-br"
        style={{
          clipPath: `path("${TASK_CARD_SMALL_PATH}")`,
        }}
      >
        <div className="z-1 p-3">
          <p className="pt-1 text-sm font-bold">
            <span className="block">Buddyからの</span>
            <span className="block">おすすめ</span>
          </p>
          <p className="font-noto-sans-jp line-clamp-3 max-w-38 pt-3 leading-5 font-[600]">
            {title}
          </p>
        </div>
        <button
          onClick={handleMore}
          className="absolute bottom-2.25 left-4 z-1"
        >
          <MoreHorizontal className="size-5" />
        </button>
      </div>

      {/* 右上のボタン */}
      <button onClick={handleDone}>
        <RiveCheckButton
          className="absolute top-0 right-0 h-11.25 w-13.25"
          type="buddy"
          done={done}
        />
      </button>
    </div>
  );
};
