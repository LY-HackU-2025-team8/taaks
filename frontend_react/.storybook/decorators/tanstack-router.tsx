import type { Decorator } from '@storybook/react';
import { QueryClient } from '@tanstack/react-query';
import { RouterContextProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from '../../src/route-tree.gen';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

export const tanstackRouterDecorator: Decorator = (Story) => {
  return (
    <RouterContextProvider router={router}>
      <Story />
    </RouterContextProvider>
  );
};
