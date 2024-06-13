import React from "react";
import { ITask } from "../interface";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteTaskAsync, updateTaskAsync } from "../redux/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

interface TaskProps {
  task: ITask;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  const dispatch = useDispatch<AppDispatch>();
  const updateLoading = useSelector(
    (state: RootState) => state.tasks.updateLoading
  );
  const deleteLoading = useSelector(
    (state: RootState) => state.tasks.deleteLoading
  );
  // const error = useSelector((state: RootState) => state.tasks.error);
  const removeTask = async (id: string) => {
    dispatch(deleteTaskAsync(id));
  };
  const UpdateTask = async (id: string) => {
    dispatch(updateTaskAsync(id));
  };

  return (
    <li
      key={task.description}
      className="flex flex-col md:flex-row justify-between gap-x-6 py-2"
    >
      <div className="flex min-w-0 gap-x-4">
        <p>{index + 1}</p>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {task.title}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {task.description}
          </p>
        </div>
      </div>
      <div className="gap-2 mt-5 flex flex-row sm:items-end">
        {task.isCompleted ? (
          <button className="bg-green-500 h-8 text-xs md:text-lg text-white px-2 py-1 rounded-sm">
            Completed
          </button>
        ) : updateLoading ? (
          <div>Loading</div>
        ) : (
          <button
            onClick={() => {
              UpdateTask(task._id);
            }}
            className="bg-yellow-500 h-8 text-xs md:text-lg text-black px-2 py-1 rounded-sm"
          >
            Mark as completed
          </button>
        )}

        {deleteLoading ? (
          <div>loading</div>
        ) : (
          <button
            onClick={() => {
              removeTask(task._id);
            }}
            className="bg-red-500 h-8 w-20 flex justify-center text-white px-2 py-1 rounded-sm"
          >
            <TrashIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        )}
      </div>
    </li>
  );
};

export default Task;
