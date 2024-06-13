// taskSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITask } from "../interface";
import { getAll, delTask, update_task } from "../requests";

interface TasksState {
  tasks: ITask[];
  loading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  updateLoading: false,
  error: null,
  deleteLoading: false,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await getAll();
  return response;
});

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    console.log(id, "del");
    const response = await delTask(id);
    console.log(response,'ssssssl');
    return id;
  }
);

export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async (id: string) => {
    console.log(id, "upda");
    const response = await update_task(id);
    console.log(response,'sssssslupda');

    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
    },
    getAllTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTasks.fulfilled,
        (state, action: PayloadAction<ITask[]>) => {
          state.loading = false;
          state.tasks = action.payload;
        }
      )
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(
        deleteTaskAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.deleteLoading = false;
          state.tasks = state.tasks.filter(
            (task) => task._id !== action.payload
          );
        }
      )
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.error.message || "Failed to delete task";
      })
      .addCase(updateTaskAsync.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(
        updateTaskAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.updateLoading = false;
          const task = state.tasks.find((task) => task._id === action.payload);
          if (task) {
            task.isCompleted = true;
          }
        }
      )
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.error.message || "Failed to update task";
      });
  },
});

export const { addTask, getAllTasks } = taskSlice.actions;
export default taskSlice.reducer;
