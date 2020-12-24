// import React from 'react';
// import {shallow} from 'enzyme';
import {Actions} from '../../src/hooks';
import {ITask} from '../../src/types';

describe('Actions', () => {
  it('Task Constants', () => {
    expect(Actions.TaskActions.ADD_TASKS).toMatch('ADD_TASKS');
    expect(Actions.TaskActions.ADD_NEW_TASK).toMatch('ADD_NEW_TASK');
    expect(Actions.TaskActions.SET_DONE).toMatch('SET_DONE');
    expect(Actions.TaskActions.DELETE_TASK).toMatch('DELETE_TASK');
  });

  it('Task Actions', () => {
    const tasks = new Array<ITask>();
    const addTasksResult = Actions.TaskActions.addTasks(tasks);
    expect(addTasksResult.type).toMatch(Actions.TaskActions.ADD_TASKS);

    const task: ITask = {
      id: 0,
      userId: 1,
      title: 'Title',
      completed: false,
    };
    const addNewTaskResult = Actions.TaskActions.addNewTask(task);
    expect(addNewTaskResult.type).toMatch(Actions.TaskActions.ADD_NEW_TASK);

    const setDoneResult = Actions.TaskActions.setDone({
      ...task,
      completed: true,
    });
    expect(setDoneResult.type).toMatch(Actions.TaskActions.SET_DONE);

    const deleteTaskResult = Actions.TaskActions.deleteTask(task);
    expect(deleteTaskResult.type).toMatch(Actions.TaskActions.DELETE_TASK);
  });
});
