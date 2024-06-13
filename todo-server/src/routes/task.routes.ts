import express from "express";
import CustomError from "../utils/error";
import { task } from "../types/documents/task.document";
import {
  deleteReqTask,
  getReqTask,
  saveReqTask,
  updateReqTask,
} from "../types/requests/task.request";
import { taskResponse } from "../types/responses/task.response";
import { TaskController } from "../controllers/task.controller";

class TaskRoute {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.route();
  }
  route() {
    this.router.post("/saveTask", async (req, res, next) => {
      try {
        const reqTask: saveReqTask = req.body;
        console.log(req.body, "sssssq");
        const Task: taskResponse = await new TaskController().saveTask(reqTask);
        res.send(Task);
      } catch (error) {
        console.log(error);
      }
    });

    this.router.put("/updateTask/:_id", async (req, res, next) => {
      try {
        const reqTask: updateReqTask = { ...req.body, _id: req.params._id };
        const Task: updateReqTask = await new TaskController().updateTask(
          reqTask
        );
        res.send(Task);
      } catch (error) {
        next(new CustomError(404, "task id not found"));
      }
    });

    this.router.delete(
      "/deleteTask/:_id",
      async (req: any, res: any, next: any) => {
        try {
          const reqTask: deleteReqTask = {
            _id: req.params._id,
          };
          const Task: deleteReqTask | any =
            await new TaskController().deleteTask(reqTask._id);
          res.send(Task);
        } catch (error) {
          next(new CustomError(404, "task id not found"));
        }
      }
    );
    this.router.get("/getAllTasks", async (req: any, res: any, next: any) => {
      try {
        const Task = await new TaskController().getAllTasks();
        res.send(Task);
      } catch (error) {
        next(new CustomError(404, "task id not found"));
      }
    });
  }
}

export const TaskRouteApi = new TaskRoute().router;
