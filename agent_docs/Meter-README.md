# Meter Atom

## 📋 Descripción

`Meter` es un componente atom basado en el elemento HTML `<meter>` que representa un valor escalar dentro de un rango conocido o un valor fraccionario. Es ideal para mostrar niveles, scores, progreso de tareas, métricas, porcentajes de uso y cualquier valor que necesite representación visual dentro de un rango específico.

## 🎯 Características Principales

### ✅ Funcionalidades Core

- **Elemento HTML nativo** - Basado en `<meter>` con accesibilidad integrada
- **Integración Zustand** - Manejo de estado robusto con patrón storeKey
- **Valores semánticos** - Soporte para low, high, optimum según estándar HTML
- **Estados automáticos** - Colores adaptativos según valor (optimum/suboptimum/even-less-good)
- **Formateo flexible** - Formatter personalizado, prefijos, sufijos, porcentajes
- **Layouts múltiples** - Posicionamiento de labels en 4 direcciones

### 🎨 Variantes de Diseño

- **`default`** - Apariencia estándar con bordes redondeados
- **`thin`** - Versión delgada para espacios reducidos
- **`thick`** - Versión gruesa para mayor visibilidad
- **`rounded`** - Bordes más redondeados
- **`pill`** - Forma de píldora completamente redondeada

### 📏 Tamaños

- **`xs`** - 4px de altura - Para indicadores mínimos
- **`sm`** - 8px de altura - Para interfaces compactas
- **`default`** - 12px de altura - Tamaño estándar
- **`lg`** - 16px de altura - Para mejor visibilidad
- **`xl`** - 24px de altura - Para dashboards prominentes

### 🎨 Esquemas de Color

- **`default`**, **`secondary`**, **`accent`**, **`destructive`**, **`muted`**, **`minimal`**, **`custom`**

## 📚 Casos de Uso

### 📊 Métricas y KPIs

```tsx
<Meter
  value={85}
  min={0}
  max={100}
  label="Rendimiento del Sistema"
  showPercentage={true}
  $colorScheme="default"
  optimum={90}
  high={75}
  low={50}
/>
```

### 🎯 Scores y Ratings

```tsx
<Meter
  value={4.2}
  min={0}
  max={5}
  label="Calificación Promedio"
  showValue={true}
  suffix=" estrellas"
  $colorScheme="accent"
  optimum={4.5}
/>
```

### 💾 Uso de Almacenamiento

```tsx
<Meter
  value={750}
  min={0}
  max={1000}
  label="Espacio en Disco"
  showValue={true}
  suffix=" GB"
  prefix="Usado: "
  $colorScheme="destructive"
  high={800}
  optimum={0}
/>
```

### 📈 Progreso de Tareas

```tsx
<Meter
  value={12}
  min={0}
  max={20}
  label="Tareas Completadas"
  showValue={true}
  suffix="/20"
  $colorScheme="secondary"
  $variant="thick"
  optimum={20}
/>
```

### 🔋 Nivel de Batería

```tsx
<Meter
  value={35}
  min={0}
  max={100}
  label="Batería"
  showPercentage={true}
  $colorScheme="destructive"
  low={20}
  high={80}
  optimum={100}
/>
```

## 🔧 API Completa

### Props Principales

```tsx
interface MeterProps {
  // Configuración visual
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'accent'
    | 'destructive'
    | 'muted'
    | 'minimal'
    | 'custom';
  $size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  $variant?: 'default' | 'thin' | 'thick' | 'rounded' | 'pill';
  $custom?: string;

  // Store integration
  $store?: UseBoundStore<StoreApi<T>>;
  valueStoreKey?: keyof T;
  minStoreKey?: keyof T;
  maxStoreKey?: keyof T;

  // Atributos del elemento meter (HTML Standard)
  value?: number;
  min?: number;
  max?: number;
  low?: number; // Valor bajo del rango
  high?: number; // Valor alto del rango
  optimum?: number; // Valor óptimo

  // Props de presentación
  label?: string;
  showValue?: boolean;
  showPercentage?: boolean;
  suffix?: string;
  prefix?: string;
  formatter?: (value: number) => string;

  // Configuración visual
  showLabels?: boolean;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right' | 'none';
  animateOnMount?: boolean;
  hideNativeAppearance?: boolean;
}
```

## 🏪 Integración con Store (Zustand)

### Crear Store de Métricas

```tsx
// stores/metrics.store.ts
import { create } from 'zustand';

interface MetricsState {
  // Métricas del sistema
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;

  // Métricas de usuario
  userScore: number;
  completionRate: number;
  satisfactionLevel: number;

  // Configuración de rangos
  cpuMax: number;
  memoryMax: number;
  diskMax: number;

  // Setters
  setCpuUsage: (value: number) => void;
  setMemoryUsage: (value: number) => void;
  setDiskUsage: (value: number) => void;
  setNetworkLatency: (value: number) => void;
  setUserScore: (value: number) => void;
  setCompletionRate: (value: number) => void;

  // Utilidades
  updateSystemMetrics: () => void;
  resetMetrics: () => void;
  simulateMetrics: () => void;
}

export const useMetrics = create<MetricsState>((set, get) => ({
  // Estados iniciales
  cpuUsage: 45,
  memoryUsage: 62,
  diskUsage: 78,
  networkLatency: 23,
  userScore: 8.5,
  completionRate: 85,
  satisfactionLevel: 4.2,
  cpuMax: 100,
  memoryMax: 100,
  diskMax: 100,

  // Setters
  setCpuUsage: (value) => set({ cpuUsage: value }),
  setMemoryUsage: (value) => set({ memoryUsage: value }),
  setDiskUsage: (value) => set({ diskUsage: value }),
  setNetworkLatency: (value) => set({ networkLatency: value }),
  setUserScore: (value) => set({ userScore: value }),
  setCompletionRate: (value) => set({ completionRate: value }),

  // Utilidades
  updateSystemMetrics: () => {
    set({
      cpuUsage: Math.floor(Math.random() * 100),
      memoryUsage: Math.floor(Math.random() * 100),
      diskUsage: Math.floor(Math.random() * 100),
      networkLatency: Math.floor(Math.random() * 100),
    });
  },

  resetMetrics: () => {
    set({
      cpuUsage: 0,
      memoryUsage: 0,
      diskUsage: 0,
      networkLatency: 0,
      userScore: 0,
      completionRate: 0,
      satisfactionLevel: 0,
    });
  },

  simulateMetrics: () => {
    const metrics = get();
    set({
      cpuUsage: Math.min(
        100,
        Math.max(0, metrics.cpuUsage + (Math.random() - 0.5) * 20)
      ),
      memoryUsage: Math.min(
        100,
        Math.max(0, metrics.memoryUsage + (Math.random() - 0.5) * 15)
      ),
      diskUsage: Math.min(
        100,
        Math.max(0, metrics.diskUsage + (Math.random() - 0.5) * 5)
      ),
    });
  },
}));
```

### Usar Store con Meter

```tsx
import { useMetrics } from './stores/metrics.store';

function SystemDashboard() {
  const metricsStore = useMetrics();

  return (
    <div className="grid grid-cols-2 gap-6">
      <Meter
        $store={useMetrics}
        valueStoreKey="cpuUsage"
        maxStoreKey="cpuMax"
        label="Uso de CPU"
        showPercentage={true}
        $colorScheme="default"
        high={80}
        optimum={0}
        low={60}
      />

      <Meter
        $store={useMetrics}
        valueStoreKey="memoryUsage"
        label="Memoria RAM"
        showPercentage={true}
        $colorScheme="secondary"
        high={85}
        optimum={0}
      />

      <Meter
        $store={useMetrics}
        valueStoreKey="diskUsage"
        label="Almacenamiento"
        showPercentage={true}
        $colorScheme="destructive"
        high={90}
        optimum={0}
      />

      <Meter
        value={metricsStore.userScore}
        min={0}
        max={10}
        label="Puntuación Usuario"
        showValue={true}
        suffix="/10"
        $colorScheme="accent"
        optimum={9}
        high={7}
        low={5}
      />
    </div>
  );
}
```

## 🎨 Estados Semánticos del Meter

### Configuración de Valores Óptimos

El elemento `<meter>` tiene tres estados visuales automáticos basados en los valores `low`, `high` y `optimum`:

#### **Optimum State** (Verde/Primary)

```tsx
// Valor dentro del rango óptimo
<Meter
  value={95}
  min={0}
  max={100}
  low={60}
  high={80}
  optimum={90} // Valor óptimo alto
  $colorScheme="default"
/>
```

#### **Suboptimum State** (Amarillo/Warning)

```tsx
// Valor fuera del rango óptimo pero aceptable
<Meter
  value={70}
  min={0}
  max={100}
  low={60}
  high={80}
  optimum={90} // Valor está entre low-high pero no es óptimo
  $colorScheme="default"
/>
```

#### **Even Less Good State** (Rojo/Destructive)

```tsx
// Valor crítico fuera de rangos aceptables
<Meter
  value={30}
  min={0}
  max={100}
  low={60}
  high={80}
  optimum={90} // Valor por debajo de low
  $colorScheme="destructive"
/>
```

## 🎨 Personalización Avanzada

### Formatter Personalizado

```tsx
const formatBytes = (bytes: number): string => {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

<Meter
  value={2147483648} // 2GB en bytes
  min={0}
  max={4294967296} // 4GB en bytes
  label="Uso de Memoria"
  formatter={formatBytes}
  showValue={true}
/>;
```

### Layouts Avanzados

```tsx
// Layout horizontal con label a la izquierda
<Meter
  value={75}
  label="Progreso"
  showPercentage={true}
  labelPosition="left"
  $variant="pill"
  className="w-full"
/>

// Layout vertical con valores arriba y abajo
<Meter
  value={42}
  label="Nivel Actual"
  showValue={true}
  suffix=" puntos"
  labelPosition="top"
  $size="lg"
  $variant="rounded"
/>
```

### Custom Styling

```tsx
<Meter
  value={68}
  label="Métrica Custom"
  showPercentage={true}
  $custom="bg-gradient-to-r from-blue-500 to-purple-600"
  className="shadow-lg"
  $variant="thick"
/>
```

## 🔄 Patrones Comunes

### Dashboard de Métricas

```tsx
const MetricsDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Performance Metrics */}
      <div className="space-y-4">
        <h3 className="font-semibold">Sistema</h3>

        <Meter
          value={45}
          label="CPU"
          showPercentage={true}
          $colorScheme="default"
          high={80}
          optimum={0}
          $size="sm"
        />

        <Meter
          value={67}
          label="RAM"
          showPercentage={true}
          $colorScheme="secondary"
          high={85}
          optimum={0}
          $size="sm"
        />

        <Meter
          value={23}
          label="Red"
          showValue={true}
          suffix=" ms"
          $colorScheme="accent"
          low={50}
          optimum={0}
          $size="sm"
        />
      </div>

      {/* User Metrics */}
      <div className="space-y-4">
        <h3 className="font-semibold">Usuarios</h3>

        <Meter
          value={1247}
          min={0}
          max={2000}
          label="Activos"
          showValue={true}
          $colorScheme="default"
          optimum={2000}
          $size="sm"
        />

        <Meter
          value={4.2}
          min={1}
          max={5}
          label="Satisfacción"
          showValue={true}
          suffix="★"
          $colorScheme="accent"
          optimum={5}
          high={4}
          $size="sm"
        />
      </div>
    </div>
  );
};
```

### Progress Tracker

```tsx
const ProjectProgress = () => {
  const tasks = [
    { name: 'Backend API', completed: 8, total: 10, priority: 'high' },
    { name: 'Frontend UI', completed: 15, total: 20, priority: 'medium' },
    { name: 'Testing', completed: 3, total: 12, priority: 'low' },
    { name: 'Documentation', completed: 5, total: 8, priority: 'medium' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Progreso del Proyecto</h2>

      {tasks.map((task, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <Meter
            value={task.completed}
            min={0}
            max={task.total}
            label={task.name}
            showValue={true}
            suffix={`/${task.total}`}
            labelPosition="top"
            $colorScheme={
              task.priority === 'high'
                ? 'destructive'
                : task.priority === 'medium'
                ? 'secondary'
                : 'muted'
            }
            $variant="rounded"
            $size="lg"
            optimum={task.total}
            high={task.total * 0.8}
            low={task.total * 0.5}
          />
        </div>
      ))}
    </div>
  );
};
```

### Battery/Health Indicators

```tsx
const HealthIndicators = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Batería */}
      <div className="text-center">
        <Meter
          value={35}
          min={0}
          max={100}
          label="Batería"
          showPercentage={true}
          $colorScheme="destructive"
          low={20}
          high={80}
          optimum={100}
          $variant="pill"
          $size="lg"
          labelPosition="bottom"
        />
      </div>

      {/* Señal WiFi */}
      <div className="text-center">
        <Meter
          value={82}
          min={0}
          max={100}
          label="WiFi"
          showPercentage={true}
          $colorScheme="secondary"
          low={30}
          high={70}
          optimum={90}
          $variant="pill"
          $size="lg"
          labelPosition="bottom"
        />
      </div>

      {/* Temperatura */}
      <div className="text-center">
        <Meter
          value={45}
          min={0}
          max={100}
          label="Temperatura"
          showValue={true}
          suffix="°C"
          $colorScheme="accent"
          low={70}
          high={85}
          optimum={40}
          $variant="pill"
          $size="lg"
          labelPosition="bottom"
        />
      </div>
    </div>
  );
};
```

## ⚡ Performance y Accesibilidad

### Optimización

```tsx
import { memo } from 'react';

const OptimizedMeter = memo(Meter);

// Uso en listas grandes
const MetricsList = ({ metrics }) => {
  return (
    <div>
      {metrics.map((metric) => (
        <OptimizedMeter
          key={metric.id}
          value={metric.value}
          label={metric.name}
          showPercentage={true}
          $size="sm"
        />
      ))}
    </div>
  );
};
```

### Accesibilidad

```tsx
// Meter accesible con ARIA labels completos
<Meter
  value={75}
  min={0}
  max={100}
  label="Progreso de carga"
  showPercentage={true}
  aria-label="Progreso de carga del archivo: 75%"
  aria-describedby="progress-description"
  role="progressbar" // Para screen readers
/>
```

## 🧪 Testing

```tsx
// test/Meter.test.tsx
import { render } from '@testing-library/react';
import { Meter } from '@code-dev-col/tailwind-next';

describe('Meter', () => {
  test('renders with correct value', () => {
    const { container } = render(<Meter value={75} min={0} max={100} />);

    const meter = container.querySelector('meter');
    expect(meter).toHaveAttribute('value', '75');
    expect(meter).toHaveAttribute('min', '0');
    expect(meter).toHaveAttribute('max', '100');
  });

  test('shows percentage correctly', () => {
    const { getByText } = render(
      <Meter
        value={50}
        min={0}
        max={100}
        showPercentage={true}
        label="Test Meter"
      />
    );

    expect(getByText('50%')).toBeInTheDocument();
  });

  test('handles semantic states', () => {
    const { container } = render(
      <Meter value={95} min={0} max={100} low={60} high={80} optimum={90} />
    );

    const meter = container.querySelector('meter');
    expect(meter).toHaveAttribute('optimum', '90');
    expect(meter).toHaveAttribute('high', '80');
    expect(meter).toHaveAttribute('low', '60');
  });
});
```

---

El componente **Meter** proporciona una base sólida y semánticamente correcta para mostrar métricas, niveles y progreso en aplicaciones modernas. Su integración con el sistema de temas y la flexibilidad de configuración lo hacen ideal para dashboards, indicadores de estado y visualización de datos. 📊✨

