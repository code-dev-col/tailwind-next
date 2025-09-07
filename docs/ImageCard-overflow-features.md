# ImageCard - Funcionalidades de Overflow e Imagen con Fondo Personalizable

## Resumen

Se han agregado nuevas funcionalidades al componente `ImageCard` para permitir que las imágenes sobresalgan **realmente** de los bordes de la tarjeta y tener un fondo personalizable, ideal para productos con transparencia.

## ✨ Nuevo Comportamiento de Overflow

El overflow ahora funciona **correctamente fuera del contenedor principal** de la tarjeta:

- La imagen sobresale del `Container` principal del `ImageCard`
- Se crea un contenedor wrapper que permite el overflow real
- El contenedor principal ajusta su `overflow` dinámicamente (`hidden` vs `visible`)

## Nuevas Props

### `$imageOverflow`

- **Tipo**: `'none' | 'top' | 'all'`
- **Valor por defecto**: `'none'`
- **Descripción**: Controla si la imagen sobresale **realmente** de los bordes de la tarjeta

#### Opciones

- `'none'`: Sin overflow, comportamiento normal (imagen contenida)
- `'top'`: La imagen sobresale por la parte superior del contenedor y se **escala 3%** más grande
- `'all'`: La imagen sobresale por todos los lados del contenedor y se **escala 10%** más grande

### `$imageBgColor`

- **Tipo**: `string`
- **Valor por defecto**: `undefined`
- **Descripción**: Color de fondo personalizable para el área de la imagen
- **Uso**: Ideal para productos con transparencia que necesitan un fondo específico

### 🔧 Comportamiento de Fondo Automático

El componente ahora maneja automáticamente el fondo de la imagen:

- **Sin `$imageBgColor` + Sin overflow**: Fondo gris por defecto (`bg-muted`)
- **Sin `$imageBgColor` + Con overflow**: **Fondo transparente** (sin `bg-muted`)
- **Con `$imageBgColor`**: Usa el color especificado, sin fondo gris

## Casos de Uso

### 1. Productos con Transparencia

```tsx
<ImageCard
  src="producto-transparente.png"
  alt="Producto"
  title="Producto Gaming"
  description="Imagen PNG con transparencia"
  $imageOverflow="top"
  $imageBgColor="#0f172a"
  $colorScheme="primary"
/>
```

### 2. Productos Destacados

```tsx
<ImageCard
  src="producto-premium.png"
  alt="Producto Premium"
  title="Producto Premium"
  description="Imagen que sobresale completamente"
  $imageOverflow="all"
  $imageBgColor="#fbbf24"
  showBadge
  badgeText="Premium"
/>
```

### 3. Galería de Productos

```tsx
<ImageCard
  src="producto.png"
  alt="Producto"
  title="Producto Normal"
  description="Sin efectos especiales"
  $imageOverflow="none"
  // Sin $imageBgColor usa el fondo por defecto
/>
```

## Implementación Técnica Actualizada

### 🔧 Arquitectura de Overflow Real

La nueva implementación utiliza una estructura de **contenedor wrapper** para permitir overflow real:

```jsx
<div className="relative pt-4">
  {' '}
  {/* Wrapper con espacio para overflow */}
  <Container className="overflow-visible">
    {' '}
    {/* Contenedor principal */}
    <Image className="-mt-4 relative z-10" /> {/* Imagen que sobresale */}
    {/* Resto del contenido */}
  </Container>
</div>
```

### Funciones Auxiliares

#### `getMainContainerClasses(overflow)`

Genera espaciado en el contenedor wrapper para acomodar el overflow:

- `'top'`: Aplica `pt-6` (espacio superior para imagen escalada 3%)
- `'all'`: Aplica `py-6` (espacio vertical para imagen escalada 10%, centrada horizontalmente)
- `'none'`: Sin espaciado adicional

#### `getImageOverflowClasses(overflow)`

Genera las clases CSS para el overflow y escalado de la imagen:

- `'top'`: Aplica `-mt-6 mb-2 rounded-t-xl overflow-hidden relative z-10 scale-[1.03] bg-transparent`
- `'all'`: Aplica `-my-6 rounded-xl overflow-hidden relative z-10 scale-110 bg-transparent`
- `'none'`: Sin clases adicionales

**Nuevas características:**

- ✨ **Escalado automático**: Las imágenes se escalan para sobresalir visualmente
- ✨ **Transición suave**: `transition-transform duration-300` para efectos fluidos
- ✨ **Fondo transparente**: `bg-transparent` elimina fondos no deseados
- ✨ **Overflow correcto**: Eliminado `-mx-3` para que el overflow top vaya hacia arriba, no a los lados
- ✨ **Centrado perfecto**: Usar `-my-6` en lugar de `-m-6` mantiene la imagen centrada horizontalmente

#### `getContentSpacing(overflow, variant)`

🆕 **Nueva función** que ajusta el espaciado del contenido de texto para evitar que sea tapado por imágenes con overflow:

- `'top'`: Usa espaciado normal (sin cambios)
- `'all'`: Agrega padding superior extra para separar el texto de la imagen que sobresale hacia abajo
  - **compact**: `pt-6 px-3 pb-3` (en lugar de `p-3`)
  - **default**: `pt-6 px-4 pb-4` (en lugar de `p-4`)
  - **detailed**: `pt-8 px-6 pb-6` (en lugar de `p-6`)
- `'none'`: Usa espaciado original según la variante

#### `getImageContainerClasses(overflow, bgColor)`

Genera las clases para el contenedor de la imagen:

- Maneja el posicionamiento relativo y z-index
- **Eliminado**: Ya no aplica fondo automático (se maneja en el componente Image)

### 🔧 Mejoras en el Componente Image

#### Nueva Variante `overflow`

Se ha agregado una nueva variante al componente Image específicamente para overflow:

```tsx
// Variantes del componente Image
variant: {
  default: 'rounded-md shadow-sm',
  rounded: 'rounded-lg shadow-md',
  circle: 'rounded-full shadow-md',
  square: 'rounded-none shadow-sm',
  bordered: 'rounded-md border-2 border-border shadow-sm',
  overflow: 'rounded-none', // 🆕 Sin shadow ni border para overflow
}
```

**Aplicación automática**: Cuando `$imageOverflow !== 'none'`, el ImageCard usa automáticamente `$variant="overflow"`

#### `$transparent` (Componente Image)

- **Tipo**: `boolean`
- **Valor por defecto**: `false`
- **Descripción**: Controla si la imagen debe tener fondo transparente
- **Uso interno**: El ImageCard la aplica automáticamente cuando hay overflow sin color de fondo

```tsx
// Lógica automática en ImageCard
$transparent={!$imageBgColor && $imageOverflow !== 'none'}
```

### Estilos CSS

```css
/* Overflow superior */
.-mt-4.-mx-2.mb-2.rounded-t-xl.overflow-hidden

/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
/* Overflow completo */
.-m-4.mb-2.rounded-xl.overflow-hidden

/* Contenedor con fondo personalizable */
.relative.z-10;
```

## Stories de Storybook

### 1. `AdvancedImageConfig`

Muestra ejemplos estáticos de las diferentes configuraciones de overflow y fondo.

### 2. `InteractiveAdvanced`

Story interactiva que permite:

- Cambiar el tipo de overflow en tiempo real
- Seleccionar color de fondo con un color picker
- Modificar texto dinámicamente
- Usar el store de Zustand para persistir configuración

## Store Integration

### Nuevos Estados en `useImageCardExamples`

```typescript
// Estados
advancedImageOverflow: 'none' | 'top' | 'all'
advancedImageBgColor: string
overflowExample: string

// Setters
setAdvancedImageOverflow: (value: 'none' | 'top' | 'all') => void
setAdvancedImageBgColor: (value: string) => void
setOverflowExample: (value: string) => void
```

## Ventajas

1. **Flexibilidad Visual**: Permite crear diseños más dinámicos y atractivos
2. **Productos con Transparencia**: Soluciona el problema de productos PNG con fondo transparente
3. **Destacar Productos**: Los productos premium pueden sobresalir visualmente
4. **Personalización de Marca**: Fondos personalizables para mantener coherencia visual
5. **Compatibilidad**: Mantiene retrocompatibilidad total con implementaciones existentes

## Compatibilidad

- ✅ Mantiene todas las funcionalidades existentes
- ✅ Props opcionales con valores por defecto
- ✅ No afecta el comportamiento de componentes existentes
- ✅ Funciona con todos los esquemas de color y tamaños
- ✅ Compatible con badges, overlays y contenido adicional

## Ejemplos de Colores Recomendados

### Productos Tecnológicos

- Fondo oscuro: `#0f172a`, `#1e293b`
- Fondo claro: `#f8fafc`, `#ffffff`

### Productos Gaming

- Fondo neón: `#0f172a` con bordes coloridos
- Gradientes: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

### Productos Premium

- Dorado: `#fbbf24`, `#f59e0b`
- Plateado: `#e5e7eb`, `#d1d5db`

