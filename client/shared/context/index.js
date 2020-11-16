import { createContext } from 'react';

export const UserContext = createContext({
  activePage: null,
  user: null
});

export const PageContext = createContext({
  setIsLoading: () => {},
});
