import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { useAvatarExamples } from '../../../../stores/avatarExamples.store';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar
      $store={useAvatarExamples}
      storeKey="defaultExample"
      fallback="John Doe"
    />
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <div className="text-center">
        <Avatar
          $colorScheme="default"
          $store={useAvatarExamples}
          storeKey="defaultExample"
          fallback="DF"
        />
        <p className="text-xs mt-1">Default</p>
      </div>
      <div className="text-center">
        <Avatar $colorScheme="primary" fallback="PR" />
        <p className="text-xs mt-1">Primary</p>
      </div>
      <div className="text-center">
        <Avatar
          $colorScheme="secondary"
          $store={useAvatarExamples}
          storeKey="secondaryExample"
          fallback="SC"
        />
        <p className="text-xs mt-1">Secondary</p>
      </div>
      <div className="text-center">
        <Avatar
          $colorScheme="destructive"
          $store={useAvatarExamples}
          storeKey="destructiveExample"
          fallback="ER"
        />
        <p className="text-xs mt-1">Destructive</p>
      </div>
      <div className="text-center">
        <Avatar
          $colorScheme="accent"
          $store={useAvatarExamples}
          storeKey="accentExample"
          fallback="AC"
        />
        <p className="text-xs mt-1">Accent</p>
      </div>
      <div className="text-center">
        <Avatar
          $colorScheme="muted"
          $store={useAvatarExamples}
          storeKey="mutedExample"
          fallback="MT"
        />
        <p className="text-xs mt-1">Muted</p>
      </div>
      <div className="text-center">
        <Avatar
          $colorScheme="minimal"
          $store={useAvatarExamples}
          storeKey="minimalExample"
          fallback="MN"
        />
        <p className="text-xs mt-1">Minimal</p>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Avatar fallback="DF" $variant="default" $colorScheme="primary" />
        <p className="text-xs mt-1">Default</p>
      </div>
      <div className="text-center">
        <Avatar fallback="CR" $variant="circle" $colorScheme="accent" />
        <p className="text-xs mt-1">Circle</p>
      </div>
      <div className="text-center">
        <Avatar fallback="SQ" $variant="square" $colorScheme="destructive" />
        <p className="text-xs mt-1">Square</p>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Avatar
          $store={useAvatarExamples}
          storeKey="sizeExample"
          fallback="XS"
          $size="xs"
          $colorScheme="secondary"
        />
        <p className="text-xs mt-1">XS</p>
      </div>
      <div className="text-center">
        <Avatar
          $store={useAvatarExamples}
          storeKey="sizeExample"
          fallback="SM"
          $size="sm"
          $colorScheme="accent"
        />
        <p className="text-xs mt-1">SM</p>
      </div>
      <div className="text-center">
        <Avatar
          $store={useAvatarExamples}
          storeKey="sizeExample"
          fallback="MD"
          $size="default"
          $colorScheme="primary"
        />
        <p className="text-xs mt-1">Default</p>
      </div>
      <div className="text-center">
        <Avatar
          $store={useAvatarExamples}
          storeKey="sizeExample"
          fallback="LG"
          $size="lg"
          $colorScheme="destructive"
        />
        <p className="text-xs mt-1">LG</p>
      </div>
      <div className="text-center">
        <Avatar
          $store={useAvatarExamples}
          storeKey="sizeExample"
          fallback="XL"
          $size="xl"
          $colorScheme="muted"
        />
        <p className="text-xs mt-1">XL</p>
      </div>
      <div className="text-center">
        <Avatar
          $store={useAvatarExamples}
          storeKey="sizeExample"
          fallback="2X"
          $size="2xl"
          $colorScheme="minimal"
        />
        <p className="text-xs mt-1">2XL</p>
      </div>
    </div>
  ),
};

export const WithImages: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Avatar
          $store={useAvatarExamples}
          storeKey="imageExample"
          alt="John Doe"
          fallback="JD"
          $colorScheme="secondary"
        />
        <p className="text-xs mt-1">Valid Image</p>
      </div>
      <div className="text-center">
        <Avatar
          src="invalid-url.jpg"
          alt="Jane Smith"
          $store={useAvatarExamples}
          storeKey="textExample"
          $colorScheme="accent"
        />
        <p className="text-xs mt-1">Fallback Text</p>
      </div>
      <div className="text-center">
        <Avatar
          $store={useAvatarExamples}
          storeKey="emailExample"
          $variant="square"
          $colorScheme="muted"
        />
        <p className="text-xs mt-1">Email to Initials</p>
      </div>
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Status con diferentes colores */}
      <div>
        <h4 className="font-medium mb-3 text-foreground">Status Indicators</h4>
        <div className="flex gap-6 items-center">
          <div className="text-center">
            <Avatar
              $store={useAvatarExamples}
              storeKey="statusExample"
              fallback="ON"
              $status="online"
              $statusPosition="bottom-right"
              $colorScheme="secondary"
            />
            <p className="text-xs mt-1">Online</p>
          </div>
          <div className="text-center">
            <Avatar
              fallback="AW"
              $status="away"
              $statusPosition="bottom-right"
              $colorScheme="accent"
            />
            <p className="text-xs mt-1">Away</p>
          </div>
          <div className="text-center">
            <Avatar
              fallback="BS"
              $status="busy"
              $statusPosition="bottom-right"
              $colorScheme="destructive"
            />
            <p className="text-xs mt-1">Busy</p>
          </div>
          <div className="text-center">
            <Avatar
              fallback="OF"
              $status="offline"
              $statusPosition="bottom-right"
              $colorScheme="muted"
            />
            <p className="text-xs mt-1">Offline</p>
          </div>
        </div>
      </div>

      {/* Diferentes posiciones de status */}
      <div>
        <h4 className="font-medium mb-3 text-foreground">Status Positions</h4>
        <div className="flex gap-6 items-center">
          <div className="text-center">
            <Avatar
              fallback="TR"
              $status="online"
              $statusPosition="top-right"
              $colorScheme="secondary"
            />
            <p className="text-xs mt-1">Top Right</p>
          </div>
          <div className="text-center">
            <Avatar
              fallback="TL"
              $status="away"
              $statusPosition="top-left"
              $colorScheme="accent"
            />
            <p className="text-xs mt-1">Top Left</p>
          </div>
          <div className="text-center">
            <Avatar
              fallback="BR"
              $status="busy"
              $statusPosition="bottom-right"
              $colorScheme="destructive"
            />
            <p className="text-xs mt-1">Bottom Right</p>
          </div>
          <div className="text-center">
            <Avatar
              fallback="BL"
              $status="offline"
              $statusPosition="bottom-left"
              $colorScheme="muted"
            />
            <p className="text-xs mt-1">Bottom Left</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const StatusSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground">
        Status Indicators - All Sizes
      </h4>
      <div className="flex gap-4 items-center">
        <div className="text-center">
          <Avatar
            fallback="XS"
            $size="xs"
            $status="online"
            $colorScheme="secondary"
          />
          <p className="text-xs mt-1">XS</p>
        </div>
        <div className="text-center">
          <Avatar
            fallback="SM"
            $size="sm"
            $status="away"
            $colorScheme="accent"
          />
          <p className="text-xs mt-1">SM</p>
        </div>
        <div className="text-center">
          <Avatar
            fallback="MD"
            $size="default"
            $status="busy"
            $colorScheme="destructive"
          />
          <p className="text-xs mt-1">Default</p>
        </div>
        <div className="text-center">
          <Avatar
            fallback="LG"
            $size="lg"
            $status="online"
            $colorScheme="secondary"
          />
          <p className="text-xs mt-1">LG</p>
        </div>
        <div className="text-center">
          <Avatar
            fallback="XL"
            $size="xl"
            $status="away"
            $colorScheme="accent"
          />
          <p className="text-xs mt-1">XL</p>
        </div>
        <div className="text-center">
          <Avatar
            fallback="2X"
            $size="2xl"
            $status="online"
            $colorScheme="secondary"
          />
          <p className="text-xs mt-1">2XL</p>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const { clearAllAvatar } = useAvatarExamples();

    return (
      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <Avatar
            $store={useAvatarExamples}
            storeKey="interactiveExample"
            fallback="CL"
            onClick={() => alert('Avatar clicked!')}
            $colorScheme="accent"
          />
          <Avatar
            $store={useAvatarExamples}
            storeKey="imageExample"
            fallback="IM"
            onClick={() => alert('Image avatar clicked!')}
            $colorScheme="secondary"
          />
          <Avatar
            fallback="ST"
            onClick={() => alert('Status avatar clicked!')}
            $status="online"
            $colorScheme="destructive"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={clearAllAvatar}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm transition-colors">
            Clear All Avatars
          </button>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p>
            Interactive Example:{' '}
            {useAvatarExamples((state) => state.interactiveExample)}
          </p>
          <p>
            Image Example: {useAvatarExamples((state) => state.imageExample)}
          </p>
          <p>
            Status Example: {useAvatarExamples((state) => state.statusExample)}
          </p>
        </div>
      </div>
    );
  },
};

export const TeamExample: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3 text-foreground">Development Team</h3>
        <div className="flex gap-3">
          <Avatar
            fallback="John Doe"
            $size="sm"
            $colorScheme="secondary"
            $status="online"
            $statusPosition="bottom-right"
          />
          <Avatar
            fallback="Jane Smith"
            $size="sm"
            $colorScheme="accent"
            $status="away"
            $statusPosition="bottom-right"
          />
          <Avatar
            fallback="Mike Johnson"
            $size="sm"
            $colorScheme="default"
            $status="busy"
            $statusPosition="bottom-right"
          />
          <Avatar
            fallback="Sarah Wilson"
            $size="sm"
            $colorScheme="muted"
            $status="offline"
            $statusPosition="bottom-right"
          />
          <Avatar fallback="+3" $size="sm" $colorScheme="minimal" />
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3 text-foreground">Administrators</h3>
        <div className="flex gap-3">
          <Avatar
            fallback="Admin User"
            $size="default"
            $colorScheme="destructive"
            $variant="square"
            $status="online"
            $statusPosition="top-right"
          />
          <Avatar
            fallback="Super Admin"
            $size="default"
            $colorScheme="accent"
            $variant="square"
            $status="away"
            $statusPosition="top-right"
          />
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3 text-foreground">
          Profile Images with Status
        </h3>
        <div className="flex gap-3">
          <Avatar
            $store={useAvatarExamples}
            storeKey="imageExample"
            fallback="Profile 1"
            $size="lg"
            $colorScheme="secondary"
            $status="online"
            $statusPosition="bottom-right"
          />
          <Avatar
            src="invalid-image.jpg" // This will fallback to initials
            fallback="Profile 2"
            $size="lg"
            $colorScheme="accent"
            $status="away"
            $statusPosition="bottom-right"
          />
          <Avatar
            fallback="Profile 3"
            $size="lg"
            $colorScheme="destructive"
            $status="busy"
            $statusPosition="bottom-right"
          />
        </div>
      </div>
    </div>
  ),
};
