import { create } from 'zustand';
import type { AccordionItemType } from '../components/atoms/Accordion';

interface AccordionExamplesState {
  // Estados para configuraciones del accordion
  currentVariant:
    | 'default'
    | 'bordered'
    | 'separated'
    | 'flat'
    | 'shadow'
    | 'minimal';
  currentSize: 'sm' | 'default' | 'lg';
  currentIconPosition: 'left' | 'right';

  // Estados para comportamiento
  allowMultiple: boolean;
  allowToggle: boolean;
  animated: boolean;
  animationDuration: 'fast' | 'normal' | 'slow';

  // Estados para estilos
  showIcons: boolean;
  showBadges: boolean;
  customIcon: boolean;
  roundedCorners: boolean;

  // Estados para diferentes tipos de accordion
  basicAccordionItems: AccordionItemType[];
  faqAccordionItems: AccordionItemType[];
  settingsAccordionItems: AccordionItemType[];
  navigationAccordionItems: AccordionItemType[];

  // Estados para el accordion interactivo
  interactiveItems: AccordionItemType[];
  interactiveOpenItems: string[];

  // Estados para casos de uso específicos
  useInSidebar: boolean;
  useInForm: boolean;
  useInCard: boolean;
  useInModal: boolean;

  // Setters para configuraciones
  setCurrentVariant: (
    variant: AccordionExamplesState['currentVariant']
  ) => void;
  setCurrentSize: (size: AccordionExamplesState['currentSize']) => void;
  setCurrentIconPosition: (
    position: AccordionExamplesState['currentIconPosition']
  ) => void;

  // Setters para comportamiento
  setAllowMultiple: (allow: boolean) => void;
  setAllowToggle: (allow: boolean) => void;
  setAnimated: (animated: boolean) => void;
  setAnimationDuration: (
    duration: AccordionExamplesState['animationDuration']
  ) => void;

  // Setters para estilos
  setShowIcons: (show: boolean) => void;
  setShowBadges: (show: boolean) => void;
  setCustomIcon: (custom: boolean) => void;
  setRoundedCorners: (rounded: boolean) => void;

  // Setters para casos de uso
  setUseInSidebar: (use: boolean) => void;
  setUseInForm: (use: boolean) => void;
  setUseInCard: (use: boolean) => void;
  setUseInModal: (use: boolean) => void;

  // Setters para items
  setBasicAccordionItems: (items: AccordionItemType[]) => void;
  setFaqAccordionItems: (items: AccordionItemType[]) => void;
  setSettingsAccordionItems: (items: AccordionItemType[]) => void;
  setNavigationAccordionItems: (items: AccordionItemType[]) => void;
  setInteractiveItems: (items: AccordionItemType[]) => void;
  setInteractiveOpenItems: (items: string[]) => void;

  // Funciones de utilidad para manipular items
  addAccordionItem: (
    type: keyof Pick<
      AccordionExamplesState,
      | 'basicAccordionItems'
      | 'faqAccordionItems'
      | 'settingsAccordionItems'
      | 'navigationAccordionItems'
      | 'interactiveItems'
    >,
    item: AccordionItemType
  ) => void;
  removeAccordionItem: (
    type: keyof Pick<
      AccordionExamplesState,
      | 'basicAccordionItems'
      | 'faqAccordionItems'
      | 'settingsAccordionItems'
      | 'navigationAccordionItems'
      | 'interactiveItems'
    >,
    id: string
  ) => void;
  updateAccordionItem: (
    type: keyof Pick<
      AccordionExamplesState,
      | 'basicAccordionItems'
      | 'faqAccordionItems'
      | 'settingsAccordionItems'
      | 'navigationAccordionItems'
      | 'interactiveItems'
    >,
    id: string,
    updates: Partial<AccordionItemType>
  ) => void;

  // Funciones para manejar estado de apertura
  toggleInteractiveItem: (id: string) => void;
  openInteractiveItem: (id: string) => void;
  closeInteractiveItem: (id: string) => void;
  openAllInteractive: () => void;
  closeAllInteractive: () => void;

  // Funciones de preset
  applyFAQPreset: () => void;
  applySettingsPreset: () => void;
  applyNavigationPreset: () => void;
  applySidebarPreset: () => void;
  applyFormPreset: () => void;

  // Funciones de utilidad
  resetAllAccordion: () => void;
  clearAllAccordion: () => void;
  toggleAllFeatures: () => void;
}

export const useAccordionExamples = create<AccordionExamplesState>(
  (set, get) => ({
    // Estados iniciales
    currentVariant: 'default',
    currentSize: 'default',
    currentIconPosition: 'right',

    // Estados de comportamiento
    allowMultiple: false,
    allowToggle: true,
    animated: true,
    animationDuration: 'normal',

    // Estados de estilos
    showIcons: true,
    showBadges: false,
    customIcon: false,
    roundedCorners: true,

    // Estados de casos de uso
    useInSidebar: false,
    useInForm: false,
    useInCard: false,
    useInModal: false,

    // Items iniciales para diferentes tipos
    basicAccordionItems: [
      {
        id: '1',
        title: 'What is React?',
        content:
          'React is a JavaScript library for building user interfaces, particularly web applications.',
        isOpen: false,
      },
      {
        id: '2',
        title: 'How do I get started?',
        content:
          'You can get started by creating a new React app using Create React App or by adding React to an existing project.',
        isOpen: false,
      },
      {
        id: '3',
        title: 'What are components?',
        content:
          'Components are independent and reusable bits of code that return JSX elements to be rendered to the page.',
        isOpen: true,
      },
    ],

    faqAccordionItems: [
      {
        id: 'faq-1',
        title: 'How do I reset my password?',
        content:
          'Click on "Forgot Password" on the login page, enter your email, and follow the instructions sent to your inbox.',
        badge: 'New',
      },
      {
        id: 'faq-2',
        title: 'What payment methods do you accept?',
        content:
          'We accept all major credit cards, PayPal, and bank transfers. Cryptocurrency payments are also available for premium plans.',
        badge: '⭐',
      },
      {
        id: 'faq-3',
        title: 'How can I cancel my subscription?',
        content:
          'You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.',
      },
      {
        id: 'faq-4',
        title: 'Do you offer refunds?',
        content:
          'Yes, we offer a 30-day money-back guarantee for all our plans. Contact support for assistance with refunds.',
        disabled: false,
      },
    ],

    settingsAccordionItems: [
      {
        id: 'profile',
        title: 'Profile Settings',
        content:
          'Manage your personal information, avatar, and public profile settings.',
        icon: '👤',
        badge: 3,
      },
      {
        id: 'security',
        title: 'Security & Privacy',
        content:
          'Configure two-factor authentication, password requirements, and privacy preferences.',
        icon: '🔒',
        badge: 'Important',
      },
      {
        id: 'notifications',
        title: 'Notifications',
        content:
          'Control email notifications, push notifications, and communication preferences.',
        icon: '🔔',
      },
      {
        id: 'billing',
        title: 'Billing & Subscription',
        content:
          'View your subscription details, payment history, and manage billing information.',
        icon: '💳',
        disabled: false,
      },
    ],

    navigationAccordionItems: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        content: 'Overview, analytics, and quick actions for your account.',
        icon: '📊',
      },
      {
        id: 'projects',
        title: 'Projects',
        content:
          'Manage your projects, create new ones, and collaborate with team members.',
        icon: '📁',
        badge: 12,
      },
      {
        id: 'team',
        title: 'Team Management',
        content: 'Add team members, assign roles, and manage permissions.',
        icon: '👥',
        badge: 'New',
      },
    ],

    // Items interactivos (controlados por el store)
    interactiveItems: [
      {
        id: 'interactive-1',
        title: 'Interactive Item 1',
        content: 'This item is controlled by the store state.',
      },
      {
        id: 'interactive-2',
        title: 'Interactive Item 2',
        content: 'Toggle me using the store functions!',
      },
      {
        id: 'interactive-3',
        title: 'Interactive Item 3',
        content: 'I can be opened and closed programmatically.',
      },
    ],

    interactiveOpenItems: ['interactive-1'], // IDs de items abiertos

    // Setters para configuraciones
    setCurrentVariant: (variant) => set({ currentVariant: variant }),
    setCurrentSize: (size) => set({ currentSize: size }),
    setCurrentIconPosition: (position) =>
      set({ currentIconPosition: position }),

    // Setters para comportamiento
    setAllowMultiple: (allow) => set({ allowMultiple: allow }),
    setAllowToggle: (allow) => set({ allowToggle: allow }),
    setAnimated: (animated) => set({ animated }),
    setAnimationDuration: (duration) => set({ animationDuration: duration }),

    // Setters para estilos
    setShowIcons: (show) => set({ showIcons: show }),
    setShowBadges: (show) => set({ showBadges: show }),
    setCustomIcon: (custom) => set({ customIcon: custom }),
    setRoundedCorners: (rounded) => set({ roundedCorners: rounded }),

    // Setters para casos de uso
    setUseInSidebar: (use) => set({ useInSidebar: use }),
    setUseInForm: (use) => set({ useInForm: use }),
    setUseInCard: (use) => set({ useInCard: use }),
    setUseInModal: (use) => set({ useInModal: use }),

    // Setters para items
    setBasicAccordionItems: (items) => set({ basicAccordionItems: items }),
    setFaqAccordionItems: (items) => set({ faqAccordionItems: items }),
    setSettingsAccordionItems: (items) =>
      set({ settingsAccordionItems: items }),
    setNavigationAccordionItems: (items) =>
      set({ navigationAccordionItems: items }),
    setInteractiveItems: (items) => set({ interactiveItems: items }),
    setInteractiveOpenItems: (items) => set({ interactiveOpenItems: items }),

    // Funciones para manipular items
    addAccordionItem: (type, item) => {
      const currentItems = get()[type] as AccordionItemType[];
      set({ [type]: [...currentItems, item] });
    },

    removeAccordionItem: (type, id) => {
      const currentItems = get()[type] as AccordionItemType[];
      set({ [type]: currentItems.filter((item) => item.id !== id) });
    },

    updateAccordionItem: (type, id, updates) => {
      const currentItems = get()[type] as AccordionItemType[];
      const updatedItems = currentItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      set({ [type]: updatedItems });
    },

    // Funciones para manejar estado de apertura
    toggleInteractiveItem: (id) => {
      const { interactiveOpenItems, allowMultiple } = get();
      const isOpen = interactiveOpenItems.includes(id);

      if (isOpen) {
        // Cerrar item
        set({
          interactiveOpenItems: interactiveOpenItems.filter(
            (itemId) => itemId !== id
          ),
        });
      } else {
        // Abrir item
        if (allowMultiple) {
          set({ interactiveOpenItems: [...interactiveOpenItems, id] });
        } else {
          set({ interactiveOpenItems: [id] });
        }
      }
    },

    openInteractiveItem: (id) => {
      const { interactiveOpenItems, allowMultiple } = get();
      if (!interactiveOpenItems.includes(id)) {
        if (allowMultiple) {
          set({ interactiveOpenItems: [...interactiveOpenItems, id] });
        } else {
          set({ interactiveOpenItems: [id] });
        }
      }
    },

    closeInteractiveItem: (id) => {
      const { interactiveOpenItems } = get();
      set({
        interactiveOpenItems: interactiveOpenItems.filter(
          (itemId) => itemId !== id
        ),
      });
    },

    openAllInteractive: () => {
      const { interactiveItems } = get();
      set({ interactiveOpenItems: interactiveItems.map((item) => item.id) });
    },

    closeAllInteractive: () => {
      set({ interactiveOpenItems: [] });
    },

    // Presets para casos de uso específicos
    applyFAQPreset: () =>
      set({
        currentVariant: 'bordered',
        currentSize: 'default',
        currentIconPosition: 'right',
        allowMultiple: true,
        allowToggle: true,
        animated: true,
        animationDuration: 'normal',
        showIcons: false,
        showBadges: true,
        roundedCorners: true,
      }),

    applySettingsPreset: () =>
      set({
        currentVariant: 'separated',
        currentSize: 'lg',
        currentIconPosition: 'left',
        allowMultiple: true,
        allowToggle: false,
        animated: true,
        animationDuration: 'fast',
        showIcons: true,
        showBadges: true,
        roundedCorners: true,
      }),

    applyNavigationPreset: () =>
      set({
        currentVariant: 'flat',
        currentSize: 'sm',
        currentIconPosition: 'left',
        allowMultiple: false,
        allowToggle: true,
        animated: true,
        animationDuration: 'fast',
        showIcons: true,
        showBadges: true,
        roundedCorners: false,
        useInSidebar: true,
      }),

    applySidebarPreset: () =>
      set({
        currentVariant: 'minimal',
        currentSize: 'sm',
        currentIconPosition: 'left',
        allowMultiple: true,
        allowToggle: true,
        animated: true,
        animationDuration: 'fast',
        showIcons: true,
        showBadges: false,
        roundedCorners: false,
        useInSidebar: true,
      }),

    applyFormPreset: () =>
      set({
        currentVariant: 'bordered',
        currentSize: 'default',
        currentIconPosition: 'right',
        allowMultiple: true,
        allowToggle: false,
        animated: true,
        animationDuration: 'normal',
        showIcons: false,
        showBadges: false,
        roundedCorners: true,
        useInForm: true,
      }),

    // Funciones de utilidad
    resetAllAccordion: () =>
      set({
        currentVariant: 'default',
        currentSize: 'default',
        currentIconPosition: 'right',
        allowMultiple: false,
        allowToggle: true,
        animated: true,
        animationDuration: 'normal',
        showIcons: true,
        showBadges: false,
        customIcon: false,
        roundedCorners: true,
        useInSidebar: false,
        useInForm: false,
        useInCard: false,
        useInModal: false,
        interactiveOpenItems: [],
      }),

    clearAllAccordion: () =>
      set({
        currentVariant: 'default',
        currentSize: 'sm',
        currentIconPosition: 'left',
        allowMultiple: false,
        allowToggle: false,
        animated: false,
        animationDuration: 'fast',
        showIcons: false,
        showBadges: false,
        customIcon: false,
        roundedCorners: false,
        useInSidebar: false,
        useInForm: false,
        useInCard: false,
        useInModal: false,
        basicAccordionItems: [],
        faqAccordionItems: [],
        settingsAccordionItems: [],
        navigationAccordionItems: [],
        interactiveItems: [],
        interactiveOpenItems: [],
      }),

    toggleAllFeatures: () => {
      const current = get();
      set({
        animated: !current.animated,
        showIcons: !current.showIcons,
        showBadges: !current.showBadges,
        allowMultiple: !current.allowMultiple,
        roundedCorners: !current.roundedCorners,
      });
    },
  })
);

