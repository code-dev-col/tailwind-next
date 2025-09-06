import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '.';
import { Container } from '../Container';
import { Button } from '../../forms/Button';
import { Text } from '../../display/Text';
import { Badge } from '../../feedback/Badge';
import { Avatar } from '../../display/Avatar';

const meta: Meta<typeof Grid> = {
  title: 'Atoms/Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Los elementos que irán dentro del grid',
    },
    $columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 'auto'],
      description: 'Número de columnas o auto para auto-fit',
    },
    $maxGridWidth: {
      control: 'text',
      description: 'Ancho máximo del grid (1200px, max-w-6xl, etc.)',
    },
    $maxItemWidth: {
      control: 'text',
      description: 'Ancho máximo para cada hijo (300px, max-w-sm, etc.)',
    },
    $gap: {
      control: 'text',
      description: 'Espaciado entre celdas (gap-4, 1rem, etc.)',
    },
    $justifyContent: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      description: 'Alineación horizontal del grid',
    },
    $alignItems: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
      description: 'Alineación vertical del grid',
    },
    $zIndex: {
      control: 'text',
      description: 'z-index del grid (z-10, 100, etc.)',
    },
    $isShadow: {
      control: 'boolean',
      description: 'Si el grid debe tener sombra',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    $columns: 'auto',
    $maxGridWidth: '1200px',
    $gap: '1rem',
    $justifyContent: 'center',
    $alignItems: 'start',
  },
  render: (args) => (
    <Container $padding="p-6" $backgroundColor="bg-gray-50">
      <Text as="h2" $size="2xl" $weight="bold" className="mb-6 text-center">
        Grid Estándar - Ejemplo Básico
      </Text>

      <Grid {...args}>
        {Array.from({ length: 8 }, (_, i) => (
          <Container
            key={i}
            $backgroundColor="bg-white"
            $padding="p-6"
            $borderRadius="rounded-lg"
            $borderWidth="border"
            $borderColor="border-gray-200"
            className="shadow-sm">
            <Text as="h3" $weight="semibold" className="mb-2">
              Elemento {i + 1}
            </Text>
            <Text $size="sm" $colorScheme="muted" className="mb-4">
              Contenido de ejemplo para mostrar cómo se adapta el grid
              automáticamente.
            </Text>
            <Button $colorScheme="outline" $size="sm">
              Ver más
            </Button>
          </Container>
        ))}
      </Grid>
    </Container>
  ),
};

export const ColumnVariations: Story = {
  render: () => (
    <Container $padding="p-6" className="space-y-12">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        Variaciones de Columnas ($columns)
      </Text>

      {/* 1 columna */}
      <Container>
        <Text as="h3" $size="lg" $weight="semibold" className="mb-4">
          1 Columna ($columns=1)
        </Text>
        <Grid $columns={1} $gap="1rem" $maxGridWidth="600px">
          {Array.from({ length: 3 }, (_, i) => (
            <Container
              key={i}
              $backgroundColor="bg-blue-100"
              $padding="p-4"
              $borderRadius="rounded-lg"
              $textAlign="center">
              <Text $weight="bold">Item {i + 1}</Text>
            </Container>
          ))}
        </Grid>
      </Container>

      {/* 2 columnas */}
      <Container>
        <Text as="h3" $size="lg" $weight="semibold" className="mb-4">
          2 Columnas ($columns=2)
        </Text>
        <Grid $columns={2} $gap="1rem" $maxGridWidth="600px">
          {Array.from({ length: 4 }, (_, i) => (
            <Container
              key={i}
              $backgroundColor="bg-green-100"
              $padding="p-4"
              $borderRadius="rounded-lg"
              $textAlign="center">
              <Text $weight="bold">Item {i + 1}</Text>
            </Container>
          ))}
        </Grid>
      </Container>

      {/* 3 columnas */}
      <Container>
        <Text as="h3" $size="lg" $weight="semibold" className="mb-4">
          3 Columnas ($columns=3)
        </Text>
        <Grid $columns={3} $gap="1rem" $maxGridWidth="800px">
          {Array.from({ length: 6 }, (_, i) => (
            <Container
              key={i}
              $backgroundColor="bg-purple-100"
              $padding="p-4"
              $borderRadius="rounded-lg"
              $textAlign="center">
              <Text $weight="bold">Item {i + 1}</Text>
            </Container>
          ))}
        </Grid>
      </Container>

      {/* 4 columnas */}
      <Container>
        <Text as="h3" $size="lg" $weight="semibold" className="mb-4">
          4 Columnas ($columns=4)
        </Text>
        <Grid $columns={4} $gap="1rem" $maxGridWidth="1000px">
          {Array.from({ length: 8 }, (_, i) => (
            <Container
              key={i}
              $backgroundColor="bg-orange-100"
              $padding="p-4"
              $borderRadius="rounded-lg"
              $textAlign="center">
              <Text $weight="bold">Item {i + 1}</Text>
            </Container>
          ))}
        </Grid>
      </Container>

      {/* Auto (por defecto) */}
      <Container>
        <Text as="h3" $size="lg" $weight="semibold" className="mb-4">
          Auto-fit ($columns="auto" - por defecto)
        </Text>
        <Text $size="sm" $colorScheme="muted" className="mb-4">
          Se adapta automáticamente según el espacio disponible (mínimo 230px
          por columna)
        </Text>
        <Grid $columns="auto" $gap="1rem" $maxGridWidth="1000px">
          {Array.from({ length: 8 }, (_, i) => (
            <Container
              key={i}
              $backgroundColor="bg-red-100"
              $padding="p-4"
              $borderRadius="rounded-lg"
              $textAlign="center">
              <Text $weight="bold">Item {i + 1}</Text>
            </Container>
          ))}
        </Grid>
      </Container>

      {/* Información sobre responsividad */}
      <Container
        $backgroundColor="bg-blue-50"
        $padding="p-6"
        $borderRadius="rounded-lg"
        $borderWidth="border"
        $borderColor="border-blue-200">
        <Text as="h4" $weight="semibold" className="mb-3">
          📱 Comportamiento Responsivo:
        </Text>
        <Container as="ul" className="text-sm space-y-2">
          <li>
            <Text as="strong">Móvil (&lt; 640px):</Text> Siempre 1 columna para
            mejor legibilidad
          </li>
          <li>
            <Text as="strong">Tablet (≥ 640px):</Text> Inicia con el número de
            columnas especificado o auto-fit
          </li>
          <li>
            <Text as="strong">Desktop (≥ 1024px):</Text> Columnas completas
            según la especificación
          </li>
          <li>
            <Text as="strong">Auto-fit:</Text> Se adapta automáticamente
            manteniendo mínimo 230px por columna
          </li>
        </Container>
      </Container>
    </Container>
  ),
};

export const ProductGrid: Story = {
  render: () => (
    <Container $padding="p-6" $backgroundColor="bg-gray-50">
      <Text as="h2" $size="2xl" $weight="bold" className="mb-6 text-center">
        Grid de Productos
      </Text>

      <Grid $maxGridWidth="1400px" $gap="1.5rem" $maxItemWidth="320px">
        {[
          {
            name: 'MacBook Pro',
            price: '$2,499',
            badge: 'Popular',
            color: 'bg-blue-500',
          },
          {
            name: 'iPhone 15',
            price: '$999',
            badge: 'Nuevo',
            color: 'bg-green-500',
          },
          {
            name: 'iPad Air',
            price: '$599',
            badge: 'Oferta',
            color: 'bg-red-500',
          },
          {
            name: 'Apple Watch',
            price: '$399',
            badge: 'Trending',
            color: 'bg-purple-500',
          },
          {
            name: 'AirPods Pro',
            price: '$249',
            badge: 'Best Seller',
            color: 'bg-orange-500',
          },
          {
            name: 'Mac Studio',
            price: '$1,999',
            badge: 'Pro',
            color: 'bg-gray-600',
          },
        ].map((product, i) => (
          <Container
            key={i}
            $backgroundColor="bg-white"
            $padding="p-6"
            $borderRadius="rounded-xl"
            className="shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Container className="relative mb-4">
              <Container
                $backgroundColor={product.color}
                className="h-40 rounded-lg flex items-center justify-center mb-3">
                <Text $size="3xl" className="opacity-75">
                  📱
                </Text>
              </Container>
              <Badge
                $colorScheme="secondary"
                className="absolute top-2 right-2">
                {product.badge}
              </Badge>
            </Container>

            <Text as="h3" $size="lg" $weight="bold" className="mb-2">
              {product.name}
            </Text>

            <Text
              $size="2xl"
              $weight="bold"
              $color="text-blue-600"
              className="mb-4">
              {product.price}
            </Text>

            <Container $display="flex" $gap="gap-2">
              <Button $colorScheme="default" className="flex-1">
                Comprar
              </Button>
              <Button $colorScheme="outline" className="flex-1">
                Ver detalles
              </Button>
            </Container>
          </Container>
        ))}
      </Grid>
    </Container>
  ),
};

export const TeamGrid: Story = {
  render: () => (
    <Container $padding="p-6" $backgroundColor="bg-gray-50">
      <Text as="h2" $size="2xl" $weight="bold" className="mb-2 text-center">
        Nuestro Equipo
      </Text>
      <Text $colorScheme="muted" className="mb-8 text-center">
        Conoce a las personas que hacen posible nuestro trabajo
      </Text>

      <Grid $maxGridWidth="1000px" $gap="2rem" $maxItemWidth="280px">
        {[
          {
            name: 'Ana García',
            role: 'Frontend Developer',
            avatar: 'AG',
            color: 'from-blue-400 to-purple-500',
          },
          {
            name: 'Carlos López',
            role: 'Backend Developer',
            avatar: 'CL',
            color: 'from-green-400 to-blue-500',
          },
          {
            name: 'María Rodriguez',
            role: 'UI/UX Designer',
            avatar: 'MR',
            color: 'from-pink-400 to-red-500',
          },
          {
            name: 'David Chen',
            role: 'DevOps Engineer',
            avatar: 'DC',
            color: 'from-yellow-400 to-orange-500',
          },
          {
            name: 'Laura Kim',
            role: 'Product Manager',
            avatar: 'LK',
            color: 'from-purple-400 to-pink-500',
          },
          {
            name: 'Roberto Silva',
            role: 'QA Engineer',
            avatar: 'RS',
            color: 'from-teal-400 to-green-500',
          },
        ].map((member, i) => (
          <Container
            key={i}
            $backgroundColor="bg-white"
            $padding="p-6"
            $borderRadius="rounded-xl"
            $textAlign="center"
            className="shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Container className="mb-4">
              <Container
                $backgroundColor={`bg-gradient-to-br ${member.color}`}
                $borderRadius="rounded-full"
                className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Avatar
                  $size="lg"
                  fallback={member.avatar}
                  className="bg-transparent text-white font-bold"
                />
              </Container>
            </Container>

            <Text as="h3" $size="lg" $weight="bold" className="mb-1">
              {member.name}
            </Text>

            <Text $colorScheme="muted" className="mb-4">
              {member.role}
            </Text>

            <Container $display="flex" $justifyContent="center" $gap="gap-2">
              <Button $colorScheme="ghost" $size="sm">
                💼 LinkedIn
              </Button>
              <Button $colorScheme="ghost" $size="sm">
                📧 Email
              </Button>
            </Container>
          </Container>
        ))}
      </Grid>
    </Container>
  ),
};

export const ResponsiveBehavior: Story = {
  render: () => (
    <Container $padding="p-6" $backgroundColor="bg-gray-50">
      <Text as="h2" $size="2xl" $weight="bold" className="mb-4 text-center">
        Comportamiento Responsivo
      </Text>
      <Container
        $backgroundColor="bg-blue-50"
        $padding="p-4"
        $borderRadius="rounded-lg"
        className="mb-8">
        <Text as="h3" $weight="semibold" className="mb-2">
          Breakpoints del Grid:
        </Text>
        <Container as="ul" className="text-sm space-y-1">
          <li>
            📱 <Text as="strong">Móvil (&lt;672px):</Text> 1 columna
          </li>
          <li>
            💻 <Text as="strong">Desktop (≥672px):</Text> Auto-fit con mínimo
            230px por columna
          </li>
          <li>
            📏 <Text as="strong">Máximo:</Text> 0.9fr para mantener proporciones
          </li>
        </Container>
        <Text $size="xs" $colorScheme="muted" className="mt-2">
          Redimensiona la ventana para ver el comportamiento adaptativo
        </Text>
      </Container>

      <Grid $gap="1rem" $maxGridWidth="100%">
        {Array.from({ length: 12 }, (_, i) => (
          <Container
            key={i}
            $backgroundColor="bg-white"
            $padding="p-4"
            $borderRadius="rounded-lg"
            $borderWidth="border-2"
            $borderColor="border-blue-200"
            $textAlign="center">
            <Text $weight="bold" $color="text-blue-600">
              Item {i + 1}
            </Text>
            <Text $size="xs" $colorScheme="muted">
              {i < 4
                ? 'Contenido corto'
                : i < 8
                ? 'Contenido de longitud media para prueba'
                : 'Contenido más largo para demostrar cómo el grid se adapta automáticamente al contenido variable'}
            </Text>
          </Container>
        ))}
      </Grid>
    </Container>
  ),
};

export const AlignmentVariations: Story = {
  render: () => (
    <Container $padding="p-6" className="space-y-12">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        Variaciones de Alineación
      </Text>

      {/* justify-start */}
      <Container>
        <Text as="h3" $size="lg" $weight="semibold" className="mb-4">
          justify-start
        </Text>
        <Container
          $backgroundColor="bg-gray-100"
          $padding="p-4"
          $borderRadius="rounded-lg">
          <Grid
            $justifyContent="start"
            $maxGridWidth="800px"
            $gap="1rem"
            className="border-2 border-dashed border-gray-300">
            {Array.from({ length: 3 }, (_, i) => (
              <Container
                key={i}
                $backgroundColor="bg-blue-500"
                $color="text-white"
                $padding="p-4"
                $borderRadius="rounded"
                $textAlign="center">
                <Text $weight="bold">Item {i + 1}</Text>
              </Container>
            ))}
          </Grid>
        </Container>
      </Container>

      {/* justify-center */}
      <Container>
        <Text as="h3" $size="lg" $weight="semibold" className="mb-4">
          justify-center (default)
        </Text>
        <Container
          $backgroundColor="bg-gray-100"
          $padding="p-4"
          $borderRadius="rounded-lg">
          <Grid
            $justifyContent="center"
            $maxGridWidth="800px"
            $gap="1rem"
            className="border-2 border-dashed border-gray-300">
            {Array.from({ length: 3 }, (_, i) => (
              <Container
                key={i}
                $backgroundColor="bg-green-500"
                $color="text-white"
                $padding="p-4"
                $borderRadius="rounded"
                $textAlign="center">
                <Text $weight="bold">Item {i + 1}</Text>
              </Container>
            ))}
          </Grid>
        </Container>
      </Container>

      {/* justify-end */}
      <Container>
        <Text as="h3" $size="lg" $weight="semibold" className="mb-4">
          justify-end
        </Text>
        <Container
          $backgroundColor="bg-gray-100"
          $padding="p-4"
          $borderRadius="rounded-lg">
          <Grid
            $justifyContent="end"
            $maxGridWidth="800px"
            $gap="1rem"
            className="border-2 border-dashed border-gray-300">
            {Array.from({ length: 3 }, (_, i) => (
              <Container
                key={i}
                $backgroundColor="bg-purple-500"
                $color="text-white"
                $padding="p-4"
                $borderRadius="rounded"
                $textAlign="center">
                <Text $weight="bold">Item {i + 1}</Text>
              </Container>
            ))}
          </Grid>
        </Container>
      </Container>
    </Container>
  ),
};

export const CustomSizing: Story = {
  render: () => (
    <Container $padding="p-6" className="space-y-8">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        Tamaños Personalizados
      </Text>

      {/* Ejemplo con maxItemWidth */}
      <Container>
        <Text as="h3" $size="lg" $weight="semibold" className="mb-4">
          Con $maxItemWidth="250px"
        </Text>
        <Grid $gap="1.5rem" $maxItemWidth="250px" $maxGridWidth="1200px">
          {[
            'Contenido corto',
            'Contenido de longitud media para mostrar el comportamiento',
            'Contenido muy largo que excede el ancho normal pero se limita por maxItemWidth',
            'Otro ejemplo',
            'Más contenido de prueba con diferentes longitudes',
          ].map((text, i) => (
            <Container
              key={i}
              $backgroundColor="bg-yellow-100"
              $padding="p-4"
              $borderRadius="rounded-lg"
              $borderWidth="border"
              $borderColor="border-yellow-300">
              <Text $weight="semibold" className="mb-2">
                Card {i + 1}
              </Text>
              <Text $size="sm">{text}</Text>
            </Container>
          ))}
        </Grid>
      </Container>

      {/* Ejemplo con diferentes gaps */}
      <Container>
        <Text as="h3" $size="lg" $weight="semibold" className="mb-4">
          Diferentes espaciados (gap)
        </Text>

        <Container className="space-y-6">
          <Container>
            <Text $size="sm" $weight="medium" className="mb-2">
              gap="0.5rem"
            </Text>
            <Grid $gap="0.5rem" $maxGridWidth="600px">
              {Array.from({ length: 6 }, (_, i) => (
                <Container
                  key={i}
                  $backgroundColor="bg-red-200"
                  $padding="p-3"
                  $borderRadius="rounded"
                  $textAlign="center">
                  <Text $size="sm">{i + 1}</Text>
                </Container>
              ))}
            </Grid>
          </Container>

          <Container>
            <Text $size="sm" $weight="medium" className="mb-2">
              gap="2rem"
            </Text>
            <Grid $gap="2rem" $maxGridWidth="600px">
              {Array.from({ length: 6 }, (_, i) => (
                <Container
                  key={i}
                  $backgroundColor="bg-blue-200"
                  $padding="p-3"
                  $borderRadius="rounded"
                  $textAlign="center">
                  <Text $size="sm">{i + 1}</Text>
                </Container>
              ))}
            </Grid>
          </Container>
        </Container>
      </Container>
    </Container>
  ),
};

export const ShadowToggle: Story = {
  render: () => (
    <Container
      $padding="p-6"
      $backgroundColor="bg-gray-50"
      className="space-y-8">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        Control de Sombra
      </Text>

      <Text $colorScheme="muted" className="text-center mb-8">
        Comparación entre Grid con y sin sombra
      </Text>

      {/* Grid sin sombra */}
      <Container>
        <Text as="h3" $size="lg" $weight="semibold" className="mb-4">
          Sin sombra ($isShadow=false - por defecto)
        </Text>
        <Container
          $backgroundColor="bg-white"
          $padding="p-6"
          $borderRadius="rounded-lg">
          <Grid $isShadow={false} $maxGridWidth="800px" $gap="1rem">
            {Array.from({ length: 4 }, (_, i) => (
              <Container
                key={i}
                $backgroundColor="bg-blue-50"
                $padding="p-4"
                $borderRadius="rounded-lg"
                $borderWidth="border"
                $borderColor="border-blue-200"
                $textAlign="center">
                <Text $weight="bold" $color="text-blue-700">
                  Item {i + 1}
                </Text>
                <Text $size="sm" $colorScheme="muted">
                  Grid sin sombra
                </Text>
              </Container>
            ))}
          </Grid>
        </Container>
      </Container>

      {/* Grid con sombra */}
      <Container>
        <Text as="h3" $size="lg" $weight="semibold" className="mb-4">
          Con sombra ($isShadow=true)
        </Text>
        <Container
          $backgroundColor="bg-white"
          $padding="p-6"
          $borderRadius="rounded-lg">
          <Grid $isShadow={true} $maxGridWidth="800px" $gap="1rem">
            {Array.from({ length: 4 }, (_, i) => (
              <Container
                key={i}
                $backgroundColor="bg-green-50"
                $padding="p-4"
                $borderRadius="rounded-lg"
                $borderWidth="border"
                $borderColor="border-green-200"
                $textAlign="center">
                <Text $weight="bold" $color="text-green-700">
                  Item {i + 1}
                </Text>
                <Text $size="sm" $colorScheme="muted">
                  Grid con sombra
                </Text>
              </Container>
            ))}
          </Grid>
        </Container>
      </Container>

      {/* Información */}
      <Container
        $backgroundColor="bg-blue-50"
        $padding="p-4"
        $borderRadius="rounded-lg"
        $borderWidth="border"
        $borderColor="border-blue-200">
        <Text as="h4" $weight="semibold" className="mb-2">
          💡 Información sobre $isShadow:
        </Text>
        <Container as="ul" className="text-sm space-y-1">
          <li>• Por defecto, el Grid NO tiene sombra ($isShadow=false)</li>
          <li>• Usa $isShadow=true para agregar shadow-sm al Grid</li>
          <li>• Mantiene consistencia con el componente Container</li>
          <li>• Útil para elevar visualmente el Grid del fondo</li>
        </Container>
      </Container>
    </Container>
  ),
};
