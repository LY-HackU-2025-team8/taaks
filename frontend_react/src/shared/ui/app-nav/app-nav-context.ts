import { createContext } from 'react';

export const AppNavContext = createContext<{
  setHidden?: React.Dispatch<React.SetStateAction<boolean>>;
}>({});
