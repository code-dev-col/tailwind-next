import { create } from 'zustand';

interface InfoSectionExamplesState {
  // Estados para cada story
  defaultExample: string;
  variantExample: string;
  sizeExample: string;
  colorSchemeExample: string;
  withDataExample: string;
  storeExample: string;

  // Setters tipados
  setDefaultExample: (value: string) => void;
  setVariantExample: (value: string) => void;
  setSizeExample: (value: string) => void;
  setColorSchemeExample: (value: string) => void;
  setWithDataExample: (value: string) => void;
  setStoreExample: (value: string) => void;

  // Utilidad de limpieza
  clearAllInfoSection: () => void;
}

export const useInfoSectionExamples = create<InfoSectionExamplesState>(
  (set) => ({
    // Estados iniciales
    defaultExample: '',
    variantExample: '',
    sizeExample: '',
    colorSchemeExample: '',
    withDataExample: '',
    storeExample: '',

    // Setters
    setDefaultExample: (value: string) => set({ defaultExample: value }),
    setVariantExample: (value: string) => set({ variantExample: value }),
    setSizeExample: (value: string) => set({ sizeExample: value }),
    setColorSchemeExample: (value: string) =>
      set({ colorSchemeExample: value }),
    setWithDataExample: (value: string) => set({ withDataExample: value }),
    setStoreExample: (value: string) => set({ storeExample: value }),

    // Limpieza
    clearAllInfoSection: () =>
      set({
        defaultExample: '',
        variantExample: '',
        sizeExample: '',
        colorSchemeExample: '',
        withDataExample: '',
        storeExample: '',
      }),
  })
);

