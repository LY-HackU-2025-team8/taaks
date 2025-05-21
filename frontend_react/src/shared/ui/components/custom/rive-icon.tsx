import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useState } from 'react';

export type RiveIconProps = {
  /** クラス名 */
  className?: string;
  /** アイコンタイプ */
  iconType: "Home" | "ToDo" | "Diary" | "Account" | "PLUS";
  /** アイコンの状態 */
  isActive?: boolean;
}

export const RiveIcon = ({ className = '', iconType, isActive = false }: RiveIconProps) => {
  const [isClick, setIsClick] = useState<boolean>(isActive);

  const ICON_TYPES = {
    Home: {stateMachineName: 'HomeState', inputName: 'home_inputs'},
    ToDo: {stateMachineName: 'ToDoState', inputName: 'ToDo_inputs'},
    Diary: {stateMachineName: 'DiaryState', inputName: 'Diary_inputs'},
    Account: {stateMachineName: 'AccountState', inputName: 'Account_inputs'},
    PLUS: {stateMachineName: 'PlusState', inputName: 'PLUS_inputs'},
  }

  const { rive, RiveComponent } = useRive({
    src: '/assets/animations/icon_animation.riv',
    stateMachines: ICON_TYPES[iconType].stateMachineName,
    autoplay: true,
    artboard: iconType,
  })

  const input = useStateMachineInput(
    rive, 
    ICON_TYPES[iconType].stateMachineName, 
    ICON_TYPES[iconType].inputName
  );

  const onClick = () => {
    if (input) {
      input.value = isClick ? 0 : 1;
      setIsClick(!isClick);
    }
  }

  return (
    <button
      onClick={onClick}
    >
      <RiveComponent
        className={className}
        role="img"
        aria-label={`${iconType} Animation`}
      />
    </button>
  );
};
