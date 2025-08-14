import { create } from 'zustand';

interface SliderExamplesState {
  // Estados para diferentes tipos de slider
  basicSlider: number;
  rangeSlider: [number, number];
  volumeSlider: number;
  priceRangeSlider: [number, number];
  temperatureSlider: number;

  // Estados para diferentes esquemas de color
  primarySlider: number;
  secondarySlider: number;
  destructiveSlider: number;
  accentSlider: number;
  mutedSlider: number;

  // Estados para diferentes tamaños
  smallSlider: number;
  defaultSizeSlider: number;
  largeSlider: number;

  // Estados para configuraciones
  disabledSlider: number;
  steppedSlider: number;
  percentageSlider: number;

  // Estados para el slider interactivo
  interactiveValue: number;
  interactiveMin: number;
  interactiveMax: number;
  interactiveStep: number;
  interactiveColorScheme:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';
  interactiveSize: 'sm' | 'default' | 'lg';
  interactiveShowValue: boolean;
  interactiveShowTicks: boolean;
  interactiveDisabled: boolean;
  interactiveOrientation: 'horizontal' | 'vertical';

  // Estados para range slider interactivo
  interactiveRangeValue: [number, number];
  interactiveRangeMin: number;
  interactiveRangeMax: number;
  interactiveRangeStep: number;

  // Setters para valores básicos
  setBasicSlider: (value: number) => void;
  setRangeSlider: (value: [number, number]) => void;
  setVolumeSlider: (value: number) => void;
  setPriceRangeSlider: (value: [number, number]) => void;
  setTemperatureSlider: (value: number) => void;

  // Setters para esquemas de color
  setPrimarySlider: (value: number) => void;
  setSecondarySlider: (value: number) => void;
  setDestructiveSlider: (value: number) => void;
  setAccentSlider: (value: number) => void;
  setMutedSlider: (value: number) => void;

  // Setters para tamaños
  setSmallSlider: (value: number) => void;
  setDefaultSizeSlider: (value: number) => void;
  setLargeSlider: (value: number) => void;

  // Setters para configuraciones
  setDisabledSlider: (value: number) => void;
  setSteppedSlider: (value: number) => void;
  setPercentageSlider: (value: number) => void;

  // Setters para slider interactivo
  setInteractiveValue: (value: number) => void;
  setInteractiveMin: (value: number) => void;
  setInteractiveMax: (value: number) => void;
  setInteractiveStep: (value: number) => void;
  setInteractiveColorScheme: (
    value: SliderExamplesState['interactiveColorScheme']
  ) => void;
  setInteractiveSize: (value: SliderExamplesState['interactiveSize']) => void;
  setInteractiveShowValue: (value: boolean) => void;
  setInteractiveShowTicks: (value: boolean) => void;
  setInteractiveDisabled: (value: boolean) => void;
  setInteractiveOrientation: (
    value: SliderExamplesState['interactiveOrientation']
  ) => void;

  // Setters para range slider interactivo
  setInteractiveRangeValue: (value: [number, number]) => void;
  setInteractiveRangeMin: (value: number) => void;
  setInteractiveRangeMax: (value: number) => void;
  setInteractiveRangeStep: (value: number) => void;

  // Función de reset
  resetSliderValues: () => void;
  clearAllSliders: () => void;
}

export const useSliderExamples = create<SliderExamplesState>((set) => ({
  // Estados iniciales
  basicSlider: 50,
  rangeSlider: [25, 75],
  volumeSlider: 80,
  priceRangeSlider: [200, 800],
  temperatureSlider: 22,

  // Esquemas de color iniciales
  primarySlider: 60,
  secondarySlider: 45,
  destructiveSlider: 30,
  accentSlider: 70,
  mutedSlider: 40,

  // Tamaños iniciales
  smallSlider: 25,
  defaultSizeSlider: 50,
  largeSlider: 75,

  // Configuraciones iniciales
  disabledSlider: 33,
  steppedSlider: 20,
  percentageSlider: 65,

  // Estados interactivos iniciales
  interactiveValue: 50,
  interactiveMin: 0,
  interactiveMax: 100,
  interactiveStep: 1,
  interactiveColorScheme: 'default',
  interactiveSize: 'default',
  interactiveShowValue: true,
  interactiveShowTicks: false,
  interactiveDisabled: false,
  interactiveOrientation: 'horizontal',

  // Range slider interactivo iniciales
  interactiveRangeValue: [30, 70],
  interactiveRangeMin: 0,
  interactiveRangeMax: 100,
  interactiveRangeStep: 1,

  // Implementación de setters
  setBasicSlider: (value: number) => set({ basicSlider: value }),
  setRangeSlider: (value: [number, number]) => set({ rangeSlider: value }),
  setVolumeSlider: (value: number) => set({ volumeSlider: value }),
  setPriceRangeSlider: (value: [number, number]) =>
    set({ priceRangeSlider: value }),
  setTemperatureSlider: (value: number) => set({ temperatureSlider: value }),

  // Setters de esquemas de color
  setPrimarySlider: (value: number) => set({ primarySlider: value }),
  setSecondarySlider: (value: number) => set({ secondarySlider: value }),
  setDestructiveSlider: (value: number) => set({ destructiveSlider: value }),
  setAccentSlider: (value: number) => set({ accentSlider: value }),
  setMutedSlider: (value: number) => set({ mutedSlider: value }),

  // Setters de tamaños
  setSmallSlider: (value: number) => set({ smallSlider: value }),
  setDefaultSizeSlider: (value: number) => set({ defaultSizeSlider: value }),
  setLargeSlider: (value: number) => set({ largeSlider: value }),

  // Setters de configuraciones
  setDisabledSlider: (value: number) => set({ disabledSlider: value }),
  setSteppedSlider: (value: number) => set({ steppedSlider: value }),
  setPercentageSlider: (value: number) => set({ percentageSlider: value }),

  // Setters interactivos
  setInteractiveValue: (value: number) => set({ interactiveValue: value }),
  setInteractiveMin: (value: number) => set({ interactiveMin: value }),
  setInteractiveMax: (value: number) => set({ interactiveMax: value }),
  setInteractiveStep: (value: number) => set({ interactiveStep: value }),
  setInteractiveColorScheme: (value) => set({ interactiveColorScheme: value }),
  setInteractiveSize: (value) => set({ interactiveSize: value }),
  setInteractiveShowValue: (value: boolean) =>
    set({ interactiveShowValue: value }),
  setInteractiveShowTicks: (value: boolean) =>
    set({ interactiveShowTicks: value }),
  setInteractiveDisabled: (value: boolean) =>
    set({ interactiveDisabled: value }),
  setInteractiveOrientation: (value) => set({ interactiveOrientation: value }),

  // Setters range interactivos
  setInteractiveRangeValue: (value: [number, number]) =>
    set({ interactiveRangeValue: value }),
  setInteractiveRangeMin: (value: number) =>
    set({ interactiveRangeMin: value }),
  setInteractiveRangeMax: (value: number) =>
    set({ interactiveRangeMax: value }),
  setInteractiveRangeStep: (value: number) =>
    set({ interactiveRangeStep: value }),

  // Funciones de reset
  resetSliderValues: () =>
    set({
      interactiveValue: 50,
      interactiveMin: 0,
      interactiveMax: 100,
      interactiveStep: 1,
      interactiveColorScheme: 'default',
      interactiveSize: 'default',
      interactiveShowValue: true,
      interactiveShowTicks: false,
      interactiveDisabled: false,
      interactiveOrientation: 'horizontal',
      interactiveRangeValue: [30, 70],
      interactiveRangeMin: 0,
      interactiveRangeMax: 100,
      interactiveRangeStep: 1,
    }),

  clearAllSliders: () =>
    set({
      basicSlider: 0,
      rangeSlider: [0, 0],
      volumeSlider: 0,
      priceRangeSlider: [0, 0],
      temperatureSlider: 0,
      primarySlider: 0,
      secondarySlider: 0,
      destructiveSlider: 0,
      accentSlider: 0,
      mutedSlider: 0,
      smallSlider: 0,
      defaultSizeSlider: 0,
      largeSlider: 0,
      disabledSlider: 0,
      steppedSlider: 0,
      percentageSlider: 0,
      interactiveValue: 0,
      interactiveRangeValue: [0, 0],
    }),
}));

