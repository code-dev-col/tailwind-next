import { create } from 'zustand';

interface AlertMessageExamplesState {
  // Estados para stories
  defaultExample: string;
  sizeExample: string;
  variantExample: string;
  storeExample: string;
  interactiveExample: string;

  // Estados específicos del AlertMessage
  isAlertVisible: boolean;
  alertType: 'info' | 'success' | 'warning' | 'error';
  alertTitle: string;
  alertDescription: string;
  alertActions: Array<{
    id: string;
    label: string;
    action?: string;
    $colorScheme?:
      | 'default'
      | 'secondary'
      | 'destructive'
      | 'accent'
      | 'minimal';
  }>;
  dismissedAlerts: string[];

  // Setters
  setDefaultExample: (value: string) => void;
  setSizeExample: (value: string) => void;
  setVariantExample: (value: string) => void;
  setStoreExample: (value: string) => void;
  setInteractiveExample: (value: string) => void;
  setIsAlertVisible: (value: boolean) => void;
  setAlertType: (type: 'info' | 'success' | 'warning' | 'error') => void;
  setAlertTitle: (title: string) => void;
  setAlertDescription: (description: string) => void;
  setAlertActions: (actions: Array<any>) => void;
  dismissAlert: (id: string) => void;
  showAlert: (config: any) => void;
  hideAlert: () => void;

  // Utilidad de limpieza
  clearAllAlertMessage: () => void;
}

export const useAlertMessageExamples = create<AlertMessageExamplesState>(
  (set, get) => ({
    // Estados iniciales
    defaultExample: '',
    sizeExample: '',
    variantExample: '',
    storeExample: '',
    interactiveExample: '',
    isAlertVisible: true,
    alertType: 'info',
    alertTitle: 'Información importante',
    alertDescription:
      'Esta es una descripción de ejemplo para el AlertMessage conectado al store.',
    alertActions: [
      {
        id: 'primary',
        label: 'Aceptar',
        action: 'accept',
        $colorScheme: 'secondary',
      },
      {
        id: 'secondary',
        label: 'Cancelar',
        action: 'cancel',
        $colorScheme: 'minimal',
      },
    ],
    dismissedAlerts: [],

    // Setters básicos
    setDefaultExample: (value: string) => set({ defaultExample: value }),
    setSizeExample: (value: string) => set({ sizeExample: value }),
    setVariantExample: (value: string) => set({ variantExample: value }),
    setStoreExample: (value: string) => set({ storeExample: value }),
    setInteractiveExample: (value: string) =>
      set({ interactiveExample: value }),
    setIsAlertVisible: (value: boolean) => set({ isAlertVisible: value }),
    setAlertType: (type) => set({ alertType: type }),
    setAlertTitle: (title: string) => set({ alertTitle: title }),
    setAlertDescription: (description: string) =>
      set({ alertDescription: description }),
    setAlertActions: (actions) => set({ alertActions: actions }),

    // Dismiss alert
    dismissAlert: (id: string) =>
      set((state) => ({
        dismissedAlerts: [...state.dismissedAlerts, id],
        isAlertVisible: false,
      })),

    // Show alert with config
    showAlert: (config) =>
      set({
        isAlertVisible: true,
        alertType: config.type || 'info',
        alertTitle: config.title || 'Alerta',
        alertDescription: config.description || 'Descripción de la alerta',
        alertActions: config.actions || [],
      }),

    // Hide alert
    hideAlert: () => set({ isAlertVisible: false }),

    // Limpiar todo
    clearAllAlertMessage: () =>
      set({
        defaultExample: '',
        sizeExample: '',
        variantExample: '',
        storeExample: '',
        interactiveExample: '',
        isAlertVisible: false,
        alertType: 'info',
        alertTitle: '',
        alertDescription: '',
        alertActions: [],
        dismissedAlerts: [],
      }),
  })
);

