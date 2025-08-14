import { create } from 'zustand';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isCurrentPage?: boolean;
  isClickable?: boolean;
}

interface BreadcrumbExamplesState {
  // Estados para diferentes tipos de breadcrumb
  basicBreadcrumbs: BreadcrumbItem[];
  ecommerceBreadcrumbs: BreadcrumbItem[];
  dashboardBreadcrumbs: BreadcrumbItem[];
  documentationBreadcrumbs: BreadcrumbItem[];

  // Estados para configuraciones
  currentVariant: 'default' | 'pills' | 'arrows' | 'slash' | 'dots' | 'minimal';
  currentSize: 'sm' | 'default' | 'lg';
  showIcons: boolean;
  showSeparator: boolean;
  maxItems: number;
  collapsible: boolean;

  // Estados para el breadcrumb interactivo
  interactiveBreadcrumbs: BreadcrumbItem[];
  interactiveVariant:
    | 'default'
    | 'pills'
    | 'arrows'
    | 'slash'
    | 'dots'
    | 'minimal';
  interactiveSize: 'sm' | 'default' | 'lg';
  interactiveShowIcons: boolean;
  interactiveMaxItems: number;
  interactiveCollapsible: boolean;
  interactiveCurrentPage: string;

  // Separadores personalizados
  separatorType: 'chevron' | 'arrow' | 'slash' | 'dot' | 'pipe' | 'custom';
  customSeparator: string;

  // Setters para breadcrumbs
  setBasicBreadcrumbs: (items: BreadcrumbItem[]) => void;
  setEcommerceBreadcrumbs: (items: BreadcrumbItem[]) => void;
  setDashboardBreadcrumbs: (items: BreadcrumbItem[]) => void;
  setDocumentationBreadcrumbs: (items: BreadcrumbItem[]) => void;

  // Setters para configuraciones
  setCurrentVariant: (
    variant: BreadcrumbExamplesState['currentVariant']
  ) => void;
  setCurrentSize: (size: BreadcrumbExamplesState['currentSize']) => void;
  setShowIcons: (show: boolean) => void;
  setShowSeparator: (show: boolean) => void;
  setMaxItems: (max: number) => void;
  setCollapsible: (collapsible: boolean) => void;

  // Setters para breadcrumb interactivo
  setInteractiveBreadcrumbs: (items: BreadcrumbItem[]) => void;
  setInteractiveVariant: (
    variant: BreadcrumbExamplesState['interactiveVariant']
  ) => void;
  setInteractiveSize: (
    size: BreadcrumbExamplesState['interactiveSize']
  ) => void;
  setInteractiveShowIcons: (show: boolean) => void;
  setInteractiveMaxItems: (max: number) => void;
  setInteractiveCollapsible: (collapsible: boolean) => void;
  setInteractiveCurrentPage: (page: string) => void;

  // Setters para separadores
  setSeparatorType: (type: BreadcrumbExamplesState['separatorType']) => void;
  setCustomSeparator: (separator: string) => void;

  // Funciones de utilidad
  addBreadcrumbItem: (
    breadcrumbType: keyof Pick<
      BreadcrumbExamplesState,
      | 'basicBreadcrumbs'
      | 'ecommerceBreadcrumbs'
      | 'dashboardBreadcrumbs'
      | 'documentationBreadcrumbs'
      | 'interactiveBreadcrumbs'
    >,
    item: BreadcrumbItem
  ) => void;
  removeBreadcrumbItem: (
    breadcrumbType: keyof Pick<
      BreadcrumbExamplesState,
      | 'basicBreadcrumbs'
      | 'ecommerceBreadcrumbs'
      | 'dashboardBreadcrumbs'
      | 'documentationBreadcrumbs'
      | 'interactiveBreadcrumbs'
    >,
    index: number
  ) => void;
  navigateToPath: (path: string[]) => void;
  resetAllBreadcrumbs: () => void;
  clearAllBreadcrumbs: () => void;

  // Navegación específica para demos
  setCurrentEcommercePage: (page: string) => void;
  setCurrentDashboardPage: (page: string) => void;
  setCurrentDocPage: (page: string) => void;
}

export const useBreadcrumbExamples = create<BreadcrumbExamplesState>(
  (set, get) => ({
    // Estados iniciales para diferentes breadcrumbs
    basicBreadcrumbs: [
      { label: 'Home', href: '/', icon: '🏠' },
      { label: 'Products', href: '/products', icon: '📦' },
      { label: 'Electronics', href: '/products/electronics', icon: '💻' },
      { label: 'Smartphones', isCurrentPage: true, icon: '📱' },
    ],

    ecommerceBreadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Categories', href: '/categories' },
      { label: 'Technology', href: '/categories/technology' },
      { label: 'Computers', href: '/categories/technology/computers' },
      { label: 'Laptops', href: '/categories/technology/computers/laptops' },
      { label: 'Gaming Laptops', isCurrentPage: true },
    ],

    dashboardBreadcrumbs: [
      { label: 'Dashboard', href: '/dashboard', icon: '📊' },
      { label: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
      { label: 'Reports', href: '/dashboard/analytics/reports', icon: '📋' },
      { label: 'Monthly Report', isCurrentPage: true, icon: '📅' },
    ],

    documentationBreadcrumbs: [
      { label: 'Docs', href: '/docs', icon: '📚' },
      { label: 'Components', href: '/docs/components', icon: '🧩' },
      { label: 'Atoms', href: '/docs/components/atoms', icon: '⚛️' },
      { label: 'Breadcrumb', isCurrentPage: true, icon: '🍞' },
    ],

    // Configuraciones
    currentVariant: 'default',
    currentSize: 'default',
    showIcons: true,
    showSeparator: true,
    maxItems: 5,
    collapsible: true,

    // Interactivo
    interactiveBreadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Section', href: '/section' },
      { label: 'Subsection', href: '/section/subsection' },
      { label: 'Current Page', isCurrentPage: true },
    ],
    interactiveVariant: 'default',
    interactiveSize: 'default',
    interactiveShowIcons: false,
    interactiveMaxItems: 4,
    interactiveCollapsible: true,
    interactiveCurrentPage: 'Current Page',

    // Separadores
    separatorType: 'chevron',
    customSeparator: '→',

    // Setters para breadcrumbs
    setBasicBreadcrumbs: (items) => set({ basicBreadcrumbs: items }),
    setEcommerceBreadcrumbs: (items) => set({ ecommerceBreadcrumbs: items }),
    setDashboardBreadcrumbs: (items) => set({ dashboardBreadcrumbs: items }),
    setDocumentationBreadcrumbs: (items) =>
      set({ documentationBreadcrumbs: items }),

    // Setters para configuraciones
    setCurrentVariant: (variant) => set({ currentVariant: variant }),
    setCurrentSize: (size) => set({ currentSize: size }),
    setShowIcons: (show) => set({ showIcons: show }),
    setShowSeparator: (show) => set({ showSeparator: show }),
    setMaxItems: (max) => set({ maxItems: max }),
    setCollapsible: (collapsible) => set({ collapsible: collapsible }),

    // Setters para interactivo
    setInteractiveBreadcrumbs: (items) =>
      set({ interactiveBreadcrumbs: items }),
    setInteractiveVariant: (variant) => set({ interactiveVariant: variant }),
    setInteractiveSize: (size) => set({ interactiveSize: size }),
    setInteractiveShowIcons: (show) => set({ interactiveShowIcons: show }),
    setInteractiveMaxItems: (max) => set({ interactiveMaxItems: max }),
    setInteractiveCollapsible: (collapsible) =>
      set({ interactiveCollapsible: collapsible }),
    setInteractiveCurrentPage: (page) => set({ interactiveCurrentPage: page }),

    // Setters para separadores
    setSeparatorType: (type) => set({ separatorType: type }),
    setCustomSeparator: (separator) => set({ customSeparator: separator }),

    // Funciones de utilidad
    addBreadcrumbItem: (breadcrumbType, item) => {
      const currentItems = get()[breadcrumbType] as BreadcrumbItem[];
      const newItems = [...currentItems];

      // Remover isCurrentPage del último item
      if (newItems.length > 0) {
        newItems[newItems.length - 1].isCurrentPage = false;
        newItems[newItems.length - 1].href = '/path'; // Añadir href al item anterior
      }

      // Añadir nuevo item como página actual
      newItems.push({ ...item, isCurrentPage: true });

      set({ [breadcrumbType]: newItems });
    },

    removeBreadcrumbItem: (breadcrumbType, index) => {
      const currentItems = get()[breadcrumbType] as BreadcrumbItem[];
      const newItems = currentItems.filter((_, i) => i !== index);

      // Si removemos el último item, hacer el anterior como página actual
      if (index === currentItems.length - 1 && newItems.length > 0) {
        newItems[newItems.length - 1].isCurrentPage = true;
        delete newItems[newItems.length - 1].href;
      }

      set({ [breadcrumbType]: newItems });
    },

    navigateToPath: (path) => {
      const newBreadcrumbs = path.map((segment, index) => ({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href:
          index < path.length - 1
            ? `/${path.slice(0, index + 1).join('/')}`
            : undefined,
        isCurrentPage: index === path.length - 1,
      }));

      set({ interactiveBreadcrumbs: newBreadcrumbs });
    },

    resetAllBreadcrumbs: () =>
      set({
        basicBreadcrumbs: [
          { label: 'Home', href: '/', icon: '🏠' },
          { label: 'Products', href: '/products', icon: '📦' },
          { label: 'Electronics', href: '/products/electronics', icon: '💻' },
          { label: 'Smartphones', isCurrentPage: true, icon: '📱' },
        ],
        ecommerceBreadcrumbs: [
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: 'Technology', href: '/categories/technology' },
          { label: 'Computers', href: '/categories/technology/computers' },
          {
            label: 'Laptops',
            href: '/categories/technology/computers/laptops',
          },
          { label: 'Gaming Laptops', isCurrentPage: true },
        ],
        currentVariant: 'default',
        currentSize: 'default',
        showIcons: true,
        maxItems: 5,
        collapsible: true,
        interactiveVariant: 'default',
        interactiveSize: 'default',
        interactiveShowIcons: false,
        interactiveMaxItems: 4,
        separatorType: 'chevron',
      }),

    clearAllBreadcrumbs: () =>
      set({
        basicBreadcrumbs: [],
        ecommerceBreadcrumbs: [],
        dashboardBreadcrumbs: [],
        documentationBreadcrumbs: [],
        interactiveBreadcrumbs: [],
        currentVariant: 'default',
        currentSize: 'default',
        showIcons: false,
        maxItems: 3,
        collapsible: false,
        interactiveVariant: 'default',
        interactiveSize: 'default',
        interactiveShowIcons: false,
        interactiveMaxItems: 3,
        separatorType: 'chevron',
        customSeparator: '',
      }),

    // Navegación específica para demos
    setCurrentEcommercePage: (page) => {
      if (page === 'product') {
        set({
          ecommerceBreadcrumbs: [
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: 'Technology', href: '/categories/technology' },
            { label: 'Computers', href: '/categories/technology/computers' },
            {
              label: 'Laptops',
              href: '/categories/technology/computers/laptops',
            },
            { label: 'MacBook Pro 16"', isCurrentPage: true },
          ],
        });
      } else if (page === 'category') {
        set({
          ecommerceBreadcrumbs: [
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: 'Technology', href: '/categories/technology' },
            { label: 'Computers', href: '/categories/technology/computers' },
            { label: 'Laptops', isCurrentPage: true },
          ],
        });
      }
    },

    setCurrentDashboardPage: (page) => {
      if (page === 'analytics') {
        set({
          dashboardBreadcrumbs: [
            { label: 'Dashboard', href: '/dashboard', icon: '📊' },
            { label: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
            { label: 'Real-time Data', isCurrentPage: true, icon: '⚡' },
          ],
        });
      } else if (page === 'settings') {
        set({
          dashboardBreadcrumbs: [
            { label: 'Dashboard', href: '/dashboard', icon: '📊' },
            { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
            { label: 'User Preferences', isCurrentPage: true, icon: '�' },
          ],
        });
      }
    },

    setCurrentDocPage: (page) => {
      if (page === 'getting-started') {
        set({
          documentationBreadcrumbs: [
            { label: 'Docs', href: '/docs', icon: '📚' },
            {
              label: 'Getting Started',
              href: '/docs/getting-started',
              icon: '🚀',
            },
            { label: 'Installation', isCurrentPage: true, icon: '📦' },
          ],
        });
      } else if (page === 'api-reference') {
        set({
          documentationBreadcrumbs: [
            { label: 'Docs', href: '/docs', icon: '�' },
            { label: 'API Reference', href: '/docs/api', icon: '�' },
            { label: 'Breadcrumb API', isCurrentPage: true, icon: '�' },
          ],
        });
      }
    },
  })
);

