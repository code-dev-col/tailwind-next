import type { Meta, StoryObj } from '@storybook/react';
import { Center } from './';
import { Container } from '../Container';
import { Button } from '../Button';
import { Text } from '../Text';
import { Badge } from '../Badge';
import { Avatar } from '../Avatar';

const meta: Meta<typeof Center> = {
  title: 'Atoms/Center',
  component: Center,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'El contenido que será centrado responsivamente',
    },
    $custom: {
      control: 'text',
      description: 'Clases adicionales de Tailwind para personalización',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <Center>
        <Container
          $padding="p-8"
          $backgroundColor="bg-white"
          $borderRadius="rounded-lg"
          className="shadow-sm">
          <Text as="h1" $size="3xl" $weight="bold" className="mb-4 text-center">
            Componente Center
          </Text>
          <Text $variant="muted" className="text-center">
            Este contenido se centra automáticamente con padding responsivo
            usando container queries (cqw).
          </Text>
        </Container>
      </Center>
    </div>
  ),
};

export const ResponsiveBehavior: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <Center>
        <Container
          $padding="p-6"
          $backgroundColor="bg-white"
          $borderRadius="rounded-lg"
          className="shadow-sm mb-8">
          <Text as="h2" $size="2xl" $weight="bold" className="mb-4">
            Comportamiento Responsivo
          </Text>
          <div className="space-y-4">
            <div className="p-4 bg-red-100 rounded">
              <Text $weight="semibold" className="text-red-800">
                Mobile (&lt; 380px)
              </Text>
              <Text $size="sm" className="text-red-700">
                max-width: 396.8px, padding: 2cqw
              </Text>
            </div>
            <div className="p-4 bg-yellow-100 rounded">
              <Text $weight="semibold" className="text-yellow-800">
                Tablet (380px - 1024px)
              </Text>
              <Text $size="sm" className="text-yellow-700">
                max-width: 800px, padding: 6cqw
              </Text>
            </div>
            <div className="p-4 bg-green-100 rounded">
              <Text $weight="semibold" className="text-green-800">
                Desktop (&gt; 1024px)
              </Text>
              <Text $size="sm" className="text-green-700">
                max-width: 1500px, padding: 7cqw
              </Text>
            </div>
          </div>
        </Container>
      </Center>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <Center>
        <Container
          $padding="p-8"
          $backgroundColor="bg-white"
          $borderRadius="rounded-lg"
          className="shadow-sm">
          <div className="text-center mb-8">
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Usuario"
              $size="lg"
              className="mx-auto mb-4"
            />
            <Text as="h2" $size="2xl" $weight="bold" className="mb-2">
              John Doe
            </Text>
            <Badge $variant="secondary" className="mb-4">
              Desarrollador Frontend
            </Badge>
            <Text $variant="muted" className="mb-6 max-w-md mx-auto">
              Especialista en React y TypeScript con más de 5 años de
              experiencia creando interfaces de usuario modernas y accesibles.
            </Text>
            <div className="flex gap-4 justify-center">
              <Button $variant="default">Contactar</Button>
              <Button $variant="outline">Ver Portfolio</Button>
            </div>
          </div>
        </Container>
      </Center>
    </div>
  ),
};

export const MultipleBlocks: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <Center>
        <div className="space-y-8">
          {/* Header */}
          <Container
            $padding="p-6"
            $backgroundColor="bg-white"
            $borderRadius="rounded-lg"
            className="shadow-sm">
            <Text as="h1" $size="3xl" $weight="bold" className="text-center">
              Mi Blog Personal
            </Text>
            <Text $variant="muted" className="text-center mt-2">
              Reflexiones sobre desarrollo web y tecnología
            </Text>
          </Container>

          {/* Article 1 */}
          <Container
            $padding="p-6"
            $backgroundColor="bg-white"
            $borderRadius="rounded-lg"
            className="shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Badge $variant="default">React</Badge>
              <Text $size="sm" $variant="muted">
                15 de enero, 2024
              </Text>
            </div>
            <Text as="h2" $size="xl" $weight="bold" className="mb-3">
              Los Hooks más útiles de React 18
            </Text>
            <Text $variant="muted" className="mb-4">
              Una guía completa sobre los hooks que más uso en mis proyectos
              diarios, desde useState hasta los nuevos concurrent features.
            </Text>
            <Button $variant="link" className="p-0">
              Leer más →
            </Button>
          </Container>

          {/* Article 2 */}
          <Container
            $padding="p-6"
            $backgroundColor="bg-white"
            $borderRadius="rounded-lg"
            className="shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Badge $variant="secondary">TypeScript</Badge>
              <Text $size="sm" $variant="muted">
                8 de enero, 2024
              </Text>
            </div>
            <Text as="h2" $size="xl" $weight="bold" className="mb-3">
              Tipos avanzados en TypeScript
            </Text>
            <Text $variant="muted" className="mb-4">
              Explorando utility types, conditional types y mapped types para
              crear APIs más robustas y expresivas.
            </Text>
            <Button $variant="link" className="p-0">
              Leer más →
            </Button>
          </Container>
        </div>
      </Center>
    </div>
  ),
};

export const WithCustomPadding: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <Center $custom="py-12">
        <Container
          $padding="p-8"
          $backgroundColor="bg-white"
          $borderRadius="rounded-lg"
          className="shadow-sm">
          <Text as="h2" $size="2xl" $weight="bold" className="mb-4 text-center">
            Center con Padding Vertical Personalizado
          </Text>
          <Text $variant="muted" className="text-center mb-6">
            Usando la prop $custom="py-12" para agregar padding vertical
            adicional.
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Container
              $padding="p-4"
              $backgroundColor="bg-blue-50"
              $borderRadius="rounded"
              className="text-center">
              <Text $weight="semibold" $size="lg" className="text-blue-800">
                Característica 1
              </Text>
              <Text $size="sm" className="text-blue-600 mt-2">
                Container queries permiten padding fluido
              </Text>
            </Container>
            <Container
              $padding="p-4"
              $backgroundColor="bg-green-50"
              $borderRadius="rounded"
              className="text-center">
              <Text $weight="semibold" $size="lg" className="text-green-800">
                Característica 2
              </Text>
              <Text $size="sm" className="text-green-600 mt-2">
                Responsive sin media queries complejas
              </Text>
            </Container>
            <Container
              $padding="p-4"
              $backgroundColor="bg-purple-50"
              $borderRadius="rounded"
              className="text-center">
              <Text $weight="semibold" $size="lg" className="text-purple-800">
                Característica 3
              </Text>
              <Text $size="sm" className="text-purple-600 mt-2">
                Máximos anchos optimizados por dispositivo
              </Text>
            </Container>
          </div>
        </Container>
      </Center>
    </div>
  ),
};

export const DemoLayout: Story = {
  render: () => (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <Center>
          <Container className="text-center">
            <Text as="h1" $size="4xl" $weight="bold" className="mb-4">
              Centro Responsivo
            </Text>
            <Text $size="lg" className="mb-8 opacity-90">
              Demuestra cómo el componente Center mantiene el contenido centrado
              con padding optimal en todos los dispositivos.
            </Text>
            <Button $variant="secondary" $size="lg">
              Comenzar
            </Button>
          </Container>
        </Center>
      </div>

      {/* Content Section */}
      <div className="py-16">
        <Center>
          <Container>
            <Text
              as="h2"
              $size="3xl"
              $weight="bold"
              className="text-center mb-12">
              Características Principales
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '📱',
                  title: 'Mobile First',
                  description:
                    'Optimizado para dispositivos móviles con padding fluido',
                },
                {
                  icon: '💻',
                  title: 'Responsive',
                  description: 'Se adapta automáticamente a tablets y desktop',
                },
                {
                  icon: '⚡',
                  title: 'Container Queries',
                  description:
                    'Usa unidades cqw para padding verdaderamente responsivo',
                },
                {
                  icon: '🎯',
                  title: 'Centrado Perfecto',
                  description:
                    'Mantiene el contenido centrado en todas las resoluciones',
                },
                {
                  icon: '🔧',
                  title: 'Personalizable',
                  description:
                    'Prop $custom permite agregar clases adicionales',
                },
                {
                  icon: '🚀',
                  title: 'Alto Rendimiento',
                  description: 'CSS puro sin JavaScript, máxima performance',
                },
              ].map((feature, index) => (
                <Container
                  key={index}
                  $padding="p-6"
                  $backgroundColor="bg-white"
                  $borderRadius="rounded-lg"
                  className="shadow-sm text-center">
                  <Text $size="3xl" className="mb-4">
                    {feature.icon}
                  </Text>
                  <Text $weight="semibold" $size="lg" className="mb-2">
                    {feature.title}
                  </Text>
                  <Text $size="sm" $variant="muted">
                    {feature.description}
                  </Text>
                </Container>
              ))}
            </div>
          </Container>
        </Center>
      </div>
    </div>
  ),
};

