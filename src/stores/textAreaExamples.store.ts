import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { StateCreator } from 'zustand';

// === SLICE PARA EJEMPLOS BÁSICOS ===
interface BasicTextAreaSlice {
  basicTextArea: string;
  largeTextArea: string;
  ghostTextArea: string;

  setBasicTextArea: (value: string) => void;
  setLargeTextArea: (value: string) => void;
  setGhostTextArea: (value: string) => void;

  clearBasicTextAreas: () => void;
}

const createBasicTextAreaSlice: StateCreator<
  BasicTextAreaSlice &
    AdvancedTextAreaSlice &
    SecurityTextAreaSlice &
    StoreKeyTextAreaSlice,
  [],
  [],
  BasicTextAreaSlice
> = (set) => ({
  basicTextArea: '',
  largeTextArea: '',
  ghostTextArea: '',

  setBasicTextArea: (value) => set({ basicTextArea: value }),
  setLargeTextArea: (value) => set({ largeTextArea: value }),
  setGhostTextArea: (value) => set({ ghostTextArea: value }),

  clearBasicTextAreas: () =>
    set({
      basicTextArea: '',
      largeTextArea: '',
      ghostTextArea: '',
    }),
});

// === SLICE PARA FUNCIONALIDADES AVANZADAS ===
interface AdvancedTextAreaSlice {
  autoSizeTextArea: string;
  customHeightTextArea: string;
  limitedTextArea: string;

  setAutoSizeTextArea: (value: string) => void;
  setCustomHeightTextArea: (value: string) => void;
  setLimitedTextArea: (value: string) => void;

  clearAdvancedTextAreas: () => void;
}

const createAdvancedTextAreaSlice: StateCreator<
  BasicTextAreaSlice &
    AdvancedTextAreaSlice &
    SecurityTextAreaSlice &
    StoreKeyTextAreaSlice,
  [],
  [],
  AdvancedTextAreaSlice
> = (set) => ({
  autoSizeTextArea: '',
  customHeightTextArea: '',
  limitedTextArea: '',

  setAutoSizeTextArea: (value) => set({ autoSizeTextArea: value }),
  setCustomHeightTextArea: (value) => set({ customHeightTextArea: value }),
  setLimitedTextArea: (value) => set({ limitedTextArea: value }),

  clearAdvancedTextAreas: () =>
    set({
      autoSizeTextArea: '',
      customHeightTextArea: '',
      limitedTextArea: '',
    }),
});

// === SLICE PARA SEGURIDAD ===
interface SecurityTextAreaSlice {
  securityBasicTextArea: string;
  securitySanitizeTextArea: string;
  securityBlockTextArea: string;
  securityCommentTextArea: string;

  setSecurityBasicTextArea: (value: string) => void;
  setSecuritySanitizeTextArea: (value: string) => void;
  setSecurityBlockTextArea: (value: string) => void;
  setSecurityCommentTextArea: (value: string) => void;

  clearSecurityTextAreas: () => void;
}

const createSecurityTextAreaSlice: StateCreator<
  BasicTextAreaSlice &
    AdvancedTextAreaSlice &
    SecurityTextAreaSlice &
    StoreKeyTextAreaSlice,
  [],
  [],
  SecurityTextAreaSlice
> = (set) => ({
  securityBasicTextArea: '',
  securitySanitizeTextArea: '',
  securityBlockTextArea: '',
  securityCommentTextArea: '',

  setSecurityBasicTextArea: (value) => set({ securityBasicTextArea: value }),
  setSecuritySanitizeTextArea: (value) =>
    set({ securitySanitizeTextArea: value }),
  setSecurityBlockTextArea: (value) => set({ securityBlockTextArea: value }),
  setSecurityCommentTextArea: (value) =>
    set({ securityCommentTextArea: value }),

  clearSecurityTextAreas: () =>
    set({
      securityBasicTextArea: '',
      securitySanitizeTextArea: '',
      securityBlockTextArea: '',
      securityCommentTextArea: '',
    }),
});

// === SLICE PARA STOREKEY PATTERN ===
interface StoreKeyTextAreaSlice {
  messageTextArea: string;
  feedbackTextArea: string;
  descriptionTextArea: string;

  setMessageTextArea: (value: string) => void;
  setFeedbackTextArea: (value: string) => void;
  setDescriptionTextArea: (value: string) => void;

  clearStoreKeyTextAreas: () => void;
}

const createStoreKeyTextAreaSlice: StateCreator<
  BasicTextAreaSlice &
    AdvancedTextAreaSlice &
    SecurityTextAreaSlice &
    StoreKeyTextAreaSlice,
  [],
  [],
  StoreKeyTextAreaSlice
> = (set) => ({
  messageTextArea: '',
  feedbackTextArea: 'Comentario inicial para mostrar funcionalidad...',
  descriptionTextArea: '',

  setMessageTextArea: (value) => set({ messageTextArea: value }),
  setFeedbackTextArea: (value) => set({ feedbackTextArea: value }),
  setDescriptionTextArea: (value) => set({ descriptionTextArea: value }),

  clearStoreKeyTextAreas: () =>
    set({
      messageTextArea: '',
      feedbackTextArea: '',
      descriptionTextArea: '',
    }),
});

// === STORE COMBINADO SOLO PARA TEXTAREA ===
export type TextAreaExamplesStore = BasicTextAreaSlice &
  AdvancedTextAreaSlice &
  SecurityTextAreaSlice &
  StoreKeyTextAreaSlice & {
    // Utilidades globales
    clearAllTextAreas: () => void;
    getTextAreaCount: () => number;
  };

// Store principal combinando todos los slices de TextArea
export const useTextAreaExamplesStore = create<TextAreaExamplesStore>()(
  subscribeWithSelector((...a) => ({
    ...createBasicTextAreaSlice(...a),
    ...createAdvancedTextAreaSlice(...a),
    ...createSecurityTextAreaSlice(...a),
    ...createStoreKeyTextAreaSlice(...a),

    // Utilidades globales
    clearAllTextAreas: () => {
      const [set] = a;
      set({
        basicTextArea: '',
        largeTextArea: '',
        ghostTextArea: '',
        autoSizeTextArea: '',
        customHeightTextArea: '',
        limitedTextArea: '',
        securityBasicTextArea: '',
        securitySanitizeTextArea: '',
        securityBlockTextArea: '',
        securityCommentTextArea: '',
        messageTextArea: '',
        feedbackTextArea: '',
        descriptionTextArea: '',
      });
    },

    getTextAreaCount: () => {
      const [, get] = a;
      const state = get();
      const textAreaValues = [
        state.basicTextArea,
        state.largeTextArea,
        state.ghostTextArea,
        state.autoSizeTextArea,
        state.customHeightTextArea,
        state.limitedTextArea,
        state.securityBasicTextArea,
        state.securitySanitizeTextArea,
        state.securityBlockTextArea,
        state.securityCommentTextArea,
        state.messageTextArea,
        state.feedbackTextArea,
        state.descriptionTextArea,
      ];
      return textAreaValues.filter((value) => value.length > 0).length;
    },
  }))
);

// Hook de conveniencia para acceder a todos los slices de TextArea
export const useTextAreaExamples = () => {
  // Acceso selectivo para evitar re-renders innecesarios
  const basicTextAreaSlice = useTextAreaExamplesStore((state) => ({
    basicTextArea: state.basicTextArea,
    largeTextArea: state.largeTextArea,
    ghostTextArea: state.ghostTextArea,
    setBasicTextArea: state.setBasicTextArea,
    setLargeTextArea: state.setLargeTextArea,
    setGhostTextArea: state.setGhostTextArea,
    clearBasicTextAreas: state.clearBasicTextAreas,
  }));

  const advancedTextAreaSlice = useTextAreaExamplesStore((state) => ({
    autoSizeTextArea: state.autoSizeTextArea,
    customHeightTextArea: state.customHeightTextArea,
    limitedTextArea: state.limitedTextArea,
    setAutoSizeTextArea: state.setAutoSizeTextArea,
    setCustomHeightTextArea: state.setCustomHeightTextArea,
    setLimitedTextArea: state.setLimitedTextArea,
    clearAdvancedTextAreas: state.clearAdvancedTextAreas,
  }));

  const securityTextAreaSlice = useTextAreaExamplesStore((state) => ({
    securityBasicTextArea: state.securityBasicTextArea,
    securitySanitizeTextArea: state.securitySanitizeTextArea,
    securityBlockTextArea: state.securityBlockTextArea,
    securityCommentTextArea: state.securityCommentTextArea,
    setSecurityBasicTextArea: state.setSecurityBasicTextArea,
    setSecuritySanitizeTextArea: state.setSecuritySanitizeTextArea,
    setSecurityBlockTextArea: state.setSecurityBlockTextArea,
    setSecurityCommentTextArea: state.setSecurityCommentTextArea,
    clearSecurityTextAreas: state.clearSecurityTextAreas,
  }));

  const storeKeyTextAreaSlice = useTextAreaExamplesStore((state) => ({
    messageTextArea: state.messageTextArea,
    feedbackTextArea: state.feedbackTextArea,
    descriptionTextArea: state.descriptionTextArea,
    setMessageTextArea: state.setMessageTextArea,
    setFeedbackTextArea: state.setFeedbackTextArea,
    setDescriptionTextArea: state.setDescriptionTextArea,
    clearStoreKeyTextAreas: state.clearStoreKeyTextAreas,
  }));

  const utilities = useTextAreaExamplesStore((state) => ({
    clearAllTextAreas: state.clearAllTextAreas,
    getTextAreaCount: state.getTextAreaCount,
  }));

  return {
    ...basicTextAreaSlice,
    ...advancedTextAreaSlice,
    ...securityTextAreaSlice,
    ...storeKeyTextAreaSlice,
    ...utilities,
  };
};

