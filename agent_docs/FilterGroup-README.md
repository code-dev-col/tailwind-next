# FilterGroup Molecule

## 📋 Descripción

`FilterGroup` es un molecule avanzado que combina múltiples dropdowns y checkboxes para crear interfaces de filtrado sofisticadas y reutilizables. Ideal para aplicaciones de e-commerce, dashboards administrativos y cualquier interfaz que requiera filtros complejos.

## 🎯 Características Principales

### ✅ Funcionalidades Core

- **Dropdowns múltiples** - Configuración flexible de filtros de selección
- **Checkboxes múltiples** - Filtros booleanos con descripciones opcionales
- **Integración con Zustand** - Manejo de estado robusto con patrón storeKey
- **Botones de acción** - Limpiar todo y aplicar filtros
- **Colapsable** - Opción de ocultar/mostrar contenido

### 🎨 Variantes de Diseño

- **`default`** - Layout estándar en columna
- **`compact`** - Espaciado reducido para espacios limitados
- **`inline`** - Filtros en línea horizontal
- **`sidebar`** - Optimizado para barras laterales

### 📏 Tamaños

- **`sm`** - Compacto para interfaces densas
- **`default`** - Tamaño estándar
- **`lg`** - Grande para interfaces amplias

### 🎨 Esquemas de Color

- **`default`**, **`secondary`**, **`accent`**, **`muted`**, **`minimal`**, **`custom`**

## 📚 Casos de Uso

### 🛒 E-commerce

```tsx
<FilterGroup
  title="Filtrar Productos"
  dropdowns={[
    {
      id: 'category',
      label: 'Categoría',
      options: categories,
      storeKey: 'selectedCategory',
    },
    {
      id: 'price',
      label: 'Rango de Precio',
      options: priceRanges,
      storeKey: 'selectedPriceRange',
    },
  ]}
  checkboxes={[
    {
      id: 'inStock',
      label: 'Solo en Stock',
      value: 'inStock',
      storeKey: 'showInStockOnly',
    },
    {
      id: 'onSale',
      label: 'En Oferta',
      description: 'Productos con descuento',
      value: 'onSale',
      storeKey: 'showOnSaleOnly',
    },
  ]}
  showClearAll
  showApplyButton
/>
```

### 📊 Dashboard Administrativo

```tsx
<FilterGroup
  $variant="sidebar"
  title="Filtros de Reportes"
  dropdowns={[
    {
      id: 'dateRange',
      label: 'Período',
      options: dateRanges,
      storeKey: 'reportDateRange',
    },
    {
      id: 'department',
      label: 'Departamento',
      options: departments,
      storeKey: 'reportDepartment',
    },
  ]}
  checkboxes={[
    {
      id: 'includeInactive',
      label: 'Incluir Inactivos',
      value: 'inactive',
      storeKey: 'includeInactiveUsers',
    },
  ]}
/>
```

### 🔍 Búsqueda Avanzada

```tsx
<FilterGroup
  $variant="inline"
  dropdowns={[
    { id: 'type', options: documentTypes, storeKey: 'docType' },
    { id: 'status', options: statusOptions, storeKey: 'docStatus' },
  ]}
  checkboxes={[
    {
      id: 'recent',
      label: 'Recientes',
      value: 'recent',
      storeKey: 'showRecent',
    },
    {
      id: 'starred',
      label: 'Favoritos',
      value: 'starred',
      storeKey: 'showStarred',
    },
  ]}
  collapsible
/>
```

## 🔧 API Completa

### Props Principales

```tsx
interface FilterGroupProps {
  // Configuración visual
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';
  $size?: 'default' | 'sm' | 'lg';
  $variant?: 'default' | 'compact' | 'inline' | 'sidebar';
  $custom?: string;

  // Store integration
  $store?: UseBoundStore<StoreApi<T>>;

  // Contenido
  title?: string;
  description?: string;

  // Configuración de filtros
  dropdowns?: FilterDropdownConfig[];
  checkboxes?: FilterCheckboxConfig[];

  // Opciones de UI
  showClearAll?: boolean;
  showApplyButton?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;

  // Callbacks
  onClearAll?: () => void;
  onApply?: () => void;
  onToggleCollapse?: (collapsed: boolean) => void;
}
```

### Configuración de Dropdowns

```tsx
interface FilterDropdownConfig {
  id: string; // ID único
  label?: string; // Etiqueta opcional
  placeholder?: string; // Texto placeholder
  options: FilterOption[]; // Opciones disponibles
  storeKey?: string; // Clave en el store de Zustand
  disabled?: boolean; // Estado deshabilitado
}

interface FilterOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

### Configuración de Checkboxes

```tsx
interface FilterCheckboxConfig {
  id: string; // ID único
  label: string; // Etiqueta del checkbox
  value: string; // Valor del checkbox
  storeKey?: string; // Clave en el store de Zustand
  disabled?: boolean; // Estado deshabilitado
  description?: string; // Descripción opcional
}
```

## 🏪 Integración con Store (Zustand)

### Crear Store de Filtros

```tsx
// stores/productFilters.store.ts
import { create } from 'zustand';

interface ProductFiltersState {
  // Estados de dropdowns
  selectedCategory: string;
  selectedPriceRange: string;
  selectedBrand: string;

  // Estados de checkboxes
  showInStockOnly: boolean;
  showOnSaleOnly: boolean;
  showFeaturedOnly: boolean;

  // Setters
  setSelectedCategory: (value: string) => void;
  setSelectedPriceRange: (value: string) => void;
  setSelectedBrand: (value: string) => void;
  setShowInStockOnly: (value: boolean) => void;
  setShowOnSaleOnly: (value: boolean) => void;
  setShowFeaturedOnly: (value: boolean) => void;

  // Utilidades
  clearAllFilters: () => void;
  getActiveFilters: () => Record<string, any>;
}

export const useProductFilters = create<ProductFiltersState>((set, get) => ({
  // Estados iniciales
  selectedCategory: '',
  selectedPriceRange: '',
  selectedBrand: '',
  showInStockOnly: false,
  showOnSaleOnly: false,
  showFeaturedOnly: false,

  // Setters
  setSelectedCategory: (value) => set({ selectedCategory: value }),
  setSelectedPriceRange: (value) => set({ selectedPriceRange: value }),
  setSelectedBrand: (value) => set({ selectedBrand: value }),
  setShowInStockOnly: (value) => set({ showInStockOnly: value }),
  setShowOnSaleOnly: (value) => set({ showOnSaleOnly: value }),
  setShowFeaturedOnly: (value) => set({ showFeaturedOnly: value }),

  // Utilidades
  clearAllFilters: () =>
    set({
      selectedCategory: '',
      selectedPriceRange: '',
      selectedBrand: '',
      showInStockOnly: false,
      showOnSaleOnly: false,
      showFeaturedOnly: false,
    }),

  getActiveFilters: () => {
    const state = get();
    return {
      category: state.selectedCategory,
      priceRange: state.selectedPriceRange,
      brand: state.selectedBrand,
      inStockOnly: state.showInStockOnly,
      onSaleOnly: state.showOnSaleOnly,
      featuredOnly: state.showFeaturedOnly,
    };
  },
}));
```

### Usar Store con FilterGroup

```tsx
import { useProductFilters } from './stores/productFilters.store';

function ProductPage() {
  const filters = useProductFilters();

  return (
    <FilterGroup
      $store={useProductFilters}
      title="Filtrar Productos"
      dropdowns={[
        {
          id: 'category',
          label: 'Categoría',
          storeKey: 'selectedCategory',
          options: categoryOptions,
        },
      ]}
      checkboxes={[
        {
          id: 'inStock',
          label: 'Solo en Stock',
          value: 'inStock',
          storeKey: 'showInStockOnly',
        },
      ]}
      onClearAll={() => filters.clearAllFilters()}
      onApply={() => {
        const activeFilters = filters.getActiveFilters();
        console.log('Filtros activos:', activeFilters);
        // Aplicar filtros a la búsqueda/API
      }}
      showClearAll
      showApplyButton
    />
  );
}
```

## 🎨 Personalización Avanzada

### Custom Styling

```tsx
<FilterGroup
  $custom="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200"
  className="shadow-xl"
  title="Filtros Personalizados"
  // ... resto de props
/>
```

### Responsive Design

```tsx
<FilterGroup
  $variant="sidebar" // Sidebar en desktop
  className="lg:max-w-xs md:max-w-sm"
  // En mobile automáticamente se adapta a $variant="default"
  // ... resto de props
/>
```

### Con Tema Personalizado

```tsx
<FilterGroup
  $colorScheme="custom"
  className="[&_.filter-section]:bg-emerald-50 [&_.filter-header]:text-emerald-800"
  // ... resto de props
/>
```

## 🎪 Ejemplos Avanzados

### E-commerce Completo

```tsx
const ecommerceDropdowns = [
  {
    id: 'category',
    label: 'Categoría',
    placeholder: 'Todas las categorías',
    options: [
      { value: 'electronics', label: 'Electrónicos' },
      { value: 'clothing', label: 'Ropa' },
      { value: 'home', label: 'Hogar' },
    ],
    storeKey: 'selectedCategory',
  },
  {
    id: 'brand',
    label: 'Marca',
    placeholder: 'Todas las marcas',
    options: brandOptions,
    storeKey: 'selectedBrand',
  },
  {
    id: 'priceRange',
    label: 'Rango de Precio',
    placeholder: 'Cualquier precio',
    options: [
      { value: '0-50', label: '$0 - $50' },
      { value: '50-100', label: '$50 - $100' },
      { value: '100-250', label: '$100 - $250' },
      { value: '250+', label: '$250+' },
    ],
    storeKey: 'selectedPriceRange',
  },
];

const ecommerceCheckboxes = [
  {
    id: 'inStock',
    label: 'Solo en Stock',
    description: 'Mostrar únicamente productos disponibles',
    value: 'inStock',
    storeKey: 'showInStockOnly',
  },
  {
    id: 'onSale',
    label: 'En Oferta',
    description: 'Productos con descuento activo',
    value: 'onSale',
    storeKey: 'showOnSaleOnly',
  },
  {
    id: 'freeShipping',
    label: 'Envío Gratis',
    description: 'Sin costo adicional de envío',
    value: 'freeShipping',
    storeKey: 'showFreeShippingOnly',
  },
  {
    id: 'newArrivals',
    label: 'Nuevos',
    description: 'Productos de los últimos 30 días',
    value: 'newArrivals',
    storeKey: 'showNewArrivalsOnly',
  },
];

<FilterGroup
  $store={useProductFilters}
  $variant="sidebar"
  title="Filtrar Productos"
  description="Encuentra exactamente lo que buscas"
  dropdowns={ecommerceDropdowns}
  checkboxes={ecommerceCheckboxes}
  showClearAll
  showApplyButton
  collapsible
  onClearAll={() => useProductFilters.getState().clearAllFilters()}
  onApply={() => {
    const filters = useProductFilters.getState().getActiveFilters();
    // Trigger search with filters
    searchProducts(filters);
  }}
/>;
```

### Dashboard con Filtros Complejos

```tsx
<FilterGroup
  $store={useDashboardFilters}
  $colorScheme="accent"
  title="Filtros de Dashboard"
  dropdowns={[
    {
      id: 'dateRange',
      label: 'Período de Tiempo',
      options: [
        { value: 'today', label: 'Hoy' },
        { value: 'week', label: 'Esta semana' },
        { value: 'month', label: 'Este mes' },
        { value: 'quarter', label: 'Este trimestre' },
        { value: 'year', label: 'Este año' },
        { value: 'custom', label: 'Personalizado' },
      ],
      storeKey: 'selectedDateRange',
    },
    {
      id: 'department',
      label: 'Departamento',
      options: departmentOptions,
      storeKey: 'selectedDepartment',
    },
    {
      id: 'metric',
      label: 'Métrica Principal',
      options: [
        { value: 'revenue', label: 'Ingresos' },
        { value: 'orders', label: 'Pedidos' },
        { value: 'customers', label: 'Clientes' },
        { value: 'conversion', label: 'Conversión' },
      ],
      storeKey: 'selectedMetric',
    },
  ]}
  checkboxes={[
    {
      id: 'excludeReturns',
      label: 'Excluir Devoluciones',
      value: 'excludeReturns',
      storeKey: 'excludeReturns',
    },
    {
      id: 'showTrends',
      label: 'Mostrar Tendencias',
      description: 'Comparar con período anterior',
      value: 'showTrends',
      storeKey: 'showTrends',
    },
  ]}
  showApplyButton
  onApply={() => {
    // Refresh dashboard with new filters
    refreshDashboard();
  }}
/>
```

## 📖 Mejores Prácticas

### ✅ Recomendaciones

1. **Store Structure**: Crear stores específicos por contexto (productos, usuarios, reportes, etc.)
2. **Naming Convention**: Usar `storeKey` descriptivas que indiquen claramente su propósito
3. **Option Management**: Mantener las opciones en constantes separadas para reutilización
4. **Performance**: Usar `useCallback` para callbacks complejos en `onApply`
5. **Accessibility**: Siempre proporcionar labels descriptivos para dropdowns
6. **Responsive**: Considerar usar `$variant="inline"` en mobile y `$variant="sidebar"` en desktop

### ❌ Evitar

1. **Hardcoding Options**: No hardcodear opciones en el JSX, usar constantes
2. **Missing StoreKeys**: Siempre definir `storeKey` para filtros que afecten la búsqueda
3. **Overloading**: No incluir más de 5-6 filtros por grupo para evitar overwhelm
4. **Inconsistent Naming**: Mantener consistencia en nombres de valores y etiquetas

## 🔄 Migración desde Componentes Simples

Si tienes filtros construidos con componentes individuales:

```tsx
// ❌ Antes - Componentes separados
<div>
  <Dropdown options={categories} />
  <CheckBox label="En Stock" />
  <CheckBox label="En Oferta" />
  <Button onClick={clearFilters}>Limpiar</Button>
</div>

// ✅ Después - FilterGroup
<FilterGroup
  dropdowns={[
    { id: 'cat', options: categories, storeKey: 'category' }
  ]}
  checkboxes={[
    { id: 'stock', label: 'En Stock', storeKey: 'inStock' },
    { id: 'sale', label: 'En Oferta', storeKey: 'onSale' },
  ]}
  showClearAll
/>
```

## 🧪 Testing

```tsx
// test/FilterGroup.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { FilterGroup } from '@code-dev-col/tailwind-next';

test('applies filters correctly', () => {
  const onApply = jest.fn();

  render(
    <FilterGroup
      dropdowns={[{ id: 'test', options: testOptions, storeKey: 'testKey' }]}
      showApplyButton
      onApply={onApply}
    />
  );

  // Interact with filter and test application
});
```

---

El `FilterGroup` es una solución completa y robusta para filtros complejos que mantiene la consistencia visual y funcional en toda la aplicación. 🎯

