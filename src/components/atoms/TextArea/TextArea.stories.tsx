import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';
import {
  useTextAreaExamples,
  useTextAreaExamplesStore,
} from '../../../stores/textAreaExamples.store';

const meta: Meta<typeof TextArea> = {
  title: 'Atoms/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <TextArea placeholder="Default textarea" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Destructive</label>
        <TextArea $variant="destructive" placeholder="Error textarea" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Ghost</label>
        <TextArea $variant="ghost" placeholder="Ghost textarea" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <div>
        <label className="text-sm font-medium mb-2 block">Small</label>
        <TextArea $size="sm" placeholder="Small textarea" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <TextArea placeholder="Default textarea" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Large</label>
        <TextArea $size="lg" placeholder="Large textarea" />
      </div>
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 w-96">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Sunset Gradient Border
        </label>
        <TextArea
          placeholder="Sunset textarea"
          $custom="border-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Ocean Gradient Border
        </label>
        <TextArea
          placeholder="Ocean textarea"
          $custom="border-2 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Forest Gradient Border
        </label>
        <TextArea
          placeholder="Forest textarea"
          $custom="border-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
        />
      </div>
    </div>
  ),
};

export const WithStoreKey: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4 w-96">
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-800">
            Patrón StoreKey - TextArea con conexión automática
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Los componentes se conectan automáticamente usando $store y storeKey
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Mensaje con storeKey
          </label>
          <TextArea
            $store={useTextAreaExamplesStore}
            storeKey="messageTextArea"
            placeholder="Escribe tu mensaje aquí..."
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Feedback con storeKey
          </label>
          <TextArea
            $store={useTextAreaExamplesStore}
            storeKey="feedbackTextArea"
            placeholder="Comparte tu feedback..."
            rows={4}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Descripción con storeKey
          </label>
          <TextArea
            $store={useTextAreaExamplesStore}
            storeKey="descriptionTextArea"
            placeholder="Describe el proyecto..."
            rows={5}
          />
        </div>

        <TextAreaStoreValues />

        <TextAreaStoreActions />
      </div>
    );
  },
};

// Componente auxiliar para mostrar valores
const TextAreaStoreValues = () => {
  const { messageTextArea, feedbackTextArea, descriptionTextArea } =
    useTextAreaExamples();

  return (
    <div className="p-3 bg-muted rounded-md">
      <p className="text-sm font-medium mb-2">Valores del Store (storeKey):</p>
      <div className="space-y-2 text-xs">
        <div>
          <strong>Mensaje:</strong>
          <div className="bg-white p-2 rounded border text-xs mt-1">
            {messageTextArea || '(vacío)'}
          </div>
        </div>
        <div>
          <strong>Feedback:</strong>
          <div className="bg-white p-2 rounded border text-xs mt-1">
            {feedbackTextArea || '(vacío)'}
          </div>
        </div>
        <div>
          <strong>Descripción:</strong>
          <div className="bg-white p-2 rounded border text-xs mt-1">
            {descriptionTextArea || '(vacío)'}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para acciones
const TextAreaStoreActions = () => {
  const { setMessageTextArea, setFeedbackTextArea, setDescriptionTextArea } =
    useTextAreaExamples();

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() =>
          setMessageTextArea('Hola! Este es un mensaje de ejemplo.')
        }
        className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
        Set Mensaje
      </button>
      <button
        onClick={() =>
          setFeedbackTextArea('Excelente componente, muy fácil de usar.')
        }
        className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
        Set Feedback
      </button>
      <button
        onClick={() =>
          setDescriptionTextArea(
            'Este proyecto implementa un sistema de componentes usando React, TypeScript y Tailwind CSS.'
          )
        }
        className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
        Set Descripción
      </button>
      <button
        onClick={() => {
          setMessageTextArea('');
          setFeedbackTextArea('');
          setDescriptionTextArea('');
        }}
        className="px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-muted/80">
        Clear All
      </button>
    </div>
  );
};

export const AdvancedFeatures: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Funcionalidades Avanzadas con StoreKey
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Con resize habilitado
          </label>
          <TextArea
            $isResize={true}
            placeholder="Puedes cambiar el tamaño vertical..."
            $store={useTextAreaExamplesStore}
            storeKey="basicTextArea"
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Arrastra la esquina inferior derecha para redimensionar
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Auto-sizing (se ajusta al contenido)
          </label>
          <TextArea
            $isAutoSizing={true}
            placeholder="Escribe varias líneas y mira cómo se ajusta..."
            $store={useTextAreaExamplesStore}
            storeKey="autoSizeTextArea"
          />
          <p className="text-xs text-muted-foreground mt-1">
            La altura se ajusta automáticamente al contenido
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Altura personalizada (200px)
          </label>
          <TextArea
            $height="200px"
            placeholder="Este textarea tiene una altura fija de 200px..."
            $store={useTextAreaExamplesStore}
            storeKey="customHeightTextArea"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Altura fija definida con $height
          </p>
        </div>
      </div>

      <AdvancedFeaturesValues />
    </div>
  ),
};

// Componente auxiliar para mostrar valores de características avanzadas
const AdvancedFeaturesValues = () => {
  const { basicTextArea, autoSizeTextArea, customHeightTextArea } =
    useTextAreaExamples();

  return (
    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
      <p className="text-xs font-medium mb-2">📝 Contenido en el store:</p>
      <div className="space-y-2 text-xs">
        <div>
          <strong>Resize:</strong> {basicTextArea.length} caracteres
        </div>
        <div>
          <strong>Auto-size:</strong> {autoSizeTextArea.length} caracteres
        </div>
        <div>
          <strong>Custom height:</strong> {customHeightTextArea.length}{' '}
          caracteres
        </div>
      </div>
    </div>
  );
};

export const CharacterCounter: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Contador de Caracteres con StoreKey
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Sin límite de caracteres
          </label>
          <TextArea placeholder="Este textarea no tiene límite..." rows={3} />
          <p className="text-xs text-muted-foreground mt-1">
            Sin contador ni restricciones
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Límite de 100 caracteres
          </label>
          <TextArea
            $maxCharacters={100}
            placeholder="Máximo 100 caracteres..."
            $store={useTextAreaExamplesStore}
            storeKey="limitedTextArea"
            rows={4}
          />
          <p className="text-xs text-muted-foreground mt-1">
            El contador aparece automáticamente usando storeKey
          </p>
        </div>
      </div>

      <CharacterCounterValues />

      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
        <p className="text-xs font-medium mb-1">
          🔢 Características del contador con storeKey:
        </p>
        <ul className="text-xs text-purple-700 space-y-1">
          <li>• Conexión automática al store con $store y storeKey</li>
          <li>• Aparece automáticamente cuando se define $maxCharacters</li>
          <li>• Previene escritura más allá del límite</li>
          <li>• Cambia a rojo cuando se excede (visual)</li>
          <li>• Usa fuente tabular para evitar saltos</li>
        </ul>
      </div>
    </div>
  ),
};

// Componente auxiliar para mostrar valores del contador
const CharacterCounterValues = () => {
  const { limitedTextArea } = useTextAreaExamples();

  return (
    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
      <p className="text-xs font-medium mb-2">
        📊 Valores actuales en el store:
      </p>
      <div className="space-y-1 text-xs">
        <div>
          <strong>Limitado (100):</strong> {limitedTextArea.length}/100
          caracteres
        </div>
        <div className="bg-white p-2 rounded border text-xs mt-1">
          "{limitedTextArea}"
        </div>
      </div>
    </div>
  );
};

export const SecurityFeatures: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          🔒 Funcionalidades de Seguridad con StoreKey
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Protección automática usando patrón storeKey
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Seguridad básica (mostrar advertencias)
          </label>
          <TextArea
            $security="form"
            $showSecurityWarnings={true}
            placeholder="Intenta escribir: &lt;script&gt; o ' OR 1=1"
            $store={useTextAreaExamplesStore}
            storeKey="securityBasicTextArea"
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Detecta patrones SQL y XSS, muestra advertencias
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Sanitización automática
          </label>
          <TextArea
            $security="form"
            $sanitizeOnChange={true}
            placeholder="Los caracteres peligrosos se escapan automáticamente"
            $store={useTextAreaExamplesStore}
            storeKey="securitySanitizeTextArea"
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Limpia el input automáticamente al escribir usando storeKey
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Bloqueo de input inseguro
          </label>
          <TextArea
            $security="comment"
            $blockUnsafeInput={true}
            $showSecurityWarnings={true}
            placeholder="Intenta escribir caracteres peligrosos"
            $store={useTextAreaExamplesStore}
            storeKey="securityBlockTextArea"
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Bloquea completamente el input inseguro
          </p>
        </div>
      </div>

      <SecurityTextAreaValues />

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-xs font-medium mb-2">
          🛡️ Protecciones implementadas con storeKey:
        </p>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>• Conexión automática al store sin props value/onChange</p>
          <p>• Detección de inyecciones SQL</p>
          <p>• Prevención de ataques XSS</p>
          <p>• Sanitización automática de caracteres</p>
          <p>• Validación en tiempo real</p>
          <p>• Presets de seguridad predefinidos</p>
        </div>
      </div>
    </div>
  ),
};

// Componente auxiliar para mostrar valores de seguridad
const SecurityTextAreaValues = () => {
  const {
    securityBasicTextArea,
    securitySanitizeTextArea,
    securityBlockTextArea,
  } = useTextAreaExamples();

  return (
    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
      <p className="text-xs font-medium mb-2">
        🔍 Valores en el store (seguridad):
      </p>
      <div className="space-y-2 text-xs">
        <div>
          <strong>Básico:</strong>
          <div className="bg-white p-2 rounded border text-xs mt-1">
            "{securityBasicTextArea}"
          </div>
        </div>
        <div>
          <strong>Sanitizado:</strong>
          <div className="bg-white p-2 rounded border text-xs mt-1">
            "{securitySanitizeTextArea}"
          </div>
        </div>
        <div>
          <strong>Bloqueado:</strong>
          <div className="bg-white p-2 rounded border text-xs mt-1">
            "{securityBlockTextArea}"
          </div>
        </div>
      </div>
    </div>
  );
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <label className="text-sm font-medium mb-2 block">Normal</label>
        <TextArea placeholder="Textarea normal" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Con contenido</label>
        <TextArea value="Este textarea tiene contenido inicial que puede ser editado por el usuario." />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Deshabilitado</label>
        <TextArea disabled placeholder="Este textarea está deshabilitado" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Solo lectura</label>
        <TextArea
          readOnly
          value="Este contenido es de solo lectura y no puede ser modificado."
        />
      </div>
    </div>
  ),
};

