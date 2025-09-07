# Guía de Personalización de Colores

## 📋 Introducción

El sistema de diseño `@code-dev-col/tailwind-next` utiliza CSS custom properties (variables CSS) para permitir la personalización completa de colores por parte de los proyectos consumidores.

## 🎨 Arquitectura del Sistema de Colores

### Variables CSS del Theme

Todas las variables están definidas en `src/theme.css` usando dos sistemas sincronizados:

1. **@theme block** (Tailwind v4): Variables con prefijo `--color-`
2. **:root block** (shadcn/ui compatibility): Variables HSL sin prefijo

```css
@theme {
  --color-primary: hsl(215 85% 55%);
  --color-secondary: hsl(210 75% 65%);
  /* ... */
}

:root {
  --primary: 215 85% 55%;
  --secondary: 210 75% 65%;
  /* ... */
}
```

### Cómo los Componentes Usan las Variables

Los componentes utilizan las variables CSS de tres formas:

#### 1. Clases de Tailwind (Preferido)

```tsx
className = 'bg-primary text-primary-foreground border-primary/50';
```

#### 2. CSS-in-JS con Variables CSS

```tsx
const colors = {
  primary: 'hsl(var(--primary))',
  border: 'hsl(var(--primary) / 0.5)',
  focus: 'hsl(var(--primary) / 0.2)',
};
```

#### 3. CSS Custom Properties Directas

```css
background-color: hsl(var(--primary));
border-color: hsl(var(--border));
```

## 🔧 Personalización en Proyectos Next.js

### Opción 1: Sobrescribir Variables CSS (Recomendado)

Crear un archivo `styles/theme-override.css` en tu proyecto Next.js:

```css
/* styles/theme-override.css */
:root {
  /* Personalizar colores principales */
  --primary: 280 100% 70%; /* Púrpura vibrante */
  --secondary: 200 100% 60%; /* Azul cian */
  --destructive: 0 100% 60%; /* Rojo puro */
  --accent: 120 100% 50%; /* Verde lima */

  /* Colores neutros */
  --background: 0 0% 100%;
  --foreground: 0 0% 0%;
  --muted: 210 40% 98%;
  --muted-foreground: 215 16% 47%;
  --border: 214 32% 91%;
}

/* Dark mode */
:root.dark {
  --primary: 280 100% 80%;
  --secondary: 200 100% 70%;
  /* ... */
}
```

Importar en `pages/_app.tsx` o `app/layout.tsx`:

```tsx
// Next.js Pages Router
import '../styles/theme-override.css';

// Next.js App Router
import './theme-override.css';
```

### Opción 2: Configuración con Tailwind Config

Extender la configuración de Tailwind en tu proyecto:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // Personalizar colores específicos
        brand: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
};
```

### Opción 3: Tema Dinámico con JavaScript

Para cambios de tema en runtime:

```tsx
// hooks/useTheme.ts
export const useTheme = () => {
  const setTheme = (colors: Record<string, string>) => {
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  };

  const applyBrandTheme = () => {
    setTheme({
      primary: '280 100% 70%',
      secondary: '200 100% 60%',
      accent: '120 100% 50%',
    });
  };

  return { setTheme, applyBrandTheme };
};
```

## 📚 Esquemas de Color Predefinidos

Cada componente soporta estos esquemas usando las variables del theme:

### Esquemas Disponibles

- **`default`**: Usa `--primary` como color base
- **`secondary`**: Usa `--secondary` como color base
- **`destructive`**: Usa `--destructive` para errores
- **`accent`**: Usa `--accent` para destacados
- **`muted`**: Usa `--muted-foreground` para elementos sutiles
- **`minimal`**: Usa `--foreground` con opacidades bajas
- **`ghost`**: Similar a default pero más sutil
- **`custom`**: Permite personalización externa completa

### Ejemplo de Uso

```tsx
// Estos componentes se adaptan automáticamente a tu tema
<Button $colorScheme="default">Botón Principal</Button>
<Button $colorScheme="secondary">Botón Secundario</Button>
<Input $colorScheme="destructive" /> {/* Para errores */}
<CheckBox $colorScheme="accent" /> {/* Para destacar */}
```

## 🎯 Casos de Uso Comunes

### Tema Corporativo

```css
:root {
  /* Colores de la marca */
  --primary: 210 100% 50%; /* Azul corporativo */
  --secondary: 210 100% 60%; /* Azul claro */
  --accent: 45 100% 50%; /* Amarillo distintivo */
  --destructive: 0 84% 60%; /* Rojo de advertencia */

  /* Neutros profesionales */
  --background: 0 0% 100%;
  --foreground: 220 13% 18%;
  --muted: 220 14% 96%;
  --muted-foreground: 220 8% 46%;
}
```

### Tema Oscuro Personalizado

```css
:root.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 210 100% 60%;
  --secondary: 210 100% 70%;
  --accent: 45 100% 60%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
}
```

### Tema Colorido/Creativo

```css
:root {
  --primary: 280 100% 70%; /* Púrpura vibrante */
  --secondary: 200 100% 70%; /* Cian brillante */
  --accent: 120 100% 60%; /* Verde lima */
  --destructive: 0 100% 65%; /* Rojo coral */
  --warning: 35 100% 60%; /* Naranja */
  --success: 155 100% 50%; /* Verde esmeralda */
}
```

## ⚠️ Consideraciones Importantes

### Contraste y Accesibilidad

- Mantener contraste WCAG AA (4.5:1) mínimo
- Probar en modo claro y oscuro
- Verificar legibilidad con daltonismo

### Compatibilidad

- Las variables se sincronizan automáticamente entre @theme y :root
- Compatible con shadcn/ui out-of-the-box
- Funciona con Tailwind v4 y versiones anteriores

### Performance

- Las variables CSS se evalúan en tiempo real
- No requiere recompilación de Tailwind
- Cambios instantáneos en runtime

## 🔍 Debug y Herramientas

### Inspeccionar Variables Activas

```javascript
// En DevTools Console
const style = getComputedStyle(document.documentElement);
console.log('Primary:', style.getPropertyValue('--primary'));
console.log('Background:', style.getPropertyValue('--background'));
```

### Validar Temas

```tsx
// Componente de debug para validar colores
const ThemeDebugger = () => {
  const colors = ['primary', 'secondary', 'destructive', 'accent'];

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {colors.map((color) => (
        <div key={color} className="space-y-2">
          <div className={`w-16 h-16 rounded border bg-${color}`} />
          <p className="text-sm">{color}</p>
        </div>
      ))}
    </div>
  );
};
```

## 📖 Ejemplos Completos

Ver los archivos de documentación adicionales:

- `theming-nextjs.md`: Configuración específica para Next.js
- `SECURITY.md`: Consideraciones de seguridad
- Storybook stories: Ejemplos interactivos de cada esquema

---

**Esta guía garantiza que todos los colores sean personalizables sin necesidad de modificar el código fuente de la librería.**

