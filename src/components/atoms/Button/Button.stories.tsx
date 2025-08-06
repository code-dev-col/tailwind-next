import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
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

