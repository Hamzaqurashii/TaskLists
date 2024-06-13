import { ReactNode } from "react";

export interface ITask {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface IAddTask {
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface ITaskMethod {
  tasks: ITask[];
  getAllTasks: (tasks: ITask[]) => void;
  deleteTask: (_id: string) => void;
  addTask: (task: ITask) => void;
  updateTask: (string: string) => void;
}

export interface TaskProviderProps {
  children: ReactNode;
}

export interface DeleteTaskAction {
  type: "DELETE_TASK";
  payload: {
    _id: string;
  };
}
export interface UpdateTaskAction {
  type: "UPDATE_TASK";
  payload: {
    _id: string;
  };
}

export interface CreateTaskAction {
  type: "ADD_TASK";
  payload: ITask;
}
export interface getAllTasks {
  type: "GET_ALL_TASKS";
  payload: ITask[];
}

export type TaskAction =
  | DeleteTaskAction
  | UpdateTaskAction
  | CreateTaskAction
  | getAllTasks;
