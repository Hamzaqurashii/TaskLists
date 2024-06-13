import express from "express";

import { TaskRouteApi } from "./task.routes";
export class MainRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.use("/task", TaskRouteApi);
  }
}
export const MainApi = new MainRouter().router;
