// NUEVO ARCHIVO LIMPIO SOLO PATRÓN storeKey
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';
import { useTextAreaExamplesStore } from '../../../stores/textAreaExamples.store';

const meta: Meta<typeof TextArea> = {
  title: 'Atoms/TextArea',
  component: TextArea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default
export const Default: Story = {
  args: { placeholder: 'Escribe tu mensaje...' },
};

// 2. Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <TextArea placeholder="Default" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Destructive</label>
        <TextArea $variant="destructive" placeholder="Destructive" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Ghost</label>
        <TextArea $variant="ghost" placeholder="Ghost" />
      </div>
    </div>
  ),
};

// 3. Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <div>
        <label className="text-xs font-medium mb-1 block">Small</label>
        <TextArea $size="sm" placeholder="Small" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <TextArea placeholder="Default" />
      </div>
      <div>
        <label className="text-base font-medium mb-2 block">Large</label>
        <TextArea $size="lg" placeholder="Large" />
      </div>
    </div>
  ),
};

// 4. WithGradients
export const WithGradients: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[28rem]">
      <div>
        <label className="text-sm font-medium mb-2 block">Sunset</label>
        <TextArea
          placeholder="Sunset"
          $custom="border-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
          rows={3}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Ocean</label>
        <TextArea
          placeholder="Ocean"
          $custom="border-2 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
          rows={3}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Forest</label>
        <TextArea
          placeholder="Forest"
          $custom="border-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
          rows={3}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Cosmic</label>
        <TextArea
          placeholder="Cosmic"
          $custom="border-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
          rows={3}
        />
      </div>
    </div>
  ),
};

// 5. WithStoreKey (solo patrón storeKey + acciones programáticas via getState)
export const WithStoreKey: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm font-medium text-blue-800">StoreKey Pattern</p>
        <p className="text-xs text-blue-600 mt-1">Sin value/onChange manual.</p>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Mensaje</label>
        <TextArea
          $store={useTextAreaExamplesStore}
          storeKey="messageTextArea"
          placeholder="Mensaje..."
          rows={3}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Feedback</label>
        <TextArea
          $store={useTextAreaExamplesStore}
          storeKey="feedbackTextArea"
          placeholder="Feedback..."
          rows={4}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Descripción</label>
        <TextArea
          $store={useTextAreaExamplesStore}
          storeKey="descriptionTextArea"
          placeholder="Descripción del proyecto..."
          rows={5}
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() =>
            useTextAreaExamplesStore
              .getState()
              .setMessageTextArea('Mensaje precargado')
          }
          className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90">
          Set Mensaje
        </button>
        <button
          onClick={() =>
            useTextAreaExamplesStore
              .getState()
              .setFeedbackTextArea('Excelente experiencia.')
          }
          className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90">
          Set Feedback
        </button>
        <button
          onClick={() =>
            useTextAreaExamplesStore
              .getState()
              .setDescriptionTextArea(
                'Proyecto con componentes reutilizables y Tailwind.'
              )
          }
          className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90">
          Set Descripción
        </button>
        <button
          onClick={() => {
            const s = useTextAreaExamplesStore.getState();
            s.setMessageTextArea('');
            s.setFeedbackTextArea('');
            s.setDescriptionTextArea('');
          }}
          className="px-3 py-1 bg-muted text-muted-foreground rounded text-xs hover:bg-muted/80">
          Clear All
        </button>
      </div>
    </div>
  ),
};

// 6. CharacterCounter (solo storeKey en el limitado)
export const CharacterCounter: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <h3 className="text-lg font-semibold">Contador de caracteres</h3>
      <div>
        <label className="text-sm font-medium mb-2 block">Sin límite</label>
        <TextArea placeholder="Sin límite..." rows={3} />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Límite 120</label>
        <TextArea
          $maxCharacters={120}
          placeholder="Máx 120 caracteres..."
          $store={useTextAreaExamplesStore}
          storeKey="limitedTextArea"
          rows={4}
        />
      </div>
      <div className="p-4 bg-purple-50 rounded border border-purple-200 text-xs leading-relaxed">
        <p className="font-medium mb-1">Detalles:</p>
        <ul className="space-y-1">
          <li>• Contador aparece solo al definir $maxCharacters</li>
          <li>• Previene overflow y cambia estilo al exceder</li>
          <li>• Sin lecturas manuales del store</li>
        </ul>
      </div>
    </div>
  ),
};

// 7. SecurityFeatures
export const SecurityFeatures: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <h3 className="text-lg font-semibold">Seguridad</h3>
      <div>
        <label className="text-sm font-medium mb-2 block">Básico</label>
        <TextArea
          $security="form"
          $showSecurityWarnings
          placeholder="Intenta: <script> o ' OR 1=1"
          $store={useTextAreaExamplesStore}
          storeKey="securityBasicTextArea"
          rows={3}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Sanitización</label>
        <TextArea
          $security="form"
          $sanitizeOnChange
          placeholder="Se escapan caracteres peligrosos"
          $store={useTextAreaExamplesStore}
          storeKey="securitySanitizeTextArea"
          rows={3}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Bloqueo</label>
        <TextArea
          $security="comment"
          $blockUnsafeInput
          $showSecurityWarnings
          placeholder="Bloquea input inseguro"
          $store={useTextAreaExamplesStore}
          storeKey="securityBlockTextArea"
          rows={3}
        />
      </div>
      <div className="bg-red-50 border border-red-200 rounded p-4 text-xs leading-relaxed">
        <p className="font-medium mb-1">Protecciones:</p>
        <p>• Detección SQL / XSS • Sanitización • Bloqueo • Solo storeKey</p>
      </div>
    </div>
  ),
};

