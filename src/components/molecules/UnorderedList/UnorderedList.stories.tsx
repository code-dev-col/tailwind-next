import type { Meta, StoryObj } from '@storybook/react';
import { UnorderedList } from './UnorderedList';
import { ListItem } from '../../atoms/ListItem';

const meta: Meta<typeof UnorderedList> = {
  title: 'Molecules/UnorderedList',
  component: UnorderedList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UnorderedList>
      <ListItem>Primer elemento de la lista</ListItem>
      <ListItem>Segundo elemento con más contenido</ListItem>
      <ListItem>Tercer elemento</ListItem>
    </UnorderedList>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-2">Default</h3>
        <UnorderedList $variant="default">
          <ListItem>Item default</ListItem>
          <ListItem>Otro item</ListItem>
        </UnorderedList>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Minimal</h3>
        <UnorderedList $variant="minimal">
          <ListItem>Item minimal</ListItem>
          <ListItem>Otro item</ListItem>
        </UnorderedList>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Spaced</h3>
        <UnorderedList $variant="spaced">
          <ListItem>Item con espaciado</ListItem>
          <ListItem>Otro item con espaciado</ListItem>
        </UnorderedList>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Compact</h3>
        <UnorderedList $variant="compact">
          <ListItem>Item compacto</ListItem>
          <ListItem>Otro item compacto</ListItem>
        </UnorderedList>
      </div>
    </div>
  ),
};

export const CustomMarkers: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-2">Emoji Markers</h3>
        <UnorderedList $marker="🎉">
          <ListItem>Celebración</ListItem>
          <ListItem>Fiesta</ListItem>
        </UnorderedList>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Arrow Markers</h3>
        <UnorderedList $marker="→" $markerColor="primary">
          <ListItem>Dirección</ListItem>
          <ListItem>Navegación</ListItem>
        </UnorderedList>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Star Markers</h3>
        <UnorderedList $marker="★" $markerColor="accent">
          <ListItem>Favorito</ListItem>
          <ListItem>Destacado</ListItem>
        </UnorderedList>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Check Markers</h3>
        <UnorderedList $marker="✓" $markerColor="secondary">
          <ListItem>Completado</ListItem>
          <ListItem>Verificado</ListItem>
        </UnorderedList>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Small</h3>
        <UnorderedList $size="sm">
          <ListItem>Item pequeño</ListItem>
          <ListItem>Otro item pequeño</ListItem>
        </UnorderedList>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Medium</h3>
        <UnorderedList $size="md">
          <ListItem>Item mediano</ListItem>
          <ListItem>Otro item mediano</ListItem>
        </UnorderedList>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Large</h3>
        <UnorderedList $size="lg">
          <ListItem>Item grande</ListItem>
          <ListItem>Otro item grande</ListItem>
        </UnorderedList>
      </div>
    </div>
  ),
};

export const WithoutMarkers: Story = {
  render: () => (
    <UnorderedList $showMarkers={false} $variant="minimal">
      <ListItem>Sin marcadores</ListItem>
      <ListItem>Lista limpia</ListItem>
      <ListItem>Solo texto</ListItem>
    </UnorderedList>
  ),
};

export const MixedContent: Story = {
  render: () => (
    <UnorderedList $marker="📋" $spacing="loose">
      <ListItem $variant="primary">
        <strong>Tarea importante</strong>
        <p className="text-sm text-muted-foreground mt-1">
          Descripción de la tarea importante con más detalles
        </p>
      </ListItem>
      <ListItem $variant="secondary">
        <strong>Tarea secundaria</strong>
        <p className="text-sm text-muted-foreground mt-1">
          Otra tarea con contenido adicional
        </p>
      </ListItem>
      <ListItem $clickable onClick={() => alert('Task clicked!')}>
        <strong>Tarea interactiva</strong>
        <p className="text-sm text-muted-foreground mt-1">
          Haz clic para interactuar
        </p>
      </ListItem>
    </UnorderedList>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <UnorderedList
      $marker="✨"
      $custom="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
      <ListItem $custom="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded px-2 py-1">
        Item con fondo gradiente
      </ListItem>
      <ListItem $custom="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded px-2 py-1">
        Otro item con gradiente azul
      </ListItem>
      <ListItem $custom="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded px-2 py-1">
        Item con gradiente verde
      </ListItem>
    </UnorderedList>
  ),
};

