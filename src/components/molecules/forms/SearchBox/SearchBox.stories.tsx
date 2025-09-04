import type { Meta, StoryObj } from '@storybook/react';
import { SearchBox } from './SearchBox';
import { useSearchBoxExamples } from '../../../../stores/searchBoxExamples.store';

const meta: Meta<typeof SearchBox> = {
  title: 'Molecules/Forms/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'centered',
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
        'ghost',
        'custom',
      ],
    },
    $size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    $variant: {
      control: 'select',
      options: ['default', 'compact', 'fullWidth'],
    },
    $iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ✅ Stories obligatorias con storeKey pattern:

export const Default: Story = {
  render: () => (
    <SearchBox
      $store={useSearchBoxExamples}
      storeKey="defaultExample"
      placeholder="Buscar productos..."
      onSearch={(query) => console.log('Búsqueda:', query)}
      onClear={() => console.log('Búsqueda limpiada')}
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Default</h3>
        <SearchBox placeholder="Búsqueda normal..." $variant="default" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Compact</h3>
        <SearchBox placeholder="Compacta..." $variant="compact" />
      </div>

      <div className="space-y-2 w-full max-w-2xl">
        <h3 className="text-sm font-medium text-foreground">Full Width</h3>
        <SearchBox
          placeholder="Búsqueda de ancho completo..."
          $variant="fullWidth"
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Small</h3>
        <SearchBox placeholder="Búsqueda pequeña..." $size="sm" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Default</h3>
        <SearchBox placeholder="Búsqueda normal..." $size="default" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Large</h3>
        <SearchBox placeholder="Búsqueda grande..." $size="lg" />
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-4xl">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Default</h3>
        <SearchBox placeholder="Esquema default..." $colorScheme="default" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Secondary</h3>
        <SearchBox
          placeholder="Esquema secondary..."
          $colorScheme="secondary"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Accent</h3>
        <SearchBox placeholder="Esquema accent..." $colorScheme="accent" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Muted</h3>
        <SearchBox placeholder="Esquema muted..." $colorScheme="muted" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Minimal</h3>
        <SearchBox placeholder="Esquema minimal..." $colorScheme="minimal" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Destructive</h3>
        <SearchBox
          placeholder="Esquema destructive..."
          $colorScheme="destructive"
        />
      </div>
    </div>
  ),
};

export const IconPositions: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Icon Left</h3>
        <SearchBox placeholder="Icono a la izquierda..." $iconPosition="left" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">
          Icon Right (Button)
        </h3>
        <SearchBox
          placeholder="Botón de búsqueda a la derecha..."
          $iconPosition="right"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">
          No Icon + Compact
        </h3>
        <SearchBox
          placeholder="Sin icono, con botón..."
          $showSearchIcon={false}
          $variant="compact"
        />
      </div>
    </div>
  ),
};

export const StoreIntegration: Story = {
  render: () => {
    const { clearAllSearchBox } = useSearchBoxExamples();

    return (
      <div className="space-y-6 max-w-lg">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">
              SearchBox con Store (defaultExample)
            </h3>
            <SearchBox
              $store={useSearchBoxExamples}
              storeKey="defaultExample"
              placeholder="Escribe algo aquí..."
              onSearch={(query) => console.log('🔍 Búsqueda:', query)}
              onClear={() => console.log('🧹 Clear ejecutado')}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">
              Otro SearchBox (variantExample)
            </h3>
            <SearchBox
              $store={useSearchBoxExamples}
              storeKey="variantExample"
              placeholder="Este usa otro storeKey..."
              $colorScheme="secondary"
            />
          </div>
        </div>

        <div className="p-4 bg-muted/20 rounded-md space-y-3">
          <h4 className="text-sm font-medium text-foreground">
            📊 Estado del Store en tiempo real
          </h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">defaultExample:</span>{' '}
              <code className="bg-muted px-1 rounded text-xs">
                "{useSearchBoxExamples((state) => state.defaultExample)}"
              </code>
            </div>
            <div>
              <span className="font-medium">variantExample:</span>{' '}
              <code className="bg-muted px-1 rounded text-xs">
                "{useSearchBoxExamples((state) => state.variantExample)}"
              </code>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">🧪 Pruebas:</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              1. ✏️ Escribe en cualquier campo → Se actualiza el store
              automáticamente
            </p>
            <p>
              2. ❌ Usa el botón "X" de clear → Se limpia el store específico
            </p>
            <p>3. 🗑️ Usa "Limpiar Store" → Se limpian todos los valores</p>
            <p>4. ⌨️ Presiona Enter → Ejecuta búsqueda con valor del store</p>
          </div>
        </div>

        <button
          onClick={clearAllSearchBox}
          className="w-full px-4 py-2 bg-destructive/10 text-destructive rounded-md text-sm hover:bg-destructive/20 transition-colors">
          🗑️ Limpiar Todo el Store
        </button>
      </div>
    );
  },
};

export const WithStore: Story = {
  render: () => {
    const { clearAllSearchBox } = useSearchBoxExamples();

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">
            Conectado a Store
          </h3>
          <SearchBox
            $store={useSearchBoxExamples}
            storeKey="interactiveExample"
            placeholder="Búsqueda con store..."
            onSearch={(query) => console.log('Búsqueda desde store:', query)}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Estado del Store
          </h3>
          <p className="text-sm text-muted-foreground">
            Valor actual: "
            {useSearchBoxExamples((state) => state.interactiveExample)}"
          </p>
        </div>

        <button
          onClick={clearAllSearchBox}
          className="px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-muted/80 transition-colors">
          Limpiar Store
        </button>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Normal</h3>
        <SearchBox placeholder="Estado normal..." value="Valor de ejemplo" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Disabled</h3>
        <SearchBox
          placeholder="Estado deshabilitado..."
          value="Deshabilitado"
          disabled
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Loading</h3>
        <SearchBox
          placeholder="Estado cargando..."
          value="Cargando..."
          loading
          $iconPosition="right"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">
          Con Clear Button
        </h3>
        <SearchBox
          placeholder="Escribe algo para ver el botón limpiar..."
          value="Texto con botón clear"
          $showClearButton
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">
          Sin Clear Button
        </h3>
        <SearchBox
          placeholder="Sin botón limpiar..."
          value="Texto sin botón clear"
          $showClearButton={false}
        />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const { clearAllSearchBox } = useSearchBoxExamples();

    return (
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">
            SearchBox Interactivo
          </h3>
          <SearchBox
            $store={useSearchBoxExamples}
            storeKey="fullWidthExample"
            placeholder="Buscar productos, servicios..."
            $variant="fullWidth"
            $colorScheme="secondary"
            onSearch={(query) => {
              console.log('🔍 Búsqueda ejecutada:', query);
              alert(`Buscando: "${query}"`);
            }}
            onClear={() => {
              console.log('🧹 Búsqueda limpiada');
            }}
            onChange={(value) => {
              console.log('✏️ Valor cambiado:', value);
            }}
          />
        </div>

        <div className="p-4 bg-muted/20 rounded-md space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Información de Estado
          </h4>
          <div className="text-sm space-y-1">
            <p>
              <span className="font-medium">Valor actual:</span>{' '}
              <code className="bg-muted px-1 rounded text-xs">
                "{useSearchBoxExamples((state) => state.fullWidthExample)}"
              </code>
            </p>
            <p>
              <span className="font-medium">Longitud:</span>{' '}
              {useSearchBoxExamples((state) => state.fullWidthExample).length}{' '}
              caracteres
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={clearAllSearchBox}
            className="px-3 py-1 bg-destructive/10 text-destructive rounded text-sm hover:bg-destructive/20 transition-colors">
            Limpiar Todo
          </button>

          <button
            onClick={() => {
              // Simular búsqueda
              const value = useSearchBoxExamples.getState().fullWidthExample;
              if (value.trim()) {
                console.log('🚀 Búsqueda programática:', value);
                alert(`Búsqueda programática: "${value}"`);
              }
            }}
            className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors">
            Buscar Programáticamente
          </button>
        </div>
      </div>
    );
  },
};

export const WithGradients: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">
          Gradiente Sunset
        </h3>
        <SearchBox
          placeholder="Con gradiente sunset..."
          $custom="bg-gradient-to-r from-orange-400 to-pink-400 border-transparent text-white placeholder:text-white/70"
          $colorScheme="custom"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Gradiente Ocean</h3>
        <SearchBox
          placeholder="Con gradiente ocean..."
          $custom="bg-gradient-to-r from-blue-400 to-cyan-400 border-transparent text-white placeholder:text-white/70"
          $colorScheme="custom"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">
          Gradiente Forest
        </h3>
        <SearchBox
          placeholder="Con gradiente forest..."
          $custom="bg-gradient-to-r from-green-400 to-emerald-400 border-transparent text-white placeholder:text-white/70"
          $colorScheme="custom"
        />
      </div>
    </div>
  ),
};

