import { create } from 'zustand';

export interface RadioButtonExamplesStore {
  variantDefault: string;
  variantDestructive: string;
  variantGhost: string;

  sizeSm: string;
  sizeDefault: string;
  sizeLg: string;

  preferences: string; // notification preferences
  method: string; // delivery method
  privacy: string; // privacy level

  frequency: string; // form example group
  delivery: string; // form example group

  stateNormal: string;
  stateChecked: string;
  stateDisabled: string;
  stateDisabledChecked: string;

  simple: string; // group for without labels

  setVariantDefault: (v: string) => void;
  setVariantDestructive: (v: string) => void;
  setVariantGhost: (v: string) => void;

  setSizeSm: (v: string) => void;
  setSizeDefault: (v: string) => void;
  setSizeLg: (v: string) => void;

  setPreferences: (v: string) => void;
  setMethod: (v: string) => void;
  setPrivacy: (v: string) => void;

  setFrequency: (v: string) => void;
  setDelivery: (v: string) => void;

  setStateNormal: (v: string) => void;
  setStateChecked: (v: string) => void;
  setStateDisabled: (v: string) => void;
  setStateDisabledChecked: (v: string) => void;

  setSimple: (v: string) => void;

  clearAllRadio: () => void;
}

export const useRadioButtonExamplesStore = create<RadioButtonExamplesStore>()(
  (set) => ({
    variantDefault: 'default',
    variantDestructive: 'destructive',
    variantGhost: 'ghost',

    sizeSm: 'small',
    sizeDefault: 'default',
    sizeLg: 'large',

    preferences: 'daily',
    method: 'email',
    privacy: 'friends',

    frequency: 'daily',
    delivery: 'email',

    stateNormal: 'normal',
    stateChecked: 'checked',
    stateDisabled: 'disabled',
    stateDisabledChecked: 'disabled-checked',

    simple: '3',

    setVariantDefault: (v) => set({ variantDefault: v }),
    setVariantDestructive: (v) => set({ variantDestructive: v }),
    setVariantGhost: (v) => set({ variantGhost: v }),

    setSizeSm: (v) => set({ sizeSm: v }),
    setSizeDefault: (v) => set({ sizeDefault: v }),
    setSizeLg: (v) => set({ sizeLg: v }),

    setPreferences: (v) => set({ preferences: v }),
    setMethod: (v) => set({ method: v }),
    setPrivacy: (v) => set({ privacy: v }),

    setFrequency: (v) => set({ frequency: v }),
    setDelivery: (v) => set({ delivery: v }),

    setStateNormal: (v) => set({ stateNormal: v }),
    setStateChecked: (v) => set({ stateChecked: v }),
    setStateDisabled: (v) => set({ stateDisabled: v }),
    setStateDisabledChecked: (v) => set({ stateDisabledChecked: v }),

    setSimple: (v) => set({ simple: v }),

    clearAllRadio: () =>
      set({
        variantDefault: 'default',
        variantDestructive: 'destructive',
        variantGhost: 'ghost',
        sizeSm: 'small',
        sizeDefault: 'default',
        sizeLg: 'large',
        preferences: 'daily',
        method: 'email',
        privacy: 'friends',
        frequency: 'daily',
        delivery: 'email',
        stateNormal: 'normal',
        stateChecked: 'checked',
        stateDisabled: 'disabled',
        stateDisabledChecked: 'disabled-checked',
        simple: '3',
      }),
  })
);

