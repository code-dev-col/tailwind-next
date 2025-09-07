---
applyTo: '**'
---

# @code-dev-col/tailwind-next - Development Instructions

**Instrucciones de desarrollo obligatorias para mantener la coherencia, escalabilidad y calidad del sistema de diseño.**

---

## 📋 Contexto del Proyecto

### Stack Técnico Actualizado

- **Framework**: React 18+ con hooks modernos
- **Styling**: Tailwind CSS v4 con patrón `@theme` + shadcn/ui compatibility
- **Build**: tsup optimizado (ESM/CJS/DTS)
- **Documentation**: Storybook v8.6.14 con auto-docs
- **Architecture**: Atomic Design Pattern estricto
- **State**: Zustand con patrón storeKey
- **Security**: Sanitización automática integrada
- **Icons**: react-icons v5.5.0
- **TypeScript**: v5+ con tipado estricto

### Arquitectura Atomic Design (Obligatoria)

```text
src/
├── components/
│   ├── atoms/              # ✅ 18+ componentes básicos
│   │   ├── Button/         # Interacciones primarias
│   │   ├── Input/          # Campos de texto + seguridad
│   │   ├── CheckBox/       # Estados + grupos
│   │   ├── Dropdown/       # Selección + búsqueda
│   │   ├── Badge/          # Etiquetas + estados
│   │   ├── Avatar/         # Perfiles + fallbacks
│   │   ├── Container/      # Layout flexible
│   │   ├── Grid/           # Sistema de grillas
│   │   └── ...
│   ├── molecules/          # 🔄 Futuro: Combinaciones
│   ├── organisms/          # 🔄 Futuro: Grupos complejos
│   └── templates/          # 🔄 Futuro: Layouts
├── utils/                  # Utilidades esenciales
│   ├── cn.ts              # Merge de clases (clsx + tailwind-merge)
│   ├── gradients.ts       # 40+ gradientes por categorías
│   └── useSecureField.ts  # Hook de seguridad
├── stores/                 # Gestión de estado
│   ├── example.ts         # Registro global de stores
│   ├── inputExamples.store.ts
│   ├── dropdownExamples.store.ts
│   └── ...
├── styles/                 # CSS del sistema
│   ├── global.css         # Estilos para Storybook/desarrollo
│   └── theme.css          # Tokens distribuibles con @theme
├── types.ts               # Tipos globales
└── index.ts              # Exportaciones públicas
```

## 🎨 Sistema CSS con Tailwind v4

### Arquitectura de tokens con @theme

```css
/* theme.css - Tokens distribuibles */
@theme {
  /* Colores principales con HSL completo para generar clases automáticamente */
  --color-primary: hsl(250 70% 60%); /* → bg-primary, text-primary, etc. */
  --color-secondary: hsl(
    195 60% 55%
  ); /* → bg-secondary, text-secondary, etc. */
  --color-destructive: hsl(
    358 65% 58%
  ); /* → bg-destructive, border-destructive, etc. */
  --color-accent: hsl(275 55% 65%); /* → bg-accent, text-accent, etc. */

  /* Radii para clases rounded-* */
  --radius-xs: 2px; /* → rounded-xs */
  --radius-sm: 4px; /* → rounded-sm */
  --radius-md: 6px; /* → rounded-md (default) */
  --radius-lg: 8px; /* → rounded-lg */
}

/* Compatibilidad con shadcn/ui (HSL sin hsl()) */
:root {
  --primary: 250 70% 60%;
  --secondary: 195 60% 55%;
  /* ... */
}
```

### Paleta pastel obligatoria

**Colores base (Light Mode)**:

- `--color-primary`: `hsl(250 70% 60%)` - Indigo-lavanda suave
- `--color-secondary`: `hsl(195 60% 55%)` - Azul turquesa pastel
- `--color-destructive`: `hsl(358 65% 58%)` - Rojo coral suave
- `--color-accent`: `hsl(275 55% 65%)` - Violeta rosado claro

**Beneficios**:

- ✅ Contraste WCAG AA/AAA automático
- ✅ Armonía visual entre componentes
- ✅ Legibilidad en light/dark modes
- ✅ Gradientes coherentes

## � Sistema de Gradientes y Utilidades

### Prioridad Visual

1. **Gradientes** (40+ predefinidos por categorías)
2. Colores sólidos (como fallback)
3. Variables CSS personalizadas

### Categorías de Gradientes

- `sunset`: Cálidos naranjas/rojos
- `ocean`: Azules/turquesas
- `forest`: Verdes naturales
- `cosmic`: Púrpuras/magentas
- `minimal`: Grises/neutros
- `vibrant`: Colores intensos

## 🎨 Sistema de Esquemas de Color Obligatorio

### Colores Disponibles en theme.css

**Todos los componentes DEBEN usar únicamente estos colores del tema:**

- `primary`: Indigo-lavanda (hsl(245 65% 65%)) - Color principal del sistema
- `secondary`: Turquesa pastel (hsl(195 60% 55%)) - Color secundario obligatorio
- `destructive`: Coral suave (hsl(358 65% 58%)) - Errores y acciones destructivas
- `accent`: Violeta rosado (hsl(270 50% 75%)) - Acentos y destacados
- `muted`: Grises neutros - Elementos secundarios y backgrounds
- `card`: Fondos de tarjetas y contenedores
- `border`: Bordes y divisores
- `foreground`: Texto principal

### Esquemas de Color Permitidos

**TODOS los componentes con prop `$colorScheme` deben incluir:**

1. **`default`**: Usa colores neutros (`card`, `muted`) - esquema base para fondos sutiles
2. **`primary`**: Usa `primary` + texto blanco - color principal vibrante del sistema
3. **`secondary`**: Usa `secondary` + texto blanco - turquesa pastel complementario
4. **`destructive`**: Usa `destructive` + texto blanco - errores y acciones críticas
5. **`accent`**: Usa `accent` + texto blanco - acentos y elementos destacados
6. **`muted`**: Solo grises neutros para fondos y elementos secundarios
7. **`minimal`**: Transparente + `foreground` - estilo minimalista sin fondo
8. **`custom`**: Vacío para personalización externa completa

### Arquitectura de ColorSchemes Obligatoria

**TODOS los componentes DEBEN implementar el objeto `colorSchemes` con las siguientes propiedades mínimas:**

```typescript
const colorSchemes = {
  default: {
    base: 'bg-card border-border', // Fondo neutro + borde sutil
    text: 'text-card-foreground', // Texto principal
    hover: 'hover:bg-muted/50', // Estado hover ligero
    focus: 'focus:ring-ring/20', // Estado focus
  },
  primary: {
    base: 'bg-primary border-primary', // Fondo primary sólido
    text: 'text-white', // ← OBLIGATORIO: Texto blanco para contraste
    hover: 'hover:bg-primary/80', // Hover más oscuro
    focus: 'focus:ring-primary/20', // Focus ring primary
  },
  secondary: {
    base: 'bg-secondary border-secondary', // Fondo secondary sólido
    text: 'text-white', // ← OBLIGATORIO: Texto blanco para contraste
    hover: 'hover:bg-secondary/80', // Hover más oscuro
    focus: 'focus:ring-secondary/20', // Focus ring secondary
  },
  destructive: {
    base: 'bg-destructive border-destructive', // Fondo destructive sólido
    text: 'text-white', // ← OBLIGATORIO: Texto blanco para contraste
    hover: 'hover:bg-destructive/80', // Hover más oscuro
    focus: 'focus:ring-destructive/20', // Focus ring destructive
  },
  accent: {
    base: 'bg-accent border-accent', // Fondo accent sólido
    text: 'text-white', // ← OBLIGATORIO: Texto blanco para contraste
    hover: 'hover:bg-accent/80', // Hover más oscuro
    focus: 'focus:ring-accent/20', // Focus ring accent
  },
  muted: {
    base: 'bg-muted border-muted', // Fondo muted sutil
    text: 'text-muted-foreground', // Texto muted para legibilidad
    hover: 'hover:bg-muted/80', // Hover más prominente
    focus: 'focus:ring-muted/20', // Focus ring muted
  },
  minimal: {
    base: 'bg-transparent border-transparent', // Sin fondo ni borde
    text: 'text-foreground/70', // Texto sutil transparente
    hover: 'hover:bg-foreground/10', // Hover muy ligero
    focus: 'focus:ring-foreground/20', // Focus ring foreground
  },
  custom: {
    base: '', // Vacío para personalización externa
    text: '', // Vacío para personalización externa
    hover: '', // Vacío para personalización externa
    focus: '', // Vacío para personalización externa
  },
};
```

### Propiedades Adicionales por Tipo de Componente

**Para componentes con contadores (Badge, Chip):**

```typescript
// Agregar propiedad counter en cada esquema
primary: {
  base: 'bg-primary border-primary',
  text: 'text-white',
  hover: 'hover:bg-primary/80',
  focus: 'focus:ring-primary/20',
  counter: 'bg-primary text-white',  // ← Contador con fondo sólido + texto blanco
},
```

**Para componentes con múltiples estados (Accordion, Dropdown):**

```typescript
// Agregar propiedades de estado específicas
default: {
  base: 'bg-card border-border',
  text: 'text-card-foreground',
  hover: 'hover:bg-muted/50',
  focus: 'focus:ring-ring/20',
  active: 'bg-primary/10 text-primary',     // Estado activo/seleccionado
  disabled: 'opacity-50',                   // Estado deshabilitado
  chevron: 'text-muted-foreground',         // Iconos y chevrons
},
```

**Para componentes de feedback (Tooltip, Badge):**

```typescript
// Agregar propiedades de presentación específicas
primary: {
  base: 'bg-primary border-primary',
  text: 'text-white',
  hover: 'hover:bg-primary/80',
  focus: 'focus:ring-primary/20',
  shadow: 'shadow-lg',                      // Sombra para destacar
  border: 'border-primary/30',              // Borde sutil del mismo color
},
```

### Escalas de Claridad Obligatorias

**Para cada color base, usar las siguientes escalas de transparencia:**

- `/5`: Fondo muy sutil (5% opacidad)
- `/10`: Fondo sutil (10% opacidad)
- `/15`: Fondo ligero (15% opacidad)
- `/20`: Bordes sutiles (20% opacidad)
- `/25`: Estados activos (25% opacidad)
- `/30`: Hover ligero (30% opacidad)
- `/50`: Hover medio (50% opacidad)
- `/70`: Texto secundario (70% opacidad)
- `/80`: Texto semi-prominente (80% opacidad)
- `/90`: Texto prominente (90% opacidad)

### Patrón de Implementación

```typescript
const colorSchemes = {
  default: {
    background: 'bg-card',
    text: 'text-card-foreground',
    textSecondary: 'text-muted-foreground',
    textMuted: 'text-muted-foreground/70',
    border: 'border-border',
    hover: 'hover:bg-muted/50',
    active: 'bg-primary/10 text-primary',
    chevron: 'text-muted-foreground',
  },
  secondary: {
    background: 'bg-secondary/10',
    text: 'text-secondary',
    textSecondary: 'text-secondary/90',
    textMuted: 'text-secondary/70',
    border: 'border-secondary/20',
    hover: 'hover:bg-secondary/15',
    active: 'bg-secondary/25 text-secondary',
    chevron: 'text-secondary/80',
  },
  // ... otros esquemas siguiendo el mismo patrón
};
```

### Aplicación de ColorSchemes en Componentes

**OBLIGATORIO: Usar la propiedad `text` explícitamente en el JSX:**

```typescript
// ✅ CORRECTO - Aplicar colorScheme.text explícitamente
const Button = ({ $colorScheme = 'default', ...props }) => {
  const currentColorScheme = colorSchemes[$colorScheme];

  return (
    <button
      className={cn(
        'base-button-classes',
        currentColorScheme.base, // Fondo y borde
        currentColorScheme.text, // ← OBLIGATORIO: Texto explícito
        currentColorScheme.hover, // Estados hover
        currentColorScheme.focus, // Estados focus
        className
      )}
      {...props}
    />
  );
};

// ❌ INCORRECTO - No aplicar texto explícito
const BadButton = ({ $colorScheme = 'default', ...props }) => {
  const currentColorScheme = colorSchemes[$colorScheme];

  return (
    <button
      className={cn(
        'base-button-classes',
        currentColorScheme.base, // Solo fondo, sin texto definido
        className // Texto será inconsistente
      )}
      {...props}
    />
  );
};
```

### Reglas de Contraste Obligatorias

**Para fondos sólidos (`primary`, `secondary`, `destructive`, `accent`):**

- ✅ **SIEMPRE** usar `text-white` para máximo contraste
- ✅ **SIEMPRE** usar fondo sólido sin transparencia para legibilidad
- ✅ **SIEMPRE** aplicar hover con `/80` para oscurecer el fondo

**Para fondos sutiles (`default`, `muted`):**

- ✅ **SIEMPRE** usar colores foreground apropiados (`text-card-foreground`, `text-muted-foreground`)
- ✅ **SIEMPRE** usar fondos con transparencia para sutileza
- ✅ **SIEMPRE** mantener contraste WCAG AA mínimo

**Para fondos transparentes (`minimal`):**

- ✅ **SIEMPRE** usar `text-foreground` con transparencia para sutileza
- ✅ **SIEMPRE** usar `bg-transparent` o `bg-foreground/5` máximo
- ✅ **SIEMPRE** aplicar hover muy ligero (`hover:bg-foreground/10`)

## 🏗️ Patrones de Desarrollo Obligatorios

### Stores de ejemplo para Storybook

Cada componente con estado debe tener su store de ejemplo:

```typescript
// stores/componentExamples.store.ts
export const useComponentExamples = create<ComponentExamplesState>((set) => ({
  // Estados para cada story
  defaultExample: '',
  variantExample: '',
  sizeExample: '',

  // Setters tipados
  setDefaultExample: (value: string) => set({ defaultExample: value }),
  setVariantExample: (value: string) => set({ variantExample: value }),
  setSizeExample: (value: string) => set({ sizeExample: value }),

  // Utilidad de limpieza
  clearAllComponent: () =>
    set({
      defaultExample: '',
      variantExample: '',
      sizeExample: '',
    }),
}));
```

## 🛡️ Seguridad Integrada

### Hook useSecureField (Obligatorio para inputs)

```typescript
interface SecurityOptions {
  level: 'form' | 'strict' | 'html' | 'none';
  showWarnings: boolean;
  sanitizeOnChange: boolean;
}

// Uso en componentes Input/TextArea
const {
  sanitizedValue,
  hasSecurityWarning,
  warningMessage,
  handleSecureChange,
} = useSecureField(value, securityOptions);
```

### Niveles de seguridad

- `form`: Sanitización básica para formularios
- `strict`: Solo texto plano, elimina HTML
- `html`: Permite HTML básico controlado
- `none`: Sin sanitización (usar con cuidado)

### 1. Interface Base para Props

```typescript
interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

interface ComponentProps extends BaseProps {
  $variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  $size?: 'default' | 'sm' | 'lg' | 'icon';
  $custom?: string; // Para clases adicionales de Tailwind
}
```

### 2. Estructura de Componente Estándar

```typescript
import React from 'react';
import { cn } from '../../utils/cn';
import type { BaseProps } from '../../types';

interface ComponentNameProps extends BaseProps {
  $variant?: 'primary' | 'secondary';
  $size?: 'sm' | 'md' | 'lg';
  $custom?: string;
}

const componentVariants = {
  base: 'base-classes-here',
  variants: {
    variant: {
      primary: 'variant-classes',
      secondary: 'variant-classes',
    },
    size: {
      sm: 'size-classes',
      md: 'size-classes',
      lg: 'size-classes',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
};

const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  ({ className, $variant, $size, $custom, ...props }, ref) => {
    return (
      <element
        className={cn(
          componentVariants.base,
          componentVariants.variants.variant[$variant || 'primary'],
          componentVariants.variants.size[$size || 'md'],
          className,
          $custom
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

ComponentName.displayName = 'ComponentName';

export { ComponentName, type ComponentNameProps };
```

### 4. Componentes con gestión de estado integrada

```typescript
// ✅ Patrón storeKey (preferido para nuevos componentes)
interface InputProps<T extends Record<string, any> = any> extends BaseProps {
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;
  $storeString?: string; // Legacy support
  $security?: 'form' | 'strict' | 'html' | 'none';
  $showSecurityWarnings?: boolean;
}

// Implementación con dual compatibility
const Input = <T extends Record<string, any> = any>({
  $store,
  storeKey,
  $storeString,
  $security = 'form',
  ...props
}: InputProps<T>) => {
  // storeKey pattern (nuevo)
  const storeValue =
    $store && storeKey ? $store((state) => state[storeKey]) : undefined;

  // Legacy pattern support
  const legacyStore = $storeString ? getZustandStore($storeString) : null;
  const legacyValue = legacyStore
    ? useStore(legacyStore, (state: any) => state.value)
    : undefined;

  const finalValue = storeValue ?? legacyValue ?? '';

  // Security integration
  const { sanitizedValue, hasSecurityWarning, handleSecureChange } =
    useSecureField(finalValue, { level: $security });

  return (
    <input value={sanitizedValue} onChange={handleSecureChange} {...props} />
  );
};
```

### 5. Exportaciones obligatorias

```typescript
// En cada componente/index.ts
export { ComponentName, type ComponentNameProps };

// En src/index.ts (mantener orden alfabético)
export {
  ComponentName,
  type ComponentNameProps,
} from './components/atoms/ComponentName';
```

## 📚 Storybook Stories Obligatorias

### Template de Story Actualizado

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';
import { useComponentExamples } from '../../../stores/componentExamples.store';

const meta: Meta<typeof ComponentName> = {
  title: 'Atoms/ComponentName', // Atoms/Molecules/Organisms
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ✅ Stories obligatorias con storeKey pattern:

export const Default: Story = {
  render: () => (
    <ComponentName $store={useComponentExamples} storeKey="defaultExample" />
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <ComponentName $variant="default" label="Default" />
      <ComponentName $variant="secondary" label="Secondary" />
      <ComponentName $variant="destructive" label="Destructive" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <ComponentName $size="sm" label="Small" />
      <ComponentName $size="default" label="Default" />
      <ComponentName $size="lg" label="Large" />
    </div>
  ),
};

export const WithStore: Story = {
  render: () => (
    <div className="space-y-4">
      <ComponentName
        $store={useComponentExamples}
        storeKey="storeExample"
        label="Con Store"
      />
      <p className="text-sm text-muted-foreground">
        Valor actual: {useComponentExamples((state) => state.storeExample)}
      </p>
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <ComponentName $custom="bg-gradient-to-r from-purple-500 to-pink-500" />
      <ComponentName $custom="bg-gradient-to-r from-blue-500 to-cyan-500" />
      <ComponentName $custom="bg-gradient-to-r from-green-500 to-emerald-500" />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold">Esquemas de Color theme.css</h4>

      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Default</h5>
          <div className="flex flex-wrap gap-2">
            <ComponentName $colorScheme="default">Default</ComponentName>
            <ComponentName $colorScheme="default" $size="sm">
              Small
            </ComponentName>
            <ComponentName $colorScheme="default" $size="lg">
              Large
            </ComponentName>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Primary</h5>
          <div className="flex flex-wrap gap-2">
            <ComponentName $colorScheme="primary">Primary</ComponentName>
            <ComponentName $colorScheme="primary" $size="sm">
              Small
            </ComponentName>
            <ComponentName $colorScheme="primary" $size="lg">
              Large
            </ComponentName>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Secondary</h5>
          <div className="flex flex-wrap gap-2">
            <ComponentName $colorScheme="secondary">Secondary</ComponentName>
            <ComponentName $colorScheme="secondary" $size="sm">
              Small
            </ComponentName>
            <ComponentName $colorScheme="secondary" $size="lg">
              Large
            </ComponentName>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Destructive
          </h5>
          <div className="flex flex-wrap gap-2">
            <ComponentName $colorScheme="destructive">
              Destructive
            </ComponentName>
            <ComponentName $colorScheme="destructive" $size="sm">
              Small
            </ComponentName>
            <ComponentName $colorScheme="destructive" $size="lg">
              Large
            </ComponentName>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Accent</h5>
          <div className="flex flex-wrap gap-2">
            <ComponentName $colorScheme="accent">Accent</ComponentName>
            <ComponentName $colorScheme="accent" $size="sm">
              Small
            </ComponentName>
            <ComponentName $colorScheme="accent" $size="lg">
              Large
            </ComponentName>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Muted</h5>
          <div className="flex flex-wrap gap-2">
            <ComponentName $colorScheme="muted">Muted</ComponentName>
            <ComponentName $colorScheme="muted" $size="sm">
              Small
            </ComponentName>
            <ComponentName $colorScheme="muted" $size="lg">
              Large
            </ComponentName>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Minimal</h5>
          <div className="flex flex-wrap gap-2">
            <ComponentName $colorScheme="minimal">Minimal</ComponentName>
            <ComponentName $colorScheme="minimal" $size="sm">
              Small
            </ComponentName>
            <ComponentName $colorScheme="minimal" $size="lg">
              Large
            </ComponentName>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Esquemas de color theme.css:</strong> Estos esquemas utilizan
          las variables CSS definidas en theme.css, proporcionando consistencia
          visual y soporte para modo oscuro automático.
        </p>
      </div>
    </div>
  ),
};
```

### Stories específicas para componentes con estado

```typescript
// Para Input, TextArea, CheckBox, etc.
export const WithSecurity: Story = {
  render: () => (
    <div className="space-y-4">
      <Input $security="form" placeholder="Seguridad básica" />
      <Input $security="strict" placeholder="Seguridad estricta" />
      <Input
        $security="form"
        $showSecurityWarnings
        placeholder="Con advertencias"
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const { clearAllComponent } = useComponentExamples();

    return (
      <div className="space-y-4">
        <ComponentName
          $store={useComponentExamples}
          storeKey="interactiveExample"
        />
        <button
          onClick={clearAllComponent}
          className="px-3 py-1 bg-gray-200 rounded text-sm">
          Clear All
        </button>
      </div>
    );
  },
};
```

## 🎨 Utilización de Gradientes

### Importación

```typescript
import {
  gradients,
  useGradient,
  getComponentGradient,
} from '../utils/gradients';
```

### Patrones de Uso

```typescript
// En componentes
const gradientClass = getComponentGradient('button', 'sunset-warm');

// Con hook
const { getGradient, getRandomGradient } = useGradient();
const gradient = getGradient('ocean-deep');
```

### CSS Variables (Tailwind v4)

```css
@theme {
  --color-primary: 210 40% 50%;
  --color-secondary: 215 20% 65%;
  /* Usar HSL para compatibilidad con shadcn/ui */
}
```

## ✅ Checklist de Desarrollo

### Para Cada Componente:

- [ ] Sigue la estructura base de props con `$` prefix
- [ ] Implementa `forwardRef` correctamente
- [ ] Incluye `shadow-sm` por defecto en elementos interactivos
- [ ] Soporta gradientes a través de `$custom` o props específicas
- [ ] **Implementa objeto `colorSchemes` con 8 esquemas obligatorios** (default, primary, secondary, destructive, accent, muted, minimal, custom)
- [ ] **Aplica propiedad `text` explícitamente en el JSX**
- [ ] **Usa `text-white` en esquemas de fondo sólido** (primary, secondary, destructive, accent)
- [ ] **Mantiene contraste WCAG AA en todos los esquemas**
- [ ] Exporta tipos e interfaces
- [ ] Incluye todas las stories obligatorias en Storybook
- [ ] Categorizado correctamente en Atomic Design
- [ ] Utiliza `cn()` para merge de clases
- [ ] Incluye `displayName` para debugging
- [ ] Integra security hooks cuando sea necesario (Input, TextArea)
- [ ] Store de ejemplo configurado si maneja estado

### Para Stories:

- [ ] Title correcto según jerarquía atómica
- [ ] Story `Default` básica
- [ ] Story `Variants` mostrando todas las variantes
- [ ] Story `Sizes` mostrando todos los tamaños
- [ ] **Story `ColorSchemes` mostrando todos los 8 esquemas** (default, primary, secondary, destructive, accent, muted, minimal)
- [ ] Story `WithGradients` demostrando gradientes
- [ ] Story `WithStore` si usa Zustand
- [ ] Story `WithSecurity` para componentes con validación
- [ ] Story `Interactive` para casos complejos
- [ ] Parámetros `layout: 'centered'` y `tags: ['autodocs']`

### Para Stores de Ejemplo:

- [ ] Archivo `stores/componentExamples.store.ts` creado
- [ ] Estados para cada variante de story
- [ ] Setters tipados para cada estado
- [ ] Función `clearAllComponent` implementada
- [ ] Exportado correctamente en el store registry

### Para Arquitectura:

- [ ] Componente ubicado en carpeta correcta (atoms/molecules/organisms)
- [ ] CSS tokens utilizan `@theme` pattern de Tailwind v4
- [ ] Paleta pastel respetada para colores principales
- [ ] Gradientes priorizados sobre colores sólidos
- [ ] Compatibilidad con shadcn/ui mantenida

### Antes de Commit:

- [ ] `npm run build` ejecuta sin errores
- [ ] `npm run storybook` muestra componente correctamente
- [ ] Todas las props están tipadas
- [ ] Componente exportado en `src/index.ts`
- [ ] Store de ejemplo registrado si aplica
- [ ] No hay console.logs o código de debug
- [ ] Tests de seguridad pasan (si aplica)
- [ ] Gradientes funcionan correctamente

## 🚫 Reglas Prohibidas

1. **NO** usar props sin `$` para variantes de estilo
2. **NO** hardcodear colores, usar gradientes primero
3. **NO** crear componentes fuera de la estructura Atomic Design
4. **NO** omitir box-shadow en elementos interactivos
5. **NO** olvidar `forwardRef` en componentes que lo requieran
6. **NO** usar `className` para variantes, usar props específicas
7. **NO** ignorar la seguridad en inputs (siempre usar `useSecureField`)
8. **NO** crear stores sin seguir el patrón storeKey
9. **NO** omitir stories obligatorias en Storybook
10. **NO** usar colores que no estén en la paleta pastel definida
11. **NO** crear CSS custom fuera del sistema de tokens `@theme`
12. **NO** olvidar el prefijo `use` en hooks personalizados
13. **NO** omitir el esquema `primary` en componentes con `$colorScheme`
14. **NO** aplicar colores de texto sin usar la propiedad `text` del colorScheme
15. **NO** usar fondos sólidos sin texto blanco para contraste

## 🔄 Flujo de Desarrollo

1. **Planificar**: Identificar nivel atómico (atom/molecule/organism)
2. **Crear**: Usar template de componente estándar
3. **Estilar**: Gradientes primero, shadows por defecto, tokens `@theme`
4. **Estado**: Configurar store de ejemplo si es necesario
5. **Seguridad**: Integrar `useSecureField` en inputs
6. **Documentar**: Crear todas las stories obligatorias
7. **Probar**: Build + Storybook funcionando
8. **Exportar**: Añadir al index.ts principal y registry de stores

## 📝 Notas Importantes

- **Gradientes sobre colores**: Siempre priorizar gradientes para mejor UX
- **Compatibilidad**: Tailwind v4 con HSL para shadcn/ui compatibility
- **Performance**: tsup optimiza el bundle automáticamente
- **Accesibilidad**: Contrastar gradientes para WCAG compliance
- **Consistencia**: Estos patrones son **obligatorios** para todos los componentes
- **Seguridad**: Validación automática integrada en todos los inputs
- **Estado**: Patrón storeKey para mejor DX y tipado
- **Escalabilidad**: Atomic Design estricto para crecimiento controlado
- **ColorSchemes**: Todos los componentes deben implementar los 8 esquemas obligatorios
- **Contraste**: Texto blanco obligatorio en fondos sólidos (primary, secondary, destructive, accent)
- **Texto Explícito**: Siempre aplicar la propiedad `text` del colorScheme en el JSX

## 📄 Documentación

- **Archivos MD**: Todos los archivos de documentación en formato Markdown deben ser creados en el directorio `agent_docs/` para mantener la organización y facilitar el acceso a templates, guías y referencias técnicas

---

**Estas instrucciones son mandatorias y no negociables para mantener la coherencia del sistema de diseño.**
