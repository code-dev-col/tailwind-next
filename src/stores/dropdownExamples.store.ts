import { create } from 'zustand';

export interface DropdownExamplesStore {
  defaultDropdown: string;

  variantDefault: string;
  variantDestructive: string;
  variantGhost: string;

  sizeSm: string;
  sizeDefault: string;
  sizeLg: string;

  country: string;

  formCountry: string;
  formLanguage: string;
  formTimezone: string;

  stateNormal: string;
  stateSelected: string;
  stateDisabled: string;
  stateWithDisabledOptions: string;

  setDefaultDropdown: (v: string) => void;

  setVariantDefault: (v: string) => void;
  setVariantDestructive: (v: string) => void;
  setVariantGhost: (v: string) => void;

  setSizeSm: (v: string) => void;
  setSizeDefault: (v: string) => void;
  setSizeLg: (v: string) => void;

  setCountry: (v: string) => void;

  setFormCountry: (v: string) => void;
  setFormLanguage: (v: string) => void;
  setFormTimezone: (v: string) => void;

  setStateNormal: (v: string) => void;
  setStateSelected: (v: string) => void;
  setStateDisabled: (v: string) => void;
  setStateWithDisabledOptions: (v: string) => void;

  clearAllDropdowns: () => void;
}

export const useDropdownExamplesStore = create<DropdownExamplesStore>()(
  (set) => ({
    defaultDropdown: '',

    variantDefault: '',
    variantDestructive: '',
    variantGhost: '',

    sizeSm: '',
    sizeDefault: '',
    sizeLg: '',

    country: '',

    formCountry: '',
    formLanguage: '',
    formTimezone: '',

    stateNormal: '',
    stateSelected: 'option2',
    stateDisabled: '',
    stateWithDisabledOptions: '',

    setDefaultDropdown: (v) => set({ defaultDropdown: v }),

    setVariantDefault: (v) => set({ variantDefault: v }),
    setVariantDestructive: (v) => set({ variantDestructive: v }),
    setVariantGhost: (v) => set({ variantGhost: v }),

    setSizeSm: (v) => set({ sizeSm: v }),
    setSizeDefault: (v) => set({ sizeDefault: v }),
    setSizeLg: (v) => set({ sizeLg: v }),

    setCountry: (v) => set({ country: v }),

    setFormCountry: (v) => set({ formCountry: v }),
    setFormLanguage: (v) => set({ formLanguage: v }),
    setFormTimezone: (v) => set({ formTimezone: v }),

    setStateNormal: (v) => set({ stateNormal: v }),
    setStateSelected: (v) => set({ stateSelected: v }),
    setStateDisabled: (v) => set({ stateDisabled: v }),
    setStateWithDisabledOptions: (v) => set({ stateWithDisabledOptions: v }),

    clearAllDropdowns: () =>
      set({
        defaultDropdown: '',
        variantDefault: '',
        variantDestructive: '',
        variantGhost: '',
        sizeSm: '',
        sizeDefault: '',
        sizeLg: '',
        country: '',
        formCountry: '',
        formLanguage: '',
        formTimezone: '',
        stateNormal: '',
        stateSelected: 'option2',
        stateDisabled: '',
        stateWithDisabledOptions: '',
      }),
  })
);

