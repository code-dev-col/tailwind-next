import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NotificationToast } from './NotificationToast';
import { useNotificationToastExamples } from '../../../../stores/notificationToastExamples.store';
import {
  FiDownload,
  FiUpload,
  FiSettings,
  FiUser,
  FiMail,
  FiShield,
  FiWifi,
  FiBell,
} from 'react-icons/fi';

const meta: Meta<typeof NotificationToast> = {
  title: 'Molecules/Feedback/NotificationToast',
  component: NotificationToast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-96 h-32 relative">
      <NotificationToast
        $store={useNotificationToastExamples}
        storeKey="defaultExample"
        title="Notificación básica"
        message="Esta es una notificación de ejemplo para mostrar el comportamiento por defecto."
        type="info"
        $position="top-right"
      />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <NotificationToast
        type="info"
        title="Información importante"
        message="Hay actualizaciones disponibles para el sistema."
        duration={0} // No auto-dismiss para demo
      />

      <NotificationToast
        type="success"
        title="Operación completada"
        message="El archivo se guardó correctamente en el servidor."
        duration={0}
      />

      <NotificationToast
        type="warning"
        title="Advertencia de seguridad"
        message="Se detectó un intento de acceso no autorizado."
        duration={0}
      />

      <NotificationToast
        type="error"
        title="Error de conexión"
        message="No se pudo conectar con el servidor. Verifica tu conexión."
        duration={0}
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-lg">
      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">Default</h4>
        <NotificationToast
          $variant="default"
          type="info"
          title="Notificación estándar"
          message="Layout balanceado con espaciado normal y toda la información visible."
          duration={0}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">Compact</h4>
        <NotificationToast
          $variant="compact"
          type="success"
          title="Versión compacta"
          message="Espaciado reducido para ahorrar espacio en pantalla."
          duration={0}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">Detailed</h4>
        <NotificationToast
          $variant="detailed"
          type="warning"
          title="Versión detallada"
          message="Más espacio para contenido extenso y múltiples acciones disponibles."
          duration={0}
          actions={[
            { id: 'view', label: 'Ver detalles', $colorScheme: 'accent' },
            { id: 'dismiss', label: 'Descartar', $colorScheme: 'minimal' },
          ]}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">Floating</h4>
        <NotificationToast
          $variant="floating"
          type="info"
          title="Estilo flotante"
          message="Efecto de cristal con backdrop blur para overlay elegante."
          duration={0}
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-700">Small</h4>
        <NotificationToast
          $size="sm"
          type="info"
          title="Toast pequeño"
          message="Ideal para espacios reducidos."
          duration={0}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-700">Default</h4>
        <NotificationToast
          $size="default"
          type="success"
          title="Toast estándar"
          message="Tamaño balanceado para la mayoría de casos de uso."
          duration={0}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-700">Large</h4>
        <NotificationToast
          $size="lg"
          type="warning"
          title="Toast grande"
          message="Más espacio para contenido detallado y múltiples acciones. Perfecto para notificaciones importantes que requieren la atención completa del usuario."
          duration={0}
          actions={[
            {
              id: 'action1',
              label: 'Acción principal',
              $colorScheme: 'accent',
            },
            { id: 'action2', label: 'Secundaria', $colorScheme: 'minimal' },
          ]}
        />
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <h4 className="text-lg font-semibold">Esquemas de Color theme.css</h4>

      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Default</h5>
          <NotificationToast
            $colorScheme="default"
            title="Esquema por defecto"
            message="Colores neutros para uso general."
            duration={0}
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Secondary</h5>
          <NotificationToast
            $colorScheme="secondary"
            title="Esquema secundario"
            message="Perfecto para confirmaciones y éxitos."
            duration={0}
            actions={[
              { id: 'view', label: 'Ver resultado', $colorScheme: 'secondary' },
            ]}
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Accent</h5>
          <NotificationToast
            $colorScheme="accent"
            title="Esquema de acento"
            message="Para destacar información especial o promocional."
            duration={0}
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Destructive
          </h5>
          <NotificationToast
            $colorScheme="destructive"
            title="Esquema destructivo"
            message="Errores críticos y alertas importantes."
            duration={0}
            actions={[
              { id: 'retry', label: 'Reintentar', $colorScheme: 'destructive' },
              { id: 'cancel', label: 'Cancelar', $colorScheme: 'minimal' },
            ]}
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Muted</h5>
          <NotificationToast
            $colorScheme="muted"
            title="Esquema silenciado"
            message="Para información secundaria o de menor importancia."
            duration={0}
          />
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Minimal</h5>
          <NotificationToast
            $colorScheme="minimal"
            title="Esquema minimalista"
            message="Integración sutil con transparencia."
            duration={0}
          />
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Esquemas de color theme.css:</strong> Los colores se mapean
          automáticamente según el tipo de notificación, pero pueden
          sobrescribirse manualmente para casos específicos.
        </p>
      </div>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-lg">
      <NotificationToast
        type="info"
        title="Actualización disponible"
        message="Una nueva versión de la aplicación está lista para instalar."
        duration={0}
        actions={[
          { id: 'install', label: 'Instalar ahora', $colorScheme: 'secondary' },
          { id: 'later', label: 'Más tarde', $colorScheme: 'minimal' },
        ]}
      />

      <NotificationToast
        type="success"
        title="Archivo subido correctamente"
        message="documento.pdf se guardó en la carpeta Documentos."
        duration={0}
        actions={[
          { id: 'open', label: 'Abrir archivo', $colorScheme: 'secondary' },
          { id: 'share', label: 'Compartir', $colorScheme: 'accent' },
          { id: 'rename', label: 'Renombrar', $colorScheme: 'minimal' },
        ]}
      />

      <NotificationToast
        type="error"
        title="Error de sincronización"
        message="No se pudieron sincronizar 3 archivos con la nube."
        duration={0}
        actions={[
          {
            id: 'retry-all',
            label: 'Reintentar todo',
            $colorScheme: 'destructive',
          },
          {
            id: 'retry-failed',
            label: 'Solo fallidos',
            $colorScheme: 'accent',
          },
          { id: 'ignore', label: 'Ignorar errores', $colorScheme: 'minimal' },
        ]}
      />

      <NotificationToast
        type="warning"
        title="Espacio de almacenamiento bajo"
        message="Quedan solo 2.1 GB disponibles. Considera liberar espacio."
        duration={0}
        $variant="detailed"
        actions={[
          {
            id: 'cleanup',
            label: 'Limpiar automáticamente',
            $colorScheme: 'accent',
          },
          {
            id: 'manage',
            label: 'Administrar archivos',
            $colorScheme: 'secondary',
          },
          {
            id: 'upgrade',
            label: 'Ampliar almacenamiento',
            $colorScheme: 'accent',
          },
        ]}
      />
    </div>
  ),
};

export const AutoDismiss: Story = {
  render: () => {
    const [showToast, setShowToast] = React.useState(false);
    const [toastType, setToastType] = React.useState<
      'info' | 'success' | 'warning' | 'error'
    >('info');

    const handleShowToast = (type: typeof toastType) => {
      setToastType(type);
      setShowToast(true);

      // Auto-hide for demo
      setTimeout(() => setShowToast(false), 4000);
    };

    return (
      <div className="space-y-4 w-full max-w-md">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleShowToast('info')}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
            Info (3s)
          </button>
          <button
            onClick={() => handleShowToast('success')}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors">
            Success (3s)
          </button>
          <button
            onClick={() => handleShowToast('warning')}
            className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors">
            Warning (5s)
          </button>
          <button
            onClick={() => handleShowToast('error')}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors">
            Error (8s)
          </button>
        </div>

        {showToast && (
          <NotificationToast
            type={toastType}
            title={`Notificación ${toastType}`}
            message="Esta notificación se cerrará automáticamente."
            duration={
              toastType === 'error'
                ? 8000
                : toastType === 'warning'
                ? 5000
                : 3000
            }
            onClose={() => setShowToast(false)}
            $animated
            $animationType="fade"
          />
        )}

        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Auto-dismiss configurado:</strong>
          </p>
          <ul className="text-xs text-blue-600 mt-1 space-y-1">
            <li>• Info/Success: 3 segundos</li>
            <li>• Warning: 5 segundos</li>
            <li>• Error: 8 segundos (más tiempo para leer)</li>
            <li>• duration={'{0}'} = no se cierra automáticamente</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const Positioning: Story = {
  render: () => {
    const [activePosition, setActivePosition] = React.useState<
      | 'top-right'
      | 'top-left'
      | 'bottom-right'
      | 'bottom-left'
      | 'top-center'
      | 'bottom-center'
    >('top-right');

    const positions = [
      { key: 'top-right' as const, label: 'Top Right' },
      { key: 'top-left' as const, label: 'Top Left' },
      { key: 'top-center' as const, label: 'Top Center' },
      { key: 'bottom-right' as const, label: 'Bottom Right' },
      { key: 'bottom-left' as const, label: 'Bottom Left' },
      { key: 'bottom-center' as const, label: 'Bottom Center' },
    ];

    return (
      <div className="space-y-4 w-full max-w-md relative h-96">
        <div className="grid grid-cols-3 gap-2">
          {positions.map((position) => (
            <button
              key={position.key}
              onClick={() => setActivePosition(position.key)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                activePosition === position.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}>
              {position.label}
            </button>
          ))}
        </div>

        <NotificationToast
          type="info"
          title={`Posición: ${activePosition}`}
          message="Esta notificación se posiciona según la configuración seleccionada."
          $position={activePosition}
          duration={0}
          $animated
          $animationType="slide"
        />

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Posicionamiento automático:</strong> Las notificaciones se
            pueden posicionar en cualquier esquina o centro de la pantalla con
            animaciones direccionales apropiadas.
          </p>
        </div>
      </div>
    );
  },
};

export const WithStore: Story = {
  render: () => {
    const store = useNotificationToastExamples();
    const {
      notifications,
      addNotification,
      removeNotification,
      clearAllNotifications,
      showSuccessToast,
      showErrorToast,
      showWarningToast,
      showInfoToast,
    } = store;

    return (
      <div className="space-y-4 w-full max-w-md">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={showSuccessToast}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors">
            Éxito
          </button>
          <button
            onClick={showErrorToast}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors">
            Error
          </button>
          <button
            onClick={showWarningToast}
            className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors">
            Advertencia
          </button>
          <button
            onClick={showInfoToast}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
            Info
          </button>
          <button
            onClick={clearAllNotifications}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
            Limpiar todo
          </button>
        </div>

        {/* Container para las notificaciones */}
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
          {notifications.map((notification) => (
            <NotificationToast
              key={notification.id}
              type={notification.type}
              title={notification.title}
              message={notification.message}
              isVisible={notification.isVisible}
              onClose={() => removeNotification(notification.id)}
              $animated
              $animationType="slide"
              $position="top-right"
            />
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Sistema de notificaciones completo:</strong>
          </p>
          <ul className="text-xs text-blue-600 mt-1 space-y-1">
            <li>• Gestión automática de múltiples toasts</li>
            <li>• Auto-dismiss configurado por tipo</li>
            <li>• Stack de notificaciones con límite máximo</li>
            <li>• Integración completa con Zustand store</li>
            <li>• Posicionamiento automático</li>
            <li>• Notificaciones activas: {notifications.length}</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const {
      addNotification,
      removeNotification,
      clearAllNotifications,
      notifications,
    } = useNotificationToastExamples();

    const handleCustomNotification = () => {
      addNotification({
        type: 'info',
        title: 'Notificación personalizada',
        message: `Creada a las ${new Date().toLocaleTimeString()}`,
        duration: 4000,
      });
    };

    const handleMultipleNotifications = () => {
      const types: Array<'info' | 'success' | 'warning' | 'error'> = [
        'info',
        'success',
        'warning',
        'error',
      ];
      types.forEach((type, index) => {
        setTimeout(() => {
          addNotification({
            type,
            title: `Notificación ${type}`,
            message: `Mensaje de ejemplo para ${type}`,
            duration: 6000,
          });
        }, index * 500);
      });
    };

    const handlePersistentNotification = () => {
      addNotification({
        type: 'warning',
        title: 'Notificación persistente',
        message: 'Esta notificación no se cierra automáticamente.',
        duration: 0, // No auto-dismiss
      });
    };

    return (
      <div className="space-y-4 w-full max-w-md">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleCustomNotification}
            className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors">
            Toast personalizado
          </button>
          <button
            onClick={handleMultipleNotifications}
            className="px-3 py-1 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-600 transition-colors">
            Múltiples secuenciales
          </button>
          <button
            onClick={handlePersistentNotification}
            className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors">
            Toast persistente
          </button>
          <button
            onClick={clearAllNotifications}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors">
            Limpiar todo
          </button>
        </div>

        {/* Sistema de notificaciones */}
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
          {notifications.slice(0, 5).map((notification) => (
            <NotificationToast
              key={notification.id}
              type={notification.type}
              title={notification.title}
              message={notification.message}
              isVisible={notification.isVisible}
              duration={notification.duration}
              onClose={() => removeNotification(notification.id)}
              $animated
              $animationType="slide"
              $position="top-right"
              actions={
                notification.duration === 0
                  ? [
                      {
                        id: 'dismiss',
                        label: 'Cerrar',
                        $colorScheme: 'minimal',
                        onClick: () => removeNotification(notification.id),
                      },
                    ]
                  : undefined
              }
            />
          ))}
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            <strong>Funciones interactivas:</strong>
          </p>
          <ul className="text-xs text-green-600 mt-1 space-y-1">
            <li>• Creación de toasts personalizados con timestamp</li>
            <li>• Secuencia animada de múltiples notificaciones</li>
            <li>• Notificaciones persistentes que requieren acción manual</li>
            <li>• Stack automático con límite de 5 notificaciones</li>
            <li>• Control granular de duración y comportamiento</li>
            <li>• Activas: {notifications.length}</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const UseCases: Story = {
  render: () => {
    const { addNotification } = useNotificationToastExamples();

    const useCases = [
      {
        title: 'Sistema de archivos',
        action: () =>
          addNotification({
            type: 'success',
            title: 'Archivo guardado',
            message: 'documento.pdf se guardó en Documentos',
            duration: 3000,
          }),
        buttonText: 'Guardar archivo',
        color: 'bg-green-500 hover:bg-green-600',
      },
      {
        title: 'Conectividad',
        action: () =>
          addNotification({
            type: 'error',
            title: 'Sin conexión a internet',
            message: 'Verifica tu conexión de red',
            duration: 0, // Persistente hasta resolver
          }),
        buttonText: 'Error de red',
        color: 'bg-red-500 hover:bg-red-600',
      },
      {
        title: 'Actualizaciones',
        action: () =>
          addNotification({
            type: 'info',
            title: 'Actualización disponible',
            message: 'Nueva versión 2.1.0 lista para instalar',
            duration: 10000,
          }),
        buttonText: 'Nueva versión',
        color: 'bg-blue-500 hover:bg-blue-600',
      },
      {
        title: 'Seguridad',
        action: () =>
          addNotification({
            type: 'warning',
            title: 'Intento de acceso sospechoso',
            message: 'IP 192.168.1.105 bloqueada automáticamente',
            duration: 8000,
          }),
        buttonText: 'Alerta seguridad',
        color: 'bg-yellow-500 hover:bg-yellow-600',
      },
      {
        title: 'Usuario',
        action: () =>
          addNotification({
            type: 'success',
            title: 'Sesión iniciada',
            message: '¡Bienvenido de vuelta, Ana!',
            duration: 4000,
          }),
        buttonText: 'Login exitoso',
        color: 'bg-green-500 hover:bg-green-600',
      },
      {
        title: 'Sistema',
        action: () =>
          addNotification({
            type: 'warning',
            title: 'Espacio en disco bajo',
            message: 'Solo quedan 2.1 GB disponibles',
            duration: 0, // Persistente
          }),
        buttonText: 'Espacio disco',
        color: 'bg-orange-500 hover:bg-orange-600',
      },
    ];

    return (
      <div className="space-y-6 w-full max-w-md">
        <h4 className="text-lg font-semibold">Casos de Uso Reales</h4>

        <div className="grid grid-cols-2 gap-3">
          {useCases.map((useCase, index) => (
            <div key={index} className="space-y-2">
              <h5 className="text-sm font-medium text-gray-700">
                {useCase.title}
              </h5>
              <button
                onClick={useCase.action}
                className={`w-full px-3 py-2 text-white rounded text-sm transition-colors ${useCase.color}`}>
                {useCase.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-700">
            <strong>NotificationToast como sistema universal:</strong>
          </p>
          <ul className="text-xs text-purple-600 mt-1 space-y-1">
            <li>• Feedback inmediato para todas las acciones del usuario</li>
            <li>• Comunicación no intrusiva de estados del sistema</li>
            <li>• Alertas contextuales con duración apropiada</li>
            <li>• Información persistente para issues críticos</li>
            <li>• Confirmaciones automáticas de operaciones</li>
          </ul>
        </div>
      </div>
    );
  },
};

