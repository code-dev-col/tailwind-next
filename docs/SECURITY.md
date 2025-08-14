# 🔒 Funcionalidades de Seguridad - Input y TextArea

## Descripción General

Los componentes **Input** y **TextArea** de la biblioteca incluyen funcionalidades avanzadas de seguridad para prevenir inyecciones SQL, ataques XSS y otros vectores de ataque comunes en aplicaciones web.

## 🛡️ Protecciones Implementadas

### 1. **Detección de Inyección SQL**

- Detecta patrones SQL peligrosos: `SELECT`, `UNION`, `DROP`, etc.
- Identifica comentarios SQL: `--`, `/* */`
- Reconoce intentos de bypass: `' OR 1=1`, `" OR "1"="1"`

### 2. **Prevención de XSS**

- Detecta tags HTML peligrosos: `<script>`, `<iframe>`, `<object>`
- Identifica handlers de eventos: `onclick`, `onload`, etc.
- Reconoce URLs maliciosas: `javascript:`, etc.

### 3. **Sanitización Automática**

- Escapa caracteres especiales
- Remueve contenido peligroso
- Limpia input en tiempo real

## 🎛️ Props de Seguridad

### `$security`

Define el nivel de seguridad aplicado:

```tsx
// Usando presets predefinidos
<Input $security="form" />        // Básico para formularios
<Input $security="username" />    // Estricto para usernames
<Input $security="email" />       // Optimizado para emails
<Input $security="search" />      // Para campos de búsqueda
<Input $security="comment" />     // Para comentarios
<Input $security="critical" />    // Máxima seguridad

// Configuración personalizada
<Input $security={{
  level: 'strict',
  maxLength: 50,
  allowSpecialChars: false
}} />
```

### `$sanitizeOnChange`

Sanitiza automáticamente el input al escribir:

```tsx
<Input
  $security="form"
  $sanitizeOnChange={true}
  placeholder="Se limpia automáticamente"
/>
```

### `$showSecurityWarnings`

Muestra advertencias visuales cuando detecta amenazas:

```tsx
<Input
  $security="form"
  $showSecurityWarnings={true}
  placeholder="Muestra advertencias de seguridad"
/>
```

### `$blockUnsafeInput`

Bloquea completamente input inseguro:

```tsx
<Input
  $security="username"
  $blockUnsafeInput={true}
  placeholder="Bloquea input peligroso"
/>
```

### `onSecurityThreat`

Callback cuando se detectan amenazas:

```tsx
<Input
  $security="form"
  onSecurityThreat={(threats, value) => {
    console.log('Amenazas detectadas:', threats);
    console.log('Valor peligroso:', value);
    // Enviar alerta al sistema de monitoreo
  }}
/>
```

## 📋 Presets de Seguridad

### `form` - Formularios Generales

- **Nivel**: Básico
- **Características**: Escapa caracteres especiales básicos
- **Uso**: Campos de formulario estándar

### `username` - Nombres de Usuario

- **Nivel**: Estricto
- **Límite**: 50 caracteres
- **Características**: Remueve caracteres peligrosos
- **Uso**: Campos de username/login

### `email` - Direcciones de Email

- **Nivel**: Básico
- **Límite**: 100 caracteres
- **Características**: Validación optimizada para emails
- **Uso**: Campos de correo electrónico

### `search` - Campos de Búsqueda

- **Nivel**: Básico
- **Características**: Sin caracteres especiales
- **Uso**: Barras de búsqueda

### `comment` - Comentarios y Texto Libre

- **Nivel**: Básico
- **Límite**: 1000 caracteres
- **Características**: Permite más flexibilidad
- **Uso**: Comentarios, descripciones, mensajes

### `critical` - Campos Críticos

- **Nivel**: Paranoid
- **Límite**: 20 caracteres
- **Características**: Solo letras, números y caracteres básicos
- **Uso**: IDs, códigos, campos sensibles

## 🎯 Casos de Uso Prácticos

### Formulario de Login

```tsx
<div>
  <Input $security="username" $blockUnsafeInput={true} placeholder="Usuario" />

  <Input type="password" $security="form" placeholder="Contraseña" />
</div>
```

### Formulario de Contacto

```tsx
<div>
  <Input type="email" $security="email" placeholder="Tu email" />

  <TextArea
    $security="comment"
    $sanitizeOnChange={true}
    $showSecurityWarnings={true}
    placeholder="Tu mensaje"
  />
</div>
```

### Búsqueda con Monitoreo

```tsx
<Input
  type="search"
  $security="search"
  $showSecurityWarnings={true}
  onSecurityThreat={(threats, value) => {
    // Enviar alerta al sistema de seguridad
    analytics.track('security_threat', {
      threats,
      value: value.substring(0, 20) + '...',
      timestamp: Date.now(),
    });
  }}
  placeholder="Buscar productos..."
/>
```

### Campo Crítico con Máxima Seguridad

```tsx
<Input
  $security="critical"
  $blockUnsafeInput={true}
  $showSecurityWarnings={true}
  placeholder="ID de transacción"
/>
```

## ⚙️ Configuración Personalizada

### Nivel de Seguridad Personalizado

```tsx
<Input
  $security={{
    level: 'strict',
    allowHtml: false,
    allowSpecialChars: false,
    maxLength: 30,
    customPatterns: [
      /badword/gi, // Bloquear palabras específicas
      /\d{16}/g, // Bloquear números de tarjeta
    ],
  }}
/>
```

### Combinando con Otras Funcionalidades

```tsx
<TextArea
  $security="comment"
  $sanitizeOnChange={true}
  $showSecurityWarnings={true}
  $maxCharacters={500}
  $isAutoSizing={true}
  $store={useCommentStore}
  storeKey="content"
  placeholder="Escribe tu comentario seguro..."
/>
```

## 🚨 Advertencias y Consideraciones

### Rendimiento

- La validación de seguridad se ejecuta en cada cambio
- Para campos con mucho texto, considera usar debounce
- Los presets están optimizados para el mejor balance

### Compatibilidad

- Las funcionalidades funcionan en todos los navegadores modernos
- La sanitización es compatible con diferentes codificaciones
- Los patrones de detección se actualizan regularmente

### Limitaciones

- No reemplaza la validación del lado del servidor
- Es una capa adicional de protección, no la única
- Algunos patrones legítimos podrían ser bloqueados en modo paranoid

## 🔧 Integración con Sistemas de Monitoreo

```tsx
// Configuración global de monitoreo
const securityHandler = (threats: string[], value: string) => {
  // Log local
  console.warn('Security threat detected:', threats);

  // Enviar a sistema de monitoreo
  monitoringService.logSecurityEvent({
    type: 'input_threat',
    threats,
    sanitizedValue: value.replace(/[<>&"']/g, '*'),
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
    url: window.location.href,
  });

  // Incrementar métricas
  metrics.increment('security.threats.detected', {
    threatType: threats[0],
    inputType: 'form_field',
  });
};

// Uso en componentes
<Input
  $security="form"
  $showSecurityWarnings={true}
  onSecurityThreat={securityHandler}
/>;
```

## 📊 Mejores Prácticas

1. **Siempre usar presets**: Comienza con presets predefinidos
2. **Validación del servidor**: Complementa con validación backend
3. **Monitoreo activo**: Implementa logging de amenazas
4. **Testing regular**: Prueba con vectores de ataque conocidos
5. **Actualizaciones**: Mantén la biblioteca actualizada
6. **Capacitación**: Entrena al equipo en el uso correcto

La implementación de estas funcionalidades proporciona una capa robusta de protección que complementa las mejores prácticas de seguridad en el desarrollo web.

