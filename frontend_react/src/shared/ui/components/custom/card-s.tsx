import { useState } from "react";
import { Check, Plus, Edit } from "lucide-react";

export type CardSProps = {
  title: string;
  limit: string;
  className?: string;
}

export function CardS({ title, limit, className }: CardSProps) {
  const [isDone, setIsDone] = useState<boolean>(false);


  const _boarder_length: number = 30;
  const _title: string = title.length > _boarder_length ? title.slice(0, _boarder_length) + '...' : title;

  const edit = () => {
    console.log("edit")
  }

  const done = () => {
    console.log("done")
  }

  return (
    <div className={className}>
      <div className="relative flex h-[155px] w-[179px]">
        <div className="z-10 p-3">
          <p className="pt-1 text-[12px] text-[#909489] font-bold">
            {limit}
          </p>
          <p className='pt-6 text-[15px] leading-[20px] max-w-[155px] font-[Noto_Sans_JP] font-[600] '>
            {_title}
          </p>
        </div>
        <div>
          <button
            onClick={() => { done(); setIsDone(!isDone) }}
            className="absolute top-0 right-0 z-10 bg-[#FBFBFB] rounded-full w-[53px] h-[45px] flex items-center justify-center"
          >
            {isDone ?  <Plus size={30} /> : <Check size={30} />}
          </button>
          <button
            onClick={() => { edit(); }}
            className="absolute bottom-[10px] right-[10px] z-10"
          >
            <Edit />
          </button>
        </div>

        <svg width="179" height="155" className="absolute top-0 left-0 z-0">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M106.504 2.5C113.365 2.5 117.826 11.4574 116.879 18.2528C116.686 19.6408 116.586 21.0587 116.586 22.5C116.586 39.3447 130.241 53 147.086 53H157.921C159.462 53 160.977 52.8856 162.457 52.6649C169.422 51.626 179 56.2234 179 63.2654V134.5C179 145.546 170.046 154.5 159 154.5H20C8.95431 154.5 3.8658e-07 145.546 0 134.5V22.5C0 11.4543 8.95431 2.5 20 2.5H106.504Z"
            fill="#FBFBFB"
          />
        </svg>
      </div>
    </div>
  );
}
