import type { Meta, StoryObj } from '@storybook/react';
import { create } from 'zustand';
import { Input } from './Input';
import { useInputStore } from '../../../stores/example';

// Store simple para demostrar el patrón storeKey
interface DemoFormStore {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
}

const useDemoFormStore = create<DemoFormStore>()((set) => ({
  name: '',
  email: '',
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
}));

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <Input placeholder="Default input" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Destructive</label>
        <Input $variant="destructive" placeholder="Error input" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Ghost</label>
        <Input $variant="ghost" placeholder="Ghost input" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="w-60">
        <label className="text-xs font-medium mb-1 block">Small</label>
        <Input $size="sm" placeholder="Small input" />
      </div>
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">Default</label>
        <Input placeholder="Default input" />
      </div>
      <div className="w-96">
        <label className="text-base font-medium mb-2 block">Large</label>
        <Input $size="lg" placeholder="Large input" />
      </div>
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-96">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Sunset Gradient Border
        </label>
        <Input
          placeholder="Sunset input"
          $custom="border-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Ocean Gradient Border
        </label>
        <Input
          placeholder="Ocean input"
          $custom="border-2 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Forest Gradient Border
        </label>
        <Input
          placeholder="Forest input"
          $custom="border-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Cosmic Gradient Border
        </label>
        <Input
          placeholder="Cosmic input"
          $custom="border-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
        />
      </div>
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-96">
      <div>
        <label className="text-sm font-medium mb-2 block">Email</label>
        <Input type="email" placeholder="email@example.com" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Password</label>
        <Input type="password" placeholder="Enter password" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Number</label>
        <Input type="number" placeholder="Enter number" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Search</label>
        <Input type="search" placeholder="Search..." />
      </div>
    </div>
  ),
};

export const WithZustandStore: Story = {
  render: () => {
    const StoreExample = () => {
      const value = useInputStore((state) => state.value);
      const setValue = useInputStore((state) => state.setValue);

      return (
        <div className="flex flex-col gap-4 w-80">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Input with Zustand Store
            </label>
            <Input
              $storeString="exampleInputStore"
              placeholder="Type something..."
            />
          </div>
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm font-medium mb-1">Store Value:</p>
            <code className="text-xs">{value || '(empty)'}</code>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setValue('Hello World!')}
              className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
              Set "Hello World!"
            </button>
            <button
              onClick={() => setValue('')}
              className="px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-muted/80">
              Clear
            </button>
          </div>
        </div>
      );
    };

    return <StoreExample />;
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <label className="text-sm font-medium mb-2 block">Normal</label>
        <Input placeholder="Normal state" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Disabled</label>
        <Input placeholder="Disabled state" disabled />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">With Value</label>
        <Input value="Pre-filled value" readOnly />
      </div>
    </div>
  ),
};

export const WithStoreKey: Story = {
  render: () => {
    const StoreKeyExample = () => {
      const formData = useDemoFormStore();

      return (
        <div className="flex flex-col gap-4 w-80">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Input with storeKey Pattern (New)
            </label>
            <Input
              $store={useDemoFormStore}
              storeKey="name"
              placeholder="Type your name..."
            />
          </div>
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm font-medium mb-1">Store Value (name):</p>
            <code className="text-xs">{formData.name || '(empty)'}</code>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => formData.setName('John Doe')}
              className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
              Set "John Doe"
            </button>
            <button
              onClick={() => formData.setName('')}
              className="px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-muted/80">
              Clear
            </button>
          </div>
        </div>
      );
    };

    return <StoreKeyExample />;
  },
};

