import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fallback: 'CN',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Avatar fallback="JD" $variant="default" />
        <p className="text-xs mt-1">Default</p>
      </div>
      <div className="text-center">
        <Avatar fallback="JD" $variant="circle" />
        <p className="text-xs mt-1">Circle</p>
      </div>
      <div className="text-center">
        <Avatar fallback="JD" $variant="square" />
        <p className="text-xs mt-1">Square</p>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Avatar fallback="XS" $size="xs" />
        <p className="text-xs mt-1">XS</p>
      </div>
      <div className="text-center">
        <Avatar fallback="SM" $size="sm" />
        <p className="text-xs mt-1">SM</p>
      </div>
      <div className="text-center">
        <Avatar fallback="MD" $size="default" />
        <p className="text-xs mt-1">Default</p>
      </div>
      <div className="text-center">
        <Avatar fallback="LG" $size="lg" />
        <p className="text-xs mt-1">LG</p>
      </div>
      <div className="text-center">
        <Avatar fallback="XL" $size="xl" />
        <p className="text-xs mt-1">XL</p>
      </div>
      <div className="text-center">
        <Avatar fallback="2X" $size="2xl" />
        <p className="text-xs mt-1">2XL</p>
      </div>
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <div className="text-center">
        <Avatar
          fallback="SU"
          $custom="bg-gradient-to-r from-orange-400 to-red-500 text-white border-orange-300"
        />
        <p className="text-xs mt-1">Sunset</p>
      </div>
      <div className="text-center">
        <Avatar
          fallback="OC"
          $custom="bg-gradient-to-r from-blue-400 to-teal-500 text-white border-blue-300"
        />
        <p className="text-xs mt-1">Ocean</p>
      </div>
      <div className="text-center">
        <Avatar
          fallback="FO"
          $custom="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-300"
        />
        <p className="text-xs mt-1">Forest</p>
      </div>
      <div className="text-center">
        <Avatar
          fallback="CO"
          $custom="bg-gradient-to-r from-purple-400 to-pink-500 text-white border-purple-300"
        />
        <p className="text-xs mt-1">Cosmic</p>
      </div>
    </div>
  ),
};

export const WithImages: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe"
          fallback="JD"
        />
        <p className="text-xs mt-1">Valid Image</p>
      </div>
      <div className="text-center">
        <Avatar src="invalid-url.jpg" alt="Jane Smith" fallback="Jane Smith" />
        <p className="text-xs mt-1">Fallback</p>
      </div>
      <div className="text-center">
        <Avatar
          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          alt="Sarah Wilson"
          fallback="SW"
          $variant="square"
        />
        <p className="text-xs mt-1">Square Image</p>
      </div>
    </div>
  ),
};

export const UserProfiles: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-medium mb-2">Team Members</h3>
        <div className="flex gap-2">
          <Avatar fallback="John Doe" $size="sm" />
          <Avatar fallback="Jane Smith" $size="sm" />
          <Avatar fallback="Mike Johnson" $size="sm" />
          <Avatar fallback="Sarah Wilson" $size="sm" />
          <Avatar
            fallback="+5"
            $size="sm"
            $custom="bg-muted text-muted-foreground"
          />
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Status Indicators</h3>
        <div className="flex gap-4">
          <div className="relative">
            <Avatar fallback="ON" />
            <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
          </div>
          <div className="relative">
            <Avatar fallback="AW" />
            <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-yellow-500 border-2 border-background rounded-full"></div>
          </div>
          <div className="relative">
            <Avatar fallback="OF" />
            <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-gray-400 border-2 border-background rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar
        fallback="CL"
        onClick={() => alert('Avatar clicked!')}
        $custom="cursor-pointer"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        fallback="IM"
        onClick={() => alert('Image avatar clicked!')}
        $custom="cursor-pointer"
      />
      <Avatar
        fallback="GR"
        onClick={() => alert('Gradient avatar clicked!')}
        $custom="bg-gradient-to-r from-blue-400 to-purple-500 text-white cursor-pointer"
      />
    </div>
  ),
};

