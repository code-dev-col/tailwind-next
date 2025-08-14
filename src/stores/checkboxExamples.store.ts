import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { StateCreator } from 'zustand';

// === SLICE PARA CHECKBOXES BÁSICOS ===
interface BasicCheckboxSlice {
  acceptTerms: boolean;
  newsletter: boolean;
  notifications: boolean;
  marketing: boolean;

  setAcceptTerms: (value: boolean) => void;
  setNewsletter: (value: boolean) => void;
  setNotifications: (value: boolean) => void;
  setMarketing: (value: boolean) => void;

  clearBasicCheckboxes: () => void;
}

const createBasicCheckboxSlice: StateCreator<
  BasicCheckboxSlice & MultiCheckboxSlice & IndeterminateSlice & FormSlice,
  [],
  [],
  BasicCheckboxSlice
> = (set) => ({
  acceptTerms: false,
  newsletter: true,
  notifications: false,
  marketing: false,

  setAcceptTerms: (value) => set({ acceptTerms: value }),
  setNewsletter: (value) => set({ newsletter: value }),
  setNotifications: (value) => set({ notifications: value }),
  setMarketing: (value) => set({ marketing: value }),

  clearBasicCheckboxes: () =>
    set({
      acceptTerms: false,
      newsletter: false,
      notifications: false,
      marketing: false,
    }),
});

// === SLICE PARA CHECKBOXES MÚLTIPLES ===
interface MultiCheckboxSlice {
  interests: string[];
  skills: string[];
  languages: string[];

  setInterests: (value: string[]) => void;
  setSkills: (value: string[]) => void;
  setLanguages: (value: string[]) => void;

  clearMultiCheckboxes: () => void;
}

const createMultiCheckboxSlice: StateCreator<
  BasicCheckboxSlice & MultiCheckboxSlice & IndeterminateSlice & FormSlice,
  [],
  [],
  MultiCheckboxSlice
> = (set) => ({
  interests: ['web-development'],
  skills: ['javascript', 'react'],
  languages: ['es'],

  setInterests: (value) => set({ interests: value }),
  setSkills: (value) => set({ skills: value }),
  setLanguages: (value) => set({ languages: value }),

  clearMultiCheckboxes: () =>
    set({
      interests: [],
      skills: [],
      languages: [],
    }),
});

// === SLICE PARA ESTADOS INDETERMINADOS ===
interface IndeterminateSlice {
  parentCheckbox: boolean;
  childCheckboxes: boolean[];

  setParentCheckbox: (value: boolean) => void;
  setChildCheckboxes: (value: boolean[]) => void;
  toggleChildCheckbox: (index: number) => void;

  clearIndeterminateStates: () => void;
}

const createIndeterminateSlice: StateCreator<
  BasicCheckboxSlice & MultiCheckboxSlice & IndeterminateSlice & FormSlice,
  [],
  [],
  IndeterminateSlice
> = (set, get) => ({
  parentCheckbox: false,
  childCheckboxes: [false, true, false],

  setParentCheckbox: (value) => {
    set({
      parentCheckbox: value,
      childCheckboxes: get().childCheckboxes.map(() => value),
    });
  },

  setChildCheckboxes: (value) => {
    const allChecked = value.every(Boolean);
    const allUnchecked = value.every((v) => !v);

    set({
      childCheckboxes: value,
      parentCheckbox: allChecked ? true : allUnchecked ? false : false,
    });
  },

  toggleChildCheckbox: (index) => {
    const current = get().childCheckboxes;
    const newCheckboxes = [...current];
    newCheckboxes[index] = !newCheckboxes[index];

    const allChecked = newCheckboxes.every(Boolean);
    const allUnchecked = newCheckboxes.every((v) => !v);

    set({
      childCheckboxes: newCheckboxes,
      parentCheckbox: allChecked ? true : allUnchecked ? false : false,
    });
  },

  clearIndeterminateStates: () =>
    set({
      parentCheckbox: false,
      childCheckboxes: [false, false, false],
    }),
});

// === SLICE PARA FORMULARIO COMPLETO ===
interface FormSlice {
  formData: {
    name: string;
    email: string;
    preferences: string[];
    subscriptions: boolean[];
    agreedToTerms: boolean;
  };

  setFormName: (value: string) => void;
  setFormEmail: (value: string) => void;
  setFormPreferences: (value: string[]) => void;
  setFormSubscriptions: (value: boolean[]) => void;
  setFormAgreedToTerms: (value: boolean) => void;

  clearFormData: () => void;
  isFormValid: () => boolean;
}

const createFormSlice: StateCreator<
  BasicCheckboxSlice & MultiCheckboxSlice & IndeterminateSlice & FormSlice,
  [],
  [],
  FormSlice
> = (set, get) => ({
  formData: {
    name: '',
    email: '',
    preferences: [],
    subscriptions: [false, false, false],
    agreedToTerms: false,
  },

  setFormName: (value) => set({ formData: { ...get().formData, name: value } }),

  setFormEmail: (value) =>
    set({ formData: { ...get().formData, email: value } }),

  setFormPreferences: (value) =>
    set({ formData: { ...get().formData, preferences: value } }),

  setFormSubscriptions: (value) =>
    set({ formData: { ...get().formData, subscriptions: value } }),

  setFormAgreedToTerms: (value) =>
    set({ formData: { ...get().formData, agreedToTerms: value } }),

  clearFormData: () =>
    set({
      formData: {
        name: '',
        email: '',
        preferences: [],
        subscriptions: [false, false, false],
        agreedToTerms: false,
      },
    }),

  isFormValid: () => {
    const { formData } = get();
    return (
      formData.name.length > 0 &&
      formData.email.includes('@') &&
      formData.agreedToTerms
    );
  },
});

// === STORE COMBINADO PARA CHECKBOX ===
export type CheckboxExamplesStore = BasicCheckboxSlice &
  MultiCheckboxSlice &
  IndeterminateSlice &
  FormSlice & {
    // Utilidades globales
    clearAllCheckboxes: () => void;
    getCheckedCount: () => number;
    getIndeterminateState: () => boolean;
    selectAllInterests: () => void;
    selectAllSkills: () => void;
    deselectAllPreferences: () => void;
  };

// Store principal combinando todos los slices de CheckBox
export const useCheckboxExamplesStore = create<CheckboxExamplesStore>()(
  subscribeWithSelector((set, get) => ({
    ...createBasicCheckboxSlice(set, get, null as any),
    ...createMultiCheckboxSlice(set, get, null as any),
    ...createIndeterminateSlice(set, get, null as any),
    ...createFormSlice(set, get, null as any),

    // Utilidades globales
    clearAllCheckboxes: () => {
      set({
        acceptTerms: false,
        newsletter: false,
        notifications: false,
        marketing: false,
        interests: [],
        skills: [],
        languages: [],
        parentCheckbox: false,
        childCheckboxes: [false, false, false],
        formData: {
          name: '',
          email: '',
          preferences: [],
          subscriptions: [false, false, false],
          agreedToTerms: false,
        },
      });
    },

    getCheckedCount: () => {
      const state = get();
      let count = 0;

      // Contar checkboxes básicos
      if (state.acceptTerms) count++;
      if (state.newsletter) count++;
      if (state.notifications) count++;
      if (state.marketing) count++;

      // Contar arrays
      count += state.interests.length;
      count += state.skills.length;
      count += state.languages.length;

      // Contar childCheckboxes
      count += state.childCheckboxes.filter(Boolean).length;

      // Contar form subscriptions
      count += state.formData.subscriptions.filter(Boolean).length;
      if (state.formData.agreedToTerms) count++;

      return count;
    },

    getIndeterminateState: () => {
      const { childCheckboxes } = get();
      const checkedCount = childCheckboxes.filter(Boolean).length;
      return checkedCount > 0 && checkedCount < childCheckboxes.length;
    },

    selectAllInterests: () => {
      set({
        interests: [
          'web-development',
          'mobile-development',
          'data-science',
          'ai-ml',
          'devops',
        ],
      });
    },

    selectAllSkills: () => {
      set({
        skills: ['javascript', 'react', 'vue', 'angular', 'node', 'python'],
      });
    },

    deselectAllPreferences: () => {
      set({
        interests: [],
        skills: [],
        languages: [],
        newsletter: false,
        notifications: false,
        marketing: false,
      });
    },
  }))
);

// Hook de conveniencia para acceder a todos los slices de CheckBox
export const useCheckboxExamples = () => {
  return useCheckboxExamplesStore((state) => ({
    // Básicos
    acceptTerms: state.acceptTerms,
    newsletter: state.newsletter,
    notifications: state.notifications,
    marketing: state.marketing,
    setAcceptTerms: state.setAcceptTerms,
    setNewsletter: state.setNewsletter,
    setNotifications: state.setNotifications,
    setMarketing: state.setMarketing,
    clearBasicCheckboxes: state.clearBasicCheckboxes,

    // Múltiples
    interests: state.interests,
    skills: state.skills,
    languages: state.languages,
    setInterests: state.setInterests,
    setSkills: state.setSkills,
    setLanguages: state.setLanguages,
    clearMultiCheckboxes: state.clearMultiCheckboxes,

    // Indeterminados
    parentCheckbox: state.parentCheckbox,
    childCheckboxes: state.childCheckboxes,
    setParentCheckbox: state.setParentCheckbox,
    setChildCheckboxes: state.setChildCheckboxes,
    toggleChildCheckbox: state.toggleChildCheckbox,
    clearIndeterminateStates: state.clearIndeterminateStates,

    // Formulario
    formData: state.formData,
    setFormName: state.setFormName,
    setFormEmail: state.setFormEmail,
    setFormPreferences: state.setFormPreferences,
    setFormSubscriptions: state.setFormSubscriptions,
    setFormAgreedToTerms: state.setFormAgreedToTerms,
    clearFormData: state.clearFormData,
    isFormValid: state.isFormValid,

    // Utilidades
    clearAllCheckboxes: state.clearAllCheckboxes,
    getCheckedCount: state.getCheckedCount,
    getIndeterminateState: state.getIndeterminateState,
    selectAllInterests: state.selectAllInterests,
    selectAllSkills: state.selectAllSkills,
    deselectAllPreferences: state.deselectAllPreferences,
  }));
};

