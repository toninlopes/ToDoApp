import {ITask} from '../../types';

export default class TaskActions {
  static get ADD_TASKS() {
    return 'ADD_TASKS';
  }

  static addTasks = (tasks: Array<ITask>) => {
    return {
      type: TaskActions.ADD_TASKS,
      payload: {
        tasks: tasks,
      },
    };
  };

  static get ADD_NEW_TASK() {
    return 'ADD_NEW_TASK';
  }

  static addNewTask = (task: ITask) => {
    return {
      type: TaskActions.ADD_NEW_TASK,
      payload: {
        newTask: task,
      },
    };
  };

  static get SET_DONE() {
    return 'SET_DONE';
  }

  static setDone = (task: ITask) => {
    return {
      type: TaskActions.SET_DONE,
      payload: {
        doneTask: task,
      },
    };
  };

  static get DELETE_TASK() {
    return 'DELETE_TASK';
  }

  static deleteTask = (task: ITask) => {
    return {
      type: TaskActions.DELETE_TASK,
      payload: {
        deleteTask: task,
      },
    };
  };
}
