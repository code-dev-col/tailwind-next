import type { Meta, StoryObj } from '@storybook/react';
import {
  FaHeart,
  FaUser,
  FaCog,
  FaHome,
  FaStar,
  FaCheck,
  FaTimes,
  FaPlus,
  FaArrowRight,
  FaDownload,
} from 'react-icons/fa';
import {
  HiOutlineSparkles,
  HiOutlineFire,
  HiOutlineHeart,
} from 'react-icons/hi';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Display/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: FaHeart,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Icon icon={FaHeart} $colorScheme="default" />
        <p className="text-xs mt-1">Default</p>
      </div>
      <div className="text-center">
        <Icon icon={FaUser} $colorScheme="default" />
        <p className="text-xs mt-1">Primary</p>
      </div>
      <div className="text-center">
        <Icon icon={FaCog} $colorScheme="secondary" />
        <p className="text-xs mt-1">Secondary</p>
      </div>
      <div className="text-center">
        <Icon icon={FaTimes} $colorScheme="destructive" />
        <p className="text-xs mt-1">Destructive</p>
      </div>
      <div className="text-center">
        <Icon icon={FaHome} $colorScheme="muted" />
        <p className="text-xs mt-1">Ghost</p>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Icon icon={FaStar} $size="xs" />
        <p className="text-xs mt-1">XS</p>
      </div>
      <div className="text-center">
        <Icon icon={FaStar} $size="sm" />
        <p className="text-xs mt-1">SM</p>
      </div>
      <div className="text-center">
        <Icon icon={FaStar} $size="default" />
        <p className="text-xs mt-1">Default</p>
      </div>
      <div className="text-center">
        <Icon icon={FaStar} $size="lg" />
        <p className="text-xs mt-1">LG</p>
      </div>
      <div className="text-center">
        <Icon icon={FaStar} $size="xl" />
        <p className="text-xs mt-1">XL</p>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Icon
          icon={FaCheck}
          $colorScheme="default"
          $size="lg"
          onClick={() => alert('Success!')}
        />
        <p className="text-xs mt-1">Success</p>
      </div>
      <div className="text-center">
        <Icon
          icon={FaPlus}
          $colorScheme="default"
          $size="lg"
          onClick={() => alert('Add item!')}
        />
        <p className="text-xs mt-1">Add</p>
      </div>
      <div className="text-center">
        <Icon
          icon={FaDownload}
          $colorScheme="default"
          $size="lg"
          onClick={() => alert('Download!')}
        />
        <p className="text-xs mt-1">Download</p>
      </div>
      <div className="text-center">
        <Icon
          icon={FaArrowRight}
          $colorScheme="default"
          $size="lg"
          onClick={() => alert('Next!')}
        />
        <p className="text-xs mt-1">Next</p>
      </div>
    </div>
  ),
};

export const IconLibraries: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      <div>
        <h3 className="font-medium mb-2">Font Awesome</h3>
        <div className="flex gap-2">
          <Icon icon={FaHeart} $colorScheme="destructive" />
          <Icon icon={FaUser} $colorScheme="default" />
          <Icon icon={FaCog} $colorScheme="secondary" />
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Heroicons</h3>
        <div className="flex gap-2">
          <Icon icon={HiOutlineSparkles} $colorScheme="default" />
          <Icon icon={HiOutlineFire} $colorScheme="destructive" />
          <Icon icon={HiOutlineHeart} $colorScheme="destructive" />
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Mixed Usage</h3>
        <div className="flex gap-2">
          <Icon icon={FaStar} $colorScheme="default" />
          <Icon icon={HiOutlineSparkles} $colorScheme="default" />
          <Icon icon={FaCheck} $colorScheme="default" />
        </div>
      </div>
    </div>
  ),
};










