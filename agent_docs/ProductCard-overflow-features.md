# ProductCard - Funcionalidad de Overflow de Imagen

## 📋 Resumen

El componente **ProductCard** ahora incluye la misma funcionalidad avanzada de overflow de imagen que **ImageCard**, permitiendo que las imágenes de productos sobresalgan del contenedor para crear efectos visuales impactantes y llamar la atención en productos destacados.

## 🎯 Casos de Uso Específicos

### E-commerce y Retail

- **Productos destacados**: Usar `$imageOverflow="top"` para productos recomendados
- **Ofertas especiales**: Combinar `$imageOverflow="all"` con badges de descuento
- **Productos premium**: Overflow completo para artículos de alta gama
- **Lanzamientos nuevos**: Destacar productos recién llegados
- **Productos agotándose**: Crear urgencia visual con overflow

### Marketing y Promociones

- **Black Friday / Cyber Monday**: Overflow + badges llamativos
- **Liquidaciones**: Overflow + precios tachados prominentes
- **Productos exclusivos**: Overflow + marca premium
- **Ediciones limitadas**: Overflow + contador de stock

## 🔧 Nuevas Props Agregadas

```tsx
interface ProductCardProps {
  // ... props existentes ...

  // Configuración avanzada de imagen (nueva funcionalidad)
  $imageOverflow?: 'none' | 'top' | 'all'; // Permite que la imagen sobresalga
  $imageBgColor?: string; // Color de fondo personalizable para transparencias
}
```

#### Opciones

- `'none'`: Sin overflow, comportamiento normal (imagen contenida, `object-fit: cover`)
- `'top'`: La imagen sobresale por la parte superior del contenedor y se **escala 3%** más grande (`object-fit: contain` automático)
- `'all'`: La imagen sobresale por todos los lados del contenedor y se **escala 10%** más grande (`object-fit: contain` automático)

### 🔍 Comportamiento Automático de Object-Fit

Para productos con overflow, el componente automáticamente cambia a `object-fit: contain` para mostrar el producto completo sin recortes, ideal para e-commerce:

- **Sin overflow** (`$imageOverflow="none"`): Usa `object-fit: cover` por defecto
- **Con overflow** (`$imageOverflow="top"` o `$imageOverflow="all"`): Usa `object-fit: contain` automáticamente
- **Razón**: Los clientes necesitan ver el producto completo para tomar decisiones de compra informadas

### `$imageBgColor`

Color de fondo opcional para imágenes con transparencia:

- **`undefined`** (por defecto): Fondo transparente cuando hay overflow
- **Color CSS válido**: Aplica el color especificado como fondo

## 📚 Ejemplos de Uso

### 1. Producto Destacado (Overflow Superior)

```tsx
<ProductCard
  title="iPhone 15 Pro"
  price="120000"
  originalPrice="130000"
  imageUrl="/src/assets/image-example.png"
  category="Smartphones"
  rating={4.9}
  isNew={true}
  $imageOverflow="top"
  $imageBgColor="#1a1a1a"
  onAddToCart={() => console.log('Agregado al carrito')}
/>
```

### 2. Oferta Especial (Overflow Completo)

```tsx
<ProductCard
  title="MacBook Pro M3"
  price="250000"
  originalPrice="300000"
  imageUrl="/src/assets/image-example.png"
  category="Computadoras"
  discount="-17%"
  $imageOverflow="all"
  $colorScheme="accent"
  $showActions={true}
  onAddToCart={() => console.log('¡Oferta agregada!')}
/>
```

### 3. Producto Premium con Fondo Personalizado

```tsx
<ProductCard
  title="Apple Watch Ultra"
  price="89000"
  imageUrl="/src/assets/image-example.png"
  category="Wearables"
  rating={5.0}
  reviewCount={342}
  $imageOverflow="all"
  $imageBgColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  $variant="detailed"
/>
```

### 4. Grid de Productos con Overflow Mixto

```tsx
<Grid $cols="3" $gap="gap-6">
  {productos.map((producto, index) => (
    <ProductCard
      key={producto.id}
      {...producto}
      $imageOverflow={
        producto.destacado ? 'all' : producto.nuevo ? 'top' : 'none'
      }
      $colorScheme={producto.destacado ? 'accent' : 'default'}
    />
  ))}
</Grid>
```

## 🎨 Implementación Técnica

### Arquitectura Heredada de ImageCard

ProductCard utiliza exactamente las mismas funciones auxiliares que ImageCard:

#### `getMainContainerClasses(overflow)`

- `'top'`: Aplica `pt-6` (espacio superior para imagen escalada 3%)
- `'all'`: Aplica `py-6` (espacio vertical para imagen escalada 10%, centrada)
- `'none'`: Sin espaciado adicional

#### `getImageOverflowClasses(overflow)`

- `'top'`: `-mt-6 mb-2 rounded-t-xl overflow-hidden relative z-10 scale-[1.03] bg-transparent`
- `'all'`: `-my-6 rounded-xl overflow-hidden relative z-10 scale-110 bg-transparent`
- `'none'`: Sin clases adicionales

#### `getContentSpacing(overflow, variant)`

Espaciado inteligente del contenido del producto:

- `'all'`: Padding superior aumentado para evitar solapamiento
  - **compact**: `pt-10 px-3 pb-3`
  - **default**: `pt-10 px-4 pb-4`
  - **detailed**: `pt-12 px-5 pb-5`
- `'top'` y `'none'`: Espaciado normal según variante

### Integración con Image Component

```tsx
<Image
  $variant={$imageOverflow !== 'none' ? 'overflow' : 'default'}
  $transparent={!$imageBgColor && $imageOverflow !== 'none'}
  className={cn(
    'transition-transform duration-300',
    $imageOverflow === 'none' && 'group-hover:scale-105',
    getImageOverflowClasses($imageOverflow)
  )}
/>
```

### Compatibilidad con Funciones Existentes

- ✅ **Hover effects**: Se mantienen cuando no hay overflow
- ✅ **Badges**: Posicionados correctamente con overflow
- ✅ **Acciones**: Overlay de botones respeta el overflow
- ✅ **Rating y precio**: Espaciado inteligente evita solapamiento
- ✅ **Responsive**: Funciona en todos los tamaños de pantalla

## 🛠️ Casos de Integración

### Con Sistema de Favoritos

```tsx
const [favoritos, setFavoritos] = useState<string[]>([]);

<ProductCard
  title="Producto Especial"
  price="45000"
  $imageOverflow="top"
  isFavorite={favoritos.includes(producto.id)}
  onToggleFavorite={() => {
    setFavoritos((prev) =>
      prev.includes(producto.id)
        ? prev.filter((id) => id !== producto.id)
        : [...prev, producto.id]
    );
  }}
/>;
```

### Con Carrito de Compras

```tsx
const { agregarAlCarrito } = useCarrito();

<ProductCard
  title="Producto Premium"
  price="89000"
  $imageOverflow="all"
  $imageBgColor="#2563eb"
  onAddToCart={() => {
    agregarAlCarrito({
      id: producto.id,
      titulo: producto.titulo,
      precio: producto.precio,
      imagen: producto.imageUrl,
    });
    toast.success('¡Producto agregado al carrito!');
  }}
/>;
```

### Con Estado de Carga

```tsx
const [cargando, setCargando] = useState(false);

<ProductCard
  title="Producto"
  price="25000"
  $imageOverflow="top"
  onAddToCart={async () => {
    setCargando(true);
    try {
      await api.agregarAlCarrito(producto.id);
      toast.success('¡Agregado exitosamente!');
    } catch (error) {
      toast.error('Error al agregar producto');
    } finally {
      setCargando(false);
    }
  }}
/>;
```

## 🎯 Mejores Prácticas

### Cuándo Usar Overflow

✅ **Usar overflow cuando:**

- Productos destacados o premium
- Ofertas especiales limitadas
- Lanzamientos de productos nuevos
- Items con descuentos significativos
- Productos con stock limitado

❌ **Evitar overflow cuando:**

- Grids con muchos productos (crear ruido visual)
- Productos estándar sin características especiales
- Layouts muy densos con poco espacio
- Pantallas pequeñas con espacio limitado

### Combinaciones Recomendadas

```tsx
// Producto destacado con fondo
<ProductCard
  $imageOverflow="top"
  $imageBgColor="#1e40af"
  $colorScheme="primary"
/>

// Oferta especial completa
<ProductCard
  $imageOverflow="all"
  discount="-50%"
  $colorScheme="destructive"
/>

// Producto premium elegante
<ProductCard
  $imageOverflow="all"
  $variant="detailed"
  $colorScheme="accent"
/>
```

## 🚀 Beneficios del Overflow en ProductCard

1. **Atención Visual**: Productos destacados llaman más la atención
2. **Jerarquía Clara**: Diferenciación entre productos normales y especiales
3. **Experiencia Premium**: Sensación de exclusividad y calidad
4. **Conversiones Mejoradas**: Productos destacados tienen mayor tasa de click
5. **Flexibilidad Comercial**: Herramienta poderosa para estrategias de marketing
6. **Consistencia**: Misma funcionalidad que ImageCard para coherencia del sistema

## 🔧 Mejoras Técnicas Recientes

### Overlay y Z-Index Corregidos

- **Problema resuelto**: El overlay ahora aparece **por encima** de las imágenes con overflow
- **Z-Index optimizado**:
  - Imagen con overflow: `z-10`
  - Overlay de acciones: `z-20`
  - Badges y botones: `z-30`
- **Resultado**: Todos los elementos interactivos son accesibles incluso con overflow activo

### Bordes Redondeados Adaptativos

- **Automático**: El overlay hereda los bordes redondeados según el estado de overflow
  - Sin overflow: `rounded-lg` (bordes normales del ProductCard)
  - Overflow superior: `rounded-t-xl` (solo bordes superiores redondeados)
  - Overflow completo: `rounded-xl` (bordes completos redondeados)
- **Consistencia visual**: El overlay mantiene la forma del contenedor en todos los estados

### Object-Fit Inteligente

- **Sin overflow**: `object-fit: cover` (comportamiento normal)
- **Con overflow**: `object-fit: contain` (muestra el producto completo)
- **Beneficio**: Los productos nunca se recortan cuando están destacados

---

**La funcionalidad de overflow en ProductCard eleva la experiencia de e-commerce al siguiente nivel, proporcionando herramientas visuales poderosas para destacar productos y impulsar conversiones.** 🛒✨

