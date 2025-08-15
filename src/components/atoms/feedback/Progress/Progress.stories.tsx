import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import { useProgressExamples } from '../../../../stores/progressExamples.store';

const meta: Meta<typeof Progress> = {
  title: 'Atoms/Progress',
  component: Progress,
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
    <div className="w-80">
      <Progress
        $store={useProgressExamples}
        storeKey="defaultExample"
        label="Progreso con Store"
        $showPercentage
      />
    </div>
  ),
};

// ✅ Theme.css color schemes showcase
export const ThemeColorSchemes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Progress
        $colorScheme="default"
        value={65}
        label="Default (Primary)"
        $showPercentage
      />
      <Progress
        $colorScheme="secondary"
        value={75}
        label="Secondary (Turquesa)"
        $showPercentage
      />
      <Progress
        $colorScheme="destructive"
        value={45}
        label="Destructive (Coral)"
        $showPercentage
      />
      <Progress
        $colorScheme="accent"
        value={85}
        label="Accent (Violeta)"
        $showPercentage
      />
      <Progress
        $colorScheme="muted"
        value={55}
        label="Muted (Neutral)"
        $showPercentage
      />
      <Progress
        $colorScheme="minimal"
        value={35}
        label="Minimal (Sutil)"
        $showPercentage
      />
      <Progress
        $colorScheme="outline"
        value={70}
        label="Outline (Borde)"
        $showPercentage
      />
      <Progress
        $colorScheme="ghost"
        value={50}
        label="Ghost (Transparente)"
        $showPercentage
      />
    </div>
  ),
};

// ✅ StoreKey pattern con diferentes ejemplos
export const WithStoreKey: Story = {
  render: () => {
    const {
      defaultExample,
      sizeExample,
      variantExample,
      setDefaultExample,
      setSizeExample,
      setVariantExample,
    } = useProgressExamples();

    return (
      <div className="space-y-8 w-96">
        <h4 className="text-lg font-semibold text-center">
          StoreKey Pattern Demo
        </h4>

        <div className="space-y-6">
          {/* Progress con control interactivo */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Progress Principal: {defaultExample}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={defaultExample}
              onChange={(e) => setDefaultExample(Number(e.target.value))}
              className="w-full mb-3"
            />
            <Progress
              $store={useProgressExamples}
              storeKey="defaultExample"
              $colorScheme="default"
              $showPercentage
            />
          </div>

          {/* Progress con tamaño */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Progress Tamaño: {sizeExample}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={sizeExample}
              onChange={(e) => setSizeExample(Number(e.target.value))}
              className="w-full mb-3"
            />
            <Progress
              $store={useProgressExamples}
              storeKey="sizeExample"
              $colorScheme="secondary"
              $size="lg"
              $showPercentage
            />
          </div>

          {/* Progress con efectos */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Progress con Efectos: {variantExample}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={variantExample}
              onChange={(e) => setVariantExample(Number(e.target.value))}
              className="w-full mb-3"
            />
            <Progress
              $store={useProgressExamples}
              storeKey="variantExample"
              $colorScheme="accent"
              $striped
              $animated
              $showPercentage
            />
          </div>
        </div>
      </div>
    );
  },
};

// ✅ Circular progress con theme.css
export const CircularProgress: Story = {
  render: () => (
    <div className="space-y-8">
      <h4 className="text-lg font-semibold text-center">
        Circular Progress con Theme.css
      </h4>

      <div className="grid grid-cols-4 gap-8 justify-items-center">
        <div className="text-center">
          <Progress
            value={25}
            $shape="circular"
            $colorScheme="destructive"
            $showPercentage
            $circularSize={100}
            $strokeWidth={8}
          />
          <p className="text-sm text-muted-foreground mt-2">Destructive</p>
        </div>

        <div className="text-center">
          <Progress
            value={75}
            $shape="circular"
            $colorScheme="default"
            $showPercentage
            $circularSize={100}
            $strokeWidth={8}
          />
          <p className="text-sm text-muted-foreground mt-2">Default</p>
        </div>

        <div className="text-center">
          <Progress
            value={95}
            $shape="circular"
            $colorScheme="secondary"
            $showPercentage
            $circularSize={100}
            $strokeWidth={8}
          />
          <p className="text-sm text-muted-foreground mt-2">Secondary</p>
        </div>

        <div className="text-center">
          <Progress
            value={65}
            $shape="circular"
            $colorScheme="accent"
            $showPercentage
            $circularSize={100}
            $strokeWidth={8}
          />
          <p className="text-sm text-muted-foreground mt-2">Accent</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 justify-items-center">
        <div className="text-center">
          <Progress
            value={80}
            $shape="circular"
            $colorScheme="outline"
            $showPercentage
            $circularSize={100}
            $strokeWidth={8}
          />
          <p className="text-sm text-muted-foreground mt-2">Outline</p>
        </div>

        <div className="text-center">
          <Progress
            $store={useProgressExamples}
            storeKey="circularExample"
            $shape="circular"
            $colorScheme="ghost"
            $showPercentage
            $circularSize={120}
            $strokeWidth={10}
          />
          <p className="text-sm text-muted-foreground mt-2">Ghost con Store</p>
        </div>

        <div className="text-center">
          <Progress
            value={40}
            $shape="circular"
            $colorScheme="minimal"
            $showPercentage
            $circularSize={100}
            $strokeWidth={8}
          />
          <p className="text-sm text-muted-foreground mt-2">Minimal</p>
        </div>
      </div>
    </div>
  ),
};

// ✅ Sizes y shapes demo
export const SizesAndShapes: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Tamaños</h4>
        <Progress
          $size="sm"
          value={40}
          label="Small"
          $colorScheme="default"
          $showPercentage
        />
        <Progress
          $size="default"
          value={65}
          label="Default"
          $colorScheme="secondary"
          $showPercentage
        />
        <Progress
          $size="lg"
          value={80}
          label="Large"
          $colorScheme="accent"
          $showPercentage
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Formas</h4>
        <Progress
          $shape="rounded"
          value={70}
          label="Rounded"
          $colorScheme="default"
          $showPercentage
        />
        <Progress
          $shape="square"
          value={70}
          label="Square"
          $colorScheme="secondary"
          $showPercentage
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Efectos</h4>
        <Progress
          value={60}
          label="Normal"
          $colorScheme="accent"
          $showPercentage
        />
        <Progress
          value={60}
          label="Striped"
          $colorScheme="accent"
          $striped
          $showPercentage
        />
        <Progress
          value={60}
          label="Animated"
          $colorScheme="accent"
          $animated
          $showPercentage
        />
        <Progress
          value={60}
          label="Striped + Animated"
          $colorScheme="accent"
          $striped
          $animated
          $showPercentage
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Esquemas Especiales</h4>
        <Progress
          value={70}
          label="Outline"
          $colorScheme="outline"
          $showPercentage
        />
        <Progress
          value={50}
          label="Ghost"
          $colorScheme="ghost"
          $showPercentage
        />
        <Progress
          value={80}
          label="Ghost + Striped"
          $colorScheme="ghost"
          $striped
          $showPercentage
        />
      </div>
    </div>
  ),
};

// ✅ Real world example con store
export const RealWorldExample: Story = {
  render: () => {
    const {
      downloadProgress,
      uploadProgress,
      installProgress,
      setDownloadProgress,
      setUploadProgress,
      setInstallProgress,
      resetAllProgress,
    } = useProgressExamples();

    return (
      <div className="space-y-6 w-96">
        <h4 className="text-lg font-semibold">Ejemplos Reales con Store</h4>

        <div className="space-y-6">
          {/* Download Progress */}
          <div className="p-4 bg-card rounded-lg border">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-medium">Descargando archivo.zip</span>
              <button
                onClick={() =>
                  setDownloadProgress(Math.min(100, downloadProgress + 10))
                }
                className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                +10%
              </button>
            </div>
            <Progress
              $store={useProgressExamples}
              storeKey="downloadProgress"
              $colorScheme="default"
              $showPercentage
              description={`${Math.round((downloadProgress / 100) * 125)} MB / 125 MB`}
            />
          </div>

          {/* Upload Progress */}
          <div className="p-4 bg-card rounded-lg border">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-medium">Subiendo imágenes</span>
              <button
                onClick={() =>
                  setUploadProgress(Math.min(100, uploadProgress + 15))
                }
                className="ml-auto text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                +15%
              </button>
            </div>
            <Progress
              $store={useProgressExamples}
              storeKey="uploadProgress"
              $colorScheme="secondary"
              $striped
              $showPercentage
              description="3 de 8 archivos completados"
            />
          </div>

          {/* Installation Progress */}
          <div className="p-4 bg-card rounded-lg border">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-medium">Instalando dependencias</span>
              <button
                onClick={() =>
                  setInstallProgress(Math.min(100, installProgress + 5))
                }
                className="ml-auto text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                +5%
              </button>
            </div>
            <Progress
              $store={useProgressExamples}
              storeKey="installProgress"
              $colorScheme="accent"
              $striped
              $animated
              $showPercentage
              description="Configurando paquetes del sistema..."
            />
          </div>
        </div>

        <button
          onClick={resetAllProgress}
          className="w-full px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors">
          Reiniciar Todo
        </button>
      </div>
    );
  },
};

