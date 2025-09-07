import type { Meta, StoryObj } from '@storybook/react';
import { BreadcrumbNavigation } from './BreadcrumbNavigation';
import { useBreadcrumbExamples } from '../../../../stores/breadcrumbExamples.store';
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

const meta: Meta<typeof BreadcrumbNavigation> = {
  title: 'Molecules/Navigation/BreadcrumbNavigation',
  component: BreadcrumbNavigation,
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
    $layout: {
      control: 'select',
      options: ['default', 'centered', 'split', 'compact', 'card'],
    },
    $direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
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
      <div className="w-full max-w-4xl">
        <BreadcrumbNavigation
          items={basicBreadcrumbs}
          $colorScheme="default"
          $variant="default"
          $size="default"
          $layout="default"
        />
      </div>
    );
  },
};

// ✅ Con navegación básica
export const WithNavigation: Story = {
  render: () => {
    const { ecommerceBreadcrumbs } = useBreadcrumbExamples();

    return (
      <div className="w-full max-w-4xl space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Con botón de atrás</h3>
          <BreadcrumbNavigation
            items={ecommerceBreadcrumbs}
            $showBackButton
            onBack={() => alert('Navegando hacia atrás')}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Con botón home</h3>
          <BreadcrumbNavigation
            items={ecommerceBreadcrumbs}
            $showHomeButton
            onHome={() => alert('Navegando al inicio')}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Con ambos botones</h3>
          <BreadcrumbNavigation
            items={ecommerceBreadcrumbs}
            $showBackButton
            $showHomeButton
            onBack={() => alert('Navegando hacia atrás')}
            onHome={() => alert('Navegando al inicio')}
          />
        </div>
      </div>
    );
  },
};

// ✅ Diferentes layouts
export const Layouts: Story = {
  render: () => {
    const { dashboardBreadcrumbs } = useBreadcrumbExamples();

    return (
      <div className="w-full max-w-6xl space-y-8">
        <div>
          <h3 className="text-sm font-medium mb-2">Default Layout</h3>
          <BreadcrumbNavigation
            items={dashboardBreadcrumbs}
            $layout="default"
            $showBackButton
            $showActions
            $showShare
            $showRefresh
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Centered Layout</h3>
          <BreadcrumbNavigation
            items={dashboardBreadcrumbs}
            $layout="centered"
            $showBackButton
            $showHomeButton
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Split Layout</h3>
          <BreadcrumbNavigation
            items={dashboardBreadcrumbs}
            $layout="split"
            $showBackButton
            $showActions
            $showShare
            $showRefresh
            $showMore
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Compact Layout</h3>
          <BreadcrumbNavigation
            items={dashboardBreadcrumbs}
            $layout="compact"
            $size="sm"
            $showBackButton
            $showActions
            $showShare
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Card Layout</h3>
          <BreadcrumbNavigation
            items={dashboardBreadcrumbs}
            $layout="card"
            $showBackButton
            $showHomeButton
            $showActions
            $showShare
            $showRefresh
          />
        </div>
      </div>
    );
  },
};

// ✅ Con acciones
export const WithActions: Story = {
  render: () => {
    const { documentationBreadcrumbs } = useBreadcrumbExamples();

    const customActions = [
      {
        label: 'Editar',
        icon: <FiSettings />,
        onClick: () => alert('Editando página'),
        $colorScheme: 'secondary' as const,
      },
      {
        label: 'Duplicar',
        icon: <FiFile />,
        onClick: () => alert('Duplicando página'),
        $colorScheme: 'accent' as const,
      },
      {
        label: 'Eliminar',
        icon: <FiUser />,
        onClick: () => alert('Eliminando página'),
        $colorScheme: 'destructive' as const,
      },
    ];

    return (
      <div className="w-full max-w-4xl space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Acciones básicas</h3>
          <BreadcrumbNavigation
            items={documentationBreadcrumbs}
            $showActions
            $showShare
            $showRefresh
            onShare={() => alert('Compartiendo página')}
            onRefresh={() => alert('Actualizando página')}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Con menú "Más"</h3>
          <BreadcrumbNavigation
            items={documentationBreadcrumbs}
            $showActions
            $showMore
            $showShare
            $showRefresh
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Acciones personalizadas</h3>
          <BreadcrumbNavigation
            items={documentationBreadcrumbs}
            $showActions
            actions={customActions}
          />
        </div>
      </div>
    );
  },
};

// ✅ Esquemas de color
export const ColorSchemes: Story = {
  render: () => {
    const { basicBreadcrumbs } = useBreadcrumbExamples();

    return (
      <div className="space-y-6 w-full max-w-4xl">
        <h4 className="text-lg font-semibold">Esquemas de Color theme.css</h4>

        <div className="space-y-4">
          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">Default</h5>
            <BreadcrumbNavigation
              items={basicBreadcrumbs}
              $colorScheme="default"
              $layout="card"
              $showBackButton
              $showActions
              $showShare
            />
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">
              Secondary
            </h5>
            <BreadcrumbNavigation
              items={basicBreadcrumbs}
              $colorScheme="secondary"
              $layout="card"
              $showBackButton
              $showActions
              $showShare
            />
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">
              Destructive
            </h5>
            <BreadcrumbNavigation
              items={basicBreadcrumbs}
              $colorScheme="destructive"
              $layout="card"
              $showBackButton
              $showActions
              $showShare
            />
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">Accent</h5>
            <BreadcrumbNavigation
              items={basicBreadcrumbs}
              $colorScheme="accent"
              $layout="card"
              $showBackButton
              $showActions
              $showShare
            />
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">Muted</h5>
            <BreadcrumbNavigation
              items={basicBreadcrumbs}
              $colorScheme="muted"
              $layout="card"
              $showBackButton
              $showActions
              $showShare
            />
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">Minimal</h5>
            <BreadcrumbNavigation
              items={basicBreadcrumbs}
              $colorScheme="minimal"
              $showBackButton
              $showActions
              $showShare
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Esquemas de color theme.css:</strong> Estos esquemas
            utilizan las variables CSS definidas en theme.css, proporcionando
            consistencia visual y soporte para modo oscuro automático.
          </p>
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
      <div className="space-y-6 w-full max-w-4xl">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Small</h3>
          <BreadcrumbNavigation
            items={basicBreadcrumbs}
            $size="sm"
            $layout="card"
            $showBackButton
            $showActions
            $showShare
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Default</h3>
          <BreadcrumbNavigation
            items={basicBreadcrumbs}
            $size="default"
            $layout="card"
            $showBackButton
            $showActions
            $showShare
            $showRefresh
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Large</h3>
          <BreadcrumbNavigation
            items={basicBreadcrumbs}
            $size="lg"
            $layout="card"
            $showBackButton
            $showActions
            $showShare
            $showRefresh
          />
        </div>
      </div>
    );
  },
};

// ✅ Layout vertical
export const VerticalLayout: Story = {
  render: () => {
    const { ecommerceBreadcrumbs } = useBreadcrumbExamples();

    return (
      <div className="w-full max-w-2xl space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">
            Dirección horizontal (default)
          </h3>
          <BreadcrumbNavigation
            items={ecommerceBreadcrumbs}
            $direction="horizontal"
            $layout="card"
            $showBackButton
            $showActions
            $showShare
            $showRefresh
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Dirección vertical</h3>
          <BreadcrumbNavigation
            items={ecommerceBreadcrumbs}
            $direction="vertical"
            $layout="card"
            $showBackButton
            $showHomeButton
            $showActions
            $showShare
            $showRefresh
            $showMore
          />
        </div>
      </div>
    );
  },
};

// ✅ Casos de uso reales
export const RealWorldExamples: Story = {
  render: () => {
    const {
      ecommerceBreadcrumbs,
      dashboardBreadcrumbs,
      documentationBreadcrumbs,
    } = useBreadcrumbExamples();

    return (
      <div className="space-y-8 w-full max-w-6xl">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            E-commerce Navigation
          </h3>
          <BreadcrumbNavigation
            items={ecommerceBreadcrumbs}
            $layout="split"
            $variant="pills"
            $showBackButton
            $showActions
            $showShare
            $showMore
            onBack={() => console.log('Back to previous category')}
            onShare={() => console.log('Share product page')}
            onItemClick={(item, index) => {
              console.log('Navigate to:', item.label, 'at index:', index);
            }}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Dashboard Navigation
          </h3>
          <BreadcrumbNavigation
            items={dashboardBreadcrumbs}
            $layout="card"
            $colorScheme="secondary"
            $showBackButton
            $showHomeButton
            $showActions
            $showRefresh
            onHome={() => console.log('Navigate to dashboard home')}
            onRefresh={() => console.log('Refresh dashboard data')}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Documentation Navigation
          </h3>
          <BreadcrumbNavigation
            items={documentationBreadcrumbs}
            $layout="default"
            $variant="arrows"
            $colorScheme="accent"
            $showActions
            $showShare
            $showMore
            actions={[
              {
                label: 'Editar documentación',
                icon: <FiSettings />,
                onClick: () => console.log('Edit documentation'),
                $colorScheme: 'accent',
              },
              {
                label: 'Descargar PDF',
                icon: <FiFile />,
                onClick: () => console.log('Download PDF'),
                $colorScheme: 'default',
              },
              {
                label: 'Versión anterior',
                icon: <FiFolder />,
                onClick: () => console.log('Previous version'),
                $colorScheme: 'muted',
              },
            ]}
          />
        </div>
      </div>
    );
  },
};

// ✅ Con store interactivo
export const WithStore: Story = {
  render: () => {
    const { basicBreadcrumbs, setBasicBreadcrumbs, clearAllBreadcrumbs } =
      useBreadcrumbExamples();

    const addLevel = () => {
      const newLevel = `Nivel ${basicBreadcrumbs.length}`;
      const newBreadcrumbs = [...basicBreadcrumbs];

      // Remover isCurrentPage del último item
      if (newBreadcrumbs.length > 0) {
        newBreadcrumbs[newBreadcrumbs.length - 1].isCurrentPage = false;
        newBreadcrumbs[
          newBreadcrumbs.length - 1
        ].href = `/level-${newBreadcrumbs.length}`;
      }

      // Añadir nuevo nivel
      newBreadcrumbs.push({
        label: newLevel,
        isCurrentPage: true,
        icon: <FiFolder />,
      });

      setBasicBreadcrumbs(newBreadcrumbs);
    };

    const removeLevel = () => {
      if (basicBreadcrumbs.length > 1) {
        const newBreadcrumbs = [...basicBreadcrumbs];
        newBreadcrumbs.pop();

        // Hacer el último item como current page
        if (newBreadcrumbs.length > 0) {
          newBreadcrumbs[newBreadcrumbs.length - 1].isCurrentPage = true;
          delete newBreadcrumbs[newBreadcrumbs.length - 1].href;
        }

        setBasicBreadcrumbs(newBreadcrumbs);
      }
    };

    return (
      <div className="space-y-6 w-full max-w-4xl">
        {/* Controles */}
        <div className="flex gap-2">
          <button
            onClick={addLevel}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors">
            Agregar Nivel
          </button>
          <button
            onClick={removeLevel}
            disabled={basicBreadcrumbs.length <= 1}
            className="px-3 py-2 bg-orange-100 text-orange-700 rounded text-sm hover:bg-orange-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Quitar Nivel
          </button>
          <button
            onClick={clearAllBreadcrumbs}
            className="px-3 py-2 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors">
            Limpiar Todo
          </button>
        </div>

        {/* Breadcrumb dinámico */}
        <BreadcrumbNavigation
          items={basicBreadcrumbs}
          $layout="card"
          $showBackButton
          $showActions
          $showShare
          $maxItems={5}
          $collapsible
          onBack={removeLevel}
          onItemClick={(item, index) => {
            console.log('Clicked:', item.label, 'at index:', index);
          }}
        />

        {/* Información del estado */}
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
          <strong>Estado actual:</strong> {basicBreadcrumbs.length} niveles,
          página actual: "
          {basicBreadcrumbs[basicBreadcrumbs.length - 1]?.label || 'Ninguna'}"
        </div>
      </div>
    );
  },
};

// ✅ Estados especiales
export const SpecialStates: Story = {
  render: () => {
    return (
      <div className="space-y-6 w-full max-w-4xl">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Estado de carga
          </h3>
          <BreadcrumbNavigation
            items={[
              { label: 'Home', href: '/' },
              { label: 'Productos', href: '/productos' },
              { label: 'Cargando...', isCurrentPage: true },
            ]}
            $loading
            $layout="card"
            $showBackButton
            $showActions
            $showRefresh
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Estado deshabilitado
          </h3>
          <BreadcrumbNavigation
            items={[
              { label: 'Home', href: '/' },
              { label: 'Área restringida', isCurrentPage: true },
            ]}
            $disabled
            $layout="card"
            $showBackButton
            $showActions
            $showShare
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Navegación mínima
          </h3>
          <BreadcrumbNavigation
            items={[{ label: 'Página única', isCurrentPage: true }]}
            $layout="default"
            $colorScheme="minimal"
            $showBackButton
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Sin items</h3>
          <BreadcrumbNavigation
            items={[]}
            $layout="card"
            $showBackButton
            $showHomeButton
            $showActions
            $showShare
          />
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
      {
        label: 'BreadcrumbNavigation.tsx',
        isCurrentPage: true,
        icon: <FiFile />,
      },
    ];

    return (
      <div className="space-y-6 w-full max-w-4xl">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Full Path (Not Collapsible)
          </h3>
          <BreadcrumbNavigation
            items={longBreadcrumb}
            $collapsible={false}
            $size="sm"
            $layout="card"
            $showBackButton
            onItemClick={(item, index) => {
              console.log('Clicked item:', item.label, 'at index:', index);
            }}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Collapsed (Max 4 items) + Navigation
          </h3>
          <BreadcrumbNavigation
            items={longBreadcrumb}
            $maxItems={4}
            $collapsible
            $layout="split"
            $showBackButton
            $showActions
            $showShare
            $showRefresh
            onItemClick={(item, index) => {
              console.log('Clicked item:', item.label, 'at index:', index);
            }}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Collapsed (Max 3 items) + Pills Variant
          </h3>
          <BreadcrumbNavigation
            items={longBreadcrumb}
            $maxItems={3}
            $collapsible
            $variant="pills"
            $layout="card"
            $showBackButton
            $showHomeButton
            $showActions
            $showMore
          />
        </div>
      </div>
    );
  },
};

// ✅ Responsivo mejorado
export const Responsive: Story = {
  render: () => {
    const { ecommerceBreadcrumbs } = useBreadcrumbExamples();

    return (
      <div className="space-y-8 w-full">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Adaptación Responsiva Automática
          </h3>

          {/* Una sola implementación que se adapta */}
          <BreadcrumbNavigation
            items={ecommerceBreadcrumbs}
            $layout="split"
            $variant="default"
            $size="default"
            $showBackButton
            $showHomeButton
            $showActions
            $showShare
            $showRefresh
            $showMore
            $maxItems={4}
            $collapsible
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Diferentes Configuraciones por Tamaño
          </h3>

          {/* Configuración para pantallas grandes */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">
              Pantalla Grande (Layout Split + Todas las acciones)
            </h4>
            <div className="min-w-0 max-w-4xl">
              <BreadcrumbNavigation
                items={ecommerceBreadcrumbs}
                $layout="split"
                $size="lg"
                $showBackButton
                $showHomeButton
                $showActions
                $showShare
                $showRefresh
                $showMore
                $maxItems={0}
                $collapsible={false}
              />
            </div>
          </div>

          {/* Configuración para tablets */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">
              Tablet (Layout Default + Acciones reducidas)
            </h4>
            <div className="min-w-0 max-w-2xl">
              <BreadcrumbNavigation
                items={ecommerceBreadcrumbs}
                $layout="default"
                $size="default"
                $showBackButton
                $showActions
                $showShare
                $maxItems={4}
                $collapsible
              />
            </div>
          </div>

          {/* Configuración para móviles */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">
              Mobile (Layout Compact + Mínimas acciones)
            </h4>
            <div className="min-w-0 max-w-lg">
              <BreadcrumbNavigation
                items={ecommerceBreadcrumbs}
                $layout="compact"
                $size="sm"
                $showBackButton
                $maxItems={2}
                $collapsible
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Responsividad:</strong> El componente BreadcrumbNavigation
            se adapta automáticamente al ancho disponible. Para mejores
            resultados en aplicaciones reales, usa clases responsive de Tailwind
            CSS para mostrar/ocultar acciones según el breakpoint.
          </p>
        </div>
      </div>
    );
  },
};

