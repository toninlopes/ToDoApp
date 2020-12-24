import {TaskActions} from '../actions';
import IPayload from './IPayload';
import {ITask} from '../../types';

export const initialState: IPayload = {
  tasks: new Array<ITask>(),
  newTask: undefined,
  doneTask: undefined,
  deleteTask: undefined,
};

const sortTasks = (a: ITask, b: ITask) => {
  if (a.completed) {
    return 1;
  }
  if (b.completed) {
    return -1;
  }
  return 0;
};

const taskReducer = (
  state: IPayload = initialState,
  action: {type: string; payload: IPayload},
): IPayload => {
  const {payload} = action;
  switch (action.type) {
    case TaskActions.ADD_TASKS:
      return {
        ...state,
        tasks: payload.tasks.sort(sortTasks),
      };
    case TaskActions.ADD_NEW_TASK: {
      const {newTask} = action.payload;
      const {tasks} = state;
      if (newTask !== undefined) {
        tasks.unshift(newTask);
      }
      return {
        ...state,
        tasks,
        newTask: undefined,
      };
    }
    case TaskActions.SET_DONE: {
      const {doneTask} = action.payload;
      const {tasks} = state;
      if (doneTask !== undefined) {
        const index = tasks.indexOf(doneTask);
        tasks[index].completed = true;
      }
      return {
        ...state,
        tasks: tasks.sort(sortTasks),
        doneTask: undefined,
      };
    }
    case TaskActions.DELETE_TASK: {
      const {deleteTask} = action.payload;
      const {tasks} = state;
      if (deleteTask !== undefined) {
        const index = tasks.indexOf(deleteTask);
        tasks.splice(index, 1);
      }
      return {
        ...state,
        tasks: tasks.sort(sortTasks),
        deleteTask: undefined,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default taskReducer;
