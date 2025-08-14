import { create } from 'zustand';

interface DividerExamplesState {
  // Estados para configuraciones del divider
  currentVariant:
    | 'solid'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'gradient'
    | 'shadow';
  currentOrientation: 'horizontal' | 'vertical';
  currentThickness: 'thin' | 'default' | 'thick' | 'thicker';
  currentLength: 'auto' | 'short' | 'medium' | 'long' | 'full';
  currentColor:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'muted'
    | 'custom';

  // Estados para texto/contenido en el divider
  withText: boolean;
  dividerText: string;
  textPosition: 'left' | 'center' | 'right';
  textVariant: 'default' | 'bold' | 'muted' | 'colored' | 'uppercase';

  // Estados para iconos
  withIcon: boolean;
  iconPosition: 'left' | 'center' | 'right';
  iconSize: 'sm' | 'default' | 'lg';

  // Estados para animaciones
  animated: boolean;
  animationType: 'fade' | 'slide' | 'pulse' | 'glow' | 'grow';

  // Estados para margin/padding
  marginSize: 'none' | 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  paddingSize: 'none' | 'xs' | 'sm' | 'default' | 'lg' | 'xl';

  // Estados para casos de uso específicos
  useInCard: boolean;
  useInForm: boolean;
  useInNavigation: boolean;
  useInSidebar: boolean;

  // Estados para comparación con Separator
  showSeparatorComparison: boolean;
  separatorItems: string[];

  // Setters para configuraciones
  setCurrentVariant: (variant: DividerExamplesState['currentVariant']) => void;
  setCurrentOrientation: (
    orientation: DividerExamplesState['currentOrientation']
  ) => void;
  setCurrentThickness: (
    thickness: DividerExamplesState['currentThickness']
  ) => void;
  setCurrentLength: (length: DividerExamplesState['currentLength']) => void;
  setCurrentColor: (color: DividerExamplesState['currentColor']) => void;

  // Setters para texto
  setWithText: (withText: boolean) => void;
  setDividerText: (text: string) => void;
  setTextPosition: (position: DividerExamplesState['textPosition']) => void;
  setTextVariant: (variant: DividerExamplesState['textVariant']) => void;

  // Setters para iconos
  setWithIcon: (withIcon: boolean) => void;
  setIconPosition: (position: DividerExamplesState['iconPosition']) => void;
  setIconSize: (size: DividerExamplesState['iconSize']) => void;

  // Setters para animaciones
  setAnimated: (animated: boolean) => void;
  setAnimationType: (type: DividerExamplesState['animationType']) => void;

  // Setters para spacing
  setMarginSize: (size: DividerExamplesState['marginSize']) => void;
  setPaddingSize: (size: DividerExamplesState['paddingSize']) => void;

  // Setters para casos de uso
  setUseInCard: (use: boolean) => void;
  setUseInForm: (use: boolean) => void;
  setUseInNavigation: (use: boolean) => void;
  setUseInSidebar: (use: boolean) => void;

  // Setters para comparación
  setShowSeparatorComparison: (show: boolean) => void;
  setSeparatorItems: (items: string[]) => void;
  addSeparatorItem: (item: string) => void;
  removeSeparatorItem: (index: number) => void;

  // Funciones de utilidad
  resetAllDivider: () => void;
  clearAllDivider: () => void;
  toggleAllFeatures: () => void;

  // Presets para casos de uso común
  applyCardDividerPreset: () => void;
  applyFormSectionPreset: () => void;
  applyNavigationPreset: () => void;
  applySidebarPreset: () => void;
  applyContentSectionPreset: () => void;
}

export const useDividerExamples = create<DividerExamplesState>((set, get) => ({
  // Estados iniciales
  currentVariant: 'solid',
  currentOrientation: 'horizontal',
  currentThickness: 'default',
  currentLength: 'auto',
  currentColor: 'default',

  // Estados de texto
  withText: false,
  dividerText: 'OR',
  textPosition: 'center',
  textVariant: 'default',

  // Estados de iconos
  withIcon: false,
  iconPosition: 'center',
  iconSize: 'default',

  // Estados de animación
  animated: false,
  animationType: 'fade',

  // Estados de spacing
  marginSize: 'default',
  paddingSize: 'default',

  // Estados de casos de uso
  useInCard: false,
  useInForm: false,
  useInNavigation: false,
  useInSidebar: false,

  // Estados de comparación
  showSeparatorComparison: false,
  separatorItems: ['Home', 'Products', 'Categories', 'About', 'Contact'],

  // Setters para configuraciones
  setCurrentVariant: (variant) => set({ currentVariant: variant }),
  setCurrentOrientation: (orientation) =>
    set({ currentOrientation: orientation }),
  setCurrentThickness: (thickness) => set({ currentThickness: thickness }),
  setCurrentLength: (length) => set({ currentLength: length }),
  setCurrentColor: (color) => set({ currentColor: color }),

  // Setters para texto
  setWithText: (withText) => set({ withText }),
  setDividerText: (text) => set({ dividerText: text }),
  setTextPosition: (position) => set({ textPosition: position }),
  setTextVariant: (variant) => set({ textVariant: variant }),

  // Setters para iconos
  setWithIcon: (withIcon) => set({ withIcon }),
  setIconPosition: (position) => set({ iconPosition: position }),
  setIconSize: (size) => set({ iconSize: size }),

  // Setters para animaciones
  setAnimated: (animated) => set({ animated }),
  setAnimationType: (type) => set({ animationType: type }),

  // Setters para spacing
  setMarginSize: (size) => set({ marginSize: size }),
  setPaddingSize: (size) => set({ paddingSize: size }),

  // Setters para casos de uso
  setUseInCard: (use) => set({ useInCard: use }),
  setUseInForm: (use) => set({ useInForm: use }),
  setUseInNavigation: (use) => set({ useInNavigation: use }),
  setUseInSidebar: (use) => set({ useInSidebar: use }),

  // Setters para comparación
  setShowSeparatorComparison: (show) => set({ showSeparatorComparison: show }),
  setSeparatorItems: (items) => set({ separatorItems: items }),
  addSeparatorItem: (item) => {
    const currentItems = get().separatorItems;
    set({ separatorItems: [...currentItems, item] });
  },
  removeSeparatorItem: (index) => {
    const currentItems = get().separatorItems;
    set({ separatorItems: currentItems.filter((_, i) => i !== index) });
  },

  // Funciones de utilidad
  resetAllDivider: () =>
    set({
      currentVariant: 'solid',
      currentOrientation: 'horizontal',
      currentThickness: 'default',
      currentLength: 'auto',
      currentColor: 'default',
      withText: false,
      dividerText: 'OR',
      textPosition: 'center',
      textVariant: 'default',
      withIcon: false,
      iconPosition: 'center',
      iconSize: 'default',
      animated: false,
      animationType: 'fade',
      marginSize: 'default',
      paddingSize: 'default',
      useInCard: false,
      useInForm: false,
      useInNavigation: false,
      useInSidebar: false,
      showSeparatorComparison: false,
    }),

  clearAllDivider: () =>
    set({
      currentVariant: 'solid',
      currentOrientation: 'horizontal',
      currentThickness: 'thin',
      currentLength: 'auto',
      currentColor: 'muted',
      withText: false,
      dividerText: '',
      textPosition: 'center',
      textVariant: 'default',
      withIcon: false,
      iconPosition: 'center',
      iconSize: 'sm',
      animated: false,
      animationType: 'fade',
      marginSize: 'none',
      paddingSize: 'none',
      useInCard: false,
      useInForm: false,
      useInNavigation: false,
      useInSidebar: false,
      showSeparatorComparison: false,
      separatorItems: [],
    }),

  toggleAllFeatures: () => {
    const current = get();
    set({
      withText: !current.withText,
      withIcon: !current.withIcon,
      animated: !current.animated,
      showSeparatorComparison: !current.showSeparatorComparison,
    });
  },

  // Presets para casos de uso común
  applyCardDividerPreset: () =>
    set({
      currentVariant: 'solid',
      currentOrientation: 'horizontal',
      currentThickness: 'thin',
      currentLength: 'full',
      currentColor: 'muted',
      withText: false,
      withIcon: false,
      animated: false,
      marginSize: 'default',
      paddingSize: 'sm',
      useInCard: true,
      useInForm: false,
      useInNavigation: false,
      useInSidebar: false,
    }),

  applyFormSectionPreset: () =>
    set({
      currentVariant: 'dashed',
      currentOrientation: 'horizontal',
      currentThickness: 'default',
      currentLength: 'full',
      currentColor: 'primary',
      withText: true,
      dividerText: 'Personal Information',
      textPosition: 'left',
      textVariant: 'bold',
      withIcon: false,
      animated: false,
      marginSize: 'lg',
      paddingSize: 'default',
      useInCard: false,
      useInForm: true,
      useInNavigation: false,
      useInSidebar: false,
    }),

  applyNavigationPreset: () =>
    set({
      currentVariant: 'solid',
      currentOrientation: 'vertical',
      currentThickness: 'default',
      currentLength: 'medium',
      currentColor: 'default',
      withText: false,
      withIcon: false,
      animated: false,
      marginSize: 'sm',
      paddingSize: 'xs',
      useInCard: false,
      useInForm: false,
      useInNavigation: true,
      useInSidebar: false,
    }),

  applySidebarPreset: () =>
    set({
      currentVariant: 'gradient',
      currentOrientation: 'horizontal',
      currentThickness: 'thick',
      currentLength: 'full',
      currentColor: 'secondary',
      withText: false,
      withIcon: false,
      animated: true,
      animationType: 'glow',
      marginSize: 'default',
      paddingSize: 'lg',
      useInCard: false,
      useInForm: false,
      useInNavigation: false,
      useInSidebar: true,
    }),

  applyContentSectionPreset: () =>
    set({
      currentVariant: 'double',
      currentOrientation: 'horizontal',
      currentThickness: 'thicker',
      currentLength: 'long',
      currentColor: 'accent',
      withText: true,
      dividerText: 'SECTION',
      textPosition: 'center',
      textVariant: 'uppercase',
      withIcon: true,
      iconPosition: 'center',
      iconSize: 'lg',
      animated: true,
      animationType: 'slide',
      marginSize: 'xl',
      paddingSize: 'lg',
      useInCard: false,
      useInForm: false,
      useInNavigation: false,
      useInSidebar: false,
    }),
}));

