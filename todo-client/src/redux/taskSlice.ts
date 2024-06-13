// taskSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../interface';

interface TasksState {
  tasks: ITask[];
}

const initialState: TasksState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task._id === action.payload);
      if (task) {
        task.isCompleted = true;
      }
    },
    getAllTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, deleteTask, updateTask, getAllTasks } = taskSlice.actions;
export default taskSlice.reducer;
