# Store de Ejemplos para Storybook

Este documento explica cómo funciona el store centralizado con slices de Zustand para los ejemplos de Input y TextArea en Storybook.

## Estructura del Store

El store está ubicado en `/src/stores/examplesStore.ts` y utiliza el patrón de slices para organizar el estado:

```typescript
// Store principal que combina ambos slices
useExamplesStore = InputExamplesSlice & TextAreaExamplesSlice;

// Hooks de conveniencia para acceder a slices específicos
useInputExamples(); // Solo para Input examples
useTextAreaExamples(); // Solo para TextArea examples
```

## Input Examples Slice

El slice de Input contiene estado para diferentes tipos de ejemplos:

### Estados Básicos

- `basicInput` - Input básico sin configuraciones especiales
- `emailInput` - Input para email
- `passwordInput` - Input para contraseña
- `searchInput` - Input para búsqueda

### Estados con Límites de Caracteres

- `limitedInput` - Input con límite normal
- `shortLimitInput` - Input con límite corto (para demostrar validación)
- `emailLimitInput` - Input email con límite

### Estados con Seguridad

- `securityBasicInput` - Input con seguridad básica
- `securitySanitizeInput` - Input con sanitización
- `securityBlockInput` - Input con bloqueo estricto
- `securityCriticalInput` - Input para datos críticos

### Estados con Store Key Pattern

- `nameInput` - Para demostrar manejo de nombres
- `usernameInput` - Para demostrar manejo de usernames

## TextArea Examples Slice

El slice de TextArea contiene estado para funcionalidades avanzadas:

### Estados Básicos

- `basicTextArea` - TextArea básico
- `largeTextArea` - TextArea para contenido extenso
- `ghostTextArea` - TextArea con variante ghost

### Estados con Funcionalidades Avanzadas

- `autoSizeTextArea` - TextArea con auto-sizing
- `customHeightTextArea` - TextArea con altura personalizada
- `limitedTextArea` - TextArea con límite de caracteres

### Estados con Seguridad

- `securityBasicTextArea` - TextArea con seguridad básica
- `securitySanitizeTextArea` - TextArea con sanitización
- `securityBlockTextArea` - TextArea con bloqueo estricto
- `securityCommentTextArea` - TextArea optimizado para comentarios

### Estados con Store Key Pattern

- `messageTextArea` - Para mensajes
- `feedbackTextArea` - Para feedback (con contenido inicial)
- `descriptionTextArea` - Para descripciones

## Uso en Storybook

### 1. Importar el Store

```typescript
import {
  useInputExamples,
  useTextAreaExamples,
  useExamplesStore,
} from '../../../stores/examplesStore';
```

### 2. Usar en Input Stories

```typescript
export const ExampleStory: Story = {
  render: () => {
    const {
      basicInput,
      setBasicInput,
      emailInput,
      setEmailInput,
    } = useInputExamples();

    return (
      <div>
        <Input
          value={basicInput}
          onChange={(e) => setBasicInput(e.target.value)}
          placeholder="Input básico"
        />
        <Input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Email input"
        />
      </div>
    );
  },
};
```

### 3. Usar en TextArea Stories

```typescript
export const ExampleStory: Story = {
  render: () => {
    const {
      messageTextArea,
      setMessageTextArea,
      autoSizeTextArea,
      setAutoSizeTextArea,
    } = useTextAreaExamples();

    return (
      <div>
        <TextArea
          value={messageTextArea}
          onChange={(e) => setMessageTextArea(e.target.value)}
          placeholder="Mensaje"
        />
        <TextArea
          $isAutoSizing
          value={autoSizeTextArea}
          onChange={(e) => setAutoSizeTextArea(e.target.value)}
          placeholder="Auto-sizing textarea"
        />
      </div>
    );
  },
};
```

### 4. Mostrar Estadísticas del Store

```typescript
export const StoreStats: Story = {
  render: () => {
    const { getInputCount, getTextAreaCount } = useExamplesStore();

    return (
      <div>
        <p>Inputs activos: {getInputCount()}</p>
        <p>TextAreas activos: {getTextAreaCount()}</p>
      </div>
    );
  },
};
```

## Utilidades del Store

### Contadores

- `getInputCount()` - Cuenta cuántos inputs tienen contenido
- `getTextAreaCount()` - Cuenta cuántos textareas tienen contenido

### Limpieza

- `clearAllInputs()` - Limpia todos los estados de input
- `clearAllTextAreas()` - Limpia todos los estados de textarea

## Ventajas de Este Enfoque

1. **Estado Centralizado**: Todos los ejemplos comparten un store común
2. **Persistencia**: Los valores se mantienen al navegar entre stories
3. **Sincronización**: Los cambios en un story se reflejan en otros
4. **Organización**: Uso de slices para separar concerns
5. **Hooks de Conveniencia**: Acceso fácil a subconjuntos del estado
6. **TypeScript**: Tipado completo y autocompletado
7. **Escalabilidad**: Fácil agregar nuevos estados o funcionalidades

## Contenido Inicial

Algunos campos tienen contenido inicial para demostrar funcionalidades:

- `feedbackTextArea`: "Comentario inicial para mostrar funcionalidad..."

Esto permite mostrar inmediatamente cómo funcionan las características como contadores de caracteres, etc.

## Middleware

El store utiliza `subscribeWithSelector` de Zustand para permitir suscripciones granulares a cambios específicos del estado, lo que puede ser útil para funcionalidades avanzadas en el futuro.

