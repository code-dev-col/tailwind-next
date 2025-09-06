import { create } from 'zustand';

export interface NavigationItemExamplesState {
  // Estados para cada story (strings para input binding)
  defaultExample: string;
  variantExample: string;
  sizeExample: string;
  colorSchemeExample: string;
  storeExample: string;
  buttonExample: string;
  externalExample: string;
  interactiveExample: string;

  // Click counter para demo interactivo
  clickCount: number;

  // Setters tipados para strings
  setDefaultExample: (value: string) => void;
  setVariantExample: (value: string) => void;
  setSizeExample: (value: string) => void;
  setColorSchemeExample: (value: string) => void;
  setStoreExample: (value: string) => void;
  setButtonExample: (value: string) => void;
  setExternalExample: (value: string) => void;
  setInteractiveExample: (value: string) => void;

  // Limpieza
  clearAllNavigationItems: () => void;
  incrementClickCount: () => void;
}

export const useNavigationItemExamples = create<NavigationItemExamplesState>(
  (set) => ({
    // Estados iniciales para strings
    defaultExample: '',
    variantExample: '',
    sizeExample: '',
    colorSchemeExample: '',
    storeExample: '',
    buttonExample: '',
    externalExample: '',
    interactiveExample: '',

    // Estados iniciales
    clickCount: 0,

    // Setters para strings
    setDefaultExample: (value: string) => set({ defaultExample: value }),
    setVariantExample: (value: string) => set({ variantExample: value }),
    setSizeExample: (value: string) => set({ sizeExample: value }),
    setColorSchemeExample: (value: string) =>
      set({ colorSchemeExample: value }),
    setStoreExample: (value: string) => set({ storeExample: value }),
    setButtonExample: (value: string) => set({ buttonExample: value }),
    setExternalExample: (value: string) => set({ externalExample: value }),
    setInteractiveExample: (value: string) =>
      set({ interactiveExample: value }),

    // Limpieza
    clearAllNavigationItems: () =>
      set({
        defaultExample: '',
        variantExample: '',
        sizeExample: '',
        colorSchemeExample: '',
        storeExample: '',
        buttonExample: '',
        externalExample: '',
        interactiveExample: '',
        clickCount: 0,
      }),

    incrementClickCount: () =>
      set((state) => ({ clickCount: state.clickCount + 1 })),
  })
);

