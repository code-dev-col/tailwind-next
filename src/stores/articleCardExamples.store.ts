import { create } from 'zustand';

export interface ArticleData {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  author: string;
  authorAvatar?: string;
  publishedDate: string;
  category: string;
  tags?: string[];
  imageUrl: string;
  imageAlt?: string;
  readTime: number; // en minutos
  views?: number;
  likes?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isFeatured?: boolean;
  isSponsored?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  slug: string;
}

interface ArticleCardExamplesState {
  // Ejemplos individuales para stories
  defaultExample: ArticleData;
  compactExample: ArticleData;
  detailedExample: ArticleData;
  minimalExample: ArticleData;
  storeExample: ArticleData;
  interactiveExample: ArticleData;

  // Ejemplos de variantes para grid
  variantArticles: ArticleData[];

  // Estados de filtrado para demo
  searchTerm: string;
  selectedCategory: string;
  selectedAuthor: string;
  showOnlyBookmarked: boolean;
  sortBy: 'newest' | 'oldest' | 'popular' | 'readTime';

  // Estados de simulación
  isSimulating: boolean;
  updateInterval: number;

  // Setters individuales
  setDefaultExample: (article: Partial<ArticleData>) => void;
  setCompactExample: (article: Partial<ArticleData>) => void;
  setDetailedExample: (article: Partial<ArticleData>) => void;
  setMinimalExample: (article: Partial<ArticleData>) => void;
  setStoreExample: (article: Partial<ArticleData>) => void;
  setInteractiveExample: (article: Partial<ArticleData>) => void;

  // Acciones de artículo
  toggleBookmark: (articleId: string) => void;
  updateViews: (articleId: string, views: number) => void;
  updateLikes: (articleId: string, likes: number) => void;

  // Filtros y búsqueda
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedAuthor: (author: string) => void;
  setShowOnlyBookmarked: (show: boolean) => void;
  setSortBy: (sort: 'newest' | 'oldest' | 'popular' | 'readTime') => void;

  // Utilidades
  getFilteredArticles: () => ArticleData[];
  getSortedArticles: (articles: ArticleData[]) => ArticleData[];

  // Simulación en tiempo real
  toggleSimulation: () => void;
  setUpdateInterval: (interval: number) => void;
  simulateRealTimeUpdates: () => void;

  // Limpieza
  clearAllArticles: () => void;
  clearAllArticleCard: () => void;
  resetToDefaults: () => void;
}

const defaultArticleData: ArticleData = {
  id: 'article-1',
  title: 'Introducción a React Hooks: useState y useEffect',
  excerpt:
    'Aprende los fundamentos de los hooks más importantes en React y cómo pueden simplificar tu código.',
  content:
    'Los hooks revolucionaron la forma en que escribimos componentes en React...',
  author: 'María González',
  authorAvatar:
    'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=100&h=100&fit=crop&crop=face',
  publishedDate: '2024-03-15',
  category: 'React',
  tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
  imageUrl:
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
  imageAlt: 'Código React en pantalla',
  readTime: 8,
  views: 1243,
  likes: 89,
  isBookmarked: false,
  isFeatured: false,
  difficulty: 'beginner',
  slug: 'introduccion-react-hooks-usestate-useeffect',
};

const variantArticlesData: ArticleData[] = [
  {
    ...defaultArticleData,
    id: 'article-1',
  },
  {
    id: 'article-2',
    title: 'Optimización de Performance en Next.js',
    excerpt:
      'Técnicas avanzadas para mejorar el rendimiento de tus aplicaciones Next.js.',
    author: 'Carlos Ruiz',
    authorAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    publishedDate: '2024-03-12',
    category: 'Next.js',
    tags: ['Next.js', 'Performance', 'SSR', 'Optimización'],
    imageUrl:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
    imageAlt: 'Dashboard de performance',
    readTime: 12,
    views: 892,
    likes: 156,
    isBookmarked: true,
    isFeatured: true,
    difficulty: 'intermediate',
    slug: 'optimizacion-performance-nextjs',
  },
  {
    id: 'article-3',
    title: 'TypeScript: Tipos Avanzados y Utilidades',
    excerpt:
      'Explora tipos avanzados, mapped types y utility types para escribir código más robusto.',
    author: 'Ana Martínez',
    authorAvatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    publishedDate: '2024-03-10',
    category: 'TypeScript',
    tags: ['TypeScript', 'Tipos', 'JavaScript', 'Desarrollo'],
    imageUrl:
      'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&h=400&fit=crop',
    imageAlt: 'Código TypeScript',
    readTime: 15,
    views: 567,
    likes: 78,
    isBookmarked: false,
    isFeatured: false,
    difficulty: 'advanced',
    slug: 'typescript-tipos-avanzados-utilidades',
  },
  {
    id: 'article-4',
    title: 'CSS Grid vs Flexbox: Cuándo usar cada uno',
    excerpt:
      'Una guía práctica para elegir entre CSS Grid y Flexbox según el caso de uso.',
    author: 'Roberto Silva',
    authorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    publishedDate: '2024-03-08',
    category: 'CSS',
    tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
    imageUrl:
      'https://images.unsplash.com/photo-1545670723-196ed0954986?w=800&h=400&fit=crop',
    imageAlt: 'Layout CSS grid',
    readTime: 6,
    views: 2156,
    likes: 234,
    isBookmarked: true,
    isFeatured: true,
    difficulty: 'beginner',
    slug: 'css-grid-vs-flexbox-cuando-usar',
  },
];

export const useArticleCardExamples = create<ArticleCardExamplesState>(
  (set, get) => ({
    // Estados iniciales
    defaultExample: defaultArticleData,
    compactExample: variantArticlesData[1],
    detailedExample: variantArticlesData[2],
    minimalExample: variantArticlesData[3],
    storeExample: {
      ...defaultArticleData,
      id: 'store-example',
      title: 'Artículo desde Store',
    },
    interactiveExample: {
      ...defaultArticleData,
      id: 'interactive-example',
      title: 'Artículo Interactivo',
      isLiked: false,
    },
    variantArticles: variantArticlesData,

    // Estados de filtrado
    searchTerm: '',
    selectedCategory: '',
    selectedAuthor: '',
    showOnlyBookmarked: false,
    sortBy: 'newest',

    // Estados de simulación
    isSimulating: false,
    updateInterval: 3000,

    // Setters
    setDefaultExample: (article) =>
      set((state) => ({
        defaultExample: { ...state.defaultExample, ...article },
      })),

    setCompactExample: (article) =>
      set((state) => ({
        compactExample: { ...state.compactExample, ...article },
      })),

    setDetailedExample: (article) =>
      set((state) => ({
        detailedExample: { ...state.detailedExample, ...article },
      })),

    setMinimalExample: (article) =>
      set((state) => ({
        minimalExample: { ...state.minimalExample, ...article },
      })),

    setStoreExample: (article) =>
      set((state) => ({
        storeExample: { ...state.storeExample, ...article },
      })),

    setInteractiveExample: (article) =>
      set((state) => ({
        interactiveExample: { ...state.interactiveExample, ...article },
      })),

    // Acciones de artículo
    toggleBookmark: (articleId) =>
      set((state) => ({
        defaultExample:
          state.defaultExample.id === articleId
            ? {
                ...state.defaultExample,
                isBookmarked: !state.defaultExample.isBookmarked,
              }
            : state.defaultExample,
        compactExample:
          state.compactExample.id === articleId
            ? {
                ...state.compactExample,
                isBookmarked: !state.compactExample.isBookmarked,
              }
            : state.compactExample,
        detailedExample:
          state.detailedExample.id === articleId
            ? {
                ...state.detailedExample,
                isBookmarked: !state.detailedExample.isBookmarked,
              }
            : state.detailedExample,
        minimalExample:
          state.minimalExample.id === articleId
            ? {
                ...state.minimalExample,
                isBookmarked: !state.minimalExample.isBookmarked,
              }
            : state.minimalExample,
        variantArticles: state.variantArticles.map((article) =>
          article.id === articleId
            ? { ...article, isBookmarked: !article.isBookmarked }
            : article
        ),
      })),

    updateViews: (articleId, views) =>
      set((state) => ({
        defaultExample:
          state.defaultExample.id === articleId
            ? { ...state.defaultExample, views }
            : state.defaultExample,
        compactExample:
          state.compactExample.id === articleId
            ? { ...state.compactExample, views }
            : state.compactExample,
        detailedExample:
          state.detailedExample.id === articleId
            ? { ...state.detailedExample, views }
            : state.detailedExample,
        minimalExample:
          state.minimalExample.id === articleId
            ? { ...state.minimalExample, views }
            : state.minimalExample,
        variantArticles: state.variantArticles.map((article) =>
          article.id === articleId ? { ...article, views } : article
        ),
      })),

    updateLikes: (articleId, likes) =>
      set((state) => ({
        defaultExample:
          state.defaultExample.id === articleId
            ? { ...state.defaultExample, likes }
            : state.defaultExample,
        compactExample:
          state.compactExample.id === articleId
            ? { ...state.compactExample, likes }
            : state.compactExample,
        detailedExample:
          state.detailedExample.id === articleId
            ? { ...state.detailedExample, likes }
            : state.detailedExample,
        minimalExample:
          state.minimalExample.id === articleId
            ? { ...state.minimalExample, likes }
            : state.minimalExample,
        variantArticles: state.variantArticles.map((article) =>
          article.id === articleId ? { ...article, likes } : article
        ),
      })),

    // Filtros
    setSearchTerm: (term) => set({ searchTerm: term }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setSelectedAuthor: (author) => set({ selectedAuthor: author }),
    setShowOnlyBookmarked: (show) => set({ showOnlyBookmarked: show }),
    setSortBy: (sort) => set({ sortBy: sort }),

    // Utilidades de filtrado
    getFilteredArticles: () => {
      const state = get();
      return state.variantArticles.filter((article) => {
        const matchesSearch =
          article.title
            .toLowerCase()
            .includes(state.searchTerm.toLowerCase()) ||
          article.excerpt
            ?.toLowerCase()
            .includes(state.searchTerm.toLowerCase()) ||
          article.tags?.some((tag) =>
            tag.toLowerCase().includes(state.searchTerm.toLowerCase())
          );

        const matchesCategory =
          !state.selectedCategory ||
          article.category === state.selectedCategory;

        const matchesAuthor =
          !state.selectedAuthor || article.author === state.selectedAuthor;

        const matchesBookmark =
          !state.showOnlyBookmarked || article.isBookmarked;

        return (
          matchesSearch && matchesCategory && matchesAuthor && matchesBookmark
        );
      });
    },

    getSortedArticles: (articles) => {
      const state = get();
      return [...articles].sort((a, b) => {
        switch (state.sortBy) {
          case 'newest':
            return (
              new Date(b.publishedDate).getTime() -
              new Date(a.publishedDate).getTime()
            );
          case 'oldest':
            return (
              new Date(a.publishedDate).getTime() -
              new Date(b.publishedDate).getTime()
            );
          case 'popular':
            return (b.views || 0) - (a.views || 0);
          case 'readTime':
            return a.readTime - b.readTime;
          default:
            return 0;
        }
      });
    },

    // Simulación
    toggleSimulation: () => {
      const state = get();
      if (state.isSimulating) {
        set({ isSimulating: false });
      } else {
        set({ isSimulating: true });
        get().simulateRealTimeUpdates();
      }
    },

    setUpdateInterval: (interval) => set({ updateInterval: interval }),

    simulateRealTimeUpdates: () => {
      const state = get();
      if (!state.isSimulating) return;

      // Simular cambios en views y likes
      const articlesToUpdate = [
        'defaultExample',
        'compactExample',
        'detailedExample',
        'minimalExample',
      ] as const;

      const randomArticle =
        articlesToUpdate[Math.floor(Math.random() * articlesToUpdate.length)];
      const currentArticle = state[randomArticle];

      const newViews =
        (currentArticle.views || 0) + Math.floor(Math.random() * 10) + 1;
      const newLikes =
        (currentArticle.likes || 0) + Math.floor(Math.random() * 3);

      console.log(
        `📰 ArticleCard Simulation: Updating ${currentArticle.title}`,
        {
          article: randomArticle,
          oldViews: currentArticle.views,
          newViews,
          oldLikes: currentArticle.likes,
          newLikes,
          timestamp: new Date().toLocaleTimeString(),
        }
      );

      get().updateViews(currentArticle.id, newViews);
      get().updateLikes(currentArticle.id, newLikes);

      // Programar siguiente actualización
      setTimeout(() => {
        if (get().isSimulating) {
          get().simulateRealTimeUpdates();
        }
      }, state.updateInterval);
    },

    // Limpieza
    clearAllArticles: () =>
      set({
        searchTerm: '',
        selectedCategory: '',
        selectedAuthor: '',
        showOnlyBookmarked: false,
        sortBy: 'newest',
      }),

    clearAllArticleCard: () =>
      set({
        searchTerm: '',
        selectedCategory: '',
        selectedAuthor: '',
        showOnlyBookmarked: false,
        sortBy: 'newest',
      }),

    resetToDefaults: () =>
      set({
        defaultExample: defaultArticleData,
        compactExample: variantArticlesData[1],
        detailedExample: variantArticlesData[2],
        minimalExample: variantArticlesData[3],
        variantArticles: variantArticlesData,
        isSimulating: false,
        searchTerm: '',
        selectedCategory: '',
        selectedAuthor: '',
        showOnlyBookmarked: false,
        sortBy: 'newest',
      }),
  })
);

