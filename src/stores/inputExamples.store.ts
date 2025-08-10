import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { StateCreator } from 'zustand';

// === SLICE PARA EJEMPLOS BÁSICOS ===
interface BasicInputSlice {
  basicInput: string;
  emailInput: string;
  passwordInput: string;
  searchInput: string;

  setBasicInput: (value: string) => void;
  setEmailInput: (value: string) => void;
  setPasswordInput: (value: string) => void;
  setSearchInput: (value: string) => void;

  clearBasicInputs: () => void;
}

const createBasicInputSlice: StateCreator<
  BasicInputSlice & CharacterLimitSlice & SecuritySlice & StoreKeySlice,
  [],
  [],
  BasicInputSlice
> = (set) => ({
  basicInput: '',
  emailInput: '',
  passwordInput: '',
  searchInput: '',

  setBasicInput: (value) => set({ basicInput: value }),
  setEmailInput: (value) => set({ emailInput: value }),
  setPasswordInput: (value) => set({ passwordInput: value }),
  setSearchInput: (value) => set({ searchInput: value }),

  clearBasicInputs: () =>
    set({
      basicInput: '',
      emailInput: '',
      passwordInput: '',
      searchInput: '',
    }),
});

// === SLICE PARA LÍMITES DE CARACTERES ===
interface CharacterLimitSlice {
  limitedInput: string;
  shortLimitInput: string;
  emailLimitInput: string;

  setLimitedInput: (value: string) => void;
  setShortLimitInput: (value: string) => void;
  setEmailLimitInput: (value: string) => void;

  clearLimitInputs: () => void;
}

const createCharacterLimitSlice: StateCreator<
  BasicInputSlice & CharacterLimitSlice & SecuritySlice & StoreKeySlice,
  [],
  [],
  CharacterLimitSlice
> = (set) => ({
  limitedInput: '',
  shortLimitInput: '',
  emailLimitInput: '',

  setLimitedInput: (value) => set({ limitedInput: value }),
  setShortLimitInput: (value) => set({ shortLimitInput: value }),
  setEmailLimitInput: (value) => set({ emailLimitInput: value }),

  clearLimitInputs: () =>
    set({
      limitedInput: '',
      shortLimitInput: '',
      emailLimitInput: '',
    }),
});

// === SLICE PARA SEGURIDAD ===
interface SecuritySlice {
  securityBasicInput: string;
  securitySanitizeInput: string;
  securityBlockInput: string;
  securityCriticalInput: string;

  setSecurityBasicInput: (value: string) => void;
  setSecuritySanitizeInput: (value: string) => void;
  setSecurityBlockInput: (value: string) => void;
  setSecurityCriticalInput: (value: string) => void;

  clearSecurityInputs: () => void;
}

const createSecuritySlice: StateCreator<
  BasicInputSlice & CharacterLimitSlice & SecuritySlice & StoreKeySlice,
  [],
  [],
  SecuritySlice
> = (set) => ({
  securityBasicInput: '',
  securitySanitizeInput: '',
  securityBlockInput: '',
  securityCriticalInput: '',

  setSecurityBasicInput: (value) => set({ securityBasicInput: value }),
  setSecuritySanitizeInput: (value) => set({ securitySanitizeInput: value }),
  setSecurityBlockInput: (value) => set({ securityBlockInput: value }),
  setSecurityCriticalInput: (value) => set({ securityCriticalInput: value }),

  clearSecurityInputs: () =>
    set({
      securityBasicInput: '',
      securitySanitizeInput: '',
      securityBlockInput: '',
      securityCriticalInput: '',
    }),
});

// === SLICE PARA STOREKEY PATTERN ===
interface StoreKeySlice {
  nameInput: string;
  usernameInput: string;

  setNameInput: (value: string) => void;
  setUsernameInput: (value: string) => void;

  clearStoreKeyInputs: () => void;
}

const createStoreKeySlice: StateCreator<
  BasicInputSlice & CharacterLimitSlice & SecuritySlice & StoreKeySlice,
  [],
  [],
  StoreKeySlice
> = (set) => ({
  nameInput: '',
  usernameInput: '',

  setNameInput: (value) => set({ nameInput: value }),
  setUsernameInput: (value) => set({ usernameInput: value }),

  clearStoreKeyInputs: () =>
    set({
      nameInput: '',
      usernameInput: '',
    }),
});

// === STORE COMBINADO SOLO PARA INPUT ===
export type InputExamplesStore = BasicInputSlice &
  CharacterLimitSlice &
  SecuritySlice &
  StoreKeySlice & {
    // Utilidades globales
    clearAllInputs: () => void;
    getInputCount: () => number;
  };

// Store principal combinando todos los slices de Input
export const useInputExamplesStore = create<InputExamplesStore>()(
  subscribeWithSelector((set, get) => ({
    ...createBasicInputSlice(set, get, null as any),
    ...createCharacterLimitSlice(set, get, null as any),
    ...createSecuritySlice(set, get, null as any),
    ...createStoreKeySlice(set, get, null as any),

    // Utilidades globales
    clearAllInputs: () => {
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
      });
    },

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
  }))
);

// Hook de conveniencia para acceder a todos los slices de Input
export const useInputExamples = () => {
  return useInputExamplesStore((state) => ({
    // Básicos
    basicInput: state.basicInput,
    emailInput: state.emailInput,
    passwordInput: state.passwordInput,
    searchInput: state.searchInput,
    setBasicInput: state.setBasicInput,
    setEmailInput: state.setEmailInput,
    setPasswordInput: state.setPasswordInput,
    setSearchInput: state.setSearchInput,
    clearBasicInputs: state.clearBasicInputs,

    // Límites de caracteres
    limitedInput: state.limitedInput,
    shortLimitInput: state.shortLimitInput,
    emailLimitInput: state.emailLimitInput,
    setLimitedInput: state.setLimitedInput,
    setShortLimitInput: state.setShortLimitInput,
    setEmailLimitInput: state.setEmailLimitInput,
    clearLimitInputs: state.clearLimitInputs,

    // Seguridad
    securityBasicInput: state.securityBasicInput,
    securitySanitizeInput: state.securitySanitizeInput,
    securityBlockInput: state.securityBlockInput,
    securityCriticalInput: state.securityCriticalInput,
    setSecurityBasicInput: state.setSecurityBasicInput,
    setSecuritySanitizeInput: state.setSecuritySanitizeInput,
    setSecurityBlockInput: state.setSecurityBlockInput,
    setSecurityCriticalInput: state.setSecurityCriticalInput,
    clearSecurityInputs: state.clearSecurityInputs,

    // StoreKey
    nameInput: state.nameInput,
    usernameInput: state.usernameInput,
    setNameInput: state.setNameInput,
    setUsernameInput: state.setUsernameInput,
    clearStoreKeyInputs: state.clearStoreKeyInputs,

    // Utilidades
    clearAllInputs: state.clearAllInputs,
    getInputCount: state.getInputCount,
  }));
};

