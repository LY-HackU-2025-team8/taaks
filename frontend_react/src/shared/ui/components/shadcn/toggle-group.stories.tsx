import type { Meta, StoryObj } from '@storybook/react';
import { LucideX } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

const ToggleGroupDemo = (props: React.ComponentProps<typeof ToggleGroup>) => (
  <ToggleGroup {...props}>
    <ToggleGroupItem value="1">
      <LucideX />
    </ToggleGroupItem>
    <ToggleGroupItem value="2">2</ToggleGroupItem>
    <ToggleGroupItem value="3">3</ToggleGroupItem>
  </ToggleGroup>
);

const meta = {
  title: 'Shared/Components/Shadcn/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['single', 'multiple'],
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['default', 'outline'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'default', 'lg'],
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'single',
    defaultValue: '1',
  },
  render: (args) => <ToggleGroupDemo {...args} />,
};
