# 🎨 Guía de Personalización

Esta guía explica cómo personalizar los colores y estilos de la librería `tailwind-next` en tu proyecto Next.js usando **Tailwind CSS v4**.

## 🌈 Sistema de Colores con Tailwind v4

La librería utiliza el nuevo sistema `@theme` de **Tailwind CSS v4** combinado con variables CSS para máxima compatibilidad y personalización.

### Variables Tailwind v4 (Recomendado)

```css
/* En tu globals.css */
@import 'tailwindcss';

@theme {
  /* Personaliza directamente con variables Tailwind v4 */
  --color-primary: #10b981; /* Verde corporativo */
  --color-primary-foreground: #ffffff;

  --color-secondary: #6b7280; /* Gris neutro */
  --color-secondary-foreground: #ffffff;

  --color-destructive: #ef4444; /* Rojo para acciones peligrosas */
  --color-destructive-foreground: #ffffff;
}
```

### Variables CSS Tradicionales (Compatibilidad)

```css
/* También puedes usar el formato HSL tradicional */
:root {
  --primary: 142 71% 45%; /* Verde en formato HSL */
  --primary-foreground: 0 0% 98%;

  --secondary: 220 9% 46%; /* Gris en formato HSL */
  --secondary-foreground: 0 0% 98%;

  --destructive: 0 84% 60%; /* Rojo en formato HSL */
  --destructive-foreground: 0 0% 98%;
}
```

## 🛠️ Cómo Personalizar en Next.js

### 1. Método Recomendado - Tailwind v4

```css
/* styles/globals.css */
@import 'tailwindcss';

@theme {
  /* Tu paleta corporativa */
  --color-primary: #3b82f6; /* Azul corporativo */
  --color-secondary: #64748b; /* Gris corporativo */
  --color-destructive: #ef4444; /* Rojo de alerta */

  /* Colores de fondo */
  --color-background: #ffffff;
  --color-foreground: #0f172a;
}

/* Tema oscuro */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-primary: #60a5fa; /* Azul más claro */
    --color-background: #0f172a; /* Fondo oscuro */
    --color-foreground: #f8fafc; /* Texto claro */
  }
}
```

### 2. Usar los componentes

````tsx
// components/MyComponent.tsx
import { Button } from 'tailwind-next';

export function MyComponent() {
  return (
    <div>
      {/* Usa automáticamente tus colores personalizados */}
      <Button $variant="default">
        Botón con tu color primary
      </Button>

      <Button $variant="secondary">
        Botón con tu color secondary
      </Button>

      {/* También puedes usar clases nativas de Tailwind v4 */}
      <Button $custom="bg-blue-500 text-white hover:bg-blue-600">
        Azul con clases nativas
      </Button>
    </div>
  );
}
```## 🎯 Ejemplos de Paletas

### Paleta Corporativa Azul/Naranja

```css
:root {
  --primary: 213 94% 68%; /* Azul corporativo */
  --secondary: 25 95% 53%; /* Naranja complementario */
  --destructive: 0 84% 60%; /* Rojo de alerta */
}
````

### Paleta Verde Ecológica

```css
:root {
  --primary: 142 71% 45%; /* Verde principal */
  --secondary: 158 64% 52%; /* Verde secundario */
  --destructive: 0 84% 60%; /* Rojo de alerta */
}
```

### Paleta Monocromática

```css
:root {
  --primary: 220 13% 18%; /* Gris oscuro */
  --secondary: 220 9% 46%; /* Gris medio */
  --destructive: 0 84% 60%; /* Rojo de alerta */
}
```

## 🎨 Generador de Colores HSL

Para convertir colores HEX a HSL (formato requerido), puedes usar:

- **Online**: [HSL Color Picker](https://hslpicker.com/)
- **Desde código**:

```javascript
// Convertir HEX a HSL
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // ... lógica de conversión
  return `${h} ${s}% ${l}%`;
}

// Ejemplo: #3b82f6 → "221.2 83.2% 53.3%"
```

## 🌗 Soporte para Tema Oscuro

La librería incluye soporte completo para modo oscuro:

```css
.dark {
  --primary: 217.2 91.2% 59.8%; /* Colores ajustados para contraste */
  --secondary: 217.2 32.6% 17.5%;
  --background: 222.2 84% 4.9%; /* Fondo oscuro */
  --foreground: 210 40% 98%; /* Texto claro */
}
```

Para activar el tema oscuro en tu aplicación Next.js:

```tsx
// Con next-themes
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

## 🔧 Herramientas Recomendadas

- **[Tailwind CSS Color Generator](https://uicolors.app/)** - Generar paletas completas
- **[Coolors.co](https://coolors.co/)** - Inspiración de paletas
- **[Contrast Checker](https://webaim.org/resources/contrastchecker/)** - Verificar accesibilidad
- **[Shadcn/ui Themes](https://ui.shadcn.com/themes)** - Temas predefinidos

## ⚡ Consejos Pro

1. **Consistencia**: Usa las variables CSS en lugar de colores hardcodeados
2. **Contraste**: Asegúrate de que el contraste sea suficiente (WCAG AA: 4.5:1)
3. **Testing**: Prueba tanto en modo claro como oscuro
4. **Semántica**: Usa `primary` para acciones principales, `destructive` para acciones peligrosas
5. **Gradualidad**: Cambia los colores gradualmente, no todos a la vez

## 📞 ¿Necesitas Ayuda?

Si tienes problemas personalizando los colores, revisa:

- Las variables CSS están correctamente definidas
- Los valores HSL tienen el formato correcto (`hue saturation% lightness%`)
- No hay conflictos con otros estilos CSS
- Los colores tienen suficiente contraste para accesibilidad

