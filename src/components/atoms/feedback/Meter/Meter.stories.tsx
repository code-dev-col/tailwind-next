import type { Meta, StoryObj } from '@storybook/react';
import { Meter } from './Meter';
import { useMeterExamples } from '../../../../stores/meterExamples.store';

const meta: Meta<typeof Meter> = {
  title: 'Atoms/Feedback/Meter',
  component: Meter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Meter
        $store={useMeterExamples}
        valueStoreKey="batteryLevel"
        label="Nivel de Batería"
        showValue={true}
        showPercentage={true}
        labelPosition="top"
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="text-lg font-semibold mb-3">Default</h3>
        <Meter
          value={75}
          label="Progreso Default"
          showValue={true}
          labelPosition="top"
          $variant="default"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Thin</h3>
        <Meter
          value={60}
          label="Progreso Delgado"
          showValue={true}
          labelPosition="top"
          $variant="thin"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Thick</h3>
        <Meter
          value={90}
          label="Progreso Grueso"
          showValue={true}
          labelPosition="top"
          $variant="thick"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Rounded</h3>
        <Meter
          value={45}
          label="Progreso Redondeado"
          showValue={true}
          labelPosition="top"
          $variant="rounded"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Pill</h3>
        <Meter
          value={85}
          label="Progreso Píldora"
          showValue={true}
          labelPosition="top"
          $variant="pill"
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h3 className="text-lg font-semibold mb-3">Extra Small (xs)</h3>
        <Meter
          value={25}
          $size="xs"
          label="XS Size"
          showValue={true}
          labelPosition="top"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Small (sm)</h3>
        <Meter
          value={50}
          $size="sm"
          label="Small Size"
          showValue={true}
          labelPosition="top"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Default</h3>
        <Meter
          value={75}
          $size="default"
          label="Default Size"
          showValue={true}
          labelPosition="top"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Large (lg)</h3>
        <Meter
          value={90}
          $size="lg"
          label="Large Size"
          showValue={true}
          labelPosition="top"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Extra Large (xl)</h3>
        <Meter
          value={60}
          $size="xl"
          label="XL Size"
          showValue={true}
          labelPosition="top"
        />
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-96">
      <Meter
        value={75}
        $colorScheme="default"
        label="Default"
        showValue={true}
        labelPosition="top"
      />

      <Meter
        value={60}
        $colorScheme="secondary"
        label="Secondary"
        showValue={true}
        labelPosition="top"
      />

      <Meter
        value={85}
        $colorScheme="accent"
        label="Accent"
        showValue={true}
        labelPosition="top"
      />

      <Meter
        value={30}
        $colorScheme="destructive"
        label="Destructive"
        showValue={true}
        labelPosition="top"
      />

      <Meter
        value={50}
        $colorScheme="muted"
        label="Muted"
        showValue={true}
        labelPosition="top"
      />

      <Meter
        value={90}
        $colorScheme="minimal"
        label="Minimal"
        showValue={true}
        labelPosition="top"
      />
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <h3 className="text-lg font-semibold mb-3">Top</h3>
        <Meter
          value={75}
          label="Posición Superior"
          showValue={true}
          labelPosition="top"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Bottom</h3>
        <Meter
          value={60}
          label="Posición Inferior"
          showValue={true}
          labelPosition="bottom"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Left</h3>
        <Meter
          value={85}
          label="Izquierda"
          showValue={true}
          labelPosition="left"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Right</h3>
        <Meter
          value={45}
          label="Derecha"
          showValue={true}
          labelPosition="right"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">None</h3>
        <Meter
          value={95}
          label="Sin etiqueta visible"
          showValue={true}
          labelPosition="none"
        />
      </div>
    </div>
  ),
};

export const WithInteraction: Story = {
  render: () => {
    const {
      batteryLevel,
      cpuUsage,
      memoryUsage,
      incrementBattery,
      decrementBattery,
      randomizeValues,
      simulateRealTimeData,
      resetToDefaults,
    } = useMeterExamples();

    return (
      <div className="space-y-6 w-80">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Meters Interactivos</h3>
          <p className="text-sm text-muted-foreground">
            Usa los botones para modificar los valores
          </p>
        </div>

        <Meter
          $store={useMeterExamples}
          valueStoreKey="batteryLevel"
          label="Batería"
          showValue={true}
          showPercentage={true}
          labelPosition="top"
          $colorScheme="default"
          low={20}
          high={80}
          optimum={90}
        />

        <Meter
          $store={useMeterExamples}
          valueStoreKey="cpuUsage"
          label="Uso de CPU"
          showValue={true}
          showPercentage={true}
          labelPosition="top"
          $colorScheme="secondary"
          low={30}
          high={70}
          optimum={50}
        />

        <Meter
          $store={useMeterExamples}
          valueStoreKey="memoryUsage"
          label="Memoria RAM"
          showValue={true}
          showPercentage={true}
          labelPosition="top"
          $colorScheme="accent"
          low={40}
          high={80}
          optimum={60}
        />

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={incrementBattery}
            className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">
            +5% Batería
          </button>

          <button
            onClick={decrementBattery}
            className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm">
            -5% Batería
          </button>

          <button
            onClick={randomizeValues}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
            Aleatorizar
          </button>

          <button
            onClick={simulateRealTimeData}
            className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-sm">
            Simular Datos
          </button>

          <button
            onClick={resetToDefaults}
            className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm">
            Reset
          </button>
        </div>
      </div>
    );
  },
};

export const SystemMetrics: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <h3 className="text-lg font-semibold">Métricas del Sistema</h3>

      <Meter
        $store={useMeterExamples}
        valueStoreKey="cpuUsage"
        label="Procesador"
        showValue={true}
        suffix="%"
        labelPosition="top"
        $colorScheme="default"
        low={30}
        high={70}
        optimum={40}
      />

      <Meter
        $store={useMeterExamples}
        valueStoreKey="memoryUsage"
        label="Memoria RAM"
        showValue={true}
        suffix="%"
        labelPosition="top"
        $colorScheme="secondary"
        low={40}
        high={80}
        optimum={60}
      />

      <Meter
        $store={useMeterExamples}
        valueStoreKey="diskSpace"
        label="Espacio en Disco"
        showValue={true}
        suffix="%"
        labelPosition="top"
        $colorScheme="destructive"
        low={20}
        high={90}
        optimum={70}
      />

      <Meter
        value={2.3}
        min={0}
        max={5}
        label="Tiempo de Carga"
        showValue={true}
        suffix="s"
        labelPosition="top"
        $colorScheme="accent"
        low={1}
        high={3}
        optimum={1.5}
        formatter={(val) => `${val.toFixed(1)}s`}
      />
    </div>
  ),
};

export const UserScores: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <h3 className="text-lg font-semibold">Scores y Calificaciones</h3>

      <Meter
        value={4.2}
        min={0}
        max={5}
        label="Calificación Promedio"
        showValue={true}
        labelPosition="top"
        $colorScheme="default"
        low={2}
        high={4}
        optimum={4.5}
        formatter={(val) => `${val.toFixed(1)} ⭐`}
      />

      <Meter
        $store={useMeterExamples}
        valueStoreKey="testScore"
        label="Puntuación del Examen"
        showValue={true}
        suffix="/100"
        labelPosition="top"
        $colorScheme="secondary"
        low={60}
        high={85}
        optimum={95}
      />

      <Meter
        $store={useMeterExamples}
        valueStoreKey="completionRate"
        label="Tasa de Completitud"
        showValue={true}
        showPercentage={true}
        labelPosition="top"
        $colorScheme="accent"
        low={50}
        high={80}
        optimum={90}
      />

      <Meter
        $store={useMeterExamples}
        valueStoreKey="satisfactionLevel"
        label="Nivel de Satisfacción"
        showValue={true}
        showPercentage={true}
        labelPosition="top"
        $colorScheme="default"
        low={70}
        high={90}
        optimum={95}
      />
    </div>
  ),
};

export const BusinessMetrics: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <h3 className="text-lg font-semibold">Métricas de Negocio</h3>

      <Meter
        $store={useMeterExamples}
        valueStoreKey="salesTarget"
        label="Objetivo de Ventas"
        showValue={true}
        suffix="%"
        labelPosition="top"
        $colorScheme="default"
        min={0}
        max={150}
        low={80}
        high={100}
        optimum={120}
      />

      <Meter
        $store={useMeterExamples}
        valueStoreKey="customerSatisfaction"
        label="Satisfacción del Cliente"
        showValue={true}
        showPercentage={true}
        labelPosition="top"
        $colorScheme="secondary"
        low={70}
        high={90}
        optimum={95}
      />

      <Meter
        $store={useMeterExamples}
        valueStoreKey="marketShare"
        label="Cuota de Mercado"
        showValue={true}
        suffix="%"
        labelPosition="top"
        $colorScheme="accent"
        min={0}
        max={30}
        low={10}
        high={20}
        optimum={25}
      />

      <Meter
        $store={useMeterExamples}
        valueStoreKey="growthRate"
        label="Tasa de Crecimiento"
        showValue={true}
        suffix="%"
        labelPosition="top"
        $colorScheme="default"
        min={50}
        max={200}
        low={90}
        high={130}
        optimum={150}
      />
    </div>
  ),
};

export const WithDebugInfo: Story = {
  render: () => {
    const store = useMeterExamples();

    return (
      <div className="space-y-6 w-80">
        <Meter
          $store={useMeterExamples}
          valueStoreKey="batteryLevel"
          minStoreKey="minValue"
          maxStoreKey="maxValue"
          label="Batería (con Store)"
          showValue={true}
          showPercentage={true}
          labelPosition="top"
          animateOnMount={true}
        />

        <div className="p-4 bg-gray-50 rounded-lg space-y-2">
          <h4 className="font-semibold">Estado del Store:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Batería:</strong> {store.batteryLevel}%
            </div>
            <div>
              <strong>CPU:</strong> {store.cpuUsage}%
            </div>
            <div>
              <strong>RAM:</strong> {store.memoryUsage}%
            </div>
            <div>
              <strong>Disco:</strong> {store.diskSpace}%
            </div>
            <div>
              <strong>Score:</strong> {store.testScore}/100
            </div>
            <div>
              <strong>Rating:</strong> {store.userRating}/5
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={store.loadSampleData}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
              Cargar Datos
            </button>

            <button
              onClick={store.simulateSystemLoad}
              className="px-3 py-1 bg-orange-100 text-orange-800 rounded text-sm">
              Sistema Cargado
            </button>

            <button
              onClick={store.clearAllMeter}
              className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm">
              Limpiar Todo
            </button>
          </div>
        </div>
      </div>
    );
  },
};

