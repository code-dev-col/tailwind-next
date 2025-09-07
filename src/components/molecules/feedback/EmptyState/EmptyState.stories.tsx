import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { useEmptyStateExamples } from '../../../../stores/emptyStateExamples.store';
import {
  FiInbox,
  FiSearch,
  FiHeart,
  FiStar,
  FiShoppingCart,
  FiBell,
  FiUpload,
  FiUsers,
  FiFolder,
  FiImage,
  FiFile,
  FiBookmark,
} from 'react-icons/fi';
import { Container } from '../../../atoms/layout/Container';
import { Grid } from '../../../atoms/layout/Grid';
import { Button } from '../../../atoms/forms/Button';
import { Input } from '../../../atoms/forms/Input';
import { Label } from '../../../atoms/forms/Label';

const meta: Meta<typeof EmptyState> = {
  title: 'Molecules/Feedback/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'EmptyState es una molecule de feedback que combina Icon + título + descripción + acción para mostrar estados vacíos o de ausencia de contenido.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
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
      options: ['sm', 'default', 'lg'],
    },
    $variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed', 'minimal'],
    },
    icon: {
      control: false,
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    actionText: {
      control: 'text',
    },
    showAction: {
      control: 'boolean',
    },
    showSeparator: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Historia por defecto
export const Default: Story = {
  render: () => (
    <EmptyState
      $store={useEmptyStateExamples}
      storeKey="defaultExample"
      onActionClick={() => alert('Acción ejecutada!')}
    />
  ),
};

// 2. Variantes de tamaño
export const Sizes: Story = {
  render: () => (
    <Container className="space-y-8">
      <Container>
        <h3 className="text-lg font-semibold mb-4">Tamaños</h3>
        <Grid $columns={3} $gap="gap-6">
          <EmptyState
            $size="sm"
            title="Tamaño pequeño"
            description="Perfecto para espacios compactos"
            onActionClick={() => {}}
          />
          <EmptyState
            $size="default"
            title="Tamaño por defecto"
            description="El tamaño estándar para la mayoría de casos"
            onActionClick={() => {}}
          />
          <EmptyState
            $size="lg"
            title="Tamaño grande"
            description="Para destacar estados importantes o páginas principales"
            onActionClick={() => {}}
          />
        </Grid>
      </Container>
    </Container>
  ),
};

// 3. Variantes de estilo
export const Variants: Story = {
  render: () => (
    <Container className="space-y-8">
      <Container>
        <h3 className="text-lg font-semibold mb-4">Variantes</h3>
        <Grid $columns={2} $gap="gap-6">
          <EmptyState
            $variant="default"
            title="Por defecto"
            description="Centrado con espaciado estándar"
            onActionClick={() => {}}
          />
          <EmptyState
            $variant="compact"
            title="Compacto"
            description="Espaciado reducido"
            onActionClick={() => {}}
          />
          <EmptyState
            $variant="detailed"
            title="Detallado"
            description="Texto alineado a la izquierda con más espacio para contenido extenso y explicaciones detalladas"
            onActionClick={() => {}}
          />
          <EmptyState
            $variant="minimal"
            title="Mínimo"
            description="Solo elementos esenciales"
            onActionClick={() => {}}
          />
        </Grid>
      </Container>
    </Container>
  ),
};

// 4. Esquemas de color
export const ColorSchemes: Story = {
  render: () => (
    <Container className="space-y-8">
      <Container>
        <h3 className="text-lg font-semibold mb-4">Esquemas de Color</h3>
        <Grid $columns={2} $gap="gap-6">
          <EmptyState
            $colorScheme="default"
            title="Por defecto"
            description="Esquema de color estándar"
            onActionClick={() => {}}
          />
          <EmptyState
            $colorScheme="secondary"
            title="Secundario"
            description="Para elementos secundarios"
            onActionClick={() => {}}
          />
          <EmptyState
            $colorScheme="accent"
            title="Acento"
            description="Para destacar contenido importante"
            onActionClick={() => {}}
          />
          <EmptyState
            $colorScheme="muted"
            title="Silenciado"
            description="Para contenido menos importante"
            onActionClick={() => {}}
          />
          <EmptyState
            $colorScheme="minimal"
            title="Mínimo"
            description="Esquema transparente y sutil"
            onActionClick={() => {}}
          />
          <EmptyState
            $colorScheme="destructive"
            title="Destructivo"
            description="Para estados de error o eliminación"
            onActionClick={() => {}}
          />
        </Grid>
      </Container>
    </Container>
  ),
};

// 5. Diferentes iconos
export const Icons: Story = {
  render: () => (
    <Container className="space-y-8">
      <Container>
        <h3 className="text-lg font-semibold mb-4">Diferentes Iconos</h3>
        <Grid $columns={3} $gap="gap-6">
          <EmptyState
            icon={FiInbox}
            title="Bandeja vacía"
            description="No hay mensajes"
            actionText="Enviar mensaje"
            onActionClick={() => {}}
          />
          <EmptyState
            icon={FiSearch}
            title="Sin resultados"
            description="No se encontraron coincidencias"
            actionText="Limpiar filtros"
            onActionClick={() => {}}
          />
          <EmptyState
            icon={FiHeart}
            title="Sin favoritos"
            description="Aún no has guardado favoritos"
            actionText="Explorar contenido"
            onActionClick={() => {}}
          />
        </Grid>
      </Container>
    </Container>
  ),
};

// 6. Sin acción
export const WithoutAction: Story = {
  render: () => (
    <Container className="space-y-6">
      <Container>
        <h3 className="text-lg font-semibold mb-4">Sin Botón de Acción</h3>
        <Grid $columns={2} $gap="gap-6">
          <EmptyState
            icon={FiUsers}
            title="Lista de contactos vacía"
            description="Importa contactos desde tu agenda"
            showAction={false}
          />
          <EmptyState
            icon={FiFolder}
            title="Carpeta vacía"
            description="Esta carpeta no contiene archivos"
            showAction={false}
            showSeparator={true}
          />
        </Grid>
      </Container>
    </Container>
  ),
};

// 7. Con separador
export const WithSeparator: Story = {
  render: () => (
    <Container className="space-y-6">
      <Container>
        <h3 className="text-lg font-semibold mb-4">Con Separador</h3>
        <Grid $columns={2} $gap="gap-6">
          <EmptyState
            icon={FiBell}
            title="Sin notificaciones"
            description="Todas las notificaciones aparecerán aquí"
            actionText="Configurar alertas"
            showSeparator={true}
            onActionClick={() => {}}
          />
          <EmptyState
            icon={FiUpload}
            title="Sin archivos subidos"
            description="Arrastra archivos aquí para subirlos"
            actionText="Seleccionar archivos"
            showSeparator={true}
            $colorScheme="accent"
            onActionClick={() => {}}
          />
        </Grid>
      </Container>
    </Container>
  ),
};

// 8. Interactivo (clickeable)
export const Interactive: Story = {
  render: () => (
    <Container className="space-y-6">
      <Container>
        <h3 className="text-lg font-semibold mb-4">
          EmptyState Interactivo (Clickeable)
        </h3>
        <Grid $columns={2} $gap="gap-6">
          <EmptyState
            icon={FiImage}
            title="Galería vacía"
            description="Haz clic para agregar imágenes"
            actionText="Subir imagen"
            onActionClick={() => alert('Botón de acción clickeado!')}
            onClick={() => alert('EmptyState completo clickeado!')}
          />
          <EmptyState
            icon={FiFile}
            title="Documentos"
            description="Crea tu primer documento"
            actionText="Nuevo documento"
            $colorScheme="secondary"
            onActionClick={() => alert('Crear documento!')}
            onClick={() => alert('Área de documentos clickeada!')}
          />
        </Grid>
      </Container>
    </Container>
  ),
};

// 9. Con store
export const WithStore: Story = {
  render: () => (
    <Container className="space-y-6">
      <Container>
        <h3 className="text-lg font-semibold mb-4">Integración con Store</h3>
        <Grid $columns={2} $gap="gap-6">
          <EmptyState
            $store={useEmptyStateExamples}
            storeKey="searchResults"
            icon={FiSearch}
            title="Sin resultados de búsqueda"
            description="Prueba con términos diferentes"
            actionText="Limpiar búsqueda"
            onActionClick={() => alert('Búsqueda limpiada!')}
          />
          <EmptyState
            $store={useEmptyStateExamples}
            storeKey="favoriteItems"
            icon={FiBookmark}
            title="Sin elementos guardados"
            description="Guarda elementos para acceso rápido"
            actionText="Explorar"
            $colorScheme="accent"
            onActionClick={() => alert('Explorar contenido!')}
          />
        </Grid>
      </Container>
    </Container>
  ),
};

// 10. Casos de uso reales
export const UseCases: Story = {
  render: () => (
    <Container className="space-y-8">
      <Container>
        <h3 className="text-lg font-semibold mb-4">Casos de Uso Reales</h3>
        <Grid $columns={1} $gap="gap-8">
          {/* Carrito de compras vacío */}
          <Container className="p-6 border border-border rounded-lg">
            <h4 className="text-md font-medium mb-4">
              Carrito de Compras Vacío
            </h4>
            <EmptyState
              icon={FiShoppingCart}
              title="Tu carrito está vacío"
              description="Agrega productos para empezar a comprar. Descubre nuestras ofertas especiales."
              actionText="Continuar comprando"
              $colorScheme="accent"
              $size="lg"
              onActionClick={() => alert('Redirigir a tienda!')}
            />
          </Container>

          {/* Lista de notificaciones */}
          <Container className="p-6 border border-border rounded-lg">
            <h4 className="text-md font-medium mb-4">
              Centro de Notificaciones
            </h4>
            <EmptyState
              icon={FiBell}
              title="No tienes notificaciones"
              description="Cuando recibas notificaciones, aparecerán aquí"
              showAction={false}
              $variant="compact"
              $colorScheme="muted"
            />
          </Container>

          {/* Búsqueda sin resultados */}
          <Container className="p-6 border border-border rounded-lg">
            <h4 className="text-md font-medium mb-4">Resultados de Búsqueda</h4>
            <EmptyState
              icon={FiSearch}
              title='No se encontraron resultados para "zapatos rojos"'
              description="Intenta con términos más generales o revisa la ortografía"
              actionText="Limpiar filtros"
              $variant="detailed"
              onActionClick={() => alert('Filtros eliminados!')}
            />
          </Container>
        </Grid>
      </Container>
    </Container>
  ),
};

// 11. Configuración dinámica
export const Dynamic: Story = {
  render: () => {
    const {
      dynamicTitle,
      dynamicDescription,
      dynamicIcon,
      dynamicActionText,
      showAction,
      setDynamicTitle,
      setDynamicDescription,
      setDynamicActionText,
      setShowAction,
    } = useEmptyStateExamples();

    const iconMap: Record<string, any> = {
      inbox: FiInbox,
      search: FiSearch,
      heart: FiHeart,
      star: FiStar,
      cart: FiShoppingCart,
      bell: FiBell,
      upload: FiUpload,
      users: FiUsers,
      folder: FiFolder,
    };

    return (
      <Container className="space-y-6">
        <Container>
          <h3 className="text-lg font-semibold mb-4">
            EmptyState Configurable
          </h3>

          {/* Controles */}
          <Container className="p-4 bg-muted/30 rounded-lg mb-6 space-y-4">
            <Grid $columns={2} $gap="gap-4">
              <Container>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={dynamicTitle}
                  onChange={(e) => setDynamicTitle(e.target.value)}
                  placeholder="Título del EmptyState"
                />
              </Container>
              <Container>
                <Label htmlFor="actionText">Texto del botón</Label>
                <Input
                  id="actionText"
                  value={dynamicActionText}
                  onChange={(e) => setDynamicActionText(e.target.value)}
                  placeholder="Texto del botón"
                />
              </Container>
            </Grid>

            <Container>
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                value={dynamicDescription}
                onChange={(e) => setDynamicDescription(e.target.value)}
                placeholder="Descripción del estado vacío"
              />
            </Container>

            <Container className="flex items-center gap-4">
              <Label>
                <input
                  type="checkbox"
                  checked={showAction}
                  onChange={(e) => setShowAction(e.target.checked)}
                  className="mr-2"
                />
                Mostrar botón de acción
              </Label>
            </Container>
          </Container>

          {/* EmptyState dinámico */}
          <Container className="flex justify-center">
            <EmptyState
              icon={iconMap[dynamicIcon] || FiInbox}
              title={dynamicTitle}
              description={dynamicDescription}
              actionText={dynamicActionText}
              showAction={showAction}
              onActionClick={() => alert(`Acción: ${dynamicActionText}`)}
            />
          </Container>
        </Container>
      </Container>
    );
  },
};

