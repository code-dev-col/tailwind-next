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
  // Imagen local para ejemplos de overflow
  example: '/src/assets/image-example.png',
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

// Demostración visual del overflow real
export const OverflowDemo: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-lg font-semibold mb-4">
          Demostración Visual del Overflow Real
        </h4>
        <p className="text-sm text-muted-foreground mb-6">
          Observa cómo la imagen sobresale realmente del contenedor de la
          tarjeta. Las líneas punteadas muestran los límites del contenedor
          padre.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sin overflow - contenedor con línea punteada */}
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <div className="text-center mb-2">
              <span className="text-xs font-medium text-gray-600">
                Área del contenedor padre
              </span>
            </div>
            <ImageCard
              src={sampleImages.example}
              alt="Sin overflow"
              title="Sin Overflow"
              description="La imagen está contenida dentro del borde"
              $imageOverflow="none"
              $size="default"
              showBadge
              badgeText="Normal"
            />
          </div>

          {/* Overflow superior - contenedor con línea punteada */}
          <div className="border-2 border-dashed border-blue-300 p-4 rounded-lg">
            <div className="text-center mb-2">
              <span className="text-xs font-medium text-blue-600">
                Área del contenedor padre
              </span>
            </div>
            <ImageCard
              src={sampleImages.example}
              alt="Overflow superior"
              title="Overflow Superior"
              description="La imagen sobresale por arriba del borde"
              $imageOverflow="top"
              $imageBgColor="#dbeafe"
              $size="default"
              showBadge
              badgeText="Top"
              badgePosition="top-right"
            />
          </div>

          {/* Overflow completo - contenedor con línea punteada */}
          <div className="border-2 border-dashed border-red-300 p-4 rounded-lg">
            <div className="text-center mb-2">
              <span className="text-xs font-medium text-red-600">
                Área del contenedor padre
              </span>
            </div>
            <ImageCard
              src={sampleImages.example}
              alt="Overflow completo"
              title="Overflow Completo"
              description="La imagen sobresale por todos lados del borde"
              $imageOverflow="all"
              $imageBgColor="#fee2e2"
              $size="default"
              showBadge
              badgeText="All"
              badgePosition="top-left"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h5 className="font-medium text-yellow-900 mb-2">
          🔍 Observa el Comportamiento
        </h5>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>
            • <strong>Sin overflow:</strong> La imagen respeta los límites del
            contenedor
          </li>
          <li>
            • <strong>Overflow superior:</strong> La imagen sobresale por arriba
            y se <strong>escala 3%</strong>
          </li>
          <li>
            • <strong>Overflow completo:</strong> La imagen sobresale por todos
            lados y se <strong>escala 10%</strong>
          </li>
          <li>
            • Las líneas punteadas representan el contenedor padre que incluye
            la tarjeta
          </li>
          <li>
            • ✨ <strong>Nuevo:</strong> Escalado automático para mejor efecto
            visual
          </li>
        </ul>
      </div>
    </div>
  ),
};

// Configuración avanzada de imagen con overflow y fondo personalizable
export const AdvancedImageConfig: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-lg font-semibold mb-4">
          Imagen con overflow y fondo personalizable
        </h4>
        <p className="text-sm text-muted-foreground mb-6">
          Ideal para productos con transparencia que necesitan un fondo de color
          específico y que sobresalgan visualmente de la tarjeta.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sin overflow */}
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-center">Sin overflow</h5>
            <ImageCard
              src={sampleImages.example}
              alt="Sin overflow"
              title="Producto Normal"
              description="Imagen sin overflow ni fondo personalizado"
              $imageOverflow="none"
              $size="default"
              showBadge
              badgeText="Normal"
            />
          </div>

          {/* Overflow solo en la parte superior */}
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-center">
              Overflow superior
            </h5>
            <ImageCard
              src={sampleImages.example}
              alt="Overflow superior"
              title="Producto Destacado"
              description="Imagen sobresale por arriba"
              $imageOverflow="top"
              $imageBgColor="#f0f9ff"
              $size="default"
              showBadge
              badgeText="Top"
              badgePosition="top-right"
            />
          </div>

          {/* Overflow completo */}
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-center">
              Overflow completo
            </h5>
            <ImageCard
              src={sampleImages.example}
              alt="Overflow completo"
              title="Producto Premium"
              description="Imagen sobresale completamente"
              $imageOverflow="all"
              $imageBgColor="#fef2f2"
              $size="default"
              showBadge
              badgeText="Premium"
              badgePosition="top-left"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">
          Casos de uso con transparencia
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ejemplo con fondo colorido para producto con transparencia */}
          <ImageCard
            src={sampleImages.example}
            alt="Producto con transparencia"
            title="Producto Gaming"
            description="Imagen PNG con transparencia sobre fondo personalizado"
            $imageOverflow="top"
            $imageBgColor="#0f172a"
            $colorScheme="primary"
            showBadge
            badgeText="Gaming"
            badgePosition="bottom-right"
          />

          {/* Ejemplo con gradiente de fondo */}
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
            className="p-6 rounded-lg">
            <ImageCard
              src={sampleImages.example}
              alt="Producto premium"
              title="Producto Premium"
              description="Con overflow completo y fondo dorado"
              $imageOverflow="all"
              $imageBgColor="#fbbf24"
              $colorScheme="minimal"
              showBadge
              badgeText="Premium"
              badgePosition="top-right"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Configuración interactiva con store
export const InteractiveAdvanced: Story = {
  render: () => {
    const {
      advancedImageOverflow,
      advancedImageBgColor,
      overflowExample,
      setAdvancedImageOverflow,
      setAdvancedImageBgColor,
      setOverflowExample,
      clearAllImageCard,
    } = useImageCardExamples();

    return (
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-4">
            Configuración Interactiva Avanzada
          </h4>

          {/* Controles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted/20 rounded-lg">
            <div>
              <label className="block text-sm font-medium mb-2">
                Overflow de imagen:
              </label>
              <select
                value={advancedImageOverflow}
                onChange={(e) =>
                  setAdvancedImageOverflow(
                    e.target.value as 'none' | 'top' | 'all'
                  )
                }
                className="w-full p-2 border rounded">
                <option value="none">Sin overflow</option>
                <option value="top">Overflow superior</option>
                <option value="all">Overflow completo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Color de fondo:
              </label>
              <input
                type="color"
                value={advancedImageBgColor}
                onChange={(e) => setAdvancedImageBgColor(e.target.value)}
                className="w-full h-10 rounded border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Texto del ejemplo:
              </label>
              <input
                type="text"
                value={overflowExample}
                onChange={(e) => setOverflowExample(e.target.value)}
                placeholder="Ingresa texto..."
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Vista previa */}
          <div className="border rounded-lg p-6 bg-white">
            <ImageCard
              src={sampleImages.example}
              alt="Configuración avanzada"
              title="Producto Configurado"
              description={
                overflowExample || 'Configura el overflow y fondo de la imagen'
              }
              $imageOverflow={advancedImageOverflow}
              $imageBgColor={advancedImageBgColor}
              showBadge
              badgeText="Configurable"
              badgePosition="top-right"
              $colorScheme="primary"
            />
          </div>

          <div className="mt-4">
            <Button
              onClick={clearAllImageCard}
              $colorScheme="outline"
              $size="sm">
              Limpiar configuración
            </Button>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-2">
            💡 Tip de Implementación
          </h5>
          <p className="text-sm text-blue-700">
            <strong>Overflow:</strong> Usa <code>$imageOverflow="top"</code>{' '}
            para productos destacados que necesiten sobresalir visualmente.
            <br />
            <strong>Fondo personalizable:</strong> Usa{' '}
            <code>$imageBgColor="#color"</code> para productos con transparencia
            que necesiten un fondo específico de marca.
          </p>
        </div>
      </div>
    );
  },
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

// Demostración del Escalado Visual
export const ScalingDemo: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold">
          🎯 Demostración del Escalado Visual
        </h3>
        <p className="text-muted-foreground">
          Observa cómo las imágenes se agrandan cuando tienen overflow activado
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sin overflow - tamaño normal */}
        <div className="space-y-4">
          <h4 className="text-center font-semibold text-green-700">
            📏 Normal (100%)
          </h4>
          <div className="border-2 border-dashed border-green-300 p-6 bg-green-50">
            <ImageCard
              src={sampleImages.tech}
              alt="Tecnología normal"
              title="Sin Overflow"
              description="Imagen en tamaño normal"
              $size="sm"
              $imageOverflow="none"
            />
          </div>
          <p className="text-sm text-green-600 text-center">
            La imagen mantiene su tamaño original
          </p>
        </div>

        {/* Overflow superior - escalado 3% */}
        <div className="space-y-4">
          <h4 className="text-center font-semibold text-blue-700">
            📈 Superior (103%)
          </h4>
          <div className="border-2 border-dashed border-blue-300 p-6 bg-blue-50">
            <ImageCard
              src={sampleImages.tech}
              alt="Tecnología overflow superior"
              title="Overflow Top"
              description="Imagen escalada 3%"
              $size="sm"
              $imageOverflow="top"
            />
          </div>
          <p className="text-sm text-blue-600 text-center">
            La imagen se agranda un 3% y sobresale por arriba
          </p>
        </div>

        {/* Overflow completo - escalado 10% */}
        <div className="space-y-4">
          <h4 className="text-center font-semibold text-purple-700">
            🚀 Completo (110%)
          </h4>
          <div className="border-2 border-dashed border-purple-300 p-6 bg-purple-50">
            <ImageCard
              src={sampleImages.tech}
              alt="Tecnología overflow completo"
              title="Overflow All"
              description="Imagen escalada 10%"
              $size="sm"
              $imageOverflow="all"
            />
          </div>
          <p className="text-sm text-purple-600 text-center">
            La imagen se agranda un 10% y sobresale por arriba/abajo, con
            espaciado optimizado del texto
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h5 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <span>💡</span> Efecto Visual Mejorado
        </h5>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            <strong>¿Por qué escalamos las imágenes?</strong> El escalado hace
            que el overflow sea más evidente y atractivo visualmente, creando un
            efecto de "zoom" que llama la atención.
          </p>
          <p>
            <strong>Escalado inteligente:</strong> El overflow superior usa un
            escalado sutil (3%) mientras que el overflow completo usa un
            escalado más prominente (10%).
          </p>
          <p>
            <strong>Transiciones suaves:</strong> El escalado incluye
            transiciones CSS para cambios fluidos entre estados.
          </p>
          <p>
            <strong>✨ Mejoras recientes:</strong> Eliminados shadows/borders
            automáticamente, corregida dirección del overflow superior, centrado
            perfecto para overflow completo, y espaciado inteligente del
            contenido de texto.
          </p>
        </div>
      </div>
    </div>
  ),
};

