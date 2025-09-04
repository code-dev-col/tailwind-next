import { create } from 'zustand';

interface LoginFormExamplesState {
  // Estados para diferentes stories
  defaultExample: string;
  variantExample: string;
  sizeExample: string;
  colorSchemeExample: string;
  storeExample: string;
  interactiveExample: string;
  withGradientsExample: string;

  // Campos específicos del formulario de login
  email: string;
  password: string;
  rememberMe: boolean;

  // Setters para cada estado
  setDefaultExample: (value: string) => void;
  setVariantExample: (value: string) => void;
  setSizeExample: (value: string) => void;
  setColorSchemeExample: (value: string) => void;
  setStoreExample: (value: string) => void;
  setInteractiveExample: (value: string) => void;
  setWithGradientsExample: (value: string) => void;

  // Setters para campos del formulario
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRememberMe: (value: boolean) => void;

  // Función de limpieza
  clearAllLoginForm: () => void;
}

export const useLoginFormExamples = create<LoginFormExamplesState>((set) => ({
  // Estados iniciales
  defaultExample: '',
  variantExample: '',
  sizeExample: '',
  colorSchemeExample: '',
  storeExample: '',
  interactiveExample: '',
  withGradientsExample: '',

  // Campos del formulario
  email: '',
  password: '',
  rememberMe: false,

  // Setters
  setDefaultExample: (value: string) => set({ defaultExample: value }),
  setVariantExample: (value: string) => set({ variantExample: value }),
  setSizeExample: (value: string) => set({ sizeExample: value }),
  setColorSchemeExample: (value: string) => set({ colorSchemeExample: value }),
  setStoreExample: (value: string) => set({ storeExample: value }),
  setInteractiveExample: (value: string) => set({ interactiveExample: value }),
  setWithGradientsExample: (value: string) =>
    set({ withGradientsExample: value }),

  // Setters para formulario
  setEmail: (value: string) => set({ email: value }),
  setPassword: (value: string) => set({ password: value }),
  setRememberMe: (value: boolean) => set({ rememberMe: value }),

  // Función de limpieza
  clearAllLoginForm: () =>
    set({
      defaultExample: '',
      variantExample: '',
      sizeExample: '',
      colorSchemeExample: '',
      storeExample: '',
      interactiveExample: '',
      withGradientsExample: '',
      email: '',
      password: '',
      rememberMe: false,
    }),
}));

