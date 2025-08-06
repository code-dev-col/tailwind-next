---
applyTo: '**'
---


# Tailwind Next Library - Development Instructions

---

## 📋 Contexto del Proyecto

### Stack Técnico

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui patterns
- **Build**: tsup (ESM/CJS/DTS)
- **Documentation**: Storybook v8.6.14
- **Architecture**: Atomic Design Pattern

### Arquitectura Atomic Design

```
src/
├── components/
│   ├── atoms/           # Elementos básicos (Button, Input, Icon)
│   ├── molecules/       # Combinación de atoms (SearchBox, FormField)
│   ├── organisms/       # Grupos complejos (Header, Navigation, Form)
│   └── templates/       # Layout structures
├── utils/              # Utilidades y helpers
├── types.ts           # Tipos globales
└── index.ts          # Exports principales
```

## 🎨 Sistema de Gradientes

### Prioridad Visual

1. **Gradientes** (40+ predefinidos por categorías)
2. Colores sólidos (como fallback)

### Categorías de Gradientes

- `sunset`: Cálidos naranjas/rojos
- `ocean`: Azules/turquesas
- `forest`: Verdes naturales
- `cosmic`: Púrpuras/magentas
- `minimal`: Grises/neutros
- `vibrant`: Colores intensos

## 🏗️ Patrones de Desarrollo Obligatorios

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
  base: "base-classes-here",
  variants: {
    variant: {
      primary: "variant-classes",
      secondary: "variant-classes"
    },
    size: {
      sm: "size-classes",
      md: "size-classes",
      lg: "size-classes"
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
};

const ComponentName = React.forwardRef<
  HTMLElement,
  ComponentNameProps
>(({ className, $variant, $size, $custom, ...props }, ref) => {
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
});

ComponentName.displayName = "ComponentName";

export { ComponentName, type ComponentNameProps };
```

### 3. Box Shadow por Defecto

- Todos los elementos interactivos deben tener `shadow-sm` por defecto
- Hover states pueden usar `shadow-md`
- Focus states usan `shadow-lg`

### 4. Sistema de Props con $

- **¿Por qué?**: Evita conflictos con atributos HTML nativos
- **Uso**: `$variant`, `$size`, `$custom`, `$gradient`
- **Nunca**: `variant`, `size` (sin $)

## 📚 Storybook Stories Obligatorias

### Template de Story

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

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

// Stories obligatorias:
export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      {/* Render all variants */}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      {/* Render all sizes */}
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {/* Render gradient examples */}
    </div>
  ),
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
- [ ] Exporta tipos e interfaces
- [ ] Incluye todas las stories obligatorias en Storybook
- [ ] Categorizado correctamente en Atomic Design
- [ ] Utiliza `cn()` para merge de clases
- [ ] Incluye `displayName` para debugging

### Para Stories:

- [ ] Title correcto según jerarquía atómica
- [ ] Story `Default` básica
- [ ] Story `Variants` mostrando todas las variantes
- [ ] Story `Sizes` mostrando todos los tamaños
- [ ] Story `WithGradients` demostrando gradientes
- [ ] Parámetros `layout: 'centered'` y `tags: ['autodocs']`

### Antes de Commit:

- [ ] `npm run build` ejecuta sin errores
- [ ] `npm run storybook` muestra componente correctamente
- [ ] Todas las props están tipadas
- [ ] Componente exportado en `src/index.ts`
- [ ] No hay console.logs o código de debug

## 🚫 Reglas Prohibidas

1. **NO** usar props sin `$` para variantes de estilo
2. **NO** hardcodear colores, usar gradientes primero
3. **NO** crear componentes fuera de la estructura Atomic Design
4. **NO** omitir box-shadow en elementos interactivos
5. **NO** olvidar `forwardRef` en componentes que lo requieran
6. **NO** usar `className` para variantes, usar props específicas

## 🔄 Flujo de Desarrollo

1. **Planificar**: Identificar nivel atómico (atom/molecule/organism)
2. **Crear**: Usar template de componente estándar
3. **Estilar**: Gradientes primero, shadows por defecto
4. **Documentar**: Crear todas las stories obligatorias
5. **Probar**: Build + Storybook funcionando
6. **Exportar**: Añadir al index.ts principal

## 📝 Notas Importantes

- **Gradientes sobre colores**: Siempre priorizar gradientes para mejor UX
- **Compatibilidad**: Tailwind v4 con HSL para shadcn/ui compatibility
- **Performance**: tsup optimiza el bundle automáticamente
- **Accesibilidad**: Contrastar gradientes para WCAG compliance
- **Consistencia**: Estos patrones son **obligatorios** para todos los componentes

---

**Estas instrucciones son mandatorias y no negociables para mantener la coherencia del sistema de diseño.**
