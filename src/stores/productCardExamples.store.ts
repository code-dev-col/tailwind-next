import { create } from 'zustand';
import type { ProductCardProps } from '../components/molecules/cards/ProductCard/ProductCard';

// Interfaz para un producto completo
export interface ProductExample {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  discount?: string;
  isNew: boolean;
  isFavorite: boolean;
  interactive: boolean;
}

// Estado del store
interface ProductCardExamplesState {
  // Ejemplos para cada story
  defaultExample: ProductExample;
  compactExample: ProductExample;
  detailedExample: ProductExample;
  minimalExample: ProductExample;

  // Colecciones para stories complejas
  variantProducts: ProductExample[];
  categoryProducts: ProductExample[];
  brandProducts: ProductExample[];
  saleProducts: ProductExample[];

  // Estados de UI
  searchTerm: string;
  selectedCategory: string;
  selectedBrand: string;
  priceRange: [number, number];
  showOnlyInStock: boolean;
  sortBy: 'price' | 'rating' | 'newest' | 'popularity';

  // Simulación
  isSimulating: boolean;
  updateInterval: number;

  // Setters para productos individuales
  setDefaultExample: (product: Partial<ProductExample>) => void;
  setCompactExample: (product: Partial<ProductExample>) => void;
  setDetailedExample: (product: Partial<ProductExample>) => void;
  setMinimalExample: (product: Partial<ProductExample>) => void;

  // Setters para colecciones
  setVariantProducts: (products: ProductExample[]) => void;
  setCategoryProducts: (products: ProductExample[]) => void;
  setBrandProducts: (products: ProductExample[]) => void;
  setSaleProducts: (products: ProductExample[]) => void;

  // UI setters
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedBrand: (brand: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setShowOnlyInStock: (show: boolean) => void;
  setSortBy: (sort: 'price' | 'rating' | 'newest' | 'popularity') => void;

  // Acciones de producto
  toggleFavorite: (productId: string) => void;
  updateStock: (
    productId: string,
    inStock: boolean,
    stockCount?: number
  ) => void;
  updatePrice: (
    productId: string,
    price: number,
    originalPrice?: number
  ) => void;
  updateRating: (
    productId: string,
    rating: number,
    reviewCount: number
  ) => void;

  // Simulación
  toggleSimulation: () => void;
  setUpdateInterval: (interval: number) => void;
  simulateRealTimeUpdates: () => void;

  // Utilidades
  clearAllProducts: () => void;
  resetToDefaults: () => void;
  getFilteredProducts: () => ProductExample[];
  getSortedProducts: (products: ProductExample[]) => ProductExample[];
}

// Datos de ejemplo predefinidos
const defaultProductData: ProductExample = {
  id: 'default-product',
  title: 'Smartphone Galaxy Pro',
  description:
    'Smartphone de última generación con cámara triple y pantalla AMOLED de 6.7 pulgadas',
  price: 899000,
  originalPrice: 1199000,
  currency: '₡',
  imageUrl:
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
  imageAlt: 'Smartphone Galaxy Pro',
  category: 'Electrónicos',
  brand: 'Samsung',
  rating: 4.5,
  reviewCount: 128,
  inStock: true,
  stockCount: 15,
  discount: '-25%',
  isNew: false,
  isFavorite: false,
  interactive: true,
};

const compactProductData: ProductExample = {
  id: 'compact-product',
  title: 'Laptop Gaming RGB',
  description: 'Laptop para gaming con RTX 4060 y 16GB RAM',
  price: 1599000,
  originalPrice: 1899000,
  currency: '₡',
  imageUrl:
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
  imageAlt: 'Laptop Gaming RGB',
  category: 'Computadoras',
  brand: 'ASUS',
  rating: 4.8,
  reviewCount: 89,
  inStock: true,
  stockCount: 8,
  isNew: true,
  isFavorite: true,
  interactive: true,
};

const detailedProductData: ProductExample = {
  id: 'detailed-product',
  title: 'Auriculares Inalámbricos Pro',
  description:
    'Auriculares con cancelación de ruido activa, batería de 30 horas y sonido Hi-Fi premium',
  price: 299000,
  originalPrice: 399000,
  currency: '₡',
  imageUrl:
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  imageAlt: 'Auriculares Inalámbricos Pro',
  category: 'Audio',
  brand: 'Sony',
  rating: 4.7,
  reviewCount: 342,
  inStock: true,
  stockCount: 23,
  discount: '-25%',
  isNew: false,
  isFavorite: false,
  interactive: true,
};

const minimalProductData: ProductExample = {
  id: 'minimal-product',
  title: 'Smartwatch Series 9',
  description: 'Reloj inteligente con monitoreo de salud y GPS',
  price: 449000,
  currency: '₡',
  imageUrl:
    'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop',
  imageAlt: 'Smartwatch Series 9',
  category: 'Wearables',
  brand: 'Apple',
  rating: 4.6,
  reviewCount: 567,
  inStock: false,
  isNew: true,
  isFavorite: false,
  interactive: true,
};

// Productos para diferentes stories
const variantProductsData: ProductExample[] = [
  defaultProductData,
  compactProductData,
  detailedProductData,
  minimalProductData,
];

const categoryProductsData: ProductExample[] = [
  {
    ...defaultProductData,
    id: 'electronics-1',
    title: 'Tablet Pro 12.9"',
    category: 'Electrónicos',
    price: 1299000,
    imageUrl:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
  },
  {
    ...compactProductData,
    id: 'computers-1',
    title: 'Monitor Gaming 27"',
    category: 'Computadoras',
    price: 599000,
    imageUrl:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
  },
  {
    ...detailedProductData,
    id: 'audio-1',
    title: 'Parlante Bluetooth',
    category: 'Audio',
    price: 199000,
    imageUrl:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
  },
];

export const useProductCardExamples = create<ProductCardExamplesState>(
  (set, get) => ({
    // Estados iniciales
    defaultExample: defaultProductData,
    compactExample: compactProductData,
    detailedExample: detailedProductData,
    minimalExample: minimalProductData,

    variantProducts: variantProductsData,
    categoryProducts: categoryProductsData,
    brandProducts: variantProductsData,
    saleProducts: variantProductsData.filter(
      (p) => p.originalPrice && p.originalPrice > p.price
    ),

    // Estados de UI
    searchTerm: '',
    selectedCategory: '',
    selectedBrand: '',
    priceRange: [0, 2000000],
    showOnlyInStock: false,
    sortBy: 'popularity',

    // Simulación
    isSimulating: false,
    updateInterval: 3000,

    // Setters para productos individuales
    setDefaultExample: (product) =>
      set((state) => ({
        defaultExample: { ...state.defaultExample, ...product },
      })),

    setCompactExample: (product) =>
      set((state) => ({
        compactExample: { ...state.compactExample, ...product },
      })),

    setDetailedExample: (product) =>
      set((state) => ({
        detailedExample: { ...state.detailedExample, ...product },
      })),

    setMinimalExample: (product) =>
      set((state) => ({
        minimalExample: { ...state.minimalExample, ...product },
      })),

    // Setters para colecciones
    setVariantProducts: (products) => set({ variantProducts: products }),
    setCategoryProducts: (products) => set({ categoryProducts: products }),
    setBrandProducts: (products) => set({ brandProducts: products }),
    setSaleProducts: (products) => set({ saleProducts: products }),

    // UI setters
    setSearchTerm: (term) => set({ searchTerm: term }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setSelectedBrand: (brand) => set({ selectedBrand: brand }),
    setPriceRange: (range) => set({ priceRange: range }),
    setShowOnlyInStock: (show) => set({ showOnlyInStock: show }),
    setSortBy: (sort) => set({ sortBy: sort }),

    // Acciones de producto
    toggleFavorite: (productId) =>
      set((state) => {
        const updateProduct = (product: ProductExample) =>
          product.id === productId
            ? { ...product, isFavorite: !product.isFavorite }
            : product;

        return {
          defaultExample: updateProduct(state.defaultExample),
          compactExample: updateProduct(state.compactExample),
          detailedExample: updateProduct(state.detailedExample),
          minimalExample: updateProduct(state.minimalExample),
          variantProducts: state.variantProducts.map(updateProduct),
          categoryProducts: state.categoryProducts.map(updateProduct),
          brandProducts: state.brandProducts.map(updateProduct),
          saleProducts: state.saleProducts.map(updateProduct),
        };
      }),

    updateStock: (productId, inStock, stockCount) =>
      set((state) => {
        const updateProduct = (product: ProductExample) =>
          product.id === productId
            ? { ...product, inStock, stockCount }
            : product;

        return {
          defaultExample: updateProduct(state.defaultExample),
          compactExample: updateProduct(state.compactExample),
          detailedExample: updateProduct(state.detailedExample),
          minimalExample: updateProduct(state.minimalExample),
          variantProducts: state.variantProducts.map(updateProduct),
          categoryProducts: state.categoryProducts.map(updateProduct),
          brandProducts: state.brandProducts.map(updateProduct),
          saleProducts: state.saleProducts.map(updateProduct),
        };
      }),

    updatePrice: (productId, price, originalPrice) =>
      set((state) => {
        const updateProduct = (product: ProductExample) =>
          product.id === productId
            ? { ...product, price, originalPrice }
            : product;

        return {
          defaultExample: updateProduct(state.defaultExample),
          compactExample: updateProduct(state.compactExample),
          detailedExample: updateProduct(state.detailedExample),
          minimalExample: updateProduct(state.minimalExample),
          variantProducts: state.variantProducts.map(updateProduct),
          categoryProducts: state.categoryProducts.map(updateProduct),
          brandProducts: state.brandProducts.map(updateProduct),
          saleProducts: state.saleProducts.map(updateProduct),
        };
      }),

    updateRating: (productId, rating, reviewCount) =>
      set((state) => {
        const updateProduct = (product: ProductExample) =>
          product.id === productId
            ? { ...product, rating, reviewCount }
            : product;

        return {
          defaultExample: updateProduct(state.defaultExample),
          compactExample: updateProduct(state.compactExample),
          detailedExample: updateProduct(state.detailedExample),
          minimalExample: updateProduct(state.minimalExample),
          variantProducts: state.variantProducts.map(updateProduct),
          categoryProducts: state.categoryProducts.map(updateProduct),
          brandProducts: state.brandProducts.map(updateProduct),
          saleProducts: state.saleProducts.map(updateProduct),
        };
      }),

    // Simulación
    toggleSimulation: () =>
      set((state) => {
        const newSimulating = !state.isSimulating;
        if (newSimulating) {
          // Iniciar la simulación inmediatamente
          setTimeout(() => get().simulateRealTimeUpdates(), 100);
        }
        return { isSimulating: newSimulating };
      }),

    setUpdateInterval: (interval) => set({ updateInterval: interval }),

    simulateRealTimeUpdates: () => {
      const state = get();
      const { isSimulating, updateInterval } = state;

      if (!isSimulating) return;

      // Simular cambios aleatorios en los productos principales
      const products = [
        'default-product',
        'compact-product',
        'detailed-product',
        'minimal-product',
      ];
      const randomProduct =
        products[Math.floor(Math.random() * products.length)];

      const action = Math.floor(Math.random() * 3);

      switch (action) {
        case 0: // Cambiar stock
          state.updateStock(
            randomProduct,
            Math.random() > 0.3, // 70% probabilidad de estar en stock
            Math.floor(Math.random() * 50) + 1
          );
          console.log(`🔄 Simulación: Stock actualizado para ${randomProduct}`);
          break;
        case 1: // Cambiar precio
          const newPrice = Math.floor(Math.random() * 1000000) + 100000;
          state.updatePrice(randomProduct, newPrice, newPrice * 1.2);
          console.log(
            `🔄 Simulación: Precio actualizado para ${randomProduct}: ${newPrice}`
          );
          break;
        case 2: // Cambiar rating
          state.updateRating(
            randomProduct,
            Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 - 5.0
            Math.floor(Math.random() * 500) + 50
          );
          console.log(
            `🔄 Simulación: Rating actualizado para ${randomProduct}`
          );
          break;
      }

      // Programar siguiente actualización
      setTimeout(() => {
        const currentState = get();
        if (currentState.isSimulating) {
          currentState.simulateRealTimeUpdates();
        }
      }, updateInterval);
    },

    // Utilidades
    clearAllProducts: () =>
      set({
        defaultExample: { ...defaultProductData, title: '', price: 0 },
        compactExample: { ...compactProductData, title: '', price: 0 },
        detailedExample: { ...detailedProductData, title: '', price: 0 },
        minimalExample: { ...minimalProductData, title: '', price: 0 },
        variantProducts: [],
        categoryProducts: [],
        brandProducts: [],
        saleProducts: [],
      }),

    resetToDefaults: () =>
      set({
        defaultExample: defaultProductData,
        compactExample: compactProductData,
        detailedExample: detailedProductData,
        minimalExample: minimalProductData,
        variantProducts: variantProductsData,
        categoryProducts: categoryProductsData,
        brandProducts: variantProductsData,
        saleProducts: variantProductsData.filter(
          (p) => p.originalPrice && p.originalPrice > p.price
        ),
        searchTerm: '',
        selectedCategory: '',
        selectedBrand: '',
        priceRange: [0, 2000000],
        showOnlyInStock: false,
        sortBy: 'popularity',
        isSimulating: false,
      }),

    getFilteredProducts: () => {
      const {
        variantProducts,
        searchTerm,
        selectedCategory,
        selectedBrand,
        priceRange,
        showOnlyInStock,
      } = get();

      return variantProducts.filter((product) => {
        // Filtro por término de búsqueda
        if (
          searchTerm &&
          !product.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }

        // Filtro por categoría
        if (selectedCategory && product.category !== selectedCategory) {
          return false;
        }

        // Filtro por marca
        if (selectedBrand && product.brand !== selectedBrand) {
          return false;
        }

        // Filtro por rango de precio
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
          return false;
        }

        // Filtro por stock
        if (showOnlyInStock && !product.inStock) {
          return false;
        }

        return true;
      });
    },

    getSortedProducts: (products) => {
      const { sortBy } = get();

      return [...products].sort((a, b) => {
        switch (sortBy) {
          case 'price':
            return a.price - b.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return Number(b.isNew) - Number(a.isNew);
          case 'popularity':
            return b.reviewCount - a.reviewCount;
          default:
            return 0;
        }
      });
    },
  })
);

