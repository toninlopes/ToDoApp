import * as Actions from './actions/';
import AppContext from './contexts/appContext';
import TasksReducer, {
  initialState as taskInitialState,
} from './reducers/taskReducer';
import IStates from './states/IStates';

const appReducers = (state: IStates, action: any) => {
  return {
    taskStates: TasksReducer(state.taskStates, action),
  };
};

const initializers = {
  taskStates: taskInitialState,
};

export {AppContext, Actions, appReducers, initializers};
export type {IStates};
