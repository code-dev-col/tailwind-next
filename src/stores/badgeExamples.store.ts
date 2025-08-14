import { create } from 'zustand';

interface BadgeExamplesState {
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
  notificationBadges: Record<string, number>;
  statusBadges: string[];
  categoryBadges: string[];
  priorityBadges: string[];

  // Estados de interacción
  selectedBadges: string[];
  badgeVisibility: Record<string, boolean>;

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

  setNotificationBadges: (value: Record<string, number>) => void;
  setStatusBadges: (value: string[]) => void;
  setCategoryBadges: (value: string[]) => void;
  setPriorityBadges: (value: string[]) => void;
  setSelectedBadges: (value: string[]) => void;
  setBadgeVisibility: (value: Record<string, boolean>) => void;

  // Funciones de utilidad para badges
  incrementNotification: (badgeId: string) => void;
  decrementNotification: (badgeId: string) => void;
  resetNotification: (badgeId: string) => void;
  addStatusBadge: (status: string) => void;
  removeStatusBadge: (status: string) => void;
  addCategoryBadge: (category: string) => void;
  removeCategoryBadge: (category: string) => void;
  toggleBadgeSelection: (badgeId: string) => void;
  toggleBadgeVisibility: (badgeId: string) => void;

  // Utilidad de limpieza
  clearAllBadges: () => void;
  resetToDefaults: () => void;
}

export const useBadgeExamples = create<BadgeExamplesState>((set, get) => ({
  // Estados iniciales
  defaultExample: 'New',
  sizeExample: 'Badge',
  variantExample: 'default',

  // Estados para ColorScheme
  colorSchemeExample: 'Featured',
  secondaryColorExample: 'Info',
  destructiveColorExample: 'Error',
  accentColorExample: 'Special',
  mutedColorExample: 'Standard',
  minimalColorExample: 'Subtle',

  notificationBadges: {
    messages: 3,
    notifications: 12,
    alerts: 1,
    updates: 0,
  },
  statusBadges: ['Active', 'Pending', 'Completed'],
  categoryBadges: ['Technology', 'Design', 'Marketing'],
  priorityBadges: ['High', 'Medium', 'Low'],

  selectedBadges: [],
  badgeVisibility: {
    messages: true,
    notifications: true,
    alerts: true,
    updates: false,
  },

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

  setNotificationBadges: (value: Record<string, number>) =>
    set({ notificationBadges: value }),
  setStatusBadges: (value: string[]) => set({ statusBadges: value }),
  setCategoryBadges: (value: string[]) => set({ categoryBadges: value }),
  setPriorityBadges: (value: string[]) => set({ priorityBadges: value }),
  setSelectedBadges: (value: string[]) => set({ selectedBadges: value }),
  setBadgeVisibility: (value: Record<string, boolean>) =>
    set({ badgeVisibility: value }),

  // Funciones de utilidad
  incrementNotification: (badgeId: string) => {
    const { notificationBadges } = get();
    set({
      notificationBadges: {
        ...notificationBadges,
        [badgeId]: (notificationBadges[badgeId] || 0) + 1,
      },
    });
  },

  decrementNotification: (badgeId: string) => {
    const { notificationBadges } = get();
    const currentValue = notificationBadges[badgeId] || 0;
    set({
      notificationBadges: {
        ...notificationBadges,
        [badgeId]: Math.max(0, currentValue - 1),
      },
    });
  },

  resetNotification: (badgeId: string) => {
    const { notificationBadges } = get();
    set({
      notificationBadges: {
        ...notificationBadges,
        [badgeId]: 0,
      },
    });
  },

  addStatusBadge: (status: string) => {
    const { statusBadges } = get();
    if (!statusBadges.includes(status)) {
      set({ statusBadges: [...statusBadges, status] });
    }
  },

  removeStatusBadge: (status: string) => {
    const { statusBadges } = get();
    set({ statusBadges: statusBadges.filter((s) => s !== status) });
  },

  addCategoryBadge: (category: string) => {
    const { categoryBadges } = get();
    if (!categoryBadges.includes(category)) {
      set({ categoryBadges: [...categoryBadges, category] });
    }
  },

  removeCategoryBadge: (category: string) => {
    const { categoryBadges } = get();
    set({ categoryBadges: categoryBadges.filter((c) => c !== category) });
  },

  toggleBadgeSelection: (badgeId: string) => {
    const { selectedBadges } = get();
    if (selectedBadges.includes(badgeId)) {
      set({ selectedBadges: selectedBadges.filter((id) => id !== badgeId) });
    } else {
      set({ selectedBadges: [...selectedBadges, badgeId] });
    }
  },

  toggleBadgeVisibility: (badgeId: string) => {
    const { badgeVisibility } = get();
    set({
      badgeVisibility: {
        ...badgeVisibility,
        [badgeId]: !badgeVisibility[badgeId],
      },
    });
  },

  // Utilidades de limpieza
  clearAllBadges: () =>
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
      notificationBadges: {},
      statusBadges: [],
      categoryBadges: [],
      priorityBadges: [],
      selectedBadges: [],
      badgeVisibility: {},
    }),

  resetToDefaults: () =>
    set({
      defaultExample: 'New',
      sizeExample: 'Badge',
      variantExample: 'default',
      colorSchemeExample: 'Featured',
      secondaryColorExample: 'Info',
      destructiveColorExample: 'Error',
      accentColorExample: 'Special',
      mutedColorExample: 'Standard',
      minimalColorExample: 'Subtle',
      notificationBadges: {
        messages: 3,
        notifications: 12,
        alerts: 1,
        updates: 0,
      },
      statusBadges: ['Active', 'Pending', 'Completed'],
      categoryBadges: ['Technology', 'Design', 'Marketing'],
      priorityBadges: ['High', 'Medium', 'Low'],
      selectedBadges: [],
      badgeVisibility: {
        messages: true,
        notifications: true,
        alerts: true,
        updates: false,
      },
    }),
}));

