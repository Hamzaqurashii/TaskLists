import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import TaskProvider from "./redux/TaskProvider";
import { Box } from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <TaskProvider>
        <Box sx={{ marginX: { xs: 2, md: 32, lg: 24 } }}>
          <Outlet />
        </Box>
      </TaskProvider>
    </Provider>
  );
}

export default App;
