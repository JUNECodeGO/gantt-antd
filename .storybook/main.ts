/** @format */

import type {StorybookConfig} from '@storybook/react-vite';
const {mergeConfig} = require('vite');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config, {configType}) {
    // return the customized config
    return mergeConfig(config, {
      css: {
        preprocessorOptions: {
          less: {
            math: 'always',
            relativeUrls: true,
            javascriptEnabled: true,
          },
        },
      },
    });
  },
};
export default config;
