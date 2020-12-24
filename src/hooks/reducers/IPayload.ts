import {ITask} from '../../types';

export default interface IPayload {
  tasks: Array<ITask>;
  newTask: ITask | undefined;
  doneTask: ITask | undefined;
  deleteTask: ITask | undefined;
}
