import { createContext } from 'react';

export const UserContext = createContext({
  activePage: null,
  user: null
});
