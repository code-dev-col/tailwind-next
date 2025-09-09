# Template para Molecules - Atomic Design

## Estructura de Archivos

```
src/components/molecules/
├── forms/              # 🔹 Combinaciones de formularios
│   ├── FormField/      # ✅ Ya existe - Label + Input/TextArea/Dropdown + mensajes
│   ├── SearchBox/      # 🎯 Input + Button + Icon (búsqueda)
│   ├── LoginForm/      # Usuario + contraseña + botón
│   ├── FilterGroup/    # Múltiples dropdowns/checkboxes
│   └── ContactForm/    # Nombre + email + mensaje
├── cards/              # 🔹 Tarjetas con información estructurada
│   ├── UserCard/       # Avatar + texto + badges
│   ├── StatCard/       # Número + descripción + icon
│   ├── ProductCard/    # Imagen + título + precio + botón
│   └── ArticleCard/    # Imagen + título + excerpt + fecha
├── navigation/         # 🔹 Navegación compuesta
│   ├── NavigationItem/ # Link + icon + badge (opcional)
│   ├── Breadcrumb/     # Enlaces concatenados con separadores
│   ├── TabGroup/       # Múltiples botones de tab
│   └── MenuItem/       # Icon + texto + shortcut
├── feedback/           # 🔹 Comunicación y estados
│   ├── AlertMessage/   # Icon + título + descripción + botones
│   ├── ProgressCard/   # Progress + texto + porcentaje
│   ├── NotificationToast/ # Icon + mensaje + botón cerrar
│   └── EmptyState/     # Icon + título + descripción + acción
├── media/              # 🔹 Contenido multimedia
│   ├── ImageCard/      # Image + título + descripción
│   ├── VideoPlayer/    # Video + controles + información
│   └── GalleryItem/    # Imagen + overlay + acciones
└── display/            # 🔹 Presentación de información
    ├── UnorderedList/  # ✅ Ya existe - Lista estructurada con ListItems
    ├── InfoSection/    # ✅ Ya existe - Título + descripción + datos
    ├── HeaderSection/  # Título + subtítulo + acciones
    └── DataRow/        # Label + valor + acciones opcionales
```

## Template Base para Molecule

```tsx
import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';

// Importar TODOS los Atoms necesarios (Layout + Others)
import { Container } from '../../../atoms/layout/Container';
import { Grid } from '../../../atoms/layout/Grid';
import { GridAreas, GridAreasField } from '../../../atoms/layout/GridAreas';
import { Center } from '../../../atoms/layout/Center';
import { Divider, Separator } from '../../../atoms/layout/Divider';
import { Text } from '../../../atoms/display/Text';
import { Button } from '../../../atoms/forms/Button';
import { Input } from '../../../atoms/forms/Input';
import { Label } from '../../../atoms/forms/Label';
import { Avatar } from '../../../atoms/display/Avatar';
import { Badge } from '../../../atoms/feedback/Badge';
import { Icon } from '../../../atoms/display/Icon';
// ... importar otros Atoms según necesidad

interface MoleculeNameProps<T extends Record<string, any> = any>
  extends BaseProps {
  // Sistema de esquemas de color con theme.css
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';

  $size?: 'default' | 'sm' | 'lg';
  $variant?: 'default' | 'compact' | 'detailed';
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Props específicas del molecule
  // ... props específicas

  // Callbacks
  onClick?: () => void;
  onChange?: (value: any) => void;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border',
    text: 'text-card-foreground',
    // ... otros elementos
  },
  secondary: {
    container: 'bg-secondary/10 border-secondary/20',
    text: 'text-secondary',
    // ... otros elementos
  },
  // ... otros esquemas
};

const moleculeVariants = {
  base: 'relative rounded-md border shadow-sm transition-all duration-200',
  variants: {
    size: {
      default: 'p-4',
      sm: 'p-3',
      lg: 'p-6',
    },
    variant: {
      default: '',
      compact: 'space-y-2',
      detailed: 'space-y-4',
    },
  },
  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const MoleculeName = React.forwardRef<HTMLDivElement, MoleculeNameProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      storeKey,
      // ... otras props
      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    return (
      <Container
        ref={ref}
        className={cn(
          moleculeVariants.base,
          currentColorScheme.container,
          moleculeVariants.variants.size[$size],
          moleculeVariants.variants.variant[$variant],
          className,
          $custom
        )}
        {...props}>
        {/* Ejemplo: Layout con Grid si es necesario */}
        <Grid $columns={2} $gap="gap-4" className="w-full">
          <Container>
            <Text $colorScheme={$colorScheme}>Contenido izquierdo</Text>
          </Container>

          <Container>
            <Text $colorScheme={$colorScheme}>Contenido derecho</Text>
          </Container>
        </Grid>

        {/* Separador si es necesario */}
        <Separator $orientation="horizontal" />

        {/* Más Atoms combinados según funcionalidad */}
        <Container $display="flex" $gap="gap-2" $alignItems="center">
          <Avatar $size="sm" />
          <Text $size="sm">Usuario</Text>
          <Badge $colorScheme={$colorScheme}>Status</Badge>
        </Container>
      </Container>
    );
  }
);

MoleculeName.displayName = 'MoleculeName';

export { MoleculeName, type MoleculeNameProps };
```

## Stories Template

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MoleculeName } from './MoleculeName';
import { useMoleculeExamples } from '../../../../stores/moleculeExamples.store';

const meta: Meta<typeof MoleculeName> = {
  title: 'Molecules/MoleculeName',
  component: MoleculeName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MoleculeName $store={useMoleculeExamples} storeKey="defaultExample" />
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <MoleculeName $variant="default" />
      <MoleculeName $variant="compact" />
      <MoleculeName $variant="detailed" />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <MoleculeName $colorScheme="default" />
      <MoleculeName $colorScheme="secondary" />
      <MoleculeName $colorScheme="accent" />
      <MoleculeName $colorScheme="destructive" />
    </div>
  ),
};
```

## Principios para Molecules (Actualizado)

1. **Combinar 2+ Atoms** - Nunca crear un Molecule de un solo Atom
2. **Incluir Layout Atoms** - Container es obligatorio, usar Grid/GridAreas/Center/Divider según necesidad
3. **Función específica** - Cada Molecule debe tener un propósito claro y autónomo
4. **Completamente autónomos** - Todos los Atoms necesarios incluidos internamente
5. **Reutilizable** - Debe ser útil en múltiples contextos sin dependencias externas
6. **Props cohesivas** - Las props deben trabajar juntas lógicamente
7. **Delegar a Atoms** - Pasar funcionalidad específica a los Atoms correspondientes
8. **Store integration** - Seguir el patrón storeKey establecido
9. **Color schemes** - Usar el sistema de tema establecido y propagarlo a Atoms
10. **Layout flexibility** - Usar Grid/GridAreas para layouts complejos, Container para simples

## ⚡ Focus Ring Patterns (OBLIGATORIO para elementos interactivos)

### **Patrón Base para Focus Ring**

TODOS los elementos interactivos (button, input, select, etc.) en Molecules deben seguir este patrón exacto:

```tsx
// 1. Base obligatorio en variants
const moleculeVariants = {
  // Base con focus-visible estándar
  interactiveBase:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

  // Otros variants...
};

// 2. ColorSchemes con focus específico
const colorSchemes = {
  default: {
    container: 'bg-card border-border',
    text: 'text-card-foreground',
    focus: 'focus-visible:ring-ring/20', // ← /20 para mejor color
    activeRing: 'ring-2 ring-ring/20 ring-offset-2', // Para estados activos
  },
  primary: {
    container: 'bg-primary/10 border-primary/20',
    text: 'text-primary',
    focus: 'focus-visible:ring-primary/20', // ← /20 obligatorio
    activeRing: 'ring-2 ring-primary/20 ring-offset-2',
  },
  secondary: {
    container: 'bg-secondary/10 border-secondary/20',
    text: 'text-secondary',
    focus: 'focus-visible:ring-secondary/20', // ← /20 obligatorio
    activeRing: 'ring-2 ring-secondary/20 ring-offset-2',
  },
  // ... otros esquemas siguiendo el mismo patrón
};

// 3. Aplicación correcta en className
const interactiveClasses = cn(
  moleculeVariants.interactiveBase, // ← Base primero
  currentColorScheme.focus // ← ColorScheme sobrescribe
  // Otras clases...
);
```

### **Focus Ring Rules (NO negociables)**

✅ **Base Pattern**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
✅ **ColorScheme Override**: `focus-visible:ring-{color}/20` (con `/20` obligatorio)
✅ **Order**: Base primero, luego colorScheme para sobrescribir
✅ **Active State**: `ring-2 ring-{color}/20 ring-offset-2` (sin `focus-visible:`)
✅ **Consistency**: Idéntico a Button, Input, Dropdown, TabGroup

❌ **NO usar**: `focus:`, `focus-within:`, rings sin `/20`, borders como focus
❌ **NO hardcodear**: `ring-primary`, `ring-blue-500`, colores fijos
❌ **NO omitir**: `ring-offset-2`, `outline-none`

### **Ejemplo Completo en Molecule**

```tsx
// SearchBox con Input + Button
const SearchBox = ({ $colorScheme = 'default', ...props }) => {
  const currentColorScheme = colorSchemes[$colorScheme];

  return (
    <Container className="flex gap-2">
      {/* Input usa su propio focus ring automáticamente */}
      <Input $colorScheme={$colorScheme} placeholder="Buscar..." />

      {/* Button personalizado necesita focus ring manual */}
      <button
        className={cn(
          'px-3 py-2 rounded-md transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', // ← Base
          currentColorScheme.focus, // ← Override del colorScheme
          currentColorScheme.container
        )}>
        <Icon name="search" />
      </button>
    </Container>
  );
};
```

### **Estados de Focus Ring**

1. **Normal**: Sin ring visible
2. **Focus**: `focus-visible:ring-{color}/20` con transparencia
3. **Active/Selected**: `ring-{color}/20` permanente (sin `focus-visible:`)
4. **Hover**: Solo background/text, NO ring

### **Propagación a Atoms**

Los Atoms (Button, Input, etc.) ya manejan el focus ring automáticamente.
Solo aplicar manualmente en elementos HTML nativos (`button`, `div[role="button"]`, etc.).

```tsx
// ✅ CORRECTO - Atom maneja focus automáticamente
<Button $colorScheme={$colorScheme}>Click me</Button>

// ✅ CORRECTO - Elemento nativo necesita focus manual
<button className={cn(baseRing, currentColorScheme.focus)}>
  Custom button
</button>

// ❌ INCORRECTO - Sobrescribir focus de Atom
<Button className="focus:ring-blue-500">Broken pattern</Button>
```

## Atoms de Layout Disponibles para Molecules

### **Container** (Obligatorio en todos los Molecules)

- Layout básico, flexbox, spacing, colores
- Contenedor principal de cada Molecule

### **Grid** (Para layouts de columnas/filas)

```tsx
<Grid $columns={2} $gap="gap-4" $responsive>
  <Container>Columna 1</Container>
  <Container>Columna 2</Container>
</Grid>
```

### **GridAreas** (Para layouts complejos con áreas nombradas)

```tsx
<GridAreas $areas="header header / sidebar content / footer footer">
  <GridAreasField $area="header">Header content</GridAreasField>
  <GridAreasField $area="sidebar">Sidebar content</GridAreasField>
  <GridAreasField $area="content">Main content</GridAreasField>
  <GridAreasField $area="footer">Footer content</GridAreasField>
</GridAreas>
```

### **Center** (Para centrado perfecto)

```tsx
<Center $direction="both">
  <Button>Centered button</Button>
</Center>
```

### **Divider/Separator** (Para separaciones visuales)

```tsx
<Separator $orientation="horizontal" $colorScheme="muted" />
<Divider $variant="dashed" $spacing="lg" />
```

