import { SmallBuddyCard } from '@/shared/ui/components/custom/small-buddy-card';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SmallBuddyCard> = {
  title: 'Components/SmallBuddyCard',
  component: SmallBuddyCard,
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
