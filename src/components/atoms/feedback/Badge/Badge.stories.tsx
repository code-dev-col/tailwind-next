import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { useBadgeExamples } from '../../../../stores/badgeExamples.store';
import {
  FiStar,
  FiZap,
  FiX,
  FiTag,
  FiFilter,
  FiLayers,
  FiPlus,
  FiMinus,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Feedback/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $colorScheme: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'accent',
        'muted',
        'minimal',
        'success',
        'warning',
        'outline',
        'custom',
      ],
      description: 'Esquema de color usando theme.css',
    },
    $size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the badge',
    },
    $custom: {
      control: 'text',
      description: 'Custom Tailwind CSS classes',
    },
  },
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
      <Badge $colorScheme="default">Default</Badge>
      <Badge $colorScheme="secondary">Secondary</Badge>
      <Badge $colorScheme="destructive">Destructive</Badge>
      <Badge $colorScheme="success">Success</Badge>
      <Badge $colorScheme="warning">Warning</Badge>
      <Badge $colorScheme="outline">Outline</Badge>
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
          <Badge $colorScheme="success">Active</Badge>
          <Badge $colorScheme="warning">Pending</Badge>
          <Badge $colorScheme="destructive">Error</Badge>
          <Badge $colorScheme="secondary">Inactive</Badge>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">User Roles</h3>
        <div className="flex gap-2">
          <Badge $colorScheme="default">Admin</Badge>
          <Badge $colorScheme="secondary">User</Badge>
          <Badge $colorScheme="outline">Guest</Badge>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Priority Levels</h3>
        <div className="flex gap-2">
          <Badge $colorScheme="destructive" $size="sm">
            High
          </Badge>
          <Badge $colorScheme="warning" $size="sm">
            Medium
          </Badge>
          <Badge $colorScheme="success" $size="sm">
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
        <Badge $colorScheme="destructive" $size="sm">
          5
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Messages</span>
        <Badge $colorScheme="default" $size="sm">
          12
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Tasks</span>
        <Badge $colorScheme="success" $size="sm">
          3
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Warnings</span>
        <Badge $colorScheme="warning" $size="sm">
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
        $colorScheme="destructive"
        $custom="cursor-pointer hover:scale-105 active:scale-95 transition-transform">
        Remove
      </Badge>
      <Badge
        $colorScheme="success"
        $custom="cursor-pointer hover:scale-105 active:scale-95 transition-transform">
        Approve
      </Badge>
    </div>
  ),
};

// 🎨 ===== THEME.CSS COLOR SCHEMES =====
export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold">Esquemas de Color theme.css</h4>

      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Default (Primary)
          </h5>
          <div className="flex flex-wrap gap-2">
            <Badge $colorScheme="default">Featured</Badge>
            <Badge $colorScheme="default" $size="sm">
              New
            </Badge>
            <Badge $colorScheme="default" $size="lg">
              Premium
            </Badge>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Secondary</h5>
          <div className="flex flex-wrap gap-2">
            <Badge $colorScheme="secondary">Info</Badge>
            <Badge $colorScheme="secondary" $size="sm">
              Beta
            </Badge>
            <Badge $colorScheme="secondary" $size="lg">
              Draft
            </Badge>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Destructive
          </h5>
          <div className="flex flex-wrap gap-2">
            <Badge $colorScheme="destructive">Error</Badge>
            <Badge $colorScheme="destructive" $size="sm">
              Failed
            </Badge>
            <Badge $colorScheme="destructive" $size="lg">
              Critical
            </Badge>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Accent</h5>
          <div className="flex flex-wrap gap-2">
            <Badge $colorScheme="accent">Special</Badge>
            <Badge $colorScheme="accent" $size="sm">
              Pro
            </Badge>
            <Badge $colorScheme="accent" $size="lg">
              Highlighted
            </Badge>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Muted</h5>
          <div className="flex flex-wrap gap-2">
            <Badge $colorScheme="muted">Standard</Badge>
            <Badge $colorScheme="muted" $size="sm">
              Basic
            </Badge>
            <Badge $colorScheme="muted" $size="lg">
              Regular
            </Badge>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Minimal</h5>
          <div className="flex flex-wrap gap-2">
            <Badge $colorScheme="minimal">Subtle</Badge>
            <Badge $colorScheme="minimal" $size="sm">
              Light
            </Badge>
            <Badge $colorScheme="minimal" $size="lg">
              Clean
            </Badge>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Special Color Schemes
          </h5>
          <div className="flex flex-wrap gap-2">
            <Badge $colorScheme="success">Success</Badge>
            <Badge $colorScheme="warning">Warning</Badge>
            <Badge $colorScheme="outline">Outline</Badge>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Esquemas de color theme.css:</strong> Estos esquemas utilizan
          las variables CSS definidas en theme.css, proporcionando consistencia
          visual y soporte para modo oscuro automático.
        </p>
      </div>
    </div>
  ),
};

export const ColorSchemeWithStore: Story = {
  render: () => {
    const {
      colorSchemeExample,
      secondaryColorExample,
      destructiveColorExample,
      accentColorExample,
      mutedColorExample,
      minimalColorExample,
      notificationBadges,
      statusBadges,
      incrementNotification,
      decrementNotification,
      resetNotification,
      toggleBadgeVisibility,
      badgeVisibility,
      resetToDefaults,
    } = useBadgeExamples();

    return (
      <div className="space-y-6">
        <h4 className="text-lg font-semibold">Esquemas de Color con Store</h4>

        <div className="space-y-4">
          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">
              Default (Primary)
            </h5>
            <div className="flex flex-wrap gap-2">
              <Badge $colorScheme="default">{colorSchemeExample}</Badge>
              <Badge $colorScheme="default" $size="sm">
                New
              </Badge>
              <Badge $colorScheme="default" $size="lg">
                Premium
              </Badge>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">
              Secondary
            </h5>
            <div className="flex flex-wrap gap-2">
              <Badge $colorScheme="secondary">{secondaryColorExample}</Badge>
              <Badge $colorScheme="secondary" $size="sm">
                Beta
              </Badge>
              <Badge $colorScheme="secondary" $size="lg">
                Draft
              </Badge>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">
              Destructive
            </h5>
            <div className="flex flex-wrap gap-2">
              <Badge $colorScheme="destructive">
                {destructiveColorExample}
              </Badge>
              <Badge $colorScheme="destructive" $size="sm">
                Failed
              </Badge>
              <Badge $colorScheme="destructive" $size="lg">
                Critical
              </Badge>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">Accent</h5>
            <div className="flex flex-wrap gap-2">
              <Badge $colorScheme="accent">{accentColorExample}</Badge>
              <Badge $colorScheme="accent" $size="sm">
                Pro
              </Badge>
              <Badge $colorScheme="accent" $size="lg">
                Highlighted
              </Badge>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">Muted</h5>
            <div className="flex flex-wrap gap-2">
              <Badge $colorScheme="muted">{mutedColorExample}</Badge>
              <Badge $colorScheme="muted" $size="sm">
                Basic
              </Badge>
              <Badge $colorScheme="muted" $size="lg">
                Regular
              </Badge>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">Minimal</h5>
            <div className="flex flex-wrap gap-2">
              <Badge $colorScheme="minimal">{minimalColorExample}</Badge>
              <Badge $colorScheme="minimal" $size="sm">
                Light
              </Badge>
              <Badge $colorScheme="minimal" $size="lg">
                Clean
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h5 className="text-sm font-medium text-gray-700">
            Notification Badges Interactivas
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(notificationBadges).map(([key, count]) => (
              <div
                key={key}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <span className="capitalize font-medium min-w-[80px]">
                  {key}:
                </span>

                {badgeVisibility[key] && count > 0 && (
                  <Badge $colorScheme="destructive" $size="sm">
                    {count}
                  </Badge>
                )}

                <div className="flex gap-1 ml-auto">
                  <button
                    onClick={() => incrementNotification(key)}
                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                    title="Incrementar">
                    <FiPlus size={14} />
                  </button>
                  <button
                    onClick={() => decrementNotification(key)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    title="Decrementar">
                    <FiMinus size={14} />
                  </button>
                  <button
                    onClick={() => resetNotification(key)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Reset">
                    <FiX size={14} />
                  </button>
                  <button
                    onClick={() => toggleBadgeVisibility(key)}
                    className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                    title="Toggle visibility">
                    {badgeVisibility[key] ? (
                      <FiEye size={14} />
                    ) : (
                      <FiEyeOff size={14} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h5 className="text-sm font-medium text-gray-700">Status Badges</h5>

          <div className="flex flex-wrap gap-2">
            {statusBadges.map((status, index) => (
              <Badge
                key={status}
                $colorScheme={
                  index === 0 ? 'accent' : index === 1 ? 'secondary' : 'default'
                }
                $size="sm">
                {status}
              </Badge>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg space-y-3">
          <h6 className="font-medium">Estado Actual del Store:</h6>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <strong>Total notificaciones:</strong>{' '}
                {Object.values(notificationBadges).reduce((a, b) => a + b, 0)}
              </p>
              <p>
                <strong>Status badges:</strong> {statusBadges.length}
              </p>
            </div>
            <div>
              <button
                onClick={resetToDefaults}
                className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50">
                Reset Store
              </button>
            </div>
          </div>

          <details className="text-xs">
            <summary className="cursor-pointer font-medium">
              Ver valores del store
            </summary>
            <pre className="text-gray-600 bg-white p-3 rounded overflow-auto max-h-40 mt-2">
              {JSON.stringify(
                {
                  colorSchemeExample,
                  secondaryColorExample,
                  destructiveColorExample,
                  accentColorExample,
                  mutedColorExample,
                  minimalColorExample,
                  notificationBadges,
                  statusBadges,
                  badgeVisibility,
                },
                null,
                2
              )}
            </pre>
          </details>
        </div>
      </div>
    );
  },
};

