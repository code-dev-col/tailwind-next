import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'Atoms/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Item de lista básico',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-2">
      <ListItem $variant="default">Item default</ListItem>
      <ListItem $variant="primary">Item primary</ListItem>
      <ListItem $variant="secondary">Item secondary</ListItem>
      <ListItem $variant="accent">Item accent</ListItem>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-2">
      <ListItem $size="sm">Item pequeño</ListItem>
      <ListItem $size="md">Item mediano</ListItem>
      <ListItem $size="lg">Item grande</ListItem>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-2">
      <ListItem>Item normal</ListItem>
      <ListItem $clickable>Item clickeable</ListItem>
      <ListItem $active>Item activo</ListItem>
      <ListItem $clickable onClick={() => alert('Clicked!')}>
        Item con onClick
      </ListItem>
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div className="space-y-2">
      <ListItem $custom="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-l-2 border-purple-500">
        Item con gradiente sutil
      </ListItem>
      <ListItem $custom="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-l-2 border-blue-500">
        Item con gradiente azul
      </ListItem>
      <ListItem $custom="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-l-2 border-green-500">
        Item con gradiente verde
      </ListItem>
    </div>
  ),
};

