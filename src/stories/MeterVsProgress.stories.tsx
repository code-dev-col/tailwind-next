import type { Meta, StoryObj } from '@storybook/react';
import { Meter } from '../components/atoms/feedback/Meter';
import { Progress } from '../components/atoms/feedback/Progress';

const meta: Meta = {
  title: 'Documentation/Meter vs Progress',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Meter vs Progress: ¿Cuándo usar cada uno?

Esta guía te ayudará a elegir entre **Meter** y **Progress** según el estándar HTML y las mejores prácticas de UX.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OverviewComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Meter Column */}
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              📊 Meter
            </h3>
            <p className="text-blue-800 text-sm mb-3">
              <strong>Propósito:</strong> Mostrar un valor escalar dentro de un
              rango conocido
            </p>
            <p className="text-blue-700 text-sm">
              Ideal para métricas, niveles, scores y valores que tienen un rango
              definido con significado semántico.
            </p>
          </div>

          <div className="space-y-3">
            <Meter
              value={85}
              min={0}
              max={100}
              label="Rendimiento del Sistema"
              showPercentage={true}
              optimum={90}
              high={75}
              low={50}
            />

            <Meter
              value={4.2}
              min={1}
              max={5}
              label="Calificación Promedio"
              showValue={true}
              suffix=" ⭐"
              $colorScheme="accent"
              optimum={5}
            />

            <Meter
              value={750}
              min={0}
              max={1000}
              label="Espacio en Disco"
              showValue={true}
              suffix=" GB"
              $colorScheme="destructive"
              high={800}
              optimum={0}
            />
          </div>
        </div>

        {/* Progress Column */}
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              ⏳ Progress
            </h3>
            <p className="text-green-800 text-sm mb-3">
              <strong>Propósito:</strong> Mostrar el progreso de una tarea
              específica
            </p>
            <p className="text-green-700 text-sm">
              Ideal para cargas, descargas, instalaciones y cualquier proceso
              que avanza hacia su finalización.
            </p>
          </div>

          <div className="space-y-3">
            <Progress
              value={65}
              max={100}
              label="Subiendo archivo..."
              $showPercentage={true}
              $colorScheme="default"
            />

            <Progress
              value={3}
              max={5}
              label="Instalando dependencias"
              $showValue={true}
              $colorScheme="secondary"
            />

            <Progress
              value={0}
              max={100}
              label="Preparando descarga..."
              $colorScheme="accent"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const UseCasesGuide: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">🎯 Guía de Casos de Uso</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-3">
              📊 Usa Meter cuando:
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                <span>
                  <strong>Métricas del sistema:</strong> CPU, RAM, disco,
                  batería
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                <span>
                  <strong>Scores y ratings:</strong> 4.2/5 estrellas, 85/100
                  puntos
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                <span>
                  <strong>Niveles actuales:</strong> Volumen, brillo,
                  temperatura
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                <span>
                  <strong>Uso de recursos:</strong> Ancho de banda,
                  almacenamiento
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                <span>
                  <strong>KPIs y métricas:</strong> Ventas, conversiones,
                  engagement
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                <span>
                  <strong>Estados de salud:</strong> Conexión, rendimiento,
                  disponibilidad
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-3">
              ⏳ Usa Progress cuando:
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                <span>
                  <strong>Cargas de archivos:</strong> Subir/descargar
                  documentos
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                <span>
                  <strong>Instalaciones:</strong> Software, actualizaciones,
                  plugins
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                <span>
                  <strong>Procesos de setup:</strong> Onboarding, configuración
                  inicial
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                <span>
                  <strong>Formularios largos:</strong> Paso 3 de 5, completitud
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                <span>
                  <strong>Operaciones de base de datos:</strong> Importar,
                  procesar
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                <span>
                  <strong>Loading states:</strong> Cargando contenido,
                  sincronizando
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const TechnicalDifferences: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h2 className="text-xl font-bold mb-4">⚙️ Diferencias Técnicas</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left p-3 font-semibold">Aspecto</th>
                <th className="text-left p-3 font-semibold text-blue-600">
                  Meter
                </th>
                <th className="text-left p-3 font-semibold text-green-600">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-3 font-medium">Elemento HTML</td>
                <td className="p-3">
                  <code>&lt;meter&gt;</code>
                </td>
                <td className="p-3">
                  <code>&lt;div&gt;</code> con ARIA
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-medium">Semántica</td>
                <td className="p-3">Valor escalar en rango</td>
                <td className="p-3">Progreso de tarea</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Estados automáticos</td>
                <td className="p-3">optimum/suboptimum/even-less-good</td>
                <td className="p-3">Solo progreso lineal</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-medium">Atributos especiales</td>
                <td className="p-3">low, high, optimum</td>
                <td className="p-3">indeterminate, animated</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Screen Readers</td>
                <td className="p-3">Anuncia como "medidor"</td>
                <td className="p-3">Anuncia como "barra de progreso"</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-medium">Contexto temporal</td>
                <td className="p-3">Estado actual/estático</td>
                <td className="p-3">Proceso en curso/dinámico</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),
};

export const PracticalExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">📋 Ejemplos Prácticos Lado a Lado</h2>

      <div className="space-y-6">
        {/* Dashboard Example */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            🖥️ Dashboard de Sistema
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-blue-600">
                ✅ Correcto - Usar Meter
              </h4>
              <div className="space-y-3">
                <Meter
                  value={67}
                  label="Uso de CPU"
                  showPercentage={true}
                  high={80}
                  optimum={0}
                  $size="sm"
                />
                <Meter
                  value={4200}
                  min={0}
                  max={8000}
                  label="RAM Usada"
                  showValue={true}
                  suffix=" MB"
                  high={6400}
                  optimum={0}
                  $size="sm"
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                📊 Representa el estado actual del sistema
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-red-600">
                ❌ Incorrecto - No usar Progress
              </h4>
              <div className="space-y-3 opacity-60">
                <Progress
                  value={67}
                  label="Uso de CPU"
                  $showPercentage={true}
                  $size="sm"
                />
                <Progress
                  value={52}
                  label="RAM Usada"
                  $showPercentage={true}
                  $size="sm"
                />
              </div>
              <p className="text-xs text-red-600 mt-2">
                ❌ Implica que algo se está completando
              </p>
            </div>
          </div>
        </div>

        {/* File Upload Example */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">📁 Subida de Archivos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-green-600">
                ✅ Correcto - Usar Progress
              </h4>
              <div className="space-y-3">
                <Progress
                  value={45}
                  label="Subiendo documento.pdf"
                  $showPercentage={true}
                  $colorScheme="default"
                />
                <Progress
                  value={0}
                  label="Procesando archivo..."
                  $colorScheme="secondary"
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                ⏳ Muestra el progreso de una operación
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-red-600">
                ❌ Incorrecto - No usar Meter
              </h4>
              <div className="space-y-3 opacity-60">
                <Meter
                  value={45}
                  label="Subiendo documento.pdf"
                  showPercentage={true}
                />
                <Meter value={0} label="Procesando archivo..." />
              </div>
              <p className="text-xs text-red-600 mt-2">
                ❌ No hay rango semántico definido
              </p>
            </div>
          </div>
        </div>

        {/* Rating Example */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            ⭐ Sistema de Calificaciones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-blue-600">
                ✅ Correcto - Usar Meter
              </h4>
              <div className="space-y-3">
                <Meter
                  value={4.2}
                  min={1}
                  max={5}
                  label="Calificación del Producto"
                  showValue={true}
                  suffix="/5 ⭐"
                  $colorScheme="accent"
                  optimum={5}
                  high={4}
                />
                <Meter
                  value={87}
                  min={0}
                  max={100}
                  label="Satisfacción del Cliente"
                  showPercentage={true}
                  optimum={95}
                  high={80}
                  low={60}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                📊 Representa valores con significado en el rango
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-red-600">
                ❌ Incorrecto - No usar Progress
              </h4>
              <div className="space-y-3 opacity-60">
                <Progress
                  value={84}
                  label="Calificación del Producto"
                  $showPercentage={true}
                />
                <Progress
                  value={87}
                  label="Satisfacción del Cliente"
                  $showPercentage={true}
                />
              </div>
              <p className="text-xs text-red-600 mt-2">
                ❌ No es una tarea que se esté completando
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AccessibilityConsiderations: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h2 className="text-xl font-bold mb-4">
          ♿ Consideraciones de Accesibilidad
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-purple-700 mb-3">
              📊 Meter - Lectores de Pantalla
            </h3>
            <div className="bg-white p-4 rounded border">
              <Meter
                value={75}
                min={0}
                max={100}
                label="Uso de memoria"
                showPercentage={true}
                aria-label="Uso de memoria: 75 por ciento, nivel alto"
                high={80}
                optimum={0}
              />
            </div>
            <div className="mt-3 text-sm">
              <p className="font-medium">🔊 Screen Reader anuncia:</p>
              <p className="italic text-gray-700">
                "Medidor, Uso de memoria: 75 por ciento, nivel alto"
              </p>
            </div>
            <ul className="mt-3 text-xs space-y-1">
              <li>• Identifica automáticamente como "medidor"</li>
              <li>• Anuncia el valor actual y el estado</li>
              <li>• Indica si está en rango optimum/suboptimum</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-purple-700 mb-3">
              ⏳ Progress - Lectores de Pantalla
            </h3>
            <div className="bg-white p-4 rounded border">
              <Progress
                value={65}
                max={100}
                label="Subiendo archivo"
                $showPercentage={true}
                aria-label="Subiendo archivo, 65 por ciento completado"
              />
            </div>
            <div className="mt-3 text-sm">
              <p className="font-medium">🔊 Screen Reader anuncia:</p>
              <p className="italic text-gray-700">
                "Barra de progreso, Subiendo archivo, 65 por ciento completado"
              </p>
            </div>
            <ul className="mt-3 text-xs space-y-1">
              <li>• Identifica como "barra de progreso"</li>
              <li>• Anuncia el progreso hacia la finalización</li>
              <li>• Puede anunciar actualizaciones automáticamente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const QuickReference: Story = {
  render: () => (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-6 text-center">
        🚀 Referencia Rápida
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
          <h3 className="font-bold text-blue-700 mb-3">📊 METER</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Propósito:</span>
              <span className="text-blue-600">Mostrar valor actual</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tiempo:</span>
              <span className="text-blue-600">Estado estático</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Semántica:</span>
              <span className="text-blue-600">Valor en rango</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Ejemplos:</span>
              <span className="text-blue-600 text-xs">
                CPU, Rating, Batería
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t">
            <Meter
              value={8.5}
              min={0}
              max={10}
              label="Score"
              showValue={true}
              suffix="/10"
              $size="sm"
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
          <h3 className="font-bold text-green-700 mb-3">⏳ PROGRESS</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Propósito:</span>
              <span className="text-green-600">Mostrar progreso</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tiempo:</span>
              <span className="text-green-600">Proceso dinámico</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Semántica:</span>
              <span className="text-green-600">Tarea en curso</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Ejemplos:</span>
              <span className="text-green-600 text-xs">
                Upload, Install, Load
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t">
            <Progress
              value={45}
              max={100}
              label="Uploading..."
              $showPercentage={true}
              $size="sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-100 rounded-lg border border-yellow-300">
        <p className="text-sm text-yellow-800 text-center">
          <strong>💡 Regla de oro:</strong> Si puedes preguntar "¿cuánto falta?"
          usa Progress. Si preguntas "¿cuál es el nivel actual?" usa Meter.
        </p>
      </div>
    </div>
  ),
};

