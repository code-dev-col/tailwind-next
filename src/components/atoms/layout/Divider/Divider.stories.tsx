import type { Meta, StoryObj } from '@storybook/react';
import { Divider, Separator } from './Divider';
import { useDividerExamples } from '../../../../stores/dividerExamples.store';
import {
  FiStar,
  FiHeart,
  FiCircle,
  FiMinus,
  FiChevronRight,
  FiHome,
  FiUser,
  FiSettings,
  FiMail,
  FiPhone,
} from 'react-icons/fi';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'double', 'gradient', 'shadow'],
    },
    $orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    $thickness: {
      control: 'select',
      options: ['thin', 'default', 'thick', 'thicker'],
    },
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
      description: 'Sistema de colores con theme.css (recomendado)',
    },
    $color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'muted', 'custom'],
      description: 'Sistema legacy de colores (backward compatibility)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ✅ Story básica por defecto
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <div className="p-4 bg-white rounded border">
        <h3 className="text-lg font-semibold mb-2">Content Above</h3>
        <Divider />
        <p className="text-gray-600 mt-2">Content Below</p>
      </div>
    </div>
  ),
};

// ✅ Nuevos esquemas de color con theme.css
export const ColorSchemes: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-8">
      {/* Encabezado explicativo */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-blue-900 mb-3">
          🎨 Esquemas de Color - theme.css Integration
        </h2>
        <p className="text-blue-700 text-sm mb-4">
          Todos los esquemas utilizan las variables CSS del theme.css para
          máxima consistencia.
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">
              ✅ Recomendados:
            </h3>
            <ul className="space-y-1 text-blue-700">
              <li>
                • <strong>default:</strong> Color principal del sistema
                (primary)
              </li>
              <li>
                • <strong>secondary:</strong> Color secundario pastel
              </li>
              <li>
                • <strong>accent:</strong> Color de acentos y destacados
              </li>
              <li>
                • <strong>muted:</strong> Grises neutros y sutiles
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">🎯 Especiales:</h3>
            <ul className="space-y-1 text-blue-700">
              <li>
                • <strong>destructive:</strong> Errores y acciones destructivas
              </li>
              <li>
                • <strong>minimal:</strong> Transparente y minimalista
              </li>
              <li>
                • <strong>custom:</strong> Para personalización externa
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Comparación lado a lado */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Esquemas principales */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-blue-900 border-b border-blue-200 pb-2">
            🎨 Esquemas Principales
          </h3>

          <div className="bg-white p-6 border rounded-lg shadow-sm space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">
                Default (Primary)
              </h4>
              <p className="text-sm text-gray-500 mb-3">
                Color principal del sistema
              </p>
              <Divider
                $colorScheme="default"
                text="Primary System Color"
                $textVariant="colored"
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">
                Secondary
              </h4>
              <p className="text-sm text-gray-500 mb-3">
                Turquesa pastel complementario
              </p>
              <Divider
                $colorScheme="secondary"
                text="Secondary Color"
                $textVariant="colored"
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Accent</h4>
              <p className="text-sm text-gray-500 mb-3">
                Violeta rosado para destacados
              </p>
              <Divider
                $colorScheme="accent"
                text="Accent Color"
                $textVariant="colored"
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Muted</h4>
              <p className="text-sm text-gray-500 mb-3">
                Grises neutros para elementos sutiles
              </p>
              <Divider
                $colorScheme="muted"
                text="Muted Color"
                $textVariant="colored"
              />
            </div>
          </div>
        </div>

        {/* Esquemas especiales */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-red-900 border-b border-red-200 pb-2">
            🎯 Esquemas Especiales
          </h3>

          <div className="bg-white p-6 border rounded-lg shadow-sm space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">
                Destructive
              </h4>
              <p className="text-sm text-gray-500 mb-3">
                Para errores y acciones destructivas
              </p>
              <Divider
                $colorScheme="destructive"
                text="Error State"
                $textVariant="colored"
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">
                Minimal
              </h4>
              <p className="text-sm text-gray-500 mb-3">
                Transparente y minimalista
              </p>
              <Divider
                $colorScheme="minimal"
                text="Minimal Style"
                $textVariant="colored"
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Custom</h4>
              <p className="text-sm text-gray-500 mb-3">
                Sin estilos para personalización
              </p>
              <Divider
                $colorScheme="custom"
                text="Custom Style"
                $custom="text-purple-600 border-purple-600"
                $textClassName="text-purple-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comparación de variantes con esquemas */}
      <div className="bg-white p-6 border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-6">
          Variantes con Esquemas de Color
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">
              Solid + Gradient Variants
            </h4>
            <div className="space-y-3">
              <Divider
                $variant="solid"
                $colorScheme="default"
                $thickness="thick"
              />
              <Divider
                $variant="gradient"
                $colorScheme="secondary"
                $thickness="thick"
              />
              <Divider
                $variant="solid"
                $colorScheme="accent"
                $thickness="thick"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">
              Dashed + Dotted Variants
            </h4>
            <div className="space-y-3">
              <Divider
                $variant="dashed"
                $colorScheme="default"
                $thickness="thick"
              />
              <Divider
                $variant="dotted"
                $colorScheme="secondary"
                $thickness="thick"
              />
              <Divider
                $variant="double"
                $colorScheme="accent"
                $thickness="thick"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Backward compatibility notice */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">
          🔄 Backward Compatibility
        </h4>
        <p className="text-yellow-700 text-sm">
          El prop <code>$color</code> legacy aún funciona pero se recomienda
          migrar a <code>$colorScheme</code>
          para mejor integración con theme.css. Los colores legacy se mapean
          automáticamente.
        </p>
      </div>
    </div>
  ),
};

// ✅ Comparación Divider vs Separator (Principal diferencia)
export const DividerVsSeparator: Story = {
  render: () => {
    const { separatorItems } = useDividerExamples();

    return (
      <div className="w-full max-w-4xl space-y-8">
        {/* Encabezado explicativo */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-blue-900 mb-3">
            🎯 Diferencia Clave: Divider vs Separator
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">📏 DIVIDER</h3>
              <ul className="space-y-1 text-blue-700">
                <li>
                  • <strong>Propósito:</strong> Separar secciones de contenido
                </li>
                <li>
                  • <strong>Visual:</strong> Línea horizontal/vertical
                </li>
                <li>
                  • <strong>Uso:</strong> Entre párrafos, cards, formularios
                </li>
                <li>
                  • <strong>Interacción:</strong> No interactivo
                </li>
                <li>
                  • <strong>Contenido:</strong> Puede incluir texto/iconos
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-2">
                🔗 SEPARATOR
              </h3>
              <ul className="space-y-1 text-green-700">
                <li>
                  • <strong>Propósito:</strong> Separar elementos en listas
                </li>
                <li>
                  • <strong>Visual:</strong> Símbolo entre items (•, /, &gt;)
                </li>
                <li>
                  • <strong>Uso:</strong> Breadcrumbs, menús, tags
                </li>
                <li>
                  • <strong>Interacción:</strong> Items son clickeables
                </li>
                <li>
                  • <strong>Contenido:</strong> Lista de elementos
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ejemplos prácticos lado a lado */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* DIVIDER Examples */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-blue-200 pb-2">
              📏 DIVIDER - Separación de Contenido
            </h3>

            {/* Card con dividers */}
            <div className="bg-white p-6 border rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800">User Profile</h4>
              <p className="text-gray-600 text-sm">Basic information</p>

              <Divider $margin="lg" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">John Doe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">john@example.com</span>
                </div>
              </div>

              <Divider
                text="Security Settings"
                $textVariant="bold"
                $margin="lg"
              />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">2FA:</span>
                  <span className="text-green-600">Enabled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Login:</span>
                  <span className="text-gray-500">2 hours ago</span>
                </div>
              </div>
            </div>

            {/* Form con dividers */}
            <div className="bg-white p-6 border rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-4">Contact Form</h4>

              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 border rounded mb-3"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 border rounded mb-3"
              />

              <Divider
                text="Message Details"
                $variant="dashed"
                $color="primary"
                $textVariant="uppercase"
                $margin="lg"
              />

              <textarea
                placeholder="Your message..."
                className="w-full p-2 border rounded h-20 mb-3"
              />

              <Divider $variant="dotted" $color="muted" />

              <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </div>
          </div>

          {/* SEPARATOR Examples */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-green-900 border-b border-green-200 pb-2">
              🔗 SEPARATOR - Lista de Elementos
            </h3>

            {/* Navegación con separators */}
            <div className="bg-white p-6 border rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-4">
                Navigation Examples
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Breadcrumb Navigation:
                  </label>
                  <Separator
                    items={['Home', 'Products', 'Electronics', 'Smartphones']}
                    $separator={<FiChevronRight />}
                    $variant="breadcrumb"
                    onItemClick={(item, index) =>
                      console.log('Navigate to:', item)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Menu Items:
                  </label>
                  <Separator
                    items={['Dashboard', 'Projects', 'Team', 'Settings']}
                    $separator="•"
                    $variant="navigation"
                    onItemClick={(item) => console.log('Go to:', item)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Tags/Categories:
                  </label>
                  <Separator
                    items={['React', 'TypeScript', 'Tailwind', 'Storybook']}
                    $separator="|"
                    $variant="pills"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Social Links:
                  </label>
                  <Separator
                    items={[
                      <span key="1" className="flex items-center gap-1">
                        <FiMail /> Email
                      </span>,
                      <span key="2" className="flex items-center gap-1">
                        <FiPhone /> Phone
                      </span>,
                      <span key="3" className="flex items-center gap-1">
                        <FiUser /> Profile
                      </span>,
                    ]}
                    $separator="/"
                    $variant="default"
                    onItemClick={(item) => console.log('Contact via:', item)}
                  />
                </div>
              </div>
            </div>

            {/* Metadata con separators */}
            <div className="bg-white p-6 border rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-4">
                Article Metadata
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 block">
                    Author & Date:
                  </label>
                  <Separator
                    items={['John Doe', 'Dec 15, 2024', '5 min read']}
                    $separator="•"
                    $size="sm"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 block">
                    Categories:
                  </label>
                  <Separator
                    items={['Technology', 'Frontend', 'React', 'JavaScript']}
                    $separator="/"
                    $variant="pills"
                    $size="sm"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 block">
                    Actions:
                  </label>
                  <Separator
                    items={['Share', 'Save', 'Report', 'Print']}
                    $separator="•"
                    onItemClick={(item) => console.log('Action:', item)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cuándo usar cada uno */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            💡 ¿Cuándo usar cada uno?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-semibold text-blue-800 mb-2">
                Use DIVIDER cuando:
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Separar secciones en forms/cards</li>
                <li>• Dividir contenido visualmente</li>
                <li>• Crear separaciones decorativas</li>
                <li>• Organizar información en grupos</li>
                <li>• Añadir texto descriptivo a separaciones</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-semibold text-green-800 mb-2">
                Use SEPARATOR cuando:
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Mostrar listas de elementos clickeables</li>
                <li>• Crear breadcrumbs de navegación</li>
                <li>• Separar items en menús horizontales</li>
                <li>• Mostrar tags/categorías</li>
                <li>• Crear metadatos con múltiples valores</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// ✅ Todas las variantes de Divider
export const DividerVariants: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-8">
      <div className="grid gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Solid (default)
          </h3>
          <div className="bg-white p-4 border rounded">
            <p>Content above</p>
            <Divider $variant="solid" />
            <p>Content below</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Dashed</h3>
          <div className="bg-white p-4 border rounded">
            <p>Content above</p>
            <Divider $variant="dashed" />
            <p>Content below</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Dotted</h3>
          <div className="bg-white p-4 border rounded">
            <p>Content above</p>
            <Divider $variant="dotted" />
            <p>Content below</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Double</h3>
          <div className="bg-white p-4 border rounded">
            <p>Content above</p>
            <Divider $variant="double" />
            <p>Content below</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Gradient</h3>
          <div className="bg-white p-4 border rounded">
            <p>Content above</p>
            <Divider $variant="gradient" $color="primary" />
            <p>Content below</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Shadow</h3>
          <div className="bg-white p-4 border rounded">
            <p>Content above</p>
            <Divider $variant="shadow" $thickness="thick" />
            <p>Content below</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ✅ Diferentes grosores
export const DividerThickness: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <div className="bg-white p-6 border rounded-lg space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Thin</h3>
          <Divider $thickness="thin" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Default</h3>
          <Divider $thickness="default" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Thick</h3>
          <Divider $thickness="thick" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Thicker</h3>
          <Divider $thickness="thicker" />
        </div>
      </div>
    </div>
  ),
};

// ✅ Dividers con texto
export const DividerWithText: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-8">
      <div className="bg-white p-6 border rounded-lg space-y-8">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Text Positions
          </h3>
          <div className="space-y-6">
            <div>
              <p className="mb-4">Some content above</p>
              <Divider text="Left aligned text" $textPosition="left" />
              <p className="mt-4">Some content below</p>
            </div>

            <div>
              <p className="mb-4">Some content above</p>
              <Divider text="Center aligned text" $textPosition="center" />
              <p className="mt-4">Some content below</p>
            </div>

            <div>
              <p className="mb-4">Some content above</p>
              <Divider text="Right aligned text" $textPosition="right" />
              <p className="mt-4">Some content below</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Text Variants
          </h3>
          <div className="space-y-6">
            <Divider text="Default text style" $textVariant="default" />
            <Divider text="Bold text style" $textVariant="bold" />
            <Divider text="Muted text style" $textVariant="muted" />
            <Divider
              text="Colored text style"
              $textVariant="colored"
              $color="primary"
            />
            <Divider text="UPPERCASE TEXT" $textVariant="uppercase" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// ✅ Dividers con iconos
export const DividerWithIcons: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-8">
      <div className="bg-white p-6 border rounded-lg space-y-8">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Icons Only</h3>
          <div className="space-y-6">
            <Divider icon={<FiStar />} $iconSize="sm" />
            <Divider icon={<FiHeart />} $iconSize="default" />
            <Divider icon={<FiCircle />} $iconSize="lg" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Icons with Text
          </h3>
          <div className="space-y-6">
            <Divider
              icon={<FiStar />}
              text="Featured Content"
              $textVariant="bold"
              $color="accent"
            />
            <Divider
              icon={<FiHeart />}
              text="Favorite Items"
              $textVariant="colored"
              $color="secondary"
            />
            <Divider
              icon={<FiSettings />}
              text="CONFIGURATION"
              $textVariant="uppercase"
              $color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

// ✅ Orientación vertical
export const VerticalDividers: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <div className="bg-white p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-6">
          Vertical Dividers in Layout
        </h3>

        <div className="flex gap-6 h-64">
          {/* Sidebar */}
          <div className="w-48 bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-3">Navigation</h4>
            <nav className="space-y-2">
              <a
                href="#"
                className="block text-sm text-gray-600 hover:text-blue-600">
                Dashboard
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 hover:text-blue-600">
                Projects
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 hover:text-blue-600">
                Team
              </a>
            </nav>
          </div>

          {/* Vertical divider */}
          <Divider
            $orientation="vertical"
            $length="full"
            $variant="solid"
            $thickness="default"
          />

          {/* Main content */}
          <div className="flex-1 p-4">
            <h4 className="font-semibold mb-3">Main Content Area</h4>
            <p className="text-gray-600 text-sm mb-4">
              This is the main content area separated by a vertical divider.
            </p>
            <p className="text-gray-600 text-sm">
              Vertical dividers are useful for creating distinct sections in
              horizontal layouts.
            </p>
          </div>

          {/* Another vertical divider with icon */}
          <Divider
            $orientation="vertical"
            $length="medium"
            $variant="dashed"
            $thickness="thick"
            $color="primary"
            icon={<FiMinus />}
          />

          {/* Sidebar */}
          <div className="w-48 bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-gray-600 hover:text-blue-600">
                New Project
              </button>
              <button className="w-full text-left text-sm text-gray-600 hover:text-blue-600">
                Invite User
              </button>
              <button className="w-full text-left text-sm text-gray-600 hover:text-blue-600">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ✅ Casos de uso reales
export const RealWorldUseCases: Story = {
  render: () => {
    const {
      applyCardDividerPreset,
      applyFormSectionPreset,
      applyNavigationPreset,
      applySidebarPreset,
      applyContentSectionPreset,
    } = useDividerExamples();

    return (
      <div className="w-full max-w-4xl space-y-8">
        {/* Presets buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={applyCardDividerPreset}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
            Card Preset
          </button>
          <button
            onClick={applyFormSectionPreset}
            className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
            Form Preset
          </button>
          <button
            onClick={applyNavigationPreset}
            className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200">
            Navigation Preset
          </button>
          <button
            onClick={applySidebarPreset}
            className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200">
            Sidebar Preset
          </button>
          <button
            onClick={applyContentSectionPreset}
            className="px-3 py-1 text-xs bg-pink-100 text-pink-700 rounded hover:bg-pink-200">
            Content Preset
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* User Profile Card */}
          <div className="bg-white border rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiUser className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Sarah Johnson</h3>
                <p className="text-sm text-gray-600">Product Designer</p>
              </div>
            </div>

            <Divider $variant="solid" $color="muted" $thickness="thin" />

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Department:</span>
                <span>Design Team</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span>San Francisco</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Joined:</span>
                <span>March 2023</span>
              </div>
            </div>

            <Divider
              text="Contact Information"
              $textVariant="bold"
              $margin="lg"
              $variant="dashed"
              $color="primary"
            />

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FiMail className="text-gray-400" />
                <span>sarah.johnson@company.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FiPhone className="text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Article/Blog Card */}
          <div className="bg-white border rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">
              Getting Started with React Hooks
            </h3>
            <div className="mb-4">
              <Separator
                items={['React', 'JavaScript', 'Frontend', 'Tutorial']}
                $separator="•"
                $variant="pills"
                $size="sm"
              />
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Learn the fundamentals of React Hooks and how they can simplify
              your component logic...
            </p>

            <Divider $variant="gradient" $color="accent" $margin="lg" />

            <div className="flex justify-between items-center text-sm text-gray-600">
              <Separator
                items={['John Doe', 'Dec 15, 2024', '8 min read']}
                $separator="•"
                $size="sm"
              />
              <div className="flex items-center gap-2">
                <FiHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
                <span>42</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Section */}
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Dashboard Overview</h3>
            <Separator
              items={['Today', 'Week', 'Month', 'Year']}
              $separator="|"
              $variant="navigation"
              $size="sm"
              onItemClick={(item) => console.log('Filter by:', item)}
            />
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">1,234</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">$45,678</div>
              <div className="text-sm text-gray-600">Revenue</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">89%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded">
              <div className="text-2xl font-bold text-orange-600">234</div>
              <div className="text-sm text-gray-600">Orders</div>
            </div>
          </div>

          <Divider
            text="RECENT ACTIVITY"
            $textVariant="uppercase"
            $variant="double"
            $color="primary"
            $margin="lg"
          />

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm">New user registration</span>
              <span className="text-xs text-gray-500">2 minutes ago</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm">Payment received</span>
              <span className="text-xs text-gray-500">5 minutes ago</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm">Order completed</span>
              <span className="text-xs text-gray-500">10 minutes ago</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// ✅ Configuración interactiva
export const InteractiveConfiguration: Story = {
  render: () => {
    const {
      currentVariant,
      currentOrientation,
      currentThickness,
      currentColorScheme,
      currentColor,
      withText,
      dividerText,
      textPosition,
      textVariant,
      withIcon,
      animated,
      animationType,
      marginSize,
      setCurrentVariant,
      setCurrentOrientation,
      setCurrentThickness,
      setCurrentColorScheme,
      setCurrentColor,
      setWithText,
      setDividerText,
      setTextPosition,
      setTextVariant,
      setWithIcon,
      setAnimated,
      setAnimationType,
      setMarginSize,
      resetAllDivider,
      toggleAllFeatures,
    } = useDividerExamples();

    return (
      <div className="w-full max-w-5xl space-y-8">
        {/* Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Variant
            </label>
            <select
              value={currentVariant}
              onChange={(e) => setCurrentVariant(e.target.value as any)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
              <option value="gradient">Gradient</option>
              <option value="shadow">Shadow</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Orientation
            </label>
            <select
              value={currentOrientation}
              onChange={(e) => setCurrentOrientation(e.target.value as any)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thickness
            </label>
            <select
              value={currentThickness}
              onChange={(e) => setCurrentThickness(e.target.value as any)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
              <option value="thin">Thin</option>
              <option value="default">Default</option>
              <option value="thick">Thick</option>
              <option value="thicker">Thicker</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color Scheme (theme.css)
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
              Color (Legacy)
            </label>
            <select
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value as any)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
              <option value="default">Default</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="accent">Accent</option>
              <option value="muted">Muted</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text Position
            </label>
            <select
              value={textPosition}
              onChange={(e) => setTextPosition(e.target.value as any)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text Variant
            </label>
            <select
              value={textVariant}
              onChange={(e) => setTextVariant(e.target.value as any)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
              <option value="default">Default</option>
              <option value="bold">Bold</option>
              <option value="muted">Muted</option>
              <option value="colored">Colored</option>
              <option value="uppercase">Uppercase</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Animation
            </label>
            <select
              value={animationType}
              onChange={(e) => setAnimationType(e.target.value as any)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
              <option value="fade">Fade</option>
              <option value="slide">Slide</option>
              <option value="pulse">Pulse</option>
              <option value="glow">Glow</option>
              <option value="grow">Grow</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Margin
            </label>
            <select
              value={marginSize}
              onChange={(e) => setMarginSize(e.target.value as any)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
              <option value="none">None</option>
              <option value="xs">XS</option>
              <option value="sm">Small</option>
              <option value="default">Default</option>
              <option value="lg">Large</option>
              <option value="xl">XL</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text Content
            </label>
            <input
              type="text"
              value={dividerText}
              onChange={(e) => setDividerText(e.target.value)}
              placeholder="Enter text..."
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
            />
          </div>

          <div className="flex items-center space-x-4 col-span-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={withText}
                onChange={(e) => setWithText(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Show Text</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={withIcon}
                onChange={(e) => setWithIcon(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Show Icon</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={animated}
                onChange={(e) => setAnimated(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Animated</span>
            </label>
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetAllDivider}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
              Reset
            </button>
            <button
              onClick={toggleAllFeatures}
              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
              Toggle All
            </button>
          </div>
        </div>

        {/* Interactive Divider Preview */}
        <div className="bg-white p-8 border rounded-lg">
          <h3 className="text-lg font-semibold mb-6">
            Interactive Divider Preview
          </h3>

          {currentOrientation === 'horizontal' ? (
            <div>
              <p className="mb-4 text-gray-600">Content above the divider</p>
              <Divider
                $variant={currentVariant}
                $orientation={currentOrientation}
                $thickness={currentThickness}
                $colorScheme={currentColorScheme}
                text={withText ? dividerText : undefined}
                $textPosition={textPosition}
                $textVariant={textVariant}
                icon={withIcon ? <FiStar /> : undefined}
                $animated={animated}
                $animationType={animationType}
                $margin={marginSize}
              />
              <p className="mt-4 text-gray-600">Content below the divider</p>
            </div>
          ) : (
            <div className="flex gap-6 h-48">
              <div className="flex-1 bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">Left Content</h4>
                <p className="text-sm text-gray-600">
                  Content on the left side
                </p>
              </div>

              <Divider
                $variant={currentVariant}
                $orientation={currentOrientation}
                $thickness={currentThickness}
                $colorScheme={currentColorScheme}
                text={withText ? dividerText : undefined}
                $textPosition={textPosition}
                $textVariant={textVariant}
                icon={withIcon ? <FiStar /> : undefined}
                $animated={animated}
                $animationType={animationType}
                $length="full"
              />

              <div className="flex-1 bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">Right Content</h4>
                <p className="text-sm text-gray-600">
                  Content on the right side
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Configuration Info */}
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
          <strong>Current Configuration:</strong> variant={currentVariant},
          orientation={currentOrientation}, thickness={currentThickness},
          colorScheme={currentColorScheme} (theme.css), legacyColor=
          {currentColor}, withText={withText.toString()}, animated=
          {animated.toString()}, margin={marginSize}
        </div>
      </div>
    );
  },
};

