import { create } from 'zustand';

// Ejemplo de store para inputs
interface InputStore {
  value: string;
  setValue: (value: string) => void;
  clearValue: () => void;
}

// Store de ejemplo
export const useInputStore = create<InputStore>((set) => ({
  value: '',
  setValue: (value) => set({ value }),
  clearValue: () => set({ value: '' }),
}));

// Función helper para registrar stores globalmente
export const registerStore = (name: string, store: any) => {
  if (typeof window !== 'undefined') {
    (window as any).__zustand_stores = {
      ...(window as any).__zustand_stores,
      [name]: store,
    };
  }
};

// Ejemplo de uso:
// registerStore('myInputStore', useInputStore);
// <Input $store="myInputStore" placeholder="Connected input" />

