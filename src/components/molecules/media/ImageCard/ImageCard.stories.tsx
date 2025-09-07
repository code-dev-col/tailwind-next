import type { Meta, StoryObj } from '@storybook/react';
import { ImageCard } from './ImageCard';
import { useImageCardExamples } from '../../../../stores/imageCardExamples.store';
import { Button } from '../../../atoms/forms/Button';
import { Badge } from '../../../atoms/feedback/Badge';

const meta: Meta<typeof ImageCard> = {
  title: 'Molecules/Media/ImageCard',
  component: ImageCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Imágenes de ejemplo
const sampleImages = {
  nature:
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
  food: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500',
  tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500',
  portrait:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500',
  architecture:
    'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500',
};

// Historia predeterminada
export const Default: Story = {
  args: {
    src: sampleImages.nature,
    alt: 'Paisaje de montañas',
    title: 'Explorando la naturaleza',
    description:
      'Descubre impresionantes paisajes montañosos en esta aventura fotográfica',
    $variant: 'default',
    $size: 'default',
    $colorScheme: 'default',
  },
};

// Variantes
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 justify-center">
      <div className="space-y-2">
        <h5 className="text-sm font-medium mb-2 text-center">Default</h5>
        <ImageCard
          src={sampleImages.nature}
          alt="Montañas"
          title="Variante Default"
          description="La variante estándar con sombra ligera"
          $variant="default"
        />
      </div>

      <div className="space-y-2">
        <h5 className="text-sm font-medium mb-2 text-center">Overlay</h5>
        <ImageCard
          src={sampleImages.food}
          alt="Comida"
          title="Variante Overlay"
          description="Texto sobre la imagen en hover"
          $variant="overlay"
        />
      </div>

      <div className="space-y-2">
        <h5 className="text-sm font-medium mb-2 text-center">Compact</h5>
        <ImageCard
          src={sampleImages.tech}
          alt="Tecnología"
          title="Variante Compact"
          description="Diseño compacto, sin sombras"
          $variant="compact"
        />
      </div>

      <div className="space-y-2">
        <h5 className="text-sm font-medium mb-2 text-center">Detailed</h5>
        <ImageCard
          src={sampleImages.portrait}
          alt="Retrato"
          title="Variante Detailed"
          description="Más espacio para contenido y descripciones largas. Esta variante es ideal para contenidos detallados con más información"
          $variant="detailed"
        />
      </div>
    </div>
  ),
};

// Tamaños
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 justify-center">
      <div className="space-y-2">
        <h5 className="text-sm font-medium mb-2 text-center">Small</h5>
        <ImageCard
          src={sampleImages.nature}
          alt="Paisaje"
          title="Tamaño SM"
          description="Tarjeta pequeña y compacta"
          $size="sm"
        />
      </div>

      <div className="space-y-2">
        <h5 className="text-sm font-medium mb-2 text-center">Default</h5>
        <ImageCard
          src={sampleImages.nature}
          alt="Paisaje"
          title="Tamaño Default"
          description="Tarjeta tamaño estándar"
          $size="default"
        />
      </div>

      <div className="space-y-2">
        <h5 className="text-sm font-medium mb-2 text-center">Large</h5>
        <ImageCard
          src={sampleImages.nature}
          alt="Paisaje"
          title="Tamaño LG"
          description="Tarjeta grande para contenido destacado"
          $size="lg"
        />
      </div>
    </div>
  ),
};

// Con Badge
export const WithBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 justify-center">
      <ImageCard
        src={sampleImages.food}
        alt="Comida"
        title="Desayuno saludable"
        description="Frutas frescas y granola"
        badgeText="Nuevo"
        showBadge
        badgePosition="top-right"
      />

      <ImageCard
        src={sampleImages.tech}
        alt="Tecnología"
        title="Gadgets modernos"
        description="Lo último en tecnología"
        badgeText="Destacado"
        showBadge
        badgePosition="top-left"
        $colorScheme="primary"
      />

      <ImageCard
        src={sampleImages.architecture}
        alt="Arquitectura"
        title="Diseño contemporáneo"
        description="Espacios abiertos y modernos"
        badgeText="Oferta"
        showBadge
        badgePosition="bottom-right"
        $colorScheme="destructive"
      />
    </div>
  ),
};

// Con acciones
export const WithActions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 justify-center">
      <ImageCard
        src={sampleImages.nature}
        alt="Paisaje"
        title="Aventura en montaña"
        description="Rutas para senderistas"
        action={
          <div className="flex justify-end gap-2">
            <Button $size="sm" $colorScheme="default">
              Ver más
            </Button>
          </div>
        }
      />

      <ImageCard
        src={sampleImages.tech}
        alt="Tecnología"
        title="Gadgets modernos"
        description="Lo último en tecnología"
        footerContent={
          <div className="flex justify-between items-center">
            <Badge>Tecnología</Badge>
            <Button $size="sm" $colorScheme="secondary">
              Explorar
            </Button>
          </div>
        }
      />
    </div>
  ),
};

// Aspectos de imagen
export const ImageAspects: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-1">
        <ImageCard
          src={sampleImages.nature}
          alt="Aspect Square"
          $aspect="square"
          title="Cuadrado (1:1)"
        />
        <p className="text-xs text-center text-muted-foreground">Square</p>
      </div>

      <div className="space-y-1">
        <ImageCard
          src={sampleImages.nature}
          alt="Aspect 16/9"
          $aspect="16/9"
          title="Panorámico (16:9)"
        />
        <p className="text-xs text-center text-muted-foreground">16/9</p>
      </div>

      <div className="space-y-1">
        <ImageCard
          src={sampleImages.nature}
          alt="Aspect 4/3"
          $aspect="4/3"
          title="Estándar (4:3)"
        />
        <p className="text-xs text-center text-muted-foreground">4/3</p>
      </div>

      <div className="space-y-1">
        <ImageCard
          src={sampleImages.nature}
          alt="Aspect 3/2"
          $aspect="3/2"
          title="Fotografía (3:2)"
        />
        <p className="text-xs text-center text-muted-foreground">3/2</p>
      </div>

      <div className="space-y-1">
        <ImageCard
          src={sampleImages.nature}
          alt="Aspect 2/1"
          $aspect="2/1"
          title="Banner (2:1)"
        />
        <p className="text-xs text-center text-muted-foreground">2/1</p>
      </div>

      <div className="space-y-1">
        <ImageCard
          src={sampleImages.nature}
          alt="Aspect Auto"
          $aspect="auto"
          title="Natural (Auto)"
        />
        <p className="text-xs text-center text-muted-foreground">Auto</p>
      </div>
    </div>
  ),
};

// Esquemas de color
export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold">Esquemas de Color theme.css</h4>

      <div className="space-y-8">
        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Default</h5>
          <div className="flex flex-wrap gap-4">
            <ImageCard
              $colorScheme="default"
              src={sampleImages.nature}
              alt="Default"
              title="Esquema Default"
              description="Colores neutros de tarjeta"
              action={
                <div className="flex justify-end">
                  <Button $size="sm" $colorScheme="default">
                    Ver más
                  </Button>
                </div>
              }
            />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Primary</h5>
          <div className="flex flex-wrap gap-4">
            <ImageCard
              $colorScheme="primary"
              src={sampleImages.nature}
              alt="Primary"
              title="Esquema Primary"
              description="Basado en color primary con toques sutiles"
              action={
                <div className="flex justify-end">
                  <Button $size="sm" $colorScheme="default">
                    Ver más
                  </Button>
                </div>
              }
            />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Secondary</h5>
          <div className="flex flex-wrap gap-4">
            <ImageCard
              $colorScheme="secondary"
              src={sampleImages.food}
              alt="Secondary"
              title="Esquema Secondary"
              description="Basado en color secondary turquesa"
              action={
                <div className="flex justify-end">
                  <Button $size="sm" $colorScheme="secondary">
                    Ver más
                  </Button>
                </div>
              }
            />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Destructive
          </h5>
          <div className="flex flex-wrap gap-4">
            <ImageCard
              $colorScheme="destructive"
              src={sampleImages.tech}
              alt="Destructive"
              title="Esquema Destructive"
              description="Para alertas o elementos importantes"
              action={
                <div className="flex justify-end">
                  <Button $size="sm" $colorScheme="destructive">
                    Eliminar
                  </Button>
                </div>
              }
            />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Accent</h5>
          <div className="flex flex-wrap gap-4">
            <ImageCard
              $colorScheme="accent"
              src={sampleImages.portrait}
              alt="Accent"
              title="Esquema Accent"
              description="Para destacar elementos especiales"
              action={
                <div className="flex justify-end">
                  <Button $size="sm" $colorScheme="accent">
                    Destacar
                  </Button>
                </div>
              }
            />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Muted</h5>
          <div className="flex flex-wrap gap-4">
            <ImageCard
              $colorScheme="muted"
              src={sampleImages.architecture}
              alt="Muted"
              title="Esquema Muted"
              description="Para contenido secundario o menos importante"
              action={
                <div className="flex justify-end">
                  <Button $size="sm" $colorScheme="muted">
                    Opciones
                  </Button>
                </div>
              }
            />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Minimal</h5>
          <div className="flex flex-wrap gap-4">
            <ImageCard
              $colorScheme="minimal"
              src={sampleImages.nature}
              alt="Minimal"
              title="Esquema Minimal"
              description="Estilo minimalista sin fondo"
              action={
                <div className="flex justify-end">
                  <Button $size="sm" $colorScheme="minimal">
                    Explorar
                  </Button>
                </div>
              }
            />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Custom</h5>
          <div className="flex flex-wrap gap-4">
            <ImageCard
              $colorScheme="custom"
              $custom="bg-gradient-to-br from-purple-500 to-pink-500 border-purple-300 text-white"
              src={sampleImages.tech}
              alt="Custom"
              title="Esquema Custom"
              description="Personalización completa con gradientes"
              action={
                <div className="flex justify-end">
                  <Button
                    $size="sm"
                    $custom="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    Personalizado
                  </Button>
                </div>
              }
            />
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

// Con Store
export const WithStore: Story = {
  render: () => {
    // Accede al store directamente para mostrar el valor
    const currentValue = useImageCardExamples((state) => state.defaultExample);

    return (
      <div className="space-y-4">
        <ImageCard
          src={sampleImages.portrait}
          alt="Con Store"
          title="Integración con Zustand"
          description={`Valor actual: ${currentValue || 'No hay valor aún'}`}
          $store={useImageCardExamples}
          storeKey="defaultExample"
          action={
            <div className="flex justify-between">
              <Button
                $size="sm"
                $colorScheme="secondary"
                onClick={() =>
                  useImageCardExamples
                    .getState()
                    .setDefaultExample('Valor Actualizado')
                }>
                Actualizar Store
              </Button>
              <Button
                $size="sm"
                onClick={() =>
                  useImageCardExamples.getState().clearAllImageCard()
                }>
                Limpiar
              </Button>
            </div>
          }
        />

        <div className="p-3 bg-muted/20 rounded text-sm">
          <p>
            Esta tarjeta demuestra la integración con Zustand usando el patrón
            storeKey.
          </p>
        </div>
      </div>
    );
  },
};

// Con overlay y efectos
export const WithOverlays: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 justify-center">
      <ImageCard
        src={sampleImages.architecture}
        alt="Arquitectura"
        title="Overlay Predeterminado"
        description="Muestra textos en hover"
        $variant="overlay"
      />

      <ImageCard
        src={sampleImages.portrait}
        alt="Retrato"
        title="Overlay Permanente"
        description="Siempre visible con gradiente"
        showOverlay
      />

      <ImageCard
        src={sampleImages.food}
        alt="Comida"
        title="Overlay con Badge"
        description="Combina varios elementos"
        $variant="overlay"
        showBadge
        badgeText="Popular"
        $colorScheme="accent"
      />
    </div>
  ),
};

// Con diferentes objetos de ajuste
export const ObjectFitVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-1">
        <ImageCard
          src={sampleImages.architecture}
          alt="Object Fit Cover"
          $objectFit="cover"
          $aspect="square"
          title="Cover"
          description="Cubre todo el espacio"
        />
        <p className="text-xs text-center text-muted-foreground">cover</p>
      </div>

      <div className="space-y-1">
        <ImageCard
          src={sampleImages.architecture}
          alt="Object Fit Contain"
          $objectFit="contain"
          $aspect="square"
          title="Contain"
          description="Muestra completa dentro del contenedor"
          $colorScheme="muted"
        />
        <p className="text-xs text-center text-muted-foreground">contain</p>
      </div>

      <div className="space-y-1">
        <ImageCard
          src={sampleImages.architecture}
          alt="Object Fit Fill"
          $objectFit="fill"
          $aspect="square"
          title="Fill"
          description="Estira para llenar el espacio"
        />
        <p className="text-xs text-center text-muted-foreground">fill</p>
      </div>
    </div>
  ),
};

// Ejemplo de uso en conjunto con gradientes
export const WithGradients: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <ImageCard
        src={sampleImages.nature}
        alt="Gradiente Sunset"
        title="Gradiente Sunset"
        description="Tonos cálidos naranjas y rojos"
        $custom="bg-gradient-to-r from-orange-500 to-red-500 border-orange-300"
        $colorScheme="custom"
        action={
          <Button $custom="bg-white/20 hover:bg-white/30 text-white border-white/30">
            Explorar
          </Button>
        }
      />

      <ImageCard
        src={sampleImages.tech}
        alt="Gradiente Ocean"
        title="Gradiente Ocean"
        description="Azules profundos y turquesas"
        $custom="bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-300"
        $colorScheme="custom"
        action={
          <Button $custom="bg-white/20 hover:bg-white/30 text-white border-white/30">
            Descubrir
          </Button>
        }
      />

      <ImageCard
        src={sampleImages.food}
        alt="Gradiente Forest"
        title="Gradiente Forest"
        description="Verdes naturales y refrescantes"
        $custom="bg-gradient-to-r from-green-500 to-emerald-500 border-green-300"
        $colorScheme="custom"
        action={
          <Button $custom="bg-white/20 hover:bg-white/30 text-white border-white/30">
            Ver más
          </Button>
        }
      />

      <ImageCard
        src={sampleImages.portrait}
        alt="Gradiente Cosmic"
        title="Gradiente Cosmic"
        description="Púrpuras y magentas espaciales"
        $custom="bg-gradient-to-r from-purple-500 to-pink-500 border-purple-300"
        $colorScheme="custom"
        action={
          <Button $custom="bg-white/20 hover:bg-white/30 text-white border-white/30">
            Expandir
          </Button>
        }
      />
    </div>
  ),
};

// Ejemplo de loading
export const LoadingState: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 justify-center">
      <ImageCard
        src=""
        alt="Cargando"
        title="Cargando imagen"
        description="Estado de carga con skeleton"
        loading={true}
      />

      <ImageCard
        src={sampleImages.nature}
        alt="Cargada"
        title="Imagen cargada"
        description="Estado normal"
        loading={false}
      />
    </div>
  ),
};

