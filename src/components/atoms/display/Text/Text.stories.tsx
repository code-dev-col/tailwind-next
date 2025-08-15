import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import { useTextExamples } from '../../../../stores/textExamples.store';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Display/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'El contenido del texto',
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
      description: 'Esquema de color del tema CSS',
    },
    $size: {
      control: 'select',
      options: [
        'xs',
        'sm',
        'base',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
      ],
      description: 'Tamaño predefinido del texto',
    },
    $customSize: {
      control: { type: 'number', min: 0.5, max: 5, step: 0.1 },
      description: 'Tamaño personalizado en rem',
    },
    $dynamicSize: {
      control: 'boolean',
      description: 'Habilita tamaño responsivo con clamp',
    },
    $weight: {
      control: 'select',
      options: [
        'thin',
        'light',
        'normal',
        'medium',
        'semibold',
        'bold',
        'extrabold',
        'black',
      ],
      description: 'Peso de la fuente',
    },
    $align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Alineación del texto',
    },
    $transform: {
      control: 'select',
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      description: 'Transformación del texto',
    },
    $textShadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'colored'],
      description: 'Sombra del texto',
    },
    $color: {
      control: 'color',
      description: 'Color personalizado del texto',
    },
    $lineHeight: {
      control: 'select',
      options: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
      description: 'Altura de línea',
    },
    $letterSpacing: {
      control: 'select',
      options: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      description: 'Espaciado entre letras',
    },
    $gradient: {
      control: 'boolean',
      description: 'Aplicar gradiente al texto',
    },
    $truncate: {
      control: 'boolean',
      description: 'Truncar texto con puntos suspensivos',
    },
    $clampLines: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Número de líneas para clamp',
    },
    as: {
      control: 'select',
      options: [
        'p',
        'span',
        'div',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'small',
        'strong',
        'em',
      ],
      description: 'Elemento HTML a renderizar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Text $store={useTextExamples} storeKey="defaultExample">
      {/* Fallback content from store */}
    </Text>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground">Theme.css Color Schemes</h4>
      <div className="space-y-3">
        <Text
          $store={useTextExamples}
          storeKey="defaultExample"
          $colorScheme="default">
          {/* Fallback: Default scheme text */}
        </Text>
        <Text
          $store={useTextExamples}
          storeKey="secondaryExample"
          $colorScheme="secondary">
          {/* Fallback: Secondary scheme text */}
        </Text>
        <Text
          $store={useTextExamples}
          storeKey="destructiveExample"
          $colorScheme="destructive">
          {/* Fallback: Destructive scheme text */}
        </Text>
        <Text
          $store={useTextExamples}
          storeKey="accentExample"
          $colorScheme="accent">
          {/* Fallback: Accent scheme text */}
        </Text>
        <Text
          $store={useTextExamples}
          storeKey="mutedExample"
          $colorScheme="muted">
          {/* Fallback: Muted scheme text */}
        </Text>
        <Text
          $store={useTextExamples}
          storeKey="minimalExample"
          $colorScheme="minimal">
          {/* Fallback: Minimal scheme text */}
        </Text>
      </div>
    </div>
  ),
};

export const WithStore: Story = {
  render: () => {
    const { clearAllText } = useTextExamples();

    return (
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">
          Store Integration Examples
        </h4>

        <div className="space-y-3">
          <Text
            $store={useTextExamples}
            storeKey="titleExample"
            $colorScheme="default"
            $size="xl"
            $weight="bold"
            as="h3">
            {/* Fallback: Title from store */}
          </Text>

          <Text
            $store={useTextExamples}
            storeKey="paragraphExample"
            $colorScheme="default"
            as="p">
            {/* Fallback: Paragraph from store */}
          </Text>

          <Text
            $store={useTextExamples}
            storeKey="descriptionExample"
            $colorScheme="muted"
            $size="sm">
            {/* Fallback: Description from store */}
          </Text>
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={clearAllText}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm transition-colors">
            Clear All Text
          </button>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p>Title: {useTextExamples((state) => state.titleExample)}</p>
          <p>
            Paragraph:{' '}
            {useTextExamples((state) => state.paragraphExample.slice(0, 50))}...
          </p>
          <p>
            Description: {useTextExamples((state) => state.descriptionExample)}
          </p>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Text $size="xs">Texto extra pequeño (xs)</Text>
      <Text $size="sm">Texto pequeño (sm)</Text>
      <Text $size="base">Texto base (base)</Text>
      <Text $size="lg">Texto largo (lg)</Text>
      <Text $size="xl">Texto extra largo (xl)</Text>
      <Text $size="2xl">Texto 2xl</Text>
      <Text $size="3xl">Texto 3xl</Text>
      <Text $size="4xl">Texto 4xl</Text>
      <Text $size="5xl">Texto 5xl</Text>
      <Text $size="6xl">Texto 6xl</Text>
    </div>
  ),
};

export const CustomSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Text $customSize={0.8}>Texto con 0.8rem</Text>
      <Text $customSize={1.2}>Texto con 1.2rem</Text>
      <Text $customSize={1.8}>Texto con 1.8rem</Text>
      <Text $customSize={2.5}>Texto con 2.5rem</Text>
      <Text $customSize={3.2}>Texto con 3.2rem</Text>
    </div>
  ),
};

export const DynamicResponsive: Story = {
  render: () => (
    <div className="space-y-4 p-4 border rounded-lg">
      <p className="text-sm text-muted-foreground mb-4">
        Redimensiona la ventana para ver el efecto responsivo con clamp()
      </p>
      <Text $size="sm" $dynamicSize>
        Texto pequeño responsivo que se adapta al viewport
      </Text>
      <Text $size="lg" $dynamicSize>
        Texto grande responsivo que crece y decrece
      </Text>
      <Text $size="3xl" $dynamicSize>
        Título responsivo que se escala dinámicamente
      </Text>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-2">
      <Text $weight="thin">Texto ultra delgado</Text>
      <Text $weight="light">Texto ligero</Text>
      <Text $weight="normal">Texto normal</Text>
      <Text $weight="medium">Texto medio</Text>
      <Text $weight="semibold">Texto semi-negrita</Text>
      <Text $weight="bold">Texto negrita</Text>
      <Text $weight="extrabold">Texto extra negrita</Text>
      <Text $weight="black">Texto negro</Text>
    </div>
  ),
};

export const TextAlignment: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <Text $align="left" className="w-full border p-2">
        Texto alineado a la izquierda
      </Text>
      <Text $align="center" className="w-full border p-2">
        Texto centrado
      </Text>
      <Text $align="right" className="w-full border p-2">
        Texto alineado a la derecha
      </Text>
      <Text $align="justify" className="w-full border p-2">
        Texto justificado. Este es un párrafo más largo para mostrar cómo se ve
        el texto cuando está justificado en ambos lados.
      </Text>
    </div>
  ),
};

export const TextTransforms: Story = {
  render: () => (
    <div className="space-y-2">
      <Text $transform="none">Texto sin transformación</Text>
      <Text $transform="uppercase">texto en mayúsculas</Text>
      <Text $transform="lowercase">TEXTO EN MINÚSCULAS</Text>
      <Text $transform="capitalize">texto con primera letra en mayúscula</Text>
    </div>
  ),
};

export const TextShadows: Story = {
  render: () => (
    <div className="space-y-4 bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-lg">
      <Text $textShadow="none" $size="lg">
        Sin sombra de texto
      </Text>
      <Text $textShadow="sm" $size="lg">
        Sombra pequeña
      </Text>
      <Text $textShadow="md" $size="lg">
        Sombra media
      </Text>
      <Text $textShadow="lg" $size="lg">
        Sombra grande
      </Text>
      <Text $textShadow="colored" $color="#3b82f6" $size="lg" $weight="bold">
        Sombra coloreada azul
      </Text>
      <Text $textShadow="colored" $color="#ef4444" $size="lg" $weight="bold">
        Sombra coloreada roja
      </Text>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="space-y-3">
      <Text $color="#3b82f6" $weight="medium">
        Texto azul personalizado
      </Text>
      <Text $color="#ef4444" $weight="medium">
        Texto rojo personalizado
      </Text>
      <Text $color="#10b981" $weight="medium">
        Texto verde personalizado
      </Text>
      <Text $color="#f59e0b" $weight="medium">
        Texto amarillo personalizado
      </Text>
      <Text $color="#8b5cf6" $weight="medium">
        Texto púrpura personalizado
      </Text>
    </div>
  ),
};

export const LineHeightAndSpacing: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h4 className="font-semibold mb-2">Altura de línea:</h4>
        <Text $lineHeight="tight" className="border p-2">
          Línea apretada. Este es un párrafo con altura de línea tight para
          mostrar el espaciado entre líneas.
        </Text>
      </div>
      <div>
        <Text $lineHeight="relaxed" className="border p-2">
          Línea relajada. Este es un párrafo con altura de línea relaxed para
          mostrar el espaciado entre líneas.
        </Text>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Espaciado de letras:</h4>
        <Text $letterSpacing="tight">Espaciado apretado</Text>
        <Text $letterSpacing="normal">Espaciado normal</Text>
        <Text $letterSpacing="wide">Espaciado amplio</Text>
        <Text $letterSpacing="widest">Espaciado muy amplio</Text>
      </div>
    </div>
  ),
};

export const GradientText: Story = {
  render: () => (
    <div className="space-y-4">
      <Text
        $gradient
        $size="2xl"
        $weight="bold"
        $custom="bg-gradient-to-r from-blue-600 to-purple-600">
        Texto con gradiente azul a púrpura
      </Text>
      <Text
        $gradient
        $size="2xl"
        $weight="bold"
        $custom="bg-gradient-to-r from-pink-500 to-orange-500">
        Texto con gradiente rosa a naranja
      </Text>
      <Text
        $gradient
        $size="2xl"
        $weight="bold"
        $custom="bg-gradient-to-r from-green-400 to-cyan-500">
        Texto con gradiente verde a cian
      </Text>
    </div>
  ),
};

export const TextTruncation: Story = {
  render: () => (
    <div className="space-y-4 max-w-xs">
      <div>
        <h4 className="font-semibold mb-2">Truncado con ellipsis:</h4>
        <Text $truncate className="border p-2">
          Este es un texto muy largo que será truncado con puntos suspensivos
          cuando exceda el ancho del contenedor
        </Text>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Clamp a 2 líneas:</h4>
        <Text $clampLines={2} className="border p-2">
          Este es un texto muy largo que será limitado a exactamente dos líneas
          usando la propiedad -webkit-line-clamp. El resto del contenido será
          ocultado automáticamente.
        </Text>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Clamp a 3 líneas:</h4>
        <Text $clampLines={3} className="border p-2">
          Este es un texto aún más largo que será limitado a exactamente tres
          líneas usando la propiedad -webkit-line-clamp. Esto es muy útil para
          cards o componentes donde necesitas un número específico de líneas. El
          resto del contenido será ocultado automáticamente sin importar cuánto
          texto adicional haya.
        </Text>
      </div>
    </div>
  ),
};

export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-3">
      <Text as="h1" $size="3xl" $weight="bold">
        Encabezado H1
      </Text>
      <Text as="h2" $size="2xl" $weight="semibold">
        Encabezado H2
      </Text>
      <Text as="h3" $size="xl" $weight="medium">
        Encabezado H3
      </Text>
      <Text as="p" $size="base">
        Párrafo normal con elemento p
      </Text>
      <Text as="span" $size="sm" $colorScheme="muted">
        Texto inline con span
      </Text>
      <Text as="small" $size="xs" $colorScheme="muted">
        Texto pequeño con elemento small
      </Text>
      <Text as="strong" $weight="bold">
        Texto importante con strong
      </Text>
      <Text as="em" $weight="medium" className="italic">
        Texto enfatizado con em
      </Text>
    </div>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
      <Text
        as="h1"
        $size="4xl"
        $weight="bold"
        $gradient
        $custom="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        $textShadow="lg"
        $align="center"
        $dynamicSize>
        Componente Text Avanzado
      </Text>

      <Text
        as="h2"
        $size="xl"
        $weight="semibold"
        $color="#6366f1"
        $align="center"
        $letterSpacing="wide"
        $transform="uppercase">
        Características Principales
      </Text>

      <Text $size="lg" $lineHeight="relaxed" $weight="medium" $align="justify">
        Este componente Text ofrece una funcionalidad completa para el manejo de
        tipografía en aplicaciones modernas. Incluye soporte para tamaños
        dinámicos con clamp(), gradientes, sombras personalizadas y múltiples
        opciones de personalización.
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <Text $weight="semibold" $colorScheme="default" className="mb-2">
            Tamaños Responsivos
          </Text>
          <Text $size="sm" $colorScheme="muted" $clampLines={3}>
            Utiliza funciones clamp() CSS para crear tipografía que se adapta
            automáticamente al tamaño de la pantalla, proporcionando una
            experiencia de usuario óptima en todos los dispositivos.
          </Text>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <Text $weight="semibold" $colorScheme="accent" className="mb-2">
            Personalización Total
          </Text>
          <Text $size="sm" $colorScheme="muted" $clampLines={3}>
            Controla cada aspecto de la tipografía: colores personalizados,
            sombras, espaciado, transformaciones de texto y elementos semánticos
            HTML.
          </Text>
        </div>
      </div>

      <Text
        $size="sm"
        $colorScheme="muted"
        $align="center"
        $letterSpacing="wide"
        $transform="uppercase">
        Desarrollado con React + TypeScript + Tailwind CSS
      </Text>
    </div>
  ),
};

