import { task } from "../types/documents/task.document";
import {
  deleteReqTask,
  getReqTask,
  saveReqTask,
  updateReqTask,
} from "../types/requests/task.request";
import { taskResponse } from "../types/responses/task.response";
import { mainTask } from "../repositories/task.repository";
import CustomError from "../utils/error";
import {
  Get,
  Put,
  Post,
  Delete,
  Route,
  Tags,
  Body,
  Path,
  Query,
  SuccessResponse,
} from "tsoa";

@Route("task")
@Tags("task")
export class TaskController {
  constructor() {}
  @Post("/getTask")
  async getTask(@Body() getReq: getReqTask): Promise<taskResponse> {
    const Task: task | any = await new mainTask().getTask(getReq._id);
    if (Task === null) throw new CustomError(404, "Task not found");
    return <taskResponse>Task;
  }
  @Post("/saveTask")
  async saveTask(@Body() saveReq: saveReqTask): Promise<taskResponse> {
    const Task: task = await new mainTask().saveTask(<task>saveReq);
    return <taskResponse>Task;
  }
  @Put("/updateTask")
  async updateTask(@Body() updateReq: updateReqTask): Promise<taskResponse> {
    const Task: task | any = await new mainTask().updateTask(<task>updateReq);
    if (Task === null) throw new CustomError(404, "task not found");
    return <taskResponse>Task;
  }
  @Delete("/deleteTask/{_id}")
  @SuccessResponse("200", "data deleted")
  async deleteTask(@Path('_id') getReq: string): Promise<taskResponse> {
    const data = await new mainTask().deleteTask(getReq);
    return <taskResponse>data;
  }
  @Get("/getAllTasks")
  async getAllTasks(): Promise<taskResponse[]> {
    const Task: task[] = await new mainTask().getAllTasks();
    return <taskResponse[]>Task;
  }
}
