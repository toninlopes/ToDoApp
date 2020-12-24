import {ITask, IUser} from '../types';

const HOST = 'https://jsonplaceholder.typicode.com';
const USER_PATH = `${HOST}/users`;
const TASK_PATH = `${HOST}/posts`;

/**
 * Fetchs the users from the server.
 */
const fetchUsersAsync = async (): Promise<Array<IUser>> => {
  try {
    const response = await fetch(`${USER_PATH}`);
    const users = await response.json();
    return users as Array<IUser>;
  } catch (error) {
    console.log(
      `fetchUsersAsync (ERROR) - ${JSON.stringify(error.message, null, 2)}`,
    );
    throw error;
  }
};

/**
 * Fetchs all tasks of specific user from the server.
 * @param userId
 */
const fetchTasksAsync = async (userId: number): Promise<Array<ITask>> => {
  try {
    const endpoint = `${TASK_PATH}?userId=${userId}`;
    const response = await fetch(endpoint);
    const posts = await response.json();
    return posts as Array<ITask>;
  } catch (error) {
    console.log(
      `fetchTasksAsync (ERROR) - ${JSON.stringify(error.message, null, 2)}`,
    );
    throw error;
  }
};

/**
 * Deletes task by id.
 * @param taskId
 */
const deleteTaskAsync = async (taskId: number): Promise<boolean> => {
  try {
    const requestInit = {method: 'DELETE'};
    const response = await fetch(`${TASK_PATH}/${taskId}`, requestInit);
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(
      `deleteTaskAsync (ERROR) - ${JSON.stringify(error.message, null, 2)}`,
    );
    throw error;
  }
  return false;
};

/**
 * Saves new task on the server.
 * @param task
 */
const saveTaskAsync = async (task: ITask): Promise<ITask> => {
  try {
    const requestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(task),
    };
    const response = await fetch(`${TASK_PATH}`, requestInit);
    const newTask = await response.json();
    return newTask as ITask;
  } catch (error) {
    console.log(
      `const saveTaskAsync = async (post: any) => {
        (ERROR) - ${JSON.stringify(error.message, null, 2)}`,
    );
    throw error;
  }
};

export {fetchUsersAsync, fetchTasksAsync, deleteTaskAsync, saveTaskAsync};
