import { useState, useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export type RiveIconProps = {
  /** クラス名 */
  className?: string;
  /**
   * アイコンタイプ
   * Specifies the type of icon to display. Each type corresponds to a specific animation and state machine.
   */
  iconType: 'Home' | 'ToDo' | 'Diary' | 'Account' | 'PLUS';
  /** アイコンの状態 */
  isActive?: boolean;
};

const ICON_TYPES = {
  Home: { stateMachineName: 'HomeState', inputName: 'home_inputs' },
  ToDo: { stateMachineName: 'ToDoState', inputName: 'ToDo_inputs' },
  Diary: { stateMachineName: 'DiaryState', inputName: 'Diary_inputs' },
  Account: { stateMachineName: 'AccountState', inputName: 'Account_inputs' },
  PLUS: { stateMachineName: 'PlusState', inputName: 'PLUS_inputs' },
} as const;

const ACTIVE_VALUE = 1;
const INACTIVE_VALUE = 0;

export const RiveIcon = ({
  className = '',
  iconType,
  isActive = false,
}: RiveIconProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(isActive);

  useEffect(() => {
    setIsClicked(isActive);
  }, [isActive]);

  const iconConfig = ICON_TYPES[iconType];

  const { rive, RiveComponent } = useRive({
    src: '/assets/animations/icon_animation.riv',
    stateMachines: iconConfig.stateMachineName,
    autoplay: true,
    artboard: iconType,
  });

  const input = useStateMachineInput(
    rive,
    iconConfig.stateMachineName,
    iconConfig.inputName
  );

  // 状態変更時にアニメーションの入力値を更新
  useEffect(() => {
    if (input) {
      input.value = isClicked ? ACTIVE_VALUE : INACTIVE_VALUE;
    }
  }, [isClicked, input]);

  return (
    <RiveComponent
      className={className}
      role="img"
      aria-label={`${iconType} Animation`}
    />
  );
};
