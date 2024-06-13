import { task } from "../types/documents/task.document";
import { Task } from "../models/task.model";
export class mainTask {
  constructor() {}
  getTask = async (_id: string) => {
    return Task.findById(_id);
  };
  saveTask = async (task: task) => {
    return new Task(task).save();
  };
  updateTask = async (task: task) => {
    return Task.findByIdAndUpdate(task._id, task, { new: true });
  };
  deleteTask = async (_id: string) => {
    return Task.findByIdAndDelete(_id);
  };
  getAllTasks = async () => {
    return Task.find();
  };
}
