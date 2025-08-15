import type { Meta, StoryObj } from '@storybook/react';
import { GridAreas, GridAreasField } from '.';
import { Container } from '../Container';
import { Button } from '../../forms/Button';
import { Text } from '../../Text';
import { Badge } from '../../feedback/Badge';
import { Avatar } from '../../Avatar';
import { Label } from '../../forms/Label';
import { Input } from '../../forms/Input';

const meta: Meta<typeof GridAreas> = {
  title: 'Atoms/GridAreas',
  component: GridAreas,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Los elementos GridAreasField que irán dentro del grid',
    },
    $areasLg: {
      control: 'text',
      description:
        'Layout de grid areas para pantallas grandes (>1024px) - OBLIGATORIO',
    },
    $areasMd: {
      control: 'text',
      description:
        'Layout de grid areas para pantallas medianas (672px-1023px) - OPCIONAL',
    },
    $areasSm: {
      control: 'text',
      description:
        'Layout de grid areas para pantallas pequeñas (<672px) - OPCIONAL',
    },
    $columns: {
      control: 'text',
      description:
        'Definición de columnas (default: repeat(auto-fit, minmax(230px, 1fr)))',
    },
    $rows: {
      control: 'text',
      description: 'Definición de filas (default: auto)',
    },
    $gap: {
      control: 'text',
      description: 'Espaciado entre celdas (gap-4, 1rem, etc.)',
    },
    $justifyContent: {
      control: 'select',
      options: [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch',
      ],
      description: 'Alineación horizontal del grid',
    },
    $alignItems: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
      description: 'Alineación vertical del grid',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    $areasLg: `
      "header header header"
      "sidebar main main"
      "footer footer footer"
    `,
    $gap: '1rem',
  },
  render: (args) => (
    <Container $padding="p-4">
      <GridAreas
        $areasLg={args.$areasLg}
        $areasMd={args.$areasMd}
        $areasSm={args.$areasSm}
        $gap={args.$gap}
        $justifyContent={args.$justifyContent}
        $alignItems={args.$alignItems}
        $columns={args.$columns}
        $rows={args.$rows}>
        <GridAreasField
          $area="header"
          $backgroundColor="bg-blue-500"
          $color="text-white"
          $padding="p-4"
          $textAlign="center">
          <Text as="h1" $size="xl" $weight="bold" $color="text-white">
            Website Header
          </Text>
        </GridAreasField>
        <GridAreasField
          $area="sidebar"
          $backgroundColor="bg-green-500"
          $color="text-white"
          $padding="p-4">
          <Text
            as="h2"
            $size="lg"
            $weight="semibold"
            $color="text-white"
            className="mb-3">
            Navigation
          </Text>
          <Container $display="flex" $flexDirection="col" $gap="gap-2">
            <Button
              $colorScheme="ghost"
              $size="sm"
              $custom="text-white hover:bg-green-600">
              Home
            </Button>
            <Button
              $colorScheme="ghost"
              $size="sm"
              $custom="text-white hover:bg-green-600">
              About
            </Button>
            <Button
              $colorScheme="ghost"
              $size="sm"
              $custom="text-white hover:bg-green-600">
              Services
            </Button>
          </Container>
        </GridAreasField>
        <GridAreasField
          $area="main"
          $backgroundColor="bg-gray-200"
          $padding="p-4">
          <Text as="h2" $size="lg" $weight="bold" className="mb-4">
            Main Content
          </Text>
          <Text as="p" className="mb-4">
            Este es el contenido principal usando nuestros componentes de la
            librería.
          </Text>
          <Button $colorScheme="default">Ver más</Button>
        </GridAreasField>
        <GridAreasField
          $area="footer"
          $backgroundColor="bg-purple-500"
          $color="text-white"
          $padding="p-4"
          $textAlign="center">
          <Text as="p" $color="text-white">
            © 2025 GridAreas Component Demo
          </Text>
        </GridAreasField>
      </GridAreas>
    </Container>
  ),
};

export const ResponsiveLayout: Story = {
  render: () => (
    <Container $padding="p-4">
      <Container
        $backgroundColor="bg-yellow-100"
        $padding="p-4"
        $borderRadius="rounded-lg"
        className="mb-4">
        <Text as="h3" $weight="bold" className="mb-2">
          Layout Responsivo:
        </Text>
        <Container as="ul" className="text-sm space-y-1">
          <li>
            <Text as="strong">Pantallas grandes (&gt;1024px):</Text> Layout de 3
            columnas con sidebar
          </li>
          <li>
            <Text as="strong">Pantallas medianas (672px-1023px):</Text> Layout
            de 2 columnas
          </li>
          <li>
            <Text as="strong">Pantallas pequeñas (&lt;672px):</Text> Layout de 1
            columna (stack vertical)
          </li>
        </Container>
        <Text as="p" $size="xs" $colorScheme="muted" className="mt-2">
          Redimensiona la ventana para ver los cambios
        </Text>
      </Container>

      <GridAreas
        $areasLg={`
          "header header header"
          "sidebar main aside"
          "footer footer footer"
        `}
        $areasMd={`
          "header header"
          "sidebar main"
          "footer footer"
        `}
        $areasSm={`
          "header"
          "main"
          "sidebar"
          "footer"
        `}
        $gap="1.5rem"
        $columns="minmax(200px, 250px) 1fr minmax(200px, 250px)">
        <GridAreasField
          $area="header"
          $backgroundColor="bg-indigo-600"
          $color="text-white"
          $padding="p-6"
          $textAlign="center"
          $borderRadius="rounded-lg">
          <Text as="h1" $size="2xl" $weight="bold" $color="text-white">
            Website Header
          </Text>
          <Text as="p" $color="text-white" className="mt-2 opacity-90">
            Navigation and branding
          </Text>
        </GridAreasField>

        <GridAreasField
          $area="sidebar"
          $height="100%"
          $backgroundColor="bg-emerald-500"
          $color="text-white"
          $padding="p-4"
          $borderRadius="rounded-lg">
          <Text as="h2" $weight="semibold" $color="text-white" className="mb-3">
            Sidebar
          </Text>
          <Container as="nav" className="space-y-2">
            <Button
              $colorScheme="ghost"
              $size="sm"
              $custom="text-white hover:bg-emerald-600 w-full justify-start">
              🏠 Home
            </Button>
            <Button
              $colorScheme="ghost"
              $size="sm"
              $custom="text-white hover:bg-emerald-600 w-full justify-start">
              📋 About
            </Button>
            <Button
              $colorScheme="ghost"
              $size="sm"
              $custom="text-white hover:bg-emerald-600 w-full justify-start">
              ⚙️ Services
            </Button>
            <Button
              $colorScheme="ghost"
              $size="sm"
              $custom="text-white hover:bg-emerald-600 w-full justify-start">
              📞 Contact
            </Button>
          </Container>
        </GridAreasField>

        <GridAreasField
          $area="main"
          $backgroundColor="bg-white"
          $padding="p-6"
          $borderRadius="rounded-lg"
          $borderWidth="border-2"
          $borderColor="border-gray-200">
          <Text as="h2" $size="xl" $weight="bold" className="mb-4">
            Main Content Area
          </Text>
          <Text as="p" className="mb-4">
            Este es el área principal de contenido. En layouts responsivos, esta
            área se adapta automáticamente según el tamaño de pantalla
            disponible.
          </Text>
          <Container
            $display="grid"
            className="grid-cols-1 md:grid-cols-2 gap-4">
            <Container
              $backgroundColor="bg-gray-100"
              $padding="p-4"
              $borderRadius="rounded">
              <Text as="h3" $weight="semibold" className="mb-2">
                Tarjeta 1
              </Text>
              <Text $size="sm" $colorScheme="muted">
                Contenido de ejemplo usando nuestros componentes
              </Text>
              <Button $colorScheme="outline" $size="sm" className="mt-3">
                Leer más
              </Button>
            </Container>
            <Container
              $backgroundColor="bg-gray-100"
              $padding="p-4"
              $borderRadius="rounded">
              <Text as="h3" $weight="semibold" className="mb-2">
                Tarjeta 2
              </Text>
              <Text $size="sm" $colorScheme="muted">
                Más contenido de ejemplo
              </Text>
              <Button $colorScheme="outline" $size="sm" className="mt-3">
                Leer más
              </Button>
            </Container>
          </Container>
        </GridAreasField>

        <GridAreasField
          $area="aside"
          $height="100%"
          $backgroundColor="bg-orange-400"
          $color="text-white"
          $padding="p-4"
          $borderRadius="rounded-lg">
          <Text as="h2" $weight="semibold" $color="text-white" className="mb-3">
            Aside
          </Text>
          <Container className="space-y-3">
            <Container
              $backgroundColor="bg-orange-500"
              $padding="p-3"
              $borderRadius="rounded">
              <Text
                as="h4"
                $weight="medium"
                $color="text-white"
                className="mb-1">
                Widget 1
              </Text>
              <Text $size="xs" $color="text-white" className="opacity-90">
                Información adicional
              </Text>
              <Badge $colorScheme="secondary" $size="sm" className="mt-2">
                Nuevo
              </Badge>
            </Container>
            <Container
              $backgroundColor="bg-orange-500"
              $padding="p-3"
              $borderRadius="rounded">
              <Text
                as="h4"
                $weight="medium"
                $color="text-white"
                className="mb-1">
                Widget 2
              </Text>
              <Text $size="xs" $color="text-white" className="opacity-90">
                Más contenido
              </Text>
              <Badge $colorScheme="secondary" $size="sm" className="mt-2">
                Popular
              </Badge>
            </Container>
          </Container>
        </GridAreasField>

        <GridAreasField
          $area="footer"
          $backgroundColor="bg-slate-700"
          $padding="p-4"
          $textAlign="center"
          $borderRadius="rounded-lg">
          <Text as="p" $color="white">
            © 2025 GridAreas Component. Responsive layout example with
            integrated components.
          </Text>
        </GridAreasField>
      </GridAreas>
    </Container>
  ),
};

export const DashboardLayout: Story = {
  render: () => (
    <Container $padding="p-4">
      <GridAreas
        $areasLg={`
          "nav nav nav nav"
          "sidebar stats stats chart"
          "sidebar recent recent chart"
          "sidebar actions actions actions"
        `}
        $areasMd={`
          "nav nav nav"
          "sidebar stats chart"
          "sidebar recent chart"
          "actions actions actions"
        `}
        $areasSm={`
          "nav"
          "stats"
          "chart"
          "recent"
          "sidebar"
          "actions"
        `}
        $gap="gap-4"
        $columns="250px 1fr 1fr 300px"
        $rows="auto 1fr 1fr auto">
        <GridAreasField
          $area="nav"
          $backgroundColor="bg-slate-800"
          $padding="p-4"
          $borderRadius="rounded-lg">
          <Container
            $display="flex"
            $justifyContent="between"
            $alignItems="center">
            <Text as="h1" $size="xl" $weight="bold" $color="white">
              Dashboard
            </Text>
            <Container $display="flex" $gap="gap-4">
              <Button $colorScheme="secondary" $size="sm">
                👤 Profile
              </Button>
              <Button $colorScheme="secondary" $size="sm">
                ⚙️ Settings
              </Button>
            </Container>
          </Container>
        </GridAreasField>

        <GridAreasField
          $area="sidebar"
          $height="100%"
          $backgroundColor="bg-slate-100"
          $padding="p-4"
          $borderRadius="rounded-lg">
          <Text as="h3" $weight="semibold" className="mb-4">
            Menu
          </Text>
          <Container as="nav" className="space-y-2">
            {[
              '📊 Dashboard',
              '📈 Analytics',
              '📋 Reports',
              '👥 Users',
              '⚙️ Settings',
            ].map((item) => (
              <Button
                key={item}
                $colorScheme="ghost"
                $size="sm"
                $custom="hover:bg-slate-200 w-full justify-start">
                {item}
              </Button>
            ))}
          </Container>
        </GridAreasField>

        <GridAreasField
          $area="stats"
          $backgroundColor="bg-blue-500"
          $color="text-white"
          $padding="p-6"
          $borderRadius="rounded-lg"
          $textAlign="center">
          <Text
            as="h3"
            $size="lg"
            $weight="semibold"
            $color="text-white"
            className="mb-2">
            Statistics
          </Text>
          <Text as="div" $size="3xl" $weight="bold" $color="text-white">
            1,234
          </Text>
          <Badge $colorScheme="secondary" className="mt-2">
            Total Users
          </Badge>
        </GridAreasField>

        <GridAreasField
          $area="chart"
          $height="100%"
          $backgroundColor="bg-green-500"
          $color="text-white"
          $padding="p-6"
          $borderRadius="rounded-lg"
          $textAlign="center">
          <Text
            as="h3"
            $size="lg"
            $weight="semibold"
            $color="text-white"
            className="mb-4">
            Revenue Chart
          </Text>
          <Container
            $backgroundColor="bg-green-600"
            className="h-20 rounded flex items-end justify-center">
            <Text $size="sm" $color="text-white">
              📊 Chart placeholder
            </Text>
          </Container>
        </GridAreasField>

        <GridAreasField
          $area="recent"
          $backgroundColor="bg-white"
          $padding="p-4"
          $borderRadius="rounded-lg"
          $borderWidth="border-2"
          $borderColor="border-gray-200">
          <Text as="h3" $weight="semibold" className="mb-3">
            Recent Activity
          </Text>
          <Container className="space-y-2">
            {[
              'User John logged in',
              'New order #1234',
              'Report generated',
              'Data backup completed',
            ].map((activity, index) => (
              <Container
                key={index}
                $display="flex"
                $justifyContent="between"
                $alignItems="center"
                className="py-2 border-b border-gray-100 last:border-b-0">
                <Text $size="sm">{activity}</Text>
                <Badge $colorScheme="outline" $size="sm">
                  2m ago
                </Badge>
              </Container>
            ))}
          </Container>
        </GridAreasField>

        <GridAreasField
          $area="actions"
          $backgroundColor="bg-purple-500"
          $color="text-white"
          $padding="p-4"
          $borderRadius="rounded-lg">
          <Container $display="flex" $justifyContent="center" $gap="gap-4">
            <Button $colorScheme="secondary">📤 Export Data</Button>
            <Button $colorScheme="secondary">📄 Generate Report</Button>
            <Button $colorScheme="secondary">💾 Backup</Button>
          </Container>
        </GridAreasField>
      </GridAreas>
    </Container>
  ),
};

export const MagazineLayout: Story = {
  render: () => (
    <Container $padding="p-4">
      <GridAreas
        $areasLg={`
          "hero hero hero"
          "article1 article2 sidebar"
          "article3 article4 sidebar"
          "footer footer footer"
        `}
        $areasMd={`
          "hero hero"
          "article1 sidebar"
          "article2 sidebar"
          "article3 article4"
          "footer footer"
        `}
        $areasSm={`
          "hero"
          "article1"
          "article2"
          "article3"
          "article4"
          "sidebar"
          "footer"
        `}
        $gap="gap-6"
        $columns="1fr 1fr 300px">
        <GridAreasField
          $area="hero"
          $backgroundColor="bg-gradient-to-r from-red-500 to-pink-500"
          $color="text-white"
          $padding="p-8"
          $borderRadius="rounded-xl"
          $textAlign="center">
          <Text
            as="h1"
            $size="4xl"
            $weight="bold"
            $color="text-white"
            className="mb-4">
            Featured Article
          </Text>
          <Text as="p" $size="lg" $color="text-white" className="opacity-90">
            This is the main hero section showcasing the most important content
          </Text>
          <Button $colorScheme="secondary" className="mt-4">
            Read Featured Story
          </Button>
        </GridAreasField>

        <GridAreasField
          $area="article1"
          $backgroundColor="bg-white"
          $padding="p-6"
          $borderRadius="rounded-lg"
          $borderWidth="border"
          $borderColor="border-gray-200">
          <Text as="h2" $size="xl" $weight="bold" className="mb-3">
            Article 1
          </Text>
          <Text $colorScheme="muted" $size="sm" className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt.
          </Text>
          <Container $display="flex" $alignItems="center" $gap="gap-2">
            <Button $colorScheme="link" $size="sm">
              Read more →
            </Button>
            <Badge $colorScheme="secondary">Technology</Badge>
          </Container>
        </GridAreasField>

        <GridAreasField
          $area="article2"
          $backgroundColor="bg-white"
          $padding="p-6"
          $borderRadius="rounded-lg"
          $borderWidth="border"
          $borderColor="border-gray-200">
          <Text as="h2" $size="xl" $weight="bold" className="mb-3">
            Article 2
          </Text>
          <Text $colorScheme="muted" $size="sm" className="mb-4">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip.
          </Text>
          <Container $display="flex" $alignItems="center" $gap="gap-2">
            <Button $colorScheme="link" $size="sm">
              Read more →
            </Button>
            <Badge $colorScheme="secondary">Design</Badge>
          </Container>
        </GridAreasField>

        <GridAreasField
          $area="article3"
          $backgroundColor="bg-white"
          $padding="p-6"
          $borderRadius="rounded-lg"
          $borderWidth="border"
          $borderColor="border-gray-200">
          <Text as="h2" $size="xl" $weight="bold" className="mb-3">
            Article 3
          </Text>
          <Text $colorScheme="muted" $size="sm" className="mb-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore.
          </Text>
          <Container $display="flex" $alignItems="center" $gap="gap-2">
            <Button $colorScheme="link" $size="sm">
              Read more →
            </Button>
            <Badge $colorScheme="secondary">Business</Badge>
          </Container>
        </GridAreasField>

        <GridAreasField
          $area="article4"
          $backgroundColor="bg-white"
          $padding="p-6"
          $borderRadius="rounded-lg"
          $borderWidth="border"
          $borderColor="border-gray-200">
          <Text as="h2" $size="xl" $weight="bold" className="mb-3">
            Article 4
          </Text>
          <Text $colorScheme="muted" $size="sm" className="mb-4">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia.
          </Text>
          <Container $display="flex" $alignItems="center" $gap="gap-2">
            <Button $colorScheme="link" $size="sm">
              Read more →
            </Button>
            <Badge $colorScheme="secondary">Lifestyle</Badge>
          </Container>
        </GridAreasField>

        <GridAreasField
          $area="sidebar"
          $backgroundColor="bg-gray-50"
          $padding="p-6"
          $borderRadius="rounded-lg">
          <Text as="h3" $weight="bold" className="mb-4">
            Sidebar
          </Text>
          <Container className="space-y-4">
            <Container
              $backgroundColor="bg-white"
              $padding="p-4"
              $borderRadius="rounded"
              $borderWidth="border"
              $borderColor="border-gray-200">
              <Text as="h4" $weight="semibold" $size="sm" className="mb-2">
                Popular Posts
              </Text>
              <Container as="ul" className="space-y-2">
                <li className="text-xs text-gray-600 hover:text-gray-900 cursor-pointer">
                  • How to build modern layouts
                </li>
                <li className="text-xs text-gray-600 hover:text-gray-900 cursor-pointer">
                  • CSS Grid best practices
                </li>
                <li className="text-xs text-gray-600 hover:text-gray-900 cursor-pointer">
                  • Component design patterns
                </li>
              </Container>
            </Container>
            <Container
              $backgroundColor="bg-white"
              $padding="p-4"
              $borderRadius="rounded"
              $borderWidth="border"
              $borderColor="border-gray-200">
              <Text as="h4" $weight="semibold" $size="sm" className="mb-3">
                Categories
              </Text>
              <Container $display="flex" $flexDirection="col" $gap="gap-2">
                <Badge $colorScheme="outline" $size="sm">
                  Technology
                </Badge>
                <Badge $colorScheme="outline" $size="sm">
                  Design
                </Badge>
                <Badge $colorScheme="outline" $size="sm">
                  Business
                </Badge>
                <Badge $colorScheme="outline" $size="sm">
                  Lifestyle
                </Badge>
              </Container>
            </Container>
            <Button $colorScheme="default" $size="sm" className="w-full">
              View All Categories
            </Button>
          </Container>
        </GridAreasField>

        <GridAreasField
          $area="footer"
          $backgroundColor="bg-gray-800"
          $padding="p-6"
          $textAlign="center"
          $borderRadius="rounded-lg">
          <Text as="p" $color="white">
            © 2025 Magazine Layout. Built with GridAreas and integrated
            components.
          </Text>
        </GridAreasField>
      </GridAreas>
    </Container>
  ),
};

export const CustomGapAndAlignment: Story = {
  render: () => (
    <Container className="space-y-8 p-4">
      <Container>
        <Text as="h3" $weight="bold" className="mb-4">
          Different Gap Sizes:
        </Text>
        <Container $display="grid" className="grid-cols-1 md:grid-cols-2 gap-8">
          <GridAreas
            $areasLg={`"a b" "c d"`}
            $gap="gap-2"
            $justifyContent="center">
            <GridAreasField
              $area="a"
              $backgroundColor="bg-red-300"
              $padding="p-2"
              $textAlign="center">
              <Text $weight="bold">A</Text>
            </GridAreasField>
            <GridAreasField
              $area="b"
              $backgroundColor="bg-blue-300"
              $padding="p-2"
              $textAlign="center">
              <Text $weight="bold">B</Text>
            </GridAreasField>
            <GridAreasField
              $area="c"
              $backgroundColor="bg-green-300"
              $padding="p-2"
              $textAlign="center">
              <Text $weight="bold">C</Text>
            </GridAreasField>
            <GridAreasField
              $area="d"
              $backgroundColor="bg-yellow-300"
              $padding="p-2"
              $textAlign="center">
              <Text $weight="bold">D</Text>
            </GridAreasField>
          </GridAreas>

          <GridAreas
            $areasLg={`"a b" "c d"`}
            $gap="2rem"
            $justifyContent="center">
            <GridAreasField
              $area="a"
              $backgroundColor="bg-red-400"
              $padding="p-2"
              $textAlign="center">
              <Text $weight="bold">A</Text>
            </GridAreasField>
            <GridAreasField
              $area="b"
              $backgroundColor="bg-blue-400"
              $padding="p-2"
              $textAlign="center">
              <Text $weight="bold">B</Text>
            </GridAreasField>
            <GridAreasField
              $area="c"
              $backgroundColor="bg-green-400"
              $padding="p-2"
              $textAlign="center">
              <Text $weight="bold">C</Text>
            </GridAreasField>
            <GridAreasField
              $area="d"
              $backgroundColor="bg-yellow-400"
              $padding="p-2"
              $textAlign="center">
              <Text $weight="bold">D</Text>
            </GridAreasField>
          </GridAreas>
        </Container>
      </Container>

      <Container>
        <Text as="h3" $weight="bold" className="mb-4">
          Different Alignments:
        </Text>
        <Container $display="grid" className="grid-cols-1 md:grid-cols-3 gap-8">
          <Container>
            <Text as="h4" $size="sm" $weight="medium" className="mb-2">
              justify-start
            </Text>
            <GridAreas
              $areasLg={`"a b" "c d"`}
              $gap="gap-2"
              $justifyContent="start"
              $columns="100px 100px"
              className="border-2 border-dashed border-gray-300 p-4">
              <GridAreasField
                $area="a"
                $backgroundColor="bg-purple-300"
                $padding="p-2"
                $textAlign="center">
                <Text $weight="bold">A</Text>
              </GridAreasField>
              <GridAreasField
                $area="b"
                $backgroundColor="bg-pink-300"
                $padding="p-2"
                $textAlign="center">
                <Text $weight="bold">B</Text>
              </GridAreasField>
              <GridAreasField
                $area="c"
                $backgroundColor="bg-indigo-300"
                $padding="p-2"
                $textAlign="center">
                <Text $weight="bold">C</Text>
              </GridAreasField>
              <GridAreasField
                $area="d"
                $backgroundColor="bg-teal-300"
                $padding="p-2"
                $textAlign="center">
                <Text $weight="bold">D</Text>
              </GridAreasField>
            </GridAreas>
          </Container>

          <Container>
            <Text as="h4" $size="sm" $weight="medium" className="mb-2">
              justify-center
            </Text>
            <GridAreas
              $areasLg={`"a b" "c d"`}
              $gap="gap-2"
              $justifyContent="center"
              $columns="100px 100px"
              className="border-2 border-dashed border-gray-300 p-4">
              <GridAreasField
                $area="a"
                $backgroundColor="bg-purple-400"
                $padding="p-2"
                $textAlign="center">
                <Text $weight="bold">A</Text>
              </GridAreasField>
              <GridAreasField
                $area="b"
                $backgroundColor="bg-pink-400"
                $padding="p-2"
                $textAlign="center">
                <Text $weight="bold">B</Text>
              </GridAreasField>
              <GridAreasField
                $area="c"
                $backgroundColor="bg-indigo-400"
                $padding="p-2"
                $textAlign="center">
                <Text $weight="bold">C</Text>
              </GridAreasField>
              <GridAreasField
                $area="d"
                $backgroundColor="bg-teal-400"
                $padding="p-2"
                $textAlign="center">
                <Text $weight="bold">D</Text>
              </GridAreasField>
            </GridAreas>
          </Container>

          <Container>
            <Text as="h4" $size="sm" $weight="medium" className="mb-2">
              justify-end
            </Text>
            <GridAreas
              $areasLg={`"a b" "c d"`}
              $gap="gap-2"
              $justifyContent="end"
              $columns="100px 100px"
              className="border-2 border-dashed border-gray-300 p-4">
              <GridAreasField
                $area="a"
                $backgroundColor="bg-purple-500"
                $padding="p-2"
                $textAlign="center">
                <Text $weight="bold">A</Text>
              </GridAreasField>
              <GridAreasField
                $area="b"
                $backgroundColor="bg-pink-500"
                $padding="p-2"
                $textAlign="center">
                <Text $weight="bold">B</Text>
              </GridAreasField>
              <GridAreasField
                $area="c"
                $backgroundColor="bg-indigo-500"
                $padding="p-2"
                $textAlign="center">
                <Text $weight="bold">C</Text>
              </GridAreasField>
              <GridAreasField
                $area="d"
                $backgroundColor="bg-teal-500"
                $padding="p-2"
                $textAlign="center">
                <Text $weight="bold">D</Text>
              </GridAreasField>
            </GridAreas>
          </Container>
        </Container>
      </Container>
    </Container>
  ),
};

export const FormLayoutExample: Story = {
  render: () => (
    <Container $padding="p-6" $backgroundColor="bg-gray-50">
      <Text as="h3" $size="2xl" $weight="bold" className="mb-6 text-center">
        Contact Form Layout
      </Text>

      <GridAreas
        $areasLg={`
          "title title title"
          "name email phone"
          "subject subject subject"
          "message message message"
          "actions actions actions"
        `}
        $areasMd={`
          "title title"
          "name email"
          "phone phone"
          "subject subject"
          "message message"
          "actions actions"
        `}
        $areasSm={`
          "title"
          "name"
          "email"
          "phone"
          "subject"
          "message"
          "actions"
        `}
        $gap="gap-4"
        $columns="1fr 1fr 1fr"
        className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <GridAreasField $area="title" $textAlign="center">
          <Text as="h2" $size="xl" $weight="bold" className="mb-2">
            Get in Touch
          </Text>
          <Text $colorScheme="muted">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </Text>
        </GridAreasField>

        <GridAreasField $area="name">
          <Container className="space-y-2">
            <Label $variant="required" htmlFor="name-input">
              First Name
            </Label>
            <Input
              id="name-input"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John"
            />
          </Container>
        </GridAreasField>

        <GridAreasField $area="email">
          <Container className="space-y-2">
            <Label $variant="required" htmlFor="email-input">
              Email Address
            </Label>
            <Input
              id="email-input"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </Container>
        </GridAreasField>

        <GridAreasField $area="phone">
          <Container className="space-y-2">
            <Label $variant="optional" htmlFor="phone-input">
              Phone Number
            </Label>
            <Input
              id="phone-input"
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </Container>
        </GridAreasField>

        <GridAreasField $area="subject">
          <Container className="space-y-2">
            <Label $variant="required" htmlFor="subject-select">
              Subject
            </Label>
            <select
              id="subject-select"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>General Inquiry</option>
              <option>Technical Support</option>
              <option>Sales Question</option>
              <option>Partnership</option>
            </select>
          </Container>
        </GridAreasField>

        <GridAreasField $area="message">
          <Container className="space-y-2">
            <Label $variant="required" htmlFor="message-textarea">
              Message
            </Label>
            <textarea
              id="message-textarea"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Tell us about your inquiry..."
            />
          </Container>
        </GridAreasField>

        <GridAreasField $area="actions">
          <Container
            $display="flex"
            $justifyContent="center"
            $gap="gap-4"
            className="pt-4">
            <Button $colorScheme="outline" className="px-8">
              Clear Form
            </Button>
            <Button $colorScheme="default" className="px-8">
              Send Message
            </Button>
          </Container>
        </GridAreasField>
      </GridAreas>

      <Container className="mt-6 p-4 bg-blue-50 rounded-lg">
        <Text as="h4" $weight="semibold" className="mb-2">
          Layout Features:
        </Text>
        <Container as="ul" className="text-sm space-y-1">
          <li>✅ Responsive grid areas (3 breakpoints)</li>
          <li>✅ Form fields adapt to screen size</li>
          <li>✅ Integrated with library components</li>
          <li>✅ Professional form styling with Label component</li>
          <li>✅ Accessibility-first design (htmlFor attributes)</li>
        </Container>

        <Text as="h4" $weight="semibold" className="mb-2 mt-4">
          Componentes Utilizados:
        </Text>
        <Container $display="flex" $flexDirection="col" $gap="gap-1">
          <Badge $colorScheme="outline" $size="sm">
            GridAreas
          </Badge>
          <Badge $colorScheme="outline" $size="sm">
            GridAreasField
          </Badge>
          <Badge $colorScheme="outline" $size="sm">
            Container
          </Badge>
          <Badge $colorScheme="outline" $size="sm">
            Text
          </Badge>
          <Badge $colorScheme="outline" $size="sm">
            Button
          </Badge>
          <Badge $colorScheme="outline" $size="sm">
            Label
          </Badge>
          <Badge $colorScheme="outline" $size="sm">
            Input
          </Badge>
          <Badge $colorScheme="outline" $size="sm">
            Badge
          </Badge>
        </Container>
      </Container>
    </Container>
  ),
};

