import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    $width: '200px',
    $height: '20px',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <Skeleton $variant="default" $width="200px" $height="20px" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Rounded</p>
        <Skeleton $variant="rounded" $width="200px" $height="40px" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Circular</p>
        <Skeleton $variant="circular" $size="lg" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Text</p>
        <div className="space-y-2">
          <Skeleton $variant="text" $width="100%" />
          <Skeleton $variant="text" $width="80%" />
          <Skeleton $variant="text" $width="60%" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Button</p>
        <Skeleton $variant="button" $size="default" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <p className="text-sm font-medium mb-2">Circular Sizes</p>
        <div className="flex items-center gap-4">
          <Skeleton $variant="circular" $size="xs" />
          <Skeleton $variant="circular" $size="sm" />
          <Skeleton $variant="circular" $size="default" />
          <Skeleton $variant="circular" $size="lg" />
          <Skeleton $variant="circular" $size="xl" />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Text Sizes</p>
        <div className="space-y-2">
          <Skeleton $variant="text" $size="xs" $width="200px" />
          <Skeleton $variant="text" $size="sm" $width="200px" />
          <Skeleton $variant="text" $size="default" $width="200px" />
          <Skeleton $variant="text" $size="lg" $width="200px" />
          <Skeleton $variant="text" $size="xl" $width="200px" />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Button Sizes</p>
        <div className="flex items-center gap-4">
          <Skeleton $variant="button" $size="xs" />
          <Skeleton $variant="button" $size="sm" />
          <Skeleton $variant="button" $size="default" />
          <Skeleton $variant="button" $size="lg" />
          <Skeleton $variant="button" $size="xl" />
        </div>
      </div>
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <p className="text-sm font-medium mb-2">Gradient Skeletons</p>
        <div className="space-y-4">
          <Skeleton
            $width="300px"
            $height="20px"
            $custom="bg-gradient-to-r from-orange-200 to-red-200 animate-pulse"
          />
          <Skeleton
            $width="300px"
            $height="20px"
            $custom="bg-gradient-to-r from-blue-200 to-teal-200 animate-pulse"
          />
          <Skeleton
            $width="300px"
            $height="20px"
            $custom="bg-gradient-to-r from-green-200 to-emerald-200 animate-pulse"
          />
          <Skeleton
            $width="300px"
            $height="20px"
            $custom="bg-gradient-to-r from-purple-200 to-pink-200 animate-pulse"
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Shimmer Effect</p>
        <div className="space-y-4">
          <Skeleton
            $width="300px"
            $height="40px"
            $custom="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded-lg"
          />
          <Skeleton
            $variant="circular"
            $size="lg"
            $custom="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
          />
        </div>
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-8 p-4 max-w-md">
      {/* User Profile Loading */}
      <div>
        <h3 className="font-medium mb-4">User Profile Loading</h3>
        <div className="flex items-center space-x-4">
          <Skeleton $variant="circular" $size="lg" />
          <div className="space-y-2 flex-1">
            <Skeleton $variant="text" $width="100%" />
            <Skeleton $variant="text" $width="70%" />
          </div>
        </div>
      </div>

      {/* Card Loading */}
      <div>
        <h3 className="font-medium mb-4">Card Loading</h3>
        <div className="border rounded-lg p-4 space-y-4">
          <Skeleton $width="100%" $height="120px" $variant="rounded" />
          <div className="space-y-2">
            <Skeleton $variant="text" $width="100%" />
            <Skeleton $variant="text" $width="80%" />
            <Skeleton $variant="text" $width="60%" />
          </div>
          <div className="flex gap-2 pt-2">
            <Skeleton $variant="button" $size="sm" />
            <Skeleton $variant="button" $size="sm" />
          </div>
        </div>
      </div>

      {/* List Loading */}
      <div>
        <h3 className="font-medium mb-4">List Loading</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton $variant="circular" $size="sm" />
              <div className="flex-1 space-y-1">
                <Skeleton $variant="text" $width="100%" $size="sm" />
                <Skeleton $variant="text" $width="60%" $size="xs" />
              </div>
              <Skeleton $width="60px" $height="20px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const CustomDimensions: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <p className="text-sm font-medium mb-2">Custom Widths & Heights</p>
        <div className="space-y-4">
          <Skeleton $width="100px" $height="100px" />
          <Skeleton $width="200px" $height="30px" />
          <Skeleton $width="300px" $height="15px" />
          <Skeleton $width="150px" $height="60px" $variant="rounded" />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Responsive Widths</p>
        <div className="space-y-2">
          <Skeleton $width="100%" $height="20px" />
          <Skeleton $width="75%" $height="20px" />
          <Skeleton $width="50%" $height="20px" />
          <Skeleton $width="25%" $height="20px" />
        </div>
      </div>
    </div>
  ),
};

export const AnimationControl: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <p className="text-sm font-medium mb-2">With Animation (Default)</p>
        <Skeleton $width="200px" $height="20px" $animate={true} />
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Without Animation</p>
        <Skeleton $width="200px" $height="20px" $animate={false} />
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Custom Animation</p>
        <Skeleton
          $width="200px"
          $height="20px"
          $animate={false}
          $custom="animate-bounce"
        />
      </div>
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 max-w-4xl">
      {/* Article Card */}
      <div className="border rounded-lg overflow-hidden">
        <Skeleton $width="100%" $height="150px" $animate={true} />
        <div className="p-4 space-y-3">
          <Skeleton $variant="text" $width="100%" $size="lg" />
          <div className="space-y-2">
            <Skeleton $variant="text" $width="100%" />
            <Skeleton $variant="text" $width="80%" />
            <Skeleton $variant="text" $width="60%" />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Skeleton $variant="circular" $size="xs" />
            <Skeleton $variant="text" $width="80px" $size="sm" />
            <Skeleton $variant="text" $width="60px" $size="sm" />
          </div>
        </div>
      </div>

      {/* Dashboard Widget */}
      <div className="border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton $variant="text" $width="120px" $size="lg" />
          <Skeleton $variant="circular" $size="sm" />
        </div>
        <Skeleton $width="100%" $height="80px" $variant="rounded" />
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center space-y-2">
            <Skeleton $variant="text" $width="100%" $size="xl" />
            <Skeleton $variant="text" $width="60px" $size="sm" />
          </div>
          <div className="text-center space-y-2">
            <Skeleton $variant="text" $width="100%" $size="xl" />
            <Skeleton $variant="text" $width="60px" $size="sm" />
          </div>
        </div>
      </div>
    </div>
  ),
};


