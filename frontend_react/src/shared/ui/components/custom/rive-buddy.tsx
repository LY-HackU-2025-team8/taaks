import { useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { randInt } from '@/shared/lib/random-number';

type RiveBuddyProps = {
  /** クラス名 */
  className?: string;
}

export const RiveBuddy = ({ className = "" }: RiveBuddyProps) => {
  const STATE_MACHINE_NAME = 'base State Machine ';

  const { rive, RiveComponent } = useRive({
    src: '/assets/animations/buddy.riv',
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  });
  const fukuParts = useStateMachineInput(rive, STATE_MACHINE_NAME, 'FukuParts');
  const faceParts = useStateMachineInput(rive, STATE_MACHINE_NAME, 'FaceParts');
  const headParts = useStateMachineInput(rive, STATE_MACHINE_NAME, 'HeadParts');
  const motion = useStateMachineInput(rive, STATE_MACHINE_NAME, 'motioninputs');

  // ランダムにパーツを変更する
  useEffect(() => {
    if (fukuParts && faceParts && headParts && motion) {
      fukuParts.value = randInt(1, 6);
      faceParts.value = randInt(1, 6);
      headParts.value = randInt(1, 6);
      motion.value = randInt(0, 2);
    }
  }, [rive, fukuParts, faceParts, headParts, motion]);

  return (
    <RiveComponent
      className={className}
      role="img"
      aria-label="Buddy Animation"
    />
  );
}
