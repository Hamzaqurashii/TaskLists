import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import TaskProvider from "./redux/TaskProvider";

function App() {
  return (
    <Provider store={store}>
      <TaskProvider>
        <div className="lg:mx-44 md:mx-32 mx-2">
          <Header />
          <Outlet />
        </div>
      </TaskProvider>
    </Provider>
  );
}

export default App;
