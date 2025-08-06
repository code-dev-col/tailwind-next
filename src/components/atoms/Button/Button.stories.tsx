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

