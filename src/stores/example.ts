import { create } from 'zustand';

// Ejemplo de store para inputs
interface InputStore {
  value: string;
  setValue: (value: string) => void;
  clearValue: () => void;
}

// Ejemplo de store para checkboxes múltiples
interface MultiCheckStore {
  value: string[];
  setValue: (value: string[]) => void;
  clearValue: () => void;
}

// Ejemplo de store para boolean (checkbox único)
interface BooleanStore {
  value: boolean;
  setValue: (value: boolean) => void;
  clearValue: () => void;
}

// Stores de ejemplo para demos - usando sintaxis correcta de TypeScript con currying
export const useInputStore = create<InputStore>()((set) => ({
  value: '',
  setValue: (value) => set({ value }),
  clearValue: () => set({ value: '' }),
}));

export const useTextAreaStore = create<InputStore>()((set) => ({
  value: 'Contenido inicial del textarea conectado a Zustand',
  setValue: (value) => set({ value }),
  clearValue: () => set({ value: '' }),
}));

export const useDropdownStore = create<InputStore>()((set) => ({
  value: 'es',
  setValue: (value) => set({ value }),
  clearValue: () => set({ value: '' }),
}));

export const useRadioStore = create<InputStore>()((set) => ({
  value: 'medium',
  setValue: (value) => set({ value }),
  clearValue: () => set({ value: '' }),
}));

export const useSingleCheckStore = create<BooleanStore>()((set) => ({
  value: true,
  setValue: (value) => set({ value }),
  clearValue: () => set({ value: false }),
}));

export const useMultiCheckStore = create<MultiCheckStore>()((set) => ({
  value: ['javascript', 'react'],
  setValue: (value) => set({ value }),
  clearValue: () => set({ value: [] }),
}));

// Función helper para registrar stores globalmente
export const registerStore = (name: string, store: any) => {
  if (typeof window !== 'undefined') {
    (window as any).__zustand_stores = {
      ...(window as any).__zustand_stores,
      [name]: store,
    };
  }
};

// Auto-registrar stores de ejemplo
if (typeof window !== 'undefined') {
  registerStore('exampleInputStore', useInputStore);
  registerStore('exampleTextAreaStore', useTextAreaStore);
  registerStore('exampleDropdownStore', useDropdownStore);
  registerStore('exampleRadioStore', useRadioStore);
  registerStore('exampleSingleCheckStore', useSingleCheckStore);
  registerStore('exampleMultiCheckStore', useMultiCheckStore);
}

// Re-export stores disponibles para fácil acceso
export { useInputExamples } from './inputExamples.store';
export { useDropdownExamplesStore } from './dropdownExamples.store';
export { useImageExamples } from './imageExamples.store';
export { useSpinnerExamples } from './spinnerExamples.store';
export { useSwitchExamples } from './switchExamples.store';
export { useProgressExamples } from './progressExamples.store';
export { useChipExamples } from './chipExamples.store';
export { useTooltipExamples } from './tooltipExamples.store';
export { useSliderExamples } from './sliderExamples.store';
export { useBadgeExamples } from './badgeExamples.store';
export { useCheckboxExamples } from './checkboxExamples.store';
export { useAvatarExamples } from './avatarExamples.store';
export { useLinkExamples } from './linkExamples.store';

