import type { Meta, StoryObj } from '@storybook/react';
import { RiveCheckButton } from './rive-check-button';

const meta: Meta<typeof RiveCheckButton> = {
  title: 'Components/RiveCheckButton',
  component: RiveCheckButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['todo', 'buddy'],
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RiveCheckButton>;

export const Todo: Story = {
  args: {
    type: 'todo',
    className: 'size-10',
    done: false,
  },
};

export const Buddy: Story = {
  args: {
    type: 'buddy',
    className: 'size-10',
    done: false,
  },
};
