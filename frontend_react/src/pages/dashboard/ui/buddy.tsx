import { userQueryOptions } from '@/entities/user/api/user-query-options';
import { useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

export const Buddy = () => {
  const STATE_MACHINE_NAME = 'base State Machine ';
  const { data: user } = useQuery(userQueryOptions());

  // 時間帯に応じて挨拶を変更する
  const date = new Date();
  const hours = date.getHours();
  const greeting =
    hours < 10 ? 'おはよう' : hours < 18 ? 'こんにちは' : 'こんばんは';

  const { rive, RiveComponent } = useRive({
    src: '/animations/buddy.riv',
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  });
  const fukuParts = useStateMachineInput(rive, STATE_MACHINE_NAME, 'FukuParts');
  const faceParts = useStateMachineInput(rive, STATE_MACHINE_NAME, 'FaceParts');
  const headParts = useStateMachineInput(rive, STATE_MACHINE_NAME, 'HeadParts');

  // ランダムにパーツを変更する
  useEffect(() => {
    if (fukuParts && faceParts && headParts) {
      fukuParts.value = Math.floor(Math.random() * 6) + 1;
      faceParts.value = Math.floor(Math.random() * 4) + 1;
      headParts.value = Math.floor(Math.random() * 6) + 1;
    }
  });

  return (
    <>
      <div className="relative flex h-[338px] items-center">
        <div className="z-10 flex flex-col gap-3 p-4">
          <h2 className="text-2xl font-bold">
            {greeting}
            <br />
            {user?.name}さん！
          </h2>
          <Link to="/buddy">
            <button className="bg-primary rounded-full px-4 py-2 text-white">
              Buddyに会う
            </button>
          </Link>
        </div>
        <RiveComponent className="absolute right-0 z-0 h-[338px] w-[288px]" />
      </div>
    </>
  );
};
