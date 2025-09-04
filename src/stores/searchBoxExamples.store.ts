import { create } from 'zustand';

interface SearchBoxExamplesState {
  // Estados para cada story
  defaultExample: string;
  variantExample: string;
  sizeExample: string;
  placeholderExample: string;
  withIconExample: string;
  compactExample: string;
  fullWidthExample: string;
  interactiveExample: string;

  // Setters tipados
  setDefaultExample: (value: string) => void;
  setVariantExample: (value: string) => void;
  setSizeExample: (value: string) => void;
  setPlaceholderExample: (value: string) => void;
  setWithIconExample: (value: string) => void;
  setCompactExample: (value: string) => void;
  setFullWidthExample: (value: string) => void;
  setInteractiveExample: (value: string) => void;

  // Utilidad de limpieza
  clearAllSearchBox: () => void;
}

export const useSearchBoxExamples = create<SearchBoxExamplesState>((set) => ({
  // Estados iniciales
  defaultExample: '',
  variantExample: '',
  sizeExample: '',
  placeholderExample: '',
  withIconExample: '',
  compactExample: '',
  fullWidthExample: '',
  interactiveExample: '',

  // Setters
  setDefaultExample: (value: string) => set({ defaultExample: value }),
  setVariantExample: (value: string) => set({ variantExample: value }),
  setSizeExample: (value: string) => set({ sizeExample: value }),
  setPlaceholderExample: (value: string) => set({ placeholderExample: value }),
  setWithIconExample: (value: string) => set({ withIconExample: value }),
  setCompactExample: (value: string) => set({ compactExample: value }),
  setFullWidthExample: (value: string) => set({ fullWidthExample: value }),
  setInteractiveExample: (value: string) => set({ interactiveExample: value }),

  // Limpieza
  clearAllSearchBox: () =>
    set({
      defaultExample: '',
      variantExample: '',
      sizeExample: '',
      placeholderExample: '',
      withIconExample: '',
      compactExample: '',
      fullWidthExample: '',
      interactiveExample: '',
    }),
}));

