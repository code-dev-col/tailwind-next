import { create } from 'zustand';

interface EmptyStateExamplesState {
  // Estados para cada story de EmptyState
  defaultExample: string;
  variantExample: string;
  sizeExample: string;
  colorSchemeExample: string;
  iconExample: string;
  actionExample: string;
  interactiveExample: string;
  withDescriptionExample: string;
  noActionExample: string;
  customExample: string;

  // Setters tipados para cada estado
  setDefaultExample: (value: string) => void;
  setVariantExample: (value: string) => void;
  setSizeExample: (value: string) => void;
  setColorSchemeExample: (value: string) => void;
  setIconExample: (value: string) => void;
  setActionExample: (value: string) => void;
  setInteractiveExample: (value: string) => void;
  setWithDescriptionExample: (value: string) => void;
  setNoActionExample: (value: string) => void;
  setCustomExample: (value: string) => void;

  // Estados para casos de uso específicos
  searchResults: string;
  favoriteItems: string;
  notifications: string;
  uploadedFiles: string;
  shoppingCart: string;

  // Setters para casos de uso
  setSearchResults: (value: string) => void;
  setFavoriteItems: (value: string) => void;
  setNotifications: (value: string) => void;
  setUploadedFiles: (value: string) => void;
  setShoppingCart: (value: string) => void;

  // Configuración de EmptyState dinámico
  dynamicTitle: string;
  dynamicDescription: string;
  dynamicIcon: string;
  dynamicActionText: string;
  showAction: boolean;

  // Setters para configuración dinámica
  setDynamicTitle: (value: string) => void;
  setDynamicDescription: (value: string) => void;
  setDynamicIcon: (value: string) => void;
  setDynamicActionText: (value: string) => void;
  setShowAction: (value: boolean) => void;

  // Utilidad de limpieza
  clearAllEmptyState: () => void;
}

export const useEmptyStateExamples = create<EmptyStateExamplesState>((set) => ({
  // Estados iniciales
  defaultExample: '',
  variantExample: '',
  sizeExample: '',
  colorSchemeExample: '',
  iconExample: '',
  actionExample: '',
  interactiveExample: '',
  withDescriptionExample: '',
  noActionExample: '',
  customExample: '',

  // Casos de uso iniciales
  searchResults: '',
  favoriteItems: '',
  notifications: '',
  uploadedFiles: '',
  shoppingCart: '',

  // Configuración dinámica inicial
  dynamicTitle: 'Estado Vacío Personalizable',
  dynamicDescription:
    'Configura el título, descripción, icono y acción usando los controles de abajo.',
  dynamicIcon: 'inbox',
  dynamicActionText: 'Comenzar',
  showAction: true,

  // Setters para ejemplos
  setDefaultExample: (value: string) => set({ defaultExample: value }),
  setVariantExample: (value: string) => set({ variantExample: value }),
  setSizeExample: (value: string) => set({ sizeExample: value }),
  setColorSchemeExample: (value: string) => set({ colorSchemeExample: value }),
  setIconExample: (value: string) => set({ iconExample: value }),
  setActionExample: (value: string) => set({ actionExample: value }),
  setInteractiveExample: (value: string) => set({ interactiveExample: value }),
  setWithDescriptionExample: (value: string) =>
    set({ withDescriptionExample: value }),
  setNoActionExample: (value: string) => set({ noActionExample: value }),
  setCustomExample: (value: string) => set({ customExample: value }),

  // Setters para casos de uso
  setSearchResults: (value: string) => set({ searchResults: value }),
  setFavoriteItems: (value: string) => set({ favoriteItems: value }),
  setNotifications: (value: string) => set({ notifications: value }),
  setUploadedFiles: (value: string) => set({ uploadedFiles: value }),
  setShoppingCart: (value: string) => set({ shoppingCart: value }),

  // Setters para configuración dinámica
  setDynamicTitle: (value: string) => set({ dynamicTitle: value }),
  setDynamicDescription: (value: string) => set({ dynamicDescription: value }),
  setDynamicIcon: (value: string) => set({ dynamicIcon: value }),
  setDynamicActionText: (value: string) => set({ dynamicActionText: value }),
  setShowAction: (value: boolean) => set({ showAction: value }),

  // Limpieza completa
  clearAllEmptyState: () =>
    set({
      defaultExample: '',
      variantExample: '',
      sizeExample: '',
      colorSchemeExample: '',
      iconExample: '',
      actionExample: '',
      interactiveExample: '',
      withDescriptionExample: '',
      noActionExample: '',
      customExample: '',
      searchResults: '',
      favoriteItems: '',
      notifications: '',
      uploadedFiles: '',
      shoppingCart: '',
      dynamicTitle: 'Estado Vacío Personalizable',
      dynamicDescription:
        'Configura el título, descripción, icono y acción usando los controles de abajo.',
      dynamicIcon: 'inbox',
      dynamicActionText: 'Comenzar',
      showAction: true,
    }),
}));

export type { EmptyStateExamplesState };

