import { createBrowserRouter } from "react-router-dom";
import AllBuyer from "../Dashboard/AdminDashboard/AllBuyer/AllBuyer";
import AllSeller from "../Dashboard/AdminDashboard/AllSeller/AllSeller";
import AllUser from "../Dashboard/AdminDashboard/AllUser/AllUser";
import RepotedProducts from "../Dashboard/AdminDashboard/RepotedProducts/RepotedProducts";
import MyBooking from "../Dashboard/BuyerDashboard/MyBokking/MyBooking";
import AddProduct from "../Dashboard/SellerDashboard/AddProduct/AddProduct";
import MyProducts from "../Dashboard/SellerDashboard/MyProducts/MyProducts";
import DashboardLayout from "../Layout/Dashboard/DashboardLayout";
import Main from "../Layout/Main/Main";
import Blog from "../page/Blog/Blog";
import Category from "../page/Category/Category";
import ErrorPage from "../page/ErrorPage/ErrorPage";
import Home from "../page/Home/Home/Home";
import Login from "../page/Login/Login";
import AdminRoute from "../PrivateRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../PrivateRoute/SellerRoute/SellerRoute";
import Signup from "./../page/Signup/Signup";

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
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/categorys/:id",
        element: (
          <PrivateRoute>
            <Category></Category>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/categorys/${params.id}`),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MyBooking></MyBooking>,
      },
      {
        path: "/dashboard/mybooking",
        element: <MyBooking></MyBooking>,
      },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUser></AllUser>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allbuyer",
        element: (
          <AdminRoute>
            <AllBuyer></AllBuyer>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allseller",
        element: (
          <AdminRoute>
            <AllSeller></AllSeller>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/repotedproducts",
        element: (
          <AdminRoute>
            <RepotedProducts></RepotedProducts>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addproduct",
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/myproducts",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
    ],
  },
]);

export default router;
