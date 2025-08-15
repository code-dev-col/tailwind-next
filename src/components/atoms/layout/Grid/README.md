# Grid Component

El componente `Grid` proporciona un sistema de grilla responsivo automático que se adapta al contenido y al tamaño de pantalla.

## Características Principales

- **Responsivo automático**: 1 columna en móvil, auto-fit en desktop
- **Ancho adaptable**: Mínimo 230px por columna, máximo 0.9fr
- **Control de tamaño**: Ancho máximo del grid y elementos
- **Alineación flexible**: Control total de justify-content y align-items
- **Compatibilidad dual**: Clases Tailwind y valores CSS personalizados

## Props Principales

| Prop              | Tipo               | Default     | Descripción                        |
| ----------------- | ------------------ | ----------- | ---------------------------------- |
| `$maxGridWidth`   | `string`           | `'1200px'`  | Ancho máximo del contenedor        |
| `$maxItemWidth`   | `string`           | `undefined` | Ancho máximo de cada elemento hijo |
| `$gap`            | `string`           | `'1rem'`    | Espaciado entre elementos          |
| `$justifyContent` | `JustifyContent`   | `'center'`  | Alineación horizontal              |
| `$alignItems`     | `AlignItems`       | `'start'`   | Alineación vertical                |
| `$zIndex`         | `string \| number` | `undefined` | Índice z del grid                  |

## Ejemplo Básico

```tsx
import { Grid, Container, Text, Button } from 'tailwind-next';

<Grid $gap="1.5rem" $maxGridWidth="1200px">
  {products.map((product, i) => (
    <Container
      key={i}
      $backgroundColor="bg-white"
      $padding="p-6"
      $borderRadius="rounded-lg"
      className="shadow-lg">
      <Text as="h3" $weight="bold">
        {product.name}
      </Text>
      <Text $variant="muted">{product.description}</Text>
      <Button $variant="default">Ver más</Button>
    </Container>
  ))}
</Grid>;
```

## Comportamiento Responsivo

### Breakpoints

- **Móvil** (`< 672px`): `grid-template-columns: 1fr`
- **Desktop** (`≥ 672px`): `grid-template-columns: repeat(auto-fit, minmax(min(230px, 80%), 0.9fr))`

### Algoritmo de Columnas

1. **Mínimo**: 230px por columna (o 80% del contenedor si es menor)
2. **Máximo**: 0.9fr para mantener proporciones adecuadas
3. **Auto-fit**: Se crean tantas columnas como quepan en el ancho disponible

## Casos de Uso

### 1. Grid de Productos

```tsx
<Grid $maxGridWidth="1400px" $gap="1.5rem" $maxItemWidth="320px">
  {products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ))}
</Grid>
```

### 2. Grid de Equipo

```tsx
<Grid $maxGridWidth="1000px" $gap="2rem" $maxItemWidth="280px">
  {teamMembers.map((member) => (
    <TeamMemberCard key={member.id} {...member} />
  ))}
</Grid>
```

### 3. Grid de Contenido

```tsx
<Grid $gap="1rem" $justifyContent="start" $alignItems="stretch">
  {articles.map((article) => (
    <ArticleCard key={article.id} {...article} />
  ))}
</Grid>
```

## Configuraciones Avanzadas

### Control de Ancho

```tsx
// Grid compacto
<Grid $maxGridWidth="800px" $maxItemWidth="200px">

// Grid amplio
<Grid $maxGridWidth="1600px" $maxItemWidth="400px">

// Sin límite de ancho
<Grid $maxGridWidth="100%" $maxItemWidth="none">
```

### Espaciado Variable

```tsx
// Espaciado pequeño
<Grid $gap="0.5rem">

// Espaciado Tailwind
<Grid $gap="gap-6">

// Espaciado CSS personalizado
<Grid $gap="2.5rem">
```

### Alineaciones

```tsx
// Centrado (default)
<Grid $justifyContent="center" $alignItems="start">

// Inicio
<Grid $justifyContent="start" $alignItems="start">

// Distribución uniforme
<Grid $justifyContent="evenly" $alignItems="center">

// Altura uniforme
<Grid $alignItems="stretch">
```

## Integración con Otros Componentes

### Con Container

```tsx
<Container $padding="p-6" $backgroundColor="bg-gray-50">
  <Grid $gap="1.5rem">
    <Container $backgroundColor="bg-white" $padding="p-4">
      Contenido 1
    </Container>
    <Container $backgroundColor="bg-white" $padding="p-4">
      Contenido 2
    </Container>
  </Grid>
</Container>
```

### Con Text y Button

```tsx
<Grid $gap="2rem">
  {items.map((item) => (
    <Container key={item.id} $padding="p-6">
      <Text as="h3" $size="lg" $weight="bold">
        {item.title}
      </Text>
      <Text $variant="muted" className="mb-4">
        {item.description}
      </Text>
      <Button $variant="outline">Leer más</Button>
    </Container>
  ))}
</Grid>
```

## Compatibilidad con Tailwind

### Clases Soportadas

```tsx
// Gaps
$gap = 'gap-4'; // → gap-4
$gap = 'gap-8'; // → gap-8

// Anchos máximos
$maxGridWidth = 'max-w-6xl'; // → max-w-6xl
$maxGridWidth = 'max-w-screen-xl'; // → max-w-screen-xl

// Z-index
$zIndex = 'z-10'; // → z-10
$zIndex = 'z-50'; // → z-50
```

### Valores CSS Personalizados

```tsx
// Medidas exactas
$gap = '1.5rem';
$maxGridWidth = '1200px';
$maxItemWidth = '350px';

// Viewport units
$maxGridWidth = '90vw';
$gap = '2vh';

// Calc expressions
$maxItemWidth = 'calc(50% - 1rem)';
```

## Optimización de Performance

### Lazy Loading

```tsx
<Grid $gap="1rem">
  {items.map((item, index) => (
    <LazyWrapper key={item.id} index={index}>
      <ItemCard {...item} />
    </LazyWrapper>
  ))}
</Grid>
```

### Virtualization

```tsx
// Para listas muy largas
<VirtualizedGrid
  items={largeItemList}
  itemHeight={300}
  renderItem={({ item }) => <ItemCard {...item} />}
  gridProps={{ $gap: '1rem', $maxGridWidth: '1200px' }}
/>
```

## Buenas Prácticas

1. **Usa $maxItemWidth** para mantener consistencia en tarjetas
2. **Combina con Container** para espaciado y estilos consistentes
3. **Considera el contenido** al elegir $gap y anchos
4. **Prueba en diferentes pantallas** para verificar responsividad
5. **Usa Tailwind cuando sea posible** para mejor optimización

## Diferencias con GridAreas

| Aspecto           | Grid              | GridAreas             |
| ----------------- | ----------------- | --------------------- |
| **Propósito**     | Grid automático   | Layout específico     |
| **Columnas**      | Auto-fit          | Áreas nombradas       |
| **Responsividad** | Automática        | Manual por breakpoint |
| **Complejidad**   | Simple            | Avanzada              |
| **Uso ideal**     | Listas, catálogos | Layouts complejos     |

## Troubleshooting

### Grid no se adapta correctamente

```tsx
// ❌ Problema: elementos muy anchos
<Grid $maxItemWidth="800px"> // Muy ancho

// ✅ Solución: ancho apropiado
<Grid $maxItemWidth="300px">
```

### Espaciado inconsistente

```tsx
// ❌ Problema: mixing units
<Grid $gap="1rem" className="gap-4"> // Conflicto

// ✅ Solución: una sola fuente
<Grid $gap="gap-4"> // Solo Tailwind
// o
<Grid $gap="1rem">  // Solo CSS
```

### Overflow en móvil

```tsx
// ❌ Problema: contenido fijo muy ancho
<Grid $maxItemWidth="400px"> // No cabe en móvil

// ✅ Solución: responsive o flexible
<Grid $maxItemWidth="min(400px, 90vw)">
```
