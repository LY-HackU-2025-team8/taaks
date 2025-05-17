import { Check, Edit, MoreHorizontal } from 'lucide-react';

export type SmallCardProps = {
  title: string;
  limit: string;
};

export const SmallCard = ({ title, limit }: SmallCardProps) => {
  const BORDER_LENGTH: number = 25;
  const truncatedTitle: string =
    title.length > BORDER_LENGTH
      ? title.slice(0, BORDER_LENGTH) + '...'
      : title;

  const edit = () => {
    console.log('edit');
  };

  const more = () => {
    console.log('moreInfo');
  };

  const done = () => {
    console.log('done');
  };

  return (
    <div className="relative flex h-[155px] w-[179px]">
      {/* TODO: `bg-[#fbfbfb]` をカラーテーマ使って書き換える */}
      <div className="small-card-container relative z-0 flex h-[155px] w-[179px] bg-[#fbfbfb]">
        <div className="z-10 p-3">
          <p className="pt-1 text-[12px] font-bold text-[#909489]">{limit}</p>
          <p className="max-w-[155px] pt-6 font-[Noto_Sans_JP] text-[15px] leading-[20px] font-[600]">
            {truncatedTitle}
          </p>
        </div>
        <button
          onClick={() => {
            more();
          }}
          className="absolute bottom-[10px] left-[15px] z-10"
        >
          <MoreHorizontal size={20} />
        </button>
        <button
          onClick={() => {
            edit();
          }}
          className="absolute right-[10px] bottom-[10px] z-10"
        >
          <Edit size={20} />
        </button>
      </div>

      {/* 右上のボタン */}
      {/* TODO: `bg-[#fbfbfb]` をカラーテーマ使って書き換える */}
      <button
        onClick={() => {
          done();
        }}
        className="small-card-button hover:bg-primary absolute top-0 right-0 z-10 flex h-[45px] w-[53px] items-center justify-center rounded-full bg-[#fbfbfb]"
      >
        <Check size={30} />
      </button>

      {/* TODO: tailwindのテーマに #FBFBFB を追加 */}
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
