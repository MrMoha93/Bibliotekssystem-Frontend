import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainView from "./MainView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <MainView /> }],
  },
]);

export default router;
