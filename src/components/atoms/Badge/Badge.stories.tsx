import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge $variant="default">Default</Badge>
      <Badge $variant="secondary">Secondary</Badge>
      <Badge $variant="destructive">Destructive</Badge>
      <Badge $variant="success">Success</Badge>
      <Badge $variant="warning">Warning</Badge>
      <Badge $variant="outline">Outline</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge $size="sm">Small</Badge>
      <Badge $size="default">Default</Badge>
      <Badge $size="lg">Large</Badge>
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <Badge $custom="bg-gradient-to-r from-orange-400 to-red-500 text-white border-transparent hover:shadow-md">
        Sunset
      </Badge>
      <Badge $custom="bg-gradient-to-r from-blue-400 to-teal-500 text-white border-transparent hover:shadow-md">
        Ocean
      </Badge>
      <Badge $custom="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-transparent hover:shadow-md">
        Forest
      </Badge>
      <Badge $custom="bg-gradient-to-r from-purple-400 to-pink-500 text-white border-transparent hover:shadow-md">
        Cosmic
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-medium mb-2">Application Status</h3>
        <div className="flex gap-2">
          <Badge $variant="success">Active</Badge>
          <Badge $variant="warning">Pending</Badge>
          <Badge $variant="destructive">Error</Badge>
          <Badge $variant="secondary">Inactive</Badge>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">User Roles</h3>
        <div className="flex gap-2">
          <Badge $variant="default">Admin</Badge>
          <Badge $variant="secondary">User</Badge>
          <Badge $variant="outline">Guest</Badge>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Priority Levels</h3>
        <div className="flex gap-2">
          <Badge $variant="destructive" $size="sm">
            High
          </Badge>
          <Badge $variant="warning" $size="sm">
            Medium
          </Badge>
          <Badge $variant="success" $size="sm">
            Low
          </Badge>
        </div>
      </div>
    </div>
  ),
};

export const WithNumbers: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <span>Notifications</span>
        <Badge $variant="destructive" $size="sm">
          5
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Messages</span>
        <Badge $variant="default" $size="sm">
          12
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Tasks</span>
        <Badge $variant="success" $size="sm">
          3
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Warnings</span>
        <Badge $variant="warning" $size="sm">
          1
        </Badge>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge $custom="cursor-pointer hover:scale-105 active:scale-95 transition-transform">
        Clickable
      </Badge>
      <Badge
        $variant="destructive"
        $custom="cursor-pointer hover:scale-105 active:scale-95 transition-transform">
        Remove
      </Badge>
      <Badge
        $variant="success"
        $custom="cursor-pointer hover:scale-105 active:scale-95 transition-transform">
        Approve
      </Badge>
    </div>
  ),
};

