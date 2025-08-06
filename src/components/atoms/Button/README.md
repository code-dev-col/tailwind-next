# Button Component

Un componente de botón altamente configurable inspirado en shadcn/ui con múltiples variantes, tamaños y soporte para personalización.

## Características

- ✨ **6 Variantes**: default, destructive, outline, secondary, ghost, link
- 📏 **4 Tamaños**: sm, default, lg, icon
- 🎨 **Totalmente personalizable** con la prop `$custom`
- ♿ **Accesible** con soporte para focus y estados disabled
- 🎭 **Design System** integrado con variables CSS
- 🌗 **Soporte para tema oscuro**

## Uso Básico

```tsx
import { Button } from 'tailwind-next';

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Button $variant="outline">Outline</Button>
      <Button $variant="destructive">Delete</Button>
    </div>
  );
}
```

## Variantes

### Default

El botón principal con estilo sólido.

```tsx
<Button $variant="default">Primary Action</Button>
```

### Secondary

Botón secundario con estilo suave.

```tsx
<Button $variant="secondary">Secondary Action</Button>
```

### Destructive

Para acciones destructivas como eliminar.

```tsx
<Button $variant="destructive">Delete Item</Button>
```

### Outline

Botón con borde y fondo transparente.

```tsx
<Button $variant="outline">Cancel</Button>
```

### Ghost

Botón minimalista que se resalta al hover.

```tsx
<Button $variant="ghost">Settings</Button>
```

### Link

Botón que se ve como un enlace.

```tsx
<Button $variant="link">Learn more</Button>
```

## Tamaños

```tsx
<Button $size="sm">Small</Button>
<Button $size="default">Default</Button>
<Button $size="lg">Large</Button>
<Button $size="icon">🚀</Button>
```

## Personalización Avanzada

### Con la prop $custom

```tsx
<Button $custom="bg-gradient-to-r from-purple-500 to-pink-500">
  Gradient Button
</Button>

<Button $variant="outline" $custom="border-dashed border-2">
  Dashed Border
</Button>

<Button $custom="bg-red-50 text-red-700 hover:bg-red-100">
  Custom Background
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

## Estados

### Disabled

```tsx
<Button disabled>Can't click me</Button>
```

### Loading (con $custom)

```tsx
<Button disabled $custom="opacity-50">
  <LoadingSpinner className="mr-2" />
  Loading...
</Button>
```

## API Reference

### Props

| Prop        | Type                                                                          | Default     | Description                    |
| ----------- | ----------------------------------------------------------------------------- | ----------- | ------------------------------ |
| `$variant`  | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Visual style variant           |
| `$size`     | `'default' \| 'sm' \| 'lg' \| 'icon'`                                         | `'default'` | Size of the button             |
| `$custom`   | `string`                                                                      | -           | Custom Tailwind CSS classes    |
| `className` | `string`                                                                      | -           | Additional CSS classes         |
| `disabled`  | `boolean`                                                                     | `false`     | Whether the button is disabled |
| `children`  | `ReactNode`                                                                   | -           | Button content                 |

### Design Tokens

El componente utiliza las siguientes variables CSS que puedes personalizar:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}
```

