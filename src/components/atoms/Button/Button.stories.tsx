import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  FaDownload,
  FaPlus,
  FaArrowRight,
  FaArrowLeft,
  FaHeart,
  FaStar,
  FaCheck,
  FaTimes,
  FaHome,
  FaUser,
} from 'react-icons/fa';
import { Button, ButtonProps } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
      description: 'Visual style variant of the button',
    },
    $size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
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
    children: 'Button',
    $variant: 'default',
    $size: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    $variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    $variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    $variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    $variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    $variant: 'link',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    $size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    $size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    children: '🚀',
    $size: 'icon',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const WithCustomClasses: Story = {
  args: {
    children: 'Custom Styled',
    $custom: 'shadow-lg transform hover:scale-105 transition-all',
  },
};

export const CustomBackground: Story = {
  args: {
    children: 'Red Background',
    $custom: 'bg-red-50 text-red-700 hover:bg-red-100',
  },
};

export const WithShadows: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8 bg-gray-50">
      <div className="space-y-4">
        <h3 className="font-semibold">Default Shadow (shadow-sm)</h3>
        <div className="flex gap-4">
          <Button $variant="default">Default Button</Button>
          <Button $variant="outline">Outline Button</Button>
          <Button $variant="secondary">Secondary Button</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Enhanced Shadows</h3>
        <div className="flex gap-4">
          <Button $custom="shadow-md">Medium Shadow</Button>
          <Button $custom="shadow-lg">Large Shadow</Button>
          <Button $custom="shadow-xl">Extra Large Shadow</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Colored Shadows</h3>
        <div className="flex gap-4">
          <Button $custom="bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-200">
            Blue Shadow
          </Button>
          <Button $custom="bg-purple-500 text-white hover:bg-purple-600 shadow-lg shadow-purple-200">
            Purple Shadow
          </Button>
          <Button $custom="bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-200">
            Green Shadow
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Todos los botones tienen shadow-sm por defecto. Puedes usar $custom para agregar diferentes niveles de sombra.',
      },
    },
  },
};

export const VisualDifferences: Story = {
  render: () => (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Diferencias Visuales de Variantes
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-700">
                Default (Primary)
              </h3>
              <Button $variant="default" className="w-full">
                Botón Principal - Azul Vibrante
              </Button>
              <p className="text-sm text-gray-600">
                Usa{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  bg-primary
                </code>{' '}
                - Color principal del sistema (azul)
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-700">Secondary</h3>
              <Button $variant="secondary" className="w-full">
                Botón Secundario - Gris Claro
              </Button>
              <p className="text-sm text-gray-600">
                Usa{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  bg-secondary
                </code>{' '}
                - Gris neutro para acciones secundarias
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-700">
                Destructive
              </h3>
              <Button $variant="destructive" className="w-full">
                Botón Destructivo - Rojo
              </Button>
              <p className="text-sm text-gray-600">
                Usa{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  bg-destructive
                </code>{' '}
                - Rojo para acciones peligrosas
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-700">Outline</h3>
              <Button $variant="outline" className="w-full">
                Botón con Borde
              </Button>
              <p className="text-sm text-gray-600">
                Fondo transparente con{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">border</code> -
                Para acciones suaves
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-700">Ghost</h3>
              <Button $variant="ghost" className="w-full">
                Botón Fantasma
              </Button>
              <p className="text-sm text-gray-600">
                Sin fondo, hover sutil - Para navegación y acciones discretas
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-700">Link</h3>
              <Button $variant="link" className="w-full">
                Botón como Enlace
              </Button>
              <p className="text-sm text-gray-600">
                Estilo de enlace con{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">underline</code>{' '}
                - Para navegación
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-blue-900 mb-2">
              💡 Personalización de Colores
            </h4>
            <p className="text-blue-800 text-sm">
              Los colores se basan en variables CSS que pueden ser
              personalizadas por el proyecto consumidor. Modifica las variables{' '}
              <code>--primary</code>, <code>--secondary</code>,{' '}
              <code>--destructive</code>
              en el CSS global de tu aplicación Next.js para cambiar la paleta
              de colores.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Vista detallada de las diferencias visuales entre todas las variantes de botón con explicaciones sobre su uso y personalización.',
      },
    },
  },
};

export const CustomBackgrounds: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      <Button $custom="bg-red-50 text-red-800 border border-red-200 hover:bg-red-100">
        Red Custom
      </Button>
      <Button $custom="bg-green-50 text-green-800 border border-green-200 hover:bg-green-100">
        Green Custom
      </Button>
      <Button $custom="bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100">
        Blue Custom
      </Button>
      <Button $custom="bg-purple-500 text-white hover:bg-purple-600">
        Purple Custom
      </Button>
      <Button $custom="bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600">
        Gradient Custom
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Ejemplos de cómo usar $custom para sobrescribir completamente los estilos de fondo y color.',
      },
    },
  },
};

export const TailwindV4Colors: Story = {
  render: () => (
    <div className="p-8 space-y-8 bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Tailwind v4 - Colores Nativos
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Variables CSS Nativas</h3>
              <p className="text-sm text-gray-600 mb-4">
                Estos botones usan{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  bg-primary
                </code>
                ,{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  bg-secondary
                </code>
                , etc. directamente desde las variables de Tailwind v4
              </p>
              <div className="space-y-2">
                <Button $variant="default" className="w-full">
                  bg-primary nativo
                </Button>
                <Button $variant="secondary" className="w-full">
                  bg-secondary nativo
                </Button>
                <Button $variant="destructive" className="w-full">
                  bg-destructive nativo
                </Button>
                <Button $variant="outline" className="w-full">
                  border nativo
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">
                Variables CSS Personalizadas
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Estos usan{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">$custom</code>{' '}
                con clases de Tailwind v4
              </p>
              <div className="space-y-2">
                <Button
                  $custom="bg-blue-500 text-white hover:bg-blue-600"
                  className="w-full">
                  bg-blue-500 (Tailwind v4)
                </Button>
                <Button
                  $custom="bg-green-500 text-white hover:bg-green-600"
                  className="w-full">
                  bg-green-500 (Tailwind v4)
                </Button>
                <Button
                  $custom="bg-purple-500 text-white hover:bg-purple-600"
                  className="w-full">
                  bg-purple-500 (Tailwind v4)
                </Button>
                <Button
                  $custom="bg-red-500 text-white hover:bg-red-600"
                  className="w-full">
                  bg-red-500 (Tailwind v4)
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-blue-900 mb-2">
              🆕 Tailwind v4 Compatibility
            </h4>
            <p className="text-blue-800 text-sm">
              Esta librería es compatible con Tailwind CSS v4. Las variables se
              definen usando <code>@theme</code>y se mapean automáticamente a
              clases como <code>bg-primary</code>, <code>text-primary</code>,
              etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Demuestra la compatibilidad con Tailwind CSS v4 y cómo las variables CSS se mapean automáticamente.',
      },
    },
  },
};

export const AllVariantsShowcase: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button $variant="default">Default</Button>
          <Button $variant="secondary">Secondary</Button>
          <Button $variant="destructive">Destructive</Button>
          <Button $variant="outline">Outline</Button>
          <Button $variant="ghost">Ghost</Button>
          <Button $variant="link">Link</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button $size="sm">Small</Button>
          <Button $size="default">Default</Button>
          <Button $size="lg">Large</Button>
          <Button $size="icon">🚀</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Custom Backgrounds</h2>
        <div className="flex flex-wrap gap-4">
          <Button $custom="bg-red-50 text-red-700 hover:bg-red-100">
            Red 50
          </Button>
          <Button $custom="bg-blue-50 text-blue-700 hover:bg-blue-100">
            Blue 50
          </Button>
          <Button $custom="bg-green-500 text-white hover:bg-green-600">
            Green 500
          </Button>
          <Button $custom="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
            Gradient
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Disabled States</h2>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Default</Button>
          <Button $variant="secondary" disabled>
            Secondary
          </Button>
          <Button $variant="destructive" disabled>
            Destructive
          </Button>
          <Button $variant="outline" disabled>
            Outline
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Showcase completo de todas las variantes, tamaños y opciones de personalización del Button.',
      },
    },
  },
};

export const GradientUtilities: Story = {
  render: () => (
    <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          🎨 Utilidades de Degradados
        </h2>

        <div className="space-y-8">
          {/* Degradados de Estado */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Degradados de Estado</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button $custom="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                Primary Gradient
              </Button>
              <Button $custom="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white">
                Success Gradient
              </Button>
              <Button $custom="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                Danger Gradient
              </Button>
            </div>
          </div>

          {/* Degradados Corporativos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Degradados Corporativos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button $custom="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                Corporate Blue
              </Button>
              <Button $custom="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                Corporate Green
              </Button>
              <Button $custom="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white">
                Corporate Purple
              </Button>
            </div>
          </div>

          {/* Degradados Modernos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Degradados Modernos</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button $custom="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white">
                Sunset
              </Button>
              <Button $custom="bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-white">
                Ocean
              </Button>
              <Button $custom="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
                Forest
              </Button>
              <Button $custom="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 text-white">
                Aurora
              </Button>
            </div>
          </div>

          {/* Efectos Especiales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Efectos Especiales</h3>
            <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button $custom="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm text-white border border-white/20 hover:bg-white/10">
                  Glass Effect
                </Button>
                <Button $custom="bg-gradient-to-br from-black/20 to-black/5 backdrop-blur-sm text-white border border-white/20 hover:bg-black/10">
                  Dark Glass
                </Button>
              </div>
              <p className="text-white/80 text-sm mt-4 text-center">
                Efectos de vidrio con backdrop-blur para elementos modernos
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border-l-4 border-indigo-400">
            <h4 className="font-semibold text-indigo-900 mb-2">
              🎯 Cómo usar las utilidades
            </h4>
            <pre className="text-indigo-800 text-sm bg-indigo-100 p-3 rounded overflow-x-auto">
              {`import { gradients, useGradient } from 'tailwind-next';

// Usando la utilidad
<Button $custom={gradients.primary}>Primary Button</Button>

// Con hook
const gradient = useGradient('sunset');
<Button $custom={gradient}>Sunset Button</Button>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Demuestra el uso de las utilidades de degradados incluidas en la librería para crear efectos visuales modernos y consistentes.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Buttons with Left Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button $iconLeft={FaPlus}>Add Item</Button>
          <Button $iconLeft={FaDownload} $variant="secondary">
            Download
          </Button>
          <Button $iconLeft={FaCheck} $variant="destructive">
            Confirm Delete
          </Button>
          <Button $iconLeft={FaHeart} $variant="outline">
            Like
          </Button>
          <Button $iconLeft={FaHome} $variant="ghost">
            Home
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Buttons with Right Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button $iconRight={FaArrowRight}>Continue</Button>
          <Button $iconRight={FaArrowRight} $variant="secondary">
            Next Step
          </Button>
          <Button $iconRight={FaTimes} $variant="destructive">
            Cancel
          </Button>
          <Button $iconRight={FaUser} $variant="outline">
            Profile
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Icon Only Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button $iconLeft={FaPlus} $size="icon" aria-label="Add" />
          <Button
            $iconLeft={FaDownload}
            $size="icon"
            $variant="secondary"
            aria-label="Download"
          />
          <Button
            $iconLeft={FaCheck}
            $size="icon"
            $variant="destructive"
            aria-label="Confirm"
          />
          <Button
            $iconLeft={FaHeart}
            $size="icon"
            $variant="outline"
            aria-label="Like"
          />
          <Button
            $iconLeft={FaHome}
            $size="icon"
            $variant="ghost"
            aria-label="Home"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Different Sizes with Icons</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button $iconLeft={FaStar} $size="sm">
            Small
          </Button>
          <Button $iconLeft={FaStar}>Default</Button>
          <Button $iconLeft={FaStar} $size="lg">
            Large
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">
          Custom Gradient Buttons with Icons
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button
            $iconLeft={FaDownload}
            $custom="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
            Download
          </Button>
          <Button
            $iconRight={FaArrowRight}
            $custom="bg-gradient-to-r from-green-500 to-teal-600 text-white hover:from-green-600 hover:to-teal-700">
            Continue
          </Button>
          <Button
            $iconLeft={FaPlus}
            $custom="bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700">
            Add New
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Demuestra cómo usar iconos de react-icons con el componente Button usando las props $iconLeft y $iconRight.',
      },
    },
  },
};

export const NeumorphicEffects: Story = {
  render: () => (
    <div className="p-8 bg-background">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Efectos Neumórficos</h2>
          <p className="text-muted-foreground">
            Botones con estilos neumórficos usando las nuevas sombras CSS
            variables
          </p>
        </div>

        {/* Botones Neumórficos Básicos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sombras Neumórficas</h3>
          <div className="flex gap-4 flex-wrap">
            <Button
              $variant="default"
              $custom="shadow-neumorphic transition-neumorphic hover:shadow-neumorphic-soft">
              Neumórfico Básico
            </Button>
            <Button
              $variant="secondary"
              $custom="shadow-neumorphic-soft transition-neumorphic hover:shadow-neumorphic">
              Neumórfico Suave
            </Button>
            <Button
              $variant="outline"
              $custom="shadow-neumorphic-inner transition-neumorphic hover:shadow-neumorphic-inner-soft">
              Hundido
            </Button>
          </div>
        </div>

        {/* Botones con Gradientes + Neumórfico */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Gradientes + Neumórfico</h3>
          <div className="flex gap-4 flex-wrap">
            <Button $custom="bg-gradient-primary shadow-neumorphic transition-neumorphic hover:shadow-neumorphic-soft text-white">
              Primary Gradient
            </Button>
            <Button $custom="bg-gradient-secondary shadow-neumorphic transition-neumorphic hover:shadow-neumorphic-soft text-white">
              Secondary Gradient
            </Button>
            <Button $custom="bg-gradient-accent shadow-neumorphic transition-neumorphic hover:shadow-neumorphic-soft text-white">
              Accent Gradient
            </Button>
          </div>
        </div>

        {/* Tamaños con Neumórfico */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Tamaños Neumórficos</h3>
          <div className="flex gap-4 items-center flex-wrap">
            <Button
              $size="sm"
              $custom="shadow-neumorphic-soft transition-neumorphic hover:shadow-neumorphic">
              Pequeño
            </Button>
            <Button
              $size="default"
              $custom="shadow-neumorphic transition-neumorphic hover:shadow-neumorphic-soft">
              Normal
            </Button>
            <Button
              $size="lg"
              $custom="shadow-neumorphic transition-neumorphic hover:shadow-neumorphic-soft">
              Grande
            </Button>
          </div>
        </div>

        {/* Botones con Iconos + Neumórfico */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Con Iconos + Neumórfico</h3>
          <div className="flex gap-4 flex-wrap">
            <Button
              $iconLeft={FaDownload}
              $custom="shadow-neumorphic transition-neumorphic hover:shadow-neumorphic-soft bg-gradient-primary text-white">
              Descargar
            </Button>
            <Button
              $iconRight={FaArrowRight}
              $custom="shadow-neumorphic transition-neumorphic hover:shadow-neumorphic-soft bg-gradient-success text-white">
              Continuar
            </Button>
            <Button
              $size="icon"
              $iconLeft={FaHeart}
              $custom="shadow-neumorphic transition-neumorphic hover:shadow-neumorphic-soft bg-gradient-danger text-white"
            />
          </div>
        </div>

        {/* Estados Interactivos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Estados Interactivos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <Button $custom="shadow-neumorphic transition-neumorphic">
                Normal
              </Button>
              <p className="text-xs text-muted-foreground">Estado reposo</p>
            </div>
            <div className="text-center space-y-2">
              <Button $custom="shadow-neumorphic-soft transition-neumorphic transform -translate-y-1">
                Hover
              </Button>
              <p className="text-xs text-muted-foreground">Al pasar mouse</p>
            </div>
            <div className="text-center space-y-2">
              <Button $custom="shadow-neumorphic-inner transition-neumorphic">
                Pressed
              </Button>
              <p className="text-xs text-muted-foreground">Al presionar</p>
            </div>
            <div className="text-center space-y-2">
              <Button
                disabled
                $custom="shadow-neumorphic-inner-soft opacity-50">
                Disabled
              </Button>
              <p className="text-xs text-muted-foreground">Deshabilitado</p>
            </div>
          </div>
        </div>

        {/* Información de Implementación */}
        <div className="bg-muted/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Clases CSS Disponibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Sombras Neumórficas:</h4>
              <ul className="space-y-1 text-muted-foreground font-mono">
                <li>• shadow-neumorphic</li>
                <li>• shadow-neumorphic-soft</li>
                <li>• shadow-neumorphic-inner</li>
                <li>• shadow-neumorphic-inner-soft</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Transiciones:</h4>
              <ul className="space-y-1 text-muted-foreground font-mono">
                <li>• transition-neumorphic</li>
                <li>• hover:shadow-neumorphic-soft</li>
                <li>• active:shadow-neumorphic-inner</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Demuestra el uso de efectos neumórficos con las nuevas sombras CSS variables para crear una UI moderna y táctil.',
      },
    },
  },
};

