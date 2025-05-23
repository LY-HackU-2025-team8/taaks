import type { Meta, StoryObj } from '@storybook/react';
import { RiveIcon } from './rive-icon';

const meta: Meta<typeof RiveIcon> = {
  title: 'Components/RiveIcon',
  component: RiveIcon,
  tags: ['autodocs'],
  argTypes: {
    iconType: {
      control: 'select',
      options: ['Home', 'ToDo', 'Diary', 'Account', 'PLUS'],
    },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof RiveIcon>;

export const Default: Story = {
  args: {
    iconType: 'Home',
    className: 'size-24',
    isActive: true,
  },
};

export const HomeIcon: Story = {
  args: {
    iconType: 'Home',
    className: 'size-24',
  },
};

export const TodoIcon: Story = {
  args: {
    iconType: 'ToDo',
    className: 'size-24',
  },
};

export const DiaryIcon: Story = {
  args: {
    iconType: 'Diary',
    className: 'size-24',
  },
};

export const AccountIcon: Story = {
  args: {
    iconType: 'Account',
    className: 'size-24',
  },
};

export const PlusIcon: Story = {
  args: {
    iconType: 'PLUS',
    className: 'size-24',
  },
};
