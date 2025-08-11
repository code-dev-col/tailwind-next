# Guía de Theming y Personalización (Next.js)

Esta guía explica cómo integrar la librería en un proyecto **Next.js (App Router o Pages)** y personalizar colores, gradientes y temas (light/dark + multi brand) usando **CSS Custom Properties** y Tailwind CSS.

---

## 1. Instalación básica

Suponiendo la librería publicada como `@org/tailwind-next`:

```bash
pnpm add @org/tailwind-next
# o npm i / yarn add
```

Si usas Tailwind v4 (postcss-plugins a nivel raíz) ya no necesitas la mayoría de configuraciones complejas.

---

## 2. Importar estilos y tokens

En `app/globals.css` (o `src/styles/globals.css`):

```css
/* 1. Importa primero los tokens base de la librería */
@import '@org/tailwind-next/dist/theme.css';

/* 2. Tu capa de overrides (se ejecuta después => mayor prioridad) */
:root {
  /* Override de tokens (ejemplos) */
  --color-primary: 210 90% 50%;
  --color-accent: 280 75% 60%;
  --gradient-primary: linear-gradient(
    to right,
    hsl(210 90% 55%),
    hsl(280 75% 60%)
  );
}

/* Dark mode personalizado */
:root.dark {
  /* ó [data-theme=dark] */
  --color-background: 222 47% 6%;
  --color-foreground: 210 40% 98%;
  --color-primary: 210 100% 70%;
  --gradient-primary: linear-gradient(
    to right,
    hsl(210 100% 65%),
    hsl(260 85% 62%)
  );
}
```

En `app/layout.tsx` (App Router):

```tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Demo Tailwind Next Library' };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
```

---

## 3. Cómo funcionan los tokens

La librería define variables tipo `--color-primary` en `theme.css`. Las utilidades de Tailwind generadas (ej: `bg-background`, `text-muted-foreground`, etc.) usan `hsl(var(--color-...))`. Al sobrescribir estas variables en tu proyecto cambias toda la apariencia sin tocar el código fuente de los componentes.

### Principales categorías

- Colores semánticos: `--color-background`, `--color-foreground`, `--color-primary`, `--color-destructive`, etc.
- Tipografía: `--font-sans`, tamaños `--font-size-*`.
- Radius: `--radius-sm`, `--radius-md`, etc.
- Espaciado semántico: `--space-*` (opcional para utilidades personalizadas).
- Gradientes: `--gradient-primary`, `--gradient-danger`, `--gradient-success`.

---

## 4. Modo Oscuro

Puedes usar estrategia de clase (`.dark`) o atributo (`[data-theme=dark]`). Ejemplo con **`next-themes`**:

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
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

Usar en `layout.tsx`:

```tsx
import { Providers } from './providers';
// ...
<body>
  <Providers>{children}</Providers>
</body>;
```

Cambiar tema:

```tsx
'use client';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle {theme}
    </button>
  );
}
```

---

## 5. Multi Brand / Theming Dinámico

Define scopes con atributos o clases y sobrescribe variables dentro:

```css
[data-theme='brand-a'] {
  --color-primary: 14 90% 55%;
  --gradient-primary: linear-gradient(
    to right,
    hsl(14 90% 55%),
    hsl(33 90% 55%)
  );
}

[data-theme='brand-b'] {
  --color-primary: 130 65% 45%;
  --gradient-primary: linear-gradient(
    to right,
    hsl(130 65% 45%),
    hsl(160 65% 50%)
  );
}
```

En tiempo de ejecución:

```tsx
function BrandSwitcher() {
  const applyBrand = (brand: string) => {
    document.documentElement.setAttribute('data-theme', brand);
  };
  return (
    <div className="flex gap-2">
      <button onClick={() => applyBrand('brand-a')}>Brand A</button>
      <button onClick={() => applyBrand('brand-b')}>Brand B</button>
    </div>
  );
}
```

### Light / Dark por marca

Puedes anidar:

```css
[data-theme='brand-a'].dark {
  --color-primary: 14 90% 65%;
}
[data-theme='brand-b'].dark {
  --color-primary: 160 65% 60%;
}
```

---

## 6. Gradientes personalizados

La librería expone helpers en `utils/gradients`:

```ts
import {
  getRandomGradient,
  gradients,
  getComponentGradient,
} from '@org/tailwind-next';

const { key, classes } = getRandomGradient({ startsWith: 'sunset' });
```

Si quieres añadir gradientes propios globalmente (sin forkar), crea un wrapper util:

```ts
// lib/gradients.ts
import { gradients as baseGradients } from '@org/tailwind-next';

export const gradients = {
  ...baseGradients,
  brandPulse: 'bg-gradient-to-r from-fuchsia-500 to-amber-400',
};
```

Luego úsalo en tus componentes propios. Para componentes de la librería, usa `$custom` para inyectar la clase.

---

## 7. Extender tokens sin romper upgrades

Recomendado: NO edites `theme.css` de la librería. En lugar de eso:

```css
/* overrides.css */
@import '@org/tailwind-next/dist/theme.css';

:root {
  --color-secondary: 260 85% 60%;
}

/* Nuevos tokens que tu app puede consumir directamente */
:root {
  --color-brand-accent: 280 90% 60%;
}
```

Importa `overrides.css` en vez de `theme.css` para centralizar.

---

## 8. Theming en runtime (sin recarga)

Puedes mutar variables directamente:

```ts
function setPrimary(h: number, s: number, l: number) {
  document.documentElement.style.setProperty(
    '--color-primary',
    `${h} ${s}% ${l}%`
  );
}
```

Esto re-temará inmediatamente todos los componentes.

---

## 9. Estrategia de prioridad (cascade)

1. `@import` de la librería (tokens base)
2. Overrides globales del proyecto (`:root`)
3. Scopes de tema / brand (`[data-theme=..]`, `.dark`)
4. Overrides de runtime vía `style.setProperty`
5. Clases utilitarias Tailwind directas (tienen precedencia si apuntan a la misma propiedad)

---

## 10. Integración con componentes de la librería

Ejemplo usando `Button` con gradiente custom + tokens:

```tsx
import { Button } from '@org/tailwind-next';

export function CTA() {
  return (
    <Button $custom="bg-gradient-primary text-[hsl(var(--color-primary-foreground))] shadow-md">
      Comprar ahora
    </Button>
  );
}
```

Ejemplo Input con seguridad + theming:

```tsx
import { Input } from '@org/tailwind-next';

export function SecureField() {
  return (
    <Input
      placeholder="Escribe..."
      $security="form"
      $showSecurityWarnings
      $sanitizeOnChange
    />
  );
}
```

---

## 11. Testing visual

Prueba combinaciones de tema usando una matriz:

```tsx
const themes = ['light', 'dark'];
const brands = ['brand-a', 'brand-b'];

export function ThemeMatrix({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {themes.flatMap((t) =>
        brands.map((b) => (
          <div
            key={`${t}-${b}`}
            data-theme={b}
            className={
              t === 'dark'
                ? 'dark p-4 rounded-lg border'
                : 'p-4 rounded-lg border'
            }>
            <h4 className="mb-2 font-medium">
              {b} / {t}
            </h4>
            {children}
          </div>
        ))
      )}
    </div>
  );
}
```

---

## 12. Checklist de adopción rápida

- [ ] Importé `theme.css` antes de mis overrides
- [ ] Definí dark mode (.dark o data-theme)
- [ ] Creé overrides de marca (si aplica)
- [ ] Ajusté gradientes (`--gradient-*` o clases custom)
- [ ] Probé accesibilidad (contraste) tras cambios
- [ ] Documenté tokens nuevos para el equipo

---

## 13. Preguntas frecuentes

**¿Puedo usar Sass / Less junto a esto?** Sí, siempre que generes el CSS final antes de importar tokens.

**¿Y si Tailwind purga mis clases dinámicas?** Usa safelist en `tailwind.config.js` o construye las clases de gradiente en un mapa estático.

**¿Puedo tree-shake gradientes no usados?** Al ser strings referenciadas, es trivial para un bundler eliminar código muerto si no importas helpers extra.

---

## 14. Siguientes pasos recomendados

1. Implementar un ThemeSwitcher component central.
2. Añadir tests de regresión visual (Chromatic / Playwright) para cada tema.
3. Introducir un fichero `tokens.brand-a.css` separado para escalabilidad empresarial.

---

¿Dudas o mejoras? Abre un issue en el repositorio de la librería.

