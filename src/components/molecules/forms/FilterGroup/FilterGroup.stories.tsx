import type { Meta, StoryObj } from '@storybook/react';
import { FilterGroup } from './FilterGroup';
import { useFilterGroupExamples } from '../../../../stores/filterGroupExamples.store';

const meta: Meta<typeof FilterGroup> = {
  title: 'Molecules/Forms/FilterGroup',
  component: FilterGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Opciones de ejemplo para los dropdowns
const categoryOptions = [
  { value: 'electronics', label: 'Electrónicos' },
  { value: 'clothing', label: 'Ropa' },
  { value: 'books', label: 'Libros' },
  { value: 'home', label: 'Hogar' },
  { value: 'sports', label: 'Deportes' },
];

const statusOptions = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
  { value: 'pending', label: 'Pendiente' },
  { value: 'archived', label: 'Archivado' },
];

const priceRangeOptions = [
  { value: '0-25', label: '$0 - $25' },
  { value: '25-50', label: '$25 - $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100-250', label: '$100 - $250' },
  { value: '250+', label: '$250+' },
];

const brandOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'samsung', label: 'Samsung' },
  { value: 'nike', label: 'Nike' },
  { value: 'adidas', label: 'Adidas' },
  { value: 'sony', label: 'Sony' },
];

// ✅ Story básica con configuración simple
export const Default: Story = {
  render: () => (
    <FilterGroup
      $store={useFilterGroupExamples}
      title="Filtros Básicos"
      description="Selecciona los filtros para refinar tu búsqueda"
      dropdowns={[
        {
          id: 'category',
          label: 'Categoría',
          placeholder: 'Selecciona una categoría',
          options: categoryOptions,
          storeKey: 'categoryFilter',
        },
        {
          id: 'status',
          label: 'Estado',
          placeholder: 'Selecciona un estado',
          options: statusOptions,
          storeKey: 'statusFilter',
        },
      ]}
      checkboxes={[
        {
          id: 'inStock',
          label: 'En Stock',
          value: 'inStock',
          storeKey: 'inStockFilter',
        },
        {
          id: 'onSale',
          label: 'En Oferta',
          value: 'onSale',
          description: 'Productos con descuento',
          storeKey: 'onSaleFilter',
        },
      ]}
      showClearAll
    />
  ),
};

// ✅ Story de variantes de diseño
export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Default</h3>
        <FilterGroup
          $variant="default"
          title="Filtros Estándar"
          dropdowns={[
            {
              id: 'category1',
              label: 'Categoría',
              options: categoryOptions.slice(0, 3),
              storeKey: 'categoryFilter',
            },
          ]}
          checkboxes={[
            {
              id: 'check1',
              label: 'En Stock',
              value: 'stock',
              storeKey: 'inStockFilter',
            },
          ]}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Compact</h3>
        <FilterGroup
          $variant="compact"
          title="Filtros Compactos"
          dropdowns={[
            {
              id: 'category2',
              label: 'Categoría',
              options: categoryOptions.slice(0, 3),
              storeKey: 'categoryFilter',
            },
          ]}
          checkboxes={[
            {
              id: 'check2',
              label: 'En Stock',
              value: 'stock',
              storeKey: 'inStockFilter',
            },
          ]}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Inline</h3>
        <FilterGroup
          $variant="inline"
          title="Filtros en Línea"
          dropdowns={[
            {
              id: 'category3',
              options: categoryOptions.slice(0, 2),
              storeKey: 'categoryFilter',
            },
            {
              id: 'status3',
              options: statusOptions.slice(0, 2),
              storeKey: 'statusFilter',
            },
          ]}
          checkboxes={[
            {
              id: 'check3',
              label: 'Stock',
              value: 'stock',
              storeKey: 'inStockFilter',
            },
            {
              id: 'check4',
              label: 'Oferta',
              value: 'sale',
              storeKey: 'onSaleFilter',
            },
          ]}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Sidebar</h3>
        <FilterGroup
          $variant="sidebar"
          title="Filtros Sidebar"
          dropdowns={[
            {
              id: 'category4',
              label: 'Categoría',
              options: categoryOptions.slice(0, 3),
              storeKey: 'categoryFilter',
            },
          ]}
          checkboxes={[
            {
              id: 'check5',
              label: 'En Stock',
              value: 'stock',
              storeKey: 'inStockFilter',
            },
            {
              id: 'check6',
              label: 'En Oferta',
              value: 'sale',
              storeKey: 'onSaleFilter',
            },
          ]}
        />
      </div>
    </div>
  ),
};

// ✅ Story de tamaños
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Small</h3>
        <FilterGroup
          $size="sm"
          title="Filtros Pequeños"
          dropdowns={[
            {
              id: 'cat-sm',
              label: 'Categoría',
              options: categoryOptions.slice(0, 3),
              storeKey: 'categoryFilter',
            },
          ]}
          checkboxes={[
            {
              id: 'check-sm',
              label: 'En Stock',
              value: 'stock',
              storeKey: 'inStockFilter',
            },
          ]}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Default</h3>
        <FilterGroup
          $size="default"
          title="Filtros Normales"
          dropdowns={[
            {
              id: 'cat-def',
              label: 'Categoría',
              options: categoryOptions.slice(0, 3),
              storeKey: 'categoryFilter',
            },
          ]}
          checkboxes={[
            {
              id: 'check-def',
              label: 'En Stock',
              value: 'stock',
              storeKey: 'inStockFilter',
            },
          ]}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Large</h3>
        <FilterGroup
          $size="lg"
          title="Filtros Grandes"
          dropdowns={[
            {
              id: 'cat-lg',
              label: 'Categoría',
              options: categoryOptions.slice(0, 3),
              storeKey: 'categoryFilter',
            },
          ]}
          checkboxes={[
            {
              id: 'check-lg',
              label: 'En Stock',
              value: 'stock',
              storeKey: 'inStockFilter',
            },
          ]}
        />
      </div>
    </div>
  ),
};

// ✅ Story de esquemas de color
export const ColorSchemes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <FilterGroup
        $colorScheme="default"
        title="Default"
        dropdowns={[
          {
            id: 'cat-default',
            label: 'Categoría',
            options: categoryOptions.slice(0, 3),
            storeKey: 'categoryFilter',
          },
        ]}
        checkboxes={[
          {
            id: 'check-default',
            label: 'En Stock',
            value: 'stock',
            storeKey: 'inStockFilter',
          },
        ]}
      />

      <FilterGroup
        $colorScheme="secondary"
        title="Secondary"
        dropdowns={[
          {
            id: 'cat-secondary',
            label: 'Categoría',
            options: categoryOptions.slice(0, 3),
            storeKey: 'categoryFilter',
          },
        ]}
        checkboxes={[
          {
            id: 'check-secondary',
            label: 'En Stock',
            value: 'stock',
            storeKey: 'inStockFilter',
          },
        ]}
      />

      <FilterGroup
        $colorScheme="accent"
        title="Accent"
        dropdowns={[
          {
            id: 'cat-accent',
            label: 'Categoría',
            options: categoryOptions.slice(0, 3),
            storeKey: 'categoryFilter',
          },
        ]}
        checkboxes={[
          {
            id: 'check-accent',
            label: 'En Stock',
            value: 'stock',
            storeKey: 'inStockFilter',
          },
        ]}
      />

      <FilterGroup
        $colorScheme="muted"
        title="Muted"
        dropdowns={[
          {
            id: 'cat-muted',
            label: 'Categoría',
            options: categoryOptions.slice(0, 3),
            storeKey: 'categoryFilter',
          },
        ]}
        checkboxes={[
          {
            id: 'check-muted',
            label: 'En Stock',
            value: 'stock',
            storeKey: 'inStockFilter',
          },
        ]}
      />
    </div>
  ),
};

// ✅ Story con funcionalidad completa
export const WithInteraction: Story = {
  render: () => (
    <FilterGroup
      $store={useFilterGroupExamples}
      title="E-commerce Filters"
      description="Filtra productos por categoría, precio y características"
      dropdowns={[
        {
          id: 'interactive-category',
          label: 'Categoría',
          placeholder: 'Todas las categorías',
          options: categoryOptions,
          storeKey: 'interactiveCategory',
        },
        {
          id: 'interactive-price',
          label: 'Rango de Precio',
          placeholder: 'Todos los precios',
          options: priceRangeOptions,
          storeKey: 'interactivePrice',
        },
        {
          id: 'interactive-status',
          label: 'Estado del Producto',
          placeholder: 'Todos los estados',
          options: statusOptions,
          storeKey: 'interactiveStatus',
        },
      ]}
      checkboxes={[
        {
          id: 'interactive-instock',
          label: 'Solo en Stock',
          value: 'inStock',
          description: 'Mostrar solo productos disponibles',
          storeKey: 'interactiveInStock',
        },
        {
          id: 'interactive-onsale',
          label: 'En Oferta',
          value: 'onSale',
          description: 'Productos con descuento',
          storeKey: 'interactiveOnSale',
        },
        {
          id: 'interactive-freeshipping',
          label: 'Envío Gratis',
          value: 'freeShipping',
          description: 'Sin costo de envío',
          storeKey: 'interactiveFreeShipping',
        },
      ]}
      showClearAll
      showApplyButton
      onClearAll={() => {
        useFilterGroupExamples.getState().clearInteractiveFilters();
        console.log('Filtros limpiados');
      }}
      onApply={() => {
        const state = useFilterGroupExamples.getState();
        console.log('Filtros aplicados:', {
          categoria: state.interactiveCategory,
          precio: state.interactivePrice,
          estado: state.interactiveStatus,
          enStock: state.interactiveInStock,
          enOferta: state.interactiveOnSale,
          envioGratis: state.interactiveFreeShipping,
        });
      }}
    />
  ),
};

// ✅ Story con funcionalidad de colapso
export const Collapsible: Story = {
  render: () => (
    <div className="space-y-4">
      <FilterGroup
        title="Filtros Colapsables"
        description="Haz clic en el botón para colapsar/expandir"
        collapsible
        defaultCollapsed={false}
        dropdowns={[
          {
            id: 'collapsible-category',
            label: 'Categoría',
            options: categoryOptions.slice(0, 3),
            storeKey: 'categoryFilter',
          },
        ]}
        checkboxes={[
          {
            id: 'collapsible-stock',
            label: 'En Stock',
            value: 'stock',
            storeKey: 'inStockFilter',
          },
          {
            id: 'collapsible-sale',
            label: 'En Oferta',
            value: 'sale',
            storeKey: 'onSaleFilter',
          },
        ]}
        onToggleCollapse={(collapsed) => {
          console.log(
            'Estado de colapso:',
            collapsed ? 'Colapsado' : 'Expandido'
          );
        }}
      />

      <FilterGroup
        title="Filtros Inicialmente Colapsados"
        description="Este inicia colapsado"
        collapsible
        defaultCollapsed
        dropdowns={[
          {
            id: 'collapsed-category',
            label: 'Categoría',
            options: categoryOptions.slice(0, 3),
            storeKey: 'categoryFilter',
          },
        ]}
        checkboxes={[
          {
            id: 'collapsed-stock',
            label: 'En Stock',
            value: 'stock',
            storeKey: 'inStockFilter',
          },
        ]}
      />
    </div>
  ),
};

// ✅ Story con configuración compleja de e-commerce
export const ECommerceExample: Story = {
  render: () => (
    <div className="max-w-xs">
      <FilterGroup
        $store={useFilterGroupExamples}
        $variant="sidebar"
        title="Filtrar Productos"
        description="Encuentra exactamente lo que buscas"
        dropdowns={[
          {
            id: 'complex-category',
            label: 'Categoría Principal',
            placeholder: 'Todas las categorías',
            options: categoryOptions,
            storeKey: 'complexCategory',
          },
          {
            id: 'complex-brand',
            label: 'Marca',
            placeholder: 'Todas las marcas',
            options: brandOptions,
            storeKey: 'complexBrand',
          },
          {
            id: 'complex-minprice',
            label: 'Precio Mínimo',
            placeholder: 'Sin mínimo',
            options: [
              { value: '0', label: '$0' },
              { value: '25', label: '$25' },
              { value: '50', label: '$50' },
              { value: '100', label: '$100' },
            ],
            storeKey: 'complexMinPrice',
          },
          {
            id: 'complex-maxprice',
            label: 'Precio Máximo',
            placeholder: 'Sin máximo',
            options: [
              { value: '50', label: '$50' },
              { value: '100', label: '$100' },
              { value: '250', label: '$250' },
              { value: '500', label: '$500+' },
            ],
            storeKey: 'complexMaxPrice',
          },
        ]}
        checkboxes={[
          {
            id: 'complex-available',
            label: 'Disponible',
            value: 'available',
            description: 'Solo productos en stock',
            storeKey: 'complexAvailable',
          },
          {
            id: 'complex-new',
            label: 'Nuevos',
            value: 'new',
            description: 'Productos nuevos (últimos 30 días)',
            storeKey: 'complexNew',
          },
          {
            id: 'complex-sale',
            label: 'En Oferta',
            value: 'sale',
            description: 'Con descuento aplicado',
            storeKey: 'complexSale',
          },
          {
            id: 'complex-featured',
            label: 'Destacados',
            value: 'featured',
            description: 'Productos recomendados',
            storeKey: 'complexFeatured',
          },
          {
            id: 'complex-rating',
            label: 'Alta Calificación',
            value: 'rating',
            description: '4+ estrellas',
            storeKey: 'complexRating',
          },
        ]}
        showClearAll
        showApplyButton
        collapsible
        onClearAll={() => {
          useFilterGroupExamples.getState().clearComplexFilters();
        }}
        onApply={() => {
          const state = useFilterGroupExamples.getState();
          console.log('Filtros de e-commerce aplicados:', {
            categoria: state.complexCategory,
            marca: state.complexBrand,
            precioMin: state.complexMinPrice,
            precioMax: state.complexMaxPrice,
            disponible: state.complexAvailable,
            nuevo: state.complexNew,
            enOferta: state.complexSale,
            destacado: state.complexFeatured,
            altaCalificacion: state.complexRating,
          });
        }}
      />
    </div>
  ),
};

// ✅ Story con estados de debug
export const WithDebugInfo: Story = {
  render: () => {
    const store = useFilterGroupExamples();

    return (
      <div className="space-y-4">
        <FilterGroup
          $store={useFilterGroupExamples}
          title="Filtros con Debug"
          description="Observa cómo cambian los valores en tiempo real"
          dropdowns={[
            {
              id: 'debug-category',
              label: 'Categoría',
              placeholder: 'Selecciona categoría',
              options: categoryOptions.slice(0, 4),
              storeKey: 'interactiveCategory',
            },
          ]}
          checkboxes={[
            {
              id: 'debug-stock',
              label: 'En Stock',
              value: 'inStock',
              storeKey: 'interactiveInStock',
            },
            {
              id: 'debug-sale',
              label: 'En Oferta',
              value: 'onSale',
              storeKey: 'interactiveOnSale',
            },
          ]}
          showClearAll
        />

        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Estado Actual de los Filtros:</h4>
          <pre className="text-sm bg-background p-2 rounded border">
            {JSON.stringify(
              {
                categoria: store.interactiveCategory || 'Sin seleccionar',
                enStock: store.interactiveInStock,
                enOferta: store.interactiveOnSale,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    );
  },
};

