import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'Atoms/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80 p-4">
      <p className="text-sm mb-4">Content above separator</p>
      <Separator />
      <p className="text-sm mt-4">Content below separator</p>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="w-80 space-y-6 p-4">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <Separator $variant="default" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Dashed</p>
        <Separator $variant="dashed" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Dotted</p>
        <Separator $variant="dotted" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Thick</p>
        <Separator $variant="thick" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Gradient</p>
        <Separator $variant="gradient" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-6 p-4">
      <div>
        <p className="text-sm font-medium mb-2">Small (0.5px)</p>
        <Separator $size="sm" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Default (1px)</p>
        <Separator $size="default" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Large (2px)</p>
        <Separator $size="lg" />
      </div>
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div className="w-80 space-y-6 p-4">
      <div>
        <p className="text-sm font-medium mb-2">Sunset Gradient</p>
        <Separator $custom="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 h-[2px]" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Ocean Gradient</p>
        <Separator $custom="bg-gradient-to-r from-blue-400 via-teal-500 to-cyan-500 h-[2px]" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Forest Gradient</p>
        <Separator $custom="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 h-[2px]" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Cosmic Gradient</p>
        <Separator $custom="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-[2px]" />
      </div>
    </div>
  ),
};

export const Orientations: Story = {
  render: () => (
    <div className="flex gap-8 p-4">
      <div className="space-y-4">
        <h3 className="font-medium">Horizontal Separators</h3>
        <div className="w-60 space-y-4">
          <p className="text-sm">Section 1</p>
          <Separator $orientation="horizontal" />
          <p className="text-sm">Section 2</p>
          <Separator $orientation="horizontal" $variant="dashed" />
          <p className="text-sm">Section 3</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Vertical Separators</h3>
        <div className="flex items-center h-20 gap-4">
          <span className="text-sm">Item 1</span>
          <Separator $orientation="vertical" />
          <span className="text-sm">Item 2</span>
          <Separator $orientation="vertical" $variant="dashed" />
          <span className="text-sm">Item 3</span>
          <Separator $orientation="vertical" $variant="thick" />
          <span className="text-sm">Item 4</span>
        </div>
      </div>
    </div>
  ),
};

export const InLayouts: Story = {
  render: () => (
    <div className="max-w-2xl space-y-8 p-4">
      {/* Header with separator */}
      <div>
        <h2 className="text-xl font-bold mb-4">Page Header</h2>
        <Separator />
        <p className="text-sm text-muted-foreground mt-4">
          This is the page content area below the header separator.
        </p>
      </div>

      {/* Card with separators */}
      <div className="border rounded-lg p-6 bg-card">
        <h3 className="font-semibold mb-2">Card Title</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Card description goes here
        </p>
        <Separator />
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Item 1</span>
            <span className="text-sm font-medium">$29.99</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Item 2</span>
            <span className="text-sm font-medium">$19.99</span>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>$49.98</span>
        </div>
      </div>

      {/* Navigation with vertical separators */}
      <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
        <a href="#" className="text-sm font-medium hover:text-primary">
          Home
        </a>
        <Separator $orientation="vertical" className="h-4" />
        <a href="#" className="text-sm font-medium hover:text-primary">
          About
        </a>
        <Separator $orientation="vertical" className="h-4" />
        <a href="#" className="text-sm font-medium hover:text-primary">
          Services
        </a>
        <Separator $orientation="vertical" className="h-4" />
        <a href="#" className="text-sm font-medium hover:text-primary">
          Contact
        </a>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="w-80 space-y-6 p-4">
      <div>
        <p className="text-sm font-medium mb-2">Animated Separator</p>
        <Separator $custom="bg-gradient-to-r from-blue-500 to-purple-500 h-[2px] animate-pulse" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Glowing Effect</p>
        <Separator $custom="bg-blue-500 h-[1px] shadow-lg shadow-blue-500/50" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Hover Effect</p>
        <Separator $custom="bg-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500 h-[2px] transition-all duration-300 cursor-pointer" />
      </div>
    </div>
  ),
};

