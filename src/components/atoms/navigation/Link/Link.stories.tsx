import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { useLinkExamples } from '../../../../stores/linkExamples.store';
import {
  FiHome,
  FiArrowRight,
  FiDownload,
  FiGithub,
  FiMail,
} from 'react-icons/fi';

const meta: Meta<typeof Link> = {
  title: 'Atoms/Navigation/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'URL de destino del enlace',
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
    },
    $size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    $underline: {
      control: 'select',
      options: ['none', 'hover', 'always'],
    },
    $external: {
      control: 'boolean',
    },
    $disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Link $store={useLinkExamples} storeKey="defaultExample" href="#fallback">
      Enlace básico con store
    </Link>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground">Theme.css Color Schemes</h4>
      <div className="flex flex-col gap-3">
        <Link
          $store={useLinkExamples}
          storeKey="defaultExample"
          $colorScheme="default"
          href="#fallback">
          Default scheme
        </Link>
        <Link
          $store={useLinkExamples}
          storeKey="secondaryExample"
          $colorScheme="secondary"
          href="#fallback">
          Secondary scheme
        </Link>
        <Link
          $store={useLinkExamples}
          storeKey="destructiveExample"
          $colorScheme="destructive"
          href="#fallback">
          Destructive scheme
        </Link>
        <Link
          $store={useLinkExamples}
          storeKey="accentExample"
          $colorScheme="accent"
          href="#fallback">
          Accent scheme
        </Link>
        <Link
          $store={useLinkExamples}
          storeKey="mutedExample"
          $colorScheme="muted"
          href="#fallback">
          Muted scheme
        </Link>
        <Link
          $store={useLinkExamples}
          storeKey="minimalExample"
          $colorScheme="minimal"
          href="#fallback">
          Minimal scheme
        </Link>
      </div>
    </div>
  ),
};

export const WithStore: Story = {
  render: () => {
    const { clearAllLink } = useLinkExamples();

    return (
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">
          Store Integration Examples
        </h4>

        <div className="flex flex-col gap-3">
          <Link
            $store={useLinkExamples}
            storeKey="externalExample"
            $colorScheme="secondary"
            $startIcon={<FiGithub />}
            href="#fallback">
            External Link from Store
          </Link>

          <Link
            $store={useLinkExamples}
            storeKey="emailExample"
            $colorScheme="accent"
            $startIcon={<FiMail />}
            href="#fallback">
            Email from Store
          </Link>

          <Link
            $store={useLinkExamples}
            storeKey="dashboardExample"
            $colorScheme="default"
            $startIcon={<FiHome />}
            href="#fallback">
            Dashboard Link from Store
          </Link>
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={clearAllLink}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm transition-colors">
            Clear All Links
          </button>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p>External: {useLinkExamples((state) => state.externalExample)}</p>
          <p>Email: {useLinkExamples((state) => state.emailExample)}</p>
          <p>Dashboard: {useLinkExamples((state) => state.dashboardExample)}</p>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Link href="#" $size="sm">
        Enlace pequeño
      </Link>
      <Link href="#" $size="md">
        Enlace mediano
      </Link>
      <Link href="#" $size="lg">
        Enlace grande
      </Link>
    </div>
  ),
};

export const Underlines: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="#" $underline="none">
        Sin subrayado
      </Link>
      <Link href="#" $underline="hover">
        Subrayado al hover (default)
      </Link>
      <Link href="#" $underline="always">
        Siempre subrayado
      </Link>
    </div>
  ),
};

export const ExternalLinks: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="https://google.com">Enlace externo automático (https)</Link>
      <Link href="//example.com">Enlace externo automático (//)</Link>
      <Link href="/internal" $external>
        Enlace interno forzado como externo
      </Link>
      <Link href="mailto:test@example.com">Enlace de email</Link>
      <Link href="tel:+1234567890">Enlace de teléfono</Link>
    </div>
  ),
};

export const LinkWithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="#" $startIcon={<FiHome />}>
        Enlace con icono inicial
      </Link>
      <Link href="#" $endIcon={<FiArrowRight />}>
        Enlace con icono final
      </Link>
      <Link href="#" $startIcon={<FiDownload />} $endIcon={<FiArrowRight />}>
        Enlace con ambos iconos
      </Link>
      <Link
        href="https://github.com"
        $startIcon={<FiGithub />}
        $colorScheme="default">
        GitHub (externo con icono)
      </Link>
      <Link
        href="mailto:test@example.com"
        $startIcon={<FiMail />}
        $colorScheme="secondary">
        Enviar email
      </Link>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="#" $colorScheme="default">
        Enlace normal
      </Link>
      <Link href="#" $colorScheme="default" $disabled>
        Enlace deshabilitado
      </Link>
      <Link
        href="#"
        $disabled
        $startIcon={<FiHome />}
        $endIcon={<FiArrowRight />}>
        Con iconos deshabilitado
      </Link>
      <Link href="https://example.com" $disabled>
        Externo deshabilitado
      </Link>
    </div>
  ),
};

export const NextJSIntegration: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Detección automática de Next.js</h3>
        <p className="text-sm text-gray-600 mb-3">
          El componente detecta automáticamente si Next.js está disponible y usa
          Next.js Link para navegación interna:
        </p>
        <div className="space-y-2">
          <Link href="/dashboard">
            Navegación interna (usa Next.js Link automáticamente)
          </Link>
          <Link href="/profile" $colorScheme="default">
            Otra página interna
          </Link>
          <Link href="https://external.com">
            Enlace externo (usa &lt;a&gt; tag)
          </Link>
        </div>
      </div>

      <div className="p-4 bg-green-50 rounded-lg">
        <h3 className="font-semibold mb-2">Props de Next.js</h3>
        <p className="text-sm text-gray-600 mb-3">
          Puedes pasar props específicas de Next.js con $nextProps:
        </p>
        <Link
          href="/slow-page"
          $nextProps={{
            prefetch: false,
            replace: true,
            scroll: false,
          }}>
          Con props de Next.js (prefetch: false, replace: true)
        </Link>
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold mb-2">Desactivar Next.js</h3>
        <p className="text-sm text-gray-600 mb-3">
          Puedes forzar el uso de &lt;a&gt; tag incluso con Next.js disponible:
        </p>
        <Link href="/internal-page" $useNextLink={false} $colorScheme="muted">
          Enlace interno sin Next.js Link
        </Link>
      </div>
    </div>
  ),
};

export const CustomLinkComponent: Story = {
  render: () => {
    // Simulamos React Router Link
    const ReactRouterLink = ({ to, href, children, ...props }: any) => (
      <a href={to || href} {...props}>
        {children} <span className="text-xs text-gray-400">(React Router)</span>
      </a>
    );

    return (
      <div className="space-y-4">
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold mb-2">Con otros routers</h3>
          <p className="text-sm text-gray-600 mb-3">
            Compatible con React Router y otros sistemas de routing:
          </p>
          <div className="space-y-2">
            <Link href="/react-router-page" $linkComponent={ReactRouterLink}>
              Usando React Router Link
            </Link>
            <Link
              href="/another-page"
              $linkComponent={ReactRouterLink}
              $colorScheme="default">
              Otra página con React Router
            </Link>
          </div>
        </div>
      </div>
    );
  },
};

export const InContext: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <p className="text-muted-foreground">
        Este es un párrafo de ejemplo con un{' '}
        <Link href="#" $colorScheme="default">
          enlace inline
        </Link>{' '}
        que se integra naturalmente con el texto. También puedes{' '}
        <Link href="https://example.com" $colorScheme="secondary">
          visitar sitios externos
        </Link>{' '}
        o usar{' '}
        <Link href="#" $colorScheme="muted" $underline="always">
          enlaces con subrayado permanente
        </Link>
        .
      </p>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Enlaces de navegación:</h4>
        <div className="flex gap-4">
          <Link href="#" $colorScheme="muted">
            Inicio
          </Link>
          <Link href="#" $colorScheme="muted">
            Productos
          </Link>
          <Link href="#" $colorScheme="muted">
            Contacto
          </Link>
        </div>
      </div>
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link
        href="#"
        $custom="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700">
        Enlace con gradiente de texto
      </Link>

      <Link
        href="#"
        $custom="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent hover:from-blue-600 hover:to-cyan-600">
        Gradiente azul a cian
      </Link>

      <Link
        href="#"
        $custom="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all"
        $underline="none">
        Enlace con fondo gradiente
      </Link>

      <Link
        href="https://github.com"
        $startIcon={<FiGithub />}
        $custom="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-lg hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl transition-all"
        $underline="none">
        GitHub con estilo botón
      </Link>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4">
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          alert('¡Enlace clickeado!');
        }}>
        Enlace con onClick personalizado
      </Link>
      <Link
        href="#"
        $colorScheme="default"
        $startIcon={<FiDownload />}
        onClick={(e) => {
          e.preventDefault();
          console.log('Iniciando descarga...');
          alert('Descarga iniciada');
        }}>
        Simular descarga
      </Link>
      <Link
        href="/dashboard"
        $colorScheme="default"
        $startIcon={<FiHome />}
        onClick={(e) => {
          e.preventDefault();
          alert('Navegando al dashboard...');
        }}>
        Navegación con callback
      </Link>
    </div>
  ),
};


