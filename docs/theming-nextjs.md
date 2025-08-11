# Theming y Personalización en Next.js

## Guía completa para personalizar @code-dev-col/tailwind-next en proyectos Next.js

Esta guía explica cómo integrar la librería **@code-dev-col/tailwind-next** en un proyecto **Next.js (App Router o Pages)** y personalizar colores, gradientes y temas (light/dark + multi brand) usando **Tailwind CSS v4** con el patrón `@theme` y **CSS Custom Properties**.

---

## 📋 Configuración Inicial

### 1. Instalación

```bash
npm install @code-dev-col/tailwind-next
# o
yarn add @code-dev-col/tailwind-next
# o
pnpm add @code-dev-col/tailwind-next
```

### 2. Configuración de Tailwind CSS v4

#### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Incluir componentes de la biblioteca
    './node_modules/@code-dev-col/tailwind-next/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Extender el tema base de la biblioteca
    },
  },
  plugins: [],
};
```

### 3. Archivo CSS Principal

#### styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Importar tokens de la biblioteca */
@import '@code-dev-col/tailwind-next/theme.css';

/* Tu personalización aquí */
@theme {
  /* Sobrescribir tokens de la biblioteca */
  --color-primary: hsl(280 65% 60%); /* Tu color principal */
  --color-secondary: hsl(200 55% 50%); /* Tu color secundario */
  --color-accent: hsl(45 70% 65%); /* Tu color de acento */
  --color-destructive: hsl(5 75% 58%); /* Tu color destructivo */

  /* Radii personalizados */
  --radius-xs: 1px;
  --radius-sm: 3px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Tipografía personalizada */
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --font-family-mono: 'Fira Code', monospace;
}

/* Compatibilidad con shadcn/ui */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 280 65% 60%; /* Coincide con --color-primary */
  --primary-foreground: 210 40% 98%;
  --secondary: 200 55% 50%; /* Coincide con --color-secondary */
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 45 70% 65%; /* Coincide con --color-accent */
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 5 75% 58%; /* Coincide con --color-destructive */
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 280 65% 60%;
  --radius: 0.5rem;
}

/* Dark mode personalizado */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 280 65% 70%; /* Más claro en dark mode */
  --primary-foreground: 222.2 84% 4.9%;
  --secondary: 200 55% 60%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 45 70% 75%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 5 75% 68%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 280 65% 70%;
}
```

---

## 3. Arquitectura de tokens con @theme (Tailwind v4)

### 3.1. ¿Cómo funciona @theme?

La librería utiliza el nuevo patrón `@theme` de Tailwind CSS v4 que automáticamente:

1. **Genera clases utilitarias**: De `--color-primary: hsl(250 70% 60%)` se crean automáticamente `bg-primary`, `text-primary`, `border-primary`, etc.
2. **Crea variables CSS**: También expone `var(--color-primary)` para uso en CSS custom
3. **Mantiene compatibilidad**: Con shadcn/ui usando variables HSL sin `hsl()`

### 3.2. Tokens principales disponibles

La librería expone estos namespaces principales:

#### Colores semánticos (`--color-*`)

```css
@theme {
  /* Colores base */
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(228 30% 10%);
  --color-muted: hsl(220 40% 97%);
  --color-muted-foreground: hsl(225 15% 42%);

  /* Colores de interacción */
  --color-primary: hsl(250 70% 60%); /* Indigo-lavanda */
  --color-primary-foreground: hsl(0 0% 100%);
  --color-secondary: hsl(195 60% 55%); /* Azul turquesa */
  --color-destructive: hsl(358 65% 58%); /* Rojo coral */
  --color-accent: hsl(275 55% 65%); /* Violeta rosado */

  /* UI */
  --color-border: hsl(220 25% 88%);
  --color-input: hsl(220 25% 92%);
  --color-ring: hsl(250 70% 66%); /* Focus ring */
}
```

#### Radii (`--radius-*`)

```css
@theme {
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 6px; /* Por defecto */
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;
}
```

### 3.3. Clases generadas automáticamente

Con los tokens definidos arriba, Tailwind genera automáticamente:

- **Backgrounds**: `bg-primary`, `bg-secondary`, `bg-destructive`, etc.
- **Text**: `text-primary`, `text-muted-foreground`, etc.
- **Borders**: `border-primary`, `border-input`, etc.
- **Ring**: `ring-primary`, `focus-visible:ring-ring`, etc.
- **Rounded**: `rounded-md`, `rounded-lg`, etc.

### 3.4. Paleta de colores pastel

La librería implementa una **paleta pastel suave** optimizada para:

- ✅ Contraste WCAG AA/AAA
- ✅ Legibilidad en light/dark mode
- ✅ Coherencia visual entre componentes
- ✅ Gradientes armoniosos

---

## 4. Modo Oscuro con next-themes

### 4.1. Instalación y configuración

```bash
pnpm add next-themes
```

`app/providers.tsx`:

```tsx
'use client';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}>
      {children}
    </ThemeProvider>
  );
}
```

Actualizar `app/layout.tsx`:

```tsx
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 4.2. Toggle de tema

```tsx
'use client';
import { useTheme } from 'next-themes';
import { Button } from '@code-dev-col/tailwind-next';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      $variant="ghost"
      $size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  );
}
```

### 4.3. Personalizar tokens para modo oscuro

En tu `globals.css`, la librería ya incluye tokens para dark mode que puedes sobrescribir:

````css
:root.dark {
  /* Personalizar colores para modo oscuro */
  --background: 222 47% 8%;          /* Fondo más suave */
  --foreground: 210 40% 95%;         /* Texto más contrastado */
  --primary: 220 90% 70%;            /* Primary más brillante */
  --secondary: 200 65% 60%;          /* Secondary ajustado */

  /* Gradientes para modo oscuro */
  --gradient-primary: linear-gradient(
    90deg,
    hsl(220 90% 65%) 0%,
    hsl(200 65% 60%) 60%,
    hsl(280 70% 65%) 100%
  );
}

---

## 5. Multi Brand / Theming Dinámico

### 5.1. Definir temas de marca

Crea temas de marca usando atributos o clases con variables específicas:

```css
/* En tu globals.css */
[data-brand='corporate'] {
  /* Tema corporativo - azul profesional */
  --primary: 214 95% 52%;
  --secondary: 214 50% 75%;
  --accent: 214 70% 35%;

  --gradient-primary: linear-gradient(
    90deg,
    hsl(214 95% 52%) 0%,
    hsl(214 70% 60%) 60%,
    hsl(200 80% 55%) 100%
  );
}

[data-brand='creative'] {
  /* Tema creativo - gradientes vibrantes */
  --primary: 280 85% 60%;
  --secondary: 45 90% 55%;
  --accent: 15 85% 55%;

  --gradient-primary: linear-gradient(
    90deg,
    hsl(280 85% 60%) 0%,
    hsl(320 80% 65%) 30%,
    hsl(45 90% 55%) 70%,
    hsl(15 85% 55%) 100%
  );
}

[data-brand='health'] {
  /* Tema salud - verdes y azules tranquilos */
  --primary: 160 70% 45%;
  --secondary: 200 60% 50%;
  --accent: 140 65% 50%;

  --gradient-primary: linear-gradient(
    90deg,
    hsl(160 70% 45%) 0%,
    hsl(180 65% 50%) 50%,
    hsl(200 60% 50%) 100%
  );
}
````

### 5.2. Switcher de marca dinámico

```tsx
'use client';
import { Button } from '@code-dev-col/tailwind-next';

type Brand = 'default' | 'corporate' | 'creative' | 'health';

export function BrandSwitcher() {
  const applyBrand = (brand: Brand) => {
    if (brand === 'default') {
      document.documentElement.removeAttribute('data-brand');
    } else {
      document.documentElement.setAttribute('data-brand', brand);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button $variant="outline" onClick={() => applyBrand('default')}>
        Pastel (Default)
      </Button>
      <Button $variant="outline" onClick={() => applyBrand('corporate')}>
        Corporate
      </Button>
      <Button $variant="outline" onClick={() => applyBrand('creative')}>
        Creative
      </Button>
      <Button $variant="outline" onClick={() => applyBrand('health')}>
        Health
      </Button>
    </div>
  );
}
```

### 5.3. Combinar marca + modo oscuro

Puedes anidar selectores para temas específicos en modo oscuro:

```css
[data-brand='corporate'].dark {
  --primary: 214 95% 65%;
  --background: 214 30% 8%;
  --foreground: 214 20% 95%;
}

[data-brand='creative'].dark {
  --primary: 280 85% 70%;
  --background: 280 25% 8%;
  --foreground: 280 15% 95%;
}
```

---

## 6. Gradientes y utilidades personalizadas

### 6.1. Helpers de gradientes disponibles

La librería expone helpers para trabajar con gradientes:

```ts
import {
  getRandomGradient,
  gradients,
  getComponentGradient,
  useGradient,
} from '@code-dev-col/tailwind-next';

// Obtener gradiente aleatorio de una categoría
const { key, classes } = getRandomGradient({
  startsWith: 'sunset'
});

// Gradiente específico para un componente
const buttonGradient = getComponentGradient('button', 'ocean-deep');

// Hook para uso en componentes
function MyComponent() {
  const { getGradient, getRandomGradient } = useGradient();
  const gradient = getGradient('cosmic-purple');

  return (
    <div className={gradient}>
      Contenido con gradiente
    </div>
  );
}
```

### 6.2. Extender gradientes sin modificar la librería

Crea tu propio wrapper para gradientes adicionales:

```ts
// lib/custom-gradients.ts
import { gradients as baseGradients } from '@code-dev-col/tailwind-next';

export const gradients = {
  ...baseGradients,

  // Gradientes de marca
  'brand-primary': 'bg-gradient-to-r from-blue-600 to-purple-600',
  'brand-secondary': 'bg-gradient-to-br from-teal-400 to-blue-500',
  'brand-accent': 'bg-gradient-to-tr from-yellow-400 to-orange-500',

  // Gradientes especiales
  'neon-glow': 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
  'ocean-wave': 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
};

export const getCustomGradient = (key: keyof typeof gradients) => {
  return gradients[key] || gradients['brand-primary'];
};
```

### 6.3. Usar gradientes con componentes

Para componentes de la librería, usa la prop `$custom` para inyectar gradientes:

```tsx
import { Button, Card } from '@code-dev-col/tailwind-next';

export function GradientExamples() {
  return (
    <div className="space-y-4">
      {/* Button con gradiente personalizado */}
      <Button $custom="bg-gradient-primary text-white shadow-md hover:shadow-lg transition-shadow">
        Botón con gradiente
      </Button>

      {/* Card con gradiente de fondo */}
      <Card $custom="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-purple-900">
            Card con gradiente sutil
          </h3>
          <p className="text-purple-700">
            Contenido del card con fondo gradiente pastel.
          </p>
        </div>
      </Card>
    </div>
  );
}
```

---

## 7. Mejores prácticas de personalización

### 7.1. Estrategia recomendada para overrides

**❌ NO hagas esto** (editar archivos de la librería):

```css
/* ❌ Editando node_modules/@code-dev-col/tailwind-next/dist/theme.css */
@theme {
  --color-primary: hsl(210 90% 50%); /* No persistirá en updates */
}
```

**✅ Haz esto** (overrides en tu proyecto):

```css
/* ✅ En tu globals.css */
@import '@code-dev-col/tailwind-next/dist/theme.css';

@theme {
  /* Tus overrides que persisten en updates */
  --color-primary: hsl(210 90% 50%);
  --color-brand-accent: hsl(280 90% 60%);
}
```

### 7.2. Archivo de overrides centralizado

Crea un archivo dedicado para tokens personalizados:

```css
/* styles/brand-tokens.css */
@theme {
  /* Colores de marca específicos */
  --color-brand-primary: hsl(15 85% 50%);
  --color-brand-secondary: hsl(195 70% 45%);
  --color-brand-neutral: hsl(220 15% 40%);

  /* Radii personalizados */
  --radius-brand: 12px;
  --radius-card: 16px;
}

:root {
  /* Variables adicionales no manejadas por @theme */
  --brand-shadow: 0 10px 25px -3px hsl(15 85% 50% / 0.3);
  --brand-gradient: linear-gradient(
    135deg,
    hsl(15 85% 50%) 0%,
    hsl(195 70% 45%) 100%
  );
}

/* Modo oscuro para la marca */
:root.dark {
  --brand-shadow: 0 10px 25px -3px hsl(15 85% 60% / 0.4);
}
```

Luego impórtalo en `globals.css`:

```css
@import 'tailwindcss';
@import '@code-dev-col/tailwind-next/dist/theme.css';
@import './brand-tokens.css';
```

### 7.3. Theming dinámico en runtime

Para cambios de tema sin recarga de página:

```ts
// utils/theme-manager.ts
export class ThemeManager {
  static setPrimary(h: number, s: number, l: number) {
    document.documentElement.style.setProperty('--primary', `${h} ${s}% ${l}%`);
  }

  static setGradient(gradient: string) {
    document.documentElement.style.setProperty('--gradient-primary', gradient);
  }

  static resetToDefaults() {
    const properties = ['--primary', '--secondary', '--gradient-primary'];

    properties.forEach((prop) => {
      document.documentElement.style.removeProperty(prop);
    });
  }
}

// Uso
ThemeManager.setPrimary(210, 90, 50);
ThemeManager.setGradient(
  'linear-gradient(90deg, hsl(210 90% 50%), hsl(280 75% 60%))'
);
```

---

## 8. Integración con componentes

### 8.1. Usar componentes con tokens personalizados

```tsx
import { Button, Input, CheckBox, Card } from '@code-dev-col/tailwind-next';

export function CustomizedComponents() {
  return (
    <div className="space-y-6 p-6">
      {/* Button usando colores de tema automáticamente */}
      <div className="flex gap-2">
        <Button $variant="default">Primary Theme</Button>
        <Button $variant="secondary">Secondary Theme</Button>
        <Button $variant="destructive">Destructive Theme</Button>
      </div>

      {/* Button con gradiente personalizado */}
      <Button $custom="bg-gradient-primary text-white shadow-lg hover:shadow-xl transition-all">
        Gradiente Personalizado
      </Button>

      {/* Input con seguridad y theming */}
      <Input
        placeholder="Email personalizado..."
        $security="form"
        $showSecurityWarnings
        className="max-w-md"
      />

      {/* CheckBox con tema personalizado */}
      <CheckBox
        label="Acepto términos y condiciones"
        description="Usando tokens de tema personalizados"
        $variant="default"
      />

      {/* Card con fondo gradiente sutil */}
      <Card $custom="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-primary">
            Card Tematizado
          </h3>
          <p className="text-muted-foreground mt-2">
            Este card usa automáticamente los tokens de tema personalizados
            definidos en tu configuración CSS.
          </p>
        </div>
      </Card>
    </div>
  );
}
```

### 8.2. Componente de demostración de tema

```tsx
'use client';
import { Button, Input, CheckBox } from '@code-dev-col/tailwind-next';

export function ThemeShowcase() {
  return (
    <div className="p-6 bg-background border border-border rounded-lg">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Vista previa del tema
      </h2>

      <div className="grid gap-4">
        {/* Colores principales */}
        <div className="flex gap-2">
          <div className="w-12 h-12 bg-primary rounded-md"></div>
          <div className="w-12 h-12 bg-secondary rounded-md"></div>
          <div className="w-12 h-12 bg-accent rounded-md"></div>
          <div className="w-12 h-12 bg-destructive rounded-md"></div>
        </div>

        {/* Componentes */}
        <div className="flex flex-wrap gap-2">
          <Button $variant="default">Default</Button>
          <Button $variant="secondary">Secondary</Button>
          <Button $variant="outline">Outline</Button>
          <Button $variant="ghost">Ghost</Button>
        </div>

        <Input placeholder="Input con tema..." />

        <CheckBox label="Checkbox tematizado" />
      </div>
    </div>
  );
}
```

---

## 9. Arquitectura de prioridad CSS

### 9.1. Orden de aplicación (cascade)

```css
/* 1. Tailwind CSS base */
@import 'tailwindcss';

/* 2. Tokens base de la librería (@theme) */
@import '@code-dev-col/tailwind-next/dist/theme.css';

/* 3. Overrides globales del proyecto */
@theme {
  --color-primary: hsl(210 90% 50%);
}

/* 4. Scopes de tema/marca */
[data-brand='corporate'] {
  --primary: 214 95% 52%;
}

/* 5. Estados específicos (light/dark) */
:root.dark {
  --primary: 214 95% 65%;
}

/* 6. Overrides de runtime (mayor prioridad) */
/* document.documentElement.style.setProperty() */
```

### 9.2. Especificidad recomendada

- **Tokens base**: `@theme` en la librería
- **Personalizaciones**: `@theme` en tu proyecto
- **Temas/marcas**: Selectores de atributo `[data-brand]`
- **Estados**: Clases `.dark`, `.light`
- **Runtime**: `style.setProperty()` para cambios dinámicos
- **Overrides específicos**: Clases Tailwind con `!important` (uso limitado)

### 9.3. Debugging de tokens

```tsx
'use client';
import { useEffect, useState } from 'react';

export function TokenInspector() {
  const [tokens, setTokens] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      const tokenMap: Record<string, string> = {};

      // Obtener principales tokens
      const mainTokens = [
        '--primary',
        '--secondary',
        '--background',
        '--foreground',
        '--border',
        '--radius',
      ];

      mainTokens.forEach((token) => {
        tokenMap[token] = computedStyle.getPropertyValue(token).trim();
      });

      setTokens(tokenMap);
    }
  }, []);

  return (
    <div className="p-4 bg-muted rounded-lg">
      <h3 className="font-semibold mb-2">Tokens Activos</h3>
      <div className="space-y-1 text-sm">
        {Object.entries(tokens).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <code className="text-primary">{key}:</code>
            <code className="text-muted-foreground">{value}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 10. Testing y validación visual

### 10.1. Matriz de testing de temas

```tsx
'use client';
import { Button, Input, CheckBox } from '@code-dev-col/tailwind-next';

const themes = ['light', 'dark'] as const;
const brands = ['default', 'corporate', 'creative', 'health'] as const;

export function ThemeTestMatrix() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Matriz de Testing de Temas</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {themes.flatMap((theme) =>
          brands.map((brand) => (
            <div
              key={`${theme}-${brand}`}
              data-brand={brand === 'default' ? undefined : brand}
              className={`p-4 rounded-lg border-2 ${
                theme === 'dark' ? 'dark bg-background' : 'bg-background'
              }`}>
              <div className="mb-3">
                <h4 className="font-semibold text-foreground">
                  {brand} / {theme}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Tema: {brand}, Modo: {theme}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button $variant="default" $size="sm">
                    Primary
                  </Button>
                  <Button $variant="secondary" $size="sm">
                    Secondary
                  </Button>
                  <Button $variant="destructive" $size="sm">
                    Danger
                  </Button>
                </div>

                <Input
                  placeholder="Input de prueba..."
                  className="max-w-full"
                />

                <CheckBox
                  label="Checkbox de prueba"
                  description="Descripción del checkbox"
                />

                {/* Muestra de colores */}
                <div className="flex gap-1">
                  <div className="w-6 h-6 bg-primary rounded"></div>
                  <div className="w-6 h-6 bg-secondary rounded"></div>
                  <div className="w-6 h-6 bg-accent rounded"></div>
                  <div className="w-6 h-6 bg-destructive rounded"></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

### 10.2. Test de contraste automático

```tsx
'use client';
import { useEffect, useState } from 'react';

interface ContrastResult {
  ratio: number;
  level: 'AA' | 'AAA' | 'FAIL';
}

export function ContrastChecker() {
  const [results, setResults] = useState<Record<string, ContrastResult>>({});

  useEffect(() => {
    // Función para calcular contraste
    const getContrast = (color1: string, color2: string): number => {
      // Implementación simplificada - en producción usar librerías como 'color'
      return 4.5; // Placeholder
    };

    const checkContrasts = () => {
      const style = getComputedStyle(document.documentElement);
      const primary = style.getPropertyValue('--primary');
      const background = style.getPropertyValue('--background');

      // Calcular contrastes críticos
      const contrastChecks = {
        'primary-on-background': getContrast(primary, background),
        'text-on-primary': getContrast('0 0% 100%', primary),
      };

      const results: Record<string, ContrastResult> = {};
      Object.entries(contrastChecks).forEach(([key, ratio]) => {
        results[key] = {
          ratio,
          level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'FAIL',
        };
      });

      setResults(results);
    };

    checkContrasts();
  }, []);

  return (
    <div className="p-4 bg-muted rounded-lg">
      <h3 className="font-semibold mb-2">Test de Contraste WCAG</h3>
      <div className="space-y-2">
        {Object.entries(results).map(([key, result]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-sm">{key.replace('-', ' ')}</span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                result.level === 'AAA'
                  ? 'bg-green-100 text-green-800'
                  : result.level === 'AA'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}>
              {result.level} ({result.ratio.toFixed(1)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 11. Checklist de implementación

### 11.1. Setup inicial

- [ ] **Instalación**: `pnpm add @code-dev-col/tailwind-next`
- [ ] **CSS imports**: Importar `tailwindcss` y `theme.css` en orden correcto
- [ ] **Layout**: Configurar `html` con `suppressHydrationWarning`
- [ ] **Providers**: Configurar `next-themes` si usas modo oscuro

### 11.2. Personalización básica

- [ ] **Tokens override**: Definir `@theme` con colores personalizados
- [ ] **Dark mode**: Configurar tokens para `:root.dark`
- [ ] **Gradientes**: Definir gradientes personalizados en `:root`
- [ ] **Testing**: Probar componentes con nuevos tokens

### 11.3. Funcionalidades avanzadas

- [ ] **Multi-brand**: Configurar `[data-brand]` selectores
- [ ] **Runtime theming**: Implementar `ThemeManager` para cambios dinámicos
- [ ] **Contraste**: Validar WCAG AA/AAA con nuevos colores
- [ ] **Performance**: Verificar que solo se cargan tokens necesarios

### 11.4. Testing y QA

- [ ] **Matriz visual**: Probar todas las combinaciones tema/marca
- [ ] **Componentes**: Verificar Button, Input, CheckBox con todos los temas
- [ ] **Dark mode**: Confirmar transiciones suaves y legibilidad
- [ ] **Responsive**: Probar en diferentes tamaños de pantalla
- [ ] **Accesibilidad**: Validar contrastes y navegación por teclado

---

## 12. Preguntas frecuentes

### 12.1. Tailwind y CSS

**P: ¿Puedo usar Sass/Less junto a esta librería?**  
R: Sí, siempre que generes el CSS final antes de importar los tokens. Asegúrate de que el orden de importación sea correcto.

**P: ¿Qué pasa si Tailwind purga mis clases dinámicas?**  
R: Usa `safelist` en `tailwind.config.js` o construye las clases de gradiente en un mapa estático. La librería ya incluye safelist para sus propias clases.

**P: ¿Cómo debug problemas de tokens no aplicados?**  
R: Usa el `TokenInspector` component para ver valores computados, o inspecciona las variables CSS en DevTools.

### 12.2. Personalización

**P: ¿Puedo tree-shake gradientes no usados?**  
R: Sí, al ser strings referenciadas es trivial para un bundler eliminar código muerto si no importas helpers extra.

**P: ¿Cómo añado nuevos colores sin romper updates?**  
R: Define tokens personalizados en tu `@theme` block. Los tokens de la librería se sobrescriben pero no se rompen.

**P: ¿Funciona con shadcn/ui?**  
R: Sí, la librería mantiene compatibilidad con shadcn/ui usando variables HSL sin `hsl()` además de las variables `@theme`.

### 12.3. Performance

**P: ¿Impacta en el bundle size?**  
R: Mínimo. Solo se incluyen los tokens CSS que realmente uses. Los componentes están optimizados con tree-shaking.

**P: ¿Los cambios de tema son performantes?**  
R: Sí, usar CSS custom properties permite re-theming instantáneo sin re-renders de React.

## 13. Recursos adicionales

### 13.1. Links útiles

- **Tailwind CSS v4**: [tailwindcss.com/docs/theme](https://tailwindcss.com/docs/theme)
- **next-themes**: [github.com/pacocoursey/next-themes](https://github.com/pacocoursey/next-themes)
- **WCAG Contrast**: [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/)
- **HSL Color**: [hslpicker.com](https://hslpicker.com)

### 13.2. Ejemplos de implementación

```bash
# Proyecto ejemplo completo
git clone https://github.com/code-dev-col/tailwind-next-examples
cd tailwind-next-examples/nextjs-theming
pnpm install && pnpm dev
```

### 13.3. Siguientes pasos recomendados

1. **Implementar ThemeSwitcher**: Component central para cambio de temas
2. **Tests de regresión visual**: Chromatic/Playwright para cada tema
3. **Tokens escalables**: Archivo `tokens.brand-x.css` separado para empresas
4. **Documentación interna**: Guía específica para tu equipo de desarrollo

---

## 🆘 Soporte

¿Dudas o mejoras?

- **Issues**: [GitHub Repository Issues](https://github.com/code-dev-col/tailwind-next/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/code-dev-col/tailwind-next/discussions)
- **Ejemplos**: [Storybook Documentation](https://code-dev-col.github.io/tailwind-next-storybook)

---

**Última actualización**: Agosto 2025 - Versión con Tailwind CSS v4 y patrón `@theme`

