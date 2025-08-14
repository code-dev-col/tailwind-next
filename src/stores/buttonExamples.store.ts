import { create } from 'zustand';

interface ButtonExamplesState {
  // Estados para cada story
  defaultExample: string;
  sizeExample: string;
  variantExample: string;

  // Estados para ColorScheme stories
  colorSchemeExample: string;
  secondaryColorExample: string;
  destructiveColorExample: string;
  accentColorExample: string;
  mutedColorExample: string;
  minimalColorExample: string;

  // Estados específicos para diferentes usos
  selectedAction: string;
  primaryActions: string[];
  secondaryActions: string[];
  loadingStates: Record<string, boolean>;
  disabledStates: Record<string, boolean>;

  // Estados de interacción
  clickCount: number;
  lastClickedButton: string;

  // Setters tipados
  setDefaultExample: (value: string) => void;
  setSizeExample: (value: string) => void;
  setVariantExample: (value: string) => void;

  // Setters para ColorScheme
  setColorSchemeExample: (value: string) => void;
  setSecondaryColorExample: (value: string) => void;
  setDestructiveColorExample: (value: string) => void;
  setAccentColorExample: (value: string) => void;
  setMutedColorExample: (value: string) => void;
  setMinimalColorExample: (value: string) => void;

  setSelectedAction: (value: string) => void;
  setPrimaryActions: (value: string[]) => void;
  setSecondaryActions: (value: string[]) => void;
  setLoadingStates: (value: Record<string, boolean>) => void;
  setDisabledStates: (value: Record<string, boolean>) => void;

  setClickCount: (value: number) => void;
  setLastClickedButton: (value: string) => void;

  // Funciones de utilidad para buttons
  addPrimaryAction: (action: string) => void;
  removePrimaryAction: (action: string) => void;
  addSecondaryAction: (action: string) => void;
  removeSecondaryAction: (action: string) => void;
  toggleLoading: (buttonId: string) => void;
  toggleDisabled: (buttonId: string) => void;
  incrementClickCount: () => void;
  handleButtonClick: (buttonId: string) => void;

  // Utilidad de limpieza
  clearAllButtons: () => void;
  resetToDefaults: () => void;
}

export const useButtonExamples = create<ButtonExamplesState>((set, get) => ({
  // Estados iniciales
  defaultExample: 'Click me',
  sizeExample: 'Button',
  variantExample: 'default',

  // Estados para ColorScheme
  colorSchemeExample: 'Primary Action',
  secondaryColorExample: 'Secondary Action',
  destructiveColorExample: 'Delete Action',
  accentColorExample: 'Accent Action',
  mutedColorExample: 'Muted Action',
  minimalColorExample: 'Minimal Action',

  selectedAction: '',
  primaryActions: ['Save', 'Submit', 'Create'],
  secondaryActions: ['Cancel', 'Close', 'Back'],
  loadingStates: {},
  disabledStates: {},

  clickCount: 0,
  lastClickedButton: '',

  // Setters
  setDefaultExample: (value: string) => set({ defaultExample: value }),
  setSizeExample: (value: string) => set({ sizeExample: value }),
  setVariantExample: (value: string) => set({ variantExample: value }),

  // Setters para ColorScheme
  setColorSchemeExample: (value: string) => set({ colorSchemeExample: value }),
  setSecondaryColorExample: (value: string) =>
    set({ secondaryColorExample: value }),
  setDestructiveColorExample: (value: string) =>
    set({ destructiveColorExample: value }),
  setAccentColorExample: (value: string) => set({ accentColorExample: value }),
  setMutedColorExample: (value: string) => set({ mutedColorExample: value }),
  setMinimalColorExample: (value: string) =>
    set({ minimalColorExample: value }),

  setSelectedAction: (value: string) => set({ selectedAction: value }),
  setPrimaryActions: (value: string[]) => set({ primaryActions: value }),
  setSecondaryActions: (value: string[]) => set({ secondaryActions: value }),
  setLoadingStates: (value: Record<string, boolean>) =>
    set({ loadingStates: value }),
  setDisabledStates: (value: Record<string, boolean>) =>
    set({ disabledStates: value }),

  setClickCount: (value: number) => set({ clickCount: value }),
  setLastClickedButton: (value: string) => set({ lastClickedButton: value }),

  // Funciones de utilidad
  addPrimaryAction: (action: string) => {
    const { primaryActions } = get();
    if (!primaryActions.includes(action)) {
      set({ primaryActions: [...primaryActions, action] });
    }
  },

  removePrimaryAction: (action: string) => {
    const { primaryActions } = get();
    set({ primaryActions: primaryActions.filter((a) => a !== action) });
  },

  addSecondaryAction: (action: string) => {
    const { secondaryActions } = get();
    if (!secondaryActions.includes(action)) {
      set({ secondaryActions: [...secondaryActions, action] });
    }
  },

  removeSecondaryAction: (action: string) => {
    const { secondaryActions } = get();
    set({ secondaryActions: secondaryActions.filter((a) => a !== action) });
  },

  toggleLoading: (buttonId: string) => {
    const { loadingStates } = get();
    set({
      loadingStates: {
        ...loadingStates,
        [buttonId]: !loadingStates[buttonId],
      },
    });
  },

  toggleDisabled: (buttonId: string) => {
    const { disabledStates } = get();
    set({
      disabledStates: {
        ...disabledStates,
        [buttonId]: !disabledStates[buttonId],
      },
    });
  },

  incrementClickCount: () => {
    const { clickCount } = get();
    set({ clickCount: clickCount + 1 });
  },

  handleButtonClick: (buttonId: string) => {
    const { incrementClickCount } = get();
    set({ lastClickedButton: buttonId });
    incrementClickCount();
  },

  // Utilidades de limpieza
  clearAllButtons: () =>
    set({
      defaultExample: '',
      sizeExample: '',
      variantExample: '',
      colorSchemeExample: '',
      secondaryColorExample: '',
      destructiveColorExample: '',
      accentColorExample: '',
      mutedColorExample: '',
      minimalColorExample: '',
      selectedAction: '',
      primaryActions: [],
      secondaryActions: [],
      loadingStates: {},
      disabledStates: {},
      clickCount: 0,
      lastClickedButton: '',
    }),

  resetToDefaults: () =>
    set({
      defaultExample: 'Click me',
      sizeExample: 'Button',
      variantExample: 'default',
      colorSchemeExample: 'Primary Action',
      secondaryColorExample: 'Secondary Action',
      destructiveColorExample: 'Delete Action',
      accentColorExample: 'Accent Action',
      mutedColorExample: 'Muted Action',
      minimalColorExample: 'Minimal Action',
      selectedAction: '',
      primaryActions: ['Save', 'Submit', 'Create'],
      secondaryActions: ['Cancel', 'Close', 'Back'],
      loadingStates: {},
      disabledStates: {},
      clickCount: 0,
      lastClickedButton: '',
    }),
}));

