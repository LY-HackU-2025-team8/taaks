import { useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

type CreateBuddyProgressBarProps = React.ComponentProps<'canvas'> & {
  step?: number;
};

export const CreateBuddyProgressBar = ({
  step = 1,
  ...props
}: CreateBuddyProgressBarProps) => {
  const STATE_MACHINE_NAME = 'FlowState';
  const INPUT_NAME = 'flow';

  const { rive, RiveComponent } = useRive({
    src: '/assets/animations/flow_nav.riv',
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
      progressInput.value = step;
    }
  }, [rive, progressInput, step]);

  return (
    <RiveComponent
      role="img"
      aria-label="Buddy Creation Progress Bar"
      {...props}
    />
  );
};
