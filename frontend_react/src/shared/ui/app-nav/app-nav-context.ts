import { createContext } from 'react';

export const AppNavContext = createContext<{
  hideAppNav: () => void;
  showAppNav: () => void;
}>({
  hideAppNav: () => {},
  showAppNav: () => {},
});
