import { create } from 'zustand';

interface SwitchExamplesState {
  // Estados para cada story
  defaultExample: boolean;
  sizeExample: boolean;
  variantExample: boolean;
  disabledExample: boolean;
  iconExample: boolean;
  colorExample: boolean;

  // Ejemplos específicos
  lightDarkMode: boolean;
  notificationsEnabled: boolean;
  locationEnabled: boolean;
  autoSave: boolean;
  syncEnabled: boolean;

  // Setters tipados
  setDefaultExample: (value: boolean) => void;
  setSizeExample: (value: boolean) => void;
  setVariantExample: (value: boolean) => void;
  setDisabledExample: (value: boolean) => void;
  setIconExample: (value: boolean) => void;
  setColorExample: (value: boolean) => void;

  setLightDarkMode: (value: boolean) => void;
  setNotificationsEnabled: (value: boolean) => void;
  setLocationEnabled: (value: boolean) => void;
  setAutoSave: (value: boolean) => void;
  setSyncEnabled: (value: boolean) => void;

  // Utilidad de limpieza
  clearAllSwitch: () => void;
}

export const useSwitchExamples = create<SwitchExamplesState>((set) => ({
  // Estados iniciales
  defaultExample: false,
  sizeExample: true,
  variantExample: false,
  disabledExample: false,
  iconExample: true,
  colorExample: false,

  lightDarkMode: false,
  notificationsEnabled: true,
  locationEnabled: false,
  autoSave: true,
  syncEnabled: false,

  // Setters
  setDefaultExample: (value: boolean) => set({ defaultExample: value }),
  setSizeExample: (value: boolean) => set({ sizeExample: value }),
  setVariantExample: (value: boolean) => set({ variantExample: value }),
  setDisabledExample: (value: boolean) => set({ disabledExample: value }),
  setIconExample: (value: boolean) => set({ iconExample: value }),
  setColorExample: (value: boolean) => set({ colorExample: value }),

  setLightDarkMode: (value: boolean) => set({ lightDarkMode: value }),
  setNotificationsEnabled: (value: boolean) =>
    set({ notificationsEnabled: value }),
  setLocationEnabled: (value: boolean) => set({ locationEnabled: value }),
  setAutoSave: (value: boolean) => set({ autoSave: value }),
  setSyncEnabled: (value: boolean) => set({ syncEnabled: value }),

  // Limpieza
  clearAllSwitch: () =>
    set({
      defaultExample: false,
      sizeExample: false,
      variantExample: false,
      disabledExample: false,
      iconExample: false,
      colorExample: false,
      lightDarkMode: false,
      notificationsEnabled: false,
      locationEnabled: false,
      autoSave: false,
      syncEnabled: false,
    }),
}));

