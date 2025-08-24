import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ['@storybook/blocks'],
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src'),
          'next/image': resolve(__dirname, '../src/__mocks__/next/image.tsx'),
          'next/link': resolve(__dirname, '../src/__mocks__/next/link.tsx'),
        },
      },
    });
  },
};
export default config;

