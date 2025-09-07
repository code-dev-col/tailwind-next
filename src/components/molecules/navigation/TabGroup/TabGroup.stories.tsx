import type { Meta, StoryObj } from '@storybook/react';
import { TabGroup } from './TabGroup';
import { useTabGroupExamples } from '../../../../stores/tabGroupExamples.store';
import { Container } from '../../../atoms/layout/Container';
import { Badge } from '../../../atoms/feedback/Badge';
import {
  FiHome,
  FiUser,
  FiSettings,
  FiMail,
  FiHeart,
  FiBell,
} from 'react-icons/fi';

const meta: Meta<typeof TabGroup> = {
  title: 'Molecules/Navigation/TabGroup',
  component: TabGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente TabGroup para navegación por pestañas con soporte completo de colorSchemes y variantes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    $colorScheme: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'destructive',
        'accent',
        'muted',
        'minimal',
      ],
      description: 'Esquema de color del sistema theme.css',
    },
    $variant: {
      control: 'select',
      options: ['default', 'pills', 'underline', 'boxed'],
      description: 'Variante visual del TabGroup',
    },
    $size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Tamaño del TabGroup',
    },
    $orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientación del TabGroup',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Datos de ejemplo para las tabs
const basicTabs = [
  {
    id: 'home',
    label: 'Inicio',
    content: <div className="p-4">Contenido del Inicio</div>,
  },
  {
    id: 'profile',
    label: 'Perfil',
    content: <div className="p-4">Contenido del Perfil</div>,
  },
  {
    id: 'settings',
    label: 'Configuración',
    content: <div className="p-4">Contenido de Configuración</div>,
  },
];

const tabsWithIcons = [
  {
    id: 'home',
    label: 'Inicio',
    icon: <FiHome className="w-4 h-4" />,
    content: <div className="p-4">Contenido del Inicio con ícono</div>,
  },
  {
    id: 'profile',
    label: 'Perfil',
    icon: <FiUser className="w-4 h-4" />,
    content: <div className="p-4">Contenido del Perfil con ícono</div>,
  },
  {
    id: 'settings',
    label: 'Configuración',
    icon: <FiSettings className="w-4 h-4" />,
    content: <div className="p-4">Contenido de Configuración con ícono</div>,
  },
];

const tabsWithBadges = [
  {
    id: 'inbox',
    label: 'Bandeja',
    icon: <FiMail className="w-4 h-4" />,
    badge: '12',
    content: <div className="p-4">Tienes 12 mensajes nuevos</div>,
  },
  {
    id: 'favorites',
    label: 'Favoritos',
    icon: <FiHeart className="w-4 h-4" />,
    badge: '3',
    content: <div className="p-4">3 elementos favoritos</div>,
  },
  {
    id: 'notifications',
    label: 'Notificaciones',
    icon: <FiBell className="w-4 h-4" />,
    badge: '99+',
    content: <div className="p-4">Tienes más de 99 notificaciones</div>,
  },
];

// Stories principales
export const Default: Story = {
  render: () => (
    <Container className="w-full max-w-2xl">
      <TabGroup
        tabs={basicTabs}
        $store={useTabGroupExamples}
        storeKey="defaultExample"
      />
    </Container>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Container className="w-full max-w-2xl">
      <TabGroup
        tabs={tabsWithIcons}
        $store={useTabGroupExamples}
        storeKey="iconsExample"
      />
    </Container>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Container className="w-full max-w-2xl">
      <TabGroup
        tabs={tabsWithBadges}
        $store={useTabGroupExamples}
        storeKey="badgesExample"
      />
    </Container>
  ),
};

export const Variants: Story = {
  render: () => (
    <Container className="space-y-8 w-full max-w-4xl">
      <div>
        <h4 className="text-lg font-semibold mb-4">Default</h4>
        <TabGroup tabs={basicTabs} $variant="default" defaultActiveTab="home" />
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Pills</h4>
        <TabGroup tabs={basicTabs} $variant="pills" defaultActiveTab="home" />
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Underline</h4>
        <TabGroup
          tabs={basicTabs}
          $variant="underline"
          defaultActiveTab="home"
        />
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Boxed</h4>
        <TabGroup tabs={basicTabs} $variant="boxed" defaultActiveTab="home" />
      </div>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Container className="space-y-8 w-full max-w-4xl">
      <div>
        <h4 className="text-lg font-semibold mb-4">Small</h4>
        <TabGroup tabs={basicTabs} $size="sm" defaultActiveTab="home" />
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Default</h4>
        <TabGroup tabs={basicTabs} $size="default" defaultActiveTab="home" />
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Large</h4>
        <TabGroup tabs={basicTabs} $size="lg" defaultActiveTab="home" />
      </div>
    </Container>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <Container className="space-y-8 w-full max-w-4xl">
      <h4 className="text-lg font-semibold mb-4">
        Esquemas de Color theme.css
      </h4>

      <div className="space-y-6">
        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Default</h5>
          <TabGroup
            tabs={tabsWithIcons}
            $colorScheme="default"
            defaultActiveTab="home"
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Primary</h5>
          <TabGroup
            tabs={tabsWithIcons}
            $colorScheme="primary"
            defaultActiveTab="home"
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Secondary</h5>
          <TabGroup
            tabs={tabsWithIcons}
            $colorScheme="secondary"
            defaultActiveTab="home"
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Destructive
          </h5>
          <TabGroup
            tabs={tabsWithIcons}
            $colorScheme="destructive"
            defaultActiveTab="home"
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Accent</h5>
          <TabGroup
            tabs={tabsWithIcons}
            $colorScheme="accent"
            defaultActiveTab="home"
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Muted</h5>
          <TabGroup
            tabs={tabsWithIcons}
            $colorScheme="muted"
            defaultActiveTab="home"
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Minimal</h5>
          <TabGroup
            tabs={tabsWithIcons}
            $colorScheme="minimal"
            defaultActiveTab="home"
          />
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Esquemas de color theme.css:</strong> Estos esquemas utilizan
          las variables CSS definidas en theme.css, proporcionando consistencia
          visual y soporte para modo oscuro automático.
        </p>
      </div>
    </Container>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Container className="w-full max-w-4xl">
      <TabGroup
        tabs={tabsWithIcons}
        $orientation="vertical"
        $store={useTabGroupExamples}
        storeKey="verticalExample"
        className="h-64"
      />
    </Container>
  ),
};

export const WithStore: Story = {
  render: () => {
    const { defaultExample, setDefaultExample, clearAllTabGroup } =
      useTabGroupExamples();

    return (
      <Container className="space-y-4 w-full max-w-2xl">
        <TabGroup
          tabs={basicTabs}
          $store={useTabGroupExamples}
          storeKey="defaultExample"
        />

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Tab activo en store:</strong> {defaultExample || 'ninguno'}
          </p>
          <button
            onClick={() => setDefaultExample('settings')}
            className="px-3 py-1 bg-primary text-white rounded mr-2 text-sm">
            Cambiar a Settings
          </button>
          <button
            onClick={clearAllTabGroup}
            className="px-3 py-1 bg-gray-200 rounded text-sm">
            Clear Store
          </button>
        </div>
      </Container>
    );
  },
};

export const FullFeatures: Story = {
  render: () => (
    <Container className="space-y-8 w-full max-w-4xl">
      <div>
        <h4 className="text-lg font-semibold mb-4">Pills con badges</h4>
        <TabGroup
          tabs={tabsWithBadges}
          $variant="pills"
          $colorScheme="primary"
          defaultActiveTab="inbox"
        />
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Boxed con iconos</h4>
        <TabGroup
          tabs={tabsWithIcons}
          $variant="boxed"
          $colorScheme="secondary"
          $size="lg"
          defaultActiveTab="profile"
        />
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Underline minimal</h4>
        <TabGroup
          tabs={basicTabs}
          $variant="underline"
          $colorScheme="minimal"
          $size="sm"
          defaultActiveTab="settings"
        />
      </div>
    </Container>
  ),
};

export const Interactive: Story = {
  render: () => {
    const { interactiveExample, setInteractiveExample, clearAllTabGroup } =
      useTabGroupExamples();

    const handleTabChange = (tabId: string, tab: any) => {
      console.log('Tab cambiado:', tabId, tab);
    };

    return (
      <Container className="space-y-4 w-full max-w-2xl">
        <TabGroup
          tabs={tabsWithBadges}
          $store={useTabGroupExamples}
          storeKey="interactiveExample"
          $variant="pills"
          $colorScheme="accent"
          onTabChange={handleTabChange}
        />

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Estado actual:</strong> {interactiveExample || 'ninguno'}
          </p>
          <p className="text-xs text-gray-500 mb-2">
            Abre la consola del navegador para ver los eventos de cambio de tab.
          </p>
          <button
            onClick={clearAllTabGroup}
            className="px-3 py-1 bg-gray-200 rounded text-sm">
            Reset Estado
          </button>
        </div>
      </Container>
    );
  },
};

