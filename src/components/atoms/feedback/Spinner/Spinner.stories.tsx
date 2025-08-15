import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { useSpinnerExamples } from '../../../../stores/spinnerExamples.store';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ✅ Default story con storeKey pattern
export const Default: Story = {
  render: () => (
    <Spinner
      $store={useSpinnerExamples}
      storeKey="defaultExample"
      $type="clip"
      $colorScheme="default"
      $loadingText="Cargando con Store"
    />
  ),
};

// ✅ Theme.css color schemes showcase
export const ThemeColorSchemes: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-4">
      <div className="text-center space-y-2">
        <Spinner $colorScheme="default" $type="ring" $size="lg" />
        <p className="text-sm text-muted-foreground">Default (Primary)</p>
      </div>

      <div className="text-center space-y-2">
        <Spinner $colorScheme="secondary" $type="ring" $size="lg" />
        <p className="text-sm text-muted-foreground">Secondary (Turquesa)</p>
      </div>

      <div className="text-center space-y-2">
        <Spinner $colorScheme="destructive" $type="ring" $size="lg" />
        <p className="text-sm text-muted-foreground">Destructive (Coral)</p>
      </div>

      <div className="text-center space-y-2">
        <Spinner $colorScheme="accent" $type="ring" $size="lg" />
        <p className="text-sm text-muted-foreground">Accent (Violeta)</p>
      </div>

      <div className="text-center space-y-2">
        <Spinner $colorScheme="muted" $type="ring" $size="lg" />
        <p className="text-sm text-muted-foreground">Muted (Neutral)</p>
      </div>

      <div className="text-center space-y-2">
        <Spinner $colorScheme="minimal" $type="ring" $size="lg" />
        <p className="text-sm text-muted-foreground">Minimal (Sutil)</p>
      </div>
    </div>
  ),
};

// ✅ StoreKey pattern con control interactivo
export const WithStoreKey: Story = {
  render: () => {
    const {
      loadingStates,
      toggleLoadingState,
      clearAllSpinner,
      resetDefaults,
    } = useSpinnerExamples();

    return (
      <div className="space-y-8 p-4">
        <h4 className="text-lg font-semibold text-center">
          StoreKey Pattern Demo
        </h4>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => toggleLoadingState('demo1')}
            className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
            Toggle Demo 1
          </button>
          <button
            onClick={() => toggleLoadingState('demo2')}
            className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm">
            Toggle Demo 2
          </button>
          <button
            onClick={() => toggleLoadingState('demo3')}
            className="px-3 py-1 bg-accent text-accent-foreground rounded text-sm">
            Toggle Demo 3
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="text-center p-6 border rounded-lg">
            <Spinner
              $store={useSpinnerExamples}
              storeKey="demo1"
              $type="clip"
              $colorScheme="default"
              $size="lg"
              $loadingText="Proceso 1"
            />
            {!loadingStates.demo1 && (
              <div className="mt-4 text-green-600 font-medium">
                ✓ Completado
              </div>
            )}
          </div>

          <div className="text-center p-6 border rounded-lg">
            <Spinner
              $store={useSpinnerExamples}
              storeKey="demo2"
              $type="ring"
              $colorScheme="secondary"
              $size="lg"
              $loadingText="Proceso 2"
            />
            {!loadingStates.demo2 && (
              <div className="mt-4 text-green-600 font-medium">
                ✓ Completado
              </div>
            )}
          </div>

          <div className="text-center p-6 border rounded-lg">
            <Spinner
              $store={useSpinnerExamples}
              storeKey="demo3"
              $type="pulse"
              $colorScheme="accent"
              $size="lg"
              $loadingText="Proceso 3"
            />
            {!loadingStates.demo3 && (
              <div className="mt-4 text-green-600 font-medium">
                ✓ Completado
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={clearAllSpinner}
            className="px-3 py-1 bg-destructive text-destructive-foreground rounded text-sm">
            Limpiar Todo
          </button>
          <button
            onClick={resetDefaults}
            className="px-3 py-1 bg-muted text-muted-foreground rounded text-sm">
            Restaurar
          </button>
        </div>
      </div>
    );
  },
};

// ✅ Spinner types con theme.css
export const SpinnerTypes: Story = {
  render: () => {
    const spinnerTypes = [
      'clip',
      'bounce',
      'dot',
      'fade',
      'grid',
      'hash',
      'moon',
      'ring',
      'pulse',
      'scale',
      'sync',
      'beat',
    ];

    return (
      <div className="grid grid-cols-4 gap-6 p-4">
        {spinnerTypes.map((type, index) => {
          const colorSchemes = [
            'default',
            'secondary',
            'destructive',
            'accent',
          ];
          const colorScheme = colorSchemes[index % colorSchemes.length];

          return (
            <div key={type} className="text-center space-y-2">
              <Spinner
                $type={type as any}
                $colorScheme={colorScheme as any}
                $size="md"
              />
              <p className="text-xs text-muted-foreground capitalize font-medium">
                {type}
              </p>
            </div>
          );
        })}
      </div>
    );
  },
};

// ✅ Sizes demo con theme.css
export const Sizes: Story = {
  render: () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const colorSchemes = [
      'default',
      'secondary',
      'accent',
      'destructive',
      'muted',
      'minimal',
    ];

    return (
      <div className="flex items-end gap-6 p-4">
        {sizes.map((size, index) => (
          <div key={size} className="text-center space-y-2">
            <Spinner
              $type="clip"
              $colorScheme={colorSchemes[index] as any}
              $size={size as any}
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

// ✅ Text positions demo
export const WithText: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-4">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-center">
          Posiciones del Texto
        </h3>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <Spinner
              $type="moon"
              $colorScheme="default"
              $size="md"
              $loadingText="Cargando arriba"
              $textPosition="top"
            />
          </div>

          <div className="p-4 border rounded-lg">
            <Spinner
              $type="moon"
              $colorScheme="secondary"
              $size="md"
              $loadingText="Cargando abajo"
              $textPosition="bottom"
            />
          </div>

          <div className="p-4 border rounded-lg">
            <Spinner
              $type="moon"
              $colorScheme="accent"
              $size="md"
              $loadingText="Cargando izquierda"
              $textPosition="left"
            />
          </div>

          <div className="p-4 border rounded-lg">
            <Spinner
              $type="moon"
              $colorScheme="destructive"
              $size="md"
              $loadingText="Cargando derecha"
              $textPosition="right"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-center">Contextos Comunes</h3>

        <div className="space-y-4">
          <Spinner
            $type="pulse"
            $colorScheme="default"
            $size="lg"
            $loadingText="Procesando datos..."
            $textPosition="bottom"
          />

          <Spinner
            $type="beat"
            $colorScheme="secondary"
            $size="lg"
            $loadingText="Guardando cambios..."
            $textPosition="bottom"
          />

          <Spinner
            $type="scale"
            $colorScheme="accent"
            $size="lg"
            $loadingText="Conectando al servidor..."
            $textPosition="bottom"
          />
        </div>
      </div>
    </div>
  ),
};

// ✅ Overlay mode demo
export const OverlayMode: Story = {
  render: () => {
    const { overlayExample, toggleLoadingState } = useSpinnerExamples();

    return (
      <div className="relative p-8 space-y-4">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">Modo Overlay</h3>
          <p className="text-muted-foreground">
            Simula un estado de carga global con overlay de fondo
          </p>

          <button
            onClick={() => toggleLoadingState('overlay')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            {overlayExample ? 'Ocultar Overlay' : 'Mostrar Overlay'}
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
          $store={useSpinnerExamples}
          storeKey="overlay"
          $type="moon"
          $colorScheme="default"
          $size="xl"
          $loadingText="Procesando solicitud..."
          $textPosition="bottom"
          $overlay={true}
        />
      </div>
    );
  },
};

