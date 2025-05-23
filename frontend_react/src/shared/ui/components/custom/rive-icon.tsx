import { useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

const ICON_TYPES = {
  Home: {
    artboard: 'Home',
    stateMachineName: 'HomeState',
    inputName: 'home_inputs',
  },
  ToDo: {
    artboard: 'ToDo',
    stateMachineName: 'ToDoState',
    inputName: 'ToDo_inputs',
  },
  Diary: {
    artboard: 'Diary',
    stateMachineName: 'DiaryState',
    inputName: 'Diary_inputs',
  },
  Account: {
    artboard: 'Account',
    stateMachineName: 'AccountState',
    inputName: 'Account_inputs',
  },
  Plus: {
    artboard: 'PLUS',
    stateMachineName: 'PlusState',
    inputName: 'PLUS_inputs',
  },
} as const;

const ACTIVE_VALUE = 1 as const;
const INACTIVE_VALUE = 0 as const;

export type RiveIconProps = {
  /** クラス名 */
  className?: string;
  /**
   * アイコンタイプ
   * Specifies the type of icon to display. Each type corresponds to a specific animation and state machine.
   */
  iconType: keyof typeof ICON_TYPES;
  /** アイコンの状態 */
  isActive?: boolean;
};

export const RiveIcon = ({
  className = '',
  iconType,
  isActive = false,
}: RiveIconProps) => {
  const iconConfig = ICON_TYPES[iconType];

  const { rive, RiveComponent } = useRive({
    src: '/assets/animations/icon_animation.riv',
    stateMachines: [iconConfig.stateMachineName],
    autoplay: true,
    artboard: iconConfig.artboard,
  });

  const input = useStateMachineInput(
    rive,
    iconConfig.stateMachineName,
    iconConfig.inputName
  );

  useEffect(() => {
    if (input) {
      input.value = isActive ? ACTIVE_VALUE : INACTIVE_VALUE;
    }
  }, [input, isActive]);

  return (
    <RiveComponent
      className={className}
      role="img"
      aria-label={`${iconType} Animation`}
    />
  );
};
