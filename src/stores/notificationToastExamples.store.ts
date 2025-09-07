import { create } from 'zustand';

export interface NotificationToastExamplesState {
  // Examples para cada story
  defaultExample: string;
  variantExample: string;
  sizeExample: string;
  interactiveExample: string;

  // Estados para el sistema de notificaciones
  notifications: Array<{
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    duration?: number;
    isVisible: boolean;
    timestamp: number;
  }>;

  // Configuraciones
  maxNotifications: number;
  defaultDuration: number;

  // Estados de ejemplo específicos
  toastTitle: string;
  toastMessage: string;
  toastType: 'info' | 'success' | 'warning' | 'error';
  showToast: boolean;

  // Setters básicos
  setDefaultExample: (value: string) => void;
  setVariantExample: (value: string) => void;
  setSizeExample: (value: string) => void;
  setInteractiveExample: (value: string) => void;

  setToastTitle: (title: string) => void;
  setToastMessage: (message: string) => void;
  setToastType: (type: 'info' | 'success' | 'warning' | 'error') => void;
  setShowToast: (show: boolean) => void;

  // Funciones de notificaciones
  addNotification: (notification: {
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    duration?: number;
  }) => string;

  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;

  // Funciones de demostración
  showSuccessToast: () => void;
  showErrorToast: () => void;
  showWarningToast: () => void;
  showInfoToast: () => void;

  // Utilidades
  clearAllNotificationToast: () => void;
}

export const useNotificationToastExamples =
  create<NotificationToastExamplesState>((set, get) => ({
    // Estados iniciales
    defaultExample: '',
    variantExample: '',
    sizeExample: '',
    interactiveExample: '',

    notifications: [],
    maxNotifications: 5,
    defaultDuration: 5000, // 5 segundos

    toastTitle: 'Notificación de ejemplo',
    toastMessage:
      'Este es un mensaje de prueba para mostrar cómo funciona el toast.',
    toastType: 'info',
    showToast: false,

    // Setters básicos
    setDefaultExample: (value: string) => set({ defaultExample: value }),
    setVariantExample: (value: string) => set({ variantExample: value }),
    setSizeExample: (value: string) => set({ sizeExample: value }),
    setInteractiveExample: (value: string) =>
      set({ interactiveExample: value }),

    setToastTitle: (title: string) => set({ toastTitle: title }),
    setToastMessage: (message: string) => set({ toastMessage: message }),
    setToastType: (type: 'info' | 'success' | 'warning' | 'error') =>
      set({ toastType: type }),
    setShowToast: (show: boolean) => set({ showToast: show }),

    // Sistema de notificaciones
    addNotification: (notification) => {
      const id = `toast-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const newNotification = {
        id,
        ...notification,
        isVisible: true,
        timestamp: Date.now(),
        duration: notification.duration || get().defaultDuration,
      };

      set((state) => {
        const updatedNotifications = [newNotification, ...state.notifications];

        // Limitar el número máximo de notificaciones
        if (updatedNotifications.length > state.maxNotifications) {
          updatedNotifications.splice(state.maxNotifications);
        }

        return { notifications: updatedNotifications };
      });

      // Auto-remover después del tiempo especificado
      if (newNotification.duration > 0) {
        setTimeout(() => {
          get().removeNotification(id);
        }, newNotification.duration);
      }

      return id;
    },

    removeNotification: (id: string) => {
      set((state) => ({
        notifications: state.notifications.filter(
          (notification) => notification.id !== id
        ),
      }));
    },

    clearAllNotifications: () => {
      set({ notifications: [] });
    },

    // Funciones de demostración
    showSuccessToast: () => {
      get().addNotification({
        type: 'success',
        title: 'Operación exitosa',
        message: 'La acción se completó correctamente sin errores.',
      });
    },

    showErrorToast: () => {
      get().addNotification({
        type: 'error',
        title: 'Error detectado',
        message: 'Ha ocurrido un problema que requiere tu atención.',
        duration: 8000, // Errores duran más tiempo
      });
    },

    showWarningToast: () => {
      get().addNotification({
        type: 'warning',
        title: 'Advertencia importante',
        message: 'Revisa la configuración antes de continuar.',
      });
    },

    showInfoToast: () => {
      get().addNotification({
        type: 'info',
        title: 'Información actualizada',
        message: 'Se han aplicado los nuevos cambios en el sistema.',
      });
    },

    // Limpiar todo
    clearAllNotificationToast: () =>
      set({
        defaultExample: '',
        variantExample: '',
        sizeExample: '',
        interactiveExample: '',
        notifications: [],
        toastTitle: 'Notificación de ejemplo',
        toastMessage:
          'Este es un mensaje de prueba para mostrar cómo funciona el toast.',
        toastType: 'info',
        showToast: false,
      }),
  }));

