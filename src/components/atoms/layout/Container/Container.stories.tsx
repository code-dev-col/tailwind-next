import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Atoms/Container',
  component: Container,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'El contenido del contenedor',
    },
    $position: {
      control: 'select',
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      description: 'Tipo de posicionamiento CSS',
    },
    $display: {
      control: 'select',
      options: [
        'block',
        'inline-block',
        'inline',
        'flex',
        'inline-flex',
        'grid',
        'inline-grid',
        'none',
        'contents',
      ],
      description: 'Tipo de display',
    },
    $float: {
      control: 'select',
      options: ['left', 'right', 'none'],
      description: 'Flotación del elemento',
    },
    $flexDirection: {
      control: 'select',
      options: ['row', 'row-reverse', 'col', 'col-reverse'],
      description: 'Dirección del flex container',
    },
    $justifyContent: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      description: 'Justificación del contenido',
    },
    $alignItems: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
      description: 'Alineación de elementos',
    },
    $flexWrap: {
      control: 'select',
      options: ['wrap', 'wrap-reverse', 'nowrap'],
      description: 'Envoltorio de elementos flex',
    },
    $gap: {
      control: 'text',
      description: 'Espaciado entre elementos (gap-4, 1rem, etc.)',
    },
    $margin: {
      control: 'text',
      description: 'Margen (m-4, 1rem, etc.)',
    },
    $padding: {
      control: 'text',
      description: 'Relleno (p-4, 1rem, etc.)',
    },
    $width: {
      control: 'text',
      description: 'Ancho (w-64, 100%, 300px, etc.)',
    },
    $height: {
      control: 'text',
      description: 'Alto (h-32, 200px, auto, etc.)',
    },
    $backgroundColor: {
      control: 'text',
      description: 'Color de fondo (bg-blue-500, #3b82f6, etc.)',
    },
    $backgroundGradient: {
      control: 'text',
      description:
        'Gradiente de fondo (bg-gradient-to-r from-blue-500 to-purple-600)',
    },
    $borderRadius: {
      control: 'text',
      description: 'Radio de borde (rounded-lg, 8px, etc.)',
    },
    $boxShadow: {
      control: 'text',
      description: 'Sombra (shadow-lg, 0 4px 6px rgba(0,0,0,0.1), etc.)',
    },
    $isShadow: {
      control: 'boolean',
      description: 'Habilitar sombra por defecto (shadow-sm)',
    },
    $overflow: {
      control: 'select',
      options: ['visible', 'hidden', 'scroll', 'auto'],
      description: 'Comportamiento de desbordamiento',
    },
    $cursor: {
      control: 'select',
      options: [
        'default',
        'pointer',
        'not-allowed',
        'help',
        'wait',
        'text',
        'move',
        'grab',
        'grabbing',
      ],
      description: 'Tipo de cursor',
    },
    $zIndex: {
      control: { type: 'number', min: 0, max: 50 },
      description: 'Índice z',
    },
    $opacity: {
      control: { type: 'number', min: 0, max: 100, step: 5 },
      description: 'Opacidad (0-100)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Container básico con contenido de ejemplo',
    $padding: 'p-4',
    $backgroundColor: 'bg-gray-100',
    $borderRadius: 'rounded-lg',
  },
};

export const DisplayTypes: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Container
        $display="block"
        $padding="p-4"
        $backgroundColor="bg-blue-100"
        $borderRadius="rounded">
        <strong>Block:</strong> Contenedor en bloque (ancho completo)
      </Container>
      <Container
        $display="inline-block"
        $padding="p-4"
        $backgroundColor="bg-green-100"
        $borderRadius="rounded">
        <strong>Inline-block:</strong> En línea con bloque
      </Container>
      <Container
        $display="flex"
        $padding="p-4"
        $backgroundColor="bg-purple-100"
        $borderRadius="rounded"
        $gap="gap-2">
        <div className="bg-white p-2 rounded">Item 1</div>
        <div className="bg-white p-2 rounded">Item 2</div>
        <div className="bg-white p-2 rounded">Item 3</div>
      </Container>
    </div>
  ),
};

export const PositionTypes: Story = {
  render: () => (
    <div className="relative h-64 w-full border-2 border-dashed border-gray-300 rounded-lg">
      <Container
        $position="relative"
        $padding="p-2"
        $backgroundColor="bg-blue-500"
        $color="text-white"
        $borderRadius="rounded"
        className="mb-2">
        Relative: Posicionamiento relativo
      </Container>

      <Container
        $position="absolute"
        $top="20px"
        $right="20px"
        $padding="p-2"
        $backgroundColor="bg-red-500"
        $color="text-white"
        $borderRadius="rounded">
        Absolute: Top-right
      </Container>

      <Container
        $position="absolute"
        $bottom="20px"
        $left="20px"
        $padding="p-2"
        $backgroundColor="bg-green-500"
        $color="text-white"
        $borderRadius="rounded">
        Absolute: Bottom-left
      </Container>
    </div>
  ),
};

export const FlexLayouts: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-2 font-semibold">Flex Row con justify-center:</h4>
        <Container
          $display="flex"
          $flexDirection="row"
          $justifyContent="center"
          $alignItems="center"
          $gap="gap-4"
          $padding="p-4"
          $backgroundColor="bg-gray-100"
          $borderRadius="rounded-lg"
          $height="h-20">
          <div className="bg-blue-500 text-white p-2 rounded">Item 1</div>
          <div className="bg-green-500 text-white p-2 rounded">Item 2</div>
          <div className="bg-purple-500 text-white p-2 rounded">Item 3</div>
        </Container>
      </div>

      <div>
        <h4 className="mb-2 font-semibold">Flex Column con justify-between:</h4>
        <Container
          $display="flex"
          $flexDirection="col"
          $justifyContent="between"
          $alignItems="center"
          $gap="gap-2"
          $padding="p-4"
          $backgroundColor="bg-slate-100"
          $borderRadius="rounded-lg"
          $height="h-40">
          <div className="bg-orange-500 text-white p-2 rounded w-24 text-center">
            Header
          </div>
          <div className="bg-yellow-500 text-white p-2 rounded w-24 text-center">
            Content
          </div>
          <div className="bg-red-500 text-white p-2 rounded w-24 text-center">
            Footer
          </div>
        </Container>
      </div>
    </div>
  ),
};

export const SpacingAndDimensions: Story = {
  render: () => (
    <div className="space-y-4">
      <Container
        $margin="m-4"
        $padding="p-6"
        $width="w-64"
        $height="h-32"
        $backgroundColor="bg-blue-200"
        $borderRadius="rounded-xl">
        Ancho fijo (w-64) y alto fijo (h-32)
      </Container>

      <Container
        $margin="mx-auto"
        $padding="px-8 py-4"
        $maxWidth="max-w-md"
        $backgroundColor="bg-green-200"
        $borderRadius="rounded-lg">
        Centrado con ancho máximo
      </Container>

      <Container
        $padding="p-3"
        $width="50%"
        $height="80px"
        $backgroundColor="bg-purple-200"
        $borderRadius="rounded">
        Ancho 50% personalizado
      </Container>
    </div>
  ),
};

export const BackgroundsAndGradients: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Container
        $padding="p-6"
        $backgroundColor="bg-blue-500"
        $color="text-white"
        $borderRadius="rounded-lg"
        $textAlign="center">
        Fondo sólido azul
      </Container>

      <Container
        $padding="p-6"
        $backgroundGradient="bg-gradient-to-r from-purple-500 to-pink-500"
        $color="text-white"
        $borderRadius="rounded-lg"
        $textAlign="center">
        Gradiente púrpura a rosa
      </Container>

      <Container
        $padding="p-6"
        $backgroundGradient="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600"
        $color="text-white"
        $borderRadius="rounded-lg"
        $textAlign="center">
        Gradiente multi-color
      </Container>

      <Container
        $padding="p-6"
        $backgroundColor="#f59e0b"
        $color="text-white"
        $borderRadius="rounded-lg"
        $textAlign="center">
        Color personalizado (hex)
      </Container>
    </div>
  ),
};

export const BordersAndShadows: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Container
        $padding="p-4"
        $backgroundColor="bg-white"
        $borderWidth="border-2"
        $borderColor="border-blue-500"
        $borderRadius="rounded-lg"
        $boxShadow="shadow-md">
        Borde azul con sombra media
      </Container>

      <Container
        $padding="p-4"
        $backgroundColor="bg-white"
        $borderWidth="border-4"
        $borderColor="border-red-500"
        $borderStyle="dashed"
        $borderRadius="rounded-xl"
        $boxShadow="shadow-lg">
        Borde rojo discontinuo
      </Container>

      <Container
        $padding="p-4"
        $backgroundColor="bg-gradient-to-r from-yellow-200 to-orange-200"
        $borderRadius="rounded-2xl"
        $boxShadow="shadow-xl">
        Sombra extra grande
      </Container>

      <Container
        $padding="p-4"
        $backgroundColor="bg-white"
        $borderRadius="50%"
        $width="w-32"
        $height="h-32"
        $display="flex"
        $alignItems="center"
        $justifyContent="center"
        $boxShadow="shadow-2xl">
        Circular
      </Container>
    </div>
  ),
};

export const ShadowToggle: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-4 text-lg font-semibold">
          Demostración del prop $isShadow
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Container
            $padding="p-6"
            $backgroundColor="bg-white"
            $borderRadius="rounded-lg"
            $isShadow={false}>
            <div className="text-center">
              <h5 className="font-medium mb-2">Sin sombra</h5>
              <p className="text-gray-600 text-sm">$isShadow={`{false}`}</p>
            </div>
          </Container>

          <Container
            $padding="p-6"
            $backgroundColor="bg-white"
            $borderRadius="rounded-lg"
            $isShadow={true}>
            <div className="text-center">
              <h5 className="font-medium mb-2">Con sombra por defecto</h5>
              <p className="text-gray-600 text-sm">$isShadow={`{true}`}</p>
            </div>
          </Container>
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-semibold">
          Prioridad: $boxShadow sobre $isShadow
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Container
            $padding="p-6"
            $backgroundColor="bg-blue-50"
            $borderRadius="rounded-lg"
            $isShadow={true}>
            <div className="text-center">
              <h5 className="font-medium mb-2">Solo $isShadow</h5>
              <p className="text-gray-600 text-sm">shadow-sm aplicado</p>
            </div>
          </Container>

          <Container
            $padding="p-6"
            $backgroundColor="bg-purple-50"
            $borderRadius="rounded-lg"
            $isShadow={true}
            $boxShadow="shadow-xl">
            <div className="text-center">
              <h5 className="font-medium mb-2">$boxShadow + $isShadow</h5>
              <p className="text-gray-600 text-sm">
                $boxShadow tiene prioridad (shadow-xl)
              </p>
            </div>
          </Container>
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-semibold">Casos de uso comunes</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Container
            $padding="p-4"
            $backgroundColor="bg-white"
            $borderRadius="rounded-lg"
            $isShadow={true}>
            <h6 className="font-medium mb-2">Card básica</h6>
            <p className="text-sm text-gray-600">
              Usa $isShadow para cards simples
            </p>
          </Container>

          <Container
            $padding="p-4"
            $backgroundColor="bg-white"
            $borderRadius="rounded-lg"
            $isShadow={true}
            $cursor="pointer"
            $transition="transition-all duration-200 hover:shadow-lg">
            <h6 className="font-medium mb-2">Card interactiva</h6>
            <p className="text-sm text-gray-600">Hover para más sombra</p>
          </Container>

          <Container
            $padding="p-4"
            $backgroundColor="bg-white"
            $borderRadius="rounded-lg"
            $isShadow={true}
            $borderWidth="border"
            $borderColor="border-gray-200">
            <h6 className="font-medium mb-2">Card con borde</h6>
            <p className="text-sm text-gray-600">Sombra + borde sutil</p>
          </Container>
        </div>
      </div>
    </div>
  ),
};

export const OverflowBehavior: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Container
        $width="w-48"
        $height="h-24"
        $padding="p-4"
        $backgroundColor="bg-gray-100"
        $borderRadius="rounded"
        $overflow="hidden">
        <div className="text-lg">
          Este contenido es muy largo y será cortado por el contenedor con
          overflow hidden.
        </div>
      </Container>

      <Container
        $width="w-48"
        $height="h-24"
        $padding="p-4"
        $backgroundColor="bg-blue-100"
        $borderRadius="rounded"
        $overflow="scroll">
        <div className="text-lg">
          Este contenido es muy largo y será desplazable porque el contenedor
          tiene overflow scroll habilitado.
        </div>
      </Container>

      <Container
        $width="w-48"
        $height="h-24"
        $padding="p-4"
        $backgroundColor="bg-green-100"
        $borderRadius="rounded"
        $overflowX="hidden"
        $overflowY="auto">
        <div className="text-lg whitespace-nowrap">
          Contenido muy ancho que se corta horizontalmente pero se puede
          desplazar verticalmente si es necesario.
        </div>
      </Container>

      <Container
        $width="w-48"
        $height="h-24"
        $padding="p-4"
        $backgroundColor="bg-yellow-100"
        $borderRadius="rounded"
        $overflow="visible">
        <div className="text-lg">
          Este contenido puede desbordar visiblemente fuera del contenedor.
        </div>
      </Container>
    </div>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Container
        $padding="p-4"
        $backgroundColor="bg-blue-500"
        $color="text-white"
        $borderRadius="rounded-lg"
        $cursor="pointer"
        $transition="transition-all duration-300 hover:bg-blue-600 hover:shadow-lg"
        $textAlign="center">
        Hover me (pointer)
      </Container>

      <Container
        $padding="p-4"
        $backgroundColor="bg-gray-300"
        $color="text-gray-600"
        $borderRadius="rounded-lg"
        $cursor="not-allowed"
        $textAlign="center">
        Disabled state
      </Container>

      <Container
        $padding="p-4"
        $backgroundColor="bg-green-500"
        $color="text-white"
        $borderRadius="rounded-lg"
        $cursor="grab"
        $transition="transition-transform duration-200 hover:scale-105"
        $textAlign="center">
        Draggable (grab)
      </Container>
    </div>
  ),
};

export const AdvancedEffects: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Container
        $padding="p-6"
        $backgroundColor="bg-white"
        $borderRadius="rounded-xl"
        $boxShadow="shadow-2xl"
        $opacity={90}
        $transform="rotate(2deg)">
        Rotado con opacidad 90%
      </Container>

      <Container
        $padding="p-6"
        $backgroundGradient="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        $color="text-white"
        $borderRadius="rounded-xl"
        $animation="animate-pulse"
        $backdropBlur="sm">
        Con animación pulse
      </Container>

      <Container
        $padding="p-6"
        $backgroundColor="bg-black bg-opacity-20"
        $color="text-white"
        $borderRadius="rounded-xl"
        $backdropBlur="md"
        $borderWidth="border"
        $borderColor="border-white border-opacity-20">
        Efecto glassmorphism
      </Container>

      <Container
        $padding="p-6"
        $backgroundGradient="bg-gradient-to-br from-yellow-300 to-red-500"
        $borderRadius="rounded-xl"
        $boxShadow="shadow-xl"
        $transform="scale(1.05)"
        $zIndex={10}>
        Escalado con z-index alto
      </Container>
    </div>
  ),
};

export const ResponsiveLayout: Story = {
  render: () => (
    <div className="space-y-4">
      <Container
        $display="flex"
        $flexDirection="col"
        $gap="gap-4"
        $padding="p-4"
        $backgroundColor="bg-gray-50"
        $borderRadius="rounded-lg"
        $custom="md:flex-row md:gap-6">
        <Container
          $backgroundColor="bg-blue-500"
          $color="text-white"
          $padding="p-4"
          $borderRadius="rounded"
          $width="w-full"
          $custom="md:w-1/3">
          Sidebar
        </Container>
        <Container
          $backgroundColor="bg-white"
          $padding="p-4"
          $borderRadius="rounded"
          $boxShadow="shadow-sm"
          $width="w-full"
          $custom="md:w-2/3">
          Contenido principal que se adapta a diferentes tamaños de pantalla
        </Container>
      </Container>
    </div>
  ),
};

export const NeumorphicEffects: Story = {
  render: () => (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Efectos Neumórficos - Container
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre cómo el componente Container puede crear efectos
            neumórficos modernos para layouts y estructuras
          </p>
        </div>

        {/* Basic Neumorphic Containers */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Contenedores Neumórficos Básicos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Container
              $padding="p-8"
              $borderRadius="rounded-2xl"
              $backgroundColor="bg-gray-100"
              $custom="shadow-neumorphic transition-neumorphic hover:shadow-neumorphic-soft">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  Contenedor Básico
                </h4>
                <p className="text-gray-600 text-sm">
                  Efecto neumórfico estándar con sombras suaves
                </p>
              </div>
            </Container>

            <Container
              $padding="p-8"
              $borderRadius="rounded-2xl"
              $backgroundColor="bg-gray-100"
              $custom="shadow-neumorphic-soft transition-neumorphic hover:shadow-neumorphic">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  Contenedor Suave
                </h4>
                <p className="text-gray-600 text-sm">
                  Sombras más sutiles para elementos secundarios
                </p>
              </div>
            </Container>

            <Container
              $padding="p-8"
              $borderRadius="rounded-2xl"
              $backgroundColor="bg-gray-100"
              $custom="shadow-neumorphic-inner transition-neumorphic">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  Contenedor Hundido
                </h4>
                <p className="text-gray-600 text-sm">
                  Efecto de profundidad hacia adentro
                </p>
              </div>
            </Container>
          </div>
        </section>

        {/* Layout Structures */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Estructuras de Layout Neumórficas
          </h3>

          {/* Card Layout */}
          <Container
            $padding="p-8"
            $borderRadius="rounded-3xl"
            $backgroundColor="bg-gray-100"
            $custom="shadow-neumorphic">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Container
                $padding="p-6"
                $borderRadius="rounded-xl"
                $backgroundColor="bg-gray-100"
                $custom="shadow-neumorphic-inner-soft">
                <h4 className="text-md font-semibold text-gray-700 mb-3">
                  Sidebar
                </h4>
                <div className="space-y-3">
                  <Container
                    $padding="p-3"
                    $borderRadius="rounded-lg"
                    $backgroundColor="bg-gray-100"
                    $custom="shadow-neumorphic-inner transition-neumorphic hover:shadow-neumorphic-inner-soft cursor-pointer">
                    <span className="text-sm text-gray-600">Navegación 1</span>
                  </Container>
                  <Container
                    $padding="p-3"
                    $borderRadius="rounded-lg"
                    $backgroundColor="bg-gray-100"
                    $custom="shadow-neumorphic-inner transition-neumorphic hover:shadow-neumorphic-inner-soft cursor-pointer">
                    <span className="text-sm text-gray-600">Navegación 2</span>
                  </Container>
                </div>
              </Container>

              <div className="lg:col-span-2 space-y-4">
                <Container
                  $padding="p-6"
                  $borderRadius="rounded-xl"
                  $backgroundColor="bg-gray-100"
                  $custom="shadow-neumorphic-soft">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">
                    Contenido Principal
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Esta es una demostración de un layout completo usando
                    efectos neumórficos. Cada sección tiene profundidad visual
                    única.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <Container
                      $padding="p-4"
                      $borderRadius="rounded-lg"
                      $backgroundColor="bg-gray-100"
                      $custom="shadow-neumorphic-inner transition-neumorphic hover:shadow-neumorphic cursor-pointer">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          24
                        </div>
                        <div className="text-xs text-gray-600">Proyectos</div>
                      </div>
                    </Container>
                    <Container
                      $padding="p-4"
                      $borderRadius="rounded-lg"
                      $backgroundColor="bg-gray-100"
                      $custom="shadow-neumorphic-inner transition-neumorphic hover:shadow-neumorphic cursor-pointer">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          87%
                        </div>
                        <div className="text-xs text-gray-600">Completado</div>
                      </div>
                    </Container>
                  </div>
                </Container>
              </div>
            </div>
          </Container>
        </section>

        {/* Interactive Dashboard */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Dashboard Neumórfico Interactivo
          </h3>
          <Container
            $padding="p-8"
            $borderRadius="rounded-3xl"
            $backgroundColor="bg-gray-100"
            $custom="shadow-neumorphic">
            {/* Header del Dashboard */}
            <Container
              $display="flex"
              $justifyContent="between"
              $alignItems="center"
              $padding="p-6 mb-6"
              $borderRadius="rounded-xl"
              $backgroundColor="bg-gray-100"
              $custom="shadow-neumorphic-inner-soft">
              <div>
                <h4 className="text-xl font-bold text-gray-800">
                  Panel de Control
                </h4>
                <p className="text-sm text-gray-600">
                  Gestión de proyectos neumórfica
                </p>
              </div>
              <Container
                $padding="px-6 py-3"
                $borderRadius="rounded-full"
                $backgroundColor="bg-gray-100"
                $cursor="pointer"
                $custom="shadow-neumorphic transition-neumorphic hover:shadow-neumorphic-soft">
                <span className="text-sm font-medium text-gray-700">
                  + Nuevo
                </span>
              </Container>
            </Container>

            {/* Grid de Métricas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Usuarios', value: '1,234', color: 'text-blue-600' },
                { label: 'Ventas', value: '$89K', color: 'text-green-600' },
                {
                  label: 'Conversión',
                  value: '12.5%',
                  color: 'text-orange-600',
                },
                {
                  label: 'Crecimiento',
                  value: '+23%',
                  color: 'text-purple-600',
                },
              ].map((metric, index) => (
                <Container
                  key={index}
                  $padding="p-6"
                  $borderRadius="rounded-xl"
                  $backgroundColor="bg-gray-100"
                  $cursor="pointer"
                  $custom="shadow-neumorphic-inner transition-neumorphic hover:shadow-neumorphic-inner-soft group">
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${metric.color} mb-2 transition-transform group-hover:scale-110`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                  </div>
                </Container>
              ))}
            </div>

            {/* Área de Gráficos Simulada */}
            <Container
              $padding="p-8"
              $borderRadius="rounded-xl"
              $backgroundColor="bg-gray-100"
              $custom="shadow-neumorphic-inner">
              <h5 className="text-lg font-semibold text-gray-700 mb-6">
                Análisis de Rendimiento
              </h5>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Container
                  $padding="p-6"
                  $borderRadius="rounded-lg"
                  $backgroundColor="bg-gray-100"
                  $custom="shadow-neumorphic-soft">
                  <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg opacity-20 mb-4"></div>
                  <p className="text-sm text-gray-600 text-center">
                    Gráfico de Barras Neumórfico
                  </p>
                </Container>
                <Container
                  $padding="p-6"
                  $borderRadius="rounded-lg"
                  $backgroundColor="bg-gray-100"
                  $custom="shadow-neumorphic-soft">
                  <div className="h-32 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-20 mb-4 mx-auto w-32"></div>
                  <p className="text-sm text-gray-600 text-center">
                    Gráfico Circular Neumórfico
                  </p>
                </Container>
              </div>
            </Container>
          </Container>
        </section>

        {/* Form Layout Neumórfico */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Formulario con Layout Neumórfico
          </h3>
          <Container
            $maxWidth="max-w-2xl"
            $margin="mx-auto"
            $padding="p-8"
            $borderRadius="rounded-3xl"
            $backgroundColor="bg-gray-100"
            $custom="shadow-neumorphic">
            <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Contacto Neumórfico
            </h4>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Container
                  $padding="p-4"
                  $borderRadius="rounded-xl"
                  $backgroundColor="bg-gray-100"
                  $custom="shadow-neumorphic-inner-soft focus-within:shadow-neumorphic-inner transition-neumorphic">
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
                  />
                </Container>
                <Container
                  $padding="p-4"
                  $borderRadius="rounded-xl"
                  $backgroundColor="bg-gray-100"
                  $custom="shadow-neumorphic-inner-soft focus-within:shadow-neumorphic-inner transition-neumorphic">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
                  />
                </Container>
              </div>

              <Container
                $padding="p-4"
                $borderRadius="rounded-xl"
                $backgroundColor="bg-gray-100"
                $custom="shadow-neumorphic-inner-soft focus-within:shadow-neumorphic-inner transition-neumorphic">
                <textarea
                  placeholder="Mensaje"
                  rows={4}
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500 resize-none"
                />
              </Container>

              <Container
                $padding="py-4 px-8"
                $borderRadius="rounded-full"
                $backgroundColor="bg-gray-100"
                $cursor="pointer"
                $margin="mx-auto"
                $width="w-fit"
                $custom="shadow-neumorphic transition-neumorphic hover:shadow-neumorphic-soft active:shadow-neumorphic-inner">
                <span className="text-gray-700 font-medium">
                  Enviar Mensaje
                </span>
              </Container>
            </div>
          </Container>
        </section>

        {/* Guía de Implementación */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Guía de Implementación
          </h3>
          <Container
            $padding="p-8"
            $borderRadius="rounded-2xl"
            $backgroundColor="bg-gray-100"
            $custom="shadow-neumorphic-inner">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                  Clases CSS Disponibles
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                      shadow-neumorphic
                    </code>
                    <span className="text-gray-600">Efecto principal</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                      shadow-neumorphic-soft
                    </code>
                    <span className="text-gray-600">Efecto suave</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                      shadow-neumorphic-inner
                    </code>
                    <span className="text-gray-600">Efecto hundido</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                      transition-neumorphic
                    </code>
                    <span className="text-gray-600">Transiciones suaves</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                  Mejores Prácticas
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Usa bg-gray-100 como fondo base</li>
                  <li>• Combina con border-radius grandes (rounded-xl+)</li>
                  <li>• Añade transition-neumorphic para interactividad</li>
                  <li>• Usa efectos inner para campos de entrada</li>
                  <li>• Mantén consistencia en toda la interfaz</li>
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </div>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <Container
      $maxWidth="max-w-4xl"
      $margin="mx-auto"
      $padding="p-6"
      $backgroundColor="bg-gradient-to-br from-slate-50 to-slate-100"
      $borderRadius="rounded-2xl"
      $boxShadow="shadow-2xl">
      {/* Header */}
      <Container
        $display="flex"
        $justifyContent="between"
        $alignItems="center"
        $padding="pb-6"
        $borderWidth="border-b"
        $borderColor="border-gray-200"
        $margin="mb-6">
        <Container as="h1" $color="text-3xl font-bold text-gray-800">
          Container Component Demo
        </Container>
        <Container
          $backgroundColor="bg-blue-500"
          $color="text-white"
          $padding="px-4 py-2"
          $borderRadius="rounded-full"
          $cursor="pointer"
          $transition="transition-colors hover:bg-blue-600">
          Action
        </Container>
      </Container>

      {/* Content Grid */}
      <Container
        $display="grid"
        $gap="gap-6"
        $custom="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Container
            key={item}
            $backgroundColor="bg-white"
            $padding="p-6"
            $borderRadius="rounded-xl"
            $boxShadow="shadow-lg"
            $cursor="pointer"
            $transition="transition-all duration-300 hover:shadow-xl hover:scale-105"
            $position="relative"
            $overflow="hidden">
            <Container
              $position="absolute"
              $top="0"
              $left="0"
              $width="w-full"
              $height="h-1"
              $backgroundGradient={`bg-gradient-to-r ${
                item % 3 === 0
                  ? 'from-blue-500 to-purple-600'
                  : item % 2 === 0
                    ? 'from-green-500 to-teal-600'
                    : 'from-pink-500 to-rose-600'
              }`}
            />

            <Container
              as="h3"
              $color="text-lg font-semibold text-gray-800"
              $margin="mb-3">
              Card {item}
            </Container>

            <Container $color="text-gray-600" $margin="mb-4">
              Este es un ejemplo de card creado completamente con el componente
              Container, mostrando su versatilidad y poder.
            </Container>

            <Container
              $display="flex"
              $justifyContent="between"
              $alignItems="center">
              <Container
                $backgroundColor="bg-gray-100"
                $color="text-gray-700"
                $padding="px-3 py-1"
                $borderRadius="rounded-full"
                $custom="text-sm">
                Tag {item}
              </Container>

              <Container
                $color="text-blue-500 hover:text-blue-700"
                $cursor="pointer"
                $transition="transition-colors"
                $custom="text-sm font-medium">
                Ver más →
              </Container>
            </Container>
          </Container>
        ))}
      </Container>

      {/* Footer */}
      <Container
        $margin="mt-8 pt-6"
        $borderWidth="border-t"
        $borderColor="border-gray-200"
        $textAlign="center"
        $color="text-gray-600">
        Container component - Máxima flexibilidad para cualquier layout
      </Container>
    </Container>
  ),
};

