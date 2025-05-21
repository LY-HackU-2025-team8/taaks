import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import '../src/fonts.css';
import '../src/index.css';
import { tanstackRouterDecorator } from './decorators/tanstack-router';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    backgrounds: {
      default: 'background',
      values: [
        {
          name: 'background',
          value: 'var(--background)',
        },
        {
          name: 'foreground',
          value: 'var(--foreground)',
        },
      ],
    },
    darkMode: {
      classTarget: 'html',
      stylePreview: true,
      darkClass: 'dark',
      lightClass: 'light',
    },
  },
  decorators: [tanstackRouterDecorator],
};

export default preview;
