import { create } from 'zustand';

interface FormFieldExamplesState {
  // Basic examples
  defaultField: string;
  labeledField: string;

  // Layout examples
  horizontalField: string;
  gridField: string;

  // Field type examples
  textareaField: string;
  dropdownField: string;

  // State examples
  requiredField: string;
  errorField: string;
  disabledField: string;

  // Advanced examples
  separatorField: string;

  // Setters
  setDefaultField: (value: string) => void;
  setLabeledField: (value: string) => void;
  setHorizontalField: (value: string) => void;
  setGridField: (value: string) => void;
  setTextareaField: (value: string) => void;
  setDropdownField: (value: string) => void;
  setRequiredField: (value: string) => void;
  setErrorField: (value: string) => void;
  setDisabledField: (value: string) => void;
  setSeparatorField: (value: string) => void;

  // Utility
  clearAllFormField: () => void;
}

export const useFormFieldExamples = create<FormFieldExamplesState>()((set) => ({
  // Basic examples
  defaultField: '',
  labeledField: '',

  // Layout examples
  horizontalField: '',
  gridField: '',

  // Field type examples
  textareaField: '',
  dropdownField: '',

  // State examples
  requiredField: '',
  errorField: '',
  disabledField: 'Cannot edit this field',

  // Advanced examples
  separatorField: '',

  // Setters
  setDefaultField: (value: string) => set({ defaultField: value }),
  setLabeledField: (value: string) => set({ labeledField: value }),
  setHorizontalField: (value: string) => set({ horizontalField: value }),
  setGridField: (value: string) => set({ gridField: value }),
  setTextareaField: (value: string) => set({ textareaField: value }),
  setDropdownField: (value: string) => set({ dropdownField: value }),
  setRequiredField: (value: string) => set({ requiredField: value }),
  setErrorField: (value: string) => set({ errorField: value }),
  setDisabledField: (value: string) => set({ disabledField: value }),
  setSeparatorField: (value: string) => set({ separatorField: value }),

  // Utility
  clearAllFormField: () =>
    set({
      defaultField: '',
      labeledField: '',
      horizontalField: '',
      gridField: '',
      textareaField: '',
      dropdownField: '',
      requiredField: '',
      errorField: '',
      disabledField: 'Cannot edit this field',
      separatorField: '',
    }),
}));

