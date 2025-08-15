# Center Component

El componente `Center` proporciona un sistema de centrado responsivo que utiliza container queries para padding fluido y breakpoints específicos para diferentes dispositivos.

## Características

- **Responsive automático**: Se adapta a móviles, tablets y desktop
- **Container queries**: Utiliza unidades `cqw` para padding fluido
- **Breakpoints optimizados**: Diseñado para anchos específicos por dispositivo
- **Sin JavaScript**: CSS puro para máximo rendimiento
- **Personalizable**: Prop `$custom` para clases adicionales

## Uso Básico

```tsx
import { Center } from 'tailwind-next';

function App() {
  return (
    <Center>
      <div>Tu contenido centrado aquí</div>
    </Center>
  );
}
```

## Breakpoints y Dimensiones

| Dispositivo | Breakpoint     | Max Width | Padding |
| ----------- | -------------- | --------- | ------- |
| Mobile      | < 380px        | 396.8px   | 2cqw    |
| Tablet      | 380px - 1024px | 800px     | 6cqw    |
| Desktop     | > 1024px       | 1500px    | 7cqw    |

## Props

```tsx
interface CenterProps extends BaseProps {
  children: React.ReactNode;
  $custom?: string; // Clases adicionales de Tailwind
}
```

## Ejemplos

### Centrado Básico

```tsx
<Center>
  <h1>Título centrado</h1>
  <p>Contenido que se centra automáticamente.</p>
</Center>
```

### Con Padding Personalizado

```tsx
<Center $custom="py-12">
  <div>Contenido con padding vertical adicional</div>
</Center>
```

### Layout Completo

```tsx
<div className="min-h-screen bg-gray-50">
  <Center>
    <article className="bg-white p-8 rounded-lg shadow">
      <h1>Mi Artículo</h1>
      <p>Contenido del artículo...</p>
    </article>
  </Center>
</div>
```

## Container Queries

El componente utiliza unidades `cqw` (container query width) para el padding:

- **2cqw**: 2% del ancho del contenedor (mobile)
- **6cqw**: 6% del ancho del contenedor (tablet)
- **7cqw**: 7% del ancho del contenedor (desktop)

Esto permite que el padding se ajuste fluidamente al tamaño real del contenedor, no solo al viewport.

## Comparación con Alternatives

### vs. Container Manual

```tsx
// ❌ Configuración manual compleja
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
  {children}
</div>

// ✅ Con Center - Simple y optimizado
<Center>
  {children}
</Center>
```

### vs. CSS Grid/Flexbox

```tsx
// ❌ Centrado básico sin responsividad optimizada
<div className="flex justify-center">
  <div className="max-w-4xl">
    {children}
  </div>
</div>

// ✅ Con Center - Responsividad y padding automáticos
<Center>
  {children}
</Center>
```

## Casos de Uso Comunes

1. **Páginas de contenido**: Blogs, artículos, documentación
2. **Landing pages**: Secciones hero, características, testimonios
3. **Formularios**: Centrado de forms con ancho apropiado
4. **Cards y componentes**: Contenedores de contenido general
5. **Layouts principales**: Wrapper principal de aplicaciones

## Notas de Implementación

- Utiliza `mx-auto` para centrado horizontal
- Los breakpoints están alineados con los estándares de la industria
- Container queries proporcionan mejor control que media queries tradicionales
- Compatible con todos los navegadores modernos
- El padding fluido mejora la legibilidad en todos los dispositivos

## Integración con Otros Componentes

```tsx
import { Center, Container, Text, Button } from 'tailwind-next';

<Center>
  <Container
    $padding="p-8"
    $backgroundColor="bg-white"
    $borderRadius="rounded-lg">
    <Text as="h1" $size="3xl" className="mb-4">
      Título
    </Text>
    <Text className="mb-6">Contenido del artículo...</Text>
    <Button>Acción Principal</Button>
  </Container>
</Center>;
```
