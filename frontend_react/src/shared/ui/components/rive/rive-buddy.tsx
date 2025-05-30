import { useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

type RiveBuddyProps = React.ComponentProps<'canvas'> & {
  /** 顔のパーツのID */
  faceId?: number;
  /** 服のパーツのID */
  clothesId?: number;
  /** 頭のパーツのID */
  hairId?: number;
  /** モーションのID */
  motionId?: number;
};

const STATE_MACHINE_NAME = 'base State Machine ';

export const RiveBuddy = ({
  faceId = 3,
  clothesId = 2,
  hairId = 1,
  motionId = 0,
  ...props
}: RiveBuddyProps) => {
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
    try {
      if (fukuParts && faceParts && headParts && motion) {
        fukuParts.value = clothesId;
        faceParts.value = faceId;
        headParts.value = hairId;
        motion.value = motionId;
      }
    } catch {
      // エラーが発生しても無視する
      // 良い子のみんなは真似しないでね！！！
      void 0;
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

  return <RiveComponent role="img" aria-label="Buddy Animation" {...props} />;
};
