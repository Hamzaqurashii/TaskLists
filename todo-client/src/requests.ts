import { url, endpoint } from "./endpoint";
import { IAddTask } from "./interface";

export const getAll = async () => {
  const get_tasks = await fetch(`${url}/${endpoint.getAll}`);
  const response = await get_tasks.json();

  return response;
};
export const AddTask = async (task: IAddTask) => {
  console.log(task, "sswewewcdfsdaf");
  const add_task = await fetch(`${url}/${endpoint.create}`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: { "Content-Type": "application/json" },
  });
  const response = await add_task.json();

  return response;
};

export const delTask = async (id: string) => {
  const delete_task = await fetch(`${url}/${endpoint.delete}/${id}`, {
    method: "Delete",
  });
  const response = await delete_task.json();
  console.log(response, "delete response");
  return JSON.stringify(response);
};
export const update_task = async (id: string) => {
  const updte_task = await fetch(`${url}/${endpoint.update}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ isCompleted: true }),
    headers: { "Content-Type": "application/json" },
  });
  const response = await updte_task.json();
  console.log(response, "update response");
  return response;
};
