// store.ts
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
// import { composeWithDevTools } from "@redux-devtools/extension";

const store = configureStore({
  reducer: taskReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
