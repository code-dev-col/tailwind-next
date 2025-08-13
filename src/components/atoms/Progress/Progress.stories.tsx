import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import { useProgressExamples } from '../../../stores/progressExamples.store';
import {
  FiDownload,
  FiUpload,
  FiSettings,
  FiLoader,
  FiStar,
  FiPlay,
  FiPause,
  FiRefreshCw,
} from 'react-icons/fi';

const meta: Meta<typeof Progress> = {
  title: 'Atoms/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor actual del progreso (0-100)',
    },
    max: {
      control: { type: 'number', min: 1, max: 1000, step: 1 },
      description: 'Valor máximo del progreso',
    },
    $variant: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'destructive',
        'accent',
        'success',
        'warning',
      ],
      description: 'Variante visual del progress',
    },
    $size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Tamaño del progress',
    },
    $shape: {
      control: 'select',
      options: ['rounded', 'square', 'circular'],
      description: 'Forma del progress',
    },
    $striped: {
      control: 'boolean',
      description: 'Mostrar patrón rayado',
    },
    $animated: {
      control: 'boolean',
      description: 'Animación pulsante',
    },
    $showValue: {
      control: 'boolean',
      description: 'Mostrar valor numérico',
    },
    $showPercentage: {
      control: 'boolean',
      description: 'Mostrar porcentaje',
    },
    label: {
      control: 'text',
      description: 'Etiqueta del progress',
    },
    description: {
      control: 'text',
      description: 'Descripción adicional',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Progress
        $store={useProgressExamples}
        storeKey="defaultExample"
        label="Progreso básico"
        $showPercentage
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Progress $variant="default" value={65} label="Default" $showPercentage />
      <Progress $variant="primary" value={75} label="Primary" $showPercentage />
      <Progress
        $variant="secondary"
        value={55}
        label="Secondary"
        $showPercentage
      />
      <Progress $variant="success" value={90} label="Success" $showPercentage />
      <Progress $variant="warning" value={45} label="Warning" $showPercentage />
      <Progress
        $variant="destructive"
        value={25}
        label="Destructive"
        $showPercentage
      />
      <Progress $variant="accent" value={85} label="Accent" $showPercentage />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Progress $size="sm" value={40} label="Small Progress" $showPercentage />
      <Progress
        $size="default"
        value={65}
        label="Default Progress"
        $showPercentage
      />
      <Progress $size="lg" value={80} label="Large Progress" $showPercentage />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4 w-80">
        <h4 className="text-lg font-semibold">Linear Progress</h4>
        <Progress $shape="rounded" value={70} label="Rounded" $showPercentage />
        <Progress $shape="square" value={70} label="Square" $showPercentage />
      </div>

      <div className="text-center">
        <h4 className="text-lg font-semibold mb-4">Circular Progress</h4>
        <div className="flex gap-8 justify-center">
          <Progress
            $shape="circular"
            value={75}
            $variant="primary"
            $showPercentage
            $circularSize={100}
          />
          <Progress
            $shape="circular"
            value={60}
            $variant="success"
            $showPercentage
            $circularSize={120}
            $strokeWidth={10}
          />
          <Progress
            $shape="circular"
            value={45}
            $variant="warning"
            $showPercentage
            $circularSize={80}
            $strokeWidth={6}
          />
        </div>
      </div>
    </div>
  ),
};

export const StripedAndAnimated: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Progress value={70} label="Progress básico" $showPercentage />
      <Progress
        value={70}
        label="Progress rayado"
        $striped
        $variant="primary"
        $showPercentage
      />
      <Progress
        value={70}
        label="Progress animado"
        $animated
        $variant="secondary"
        $showPercentage
      />
      <Progress
        value={70}
        label="Rayado + Animado"
        $striped
        $animated
        $variant="accent"
        $showPercentage
      />
    </div>
  ),
};

export const InteractiveControls: Story = {
  render: () => {
    const {
      defaultExample,
      setDefaultExample,
      sizeExample,
      setSizeExample,
      variantExample,
      setVariantExample,
    } = useProgressExamples();

    return (
      <div className="space-y-8 w-96">
        <div>
          <h4 className="text-lg font-semibold mb-4">Controles Interactivos</h4>

          <div className="space-y-6">
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
                $variant="primary"
                $showPercentage
              />
            </div>

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
                $variant="secondary"
                $size="lg"
                $showPercentage
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Progress Variante: {variantExample}%
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
                $variant="accent"
                $striped
                $showPercentage
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AnimatedProgress: Story = {
  render: () => {
    const { animatedExample, isAnimating, startAnimation, stopAnimation } =
      useProgressExamples();

    return (
      <div className="space-y-6 w-96">
        <h4 className="text-lg font-semibold">Progress Animado</h4>

        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors">
              <FiPlay size={16} />
              Iniciar
            </button>
            <button
              onClick={stopAnimation}
              disabled={!isAnimating}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors">
              <FiPause size={16} />
              Detener
            </button>
          </div>

          <Progress
            $store={useProgressExamples}
            storeKey="animatedExample"
            label={`Progreso automático ${isAnimating ? '(En progreso...)' : '(Detenido)'}`}
            $variant="primary"
            $striped
            $animated={isAnimating}
            $showPercentage
          />

          <div className="flex justify-center">
            <Progress
              $store={useProgressExamples}
              storeKey="animatedExample"
              $shape="circular"
              $variant="secondary"
              $showPercentage
              $circularSize={120}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const RealWorldExamples: Story = {
  render: () => {
    const {
      downloadProgress,
      uploadProgress,
      installProgress,
      loadingProgress,
      skillProgress,
      setDownloadProgress,
      setUploadProgress,
      setInstallProgress,
      setLoadingProgress,
      setSkillProgress,
    } = useProgressExamples();

    return (
      <div className="space-y-8 w-96">
        <h4 className="text-lg font-semibold">Ejemplos del Mundo Real</h4>

        <div className="space-y-6">
          {/* Download Progress */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <FiDownload className="text-blue-600" />
              <span className="font-medium">Descargando archivo.zip</span>
              <button
                onClick={() =>
                  setDownloadProgress(Math.min(100, downloadProgress + 10))
                }
                className="ml-auto text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                +10%
              </button>
            </div>
            <Progress
              value={downloadProgress}
              $variant="primary"
              $showPercentage
              description={`${Math.round((downloadProgress / 100) * 125)} MB / 125 MB`}
            />
          </div>

          {/* Upload Progress */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <FiUpload className="text-green-600" />
              <span className="font-medium">Subiendo imágenes</span>
              <button
                onClick={() =>
                  setUploadProgress(Math.min(100, uploadProgress + 15))
                }
                className="ml-auto text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                +15%
              </button>
            </div>
            <Progress
              value={uploadProgress}
              $variant="success"
              $striped
              $showPercentage
              description="3 de 8 archivos completados"
            />
          </div>

          {/* Installation Progress */}
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <FiSettings className="text-purple-600" />
              <span className="font-medium">Instalando dependencias</span>
              <button
                onClick={() =>
                  setInstallProgress(Math.min(100, installProgress + 5))
                }
                className="ml-auto text-xs bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600">
                +5%
              </button>
            </div>
            <Progress
              value={installProgress}
              $variant="accent"
              $striped
              $animated
              $showPercentage
              description="Configurando paquetes del sistema..."
            />
          </div>

          {/* Loading Progress */}
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-3 mb-3">
              <FiLoader className="text-yellow-600" />
              <span className="font-medium">Cargando datos</span>
              <button
                onClick={() =>
                  setLoadingProgress(Math.min(100, loadingProgress + 20))
                }
                className="ml-auto text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                +20%
              </button>
            </div>
            <Progress
              value={loadingProgress}
              $variant="warning"
              $size="sm"
              $showPercentage
              description="Sincronizando con el servidor..."
            />
          </div>

          {/* Skill Progress */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <FiStar className="text-gray-600" />
              <span className="font-medium">Habilidad en React</span>
              <button
                onClick={() =>
                  setSkillProgress(Math.min(100, skillProgress + 3))
                }
                className="ml-auto text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">
                +3%
              </button>
            </div>
            <div className="flex items-center gap-4">
              <Progress
                value={skillProgress}
                $variant="default"
                $size="lg"
                $showPercentage
                className="flex-1"
              />
              <Progress
                value={skillProgress}
                $shape="circular"
                $variant="primary"
                $showPercentage
                $circularSize={60}
                $strokeWidth={6}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setDownloadProgress(0);
              setUploadProgress(0);
              setInstallProgress(0);
              setLoadingProgress(0);
              setSkillProgress(0);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
            <FiRefreshCw size={16} />
            Reiniciar Todo
          </button>
        </div>
      </div>
    );
  },
};

export const CircularShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <h4 className="text-lg font-semibold text-center">
        Galería de Progress Circular
      </h4>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        <div className="text-center">
          <Progress
            value={25}
            $shape="circular"
            $variant="destructive"
            $showPercentage
            $circularSize={80}
            $strokeWidth={8}
          />
          <p className="text-sm text-gray-600 mt-2">Crítico</p>
        </div>

        <div className="text-center">
          <Progress
            value={50}
            $shape="circular"
            $variant="warning"
            $showPercentage
            $circularSize={100}
            $strokeWidth={10}
          />
          <p className="text-sm text-gray-600 mt-2">Advertencia</p>
        </div>

        <div className="text-center">
          <Progress
            value={75}
            $shape="circular"
            $variant="primary"
            $showPercentage
            $circularSize={120}
            $strokeWidth={12}
          />
          <p className="text-sm text-gray-600 mt-2">Bueno</p>
        </div>

        <div className="text-center">
          <Progress
            value={95}
            $shape="circular"
            $variant="success"
            $showPercentage
            $circularSize={100}
            $strokeWidth={10}
          />
          <p className="text-sm text-gray-600 mt-2">Excelente</p>
        </div>
      </div>

      <div className="flex justify-center gap-8">
        <div className="text-center">
          <Progress
            value={68}
            $shape="circular"
            $variant="secondary"
            $showValue
            max={200}
            $circularSize={140}
            $strokeWidth={14}
          />
          <p className="text-sm text-gray-600 mt-2">Custom Max (200)</p>
        </div>

        <div className="text-center">
          <Progress
            value={42}
            $shape="circular"
            $variant="accent"
            $showPercentage
            $circularSize={140}
            $strokeWidth={6}
          />
          <p className="text-sm text-gray-600 mt-2">Stroke Fino</p>
        </div>
      </div>
    </div>
  ),
};

export const WithStoreIntegration: Story = {
  render: () => {
    const {
      defaultExample,
      sizeExample,
      variantExample,
      downloadProgress,
      skillProgress,
      resetAllProgress,
    } = useProgressExamples();

    return (
      <div className="space-y-8 w-96">
        <h4 className="text-lg font-semibold">Integración con Store</h4>

        <div className="space-y-6">
          <Progress
            $store={useProgressExamples}
            storeKey="defaultExample"
            label="Progress con Store"
            $variant="primary"
            $showPercentage
          />

          <Progress
            $store={useProgressExamples}
            storeKey="sizeExample"
            label="Tamaño desde Store"
            $variant="secondary"
            $size="lg"
            $striped
            $showPercentage
          />

          <Progress
            $store={useProgressExamples}
            storeKey="variantExample"
            label="Variante desde Store"
            $variant="accent"
            $showPercentage
          />

          <div className="grid grid-cols-2 gap-4">
            <Progress
              $store={useProgressExamples}
              storeKey="downloadProgress"
              $shape="circular"
              $variant="success"
              $showPercentage
              $circularSize={80}
            />
            <Progress
              $store={useProgressExamples}
              storeKey="skillProgress"
              $shape="circular"
              $variant="warning"
              $showPercentage
              $circularSize={80}
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium mb-2">Estado actual del store:</h5>
          <pre className="text-xs text-gray-600 bg-white p-2 rounded overflow-auto">
            {JSON.stringify(
              {
                defaultExample,
                sizeExample,
                variantExample,
                downloadProgress,
                skillProgress,
              },
              null,
              2
            )}
          </pre>
        </div>

        <button
          onClick={resetAllProgress}
          className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
          Reiniciar todos los Progress
        </button>
      </div>
    );
  },
};

