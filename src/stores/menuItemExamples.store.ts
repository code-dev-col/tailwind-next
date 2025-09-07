import { create } from 'zustand';

interface MenuItemExamplesState {
  // Estados para stories
  defaultExample: string;
  sizeExample: string;
  variantExample: string;
  storeExample: string;
  interactiveExample: string;

  // Estados específicos del MenuItem
  isMenuOpen: boolean;
  selectedMenuItem: string;
  menuItems: Array<{
    id: string;
    label: string;
    shortcut?: string;
    isActive?: boolean;
    isDisabled?: boolean;
  }>;

  // Setters
  setDefaultExample: (value: string) => void;
  setSizeExample: (value: string) => void;
  setVariantExample: (value: string) => void;
  setStoreExample: (value: string) => void;
  setInteractiveExample: (value: string) => void;
  setIsMenuOpen: (value: boolean) => void;
  setSelectedMenuItem: (value: string) => void;
  setMenuItems: (items: Array<any>) => void;
  toggleMenuItem: (id: string) => void;
  addMenuItem: (item: any) => void;
  removeMenuItem: (id: string) => void;

  // Utilidad de limpieza
  clearAllMenuItem: () => void;
}

export const useMenuItemExamples = create<MenuItemExamplesState>(
  (set, get) => ({
    // Estados iniciales
    defaultExample: '',
    sizeExample: '',
    variantExample: '',
    storeExample: '',
    interactiveExample: '',
    isMenuOpen: false,
    selectedMenuItem: '',
    menuItems: [
      {
        id: 'new',
        label: 'Nuevo',
        shortcut: '⌘N',
        isActive: false,
        isDisabled: false,
      },
      {
        id: 'open',
        label: 'Abrir',
        shortcut: '⌘O',
        isActive: false,
        isDisabled: false,
      },
      {
        id: 'save',
        label: 'Guardar',
        shortcut: '⌘S',
        isActive: true,
        isDisabled: false,
      },
      {
        id: 'print',
        label: 'Imprimir',
        shortcut: '⌘P',
        isActive: false,
        isDisabled: true,
      },
    ],

    // Setters básicos
    setDefaultExample: (value: string) => set({ defaultExample: value }),
    setSizeExample: (value: string) => set({ sizeExample: value }),
    setVariantExample: (value: string) => set({ variantExample: value }),
    setStoreExample: (value: string) => set({ storeExample: value }),
    setInteractiveExample: (value: string) =>
      set({ interactiveExample: value }),
    setIsMenuOpen: (value: boolean) => set({ isMenuOpen: value }),
    setSelectedMenuItem: (value: string) => set({ selectedMenuItem: value }),
    setMenuItems: (items) => set({ menuItems: items }),

    // Toggle active state de un item
    toggleMenuItem: (id: string) =>
      set((state) => ({
        menuItems: state.menuItems.map((item) =>
          item.id === id ? { ...item, isActive: !item.isActive } : item
        ),
        selectedMenuItem: id,
      })),

    // Agregar nuevo item
    addMenuItem: (item) =>
      set((state) => ({
        menuItems: [...state.menuItems, { id: Date.now().toString(), ...item }],
      })),

    // Remover item
    removeMenuItem: (id: string) =>
      set((state) => ({
        menuItems: state.menuItems.filter((item) => item.id !== id),
      })),

    // Limpiar todo
    clearAllMenuItem: () =>
      set({
        defaultExample: '',
        sizeExample: '',
        variantExample: '',
        storeExample: '',
        interactiveExample: '',
        isMenuOpen: false,
        selectedMenuItem: '',
        menuItems: [],
      }),
  })
);

