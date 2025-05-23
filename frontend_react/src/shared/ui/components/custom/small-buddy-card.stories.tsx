import { SmallBuddyCard } from '@/shared/ui/components/custom/small-buddy-card';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SmallBuddyCard> = {
  title: 'Components/SmallBuddyCard',
  component: SmallBuddyCard,
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [
        { name: 'gray', value: '#EAEBE7' },
        { name: 'black', value: '#121403' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SmallBuddyCard>;

export const Todo: Story = {
  args: {
    title:
      'ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト',
  },
};
