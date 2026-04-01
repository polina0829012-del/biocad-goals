/** @type { import('@storybook/react-webpack5').StorybookConfig, import '../src/global/styles/index.css'; } */

const config = {
    stories: [ '../src/**/*.mdx', '../src/**/*.mdx'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    typescript: {
        check: true,
        reactDocgen: false,
    },
    docs: {
        autodocs: 'tag',
    },
};
export default config;
