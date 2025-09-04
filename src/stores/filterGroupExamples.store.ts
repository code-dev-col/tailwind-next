import { create } from 'zustand';

interface FilterGroupExamplesState {
  // Estados para diferentes stories
  defaultExample: string;
  variantExample: string;
  sizeExample: string;

  // Estados para filtros específicos
  categoryFilter: string;
  statusFilter: string;
  priceRangeFilter: string;
  brandFilter: string;

  // Estados para checkboxes
  inStockFilter: boolean;
  onSaleFilter: boolean;
  freeShippingFilter: boolean;
  newArrivalsFilter: boolean;
  featuredFilter: boolean;

  // Estados para el ejemplo interactivo
  interactiveCategory: string;
  interactiveStatus: string;
  interactivePrice: string;
  interactiveInStock: boolean;
  interactiveOnSale: boolean;
  interactiveFreeShipping: boolean;

  // Estados para el ejemplo complejo
  complexCategory: string;
  complexSubcategory: string;
  complexBrand: string;
  complexSize: string;
  complexColor: string;
  complexMinPrice: string;
  complexMaxPrice: string;
  complexAvailable: boolean;
  complexNew: boolean;
  complexSale: boolean;
  complexFeatured: boolean;
  complexRating: boolean;

  // Setters para estados básicos
  setDefaultExample: (value: string) => void;
  setVariantExample: (value: string) => void;
  setSizeExample: (value: string) => void;

  // Setters para filtros específicos
  setCategoryFilter: (value: string) => void;
  setStatusFilter: (value: string) => void;
  setPriceRangeFilter: (value: string) => void;
  setBrandFilter: (value: string) => void;

  // Setters para checkboxes
  setInStockFilter: (value: boolean) => void;
  setOnSaleFilter: (value: boolean) => void;
  setFreeShippingFilter: (value: boolean) => void;
  setNewArrivalsFilter: (value: boolean) => void;
  setFeaturedFilter: (value: boolean) => void;

  // Setters para el ejemplo interactivo
  setInteractiveCategory: (value: string) => void;
  setInteractiveStatus: (value: string) => void;
  setInteractivePrice: (value: string) => void;
  setInteractiveInStock: (value: boolean) => void;
  setInteractiveOnSale: (value: boolean) => void;
  setInteractiveFreeShipping: (value: boolean) => void;

  // Setters para el ejemplo complejo
  setComplexCategory: (value: string) => void;
  setComplexSubcategory: (value: string) => void;
  setComplexBrand: (value: string) => void;
  setComplexSize: (value: string) => void;
  setComplexColor: (value: string) => void;
  setComplexMinPrice: (value: string) => void;
  setComplexMaxPrice: (value: string) => void;
  setComplexAvailable: (value: boolean) => void;
  setComplexNew: (value: boolean) => void;
  setComplexSale: (value: boolean) => void;
  setComplexFeatured: (value: boolean) => void;
  setComplexRating: (value: boolean) => void;

  // Utilidades de limpieza
  clearAllFilterGroup: () => void;
  clearInteractiveFilters: () => void;
  clearComplexFilters: () => void;
}

export const useFilterGroupExamples = create<FilterGroupExamplesState>(
  (set) => ({
    // Estados iniciales
    defaultExample: '',
    variantExample: '',
    sizeExample: '',

    // Filtros específicos
    categoryFilter: '',
    statusFilter: '',
    priceRangeFilter: '',
    brandFilter: '',

    // Checkboxes
    inStockFilter: false,
    onSaleFilter: false,
    freeShippingFilter: false,
    newArrivalsFilter: false,
    featuredFilter: false,

    // Ejemplo interactivo
    interactiveCategory: '',
    interactiveStatus: '',
    interactivePrice: '',
    interactiveInStock: false,
    interactiveOnSale: false,
    interactiveFreeShipping: false,

    // Ejemplo complejo
    complexCategory: '',
    complexSubcategory: '',
    complexBrand: '',
    complexSize: '',
    complexColor: '',
    complexMinPrice: '',
    complexMaxPrice: '',
    complexAvailable: false,
    complexNew: false,
    complexSale: false,
    complexFeatured: false,
    complexRating: false,

    // Setters básicos
    setDefaultExample: (value: string) => set({ defaultExample: value }),
    setVariantExample: (value: string) => set({ variantExample: value }),
    setSizeExample: (value: string) => set({ sizeExample: value }),

    // Setters para filtros específicos
    setCategoryFilter: (value: string) => set({ categoryFilter: value }),
    setStatusFilter: (value: string) => set({ statusFilter: value }),
    setPriceRangeFilter: (value: string) => set({ priceRangeFilter: value }),
    setBrandFilter: (value: string) => set({ brandFilter: value }),

    // Setters para checkboxes
    setInStockFilter: (value: boolean) => set({ inStockFilter: value }),
    setOnSaleFilter: (value: boolean) => set({ onSaleFilter: value }),
    setFreeShippingFilter: (value: boolean) =>
      set({ freeShippingFilter: value }),
    setNewArrivalsFilter: (value: boolean) => set({ newArrivalsFilter: value }),
    setFeaturedFilter: (value: boolean) => set({ featuredFilter: value }),

    // Setters para ejemplo interactivo
    setInteractiveCategory: (value: string) =>
      set({ interactiveCategory: value }),
    setInteractiveStatus: (value: string) => set({ interactiveStatus: value }),
    setInteractivePrice: (value: string) => set({ interactivePrice: value }),
    setInteractiveInStock: (value: boolean) =>
      set({ interactiveInStock: value }),
    setInteractiveOnSale: (value: boolean) => set({ interactiveOnSale: value }),
    setInteractiveFreeShipping: (value: boolean) =>
      set({ interactiveFreeShipping: value }),

    // Setters para ejemplo complejo
    setComplexCategory: (value: string) => set({ complexCategory: value }),
    setComplexSubcategory: (value: string) =>
      set({ complexSubcategory: value }),
    setComplexBrand: (value: string) => set({ complexBrand: value }),
    setComplexSize: (value: string) => set({ complexSize: value }),
    setComplexColor: (value: string) => set({ complexColor: value }),
    setComplexMinPrice: (value: string) => set({ complexMinPrice: value }),
    setComplexMaxPrice: (value: string) => set({ complexMaxPrice: value }),
    setComplexAvailable: (value: boolean) => set({ complexAvailable: value }),
    setComplexNew: (value: boolean) => set({ complexNew: value }),
    setComplexSale: (value: boolean) => set({ complexSale: value }),
    setComplexFeatured: (value: boolean) => set({ complexFeatured: value }),
    setComplexRating: (value: boolean) => set({ complexRating: value }),

    // Utilidades de limpieza
    clearAllFilterGroup: () =>
      set({
        defaultExample: '',
        variantExample: '',
        sizeExample: '',
        categoryFilter: '',
        statusFilter: '',
        priceRangeFilter: '',
        brandFilter: '',
        inStockFilter: false,
        onSaleFilter: false,
        freeShippingFilter: false,
        newArrivalsFilter: false,
        featuredFilter: false,
        interactiveCategory: '',
        interactiveStatus: '',
        interactivePrice: '',
        interactiveInStock: false,
        interactiveOnSale: false,
        interactiveFreeShipping: false,
        complexCategory: '',
        complexSubcategory: '',
        complexBrand: '',
        complexSize: '',
        complexColor: '',
        complexMinPrice: '',
        complexMaxPrice: '',
        complexAvailable: false,
        complexNew: false,
        complexSale: false,
        complexFeatured: false,
        complexRating: false,
      }),

    clearInteractiveFilters: () =>
      set({
        interactiveCategory: '',
        interactiveStatus: '',
        interactivePrice: '',
        interactiveInStock: false,
        interactiveOnSale: false,
        interactiveFreeShipping: false,
      }),

    clearComplexFilters: () =>
      set({
        complexCategory: '',
        complexSubcategory: '',
        complexBrand: '',
        complexSize: '',
        complexColor: '',
        complexMinPrice: '',
        complexMaxPrice: '',
        complexAvailable: false,
        complexNew: false,
        complexSale: false,
        complexFeatured: false,
        complexRating: false,
      }),
  })
);

