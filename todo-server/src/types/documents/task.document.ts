import { Document } from "mongoose";

export interface task extends Document {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}
