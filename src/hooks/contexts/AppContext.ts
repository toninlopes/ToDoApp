import {createContext} from 'react';
import {IStates, initializers} from '..';

const AppContext = createContext<IStates>({
  ...initializers,
});

export default AppContext;
