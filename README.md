# @code-dev-col/tailwind-next

Una librería moderna de componentes para React construida con **Tailwind CSS v4**, **TypeScript** y **Atomic Design**. Incluye sistema de props con prefijo `$`, gestión de estado con **Zustand**, gradientes predefinidos y compatibilidad total con **shadcn/ui**.

## ✨ Características

- 🎨 **18+ Componentes** con Tailwind CSS v4 y design system completo
- 📚 **Storybook v8.6** integrado con documentación automática
- 🔧 **TypeScript completo** con tipado robusto y `forwardRef`
- ⚡ **Build optimizado** con tsup (ESM/CJS/DTS)
- 🎯 **Props personalizables** con prefijo `$` para evitar conflictos
- 🎭 **Sistema de variantes** compatible con shadcn/ui
- 🌗 **Soporte completo** para modo oscuro y multi-brand theming
- 🔄 **Gestión de estado** integrada con Zustand y patrón storeKey
- 🛡️ **Seguridad** con sanitización automática en inputs
- 🎨 **40+ Gradientes** predefinidos por categorías
- 🏗️ **Atomic Design** con arquitectura escalable

## 🚀 Instalación

```bash
npm install @code-dev-col/tailwind-next
# o
pnpm add @code-dev-col/tailwind-next
# o
yarn add @code-dev-col/tailwind-next
```

## 📖 Setup Básico

### 1. CSS (globals.css)

```css
/* Importar Tailwind y tokens de la librería */
@import 'tailwindcss';
@import '@code-dev-col/tailwind-next/dist/theme.css';

/* Personalización opcional con @theme (Tailwind v4) */
@theme {
  --color-primary: hsl(210 90% 50%);
  --color-secondary: hsl(280 75% 60%);
}
```

### 2. Uso en componentes

```tsx
import {
  Button,
  Input,
  CheckBox,
  Dropdown,
  Badge,
} from '@code-dev-col/tailwind-next';

function App() {
  return (
    <div className="p-6 space-y-4">
      {/* Buttons con variantes */}
      <div className="flex gap-2">
        <Button>Primary</Button>
        <Button $variant="secondary">Secondary</Button>
        <Button $variant="destructive">Delete</Button>
        <Button $variant="outline">Cancel</Button>
      </div>

      {/* Input con seguridad integrada */}
      <Input
        placeholder="Email seguro..."
        $security="form"
        $showSecurityWarnings
      />

      {/* CheckBox con gestión de estado */}
      <CheckBox
        label="Términos y condiciones"
        description="Acepto los términos del servicio"
      />

      {/* Componente con gradiente personalizado */}
      <Button $custom="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        Gradiente Custom
      </Button>
    </div>
  );
}
```

## 🧩 Componentes Disponibles

### Atoms (Elementos Básicos)

| Componente      | Descripción             | Características                     |
| --------------- | ----------------------- | ----------------------------------- |
| **Button**      | Botón interactivo       | 6 variantes, 4 tamaños, iconos      |
| **Input**       | Campo de texto          | Seguridad, validación, sanitización |
| **TextArea**    | Área de texto           | Redimensionable, conteo caracteres  |
| **CheckBox**    | Casilla de verificación | Estados, indeterminado, grupos      |
| **RadioButton** | Botón de radio          | Grupos, validación                  |
| **Dropdown**    | Lista desplegable       | Búsqueda, multi-selección           |
| **Badge**       | Etiqueta/insignia       | Colores, tamaños, iconos            |
| **Avatar**      | Imagen de perfil        | Fallbacks, tamaños, iniciales       |
| **Icon**        | Iconos                  | react-icons, tamaños                |
| **Label**       | Etiqueta de formulario  | Asociación automática               |
| **Separator**   | Separador visual        | Horizontal/vertical                 |
| **Skeleton**    | Carga placeholder       | Animaciones, formas                 |
| **Text**        | Texto semántico         | h1-h6, p, span, strong              |

### Layout (Diseño)

| Componente    | Descripción         | Características              |
| ------------- | ------------------- | ---------------------------- |
| **Container** | Contenedor flexible | Flexbox, grid, responsive    |
| **Grid**      | Sistema de grillas  | CSS Grid, responsive         |
| **GridAreas** | Grid con áreas      | Template areas, responsive   |
| **Center**    | Centrado perfecto   | Flexbox, absolute, transform |

### 🎨 Sistema de Props con `$`

```tsx
// ✅ Props de la librería (con $)
<Button $variant="primary" $size="lg" $custom="shadow-xl">

// ✅ Props nativas de HTML (sin $)
<Button onClick={handleClick} disabled type="submit">

// ✅ Combinación perfecta
<Input
  $variant="outline"
  $security="form"
  placeholder="Email..."
  value={email}
  onChange={setEmail}
/>
```

**¿Por qué usar `$`?**

- Evita conflictos con props nativas HTML
- Claridad visual para identificar props de la librería
- Consistencia en toda la API
- Compatibilidad con frameworks

## 🎨 Personalización y Theming

### Tailwind CSS v4 con @theme

La librería utiliza **Tailwind CSS v4** con el patrón `@theme` para generar clases automáticamente:

```css
/* En tu globals.css */
@import 'tailwindcss';
@import '@code-dev-col/tailwind-next/dist/theme.css';

/* Personalización con @theme (genera bg-primary, text-primary, etc.) */
@theme {
  --color-primary: hsl(210 90% 50%); /* Azul corporativo */
  --color-secondary: hsl(280 75% 60%); /* Púrpura creativo */
  --color-accent: hsl(45 90% 55%); /* Amarillo vibrante */
}

/* Gradientes personalizados */
:root {
  --gradient-brand: linear-gradient(
    90deg,
    hsl(210 90% 50%) 0%,
    hsl(280 75% 60%) 100%
  );
}
```

### Multi-Brand Theming

```css
/* Temas de marca dinámicos */
[data-brand='corporate'] {
  --primary: 214 95% 52%;
  --secondary: 214 50% 75%;
}

[data-brand='creative'] {
  --primary: 280 85% 60%;
  --secondary: 45 90% 55%;
}
```

### Modo Oscuro con next-themes

```tsx
import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
}
```

**📖 [Ver Guía Completa de Theming](./docs/theming-nextjs.md)** - Setup completo para Next.js, multi-brand, dark mode y mejores prácticas.

## 🔄 Gestión de Estado con Zustand

### Patrón storeKey (Recomendado)

```tsx
import { create } from 'zustand';
import { Input, CheckBox } from '@code-dev-col/tailwind-next';

// 1. Crear store
const useFormStore = create((set) => ({
  email: '',
  newsletter: false,
  setEmail: (email) => set({ email }),
  setNewsletter: (newsletter) => set({ newsletter }),
}));

// 2. Usar con storeKey
function MyForm() {
  return (
    <div>
      <Input $store={useFormStore} storeKey="email" placeholder="Email..." />
      <CheckBox
        $store={useFormStore}
        storeKey="newsletter"
        label="Suscribirse al newsletter"
      />
    </div>
  );
}
```

### Componentes con estado integrado

- **Input**: Sincronización automática con stores
- **TextArea**: Conteo de caracteres, validación
- **CheckBox**: Grupos, arrays, boolean
- **RadioButton**: Grupos exclusivos
- **Dropdown**: Multi-selección, búsqueda

## 🛡️ Seguridad Integrada

### Sanitización automática

```tsx
<Input
  $security="form"              // Sanitización básica
  $showSecurityWarnings         // Mostrar advertencias
  $sanitizeOnChange            // Sanitizar en tiempo real
  placeholder="Entrada segura..."
/>

<TextArea
  $security="strict"           // Sanitización estricta
  $maxLength={500}            // Límite de caracteres
/>
```

### Opciones de seguridad

- `form`: Sanitización para formularios
- `strict`: Sanitización estricta (solo texto)
- `html`: Permite HTML básico (limitado)
- `none`: Sin sanitización

## 🎨 Sistema de Gradientes

### 40+ Gradientes predefinidos

```tsx
import { useGradient, getRandomGradient } from '@code-dev-col/tailwind-next';

function GradientExample() {
  const { getGradient } = useGradient();

  return <Button $custom={getGradient('sunset-warm')}>Sunset Button</Button>;
}

// Gradiente aleatorio por categoría
const { key, classes } = getRandomGradient({ startsWith: 'ocean' });
```

### Categorías disponibles

- **sunset**: Cálidos naranjas/rojos
- **ocean**: Azules/turquesas
- **forest**: Verdes naturales
- **cosmic**: Púrpuras/magentas
- **minimal**: Grises/neutros
- **vibrant**: Colores intensos

## � Ejemplos Prácticos

### Formulario completo con estado

```tsx
import { create } from 'zustand';
import {
  Button,
  Input,
  TextArea,
  CheckBox,
  Dropdown,
} from '@code-dev-col/tailwind-next';

const useContactStore = create((set) => ({
  name: '',
  email: '',
  message: '',
  newsletter: false,
  priority: '',
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setMessage: (message) => set({ message }),
  setNewsletter: (newsletter) => set({ newsletter }),
  setPriority: (priority) => set({ priority }),
}));

function ContactForm() {
  return (
    <form className="space-y-4 max-w-md">
      <Input
        $store={useContactStore}
        storeKey="name"
        placeholder="Nombre completo"
        $security="form"
      />

      <Input
        $store={useContactStore}
        storeKey="email"
        type="email"
        placeholder="Email"
        $security="form"
        $showSecurityWarnings
      />

      <Dropdown
        $store={useContactStore}
        storeKey="priority"
        placeholder="Prioridad"
        options={[
          { value: 'low', label: 'Baja' },
          { value: 'medium', label: 'Media' },
          { value: 'high', label: 'Alta' },
        ]}
      />

      <TextArea
        $store={useContactStore}
        storeKey="message"
        placeholder="Mensaje..."
        $maxLength={500}
        $security="form"
      />

      <CheckBox
        $store={useContactStore}
        storeKey="newsletter"
        label="Suscribirse al newsletter"
        description="Recibir actualizaciones y ofertas"
      />

      <Button type="submit" className="w-full">
        Enviar Mensaje
      </Button>
    </form>
  );
}
```

### Dashboard con gradientes

```tsx
function Dashboard() {
  return (
    <Container $display="grid" $custom="grid-cols-1 md:grid-cols-3 gap-6">
      <Container $custom="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg">
        <Text $element="h3" $weight="semibold">
          Ventas
        </Text>
        <Text $element="p" $custom="text-2xl font-bold text-blue-600">
          $24,500
        </Text>
      </Container>

      <Container $custom="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-lg">
        <Text $element="h3" $weight="semibold">
          Usuarios
        </Text>
        <Text $element="p" $custom="text-2xl font-bold text-green-600">
          1,245
        </Text>
      </Container>

      <Container $custom="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-lg">
        <Text $element="h3" $weight="semibold">
          Conversión
        </Text>
        <Text $element="p" $custom="text-2xl font-bold text-purple-600">
          3.2%
        </Text>
      </Container>
    </Container>
  );
}
```

## 📚 Documentación Completa

### 📖 Guías Principales

- **[🎨 Theming para Next.js](./docs/theming-nextjs.md)** - Setup completo, multi-brand, dark mode
- **[🏗️ Instrucciones de Desarrollo](/.github/instructions/tailwind-next.instructions.md)** - Patrones, estándares y arquitectura

### 🔧 Desarrollo Local

#### Prerrequisitos

- Node.js 18+
- npm/pnpm/yarn

#### Scripts disponibles

```bash
# Instalar dependencias
npm install

# Ejecutar Storybook (desarrollo)
npm run storybook

# Construir la librería
npm run build

# Construir Storybook (producción)
npm run build-storybook
```

#### Arquitectura del proyecto

```text
src/
├── components/
│   ├── atoms/                      # Elementos básicos
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── CheckBox/
│   │   └── ...
│   ├── molecules/                  # Combinaciones (futuro)
│   └── organisms/                  # Grupos complejos (futuro)
├── utils/
│   ├── cn.ts                       # Merge de clases
│   ├── gradients.ts               # Sistema de gradientes
│   └── useSecureField.ts          # Hook de seguridad
├── stores/                         # Stores de ejemplo
├── styles/
│   ├── global.css                 # Estilos para Storybook
│   └── theme.css                  # Tokens distribuibles
├── types.ts                       # Tipos globales
└── index.ts                       # Exportaciones principales
```

## 📚 Storybook Interactivo

Para explorar todos los componentes:

```bash
npm run storybook
```

Abre `http://localhost:6006` para:

- **Ver todas las variantes** de cada componente
- **Interactuar con controles** en tiempo real
- **Probar diferentes configuraciones**
- **Ver documentación automática**
- **Copiar código de ejemplos**

## 🎯 Filosofía de Diseño

### Atomic Design

- **Atoms**: Elementos básicos reutilizables (Button, Input)
- **Molecules**: Combinaciones funcionales (SearchBox, FormField)
- **Organisms**: Grupos complejos (Header, Navigation)
- **Templates**: Estructuras de layout

### Principios de desarrollo

1. **Props con `$`**: Evitar conflictos con HTML nativo
2. **forwardRef**: Todos los componentes soportan refs
3. **TypeScript estricto**: Tipado completo y robusto
4. **Storybook obligatorio**: Documentación automática
5. **Gradientes primero**: Priorizar gradientes sobre colores sólidos
6. **Seguridad por defecto**: Sanitización automática
7. **Estado integrado**: Zustand como primera opción

### Prioridad de estilos

1. **Estilos base** - Clases fundamentales del componente
2. **Variantes** - `$variant` y `$size`
3. **Custom** - `$custom` puede sobrescribir todo
4. **ClassName** - Clases adicionales estáticas

## 🤝 Contribuir

### Setup para desarrollo

```bash
# 1. Clonar repositorio
git clone https://github.com/code-dev-col/tailwind-next.git
cd tailwind-next

# 2. Instalar dependencias
npm install

# 3. Ejecutar Storybook
npm run storybook

# 4. Hacer cambios y verificar build
npm run build
```

### Estándares de desarrollo

- **Props**: Usar prefijo `$` para todas las props de la librería
- **TypeScript**: Tipado estricto y `forwardRef` obligatorio
- **Stories**: Cada componente debe incluir Default, Variants, Sizes
- **Testing**: Verificar en Storybook antes de commit
- **Atomic Design**: Respetar estructura atoms/molecules/organisms

### Crear nuevo componente

1. Seguir template en `/.github/instructions/tailwind-next.instructions.md`
2. Crear stories obligatorias (Default, Variants, Sizes, WithGradients)
3. Exportar en `src/index.ts`
4. Verificar build y Storybook

## � Soporte

### Recursos

- **Storybook**: [Documentación interactiva](https://code-dev-col.github.io/tailwind-next-storybook)
- **Issues**: [GitHub Issues](https://github.com/code-dev-col/tailwind-next/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/code-dev-col/tailwind-next/discussions)

### Problemas comunes

**P: ¿Los gradientes no se aplican?**  
R: Verificar que `theme.css` esté importado después de `tailwindcss`

**P: ¿Props con `$` no funcionan?**  
R: Asegurar que estás usando la versión correcta e importando de `@code-dev-col/tailwind-next`

**P: ¿Conflictos con shadcn/ui?**  
R: La librería es compatible, usar variables CSS personalizadas para override

## 📊 Características Técnicas

### Dependencias principales

- **React 18+**: Hooks modernos y concurrent features
- **Tailwind CSS v4**: Nuevo patrón @theme y optimizaciones
- **TypeScript 5+**: Tipado avanzado y performance
- **Zustand**: Gestión de estado ligera y eficiente
- **react-icons**: Biblioteca completa de iconos

### Compatibilidad

- ✅ **React 18+**
- ✅ **Next.js 13+ (App Router)**
- ✅ **Vite 4+**
- ✅ **TypeScript 5+**
- ✅ **Tailwind CSS v4**
- ✅ **shadcn/ui**

### Bundle size

- **Gzipped**: ~45KB (todos los componentes)
- **Tree-shaking**: Solo importar componentes usados
- **Zero runtime**: CSS en tiempo de compilación

---

## �📄 Licencia

MIT License - ver [LICENSE](./LICENSE) para detalles.

---

**Desarrollado por [@code-dev-col](https://github.com/code-dev-col)**  
**Versión actual**: 0.1.0  
**Última actualización**: Agosto 2025

