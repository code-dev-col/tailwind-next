import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AlertMessage } from './AlertMessage';
import { useAlertMessageExamples } from '../../../../stores/alertMessageExamples.store';
import {
  FiInfo,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
  FiStar,
  FiHeart,
  FiShield,
} from 'react-icons/fi';

const meta: Meta<typeof AlertMessage> = {
  title: 'Molecules/Feedback/AlertMessage',
  component: AlertMessage,
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
      <AlertMessage
        $store={useAlertMessageExamples}
        storeKey="defaultExample"
        title="Título de ejemplo"
        description="Esta es una descripción de ejemplo para mostrar cómo funciona el componente AlertMessage."
      />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <AlertMessage
        type="info"
        title="Información"
        description="Esta es una alerta informativa para comunicar datos importantes al usuario."
      />
      <AlertMessage
        type="success"
        title="Operación exitosa"
        description="La acción se completó correctamente sin errores."
      />
      <AlertMessage
        type="warning"
        title="Advertencia"
        description="Ten cuidado, esta acción podría tener consecuencias importantes."
      />
      <AlertMessage
        type="error"
        title="Error detectado"
        description="Ha ocurrido un error que impide completar la operación solicitada."
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">Default</h4>
        <AlertMessage
          $variant="default"
          type="info"
          title="Variante por defecto"
          description="Estilo estándar con fondo sutil y borde."
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">Filled</h4>
        <AlertMessage
          $variant="filled"
          type="success"
          title="Variante llena"
          description="Estilo con más contraste y sombra prominente."
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">Outlined</h4>
        <AlertMessage
          $variant="outlined"
          type="warning"
          title="Variante con borde"
          description="Estilo con borde prominente y fondo transparente."
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">Minimal</h4>
        <AlertMessage
          $variant="minimal"
          type="error"
          title="Variante minimalista"
          description="Estilo limpio sin borde ni fondo, solo contenido."
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
        <AlertMessage
          $size="sm"
          type="info"
          title="Alerta pequeña"
          description="Contenido compacto para espacios reducidos."
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-700">Default</h4>
        <AlertMessage
          $size="default"
          type="success"
          title="Alerta predeterminada"
          description="Tamaño estándar para la mayoría de casos de uso."
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-700">Large</h4>
        <AlertMessage
          $size="lg"
          type="warning"
          title="Alerta grande"
          description="Tamaño expandido para contenido importante o prominente."
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
          <AlertMessage
            $colorScheme="default"
            title="Esquema por defecto"
            description="Colores neutros del tema para uso general."
            actions={[{ id: '1', label: 'Entendido', $colorScheme: 'default' }]}
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Secondary</h5>
          <AlertMessage
            $colorScheme="secondary"
            icon={FiCheckCircle}
            title="Esquema secundario"
            description="Colores turquesa para éxito y confirmaciones."
            actions={[
              { id: '1', label: 'Continuar', $colorScheme: 'secondary' },
            ]}
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Accent</h5>
          <AlertMessage
            $colorScheme="accent"
            icon={FiStar}
            title="Esquema de acento"
            description="Colores violeta para destacar información especial."
            actions={[{ id: '1', label: 'Destacar', $colorScheme: 'accent' }]}
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Destructive
          </h5>
          <AlertMessage
            $colorScheme="destructive"
            icon={FiXCircle}
            title="Esquema destructivo"
            description="Colores rojos para errores y acciones peligrosas."
            actions={[
              { id: '1', label: 'Corregir', $colorScheme: 'destructive' },
              { id: '2', label: 'Ignorar', $colorScheme: 'minimal' },
            ]}
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Muted</h5>
          <AlertMessage
            $colorScheme="muted"
            title="Esquema silenciado"
            description="Colores grises para información secundaria."
            actions={[{ id: '1', label: 'Ver más', $colorScheme: 'default' }]}
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Minimal</h5>
          <AlertMessage
            $colorScheme="minimal"
            title="Esquema minimalista"
            description="Estilo transparente para integración sutil."
            actions={[{ id: '1', label: 'Aceptar', $colorScheme: 'minimal' }]}
          />
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Esquemas de color theme.css:</strong> Cada esquema utiliza las
          variables CSS definidas en theme.css con mapeo automático por tipo de
          alerta. Los colores se adaptan automáticamente al modo oscuro.
        </p>
      </div>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <AlertMessage
        type="info"
        title="Confirmación requerida"
        description="¿Estás seguro de que deseas continuar con esta acción?"
        actions={[
          { id: 'confirm', label: 'Confirmar', $colorScheme: 'secondary' },
          { id: 'cancel', label: 'Cancelar', $colorScheme: 'minimal' },
        ]}
      />

      <AlertMessage
        type="warning"
        title="Acción irreversible"
        description="Esta acción no se puede deshacer. Todos los datos se perderán permanentemente."
        actions={[
          { id: 'proceed', label: 'Proceder', $colorScheme: 'destructive' },
          { id: 'backup', label: 'Crear respaldo', $colorScheme: 'accent' },
          { id: 'cancel', label: 'Cancelar', $colorScheme: 'minimal' },
        ]}
      />

      <AlertMessage
        type="success"
        title="Operación completada"
        description="El archivo se guardó correctamente en el servidor."
        actions={[
          { id: 'view', label: 'Ver archivo', $colorScheme: 'secondary' },
          { id: 'share', label: 'Compartir', $colorScheme: 'accent' },
        ]}
      />
    </div>
  ),
};

export const CustomIcons: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <AlertMessage
        icon={FiHeart}
        $colorScheme="accent"
        title="¡Gracias por tu apoyo!"
        description="Tu contribución hace la diferencia en nuestra comunidad."
        actions={[{ id: 'share', label: 'Compartir', $colorScheme: 'accent' }]}
      />

      <AlertMessage
        icon={FiShield}
        $colorScheme="secondary"
        title="Seguridad mejorada"
        description="Se ha activado la autenticación de dos factores en tu cuenta."
        actions={[
          {
            id: 'settings',
            label: 'Ver configuración',
            $colorScheme: 'secondary',
          },
        ]}
      />

      <AlertMessage
        icon={FiStar}
        $colorScheme="accent"
        title="Nueva función disponible"
        description="Descubre las últimas mejoras en tu experiencia de usuario."
        actions={[
          { id: 'explore', label: 'Explorar', $colorScheme: 'accent' },
          { id: 'later', label: 'Más tarde', $colorScheme: 'minimal' },
        ]}
      />
    </div>
  ),
};

export const WithoutClose: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <AlertMessage
        type="warning"
        title="Alerta persistente"
        description="Esta alerta no se puede cerrar hasta completar la acción requerida."
        isClosable={false}
        actions={[
          { id: 'complete', label: 'Completar acción', $colorScheme: 'accent' },
        ]}
      />

      <AlertMessage
        type="info"
        title="Solo botón cerrar oculto"
        description="Permite cerrar por código pero no muestra el botón X."
        showCloseButton={false}
        actions={[{ id: 'close', label: 'Cerrar', $colorScheme: 'minimal' }]}
      />
    </div>
  ),
};

export const WithStore: Story = {
  render: () => {
    const store = useAlertMessageExamples();
    const {
      isAlertVisible,
      alertType,
      alertTitle,
      alertDescription,
      alertActions,
      showAlert,
      hideAlert,
    } = store;

    const handleShowSuccess = () => {
      showAlert({
        type: 'success',
        title: 'Operación exitosa',
        description: 'Los datos se guardaron correctamente.',
        actions: [
          {
            id: 'view',
            label: 'Ver detalles',
            action: 'view',
            $colorScheme: 'secondary',
          },
          {
            id: 'close',
            label: 'Cerrar',
            action: 'close',
            $colorScheme: 'minimal',
          },
        ],
      });
    };

    const handleShowError = () => {
      showAlert({
        type: 'error',
        title: 'Error en el servidor',
        description:
          'No se pudo conectar con el servidor. Inténtalo más tarde.',
        actions: [
          {
            id: 'retry',
            label: 'Reintentar',
            action: 'retry',
            $colorScheme: 'destructive',
          },
          {
            id: 'cancel',
            label: 'Cancelar',
            action: 'cancel',
            $colorScheme: 'minimal',
          },
        ],
      });
    };

    const handleActionClick = (actionId: string) => {
      console.log('Acción ejecutada:', actionId);
      if (actionId === 'close' || actionId === 'cancel') {
        hideAlert();
      }
    };

    return (
      <div className="space-y-4 w-96">
        <div className="flex gap-2">
          <button
            onClick={handleShowSuccess}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors">
            Mostrar Éxito
          </button>
          <button
            onClick={handleShowError}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors">
            Mostrar Error
          </button>
          <button
            onClick={hideAlert}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
            Ocultar
          </button>
        </div>

        {isAlertVisible && (
          <AlertMessage
            type={alertType}
            title={alertTitle}
            description={alertDescription}
            actions={alertActions.map((action) => ({
              id: action.id,
              label: action.label,
              $colorScheme: action.$colorScheme,
              onClick: () => handleActionClick(action.id),
            }))}
            onClose={hideAlert}
          />
        )}

        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Estado del Store:</strong>
          </p>
          <ul className="text-xs text-blue-600 mt-1 space-y-1">
            <li>• Visible: {isAlertVisible ? 'Sí' : 'No'}</li>
            <li>• Tipo: {alertType}</li>
            <li>• Acciones: {alertActions?.length || 0}</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const store = useAlertMessageExamples();
    const {
      clearAllAlertMessage,
      showAlert,
      hideAlert,
      isAlertVisible,
      alertType,
      alertTitle,
      alertDescription,
      alertActions,
    } = store;

    const handleRandomAlert = () => {
      const types = ['info', 'success', 'warning', 'error'] as const;
      const randomType = types[Math.floor(Math.random() * types.length)];

      const titles = {
        info: 'Información actualizada',
        success: 'Proceso completado',
        warning: 'Revisa los datos',
        error: 'Algo salió mal',
      };

      const descriptions = {
        info: 'Se han actualizado los datos del sistema.',
        success: 'La operación se realizó sin problemas.',
        warning: 'Algunos campos requieren tu atención.',
        error: 'Error inesperado en el sistema.',
      };

      showAlert({
        type: randomType,
        title: titles[randomType],
        description: descriptions[randomType],
        actions: [
          {
            id: 'primary',
            label: 'Acción principal',
            $colorScheme: randomType === 'error' ? 'destructive' : 'secondary',
          },
          { id: 'secondary', label: 'Cancelar', $colorScheme: 'minimal' },
        ],
      });
    };

    const handleCustomAlert = () => {
      showAlert({
        type: 'info',
        title: 'Alerta personalizada',
        description:
          'Esta alerta se creó dinámicamente con múltiples acciones.',
        actions: [
          { id: 'action1', label: 'Acción 1', $colorScheme: 'secondary' },
          { id: 'action2', label: 'Acción 2', $colorScheme: 'accent' },
          { id: 'action3', label: 'Peligrosa', $colorScheme: 'destructive' },
          { id: 'close', label: 'Cerrar', $colorScheme: 'minimal' },
        ],
      });
    };

    const handleActionClick = (actionId: string) => {
      console.log('Acción clickeada:', actionId);
      if (actionId === 'close') {
        hideAlert();
      }
    };

    return (
      <div className="space-y-4 w-96">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleRandomAlert}
            className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors">
            Alerta aleatoria
          </button>
          <button
            onClick={handleCustomAlert}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
            Múltiples acciones
          </button>
          <button
            onClick={hideAlert}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
            Ocultar alerta
          </button>
          <button
            onClick={clearAllAlertMessage}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors">
            Limpiar todo
          </button>
        </div>

        {isAlertVisible && (
          <AlertMessage
            type={alertType}
            title={alertTitle}
            description={alertDescription}
            actions={alertActions.map((action) => ({
              id: action.id,
              label: action.label,
              $colorScheme: action.$colorScheme,
              onClick: () => handleActionClick(action.id),
            }))}
            onClose={hideAlert}
          />
        )}

        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            <strong>Funciones interactivas:</strong>
          </p>
          <ul className="text-xs text-green-600 mt-1 space-y-1">
            <li>• Generar alertas aleatorias con diferentes tipos</li>
            <li>• Crear alertas con múltiples acciones</li>
            <li>• Control completo de visibilidad</li>
            <li>• Integración completa con Zustand store</li>
            <li>• Callbacks personalizables para acciones</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const ConfirmationDialogs: Story = {
  render: () => {
    const [showConfirmation, setShowConfirmation] = React.useState<
      string | null
    >(null);

    const handleDeleteFile = () => {
      setShowConfirmation('delete');
    };

    const handleSaveChanges = () => {
      setShowConfirmation('save');
    };

    const handleLogout = () => {
      setShowConfirmation('logout');
    };

    const handleConfirm = (action: string) => {
      console.log(`Acción confirmada: ${action}`);
      setShowConfirmation(null);
      // Aquí iría la lógica específica de cada acción
    };

    const handleCancel = () => {
      setShowConfirmation(null);
    };

    return (
      <div className="space-y-4 w-96">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold mb-3">
            Casos de Uso para Confirmaciones
          </h4>
          <div className="space-y-2">
            <button
              onClick={handleDeleteFile}
              className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
              Eliminar archivo
            </button>
            <button
              onClick={handleSaveChanges}
              className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Guardar cambios
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Confirmación de eliminación */}
        {showConfirmation === 'delete' && (
          <AlertMessage
            type="error"
            title="¿Eliminar archivo?"
            description="Esta acción no se puede deshacer. El archivo se eliminará permanentemente del sistema."
            actions={[
              {
                id: 'confirm',
                label: 'Sí, eliminar',
                $colorScheme: 'destructive',
                onClick: () => handleConfirm('delete'),
              },
              {
                id: 'cancel',
                label: 'Cancelar',
                $colorScheme: 'minimal',
                onClick: handleCancel,
              },
            ]}
            isClosable={false}
          />
        )}

        {/* Confirmación de guardado */}
        {showConfirmation === 'save' && (
          <AlertMessage
            type="warning"
            title="¿Guardar cambios?"
            description="Los cambios actuales sobrescribirán la versión anterior. ¿Deseas continuar?"
            actions={[
              {
                id: 'save',
                label: 'Guardar',
                $colorScheme: 'secondary',
                onClick: () => handleConfirm('save'),
              },
              {
                id: 'backup',
                label: 'Crear copia',
                $colorScheme: 'accent',
                onClick: () => handleConfirm('backup'),
              },
              {
                id: 'cancel',
                label: 'Cancelar',
                $colorScheme: 'minimal',
                onClick: handleCancel,
              },
            ]}
            onClose={handleCancel}
          />
        )}

        {/* Confirmación de logout */}
        {showConfirmation === 'logout' && (
          <AlertMessage
            type="info"
            title="¿Cerrar sesión?"
            description="Se cerrará tu sesión actual. Asegúrate de haber guardado todos tus cambios."
            actions={[
              {
                id: 'logout',
                label: 'Cerrar sesión',
                $colorScheme: 'destructive',
                onClick: () => handleConfirm('logout'),
              },
              {
                id: 'cancel',
                label: 'Permanecer',
                $colorScheme: 'secondary',
                onClick: handleCancel,
              },
            ]}
            onClose={handleCancel}
          />
        )}

        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            <strong>AlertMessage como sistema de confirmación:</strong>
          </p>
          <ul className="text-xs text-green-600 mt-1 space-y-1">
            <li>• Perfecto para confirmar acciones destructivas</li>
            <li>• Múltiples opciones de acción (Sí/No/Cancelar)</li>
            <li>• Iconos automáticos según el tipo de alerta</li>
            <li>• Colores temáticos para diferentes niveles de riesgo</li>
            <li>• Control de cierre opcional para forzar decisión</li>
          </ul>
        </div>
      </div>
    );
  },
};

