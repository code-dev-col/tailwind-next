import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, BreadcrumbBuilder } from './Breadcrumb';
import { useBreadcrumbExamples } from '../../../stores/breadcrumbExamples.store';
import {
  FiHome,
  FiFolder,
  FiFile,
  FiShoppingCart,
  FiUser,
  FiSettings,
  FiBook,
  FiUsers,
} from 'react-icons/fi';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Atoms/Breadcrumb',
  component: Breadcrumb,
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
        'custom',
      ],
      description: 'Esquema de color basado en theme.css',
    },
    $variant: {
      control: 'select',
      options: ['default', 'pills', 'arrows', 'slash', 'dots', 'minimal'],
      description: 'Variante visual del breadcrumb',
    },
    $size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    $separator: {
      control: 'select',
      options: ['chevron', 'arrow', 'slash', 'dot', 'pipe', 'custom'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ✅ Story básica por defecto
export const Default: Story = {
  render: () => {
    const { basicBreadcrumbs } = useBreadcrumbExamples();

    return (
      <div className="w-full max-w-2xl">
        <Breadcrumb
          items={basicBreadcrumbs}
          $colorScheme="default"
          $variant="default"
          $size="default"
        />
      </div>
    );
  },
};

// ✅ Esquemas de color basados en theme.css
export const ColorSchemes: Story = {
  render: () => {
    const { basicBreadcrumbs } = useBreadcrumbExamples();

    return (
      <div className="space-y-6 w-full max-w-2xl">
        <div>
          <h3 className="text-sm font-medium mb-2">Default</h3>
          <Breadcrumb items={basicBreadcrumbs} $colorScheme="default" />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Secondary</h3>
          <Breadcrumb items={basicBreadcrumbs} $colorScheme="secondary" />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Destructive</h3>
          <Breadcrumb items={basicBreadcrumbs} $colorScheme="destructive" />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Accent</h3>
          <Breadcrumb items={basicBreadcrumbs} $colorScheme="accent" />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Muted</h3>
          <Breadcrumb items={basicBreadcrumbs} $colorScheme="muted" />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Minimal</h3>
          <Breadcrumb items={basicBreadcrumbs} $colorScheme="minimal" />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Diferentes esquemas de color alineados con theme.css variables.',
      },
    },
  },
};

// ✅ Todas las variantes visuales
export const Variants: Story = {
  render: () => {
    const { basicBreadcrumbs } = useBreadcrumbExamples();

    return (
      <div className="space-y-6 w-full max-w-2xl">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Default</h3>
          <Breadcrumb
            items={basicBreadcrumbs}
            $colorScheme="default"
            $variant="default"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Pills</h3>
          <Breadcrumb
            items={basicBreadcrumbs}
            $colorScheme="secondary"
            $variant="pills"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Arrows</h3>
          <Breadcrumb
            items={basicBreadcrumbs}
            $colorScheme="accent"
            $variant="arrows"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Slash</h3>
          <Breadcrumb
            items={basicBreadcrumbs}
            $colorScheme="destructive"
            $variant="slash"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Dots</h3>
          <Breadcrumb items={basicBreadcrumbs} $variant="dots" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Minimal</h3>
          <Breadcrumb items={basicBreadcrumbs} $variant="minimal" />
        </div>
      </div>
    );
  },
};

// ✅ Diferentes tamaños
export const Sizes: Story = {
  render: () => {
    const { basicBreadcrumbs } = useBreadcrumbExamples();

    return (
      <div className="space-y-6 w-full max-w-2xl">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Small</h3>
          <Breadcrumb items={basicBreadcrumbs} $size="sm" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Default</h3>
          <Breadcrumb items={basicBreadcrumbs} $size="default" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Large</h3>
          <Breadcrumb items={basicBreadcrumbs} $size="lg" />
        </div>
      </div>
    );
  },
};

// ✅ Diferentes separadores
export const Separators: Story = {
  render: () => {
    const { basicBreadcrumbs } = useBreadcrumbExamples();

    return (
      <div className="space-y-6 w-full max-w-2xl">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Chevron (default)
          </h3>
          <Breadcrumb items={basicBreadcrumbs} $separator="chevron" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Arrow</h3>
          <Breadcrumb items={basicBreadcrumbs} $separator="arrow" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Slash</h3>
          <Breadcrumb items={basicBreadcrumbs} $separator="slash" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Dot</h3>
          <Breadcrumb items={basicBreadcrumbs} $separator="dot" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Pipe</h3>
          <Breadcrumb items={basicBreadcrumbs} $separator="pipe" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Custom</h3>
          <Breadcrumb
            items={basicBreadcrumbs}
            $separator="custom"
            $customSeparator="→"
          />
        </div>
      </div>
    );
  },
};

// ✅ Con iconos
export const WithIcons: Story = {
  render: () => {
    const iconBreadcrumb = [
      { label: 'Home', href: '/', icon: <FiHome /> },
      { label: 'Documents', href: '/documents', icon: <FiFolder /> },
      {
        label: 'Project Files',
        href: '/documents/project',
        icon: <FiFolder />,
      },
      { label: 'README.md', isCurrentPage: true, icon: <FiFile /> },
    ];

    return (
      <div className="space-y-6 w-full max-w-2xl">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">With Icons</h3>
          <Breadcrumb items={iconBreadcrumb} $showIcons />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Without Icons
          </h3>
          <Breadcrumb items={iconBreadcrumb} $showIcons={false} />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            With Home Icon
          </h3>
          <Breadcrumb
            items={[
              { label: 'Documents', href: '/documents' },
              { label: 'Project Files', href: '/documents/project' },
              { label: 'README.md', isCurrentPage: true },
            ]}
            $showHome
            $homeIcon={<FiHome />}
          />
        </div>
      </div>
    );
  },
};

// ✅ Casos de uso reales con store
export const RealWorldExamples: Story = {
  render: () => {
    const {
      ecommerceBreadcrumbs,
      dashboardBreadcrumbs,
      documentationBreadcrumbs,
      setCurrentEcommercePage,
      setCurrentDashboardPage,
      setCurrentDocPage,
    } = useBreadcrumbExamples();

    return (
      <div className="space-y-8 w-full max-w-4xl">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            E-commerce
          </h3>
          <div className="space-y-3">
            <Breadcrumb
              items={ecommerceBreadcrumbs}
              $variant="pills"
              onItemClick={(item) => {
                if (item.href) {
                  console.log('Navigate to:', item.href);
                }
              }}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentEcommercePage('product')}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                View Product
              </button>
              <button
                onClick={() => setCurrentEcommercePage('category')}
                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded">
                View Category
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Dashboard
          </h3>
          <div className="space-y-3">
            <Breadcrumb
              items={dashboardBreadcrumbs}
              $variant="default"
              $showIcons
            />
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentDashboardPage('analytics')}
                className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                Go to Analytics
              </button>
              <button
                onClick={() => setCurrentDashboardPage('settings')}
                className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded">
                Go to Settings
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Documentation
          </h3>
          <div className="space-y-3">
            <Breadcrumb
              items={documentationBreadcrumbs}
              $variant="arrows"
              $separator="arrow"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentDocPage('getting-started')}
                className="px-3 py-1 text-xs bg-teal-100 text-teal-700 rounded">
                Getting Started
              </button>
              <button
                onClick={() => setCurrentDocPage('api-reference')}
                className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded">
                API Reference
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// ✅ Breadcrumb colapsable para navegación larga
export const CollapsibleLong: Story = {
  render: () => {
    const longBreadcrumb = [
      { label: 'Home', href: '/', icon: <FiHome /> },
      { label: 'Company', href: '/company', icon: <FiUsers /> },
      {
        label: 'Departments',
        href: '/company/departments',
        icon: <FiFolder />,
      },
      {
        label: 'Engineering',
        href: '/company/departments/engineering',
        icon: <FiFolder />,
      },
      {
        label: 'Frontend',
        href: '/company/departments/engineering/frontend',
        icon: <FiFolder />,
      },
      {
        label: 'Projects',
        href: '/company/departments/engineering/frontend/projects',
        icon: <FiFolder />,
      },
      {
        label: 'React Library',
        href: '/company/departments/engineering/frontend/projects/react-lib',
        icon: <FiFolder />,
      },
      {
        label: 'Components',
        href: '/company/departments/engineering/frontend/projects/react-lib/components',
        icon: <FiFolder />,
      },
      { label: 'Breadcrumb.tsx', isCurrentPage: true, icon: <FiFile /> },
    ];

    return (
      <div className="space-y-6 w-full max-w-4xl">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Full Path (Not Collapsible)
          </h3>
          <Breadcrumb items={longBreadcrumb} $collapsible={false} $size="sm" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Collapsed (Max 4 items)
          </h3>
          <Breadcrumb
            items={longBreadcrumb}
            $maxItems={4}
            $collapsible
            onItemClick={(item, index) => {
              console.log('Clicked item:', item.label, 'at index:', index);
            }}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Collapsed (Max 3 items)
          </h3>
          <Breadcrumb
            items={longBreadcrumb}
            $maxItems={3}
            $collapsible
            $variant="pills"
          />
        </div>
      </div>
    );
  },
};

// ✅ BreadcrumbBuilder automático
export const AutoBuilder: Story = {
  render: () => {
    return (
      <div className="space-y-6 w-full max-w-2xl">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            From Path String
          </h3>
          <BreadcrumbBuilder
            path="/docs/components/atoms/breadcrumb"
            basePath=""
            $variant="default"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            From Segments Array
          </h3>
          <BreadcrumbBuilder
            segments={['home', 'products', 'electronics', 'smartphones']}
            basePath="/shop"
            $variant="pills"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            With Custom Mapping
          </h3>
          <BreadcrumbBuilder
            segments={['home', 'user-profile', 'account-settings']}
            mapSegment={(segment, index, isLast) => ({
              label:
                segment === 'user-profile'
                  ? 'My Profile'
                  : segment === 'account-settings'
                    ? 'Settings'
                    : segment.charAt(0).toUpperCase() + segment.slice(1),
              href: isLast ? undefined : `/${segment}`,
              isCurrentPage: isLast,
              icon:
                segment === 'home' ? (
                  <FiHome />
                ) : segment === 'user-profile' ? (
                  <FiUser />
                ) : segment === 'account-settings' ? (
                  <FiSettings />
                ) : undefined,
            })}
            $showIcons
            $variant="arrows"
          />
        </div>
      </div>
    );
  },
};

// ✅ Configuración interactiva con store
export const InteractiveConfiguration: Story = {
  render: () => {
    const {
      currentColorScheme,
      currentVariant,
      currentSize,
      separatorType,
      showIcons,
      maxItems,
      collapsible,
      setCurrentColorScheme,
      setCurrentVariant,
      setCurrentSize,
      setSeparatorType,
      setShowIcons,
      setMaxItems,
      setCollapsible,
      clearAllBreadcrumbs,
      basicBreadcrumbs,
    } = useBreadcrumbExamples();

    return (
      <div className="space-y-8 w-full max-w-4xl">
        {/* Controles interactivos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color Scheme
            </label>
            <select
              value={currentColorScheme}
              onChange={(e) => setCurrentColorScheme(e.target.value as any)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
              <option value="default">Default</option>
              <option value="secondary">Secondary</option>
              <option value="destructive">Destructive</option>
              <option value="accent">Accent</option>
              <option value="muted">Muted</option>
              <option value="minimal">Minimal</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Variant
            </label>
            <select
              value={currentVariant}
              onChange={(e) => setCurrentVariant(e.target.value as any)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
              <option value="default">Default</option>
              <option value="pills">Pills</option>
              <option value="arrows">Arrows</option>
              <option value="slash">Slash</option>
              <option value="dots">Dots</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size
            </label>
            <select
              value={currentSize}
              onChange={(e) => setCurrentSize(e.target.value as any)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
              <option value="sm">Small</option>
              <option value="default">Default</option>
              <option value="lg">Large</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Separator
            </label>
            <select
              value={separatorType}
              onChange={(e) => setSeparatorType(e.target.value as any)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
              <option value="chevron">Chevron</option>
              <option value="arrow">Arrow</option>
              <option value="slash">Slash</option>
              <option value="dot">Dot</option>
              <option value="pipe">Pipe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Items
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={maxItems}
              onChange={(e) => setMaxItems(Number(e.target.value))}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
            />
          </div>

          <div className="flex items-center space-x-4 col-span-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showIcons}
                onChange={(e) => setShowIcons(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Show Icons</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={collapsible}
                onChange={(e) => setCollapsible(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Collapsible</span>
            </label>
          </div>

          <div className="col-span-2 flex justify-end">
            <button
              onClick={clearAllBreadcrumbs}
              className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors">
              Reset Configuration
            </button>
          </div>
        </div>

        {/* Breadcrumb interactivo */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Interactive Breadcrumb
          </h3>
          <Breadcrumb
            items={basicBreadcrumbs}
            $colorScheme={currentColorScheme}
            $variant={currentVariant}
            $size={currentSize}
            $separator={separatorType}
            $showIcons={showIcons}
            $maxItems={maxItems || undefined}
            $collapsible={collapsible}
            onItemClick={(item, index) => {
              console.log('Clicked:', item.label, 'at index:', index);
            }}
          />
        </div>

        {/* Información de configuración */}
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
          <strong>Current Configuration:</strong> variant={currentVariant},
          size={currentSize}, separator={separatorType}, maxItems=
          {maxItems || 'unlimited'}, showIcons={showIcons.toString()},
          collapsible={collapsible.toString()}
        </div>
      </div>
    );
  },
};

// ✅ Estados especiales
export const SpecialStates: Story = {
  render: () => {
    return (
      <div className="space-y-6 w-full max-w-2xl">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Single Item
          </h3>
          <Breadcrumb
            items={[{ label: 'Home', isCurrentPage: true }]}
            $variant="default"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Empty Items
          </h3>
          <Breadcrumb items={[]} $variant="default" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Non-clickable Items
          </h3>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Restricted Area', isClickable: false },
              { label: 'Current Page', isCurrentPage: true },
            ]}
            $variant="pills"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            With Custom Click Handlers
          </h3>
          <Breadcrumb
            items={[
              {
                label: 'Home',
                onClick: () => alert('Custom home click!'),
                icon: <FiHome />,
              },
              {
                label: 'Custom Action',
                onClick: () => alert('Custom action executed!'),
                icon: <FiSettings />,
              },
              { label: 'Current', isCurrentPage: true },
            ]}
            $variant="default"
            $showIcons
          />
        </div>
      </div>
    );
  },
};

