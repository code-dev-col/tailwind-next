import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProgressCard } from './ProgressCard';
import { useProgressCardExamples } from '../../../../stores/progressCardExamples.store';
import {
  FiDownload,
  FiUpload,
  FiSettings,
  FiCheckCircle,
  FiXCircle,
  FiRefreshCw,
  FiPause,
  FiPlay,
} from 'react-icons/fi';

const meta: Meta<typeof ProgressCard> = {
  title: 'Molecules/Feedback/ProgressCard',
  component: ProgressCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <ProgressCard
        $store={useProgressCardExamples}
        storeKey="defaultExample"
        title="Subiendo archivo"
        description="archivo.pdf - 2.4 MB"
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">Default</h4>
        <ProgressCard
          $variant="default"
          value={45}
          title="Procesando datos"
          description="Analizando información del usuario..."
          status="loading"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">Compact</h4>
        <ProgressCard
          $variant="compact"
          value={78}
          title="Instalación"
          status="loading"
          showPercentage
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">Detailed</h4>
        <ProgressCard
          $variant="detailed"
          value={90}
          title="Optimizando imágenes"
          description="Comprimiendo archivos para mejorar el rendimiento web. Este proceso puede tomar varios minutos dependiendo del tamaño de las imágenes."
          status="loading"
          actions={[
            { id: 'pause', label: 'Pausar', $colorScheme: 'minimal' },
            { id: 'cancel', label: 'Cancelar', $colorScheme: 'destructive' },
          ]}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">Circular</h4>
        <ProgressCard
          $variant="circular"
          value={65}
          title="Descarga"
          description="archivo.zip"
          status="loading"
          showPercentage
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-700">Small</h4>
        <ProgressCard
          $size="sm"
          value={35}
          title="Guardando configuración"
          status="loading"
          showPercentage
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-700">Default</h4>
        <ProgressCard
          $size="default"
          value={60}
          title="Creando backup"
          description="Respaldando datos importantes..."
          status="loading"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-700">Large</h4>
        <ProgressCard
          $size="lg"
          value={25}
          title="Entrenando modelo IA"
          description="Procesando conjunto de datos de 50,000 muestras. Tiempo estimado: 2 horas."
          status="loading"
          actions={[
            { id: 'details', label: 'Ver detalles', $colorScheme: 'secondary' },
          ]}
        />
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h4 className="text-lg font-semibold">Esquemas de Color theme.css</h4>

      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Default</h5>
          <ProgressCard
            $colorScheme="default"
            value={40}
            title="Procesamiento estándar"
            description="Usando colores neutros del tema."
            status="loading"
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Secondary</h5>
          <ProgressCard
            $colorScheme="secondary"
            value={75}
            title="Validación exitosa"
            description="Verificando credenciales del usuario."
            status="success"
            actions={[
              { id: 'view', label: 'Ver resultado', $colorScheme: 'secondary' },
            ]}
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Accent</h5>
          <ProgressCard
            $colorScheme="accent"
            value={90}
            title="Configuración avanzada"
            description="Aplicando ajustes de rendimiento."
            status="warning"
            statusText="Revisión necesaria"
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Destructive
          </h5>
          <ProgressCard
            $colorScheme="destructive"
            value={15}
            title="Error en transferencia"
            description="La conexión se perdió durante la operación."
            status="error"
            actions={[
              { id: 'retry', label: 'Reintentar', $colorScheme: 'destructive' },
              { id: 'cancel', label: 'Cancelar', $colorScheme: 'minimal' },
            ]}
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Muted</h5>
          <ProgressCard
            $colorScheme="muted"
            value={0}
            title="En cola de espera"
            description="Aguardando disponibilidad del servidor."
            status="idle"
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Minimal</h5>
          <ProgressCard
            $colorScheme="minimal"
            value={100}
            title="Completado silenciosamente"
            description="Operación finalizada en segundo plano."
            status="success"
            hideIcon
          />
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Esquemas de color theme.css:</strong> Cada esquema usa colores
          consistentes para contenedor, texto y progress bar. Los colores se
          adaptan automáticamente al modo oscuro.
        </p>
      </div>
    </div>
  ),
};

export const StatusTypes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <ProgressCard
        value={0}
        title="Tarea en espera"
        description="Esperando recursos disponibles para comenzar."
        status="idle"
      />

      <ProgressCard
        value={45}
        title="Procesando solicitud"
        description="Analizando datos recibidos del cliente."
        status="loading"
      />

      <ProgressCard
        value={100}
        title="Operación completada"
        description="Todos los archivos se procesaron correctamente."
        status="success"
      />

      <ProgressCard
        value={30}
        title="Error de conexión"
        description="No se pudo establecer conexión con el servidor."
        status="error"
        actions={[
          { id: 'retry', label: 'Reintentar', $colorScheme: 'destructive' },
          {
            id: 'support',
            label: 'Contactar soporte',
            $colorScheme: 'secondary',
          },
        ]}
      />

      <ProgressCard
        value={85}
        title="Verificación pendiente"
        description="La operación requiere confirmación del administrador."
        status="warning"
        statusText="Revisión manual"
        actions={[
          { id: 'notify', label: 'Notificar admin', $colorScheme: 'accent' },
        ]}
      />
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <ProgressCard
        value={60}
        title="Descargando actualizaciones"
        description="version-2.5.0.zip - 145 MB de 240 MB"
        status="loading"
        actions={[
          {
            id: 'pause',
            label: 'Pausar',
            $colorScheme: 'minimal',
            icon: FiPause,
          },
          {
            id: 'cancel',
            label: 'Cancelar',
            $colorScheme: 'destructive',
            icon: FiXCircle,
          },
        ]}
      />

      <ProgressCard
        value={100}
        title="Instalación completada"
        description="La aplicación se instaló correctamente en el sistema."
        status="success"
        actions={[
          {
            id: 'launch',
            label: 'Abrir aplicación',
            $colorScheme: 'secondary',
            icon: FiPlay,
          },
          {
            id: 'settings',
            label: 'Configurar',
            $colorScheme: 'accent',
            icon: FiSettings,
          },
        ]}
      />

      <ProgressCard
        value={20}
        title="Error de permisos"
        description="No se tienen suficientes permisos para completar la operación."
        status="error"
        actions={[
          {
            id: 'retry-admin',
            label: 'Reintentar como admin',
            $colorScheme: 'destructive',
            icon: FiRefreshCw,
          },
          {
            id: 'change-location',
            label: 'Cambiar ubicación',
            $colorScheme: 'secondary',
          },
          {
            id: 'cancel',
            label: 'Cancelar',
            $colorScheme: 'minimal',
          },
        ]}
      />
    </div>
  ),
};

export const CircularVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <ProgressCard
        $variant="circular"
        $size="sm"
        value={25}
        title="CPU"
        description="Uso del procesador"
        status="idle"
        $colorScheme="muted"
      />

      <ProgressCard
        $variant="circular"
        $size="default"
        value={70}
        title="Memoria RAM"
        description="8.2 GB de 16 GB"
        status="warning"
        $colorScheme="accent"
      />

      <ProgressCard
        $variant="circular"
        $size="lg"
        value={90}
        title="Disco SSD"
        description="450 GB de 500 GB"
        status="warning"
        $colorScheme="destructive"
        actions={[
          {
            id: 'clean',
            label: 'Limpiar archivos',
            $colorScheme: 'destructive',
          },
        ]}
      />

      <ProgressCard
        $variant="circular"
        $size="default"
        value={100}
        title="Backup"
        description="Completado"
        status="success"
        $colorScheme="secondary"
        hideActions
      />
    </div>
  ),
};

export const WithStore: Story = {
  render: () => {
    const store = useProgressCardExamples();
    const {
      taskProgress,
      taskTitle,
      taskDescription,
      isLoading,
      isCompleted,
      setTaskProgress,
      incrementProgress,
      resetProgress,
      startSimulation,
      stopSimulation,
    } = store;

    const handleIncrement = () => {
      incrementProgress('taskProgress', 15);
    };

    const handleReset = () => {
      resetProgress('taskProgress');
    };

    const handleStartSimulation = () => {
      startSimulation('task');
    };

    const handleStopSimulation = () => {
      stopSimulation();
    };

    return (
      <div className="space-y-4 w-96">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleIncrement}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
            +15%
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
            Reset
          </button>
          <button
            onClick={handleStartSimulation}
            disabled={isLoading}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors disabled:opacity-50">
            Simular progreso
          </button>
          <button
            onClick={handleStopSimulation}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors">
            Detener
          </button>
        </div>

        <ProgressCard
          value={taskProgress}
          title={taskTitle}
          description={taskDescription}
          status={isCompleted ? 'success' : isLoading ? 'loading' : 'idle'}
          statusText={
            isCompleted ? 'Finalizado' : isLoading ? 'En progreso' : 'Esperando'
          }
          actions={
            isLoading
              ? [
                  {
                    id: 'stop',
                    label: 'Detener',
                    $colorScheme: 'destructive',
                    onClick: handleStopSimulation,
                  },
                ]
              : isCompleted
              ? [
                  {
                    id: 'restart',
                    label: 'Reiniciar',
                    $colorScheme: 'secondary',
                    onClick: handleReset,
                  },
                ]
              : [
                  {
                    id: 'start',
                    label: 'Iniciar',
                    $colorScheme: 'secondary',
                    onClick: handleStartSimulation,
                  },
                ]
          }
        />

        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Estado del Store:</strong>
          </p>
          <ul className="text-xs text-blue-600 mt-1 space-y-1">
            <li>• Progreso: {taskProgress}%</li>
            <li>• Cargando: {isLoading ? 'Sí' : 'No'}</li>
            <li>• Completado: {isCompleted ? 'Sí' : 'No'}</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const {
      downloadProgress,
      uploadProgress,
      clearAllProgressCard,
      startSimulation,
      stopSimulation,
      incrementProgress,
      resetProgress,
    } = useProgressCardExamples();

    const handleRandomIncrement = (
      type: 'downloadProgress' | 'uploadProgress'
    ) => {
      const randomIncrement = Math.floor(Math.random() * 20) + 5; // 5-25%
      incrementProgress(type, randomIncrement);
    };

    const handleStartDownload = () => {
      startSimulation('download');
    };

    const handleStartUpload = () => {
      startSimulation('upload');
    };

    return (
      <div className="space-y-4 w-96">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleRandomIncrement('downloadProgress')}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors">
            Descargar +
          </button>
          <button
            onClick={() => handleRandomIncrement('uploadProgress')}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
            Subir +
          </button>
          <button
            onClick={handleStartDownload}
            className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors">
            Simular descarga
          </button>
          <button
            onClick={handleStartUpload}
            className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors">
            Simular subida
          </button>
          <button
            onClick={stopSimulation}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors">
            Detener todo
          </button>
          <button
            onClick={clearAllProgressCard}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
            Limpiar
          </button>
        </div>

        <div className="space-y-4">
          <ProgressCard
            value={downloadProgress}
            title="Descargando archivo"
            description={`archivo-grande.zip - ${downloadProgress}% completado`}
            status={
              downloadProgress >= 100
                ? 'success'
                : downloadProgress > 0
                ? 'loading'
                : 'idle'
            }
            $colorScheme="secondary"
            actions={[
              {
                id: 'pause-download',
                label: 'Pausar',
                $colorScheme: 'minimal',
                icon: FiPause,
              },
              {
                id: 'cancel-download',
                label: 'Cancelar',
                $colorScheme: 'destructive',
                onClick: () => resetProgress('downloadProgress'),
              },
            ]}
          />

          <ProgressCard
            value={uploadProgress}
            title="Subiendo respaldo"
            description={`backup-${new Date().toLocaleDateString()}.tar.gz`}
            status={
              uploadProgress >= 100
                ? 'success'
                : uploadProgress > 0
                ? 'loading'
                : 'idle'
            }
            $colorScheme="accent"
            $variant="compact"
            actions={[
              {
                id: 'upload-priority',
                label: 'Prioridad alta',
                $colorScheme: 'accent',
              },
              {
                id: 'cancel-upload',
                label: 'Cancelar',
                $colorScheme: 'minimal',
                onClick: () => resetProgress('uploadProgress'),
              },
            ]}
          />
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            <strong>Funciones interactivas:</strong>
          </p>
          <ul className="text-xs text-green-600 mt-1 space-y-1">
            <li>• Incremento manual de progreso (aleatorio 5-25%)</li>
            <li>• Simulaciones automáticas de descarga/subida</li>
            <li>• Control de estados múltiples simultáneos</li>
            <li>• Integración completa con Zustand store</li>
            <li>• Callbacks personalizables para acciones</li>
            <li>• Estados auto-actualizables (idle → loading → success)</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h4 className="text-lg font-semibold">Casos de Uso Reales</h4>

      <div className="space-y-4">
        {/* File Upload */}
        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Subida de archivo
          </h5>
          <ProgressCard
            value={78}
            title="Subiendo documento.pdf"
            description="2.3 MB de 2.9 MB • Velocidad: 1.2 MB/s"
            status="loading"
            $colorScheme="secondary"
            actions={[
              {
                id: 'pause',
                label: 'Pausar',
                $colorScheme: 'minimal',
                icon: FiPause,
              },
              {
                id: 'cancel',
                label: 'Cancelar',
                $colorScheme: 'destructive',
                icon: FiXCircle,
              },
            ]}
          />
        </div>

        {/* System Installation */}
        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Instalación de software
          </h5>
          <ProgressCard
            value={45}
            title="Instalando Adobe Creative Suite"
            description="Paso 3 de 7: Configurando componentes principales"
            status="loading"
            statusText="Instalando"
            actions={[
              {
                id: 'details',
                label: 'Ver detalles',
                $colorScheme: 'secondary',
              },
            ]}
          />
        </div>

        {/* Data Processing */}
        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Procesamiento de datos
          </h5>
          <ProgressCard
            value={92}
            title="Analizando transacciones"
            description="Procesados 45,820 de 50,000 registros"
            status="loading"
            $colorScheme="accent"
            $variant="detailed"
          />
        </div>

        {/* Backup Operation */}
        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Operación de respaldo
          </h5>
          <ProgressCard
            value={100}
            title="Backup completado"
            description="Respaldados 15.2 GB en 47 minutos"
            status="success"
            $colorScheme="secondary"
            actions={[
              {
                id: 'verify',
                label: 'Verificar integridad',
                $colorScheme: 'secondary',
                icon: FiCheckCircle,
              },
              {
                id: 'schedule',
                label: 'Programar siguiente',
                $colorScheme: 'accent',
              },
            ]}
          />
        </div>

        {/* Error Recovery */}
        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Recuperación de error
          </h5>
          <ProgressCard
            value={35}
            title="Error de red detectado"
            description="Conexión interrumpida durante la sincronización"
            status="error"
            $colorScheme="destructive"
            actions={[
              {
                id: 'retry',
                label: 'Reintentar ahora',
                $colorScheme: 'destructive',
                icon: FiRefreshCw,
              },
              {
                id: 'offline',
                label: 'Continuar sin conexión',
                $colorScheme: 'secondary',
              },
            ]}
          />
        </div>
      </div>

      <div className="p-4 bg-purple-50 rounded-lg">
        <p className="text-sm text-purple-700">
          <strong>ProgressCard como componente universal:</strong>
        </p>
        <ul className="text-xs text-purple-600 mt-1 space-y-1">
          <li>• Perfecto para operaciones de larga duración</li>
          <li>• Estados automáticos según el progreso</li>
          <li>• Acciones contextuales por tipo de operación</li>
          <li>• Información detallada sin sobrecargar la UI</li>
          <li>• Consistencia visual en toda la aplicación</li>
        </ul>
      </div>
    </div>
  ),
};

