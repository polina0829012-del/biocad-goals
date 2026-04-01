/** @type { import('@storybook/react').Preview } */

import { BrowserRouter } from 'react-router-dom';
import '../src/global/styles/index.css';

const preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;
