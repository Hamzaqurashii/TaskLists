import Task from "./Task";
import { ITask } from "../interface";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export default function Tasks() {
  const tasks: ITask[] = useSelector((state: RootState) => state.tasks);

  return (
    <ul role="list" className=" container divide-gray-100">
      {tasks.length === 0 && (
        <p className="text-red-600 text-4xl text-center">No Task Found</p>
      )}
      {tasks.map((task, index) => (
        <Task task={task} index={index} key={index} />
      ))}
    </ul>
  );
}
