import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './MenuItem';
import { useMenuItemExamples } from '../../../../stores/menuItemExamples.store';
import {
  FiFile,
  FiFolder,
  FiSave,
  FiPrinter,
  FiCopy,
  FiTrash2,
  FiSettings,
  FiUser,
  FiLogOut,
  FiEdit3,
  FiDownload,
  FiShare2,
} from 'react-icons/fi';

const meta: Meta<typeof MenuItem> = {
  title: 'Molecules/Navigation/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-64 p-4 bg-card border rounded-lg shadow-sm">
      <MenuItem
        $store={useMenuItemExamples}
        storeKey="defaultExample"
        label="Elemento del menú"
        icon={FiFile}
        shortcut="⌘N"
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">
          Variantes automáticas
        </h4>
        <div className="w-64 space-y-2 p-4 bg-card border rounded-lg shadow-sm">
          <MenuItem $variant="default" label="Default (automático)" />
          <MenuItem $variant="withIcon" label="Con icono" icon={FiFile} />
          <MenuItem $variant="withShortcut" label="Con atajo" shortcut="⌘S" />
          <MenuItem $variant="compact" label="Compacto" icon={FiEdit3} />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">
          Combinaciones completas
        </h4>
        <div className="w-64 space-y-2 p-4 bg-card border rounded-lg shadow-sm">
          <MenuItem label="Nuevo archivo" icon={FiFile} shortcut="⌘N" />
          <MenuItem label="Abrir carpeta" icon={FiFolder} shortcut="⌘O" />
          <MenuItem label="Guardar" icon={FiSave} shortcut="⌘S" isActive />
          <MenuItem
            label="Imprimir"
            icon={FiPrinter}
            shortcut="⌘P"
            isDisabled
          />
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="w-64 space-y-2 p-4 bg-card border rounded-lg shadow-sm">
        <h4 className="text-sm font-medium mb-3 text-gray-700">Small</h4>
        <MenuItem $size="sm" label="Pequeño" icon={FiFile} shortcut="⌘N" />
        <MenuItem
          $size="sm"
          label="Guardar como"
          icon={FiSave}
          shortcut="⌘⇧S"
        />
      </div>

      <div className="w-64 space-y-2 p-4 bg-card border rounded-lg shadow-sm">
        <h4 className="text-sm font-medium mb-3 text-gray-700">Default</h4>
        <MenuItem
          $size="default"
          label="Predeterminado"
          icon={FiFile}
          shortcut="⌘N"
        />
        <MenuItem
          $size="default"
          label="Exportar"
          icon={FiDownload}
          shortcut="⌘E"
        />
      </div>

      <div className="w-64 space-y-2 p-4 bg-card border rounded-lg shadow-sm">
        <h4 className="text-sm font-medium mb-3 text-gray-700">Large</h4>
        <MenuItem $size="lg" label="Grande" icon={FiFile} shortcut="⌘N" />
        <MenuItem
          $size="lg"
          label="Configuración"
          icon={FiSettings}
          shortcut="⌘,"
        />
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold">Esquemas de Color theme.css</h4>

      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Default</h5>
          <div className="w-64 space-y-1 p-3 bg-card border rounded-lg shadow-sm">
            <MenuItem
              $colorScheme="default"
              label="Nuevo"
              icon={FiFile}
              shortcut="⌘N"
            />
            <MenuItem
              $colorScheme="default"
              label="Abrir"
              icon={FiFolder}
              shortcut="⌘O"
            />
            <MenuItem
              $colorScheme="default"
              label="Guardar"
              icon={FiSave}
              shortcut="⌘S"
              isActive
            />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Secondary</h5>
          <div className="w-64 space-y-1 p-3 bg-card border rounded-lg shadow-sm">
            <MenuItem
              $colorScheme="secondary"
              label="Copiar"
              icon={FiCopy}
              shortcut="⌘C"
            />
            <MenuItem
              $colorScheme="secondary"
              label="Compartir"
              icon={FiShare2}
              shortcut="⌘⇧S"
              isActive
            />
            <MenuItem
              $colorScheme="secondary"
              label="Descargar"
              icon={FiDownload}
              shortcut="⌘D"
            />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Accent</h5>
          <div className="w-64 space-y-1 p-3 bg-card border rounded-lg shadow-sm">
            <MenuItem
              $colorScheme="accent"
              label="Perfil"
              icon={FiUser}
              shortcut="⌘U"
            />
            <MenuItem
              $colorScheme="accent"
              label="Configuración"
              icon={FiSettings}
              shortcut="⌘,"
              isActive
            />
            <MenuItem
              $colorScheme="accent"
              label="Editar"
              icon={FiEdit3}
              shortcut="⌘E"
            />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Destructive
          </h5>
          <div className="w-64 space-y-1 p-3 bg-card border rounded-lg shadow-sm">
            <MenuItem
              $colorScheme="destructive"
              label="Eliminar archivo"
              icon={FiTrash2}
              shortcut="⌫"
              isDangerous
            />
            <MenuItem
              $colorScheme="destructive"
              label="Cerrar sesión"
              icon={FiLogOut}
              shortcut="⌘Q"
              isDangerous
            />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Muted</h5>
          <div className="w-64 space-y-1 p-3 bg-card border rounded-lg shadow-sm">
            <MenuItem
              $colorScheme="muted"
              label="Archivo reciente"
              icon={FiFile}
            />
            <MenuItem
              $colorScheme="muted"
              label="Historial"
              shortcut="⌘H"
              isActive
            />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Minimal</h5>
          <div className="w-64 space-y-1 p-3 bg-card border rounded-lg shadow-sm">
            <MenuItem $colorScheme="minimal" label="Ayuda" shortcut="F1" />
            <MenuItem $colorScheme="minimal" label="Acerca de" isActive />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Esquemas de color theme.css:</strong> Cada esquema utiliza las
          variables CSS definidas en theme.css con colores sutiles y estados
          hover apropiados. El esquema{' '}
          <code className="px-1 py-0.5 bg-gray-200 rounded text-xs">
            destructive
          </code>{' '}
          incluye soporte especial para acciones peligrosas con{' '}
          <code className="px-1 py-0.5 bg-gray-200 rounded text-xs">
            isDangerous
          </code>
          .
        </p>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">
          Estados básicos
        </h4>
        <div className="w-64 space-y-2 p-4 bg-card border rounded-lg shadow-sm">
          <MenuItem label="Normal" icon={FiFile} shortcut="⌘N" />
          <MenuItem label="Activo" icon={FiSave} shortcut="⌘S" isActive />
          <MenuItem
            label="Deshabilitado"
            icon={FiPrinter}
            shortcut="⌘P"
            isDisabled
          />
          <MenuItem
            label="Peligroso"
            icon={FiTrash2}
            shortcut="⌫"
            isDangerous
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">
          Combinaciones de estados
        </h4>
        <div className="w-64 space-y-2 p-4 bg-card border rounded-lg shadow-sm">
          <MenuItem
            $colorScheme="secondary"
            label="Activo + Secundario"
            icon={FiEdit3}
            shortcut="⌘E"
            isActive
          />
          <MenuItem
            $colorScheme="destructive"
            label="Peligroso + Activo"
            icon={FiTrash2}
            shortcut="⌫"
            isActive
            isDangerous
          />
          <MenuItem
            $colorScheme="accent"
            label="Deshabilitado + Accent"
            icon={FiSettings}
            shortcut="⌘,"
            isDisabled
          />
        </div>
      </div>
    </div>
  ),
};

export const MenuContext: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">
          Menú de archivo
        </h4>
        <div className="w-72 p-2 bg-card border rounded-lg shadow-lg">
          <MenuItem label="Nuevo archivo" icon={FiFile} shortcut="⌘N" />
          <MenuItem label="Abrir carpeta" icon={FiFolder} shortcut="⌘O" />
          <MenuItem label="Guardar" icon={FiSave} shortcut="⌘S" isActive />
          <MenuItem label="Guardar como..." icon={FiSave} shortcut="⌘⇧S" />
          <MenuItem
            label="Imprimir"
            icon={FiPrinter}
            shortcut="⌘P"
            isDisabled
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-gray-700">
          Menú contextual
        </h4>
        <div className="w-72 p-2 bg-card border rounded-lg shadow-lg">
          <MenuItem label="Copiar" icon={FiCopy} shortcut="⌘C" />
          <MenuItem
            $colorScheme="secondary"
            label="Compartir"
            icon={FiShare2}
            shortcut="⌘⇧S"
          />
          <MenuItem
            $colorScheme="accent"
            label="Editar"
            icon={FiEdit3}
            shortcut="⌘E"
          />
          <MenuItem
            $colorScheme="destructive"
            label="Eliminar"
            icon={FiTrash2}
            shortcut="⌫"
            isDangerous
          />
        </div>
      </div>
    </div>
  ),
};

export const WithStore: Story = {
  render: () => {
    const { menuItems, toggleMenuItem, selectedMenuItem } =
      useMenuItemExamples();

    return (
      <div className="space-y-4">
        <div className="w-72 p-2 bg-card border rounded-lg shadow-lg">
          <h4 className="text-sm font-medium mb-3 px-2 text-gray-700">
            Menú con Store (Interactivo)
          </h4>
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              label={item.label}
              icon={
                item.id === 'new'
                  ? FiFile
                  : item.id === 'open'
                  ? FiFolder
                  : item.id === 'save'
                  ? FiSave
                  : item.id === 'print'
                  ? FiPrinter
                  : FiFile
              }
              shortcut={item.shortcut}
              isActive={item.isActive}
              isDisabled={item.isDisabled}
              onClick={() => toggleMenuItem(item.id)}
              $colorScheme={item.id === 'save' ? 'secondary' : 'default'}
            />
          ))}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Elemento seleccionado:</strong>{' '}
            {selectedMenuItem || 'Ninguno'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Haz clic en cualquier elemento para activarlo/desactivarlo
          </p>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const {
      clearAllMenuItem,
      addMenuItem,
      removeMenuItem,
      menuItems,
      toggleMenuItem,
    } = useMenuItemExamples();

    const handleAddItem = () => {
      const newItem = {
        label: `Nuevo elemento ${menuItems.length + 1}`,
        shortcut: `⌘${menuItems.length + 1}`,
        isActive: false,
        isDisabled: false,
      };
      addMenuItem(newItem);
    };

    const handleRemoveLastItem = () => {
      if (menuItems.length > 0) {
        const lastItem = menuItems[menuItems.length - 1];
        removeMenuItem(lastItem.id);
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={handleAddItem}
            className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/80 transition-colors">
            Agregar elemento
          </button>
          <button
            onClick={handleRemoveLastItem}
            disabled={menuItems.length === 0}
            className="px-3 py-1 bg-destructive text-white rounded text-sm hover:bg-destructive/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Remover último
          </button>
          <button
            onClick={clearAllMenuItem}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-400 transition-colors">
            Limpiar todo
          </button>
        </div>

        <div className="w-72 p-2 bg-card border rounded-lg shadow-lg">
          <h4 className="text-sm font-medium mb-3 px-2 text-gray-700">
            Menú Dinámico ({menuItems.length} elementos)
          </h4>
          {menuItems.length === 0 ? (
            <div className="px-2 py-4 text-center text-gray-500 text-sm">
              No hay elementos en el menú
            </div>
          ) : (
            menuItems.map((item, index) => (
              <MenuItem
                key={item.id}
                label={item.label}
                icon={index % 2 === 0 ? FiFile : FiEdit3}
                shortcut={item.shortcut}
                isActive={item.isActive}
                isDisabled={item.isDisabled}
                onClick={() => toggleMenuItem(item.id)}
                $colorScheme={
                  index % 3 === 0
                    ? 'default'
                    : index % 3 === 1
                    ? 'secondary'
                    : 'accent'
                }
              />
            ))
          )}
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Funciones disponibles:</strong>
          </p>
          <ul className="text-xs text-blue-600 mt-1 space-y-1">
            <li>• Agregar nuevos elementos dinámicamente</li>
            <li>• Remover elementos del final</li>
            <li>• Limpiar todos los elementos</li>
            <li>• Alternar estado activo de elementos</li>
            <li>• Estados y colores automáticos</li>
          </ul>
        </div>
      </div>
    );
  },
};

