import { create } from 'zustand';

interface TextExamplesState {
  // Basic examples
  defaultExample: string;
  secondaryExample: string;
  destructiveExample: string;
  accentExample: string;
  mutedExample: string;
  minimalExample: string;

  // Content examples
  titleExample: string;
  paragraphExample: string;
  descriptionExample: string;
  labelExample: string;

  // Interactive examples
  interactiveExample: string;
  dynamicExample: string;
  customSizeExample: string;
  gradientExample: string;

  // Special examples
  truncatedExample: string;
  multilineExample: string;

  // Actions
  setDefaultExample: (value: string) => void;
  setSecondaryExample: (value: string) => void;
  setDestructiveExample: (value: string) => void;
  setAccentExample: (value: string) => void;
  setMutedExample: (value: string) => void;
  setMinimalExample: (value: string) => void;
  setTitleExample: (value: string) => void;
  setParagraphExample: (value: string) => void;
  setDescriptionExample: (value: string) => void;
  setLabelExample: (value: string) => void;
  setInteractiveExample: (value: string) => void;
  setDynamicExample: (value: string) => void;
  setCustomSizeExample: (value: string) => void;
  setGradientExample: (value: string) => void;
  setTruncatedExample: (value: string) => void;
  setMultilineExample: (value: string) => void;

  // Utility action
  clearAllText: () => void;
}

export const useTextExamples = create<TextExamplesState>((set) => ({
  // Initial state with meaningful defaults for text content
  defaultExample: 'Texto por defecto del componente',
  secondaryExample: 'Texto secundario para destacar información',
  destructiveExample: 'Mensaje de error o advertencia crítica',
  accentExample: 'Texto con énfasis especial o destacado',
  mutedExample: 'Texto sutil para información secundaria',
  minimalExample: 'Texto limpio y sin distracciones',
  titleExample: 'Título Principal del Contenido',
  paragraphExample:
    'Este es un párrafo de ejemplo que demuestra cómo se ve el texto en un contexto real. Incluye suficiente contenido para mostrar el comportamiento del componente en diferentes situaciones.',
  descriptionExample:
    'Descripción detallada que acompaña al contenido principal',
  labelExample: 'Etiqueta descriptiva',
  interactiveExample: 'Texto interactivo que cambia dinámicamente',
  dynamicExample: 'Contenido que se adapta al tamaño de pantalla',
  customSizeExample: 'Texto con tamaño personalizado',
  gradientExample: 'Texto con efectos visuales avanzados',
  truncatedExample:
    'Este es un texto muy largo que será cortado automáticamente cuando exceda el espacio disponible en el contenedor',
  multilineExample:
    'Contenido de múltiples líneas que demuestra el comportamiento del texto cuando se extiende por varias líneas y cómo el componente maneja el espaciado y la altura de línea de manera adecuada.',

  // Setters
  setDefaultExample: (value: string) => set({ defaultExample: value }),
  setSecondaryExample: (value: string) => set({ secondaryExample: value }),
  setDestructiveExample: (value: string) => set({ destructiveExample: value }),
  setAccentExample: (value: string) => set({ accentExample: value }),
  setMutedExample: (value: string) => set({ mutedExample: value }),
  setMinimalExample: (value: string) => set({ minimalExample: value }),
  setTitleExample: (value: string) => set({ titleExample: value }),
  setParagraphExample: (value: string) => set({ paragraphExample: value }),
  setDescriptionExample: (value: string) => set({ descriptionExample: value }),
  setLabelExample: (value: string) => set({ labelExample: value }),
  setInteractiveExample: (value: string) => set({ interactiveExample: value }),
  setDynamicExample: (value: string) => set({ dynamicExample: value }),
  setCustomSizeExample: (value: string) => set({ customSizeExample: value }),
  setGradientExample: (value: string) => set({ gradientExample: value }),
  setTruncatedExample: (value: string) => set({ truncatedExample: value }),
  setMultilineExample: (value: string) => set({ multilineExample: value }),

  // Clear all
  clearAllText: () =>
    set({
      defaultExample: '',
      secondaryExample: '',
      destructiveExample: '',
      accentExample: '',
      mutedExample: '',
      minimalExample: '',
      titleExample: '',
      paragraphExample: '',
      descriptionExample: '',
      labelExample: '',
      interactiveExample: '',
      dynamicExample: '',
      customSizeExample: '',
      gradientExample: '',
      truncatedExample: '',
      multilineExample: '',
    }),
}));

