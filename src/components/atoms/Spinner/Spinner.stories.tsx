import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { useSpinnerExamples } from '../../../stores/spinnerExamples.store';
import { useState } from 'react';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $type: {
      control: 'select',
      options: [
        'bounce',
        'clip',
        'dot',
        'fade',
        'grid',
        'hash',
        'moon',
        'pacman',
        'propagate',
        'pulse',
        'ring',
        'rise',
        'rotate',
        'scale',
        'sync',
        'beat',
        'circle',
        'climbing',
        'bar',
        'square',
      ],
      description: 'Tipo de spinner a mostrar',
    },
    $color: {
      control: 'color',
      description: 'Color del spinner',
    },
    $size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Tamaño predefinido del spinner',
    },
    $loading: {
      control: 'boolean',
      description: 'Si está cargando (controla la visibilidad)',
    },
    $speedMultiplier: {
      control: { type: 'range', min: 0.1, max: 3, step: 0.1 },
      description: 'Velocidad de la animación',
    },
    $loadingText: {
      control: 'text',
      description: 'Texto de carga opcional',
    },
    $textPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Posición del texto respecto al spinner',
    },
    $centered: {
      control: 'boolean',
      description: 'Centrar el spinner en su contenedor',
    },
    $overlay: {
      control: 'boolean',
      description: 'Overlay de fondo (útil para loading states)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    $loading: true,
  },
};

export const SpinnerTypes: Story = {
  render: () => {
    const { demoTypes } = useSpinnerExamples();

    return (
      <div className="grid grid-cols-5 gap-6 p-4">
        {demoTypes.map((type) => (
          <div key={type} className="text-center space-y-2">
            <Spinner
              $type={type}
              $loading={true}
              $color="hsl(var(--primary))"
              $size="md"
            />
            <p className="text-xs text-muted-foreground capitalize font-medium">
              {type}
            </p>
          </div>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const { demoSizes } = useSpinnerExamples();

    return (
      <div className="flex items-end gap-6 p-4">
        {demoSizes.map((size) => (
          <div key={size} className="text-center space-y-2">
            <Spinner
              $type="clip"
              $loading={true}
              $color="hsl(var(--primary))"
              $size={size}
            />
            <p className="text-xs text-muted-foreground uppercase font-medium">
              {size}
            </p>
          </div>
        ))}
      </div>
    );
  },
};

export const Colors: Story = {
  render: () => {
    const { demoColors } = useSpinnerExamples();

    return (
      <div className="grid grid-cols-5 gap-4 p-4">
        {demoColors.map((color, index) => (
          <div key={index} className="text-center space-y-2">
            <Spinner $type="ring" $loading={true} $color={color} $size="lg" />
            <p className="text-xs text-muted-foreground font-mono">
              {color.includes('hsl')
                ? color.replace('hsl(var(--', '').replace('))', '')
                : color}
            </p>
          </div>
        ))}
      </div>
    );
  },
};

export const WithText: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-4">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">Posiciones del Texto</h3>

        <div className="space-y-6">
          <div className="p-4 border rounded-lg">
            <Spinner
              $type="moon"
              $loading={true}
              $color="hsl(var(--primary))"
              $size="md"
              $loadingText="Cargando arriba"
              $textPosition="top"
            />
          </div>

          <div className="p-4 border rounded-lg">
            <Spinner
              $type="moon"
              $loading={true}
              $color="hsl(var(--secondary))"
              $size="md"
              $loadingText="Cargando abajo"
              $textPosition="bottom"
            />
          </div>

          <div className="p-4 border rounded-lg">
            <Spinner
              $type="moon"
              $loading={true}
              $color="hsl(var(--accent))"
              $size="md"
              $loadingText="Cargando izquierda"
              $textPosition="left"
            />
          </div>

          <div className="p-4 border rounded-lg">
            <Spinner
              $type="moon"
              $loading={true}
              $color="hsl(var(--destructive))"
              $size="md"
              $loadingText="Cargando derecha"
              $textPosition="right"
            />
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">Diferentes Textos</h3>

        <div className="space-y-6">
          <Spinner
            $type="pulse"
            $loading={true}
            $color="#3b82f6"
            $size="lg"
            $loadingText="Procesando datos..."
            $textPosition="bottom"
          />

          <Spinner
            $type="beat"
            $loading={true}
            $color="#10b981"
            $size="lg"
            $loadingText="Guardando cambios..."
            $textPosition="bottom"
          />

          <Spinner
            $type="scale"
            $loading={true}
            $color="#f59e0b"
            $size="lg"
            $loadingText="Conectando al servidor..."
            $textPosition="bottom"
          />
        </div>
      </div>
    </div>
  ),
};

export const CustomSizes: Story = {
  render: () => (
    <div className="flex items-end gap-6 p-4">
      <div className="text-center space-y-2">
        <Spinner
          $type="ring"
          $loading={true}
          $color="hsl(var(--primary))"
          $width={20}
          $height={20}
        />
        <p className="text-xs text-muted-foreground">20px × 20px</p>
      </div>

      <div className="text-center space-y-2">
        <Spinner
          $type="ring"
          $loading={true}
          $color="hsl(var(--secondary))"
          $width={40}
          $height={40}
        />
        <p className="text-xs text-muted-foreground">40px × 40px</p>
      </div>

      <div className="text-center space-y-2">
        <Spinner
          $type="ring"
          $loading={true}
          $color="hsl(var(--accent))"
          $width={80}
          $height={80}
        />
        <p className="text-xs text-muted-foreground">80px × 80px</p>
      </div>

      <div className="text-center space-y-2">
        <Spinner
          $type="bar"
          $loading={true}
          $color="hsl(var(--destructive))"
          $width={150}
          $height={8}
        />
        <p className="text-xs text-muted-foreground">150px × 8px</p>
      </div>
    </div>
  ),
};

export const SpeedVariations: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 p-4">
      {[0.5, 1, 1.5, 2].map((speed) => (
        <div key={speed} className="text-center space-y-2">
          <Spinner
            $type="sync"
            $loading={true}
            $color="hsl(var(--primary))"
            $size="lg"
            $speedMultiplier={speed}
          />
          <p className="text-sm text-muted-foreground">Velocidad: {speed}x</p>
        </div>
      ))}
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-4">
      <div className="text-center space-y-3">
        <div className="p-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
          <Spinner
            $type="moon"
            $loading={true}
            $color="white"
            $size="xl"
            $loadingText="Sunset Theme"
            $textPosition="bottom"
            $custom="text-white"
          />
        </div>
        <p className="text-sm text-muted-foreground">Fondo Sunset</p>
      </div>

      <div className="text-center space-y-3">
        <div className="p-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
          <Spinner
            $type="ring"
            $loading={true}
            $color="white"
            $size="xl"
            $loadingText="Ocean Theme"
            $textPosition="bottom"
            $custom="text-white"
          />
        </div>
        <p className="text-sm text-muted-foreground">Fondo Ocean</p>
      </div>

      <div className="text-center space-y-3">
        <div className="p-6 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
          <Spinner
            $type="pulse"
            $loading={true}
            $color="white"
            $size="xl"
            $loadingText="Forest Theme"
            $textPosition="bottom"
            $custom="text-white"
          />
        </div>
        <p className="text-sm text-muted-foreground">Fondo Forest</p>
      </div>
    </div>
  ),
};

export const OverlayMode: Story = {
  render: () => {
    const [showOverlay, setShowOverlay] = useState(false);

    return (
      <div className="relative p-8 space-y-4">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">Modo Overlay</h3>
          <p className="text-muted-foreground">
            Simula un estado de carga global con overlay de fondo
          </p>

          <button
            onClick={() => setShowOverlay(!showOverlay)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            {showOverlay ? 'Ocultar Overlay' : 'Mostrar Overlay'}
          </button>
        </div>

        {/* Contenido de ejemplo */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="p-4 border rounded-lg">
              <h4 className="font-medium">Card {item}</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Contenido de ejemplo que será cubierto por el overlay
              </p>
            </div>
          ))}
        </div>

        {/* Overlay Spinner */}
        <Spinner
          $type="moon"
          $loading={showOverlay}
          $color="hsl(var(--primary))"
          $size="xl"
          $loadingText="Procesando solicitud..."
          $textPosition="bottom"
          $overlay={true}
        />
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const {
      loadingStates,
      toggleLoadingState,
      clearAllSpinner,
      resetDefaults,
    } = useSpinnerExamples();

    return (
      <div className="space-y-8 p-4">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">
            Control Interactivo de Spinners
          </h3>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => toggleLoadingState('demo1')}
              className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors">
              Toggle Demo 1
            </button>
            <button
              onClick={() => toggleLoadingState('demo2')}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90 transition-colors">
              Toggle Demo 2
            </button>
            <button
              onClick={() => toggleLoadingState('demo3')}
              className="px-3 py-1 bg-accent text-accent-foreground rounded text-sm hover:bg-accent/90 transition-colors">
              Toggle Demo 3
            </button>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={clearAllSpinner}
              className="px-3 py-1 bg-destructive text-destructive-foreground rounded text-sm hover:bg-destructive/90 transition-colors">
              Limpiar Todo
            </button>
            <button
              onClick={resetDefaults}
              className="px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-muted/90 transition-colors">
              Restaurar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="text-center p-6 border rounded-lg">
            <Spinner
              $type="clip"
              $loading={loadingStates.demo1}
              $color="hsl(var(--primary))"
              $size="lg"
              $loadingText="Proceso 1"
              $textPosition="bottom"
            />
            {!loadingStates.demo1 && (
              <div className="mt-4 text-green-600 font-medium">
                ✓ Completado
              </div>
            )}
          </div>

          <div className="text-center p-6 border rounded-lg">
            <Spinner
              $type="ring"
              $loading={loadingStates.demo2}
              $color="hsl(var(--secondary))"
              $size="lg"
              $loadingText="Proceso 2"
              $textPosition="bottom"
            />
            {!loadingStates.demo2 && (
              <div className="mt-4 text-green-600 font-medium">
                ✓ Completado
              </div>
            )}
          </div>

          <div className="text-center p-6 border rounded-lg">
            <Spinner
              $type="pulse"
              $loading={loadingStates.demo3}
              $color="hsl(var(--accent))"
              $size="lg"
              $loadingText="Proceso 3"
              $textPosition="bottom"
            />
            {!loadingStates.demo3 && (
              <div className="mt-4 text-green-600 font-medium">
                ✓ Completado
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Estados Actuales</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              Demo 1: {loadingStates.demo1 ? '🔄 Cargando' : '✅ Completado'}
            </p>
            <p>
              Demo 2: {loadingStates.demo2 ? '🔄 Cargando' : '✅ Completado'}
            </p>
            <p>
              Demo 3: {loadingStates.demo3 ? '🔄 Cargando' : '✅ Completado'}
            </p>
          </div>
        </div>
      </div>
    );
  },
};

