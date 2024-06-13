import { model, Schema } from "mongoose";
import { task } from "../types/documents/task.document";

const taskSchema = new Schema(
  {
    title: String,
    description: String,
    isCompleted: Boolean,
  },
  { timestamps: true }
);


export const Task = model<task>("Task", taskSchema);
