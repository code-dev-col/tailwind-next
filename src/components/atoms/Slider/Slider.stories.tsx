import type { Meta, StoryObj } from '@storybook/react';
import { Slider, RangeSlider } from './Slider';
import { useSliderExamples } from '../../../stores/sliderExamples.store';
import { cn } from '../../../utils/cn';
import {
  FiVolume2,
  FiDollarSign,
  FiThermometer,
  FiSun,
  FiZoomIn,
  FiSettings,
  FiSliders,
  FiTrendingUp,
  FiBarChart,
  FiMusic,
} from 'react-icons/fi';
import { BiMoney, BiTime, BiTachometer } from 'react-icons/bi';

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente Slider avanzado con soporte para valores únicos y rangos, múltiples variantes, orientaciones horizontal/vertical, integración con Zustand, ticks, labels y formateo personalizado. Incluye RangeSlider para selección de rangos.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    $colorScheme: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'accent',
        'muted',
        'minimal',
        'custom',
      ],
      description: 'Esquema de color del slider basado en theme.css',
    },
    $size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Tamaño del slider',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientación del slider',
    },
    min: {
      control: 'number',
      description: 'Valor mínimo',
    },
    max: {
      control: 'number',
      description: 'Valor máximo',
    },
    step: {
      control: 'number',
      description: 'Incremento del slider',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Historia por defecto
export const Default: Story = {
  render: () => (
    <div className="w-64">
      <Slider
        label="Valor básico"
        min={0}
        max={100}
        defaultValue={50}
        $showValue
        description="Slider básico con valor visible"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Slider básico con label, valor visible y descripción.',
      },
    },
  },
};

// Variantes de estilo
export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Slider
        label="Default"
        $colorScheme="default"
        defaultValue={60}
        $showValue
        $formatValue={(val) => `${val}%`}
      />
      <Slider
        label="Secondary"
        $colorScheme="secondary"
        defaultValue={40}
        $showValue
        $formatValue={(val) => `${val}%`}
      />
      <Slider
        label="Destructive"
        $colorScheme="destructive"
        defaultValue={90}
        $showValue
        $formatValue={(val) => `${val}%`}
      />
      <Slider
        label="Accent"
        $colorScheme="accent"
        defaultValue={70}
        $showValue
        $formatValue={(val) => `${val}%`}
      />
      <Slider
        label="Muted"
        $colorScheme="muted"
        defaultValue={50}
        $showValue
        $formatValue={(val) => `${val}%`}
      />
      <Slider
        label="Minimal"
        $colorScheme="minimal"
        defaultValue={30}
        $showValue
        $formatValue={(val) => `${val}%`}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Diferentes esquemas de color basados en theme.css con formateo de porcentaje.',
      },
    },
  },
};

// Tamaños
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Slider
        label="Small"
        $size="sm"
        $colorScheme="default"
        defaultValue={25}
        $showValue
      />
      <Slider
        label="Default"
        $size="default"
        $colorScheme="default"
        defaultValue={50}
        $showValue
      />
      <Slider
        label="Large"
        $size="lg"
        $colorScheme="default"
        defaultValue={75}
        $showValue
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes tamaños de slider disponibles.',
      },
    },
  },
};

// Orientaciones
export const Orientations: Story = {
  render: () => (
    <div className="flex gap-12 items-center">
      <div className="space-y-4">
        <h4 className="font-medium">Horizontal</h4>
        <div className="w-64">
          <Slider
            label="Horizontal Slider"
            orientation="horizontal"
            defaultValue={60}
            $showValue
            $showLabels
            $minLabel="Min"
            $maxLabel="Max"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Vertical</h4>
        <div className="flex items-center justify-center h-64">
          <Slider
            label="Vertical Slider"
            orientation="vertical"
            defaultValue={40}
            $showValue
            $showLabels
            $minLabel="0"
            $maxLabel="100"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sliders en orientación horizontal y vertical con labels.',
      },
    },
  },
};

// Con características avanzadas
export const AdvancedFeatures: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <h4 className="font-medium mb-4">Con Ticks</h4>
        <Slider
          label="Temperature"
          min={-10}
          max={40}
          step={5}
          defaultValue={22}
          $colorScheme="accent"
          $showTicks
          $showValue
          $showLabels
          $minLabel="-10°C"
          $maxLabel="40°C"
          $formatValue={(val) => `${val}°C`}
          description="Control de temperatura con marcas cada 5 grados"
        />
      </div>

      <div>
        <h4 className="font-medium mb-4">Steps Personalizados</h4>
        <Slider
          label="Volume"
          min={0}
          max={100}
          step={10}
          defaultValue={70}
          $colorScheme="secondary"
          $showValue
          $showTicks
          $formatValue={(val) => `${val}%`}
          description="Volumen en incrementos de 10"
        />
      </div>

      <div>
        <h4 className="font-medium mb-4">Deshabilitado</h4>
        <Slider
          label="Locked Setting"
          defaultValue={45}
          disabled
          $showValue
          description="Este control está deshabilitado"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Características avanzadas: ticks, steps personalizados y estado deshabilitado.',
      },
    },
  },
};

// Range Slider
export const RangeSliderExample: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <RangeSlider
        label="Price Range"
        min={0}
        max={1000}
        defaultValue={[200, 800]}
        step={50}
        $colorScheme="default"
        $showValue
        $showLabels
        $minLabel="$0"
        $maxLabel="$1000"
        $formatValue={(val) => `$${val}`}
        description="Selecciona un rango de precios"
      />

      <RangeSlider
        label="Temperature Range"
        min={-20}
        max={50}
        defaultValue={[15, 30]}
        step={1}
        $colorScheme="accent"
        $showValue
        $showTicks
        $formatValue={(val) => `${val}°C`}
        description="Rango de temperatura ideal"
      />

      <RangeSlider
        label="Time Range"
        min={0}
        max={24}
        defaultValue={[9, 17]}
        step={1}
        $colorScheme="secondary"
        $showValue
        $showLabels
        $minLabel="00:00"
        $maxLabel="24:00"
        $formatValue={(val) => `${val.toString().padStart(2, '0')}:00`}
        description="Horario de trabajo"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'RangeSlider para selección de rangos con diferentes casos de uso.',
      },
    },
  },
};

// Con iconos y casos de uso reales
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <FiVolume2 className="text-blue-500" />
          <span className="font-medium">Volume Control</span>
        </div>
        <Slider
          min={0}
          max={100}
          defaultValue={75}
          $colorScheme="default"
          $showValue
          $formatValue={(val) => `${val}%`}
        />
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <FiSun className="text-yellow-500" />
          <span className="font-medium">Brightness</span>
        </div>
        <Slider
          min={0}
          max={100}
          defaultValue={60}
          $colorScheme="accent"
          $showValue
          $formatValue={(val) => `${val}%`}
        />
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <FiZoomIn className="text-green-500" />
          <span className="font-medium">Zoom Level</span>
        </div>
        <Slider
          min={25}
          max={200}
          step={25}
          defaultValue={100}
          $colorScheme="secondary"
          $showValue
          $showTicks
          $formatValue={(val) => `${val}%`}
        />
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <BiTachometer className="text-red-500" />
          <span className="font-medium">Playback Speed</span>
        </div>
        <Slider
          min={0.25}
          max={3}
          step={0.25}
          defaultValue={1}
          $colorScheme="destructive"
          $showValue
          $formatValue={(val) => `${val}x`}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Sliders con iconos para casos de uso comunes como volumen, brillo, zoom, etc.',
      },
    },
  },
};

// Con integración de store
export const WithStore: Story = {
  render: () => {
    const {
      basicSlider,
      rangeSlider,
      volumeSlider,
      priceRangeSlider,
      resetSliderValues,
      clearAllSliders,
    } = useSliderExamples();

    return (
      <div className="space-y-6 w-80">
        <div>
          <h4 className="font-medium mb-4">Sliders Conectados a Store</h4>

          <div className="space-y-4">
            <Slider
              label="Basic Slider"
              $store={useSliderExamples}
              storeKey="basicSlider"
              $showValue
              $colorScheme="default"
            />

            <Slider
              label="Volume Slider"
              $store={useSliderExamples}
              storeKey="volumeSlider"
              $showValue
              $colorScheme="secondary"
              $formatValue={(val) => `${val}%`}
            />

            <RangeSlider
              label="Price Range"
              $store={useSliderExamples}
              storeKey="priceRangeSlider"
              min={0}
              max={1000}
              step={25}
              $showValue
              $colorScheme="accent"
              $formatValue={(val) => `$${val}`}
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium mb-2">Estado Actual del Store:</h5>
          <div className="text-sm space-y-1 font-mono">
            <div>
              Basic: <span className="text-blue-600">{basicSlider}</span>
            </div>
            <div>
              Volume: <span className="text-green-600">{volumeSlider}%</span>
            </div>
            <div>
              Price Range:{' '}
              <span className="text-pink-600">
                [${rangeSlider[0]}, ${rangeSlider[1]}]
              </span>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={resetSliderValues}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
              Reset
            </button>
            <button
              onClick={clearAllSliders}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
              Clear All
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sliders integrados con Zustand store para manejo de estado global.',
      },
    },
  },
};

// Casos de uso del mundo real
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Panel de configuración de audio */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FiMusic className="text-blue-500" />
          <h4 className="text-lg font-semibold">Audio Settings</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Slider
              label="Master Volume"
              min={0}
              max={100}
              defaultValue={75}
              $colorScheme="default"
              $showValue
              $formatValue={(val) => `${val}%`}
              description="Overall system volume"
            />

            <Slider
              label="Bass"
              min={-12}
              max={12}
              defaultValue={0}
              step={1}
              $colorScheme="secondary"
              $showValue
              $showTicks
              $formatValue={(val) => `${val > 0 ? '+' : ''}${val} dB`}
              description="Bass level adjustment"
            />

            <Slider
              label="Treble"
              min={-12}
              max={12}
              defaultValue={0}
              step={1}
              $colorScheme="accent"
              $showValue
              $showTicks
              $formatValue={(val) => `${val > 0 ? '+' : ''}${val} dB`}
              description="Treble level adjustment"
            />
          </div>

          <div className="space-y-4">
            <RangeSlider
              label="Frequency Range"
              min={20}
              max={20000}
              defaultValue={[200, 8000]}
              step={100}
              $colorScheme="muted"
              $showValue
              $formatValue={(val) => `${val} Hz`}
              description="Active frequency range"
            />

            <Slider
              label="Balance"
              min={-100}
              max={100}
              defaultValue={0}
              step={10}
              $colorScheme="minimal"
              $showValue
              $showTicks
              $formatValue={(val) => {
                if (val === 0) return 'Center';
                return val > 0 ? `R ${val}%` : `L ${Math.abs(val)}%`;
              }}
              description="Left/Right balance"
            />
          </div>
        </div>
      </div>

      {/* Panel de configuración de filtros de e-commerce */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FiSliders className="text-purple-500" />
          <h4 className="text-lg font-semibold">Product Filters</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RangeSlider
            label="Price Range"
            min={0}
            max={2000}
            defaultValue={[100, 1500]}
            step={50}
            $colorScheme="default"
            $showValue
            $showLabels
            $minLabel="$0"
            $maxLabel="$2000"
            $formatValue={(val) => `$${val}`}
            description="Filter by price range"
          />

          <Slider
            label="Minimum Rating"
            min={1}
            max={5}
            defaultValue={3}
            step={0.5}
            $colorScheme="accent"
            $showValue
            $showTicks
            $formatValue={(val) => `${val} ⭐`}
            description="Minimum product rating"
          />

          <RangeSlider
            label="Delivery Time (days)"
            min={1}
            max={30}
            defaultValue={[1, 7]}
            step={1}
            $colorScheme="secondary"
            $showValue
            $formatValue={(val) => `${val}d`}
            description="Expected delivery range"
          />
        </div>
      </div>

      {/* Panel de configuración de dashboard */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FiTrendingUp className="text-green-500" />
          <h4 className="text-lg font-semibold">Dashboard Settings</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Slider
              label="Chart Refresh Rate"
              min={5}
              max={300}
              defaultValue={30}
              step={5}
              $colorScheme="default"
              $showValue
              $formatValue={(val) => `${val}s`}
              description="How often charts update"
            />

            <RangeSlider
              label="Data Range (days)"
              min={1}
              max={365}
              defaultValue={[7, 30]}
              step={1}
              $colorScheme="accent"
              $showValue
              $formatValue={(val) => `${val}d`}
              description="Date range for analytics"
            />
          </div>

          <div className="space-y-4">
            <Slider
              label="Alert Threshold"
              min={0}
              max={100}
              defaultValue={85}
              step={5}
              $colorScheme="destructive"
              $showValue
              $showTicks
              $formatValue={(val) => `${val}%`}
              description="When to trigger alerts"
            />

            <Slider
              label="Cache Duration"
              min={1}
              max={24}
              defaultValue={6}
              step={1}
              $colorScheme="secondary"
              $showValue
              $formatValue={(val) => `${val}h`}
              description="Data cache lifetime"
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Ejemplos de uso real: configuraciones de audio, filtros de e-commerce y settings de dashboard.',
      },
    },
  },
};

// Interactivo con todas las opciones
export const Interactive: Story = {
  render: () => {
    const {
      interactiveValue,
      interactiveMin,
      interactiveMax,
      interactiveStep,
      interactiveColorScheme,
      interactiveSize,
      interactiveShowValue,
      interactiveShowTicks,
      interactiveDisabled,
      interactiveOrientation,
      interactiveRangeValue,
      setInteractiveValue,
      setInteractiveMin,
      setInteractiveMax,
      setInteractiveStep,
      setInteractiveColorScheme,
      setInteractiveSize,
      setInteractiveShowValue,
      setInteractiveShowTicks,
      setInteractiveDisabled,
      setInteractiveOrientation,
      resetSliderValues,
    } = useSliderExamples();

    const colorSchemes = [
      'default',
      'secondary',
      'destructive',
      'accent',
      'muted',
      'minimal',
      'custom',
    ] as const;
    const sizes = ['sm', 'default', 'lg'] as const;
    const orientations = ['horizontal', 'vertical'] as const;

    return (
      <div className="space-y-6 max-w-4xl">
        {/* Configuración */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Min Value</label>
            <input
              type="number"
              value={interactiveMin}
              onChange={(e) => setInteractiveMin(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Max Value</label>
            <input
              type="number"
              value={interactiveMax}
              onChange={(e) => setInteractiveMax(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Step</label>
            <input
              type="number"
              value={interactiveStep}
              onChange={(e) => setInteractiveStep(Number(e.target.value))}
              min="1"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              ColorScheme
            </label>
            <select
              value={interactiveColorScheme}
              onChange={(e) => setInteractiveColorScheme(e.target.value as any)}
              className="w-full p-2 border border-gray-300 rounded">
              {colorSchemes.map((colorScheme) => (
                <option key={colorScheme} value={colorScheme}>
                  {colorScheme}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <select
              value={interactiveSize}
              onChange={(e) => setInteractiveSize(e.target.value as any)}
              className="w-full p-2 border border-gray-300 rounded">
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Orientation
            </label>
            <select
              value={interactiveOrientation}
              onChange={(e) => setInteractiveOrientation(e.target.value as any)}
              className="w-full p-2 border border-gray-300 rounded">
              {orientations.map((orientation) => (
                <option key={orientation} value={orientation}>
                  {orientation}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={interactiveShowValue}
                onChange={(e) => setInteractiveShowValue(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Show Value</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={interactiveShowTicks}
                onChange={(e) => setInteractiveShowTicks(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Show Ticks</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={interactiveDisabled}
                onChange={(e) => setInteractiveDisabled(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Disabled</span>
            </label>
          </div>
        </div>

        {/* Slider Preview */}
        <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
          <div
            className={cn(
              'flex items-center justify-center',
              interactiveOrientation === 'horizontal' ? 'w-80' : 'h-64'
            )}>
            <Slider
              label="Interactive Slider"
              value={interactiveValue}
              onValueChange={setInteractiveValue}
              min={interactiveMin}
              max={interactiveMax}
              step={interactiveStep}
              $colorScheme={interactiveColorScheme}
              $size={interactiveSize}
              $showValue={interactiveShowValue}
              $showTicks={interactiveShowTicks}
              $showLabels
              disabled={interactiveDisabled}
              orientation={interactiveOrientation}
              description="Slider personalizable con todas las opciones"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={resetSliderValues}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Reset Configuration
          </button>
        </div>

        {/* Estado actual */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium mb-2">Current Configuration:</h5>
          <div className="text-sm space-y-1">
            <div>
              Value:{' '}
              <code className="bg-white px-1 rounded">{interactiveValue}</code>
            </div>
            <div>
              Range:{' '}
              <code className="bg-white px-1 rounded">
                {interactiveMin} - {interactiveMax}
              </code>
            </div>
            <div>
              Step:{' '}
              <code className="bg-white px-1 rounded">{interactiveStep}</code>
            </div>
            <div>
              ColorScheme:{' '}
              <code className="bg-white px-1 rounded">
                {interactiveColorScheme}
              </code>
            </div>
            <div>
              Size:{' '}
              <code className="bg-white px-1 rounded">{interactiveSize}</code>
            </div>
            <div>
              Orientation:{' '}
              <code className="bg-white px-1 rounded">
                {interactiveOrientation}
              </code>
            </div>
            <div>
              Options:
              {interactiveShowValue && (
                <span className="bg-green-100 text-green-800 px-1 mx-1 rounded text-xs">
                  Show Value
                </span>
              )}
              {interactiveShowTicks && (
                <span className="bg-blue-100 text-blue-800 px-1 mx-1 rounded text-xs">
                  Show Ticks
                </span>
              )}
              {interactiveDisabled && (
                <span className="bg-red-100 text-red-800 px-1 mx-1 rounded text-xs">
                  Disabled
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Slider completamente interactivo que permite probar todas las configuraciones disponibles.',
      },
    },
  },
};

