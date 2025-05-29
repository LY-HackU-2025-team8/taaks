import { useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

type RiveCheckButtonProps = {
  /** クラス名 */
  className?: string;
  /** 表示タイプ */
  type?: 'todo' | 'buddy';
  /** 完了 */
  done?: boolean;
};

const TYPES = {
  todo: {
    artboard: 'ToDo',
    stateMachineName: 'ToDo_btn_State',
    inputName: 'ToDoinputs',
  },
  buddy: {
    artboard: 'Buddy',
    stateMachineName: 'Buddy_btn_State',
    inputName: 'Buddyinputs',
  },
} as const;

export const RiveCheckButton = ({
  className = 'size-6',
  type = 'todo',
  done = false,
}: RiveCheckButtonProps) => {
  const { rive, RiveComponent } = useRive({
    src: '/assets/animations/taaks_checkbtn.riv',
    stateMachines: TYPES[type].stateMachineName,
    artboard: TYPES[type].artboard,
    autoplay: true,
  });

  const input = useStateMachineInput(
    rive,
    TYPES[type].stateMachineName,
    TYPES[type].inputName
  );

  useEffect(() => {
    try {
      if (input) {
        input.value = Number(done);
      }
    } catch {
      // エラーの握りつぶし
      // 良い子のみんなは真似しないでね！
      void 0;
    }
  }, [input, done]);

  return (
    <RiveComponent
      className={className}
      role="img"
      aria-label="Check Button Animation"
    />
  );
};
