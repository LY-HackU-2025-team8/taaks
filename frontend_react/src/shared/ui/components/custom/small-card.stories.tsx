import type { Meta, StoryObj } from '@storybook/react';
import { SmallCard } from './small-card';

const meta: Meta<typeof SmallCard> = {
  title: 'Components/SmallCard',
  component: SmallCard,
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [
        { name: 'gray', value: '#EAEBE7'},
        { name: 'black', value: '#121403' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    deadline: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SmallCard>;

export const Todo: Story = {
  args: {
    title: 'タスクのタイトル',
    deadline: '00:00',
  },
};
