import { create } from 'zustand';
import type { SpinnerType } from '../components/atoms/feedback/Spinner/Spinner';

interface SpinnerExamplesState {
  // Estados para cada story
  defaultExample: boolean;
  typeExample: SpinnerType;
  sizeExample: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  colorExample: string;
  speedExample: number;
  textExample: string;
  textPositionExample: 'top' | 'bottom' | 'left' | 'right';
  centeredExample: boolean;
  overlayExample: boolean;
  customExample: string;
  interactiveExample: boolean;

  // Estados de carga para storeKey pattern
  loadingStates: Record<string, boolean>;

  // Individual loading states for storeKey access
  demo1: boolean;
  demo2: boolean;
  demo3: boolean;
  overlay: boolean;

  // Configuración para demos
  demoTypes: SpinnerType[];
  demoColors: string[];
  demoSizes: ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')[];

  // Setters tipados
  setDefaultExample: (value: boolean) => void;
  setTypeExample: (value: SpinnerType) => void;
  setSizeExample: (value: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl') => void;
  setColorExample: (value: string) => void;
  setSpeedExample: (value: number) => void;
  setTextExample: (value: string) => void;
  setTextPositionExample: (value: 'top' | 'bottom' | 'left' | 'right') => void;
  setCenteredExample: (value: boolean) => void;
  setOverlayExample: (value: boolean) => void;
  setCustomExample: (value: string) => void;
  setInteractiveExample: (value: boolean) => void;

  // Gestión de estados de carga
  setLoadingState: (key: string, isLoading: boolean) => void;
  toggleLoadingState: (key: string) => void;

  // Utilidad de limpieza
  clearAllSpinner: () => void;
  resetDefaults: () => void;
}

export const useSpinnerExamples = create<SpinnerExamplesState>((set, get) => ({
  // Estados iniciales
  defaultExample: true,
  typeExample: 'clip',
  sizeExample: 'md',
  colorExample: 'hsl(var(--primary))',
  speedExample: 1,
  textExample: 'Cargando...',
  textPositionExample: 'bottom',
  centeredExample: false,
  overlayExample: false,
  customExample: '',
  interactiveExample: true,

  // Individual loading states for storeKey access
  demo1: true,
  demo2: false,
  demo3: true,
  overlay: false,

  loadingStates: {
    demo1: true,
    demo2: false,
    demo3: true,
    overlay: false,
  },

  // Configuración para demos
  demoTypes: [
    'clip',
    'bounce',
    'dot',
    'fade',
    'grid',
    'hash',
    'moon',
    'ring',
    'pulse',
    'scale',
    'sync',
    'beat',
    'circle',
    'bar',
    'square',
  ],
  demoColors: [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--destructive))',
    'hsl(var(--accent))',
    '#3b82f6', // blue
    '#10b981', // emerald
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // violet
    '#ec4899', // pink
  ],
  demoSizes: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],

  // Setters para ejemplos básicos
  setDefaultExample: (value: boolean) => set({ defaultExample: value }),

  setTypeExample: (value: SpinnerType) => set({ typeExample: value }),

  setSizeExample: (value: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl') =>
    set({ sizeExample: value }),

  setColorExample: (value: string) => set({ colorExample: value }),

  setSpeedExample: (value: number) => set({ speedExample: value }),

  setTextExample: (value: string) => set({ textExample: value }),

  setTextPositionExample: (value: 'top' | 'bottom' | 'left' | 'right') =>
    set({ textPositionExample: value }),

  setCenteredExample: (value: boolean) => set({ centeredExample: value }),

  setOverlayExample: (value: boolean) => set({ overlayExample: value }),

  setCustomExample: (value: string) => set({ customExample: value }),

  setInteractiveExample: (value: boolean) => set({ interactiveExample: value }),

  // Gestión de estados de carga
  setLoadingState: (key: string, isLoading: boolean) =>
    set((state) => ({
      loadingStates: {
        ...state.loadingStates,
        [key]: isLoading,
      },
      // Also update individual properties for storeKey access
      ...(key === 'demo1' && { demo1: isLoading }),
      ...(key === 'demo2' && { demo2: isLoading }),
      ...(key === 'demo3' && { demo3: isLoading }),
      ...(key === 'overlay' && { overlay: isLoading }),
    })),

  toggleLoadingState: (key: string) =>
    set((state) => {
      const currentValue = state.loadingStates[key];
      const newValue = !currentValue;

      return {
        loadingStates: {
          ...state.loadingStates,
          [key]: newValue,
        },
        // Also update individual properties for storeKey access
        ...(key === 'demo1' && { demo1: newValue }),
        ...(key === 'demo2' && { demo2: newValue }),
        ...(key === 'demo3' && { demo3: newValue }),
        ...(key === 'overlay' && { overlay: newValue }),
      };
    }),

  // Utilidades de limpieza
  clearAllSpinner: () =>
    set({
      defaultExample: false,
      interactiveExample: false,
      demo1: false,
      demo2: false,
      demo3: false,
      overlay: false,
      loadingStates: {},
      textExample: '',
      customExample: '',
    }),

  resetDefaults: () =>
    set({
      defaultExample: true,
      typeExample: 'clip',
      sizeExample: 'md',
      colorExample: 'hsl(var(--primary))',
      speedExample: 1,
      textExample: 'Cargando...',
      textPositionExample: 'bottom',
      centeredExample: false,
      overlayExample: false,
      customExample: '',
      interactiveExample: true,
      demo1: true,
      demo2: false,
      demo3: true,
      overlay: false,
      loadingStates: {
        demo1: true,
        demo2: false,
        demo3: true,
        overlay: false,
      },
    }),
}));

