import {initializers} from '../../src/hooks';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => [{...initializers}, ''],
}));
