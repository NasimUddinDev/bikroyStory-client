import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../contextApi/AuthProvider";
import useSeller from "../../Hooks/useSeller";
import useAdmin from "./../../Hooks/useAdmin";
import { GrMenu } from "react-icons/gr";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const [isAdmin] = useAdmin(email);
  const [isSeller] = useSeller(email);
  return (
    <div>
      <Header></Header>

      <div className="drawer drawer-mobile gap-4 py-5 w-[80%] mx-auto ">
        <input id="dasboard-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          <label
            htmlFor="dasboard-drawer"
            className="lg:hidden btn btn-accent w-[180px]"
          >
            <div className="flex items-center text-white">
              <p>
                <GrMenu className="text-2xl" />
              </p>
              <p>Dashboard Menu</p>
            </div>
          </label>

          <div className=" bg-gray-100 rounded-md md:px-4">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side bg-gray-100 rounded-md mt-12 lg:mt-0">
          <label htmlFor="dasboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80  text-base-content">
            <li className="bg-teal-600 text-white font-semibold rounded-md mb-2">
              <Link to="/dashboard/mybooking">My Booking</Link>
            </li>

            {isAdmin && (
              <>
                <li className="bg-teal-600 text-white font-semibold rounded-md mb-2">
                  <Link to="/dashboard/allusers">All Users</Link>
                </li>
                <li className="bg-teal-600 text-white font-semibold rounded-md mb-2">
                  <Link to="/dashboard/allbuyer">All Buyers</Link>
                </li>
                <li className="bg-teal-600 text-white font-semibold rounded-md mb-2">
                  <Link to="/dashboard/allseller">All Seller</Link>
                </li>
                <li className="bg-teal-600 text-white font-semibold rounded-md mb-2">
                  <Link to="/dashboard/repotedproducts">Reported Products</Link>
                </li>
              </>
            )}

            {isSeller && (
              <>
                <li className="bg-teal-600 text-white font-semibold rounded-md mb-2">
                  <Link to="/dashboard/addproduct">Add Product</Link>
                </li>
                <li className="bg-teal-600 text-white font-semibold rounded-md mb-2">
                  <Link to="/dashboard/myproducts">My Products</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
