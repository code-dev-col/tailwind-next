#!/usr/bin/env node

/**
 * Script de sincronización automática @theme ↔ :root
 * Mantiene los valores de @theme sincronizados con las variables :root de shadcn/ui
 *
 * USO:
 * - npm run sync-theme (manual)
 * - Se ejecuta automáticamente en build/dev cuando se detectan cambios en theme.css
 */

const fs = require('fs');
const path = require('path');

const THEME_FILE = path.join(__dirname, '../src/theme.css');

/**
 * Extrae valores HSL del bloque @theme
 */
function extractThemeValues(content) {
  const themeBlock = content.match(/@theme\s*{([^}]+)}/s);
  if (!themeBlock) return {};

  const values = {};
  const lines = themeBlock[1].split('\n');

  for (const line of lines) {
    const match = line.match(/--color-([^:]+):\s*hsl\(([^)]+)\);/);
    if (match) {
      const [, name, hslValue] = match;
      values[name] = hslValue.trim();
    }
  }

  return values;
}

/**
 * Convierte variables @theme a formato :root de shadcn/ui
 */
function convertToRootFormat(themeValues) {
  const rootValues = {};

  // Mapeo de nombres @theme → :root
  const nameMapping = {
    background: 'background',
    foreground: 'foreground',
    muted: 'muted',
    'muted-foreground': 'muted-foreground',
    border: 'border',
    input: 'input',
    ring: 'ring',
    primary: 'primary',
    'primary-foreground': 'primary-foreground',
    secondary: 'secondary',
    'secondary-foreground': 'secondary-foreground',
    accent: 'accent',
    'accent-foreground': 'accent-foreground',
    destructive: 'destructive',
    'destructive-foreground': 'destructive-foreground',
    warning: 'warning',
    'warning-foreground': 'warning-foreground',
    success: 'success',
    'success-foreground': 'success-foreground',
    popover: 'popover',
    'popover-foreground': 'popover-foreground',
    card: 'card',
    'card-foreground': 'card-foreground',
  };

  for (const [themeName, rootName] of Object.entries(nameMapping)) {
    if (themeValues[themeName]) {
      rootValues[rootName] = themeValues[themeName];
    }
  }

  return rootValues;
}

/**
 * Actualiza el bloque :root con los nuevos valores
 */
function updateRootBlock(content, rootValues, isDark = false) {
  const selector = isDark ? ':root.dark' : ':root';
  const regex = new RegExp(
    `(${selector.replace('.', '\\.')}\\s*{)([^}]+)(})`,
    's'
  );

  return content.replace(regex, (match, opening, blockContent, closing) => {
    let updatedContent = blockContent;

    // Actualizar cada valor
    for (const [name, value] of Object.entries(rootValues)) {
      const varRegex = new RegExp(`(--${name}:\\s*)([^;]+)(;)`, 'g');
      const replacement = `$1${value}$3`;

      if (updatedContent.match(varRegex)) {
        updatedContent = updatedContent.replace(varRegex, replacement);
      } else {
        // Si la variable no existe, agregarla
        updatedContent += `\n  --${name}: ${value};`;
      }
    }

    return opening + updatedContent + closing;
  });
}

/**
 * Sincroniza @theme con :root
 */
function syncTheme() {
  try {
    console.log('🔄 Sincronizando @theme ↔ :root...');

    const content = fs.readFileSync(THEME_FILE, 'utf8');

    // Extraer valores del bloque @theme
    const themeValues = extractThemeValues(content);

    if (Object.keys(themeValues).length === 0) {
      console.log('⚠️  No se encontraron variables @theme válidas');
      return;
    }

    // Convertir a formato :root
    const rootValues = convertToRootFormat(themeValues);

    // Calcular valores para dark mode (+10% lightness para primarios)
    const darkRootValues = { ...rootValues };

    // Ajustar lightness para dark mode
    for (const [name, value] of Object.entries(darkRootValues)) {
      if (
        [
          'primary',
          'secondary',
          'accent',
          'destructive',
          'warning',
          'success',
        ].includes(name)
      ) {
        // Incrementar lightness en 10% para dark mode
        const hslMatch = value.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
        if (hslMatch) {
          const [, h, s, l] = hslMatch;
          const newL = Math.min(100, parseInt(l) + 10);
          darkRootValues[name] = `${h} ${s}% ${newL}%`;
        }
      }
    }

    // Actualizar contenido
    let updatedContent = content;
    updatedContent = updateRootBlock(updatedContent, rootValues, false);
    updatedContent = updateRootBlock(updatedContent, darkRootValues, true);

    // Escribir archivo actualizado
    fs.writeFileSync(THEME_FILE, updatedContent);

    console.log('✅ Sincronización completada');
    console.log(`📊 Variables actualizadas: ${Object.keys(rootValues).length}`);
  } catch (error) {
    console.error('❌ Error en sincronización:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  syncTheme();
}

module.exports = { syncTheme };
