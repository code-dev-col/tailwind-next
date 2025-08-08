import type { Meta, StoryObj } from '@storybook/react';
import { GridAreasField } from './';
import { Container } from '../Container';
import { Button } from '../Button';
import { Text } from '../Text';
import { Badge } from '../Badge';
import { Avatar } from '../Avatar';
import { Label } from '../Label';

const meta: Meta<typeof GridAreasField> = {
  title: 'Atoms/GridAreasField',
  component: GridAreasField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateAreas: '"test"',
          width: '300px',
          height: '200px',
        }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: {
      control: 'text',
      description: 'El contenido del campo de grid',
    },
    $area: {
      control: 'text',
      description: 'Nombre del área de grid (OBLIGATORIO)',
    },
    $width: {
      control: 'text',
      description: 'Ancho del campo (w-64, 100%, 300px, etc.)',
    },
    $height: {
      control: 'text',
      description: 'Alto del campo (h-32, 200px, auto, etc.)',
    },
    $fontSize: {
      control: 'text',
      description: 'Tamaño de fuente (text-lg, 1.2rem, etc.)',
    },
    $color: {
      control: 'text',
      description: 'Color de texto (text-blue-500, #3b82f6, etc.)',
    },
    $backgroundColor: {
      control: 'text',
      description: 'Color de fondo (bg-blue-500, #3b82f6, etc.)',
    },
    $padding: {
      control: 'text',
      description: 'Relleno (p-4, 1rem, etc.)',
    },
    $margin: {
      control: 'text',
      description: 'Margen (m-4, 1rem, etc.)',
    },
    $borderColor: {
      control: 'text',
      description: 'Color de borde (border-blue-500, #3b82f6, etc.)',
    },
    $borderWidth: {
      control: 'text',
      description: 'Grosor de borde (border-2, 2px, etc.)',
    },
    $borderRadius: {
      control: 'text',
      description: 'Radio de borde (rounded-lg, 8px, etc.)',
    },
    $borderStyle: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'double', 'none'],
      description: 'Estilo de borde',
    },
    $textAlign: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Alineación de texto',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    $area: 'test',
    children: 'Grid field content example',
    $backgroundColor: 'bg-gray-100',
    $padding: 'p-4',
    $borderRadius: 'rounded',
  },
};

export const Styling: Story = {
  render: () => (
    <div
      className="grid grid-cols-2 gap-4 p-4"
      style={{ gridTemplateAreas: '"field1 field2" "field3 field4"' }}>
      <GridAreasField
        $area="field1"
        $backgroundColor="bg-blue-500"
        $color="text-white"
        $padding="p-4"
        $borderRadius="rounded-lg"
        $textAlign="center">
        Blue Background
      </GridAreasField>

      <GridAreasField
        $area="field2"
        $backgroundColor="bg-white"
        $borderWidth="border-2"
        $borderColor="border-green-500"
        $borderStyle="dashed"
        $padding="p-4"
        $borderRadius="rounded-lg"
        $textAlign="center">
        Green Border
      </GridAreasField>

      <GridAreasField
        $area="field3"
        $backgroundColor="bg-gradient-to-r from-purple-500 to-pink-500"
        $color="text-white"
        $padding="p-4"
        $borderRadius="rounded-xl"
        $textAlign="center"
        $fontSize="text-lg">
        Gradient Background
      </GridAreasField>

      <GridAreasField
        $area="field4"
        $backgroundColor="bg-yellow-200"
        $borderWidth="border-4"
        $borderColor="border-orange-500"
        $borderStyle="solid"
        $padding="p-4"
        $borderRadius="rounded-full"
        $textAlign="center">
        Rounded Circle
      </GridAreasField>
    </div>
  ),
};

export const TextAlignment: Story = {
  render: () => (
    <div
      className="grid grid-cols-2 gap-4 p-4"
      style={{ gridTemplateAreas: '"left right" "center justify"' }}>
      <GridAreasField
        $area="left"
        $backgroundColor="bg-gray-100"
        $padding="p-4"
        $borderRadius="rounded"
        $textAlign="left"
        $borderWidth="border"
        $borderColor="border-gray-300">
        Left aligned text content that shows how the text flows when aligned to
        the left side.
      </GridAreasField>

      <GridAreasField
        $area="right"
        $backgroundColor="bg-gray-100"
        $padding="p-4"
        $borderRadius="rounded"
        $textAlign="right"
        $borderWidth="border"
        $borderColor="border-gray-300">
        Right aligned text content that shows how the text flows when aligned to
        the right side.
      </GridAreasField>

      <GridAreasField
        $area="center"
        $backgroundColor="bg-gray-100"
        $padding="p-4"
        $borderRadius="rounded"
        $textAlign="center"
        $borderWidth="border"
        $borderColor="border-gray-300">
        Center aligned text content that shows how the text flows when centered.
      </GridAreasField>

      <GridAreasField
        $area="justify"
        $backgroundColor="bg-gray-100"
        $padding="p-4"
        $borderRadius="rounded"
        $textAlign="justify"
        $borderWidth="border"
        $borderColor="border-gray-300">
        Justified text content that shows how the text flows when justified
        across the full width of the container for better readability.
      </GridAreasField>
    </div>
  ),
};

export const CustomSizes: Story = {
  render: () => (
    <div
      className="grid gap-4 p-4"
      style={{ gridTemplateAreas: '"small" "medium" "large" "custom"' }}>
      <GridAreasField
        $area="small"
        $backgroundColor="bg-red-200"
        $padding="p-2"
        $borderRadius="rounded"
        $width="w-32"
        $height="h-16"
        $textAlign="center"
        $fontSize="text-sm">
        Small (w-32, h-16)
      </GridAreasField>

      <GridAreasField
        $area="medium"
        $backgroundColor="bg-blue-200"
        $padding="p-4"
        $borderRadius="rounded"
        $width="w-64"
        $height="h-24"
        $textAlign="center"
        $fontSize="text-base">
        Medium (w-64, h-24)
      </GridAreasField>

      <GridAreasField
        $area="large"
        $backgroundColor="bg-green-200"
        $padding="p-6"
        $borderRadius="rounded"
        $width="w-96"
        $height="h-32"
        $textAlign="center"
        $fontSize="text-lg">
        Large (w-96, h-32)
      </GridAreasField>

      <GridAreasField
        $area="custom"
        $backgroundColor="bg-purple-200"
        $padding="1.5rem"
        $borderRadius="12px"
        $width="400px"
        $height="100px"
        $textAlign="center"
        $fontSize="1.25rem">
        Custom (400px, 100px)
      </GridAreasField>
    </div>
  ),
};

export const BorderStyles: Story = {
  render: () => (
    <div
      className="grid grid-cols-3 gap-4 p-4"
      style={{
        gridTemplateAreas: '"solid dashed dotted" "double none thick"',
      }}>
      <GridAreasField
        $area="solid"
        $backgroundColor="bg-white"
        $padding="p-4"
        $borderWidth="border-2"
        $borderColor="border-blue-500"
        $borderStyle="solid"
        $borderRadius="rounded"
        $textAlign="center">
        Solid Border
      </GridAreasField>

      <GridAreasField
        $area="dashed"
        $backgroundColor="bg-white"
        $padding="p-4"
        $borderWidth="border-2"
        $borderColor="border-green-500"
        $borderStyle="dashed"
        $borderRadius="rounded"
        $textAlign="center">
        Dashed Border
      </GridAreasField>

      <GridAreasField
        $area="dotted"
        $backgroundColor="bg-white"
        $padding="p-4"
        $borderWidth="border-2"
        $borderColor="border-red-500"
        $borderStyle="dotted"
        $borderRadius="rounded"
        $textAlign="center">
        Dotted Border
      </GridAreasField>

      <GridAreasField
        $area="double"
        $backgroundColor="bg-white"
        $padding="p-4"
        $borderWidth="border-4"
        $borderColor="border-purple-500"
        $borderStyle="double"
        $borderRadius="rounded"
        $textAlign="center">
        Double Border
      </GridAreasField>

      <GridAreasField
        $area="none"
        $backgroundColor="bg-gray-100"
        $padding="p-4"
        $borderStyle="none"
        $borderRadius="rounded"
        $textAlign="center">
        No Border
      </GridAreasField>

      <GridAreasField
        $area="thick"
        $backgroundColor="bg-white"
        $padding="p-4"
        $borderWidth="4px"
        $borderColor="#f59e0b"
        $borderStyle="solid"
        $borderRadius="8px"
        $textAlign="center">
        Custom Thick
      </GridAreasField>
    </div>
  ),
};

export const RealWorldExample: Story = {
  render: () => (
    <Container $padding="p-4" $backgroundColor="bg-gray-50">
      <Text as="h3" $size="lg" $weight="bold" className="mb-4">
        Profile Card Layout - Integrated Components
      </Text>
      <Container
        className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        style={{
          display: 'grid',
          gridTemplateAreas: `
            "avatar name"
            "avatar email"
            "bio bio"
            "stats stats"
            "actions actions"
          `,
          gridTemplateColumns: '80px 1fr',
          gap: '1rem',
          padding: '1.5rem',
        }}>
        <GridAreasField
          $area="avatar"
          $backgroundColor="bg-gradient-to-br from-blue-400 to-purple-500"
          $borderRadius="rounded-full"
          $width="80px"
          $height="80px"
          $textAlign="center"
          className="flex items-center justify-center">
          <Avatar
            $size="lg"
            fallback="JD"
            className="bg-transparent text-white font-bold"
          />
        </GridAreasField>

        <GridAreasField $area="name" className="self-end">
          <Text as="h1" $size="xl" $weight="bold">
            John Doe
          </Text>
          <Badge $variant="secondary" $size="sm" className="ml-2">
            Pro
          </Badge>
        </GridAreasField>

        <GridAreasField $area="email" className="self-start">
          <Text $size="sm" $variant="muted">
            john.doe@example.com
          </Text>
        </GridAreasField>

        <GridAreasField
          $area="bio"
          $backgroundColor="bg-gray-50"
          $padding="p-3"
          $borderRadius="rounded-lg">
          <Text $size="sm" $variant="muted">
            Frontend developer passionate about creating beautiful and
            functional user interfaces. Love working with React, TypeScript, and
            modern CSS frameworks.
          </Text>
        </GridAreasField>

        <GridAreasField $area="stats">
          <Container $display="grid" className="grid-cols-3 gap-4 text-center">
            <Container
              $backgroundColor="bg-blue-50"
              $padding="p-3"
              $borderRadius="rounded-lg">
              <Text $weight="bold" $color="text-blue-600">
                42
              </Text>
              <Text $size="xs" $variant="muted">
                Projects
              </Text>
            </Container>
            <Container
              $backgroundColor="bg-green-50"
              $padding="p-3"
              $borderRadius="rounded-lg">
              <Text $weight="bold" $color="text-green-600">
                1.2k
              </Text>
              <Text $size="xs" $variant="muted">
                Followers
              </Text>
            </Container>
            <Container
              $backgroundColor="bg-purple-50"
              $padding="p-3"
              $borderRadius="rounded-lg">
              <Text $weight="bold" $color="text-purple-600">
                156
              </Text>
              <Text $size="xs" $variant="muted">
                Following
              </Text>
            </Container>
          </Container>
        </GridAreasField>

        <GridAreasField $area="actions">
          <Container $display="flex" $gap="gap-2">
            <Button $variant="default" className="flex-1">
              Follow
            </Button>
            <Button $variant="outline" className="flex-1">
              Message
            </Button>
          </Container>
        </GridAreasField>
      </Container>

      <Container className="mt-6 p-4 bg-blue-50 rounded-lg">
        <Text as="h4" $weight="semibold" className="mb-2">
          Componentes Utilizados:
        </Text>
        <Container $display="flex" $flexDirection="col" $gap="gap-1">
          <Badge $variant="outline" $size="sm">
            GridAreasField
          </Badge>
          <Badge $variant="outline" $size="sm">
            Container
          </Badge>
          <Badge $variant="outline" $size="sm">
            Text
          </Badge>
          <Badge $variant="outline" $size="sm">
            Button
          </Badge>
          <Badge $variant="outline" $size="sm">
            Avatar
          </Badge>
          <Badge $variant="outline" $size="sm">
            Badge
          </Badge>
        </Container>
      </Container>
    </Container>
  ),
};

