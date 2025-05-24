import { useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

type ProgressBarProps = {
  /** クラス名 */
  className?: string;
  /** 進捗の値（0〜4の整数） */
  progress?: 1 | 2 | 3 | 4;
};

export const ProgressBar = ({
  className = '',
  progress = 1,
}: ProgressBarProps) => {
  const STATE_MACHINE_NAME = 'FlowState';
  const INPUT_NAME = 'flow';

  const { rive, RiveComponent } = useRive({
    src: '/assets/animations/flownav.riv',
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  });

  const progressInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME
  );

  useEffect(() => {
    if (progressInput) {
      progressInput.value = progress;
    }
  }, [rive, progressInput, progress]);

  return (
    <RiveComponent
      className={className}
      role="img"
      aria-label="Progress Bar Animation"
    />
  );
};
