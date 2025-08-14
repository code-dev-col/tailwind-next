import { create } from 'zustand';

interface SliderExamplesState {
  // Estados para diferentes tipos de slider
  basicSlider: number;
  rangeSlider: [number, number];
  volumeSlider: number;
  priceRangeSlider: [number, number];
  temperatureSlider: number;

  // Estados para diferentes variantes
  primarySlider: number;
  secondarySlider: number;
  successSlider: number;
  warningSlider: number;
  destructiveSlider: number;

  // Estados para diferentes tamaños
  smallSlider: number;
  defaultSlider: number;
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
  interactiveVariant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'destructive'
    | 'accent';
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

  // Setters para sliders individuales
  setBasicSlider: (value: number) => void;
  setRangeSlider: (value: [number, number]) => void;
  setVolumeSlider: (value: number) => void;
  setPriceRangeSlider: (value: [number, number]) => void;
  setTemperatureSlider: (value: number) => void;

  // Setters para variantes
  setPrimarySlider: (value: number) => void;
  setSecondarySlider: (value: number) => void;
  setSuccessSlider: (value: number) => void;
  setWarningSlider: (value: number) => void;
  setDestructiveSlider: (value: number) => void;

  // Setters para tamaños
  setSmallSlider: (value: number) => void;
  setDefaultSlider: (value: number) => void;
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
  setInteractiveVariant: (
    value: SliderExamplesState['interactiveVariant']
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

  // Utilidades
  resetAllSliders: () => void;
  clearAllSliders: () => void;
}

export const useSliderExamples = create<SliderExamplesState>((set) => ({
  // Estados iniciales
  basicSlider: 50,
  rangeSlider: [25, 75],
  volumeSlider: 80,
  priceRangeSlider: [200, 800],
  temperatureSlider: 22,

  // Variantes
  primarySlider: 60,
  secondarySlider: 40,
  successSlider: 80,
  warningSlider: 30,
  destructiveSlider: 90,

  // Tamaños
  smallSlider: 25,
  defaultSlider: 50,
  largeSlider: 75,

  // Configuraciones
  disabledSlider: 45,
  steppedSlider: 50,
  percentageSlider: 65,

  // Interactivo
  interactiveValue: 50,
  interactiveMin: 0,
  interactiveMax: 100,
  interactiveStep: 1,
  interactiveVariant: 'primary',
  interactiveSize: 'default',
  interactiveShowValue: true,
  interactiveShowTicks: false,
  interactiveDisabled: false,
  interactiveOrientation: 'horizontal',

  // Range interactivo
  interactiveRangeValue: [30, 70],
  interactiveRangeMin: 0,
  interactiveRangeMax: 100,
  interactiveRangeStep: 1,

  // Setters individuales
  setBasicSlider: (value: number) => set({ basicSlider: value }),
  setRangeSlider: (value: [number, number]) => set({ rangeSlider: value }),
  setVolumeSlider: (value: number) => set({ volumeSlider: value }),
  setPriceRangeSlider: (value: [number, number]) =>
    set({ priceRangeSlider: value }),
  setTemperatureSlider: (value: number) => set({ temperatureSlider: value }),

  // Setters variantes
  setPrimarySlider: (value: number) => set({ primarySlider: value }),
  setSecondarySlider: (value: number) => set({ secondarySlider: value }),
  setSuccessSlider: (value: number) => set({ successSlider: value }),
  setWarningSlider: (value: number) => set({ warningSlider: value }),
  setDestructiveSlider: (value: number) => set({ destructiveSlider: value }),

  // Setters tamaños
  setSmallSlider: (value: number) => set({ smallSlider: value }),
  setDefaultSlider: (value: number) => set({ defaultSlider: value }),
  setLargeSlider: (value: number) => set({ largeSlider: value }),

  // Setters configuraciones
  setDisabledSlider: (value: number) => set({ disabledSlider: value }),
  setSteppedSlider: (value: number) => set({ steppedSlider: value }),
  setPercentageSlider: (value: number) => set({ percentageSlider: value }),

  // Setters interactivos
  setInteractiveValue: (value: number) => set({ interactiveValue: value }),
  setInteractiveMin: (value: number) => set({ interactiveMin: value }),
  setInteractiveMax: (value: number) => set({ interactiveMax: value }),
  setInteractiveStep: (value: number) => set({ interactiveStep: value }),
  setInteractiveVariant: (value) => set({ interactiveVariant: value }),
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

  // Utilidades
  resetAllSliders: () =>
    set({
      basicSlider: 50,
      rangeSlider: [25, 75],
      volumeSlider: 80,
      priceRangeSlider: [200, 800],
      temperatureSlider: 22,
      primarySlider: 60,
      secondarySlider: 40,
      successSlider: 80,
      warningSlider: 30,
      destructiveSlider: 90,
      smallSlider: 25,
      defaultSlider: 50,
      largeSlider: 75,
      disabledSlider: 45,
      steppedSlider: 50,
      percentageSlider: 65,
      interactiveValue: 50,
      interactiveRangeValue: [30, 70],
    }),

  clearAllSliders: () =>
    set({
      basicSlider: 0,
      rangeSlider: [0, 0],
      volumeSlider: 0,
      priceRangeSlider: [0, 1000],
      temperatureSlider: 0,
      primarySlider: 0,
      secondarySlider: 0,
      successSlider: 0,
      warningSlider: 0,
      destructiveSlider: 0,
      smallSlider: 0,
      defaultSlider: 0,
      largeSlider: 0,
      disabledSlider: 0,
      steppedSlider: 0,
      percentageSlider: 0,
      interactiveValue: 0,
      interactiveMin: 0,
      interactiveMax: 100,
      interactiveStep: 1,
      interactiveVariant: 'primary',
      interactiveSize: 'default',
      interactiveShowValue: true,
      interactiveShowTicks: false,
      interactiveDisabled: false,
      interactiveOrientation: 'horizontal',
      interactiveRangeValue: [0, 100],
      interactiveRangeMin: 0,
      interactiveRangeMax: 100,
      interactiveRangeStep: 1,
    }),
}));

