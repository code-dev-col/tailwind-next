import { create } from 'zustand';

interface ChipExamplesState {
  // Estados para cada story
  defaultExample: string[];
  sizeExample: string[];
  variantExample: string[];
  filterExample: string[];
  categoryExample: string[];

  // Estados para ColorScheme stories
  colorSchemeExample: string[];
  secondaryColorExample: string[];
  destructiveColorExample: string[];
  accentColorExample: string[];
  mutedColorExample: string[];
  minimalColorExample: string[];

  // Estados específicos para diferentes usos
  selectedTags: string[];
  skills: string[];
  categories: string[];
  filters: string[];
  technologies: string[];

  // Estados de interacción
  isAddingTag: boolean;
  newTagInput: string;

  // Setters tipados
  setDefaultExample: (value: string[]) => void;
  setSizeExample: (value: string[]) => void;
  setVariantExample: (value: string[]) => void;
  setFilterExample: (value: string[]) => void;
  setCategoryExample: (value: string[]) => void;

  // Setters para ColorScheme
  setColorSchemeExample: (value: string[]) => void;
  setSecondaryColorExample: (value: string[]) => void;
  setDestructiveColorExample: (value: string[]) => void;
  setAccentColorExample: (value: string[]) => void;
  setMutedColorExample: (value: string[]) => void;
  setMinimalColorExample: (value: string[]) => void;

  setSelectedTags: (value: string[]) => void;
  setSkills: (value: string[]) => void;
  setCategories: (value: string[]) => void;
  setFilters: (value: string[]) => void;
  setTechnologies: (value: string[]) => void;

  setIsAddingTag: (value: boolean) => void;
  setNewTagInput: (value: string) => void;

  // Funciones de utilidad para chips
  addChip: (chip: string, key: keyof ChipExamplesState) => void;
  removeChip: (chip: string, key: keyof ChipExamplesState) => void;
  toggleChip: (chip: string, key: keyof ChipExamplesState) => void;
  hasChip: (chip: string, key: keyof ChipExamplesState) => boolean;

  // Funciones específicas
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  addFilter: (filter: string) => void;
  removeFilter: (filter: string) => void;

  // Utilidad de limpieza
  clearAllChips: () => void;
  resetToDefaults: () => void;
}

export const useChipExamples = create<ChipExamplesState>((set, get) => ({
  // Estados iniciales
  defaultExample: ['React', 'TypeScript', 'Tailwind'],
  sizeExample: ['JavaScript', 'CSS', 'HTML'],
  variantExample: ['Frontend', 'Backend', 'Fullstack'],
  filterExample: ['Activo', 'Premium'],
  categoryExample: ['Desarrollo', 'Diseño', 'Marketing'],

  // Estados para ColorScheme
  colorSchemeExample: ['Primary', 'Featured', 'Important'],
  secondaryColorExample: ['Info', 'Note', 'Update'],
  destructiveColorExample: ['Error', 'Warning', 'Critical'],
  accentColorExample: ['Highlight', 'Special', 'Focus'],
  mutedColorExample: ['Basic', 'Standard', 'Regular'],
  minimalColorExample: ['Clean', 'Simple', 'Minimal'],

  selectedTags: ['JavaScript', 'React', 'Node.js'],
  skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  categories: ['Web Development', 'Mobile', 'DevOps'],
  filters: ['Reciente', 'Popular', 'Destacado'],
  technologies: ['React', 'Vue', 'Angular', 'Svelte'],

  isAddingTag: false,
  newTagInput: '',

  // Setters
  setDefaultExample: (value: string[]) => set({ defaultExample: value }),
  setSizeExample: (value: string[]) => set({ sizeExample: value }),
  setVariantExample: (value: string[]) => set({ variantExample: value }),
  setFilterExample: (value: string[]) => set({ filterExample: value }),
  setCategoryExample: (value: string[]) => set({ categoryExample: value }),

  // Setters para ColorScheme
  setColorSchemeExample: (value: string[]) =>
    set({ colorSchemeExample: value }),
  setSecondaryColorExample: (value: string[]) =>
    set({ secondaryColorExample: value }),
  setDestructiveColorExample: (value: string[]) =>
    set({ destructiveColorExample: value }),
  setAccentColorExample: (value: string[]) =>
    set({ accentColorExample: value }),
  setMutedColorExample: (value: string[]) => set({ mutedColorExample: value }),
  setMinimalColorExample: (value: string[]) =>
    set({ minimalColorExample: value }),

  setSelectedTags: (value: string[]) => set({ selectedTags: value }),
  setSkills: (value: string[]) => set({ skills: value }),
  setCategories: (value: string[]) => set({ categories: value }),
  setFilters: (value: string[]) => set({ filters: value }),
  setTechnologies: (value: string[]) => set({ technologies: value }),

  setIsAddingTag: (value: boolean) => set({ isAddingTag: value }),
  setNewTagInput: (value: string) => set({ newTagInput: value }),

  // Funciones de utilidad
  addChip: (chip: string, key: keyof ChipExamplesState) => {
    const state = get();
    const currentValue = state[key];
    if (Array.isArray(currentValue) && !currentValue.includes(chip)) {
      set({ [key]: [...currentValue, chip] });
    }
  },

  removeChip: (chip: string, key: keyof ChipExamplesState) => {
    const state = get();
    const currentValue = state[key];
    if (Array.isArray(currentValue)) {
      set({ [key]: currentValue.filter((item) => item !== chip) });
    }
  },

  toggleChip: (chip: string, key: keyof ChipExamplesState) => {
    const state = get();
    const currentValue = state[key];
    if (Array.isArray(currentValue)) {
      if (currentValue.includes(chip)) {
        set({ [key]: currentValue.filter((item) => item !== chip) });
      } else {
        set({ [key]: [...currentValue, chip] });
      }
    }
  },

  hasChip: (chip: string, key: keyof ChipExamplesState) => {
    const state = get();
    const currentValue = state[key];
    return Array.isArray(currentValue) && currentValue.includes(chip);
  },

  // Funciones específicas
  addSkill: (skill: string) => {
    const { skills } = get();
    if (!skills.includes(skill)) {
      set({ skills: [...skills, skill] });
    }
  },

  removeSkill: (skill: string) => {
    const { skills } = get();
    set({ skills: skills.filter((s) => s !== skill) });
  },

  addCategory: (category: string) => {
    const { categories } = get();
    if (!categories.includes(category)) {
      set({ categories: [...categories, category] });
    }
  },

  removeCategory: (category: string) => {
    const { categories } = get();
    set({ categories: categories.filter((c) => c !== category) });
  },

  addFilter: (filter: string) => {
    const { filters } = get();
    if (!filters.includes(filter)) {
      set({ filters: [...filters, filter] });
    }
  },

  removeFilter: (filter: string) => {
    const { filters } = get();
    set({ filters: filters.filter((f) => f !== filter) });
  },

  // Utilidades de limpieza
  clearAllChips: () =>
    set({
      defaultExample: [],
      sizeExample: [],
      variantExample: [],
      filterExample: [],
      categoryExample: [],
      colorSchemeExample: [],
      secondaryColorExample: [],
      destructiveColorExample: [],
      accentColorExample: [],
      mutedColorExample: [],
      minimalColorExample: [],
      selectedTags: [],
      skills: [],
      categories: [],
      filters: [],
      technologies: [],
      newTagInput: '',
    }),

  resetToDefaults: () =>
    set({
      defaultExample: ['React', 'TypeScript', 'Tailwind'],
      sizeExample: ['JavaScript', 'CSS', 'HTML'],
      variantExample: ['Frontend', 'Backend', 'Fullstack'],
      filterExample: ['Activo', 'Premium'],
      categoryExample: ['Desarrollo', 'Diseño', 'Marketing'],
      colorSchemeExample: ['Primary', 'Featured', 'Important'],
      secondaryColorExample: ['Info', 'Note', 'Update'],
      destructiveColorExample: ['Error', 'Warning', 'Critical'],
      accentColorExample: ['Highlight', 'Special', 'Focus'],
      mutedColorExample: ['Basic', 'Standard', 'Regular'],
      minimalColorExample: ['Clean', 'Simple', 'Minimal'],
      selectedTags: ['JavaScript', 'React', 'Node.js'],
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      categories: ['Web Development', 'Mobile', 'DevOps'],
      filters: ['Reciente', 'Popular', 'Destacado'],
      technologies: ['React', 'Vue', 'Angular', 'Svelte'],
      isAddingTag: false,
      newTagInput: '',
    }),
}));

