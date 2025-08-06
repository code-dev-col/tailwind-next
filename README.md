# Tailwind Next Library

Una librería de componentes para React construida con Tailwind CSS y TypeScript, con un sistema de props basado en el prefijo `$` para máxima flexibilidad.

## ✨ Características

- 🎨 **Componentes con Tailwind CSS** y design system completo
- 📚 **Documentación con Storybook** integrada con cada componente
- 🔧 **TypeScript completo** con tipado robusto
- ⚡ **Build rápido** con tsup
- 🎯 **Props personalizables** con prefijo `$` para evitar conflictos
- 🎭 **Sistema de variantes** inspirado en shadcn/ui
- 🌗 **Soporte para tema oscuro**

## 🚀 Instalación

```bash
npm install tailwind-next
```

## 📖 Uso Básico

```tsx
import { Button } from 'tailwind-next';

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Button $variant="outline">Outline</Button>
      <Button $variant="destructive">Delete</Button>
      <Button $custom="bg-red-50 text-red-700 hover:bg-red-100">
        Custom Style
      </Button>
    </div>
  );
}
```

## 🎨 Sistema de Props con `$`

Todas las props personalizadas de la librería usan el prefijo `$` para evitar conflictos con props nativas de HTML:

- `$variant` - Variante visual del componente
- `$size` - Tamaño del componente
- `$custom` - Clases personalizadas de Tailwind CSS

## 🎨 Personalización de Colores

La librería utiliza un sistema de variables CSS que permite personalizar completamente los colores desde tu proyecto Next.js:

```css
/* En tu globals.css */
:root {
  --primary: 142 76% 36%; /* Verde corporativo */
  --secondary: 24 9.8% 10%; /* Gris oscuro */
  --destructive: 0 84.2% 60.2%; /* Rojo de alerta */
}
```

**📖 [Ver Guía Completa de Personalización](./CUSTOMIZATION.md)** - Incluye ejemplos, paletas predefinidas y mejores prácticas.

## 📋 Documentación para Desarrolladores

- **[📋 Guía de Desarrollo](./DEVELOPMENT_GUIDE.md)** - Estándares, patrones y checklist obligatorio
- **[🎨 Patrones de Degradados](./GRADIENTS_GUIDE.md)** - Biblioteca de degradados y mejores prácticas
- **[🎨 Personalización](./CUSTOMIZATION.md)** - Cómo personalizar colores en tu proyecto## 🧩 Componentes Disponibles

### Button

Un componente de botón altamente configurable con 6 variantes y 4 tamaños.

```tsx
// Variantes
<Button $variant="default">Primary</Button>
<Button $variant="secondary">Secondary</Button>
<Button $variant="destructive">Delete</Button>
<Button $variant="outline">Cancel</Button>
<Button $variant="ghost">Settings</Button>
<Button $variant="link">Learn more</Button>

// Tamaños
<Button $size="sm">Small</Button>
<Button $size="default">Default</Button>
<Button $size="lg">Large</Button>
<Button $size="icon">🚀</Button>

// Personalización completa
<Button $custom="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
  Custom Style
</Button>
```

## 🛠️ Desarrollo Local

### Prerrequisitos

- Node.js 18+
- npm

### Scripts disponibles

```bash
# Instalar dependencias
npm install

# Ejecutar Storybook
npm run storybook

# Construir la librería
npm run build

# Construir Storybook para producción
npm run build-storybook
```

### Arquitectura del proyecto

```text
src/
├── components/
│   └── atoms/
│       └── Button/
│           ├── Button.tsx           # Componente
│           ├── Button.stories.tsx   # Stories de Storybook
│           └── index.ts            # Exportaciones
├── utils/
│   └── cn.ts                       # Utilidad para merge de clases
├── styles/
│   └── global.css                  # Estilos globales y variables CSS
├── types.ts                        # Tipos globales
└── index.ts                        # Punto de entrada principal
```

## 📚 Storybook

Para ver todos los componentes y sus variaciones en acción:

```bash
npm run storybook
```

Esto abrirá Storybook en `http://localhost:6006` donde podrás:

- Ver todas las variantes de cada componente
- Interactuar con los controles en tiempo real
- Ver la documentación automática generada
- Probar diferentes configuraciones

## 🎯 Filosofía de Diseño

### Props con prefijo `$`

Usamos el prefijo `$` para todas las props personalizadas para:

- **Evitar conflictos** con props nativas de HTML
- **Claridad visual** para identificar props de la librería
- **Consistencia** en toda la API

### Sistema de variantes

Inspirado en shadcn/ui, cada componente tiene:

- **Variantes semánticas** (default, destructive, outline, etc.)
- **Tamaños consistentes** (sm, default, lg, icon)
- **Personalización total** con `$custom`

### Prioridad de estilos

El sistema de estilos funciona con la siguiente prioridad:

1. **Estilos base** - Clases fundamentales del componente
2. **Variantes** - Estilos según `$variant` y `$size`
3. **Custom** - `$custom` puede sobrescribir cualquier estilo
4. **ClassName** - Clases adicionales estáticas

## 🌟 Ejemplos Avanzados

### Sobrescribiendo backgrounds

```tsx
// $custom puede sobrescribir completamente los estilos de variantes
<Button $custom="bg-red-50 text-red-700 hover:bg-red-100">
  Background personalizado
</Button>

// Combinando variantes con personalización
<Button $variant="outline" $custom="border-dashed border-2 border-blue-500">
  Outline con borde personalizado
</Button>
```

### Con iconos

```tsx
<Button>
  <MailIcon className="mr-2 h-4 w-4" />
  Send Email
</Button>

<Button $size="icon">
  <HeartIcon className="h-4 w-4" />
</Button>
```

## 📄 Licencia

MIT
