import { create } from 'zustand';

interface TooltipExamplesState {
  // Estados para cada story
  defaultExample: string;
  positionExample: string;
  variantExample: string;
  triggerExample: string;
  delayExample: string;

  // Estados específicos para diferentes usos
  hoveredTooltip: boolean;
  focusedTooltip: boolean;
  clickedTooltip: boolean;
  selectedPosition: string;
  selectedVariant: string;
  selectedTrigger: string;

  // Configuraciones de tooltip
  showArrow: boolean;
  customDelay: number;
  isDisabled: boolean;
  multiline: boolean;

  // Estados para el ejemplo interactivo
  interactivePosition:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end';
  interactiveColorScheme:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';
  interactiveTrigger: 'hover' | 'click' | 'focus';
  interactiveSize: 'sm' | 'default' | 'lg';
  multilineContent: boolean;

  // Setters tipados
  setDefaultExample: (value: string) => void;
  setPositionExample: (value: string) => void;
  setVariantExample: (value: string) => void;
  setTriggerExample: (value: string) => void;
  setDelayExample: (value: string) => void;

  setHoveredTooltip: (value: boolean) => void;
  setFocusedTooltip: (value: boolean) => void;
  setClickedTooltip: (value: boolean) => void;
  setSelectedPosition: (value: string) => void;
  setSelectedVariant: (value: string) => void;
  setSelectedTrigger: (value: string) => void;

  setShowArrow: (value: boolean) => void;
  setCustomDelay: (value: number) => void;
  setIsDisabled: (value: boolean) => void;
  setMultiline: (value: boolean) => void;

  // Setters para el ejemplo interactivo
  setInteractivePosition: (
    value: TooltipExamplesState['interactivePosition']
  ) => void;
  setInteractiveColorScheme: (
    value: TooltipExamplesState['interactiveColorScheme']
  ) => void;
  setInteractiveTrigger: (
    value: TooltipExamplesState['interactiveTrigger']
  ) => void;
  setInteractiveSize: (value: TooltipExamplesState['interactiveSize']) => void;
  setMultilineContent: (value: boolean) => void;

  // Funciones de utilidad
  resetTooltipStates: () => void;
  clearAllTooltips: () => void;
}

export const useTooltipExamples = create<TooltipExamplesState>((set) => ({
  // Estados iniciales
  defaultExample: 'Tooltip básico',
  positionExample: 'top',
  variantExample: 'default',
  triggerExample: 'hover',
  delayExample: '300',

  hoveredTooltip: false,
  focusedTooltip: false,
  clickedTooltip: false,
  selectedPosition: 'top',
  selectedVariant: 'default',
  selectedTrigger: 'hover',

  showArrow: true,
  customDelay: 300,
  isDisabled: false,
  multiline: false,

  // Estados interactivos
  interactivePosition: 'top',
  interactiveColorScheme: 'default',
  interactiveTrigger: 'hover',
  interactiveSize: 'default',
  multilineContent: false,

  // Setters
  setDefaultExample: (value: string) => set({ defaultExample: value }),
  setPositionExample: (value: string) => set({ positionExample: value }),
  setVariantExample: (value: string) => set({ variantExample: value }),
  setTriggerExample: (value: string) => set({ triggerExample: value }),
  setDelayExample: (value: string) => set({ delayExample: value }),

  setHoveredTooltip: (value: boolean) => set({ hoveredTooltip: value }),
  setFocusedTooltip: (value: boolean) => set({ focusedTooltip: value }),
  setClickedTooltip: (value: boolean) => set({ clickedTooltip: value }),
  setSelectedPosition: (value: string) => set({ selectedPosition: value }),
  setSelectedVariant: (value: string) => set({ selectedVariant: value }),
  setSelectedTrigger: (value: string) => set({ selectedTrigger: value }),

  setShowArrow: (value: boolean) => set({ showArrow: value }),
  setCustomDelay: (value: number) => set({ customDelay: value }),
  setIsDisabled: (value: boolean) => set({ isDisabled: value }),
  setMultiline: (value: boolean) => set({ multiline: value }),

  // Setters interactivos
  setInteractivePosition: (value) => set({ interactivePosition: value }),
  setInteractiveColorScheme: (value) => set({ interactiveColorScheme: value }),
  setInteractiveTrigger: (value) => set({ interactiveTrigger: value }),
  setInteractiveSize: (value) => set({ interactiveSize: value }),
  setMultilineContent: (value: boolean) => set({ multilineContent: value }),

  // Funciones de utilidad
  resetTooltipStates: () =>
    set({
      hoveredTooltip: false,
      focusedTooltip: false,
      clickedTooltip: false,
    }),

  clearAllTooltips: () =>
    set({
      defaultExample: '',
      positionExample: 'top',
      variantExample: 'default',
      triggerExample: 'hover',
      delayExample: '300',
      hoveredTooltip: false,
      focusedTooltip: false,
      clickedTooltip: false,
      selectedPosition: 'top',
      selectedVariant: 'default',
      selectedTrigger: 'hover',
      showArrow: true,
      customDelay: 300,
      isDisabled: false,
      multiline: false,
      interactivePosition: 'top',
      interactiveColorScheme: 'default',
      interactiveTrigger: 'hover',
      interactiveSize: 'default',
      multilineContent: false,
    }),
}));

