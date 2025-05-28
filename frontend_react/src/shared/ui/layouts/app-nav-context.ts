import { createContext } from 'react';

/** AppNav制御のためのコンポーネント */
export const AppNavContext = createContext<{
  /** AppNavを非表示にする */
  hideAppNav: () => void;
  /** AppNavを表示する */
  showAppNav: () => void;
}>({
  hideAppNav: () => {},
  showAppNav: () => {},
});
