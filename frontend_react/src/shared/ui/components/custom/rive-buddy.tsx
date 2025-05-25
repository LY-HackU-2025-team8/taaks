import { useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

type RiveBuddyProps = {
  /** クラス名 */
  className?: string;
  /** 顔のパーツのID */
  faceId?: number;
  /** 服のパーツのID */
  clothesId?: number;
  /** 頭のパーツのID */
  hairId?: number;
  /** モーションのID */
  motionId?: number;
};

export const RiveBuddy = ({
  className = '',
  faceId = 3,
  clothesId = 2,
  hairId = 1,
  motionId = 0,
}: RiveBuddyProps) => {
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

  useEffect(() => {
    if (fukuParts && faceParts && headParts && motion) {
      fukuParts.value = clothesId;
      faceParts.value = faceId;
      headParts.value = hairId;
      motion.value = motionId;
    }
  }, [
    rive,
    fukuParts,
    faceParts,
    headParts,
    motion,
    faceId,
    clothesId,
    hairId,
    motionId,
  ]);

  return (
    <RiveComponent
      className={className}
      role="img"
      aria-label="Buddy Animation"
    />
  );
};
