# Sistema de Colores Híbrido: @theme + :root

## 📋 Descripción

Este sistema mantiene **compatibilidad total** entre el moderno sistema `@theme` de Tailwind v4 y las variables `:root` de shadcn/ui que ya están siendo usadas en los componentes existentes.

## 🎯 Filosofía

- **@theme**: Fuente de verdad para colores del diseño
- **:root**: Sincronizado automáticamente para compatibilidad con componentes existentes
- **Conversión automática**: Mantiene ambos sistemas sincronizados

## 🔄 Cómo Funciona

### 1. Estructura Principal

```css
@theme {
  /* Colores principales - FUENTE DE VERDAD */
  --color-primary: hsl(215 85% 55%);
  --color-secondary: hsl(210 75% 65%);
  /* ... más colores */
}

:root {
  /* Variables shadcn/ui - SINCRONIZADAS AUTOMÁTICAMENTE */
  --primary: 215 85% 55%;
  --secondary: 210 75% 65%;
  /* ... más variables */
}
```

### 2. Sincronización Automática

El script `scripts/sync-theme.js` lee los valores del bloque `@theme` y actualiza automáticamente las variables `:root` correspondientes.

## 🚀 Comandos Disponibles

```bash
# Sincronización manual
npm run sync-theme

# Desarrollo con sincronización automática
npm run dev

# Build normal (sin sincronización automática)
npm run build
```

## 📝 Flujo de Trabajo

### Para Modificar Colores:

1. **Edita solo el bloque @theme** en `src/theme.css`:

```css
@theme {
  --color-primary: hsl(220 85% 60%); /* ← Cambiar aquí */
}
```

2. **Ejecuta sincronización**:

```bash
npm run sync-theme
```

3. **Verifica resultado**: Las variables `:root` se actualizan automáticamente:

```css
:root {
  --primary: 220 85% 60%; /* ← Sincronizado automáticamente */
}
```

## 🎨 Mapeo de Variables

| @theme                | :root (light)   | :root (dark)                     |
| --------------------- | --------------- | -------------------------------- |
| `--color-primary`     | `--primary`     | `--primary` (+10% lightness)     |
| `--color-secondary`   | `--secondary`   | `--secondary` (+10% lightness)   |
| `--color-destructive` | `--destructive` | `--destructive` (+10% lightness) |
| `--color-accent`      | `--accent`      | `--accent` (+10% lightness)      |
| `--color-muted`       | `--muted`       | `--muted`                        |
| `--color-background`  | `--background`  | `--background`                   |

## ✅ Beneficios

1. **Compatibilidad Total**: Los componentes existentes (CheckBox, etc.) siguen funcionando
2. **Sistema Moderno**: Usa `@theme` de Tailwind v4 como fuente de verdad
3. **DX Mejorado**: Solo modificas los colores en un lugar
4. **Sincronización**: Automática entre sistemas
5. **Dark Mode**: Calculado automáticamente (+10% lightness en primarios)

## 🔧 Componentes Afectados

### Usan :root (shadcn/ui format):

- CheckBox
- Switch
- RadioButton
- Otros componentes legacy

### Usan @theme (Tailwind v4 format):

- Nuevos componentes
- Meter (con clases CSS custom)
- Progress
- Componentes futuros

## 🚨 Reglas de Uso

1. **NUNCA modifiques `:root` manualmente** - Solo edita `@theme`
2. **Ejecuta `npm run sync-theme`** después de cambiar colores
3. **Usa `npm run dev`** para desarrollo (incluye sincronización)
4. **Los colores de gradientes permanecen en `:root`** (no se sincronizan)

## 🛠️ Resolución de Problemas

### Si los colores no se actualizan:

```bash
npm run sync-theme
```

### Si hay errores de sincronización:

1. Verifica que el bloque `@theme` esté bien formado
2. Asegúrate de que los valores HSL usen el formato correcto: `hsl(H S% L%)`
3. Revisa que no haya caracteres especiales en los nombres de variables

### Para debugging:

```bash
npm run sync-theme
# Muestra: Variables actualizadas: 15
```

## 📚 Ejemplos de Uso

### Cambiar color primary:

```css
@theme {
  --color-primary: hsl(250 80% 60%); /* Nuevo azul violeta */
}
```

### Añadir nuevo color:

```css
@theme {
  --color-info: hsl(200 85% 55%); /* Nuevo color info */
}
```

Luego ejecutar `npm run sync-theme` y el color estará disponible como `--info` en `:root`.

---

**Este sistema garantiza la evolución gradual hacia Tailwind v4 manteniendo compatibilidad total con el código existente.**

