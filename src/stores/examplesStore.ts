import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// Slice para Input examples
interface InputExamplesSlice {
  // Básicos
  basicInput: string;
  emailInput: string;
  passwordInput: string;
  searchInput: string;

  // Con límites de caracteres
  limitedInput: string;
  shortLimitInput: string;
  emailLimitInput: string;

  // Con seguridad
  securityBasicInput: string;
  securitySanitizeInput: string;
  securityBlockInput: string;
  securityCriticalInput: string;

  // Con store key pattern
  nameInput: string;
  usernameInput: string;

  // Setters
  setBasicInput: (value: string) => void;
  setEmailInput: (value: string) => void;
  setPasswordInput: (value: string) => void;
  setSearchInput: (value: string) => void;

  setLimitedInput: (value: string) => void;
  setShortLimitInput: (value: string) => void;
  setEmailLimitInput: (value: string) => void;

  setSecurityBasicInput: (value: string) => void;
  setSecuritySanitizeInput: (value: string) => void;
  setSecurityBlockInput: (value: string) => void;
  setSecurityCriticalInput: (value: string) => void;

  setNameInput: (value: string) => void;
  setUsernameInput: (value: string) => void;

  // Utilidades
  clearAllInputs: () => void;
  getInputCount: () => number;
}

// Slice para TextArea examples
interface TextAreaExamplesSlice {
  // Básicos
  basicTextArea: string;
  largeTextArea: string;
  ghostTextArea: string;

  // Con funcionalidades avanzadas
  autoSizeTextArea: string;
  customHeightTextArea: string;
  limitedTextArea: string;

  // Con seguridad
  securityBasicTextArea: string;
  securitySanitizeTextArea: string;
  securityBlockTextArea: string;
  securityCommentTextArea: string;

  // Con store key pattern
  messageTextArea: string;
  feedbackTextArea: string;
  descriptionTextArea: string;

  // Setters
  setBasicTextArea: (value: string) => void;
  setLargeTextArea: (value: string) => void;
  setGhostTextArea: (value: string) => void;

  setAutoSizeTextArea: (value: string) => void;
  setCustomHeightTextArea: (value: string) => void;
  setLimitedTextArea: (value: string) => void;

  setSecurityBasicTextArea: (value: string) => void;
  setSecuritySanitizeTextArea: (value: string) => void;
  setSecurityBlockTextArea: (value: string) => void;
  setSecurityCommentTextArea: (value: string) => void;

  setMessageTextArea: (value: string) => void;
  setFeedbackTextArea: (value: string) => void;
  setDescriptionTextArea: (value: string) => void;

  // Utilidades
  clearAllTextAreas: () => void;
  getTextAreaCount: () => number;
}

// Store combinado con slices
type ExamplesStore = InputExamplesSlice & TextAreaExamplesSlice;

// Crear el store principal
export const useExamplesStore = create<ExamplesStore>()(
  subscribeWithSelector((set, get) => ({
    // === INPUT SLICE ===
    // Estados iniciales
    basicInput: '',
    emailInput: '',
    passwordInput: '',
    searchInput: '',

    limitedInput: '',
    shortLimitInput: '',
    emailLimitInput: '',

    securityBasicInput: '',
    securitySanitizeInput: '',
    securityBlockInput: '',
    securityCriticalInput: '',

    nameInput: '',
    usernameInput: '',

    // Setters para input
    setBasicInput: (value) => set({ basicInput: value }),
    setEmailInput: (value) => set({ emailInput: value }),
    setPasswordInput: (value) => set({ passwordInput: value }),
    setSearchInput: (value) => set({ searchInput: value }),

    setLimitedInput: (value) => set({ limitedInput: value }),
    setShortLimitInput: (value) => set({ shortLimitInput: value }),
    setEmailLimitInput: (value) => set({ emailLimitInput: value }),

    setSecurityBasicInput: (value) => set({ securityBasicInput: value }),
    setSecuritySanitizeInput: (value) => set({ securitySanitizeInput: value }),
    setSecurityBlockInput: (value) => set({ securityBlockInput: value }),
    setSecurityCriticalInput: (value) => set({ securityCriticalInput: value }),

    setNameInput: (value) => set({ nameInput: value }),
    setUsernameInput: (value) => set({ usernameInput: value }),

    // === TEXTAREA SLICE ===
    // Estados iniciales
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
    feedbackTextArea: 'Comentario inicial para mostrar funcionalidad...',
    descriptionTextArea: '',

    // Setters para textarea
    setBasicTextArea: (value) => set({ basicTextArea: value }),
    setLargeTextArea: (value) => set({ largeTextArea: value }),
    setGhostTextArea: (value) => set({ ghostTextArea: value }),

    setAutoSizeTextArea: (value) => set({ autoSizeTextArea: value }),
    setCustomHeightTextArea: (value) => set({ customHeightTextArea: value }),
    setLimitedTextArea: (value) => set({ limitedTextArea: value }),

    setSecurityBasicTextArea: (value) => set({ securityBasicTextArea: value }),
    setSecuritySanitizeTextArea: (value) =>
      set({ securitySanitizeTextArea: value }),
    setSecurityBlockTextArea: (value) => set({ securityBlockTextArea: value }),
    setSecurityCommentTextArea: (value) =>
      set({ securityCommentTextArea: value }),

    setMessageTextArea: (value) => set({ messageTextArea: value }),
    setFeedbackTextArea: (value) => set({ feedbackTextArea: value }),
    setDescriptionTextArea: (value) => set({ descriptionTextArea: value }),

    // === UTILIDADES GLOBALES ===
    clearAllInputs: () =>
      set({
        basicInput: '',
        emailInput: '',
        passwordInput: '',
        searchInput: '',
        limitedInput: '',
        shortLimitInput: '',
        emailLimitInput: '',
        securityBasicInput: '',
        securitySanitizeInput: '',
        securityBlockInput: '',
        securityCriticalInput: '',
        nameInput: '',
        usernameInput: '',
      }),

    clearAllTextAreas: () =>
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
        feedbackTextArea: 'Comentario inicial para mostrar funcionalidad...',
        descriptionTextArea: '',
      }),

    getInputCount: () => {
      const state = get();
      const inputValues = [
        state.basicInput,
        state.emailInput,
        state.passwordInput,
        state.searchInput,
        state.limitedInput,
        state.shortLimitInput,
        state.emailLimitInput,
        state.securityBasicInput,
        state.securitySanitizeInput,
        state.securityBlockInput,
        state.securityCriticalInput,
        state.nameInput,
        state.usernameInput,
      ];
      return inputValues.filter((value) => value.length > 0).length;
    },

    getTextAreaCount: () => {
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

// Hooks de conveniencia para acceder a slices específicos
export const useInputExamples = () => {
  return useExamplesStore((state) => ({
    // Estados
    basicInput: state.basicInput,
    emailInput: state.emailInput,
    passwordInput: state.passwordInput,
    searchInput: state.searchInput,
    limitedInput: state.limitedInput,
    shortLimitInput: state.shortLimitInput,
    emailLimitInput: state.emailLimitInput,
    securityBasicInput: state.securityBasicInput,
    securitySanitizeInput: state.securitySanitizeInput,
    securityBlockInput: state.securityBlockInput,
    securityCriticalInput: state.securityCriticalInput,
    nameInput: state.nameInput,
    usernameInput: state.usernameInput,

    // Setters
    setBasicInput: state.setBasicInput,
    setEmailInput: state.setEmailInput,
    setPasswordInput: state.setPasswordInput,
    setSearchInput: state.setSearchInput,
    setLimitedInput: state.setLimitedInput,
    setShortLimitInput: state.setShortLimitInput,
    setEmailLimitInput: state.setEmailLimitInput,
    setSecurityBasicInput: state.setSecurityBasicInput,
    setSecuritySanitizeInput: state.setSecuritySanitizeInput,
    setSecurityBlockInput: state.setSecurityBlockInput,
    setSecurityCriticalInput: state.setSecurityCriticalInput,
    setNameInput: state.setNameInput,
    setUsernameInput: state.setUsernameInput,

    // Utilidades
    clearAllInputs: state.clearAllInputs,
    getInputCount: state.getInputCount,
  }));
};

export const useTextAreaExamples = () => {
  return useExamplesStore((state) => ({
    // Estados
    basicTextArea: state.basicTextArea,
    largeTextArea: state.largeTextArea,
    ghostTextArea: state.ghostTextArea,
    autoSizeTextArea: state.autoSizeTextArea,
    customHeightTextArea: state.customHeightTextArea,
    limitedTextArea: state.limitedTextArea,
    securityBasicTextArea: state.securityBasicTextArea,
    securitySanitizeTextArea: state.securitySanitizeTextArea,
    securityBlockTextArea: state.securityBlockTextArea,
    securityCommentTextArea: state.securityCommentTextArea,
    messageTextArea: state.messageTextArea,
    feedbackTextArea: state.feedbackTextArea,
    descriptionTextArea: state.descriptionTextArea,

    // Setters
    setBasicTextArea: state.setBasicTextArea,
    setLargeTextArea: state.setLargeTextArea,
    setGhostTextArea: state.setGhostTextArea,
    setAutoSizeTextArea: state.setAutoSizeTextArea,
    setCustomHeightTextArea: state.setCustomHeightTextArea,
    setLimitedTextArea: state.setLimitedTextArea,
    setSecurityBasicTextArea: state.setSecurityBasicTextArea,
    setSecuritySanitizeTextArea: state.setSecuritySanitizeTextArea,
    setSecurityBlockTextArea: state.setSecurityBlockTextArea,
    setSecurityCommentTextArea: state.setSecurityCommentTextArea,
    setMessageTextArea: state.setMessageTextArea,
    setFeedbackTextArea: state.setFeedbackTextArea,
    setDescriptionTextArea: state.setDescriptionTextArea,

    // Utilidades
    clearAllTextAreas: state.clearAllTextAreas,
    getTextAreaCount: state.getTextAreaCount,
  }));
};

