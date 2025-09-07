import { create } from 'zustand';

interface TabGroupExamplesState {
  // Estados para diferentes stories
  defaultExample: string;
  variantExample: string;
  orientationExample: string;
  withContentExample: string;
  colorSchemeExample: string;
  interactiveExample: string;
  sizeExample: string;

  // Setters tipados
  setDefaultExample: (value: string) => void;
  setVariantExample: (value: string) => void;
  setOrientationExample: (value: string) => void;
  setWithContentExample: (value: string) => void;
  setColorSchemeExample: (value: string) => void;
  setInteractiveExample: (value: string) => void;
  setSizeExample: (value: string) => void;

  // Utilidad de limpieza
  clearAllTabGroup: () => void;
}

export const useTabGroupExamples = create<TabGroupExamplesState>((set) => ({
  // Estados iniciales
  defaultExample: 'tab1',
  variantExample: 'tab1',
  orientationExample: 'tab1',
  withContentExample: 'tab1',
  colorSchemeExample: 'tab1',
  interactiveExample: 'tab1',
  sizeExample: 'tab1',

  // Setters
  setDefaultExample: (value: string) => set({ defaultExample: value }),
  setVariantExample: (value: string) => set({ variantExample: value }),
  setOrientationExample: (value: string) => set({ orientationExample: value }),
  setWithContentExample: (value: string) => set({ withContentExample: value }),
  setColorSchemeExample: (value: string) => set({ colorSchemeExample: value }),
  setInteractiveExample: (value: string) => set({ interactiveExample: value }),
  setSizeExample: (value: string) => set({ sizeExample: value }),

  // Limpiar todos los estados
  clearAllTabGroup: () =>
    set({
      defaultExample: 'tab1',
      variantExample: 'tab1',
      orientationExample: 'tab1',
      withContentExample: 'tab1',
      colorSchemeExample: 'tab1',
      interactiveExample: 'tab1',
      sizeExample: 'tab1',
    }),
}));

