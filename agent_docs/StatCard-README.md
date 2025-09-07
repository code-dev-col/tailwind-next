# StatCard - Molecule

**StatCard** es una molecule que combina múltiples atoms para mostrar estadísticas de manera visual y atractiva. Perfecta para dashboards, KPIs y métricas de rendimiento.

## 🎯 Propósito

StatCard está diseñado para mostrar datos estadísticos de forma clara y comprensible, combinando:

- **Valores numéricos** principales
- **Tendencias** con iconografía visual
- **Medidores** para progreso/completion
- **Badges** para estados
- **Interactividad** opcional

## 🧩 Atoms Utilizados

### Layout Atoms

- **Container**: Contenedor principal y organización interna
- **Grid**: Layout de columnas cuando es necesario
- **Center**: Centrado de elementos
- **Separator**: Divisores visuales en variante detailed

### Display Atoms

- **Text**: Títulos, valores, descripciones y labels
- **Icon**: Iconografía para contexto visual y tendencias

### Feedback Atoms

- **Badge**: Estados y etiquetas informativas
- **Meter**: Progreso visual con el elemento HTML `<meter>`

### Forms Atoms

- **Button**: Acciones opcionales (variante detailed)

## 📋 Props

### Props Principales

```typescript
interface StatCardProps {
  // Sistema de colores
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';

  // Tamaños y variantes
  $size?: 'sm' | 'default' | 'lg';
  $variant?: 'default' | 'compact' | 'detailed' | 'minimal';

  // Contenido principal
  title?: string;
  value?: string | number;
  subtitle?: string;
  description?: string;

  // Iconografía
  icon?: IconType; // from react-icons

  // Tendencias
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;

  // Meter configuration
  $showMeter?: boolean;
  meterValue?: number;
  meterMax?: number;
  meterOptimum?: number;

  // Badge configuration
  $showBadge?: boolean;
  badgeText?: string;

  // Interactividad
  $interactive?: boolean;
  onClick?: () => void;
  onActionClick?: () => void; // Para variante detailed

  // Store integration
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;
}
```

## 🎨 Variantes

### **default**

- Layout estándar con espacio balanceado
- Muestra: título, valor, tendencia, descripción opcional
- Ideal para: Dashboards ejecutivos

### **compact**

- Diseño más compacto con menor espaciado
- Enfoque en valor principal y tendencia
- Ideal para: Widgets pequeños, sidebars

### **detailed**

- Layout expandido con toda la información
- Incluye botón de acción adicional
- Separadores visuales para organización
- Ideal para: Análisis detallados, reportes

### **minimal**

- Solo información esencial
- Diseño ultra-limpio
- Ideal para: Interfaces minimalistas

## 📏 Tamaños

### **sm** (Pequeño)

- Texto y métricas reducidas
- Iconos pequeños
- Ideal para: Grids de muchas métricas

### **default** (Estándar)

- Tamaño balanceado para la mayoría de casos
- Legibilidad óptima

### **lg** (Grande)

- Texto y valores destacados
- Mayor impacto visual
- Ideal para: KPIs principales

## 🎨 Esquemas de Color

Todos los esquemas utilizan las variables CSS de `theme.css`:

- **default**: Azul principal del sistema
- **secondary**: Azul cielo más suave
- **accent**: Azul claro para acentos
- **destructive**: Rojo para alertas/problemas
- **muted**: Grises para información secundaria
- **minimal**: Transparente con bordes sutiles

## 📊 Características Especiales

### **Tendencias Automáticas**

```tsx
<StatCard
  title="Ventas"
  value="₡2,450,000"
  trend="up" // Icono automático: FiTrendingUp
  trendValue="+12.5%" // Color automático: verde
/>
```

### **Meter Integration**

```tsx
<StatCard
  title="Progreso Meta"
  value="₡2,450,000"
  $showMeter
  meterValue={75} // 75%
  meterMax={100} // de 100
  meterOptimum={80} // Óptimo en 80
/>
```

### **Badge States**

```tsx
<StatCard
  title="Estado Sistema"
  value="98.7%"
  $showBadge
  badgeText="Operacional"
  $colorScheme="success"
/>
```

### **Interactive Cards**

```tsx
<StatCard
  title="Ver Detalles"
  value="₡2,450,000"
  $interactive
  onClick={() => navigateToDetails()}
  $variant="detailed"
  onActionClick={() => openModal()}
/>
```

## 🏪 Store Integration

### Patrón storeKey

```tsx
// Store definition
const useStatsStore = create((set) => ({
  revenue: {
    title: 'Ingresos',
    value: '₡2,450,000',
    trend: 'up',
    trendValue: '+12.5%',
  },
}));

// Component usage
<StatCard $store={useStatsStore} storeKey="revenue" />;
```

### Datos en Tiempo Real

```tsx
const RealTimeStats = () => {
  const { toggleSimulation, isSimulating } = useStatCardExamples();

  return (
    <div>
      <button onClick={toggleSimulation}>
        {isSimulating ? 'Detener' : 'Iniciar'} Simulación
      </button>

      <StatCard $store={useStatCardExamples} storeKey="revenueExample" />
    </div>
  );
};
```

## 🏗️ Casos de Uso Comunes

### **Dashboard Ejecutivo**

```tsx
<div className="grid grid-cols-4 gap-4">
  <StatCard title="Ingresos" value="₡8.9M" $size="sm" $variant="compact" />
  <StatCard title="Usuarios" value="12.4K" $size="sm" $variant="compact" />
  <StatCard title="Conversión" value="24.8%" $size="sm" $variant="compact" />
  <StatCard title="Pedidos" value="3.2K" $size="sm" $variant="compact" />
</div>
```

### **KPI Principal**

```tsx
<StatCard
  title="Ingresos Mensuales"
  value="₡2,450,000"
  subtitle="Meta: ₡2,000,000"
  description="Superamos la meta por 4to mes consecutivo"
  icon={FiDollarSign}
  trend="up"
  trendValue="+22.5%"
  $size="lg"
  $variant="detailed"
  $showMeter
  meterValue={122.5}
  meterMax={100}
  meterOptimum={100}
  $showBadge
  badgeText="Meta Superada"
  $colorScheme="default"
  onActionClick={() => openDetailsModal()}
/>
```

### **Sistema de Monitoreo**

```tsx
<div className="grid grid-cols-2 gap-4">
  <StatCard
    title="CPU Usage"
    value="45.2%"
    $showMeter
    meterValue={45.2}
    meterOptimum={70}
    $colorScheme="accent"
  />
  <StatCard
    title="Memory"
    value="78.9%"
    $showMeter
    meterValue={78.9}
    meterOptimum={80}
    $colorScheme="warning"
  />
</div>
```

### **E-commerce Metrics**

```tsx
<div className="space-y-4">
  <StatCard
    title="Conversión de Ventas"
    value="24.8%"
    subtitle="Últimos 30 días"
    icon={FiTarget}
    trend="up"
    trendValue="+4.1%"
    $showMeter
    meterValue={24.8}
    meterMax={30}
    meterOptimum={25}
    $showBadge
    badgeText="Cerca del objetivo"
    $colorScheme="accent"
  />

  <StatCard
    title="Abandono de Carrito"
    value="68.3%"
    subtitle="Promedio industria: 70%"
    icon={FiShoppingCart}
    trend="down"
    trendValue="-2.1%"
    $showMeter
    meterValue={68.3}
    meterMax={100}
    meterOptimum={50}
    $colorScheme="destructive"
  />
</div>
```

## 🎯 Mejores Prácticas

### **Iconografía Consistente**

- Usa iconos de react-icons/fi para consistencia
- Un icono por concepto (dinero, usuarios, rendimiento)
- Colores automáticos basados en $colorScheme

### **Tendencias Claras**

- `up`: Verde automático con FiTrendingUp
- `down`: Rojo automático con FiTrendingDown
- `neutral`: Gris con FiMinus

### **Meter Usage**

- Para porcentajes y progreso hacia metas
- `optimum` define el valor ideal para colores semánticos
- Combina con badges para contexto adicional

### **Responsive Design**

```tsx
// Mobile: Stack vertical
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
  <StatCard $size="sm" $variant="compact" />
</div>
```

### **Accesibilidad**

- Titles descriptivos para screen readers
- Colores semánticos con suficiente contraste
- Elementos interactivos con feedback visual

## 🔄 Estados Interactivos

### **Hover States**

- Sombra elevada automática
- Transformación sutil con hover:border-primary
- Cursor pointer cuando $interactive=true

### **Loading States**

```tsx
<StatCard
  title="Cargando..."
  value="---"
  $colorScheme="muted"
  // Combinar con Skeleton para loading
/>
```

### **Error States**

```tsx
<StatCard
  title="Error de Conexión"
  value="N/A"
  $colorScheme="destructive"
  $showBadge
  badgeText="Error"
  trend="down"
  trendValue="Sin datos"
/>
```

## 🎨 Customización Avanzada

### **$custom Classes**

```tsx
<StatCard
  title="Custom Style"
  value="₡2,450,000"
  $custom="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none"
  $colorScheme="custom"
/>
```

### **Layout Personalizado**

El StatCard se adapta automáticamente al contenido:

- Sin meter: Layout más compacto
- Sin badge: Aprovecha el espacio
- Sin descripción: Reduce altura
- Variant minimal: Solo esenciales

## 📦 Exportación

```typescript
export { StatCard, type StatCardProps } from '@code-dev-col/tailwind-next';
```

---

**StatCard** es perfecto para dashboards modernos, proporcionando toda la flexibilidad necesaria para mostrar métricas de negocio de forma atractiva y funcional. Su integración con el sistema de design tokens garantiza consistencia visual en toda la aplicación.

