// components/Tasks.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/taskSlice";
import { AppDispatch, RootState } from "../redux/store";
import Task from "./Task";
import { ITask } from "../interface";
import { Typography } from "@mui/material";

const Tasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const error = useSelector((state: RootState) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Typography variant="h3" mt={6} color={"#6F4E37"}>
        Task List
      </Typography>
      <ul>
        {tasks.map((task: ITask, index: number) => (
          <Task task={task} index={index} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
