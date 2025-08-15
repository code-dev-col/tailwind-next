import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';
import { useImageExamples } from '@/stores/imageExamples.store';

const meta: Meta<typeof Image> = {
  title: 'Atoms/Media/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL de la imagen',
    },
    alt: {
      control: 'text',
      description: 'Texto alternativo para accesibilidad',
    },
    $variant: {
      control: 'select',
      options: ['default', 'rounded', 'circle', 'square', 'bordered'],
      description: 'Variante visual del contenedor',
    },
    $size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Tamaño predefinido',
    },
    $aspect: {
      control: 'select',
      options: ['square', '16/9', '4/3', '3/2', '2/1', 'auto'],
      description: 'Relación de aspecto predefinida',
    },
    $objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
      description: 'Modo de ajuste de la imagen',
    },
    $objectPosition: {
      control: 'select',
      options: [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ],
      description: 'Posición del objeto',
    },
    $useNextImage: {
      control: 'boolean',
      description: 'Usar Next.js Image automáticamente',
    },
    $fill: {
      control: 'boolean',
      description: 'Si la imagen debe llenar el contenedor padre',
    },
    $showSkeleton: {
      control: 'boolean',
      description: 'Mostrar skeleton mientras carga',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Imagen de ejemplo para las historias
const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80';
const SAMPLE_PORTRAIT =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face&auto=format&q=80';
const SAMPLE_LANDSCAPE =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop&crop=entropy&auto=format&q=80';

export const Default: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Imagen de ejemplo',
    width: 400,
    height: 300,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-4 items-center">
      <div className="text-center">
        <Image src={SAMPLE_IMAGE} alt="Default" $variant="default" $size="lg" />
        <p className="text-sm text-muted-foreground mt-2">Default</p>
      </div>

      <div className="text-center">
        <Image src={SAMPLE_IMAGE} alt="Rounded" $variant="rounded" $size="lg" />
        <p className="text-sm text-muted-foreground mt-2">Rounded</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_PORTRAIT}
          alt="Circle"
          $variant="circle"
          $size="lg"
        />
        <p className="text-sm text-muted-foreground mt-2">Circle</p>
      </div>

      <div className="text-center">
        <Image src={SAMPLE_IMAGE} alt="Square" $variant="square" $size="lg" />
        <p className="text-sm text-muted-foreground mt-2">Square</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_IMAGE}
          alt="Bordered"
          $variant="bordered"
          $size="lg"
        />
        <p className="text-sm text-muted-foreground mt-2">Bordered</p>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Image
          src={SAMPLE_PORTRAIT}
          alt="Extra Small"
          $size="xs"
          $variant="circle"
        />
        <p className="text-xs text-muted-foreground mt-1">XS</p>
      </div>

      <div className="text-center">
        <Image src={SAMPLE_PORTRAIT} alt="Small" $size="sm" $variant="circle" />
        <p className="text-xs text-muted-foreground mt-1">SM</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_PORTRAIT}
          alt="Medium"
          $size="md"
          $variant="circle"
        />
        <p className="text-xs text-muted-foreground mt-1">MD</p>
      </div>

      <div className="text-center">
        <Image src={SAMPLE_PORTRAIT} alt="Large" $size="lg" $variant="circle" />
        <p className="text-xs text-muted-foreground mt-1">LG</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_PORTRAIT}
          alt="Extra Large"
          $size="xl"
          $variant="circle"
        />
        <p className="text-xs text-muted-foreground mt-1">XL</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_PORTRAIT}
          alt="2X Large"
          $size="2xl"
          $variant="rounded"
        />
        <p className="text-xs text-muted-foreground mt-1">2XL</p>
      </div>
    </div>
  ),
};

export const AspectRatios: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <Image
          src={SAMPLE_IMAGE}
          alt="Square aspect"
          $aspect="square"
          $variant="rounded"
          className="w-48"
        />
        <p className="text-sm text-muted-foreground mt-2">Square (1:1)</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_LANDSCAPE}
          alt="Video aspect"
          $aspect="16/9"
          $variant="rounded"
          className="w-48"
        />
        <p className="text-sm text-muted-foreground mt-2">Video (16:9)</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_IMAGE}
          alt="4:3 aspect"
          $aspect="4/3"
          $variant="rounded"
          className="w-48"
        />
        <p className="text-sm text-muted-foreground mt-2">Classic (4:3)</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_IMAGE}
          alt="3:2 aspect"
          $aspect="3/2"
          $variant="rounded"
          className="w-48"
        />
        <p className="text-sm text-muted-foreground mt-2">Photo (3:2)</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_LANDSCAPE}
          alt="2:1 aspect"
          $aspect="2/1"
          $variant="rounded"
          className="w-48"
        />
        <p className="text-sm text-muted-foreground mt-2">Banner (2:1)</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_IMAGE}
          alt="Auto aspect"
          $aspect="auto"
          $variant="rounded"
          className="w-48"
          width={200}
          height={150}
        />
        <p className="text-sm text-muted-foreground mt-2">Auto</p>
      </div>
    </div>
  ),
};

export const ObjectFit: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-4">
      <div className="text-center">
        <Image
          src={SAMPLE_PORTRAIT}
          alt="Cover fit"
          $objectFit="cover"
          $aspect="square"
          $variant="rounded"
          className="w-32"
        />
        <p className="text-sm text-muted-foreground mt-2">Cover</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_PORTRAIT}
          alt="Contain fit"
          $objectFit="contain"
          $aspect="square"
          $variant="rounded"
          className="w-32"
        />
        <p className="text-sm text-muted-foreground mt-2">Contain</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_PORTRAIT}
          alt="Fill fit"
          $objectFit="fill"
          $aspect="square"
          $variant="rounded"
          className="w-32"
        />
        <p className="text-sm text-muted-foreground mt-2">Fill</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_PORTRAIT}
          alt="None fit"
          $objectFit="none"
          $aspect="square"
          $variant="rounded"
          className="w-32"
        />
        <p className="text-sm text-muted-foreground mt-2">None</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_PORTRAIT}
          alt="Scale down fit"
          $objectFit="scale-down"
          $aspect="square"
          $variant="rounded"
          className="w-32"
        />
        <p className="text-sm text-muted-foreground mt-2">Scale Down</p>
      </div>
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      <div className="text-center">
        <Image
          src={SAMPLE_IMAGE}
          alt="Sunset gradient"
          $variant="rounded"
          className="w-48"
          $aspect="square"
          $custom="ring-4 ring-gradient-to-r from-orange-500 to-pink-500 ring-opacity-50"
        />
        <p className="text-sm text-muted-foreground mt-2">Sunset Frame</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_IMAGE}
          alt="Ocean gradient"
          $variant="rounded"
          className="w-48"
          $aspect="square"
          $custom="ring-4 ring-gradient-to-r from-blue-500 to-cyan-500 ring-opacity-50"
        />
        <p className="text-sm text-muted-foreground mt-2">Ocean Frame</p>
      </div>

      <div className="text-center">
        <Image
          src={SAMPLE_IMAGE}
          alt="Forest gradient"
          $variant="rounded"
          className="w-48"
          $aspect="square"
          $custom="ring-4 ring-gradient-to-r from-green-500 to-emerald-500 ring-opacity-50"
        />
        <p className="text-sm text-muted-foreground mt-2">Forest Frame</p>
      </div>
    </div>
  ),
};

export const WithErrorFallback: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <Image
          src="https://invalid-url-that-will-fail.jpg"
          alt="Fallback por defecto"
          $variant="rounded"
          $size="lg"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Fallback por Defecto
        </p>
      </div>

      <div className="text-center">
        <Image
          src="https://another-invalid-url.jpg"
          alt="Fallback personalizado"
          $variant="rounded"
          $size="lg"
          $fallback={
            <div className="flex items-center justify-center bg-destructive/10 text-destructive w-full h-full">
              <span className="text-sm font-medium">❌ Error</span>
            </div>
          }
        />
        <p className="text-sm text-muted-foreground mt-2">
          Fallback Personalizado
        </p>
      </div>

      <div className="text-center">
        <Image
          src="https://will-also-fail.jpg"
          alt="Sin skeleton"
          $variant="rounded"
          $size="lg"
          $showSkeleton={false}
        />
        <p className="text-sm text-muted-foreground mt-2">Sin Skeleton</p>
      </div>
    </div>
  ),
};

export const NextJsIntegration: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">
          Next.js Image Integration
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <Image
              src={SAMPLE_IMAGE}
              alt="Con Next.js Image"
              $variant="rounded"
              $aspect="16/9"
              className="w-64"
              $useNextImage={true}
              $nextProps={{
                quality: 90,
                priority: true,
              }}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Con Next.js Image
            </p>
            <p className="text-xs text-green-600">Auto-optimización activada</p>
          </div>

          <div className="text-center">
            <Image
              src={SAMPLE_IMAGE}
              alt="Sin Next.js Image"
              $variant="rounded"
              $aspect="16/9"
              className="w-64"
              $useNextImage={false}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Sin Next.js Image
            </p>
            <p className="text-xs text-gray-600">IMG HTML estándar</p>
          </div>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Detección Automática</h4>
        <p className="text-sm text-muted-foreground">
          El componente detecta automáticamente si <code>next/image</code> está
          disponible y usa la optimización de Next.js cuando es posible, con
          fallback a imagen HTML estándar.
        </p>
      </div>
    </div>
  ),
};

export const FillMode: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Fill Mode</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative w-64 h-48 bg-muted rounded-lg">
            <Image
              src={SAMPLE_IMAGE}
              alt="Fill mode"
              $fill={true}
              $variant="rounded"
            />
            <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              Fill Container
            </div>
          </div>

          <div className="relative w-64 h-32 bg-muted rounded-lg">
            <Image
              src={SAMPLE_LANDSCAPE}
              alt="Fill mode landscape"
              $fill={true}
              $variant="rounded"
            />
            <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              Different Ratio
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Modo Fill</h4>
        <p className="text-sm text-muted-foreground">
          Con <code>$fill=true</code>, la imagen se adapta completamente al
          contenedor padre. Útil para layouts responsivos y contenedores con
          dimensiones dinámicas.
        </p>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const { clearAllImage } = useImageExamples();

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Galería Interactiva</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { src: SAMPLE_IMAGE, title: 'Paisaje' },
              { src: SAMPLE_PORTRAIT, title: 'Retrato' },
              { src: SAMPLE_LANDSCAPE, title: 'Banner' },
              {
                src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80',
                title: 'Bosque',
              },
            ].map((image, index) => (
              <div key={index} className="text-center">
                <Image
                  src={image.src}
                  alt={image.title}
                  $variant="rounded"
                  $aspect="square"
                  className="w-full cursor-pointer hover:scale-105 transition-transform"
                  onImageLoad={() => console.log(`Imagen ${index + 1} cargada`)}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {image.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={clearAllImage}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors">
            Limpiar Galería
          </button>
        </div>

        <div className="bg-violet-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Funcionalidades Interactivas</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Hover effects con transformaciones</li>
            <li>• Callbacks de carga y error</li>
            <li>• Skeleton loading automático</li>
            <li>• Fallbacks personalizables</li>
            <li>• Integración con estados globales</li>
          </ul>
        </div>
      </div>
    );
  },
};

