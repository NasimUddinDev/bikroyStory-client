import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Category from "../page/Category/Category";
import Home from "../page/Home/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/categorys/:id",
        element: <Category></Category>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/categorys/${params.id}`),
      },
    ],
  },
]);

export default router;
