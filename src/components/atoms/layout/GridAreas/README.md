# GridAreas Components

Los componentes `GridAreas` y `GridAreasField` proporcionan una implementación avanzada de CSS Grid con soporte para grid-template-areas responsivo.

## GridAreas

Contenedor principal que define las áreas de grid con soporte para diferentes breakpoints.

### Props Principales

- `$areasLg` (obligatorio): Grid areas para pantallas grandes (>64rem)
- `$areasMd` (opcional): Grid areas para pantallas medianas (42rem-63.99rem)
- `$areasSm` (opcional): Grid areas para pantallas pequeñas (<42rem)
- `$columns`: Número o definición de columnas
- `$rows`: Número o definición de filas
- `$gap`: Espacio entre elementos
- `$columnGap`: Espacio entre columnas
- `$rowGap`: Espacio entre filas
- `$justifyContent`: Alineación horizontal del contenido
- `$alignContent`: Alineación vertical del contenido
- `$justifyItems`: Alineación horizontal de elementos
- `$alignItems`: Alineación vertical de elementos

### Ejemplo Básico

```tsx
import { GridAreas, GridAreasField } from 'tailwind-next';

<GridAreas
  $areasLg={`
    "header header header"
    "sidebar main aside"
    "footer footer footer"
  `}
  $areasMd={`
    "header header"
    "main aside"
    "footer footer"
  `}
  $areasSm={`
    "header"
    "main"
    "aside"
    "footer"
  `}
  $columns="auto 1fr auto"
  $gap="gap-4"
  className="min-h-screen">
  <GridAreasField $area="header">Header</GridAreasField>
  <GridAreasField $area="sidebar">Sidebar</GridAreasField>
  <GridAreasField $area="main">Main Content</GridAreasField>
  <GridAreasField $area="aside">Aside</GridAreasField>
  <GridAreasField $area="footer">Footer</GridAreasField>
</GridAreas>;
```

## GridAreasField

Elemento individual que se posiciona en un área específica del grid.

### Props Principales-

- `$area` (obligatorio): Nombre del área donde se posicionará
- `$width`: Ancho del elemento
- `$height`: Alto del elemento
- `$fontSize`: Tamaño de fuente
- `$color`: Color de texto
- `$backgroundColor`: Color de fondo
- `$padding`: Relleno interno
- `$margin`: Margen externo
- `$borderColor`: Color del borde
- `$borderWidth`: Grosor del borde
- `$borderRadius`: Radio de borde
- `$borderStyle`: Estilo del borde (solid, dashed, dotted, double, none)
- `$textAlign`: Alineación del texto

### Ejemplo Avanzado

```tsx
<GridAreasField
  $area="header"
  $backgroundColor="bg-blue-500"
  $color="text-white"
  $padding="p-6"
  $borderRadius="rounded-lg"
  $textAlign="center"
  $fontSize="text-2xl">
  Header Content
</GridAreasField>
```

## Breakpoints Responsivos

Los componentes utilizan los siguientes breakpoints:

- **Desktop**: `>64rem` (1024px+) - Usa `$areasLg`
- **Tablet**: `42rem-63.99rem` (672px-1023px) - Usa `$areasMd`
- **Mobile**: `<42rem` (671px-) - Usa `$areasSm`

## Casos de Uso Comunes

### 1. Layout de Dashboard

```tsx
<GridAreas
  $areasLg={`
    "nav header header"
    "nav main sidebar"
    "nav footer footer"
  `}
  $columns="250px 1fr 300px"
  $rows="auto 1fr auto"
  $gap="gap-4">
  <GridAreasField $area="nav">Navigation</GridAreasField>
  <GridAreasField $area="header">Header</GridAreasField>
  <GridAreasField $area="main">Main Content</GridAreasField>
  <GridAreasField $area="sidebar">Sidebar</GridAreasField>
  <GridAreasField $area="footer">Footer</GridAreasField>
</GridAreas>
```

### 2. Layout de Revista

```tsx
<GridAreas
  $areasLg={`
    "hero hero hero"
    "article1 article2 ads"
    "article3 article3 ads"
  `}
  $columns="1fr 1fr 300px"
  $gap="gap-6">
  <GridAreasField $area="hero">Hero Article</GridAreasField>
  <GridAreasField $area="article1">Article 1</GridAreasField>
  <GridAreasField $area="article2">Article 2</GridAreasField>
  <GridAreasField $area="article3">Featured Article</GridAreasField>
  <GridAreasField $area="ads">Advertisement</GridAreasField>
</GridAreas>
```

### 3. Tarjeta de Perfil

```tsx
<GridAreas
  $areasLg={`
    "avatar name"
    "avatar email"
    "bio bio"
    "stats stats"
  `}
  $columns="80px 1fr"
  $gap="gap-4"
  className="bg-white p-6 rounded-xl shadow-lg">
  <GridAreasField
    $area="avatar"
    $backgroundColor="bg-blue-500"
    $borderRadius="rounded-full"
    $width="80px"
    $height="80px">
    Avatar
  </GridAreasField>
  <GridAreasField $area="name">John Doe</GridAreasField>
  <GridAreasField $area="email">john@example.com</GridAreasField>
  <GridAreasField $area="bio">Bio description...</GridAreasField>
  <GridAreasField $area="stats">Statistics</GridAreasField>
</GridAreas>
```

## Integración con Tailwind

Los componentes soportan tanto clases de Tailwind como valores CSS personalizados:

```tsx
// Tailwind classes
<GridAreasField
  $backgroundColor="bg-blue-500"
  $padding="p-4"
  $borderRadius="rounded-lg"
/>

// CSS custom values
<GridAreasField
  $backgroundColor="#3b82f6"
  $padding="1rem"
  $borderRadius="8px"
/>

// Mixed usage
<GridAreasField
  $backgroundColor="bg-gradient-to-r from-blue-500 to-purple-600"
  $padding="1.5rem"
  $borderRadius="rounded-xl"
/>
```

## Buenas Prácticas

1. **Define áreas responsivas**: Siempre proporciona al menos `$areasLg` y considera `$areasMd` y `$areasSm` para una mejor experiencia móvil.

2. **Usa nombres descriptivos**: Utiliza nombres de área claros como "header", "main", "sidebar" en lugar de "area1", "area2".

3. **Consistencia en breakpoints**: Mantén la misma estructura de áreas entre breakpoints cuando sea posible.

4. **Combina con Tailwind**: Aprovecha las clases de Tailwind para estilos adicionales usando la prop `className`.

5. **Gradientes y sombras**: Utiliza los gradientes predefinidos de la librería y `shadow-sm` por defecto en elementos interactivos.
