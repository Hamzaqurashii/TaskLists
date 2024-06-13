// TaskProvider.tsx
import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { TaskProviderProps } from "../interface";
import { getAll } from "../requests";
import { getAllTasks } from "./taskSlice";

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const fetchTasks = useCallback(async () => {
    const tasks = await getAll();
    setTimeout(() => {
      dispatch(getAllTasks(tasks));
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return <>{children}</>;
};

export default TaskProvider;
