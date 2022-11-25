import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../contextApi/AuthProvider";
import useSeller from "../../Hooks/useSeller";
import useAdmin from "./../../Hooks/useAdmin";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const [isAdmin] = useAdmin(email);
  const [isSeller] = useSeller(email);
  return (
    <div>
      <Header></Header>
      <div className="drawer drawer-mobile gap-4 py-5 w-[80%] mx-auto">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-white p-5">
          <Outlet></Outlet>
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li className="bg-base-300 rounded-md mb-2">
              <Link to="/dashboard/mybooking">My Booking</Link>
            </li>

            {isAdmin && (
              <>
                <li className="bg-base-300 rounded-md mb-2">
                  <Link to="/dashboard/allusers">All Users</Link>
                </li>
                <li className="bg-base-300 rounded-md mb-2">
                  <Link to="/dashboard/allbuyer">All Buyers</Link>
                </li>
                <li className="bg-base-300 rounded-md mb-2">
                  <Link to="/dashboard/allseller">All Seller</Link>
                </li>
                <li className="bg-base-300 rounded-md mb-2">
                  <Link to="/dashboard/repotedproducts">Reported Products</Link>
                </li>
              </>
            )}

            {isSeller && (
              <>
                <li className="bg-base-300 rounded-md mb-2">
                  <Link to="/dashboard/addproduct">Add Product</Link>
                </li>
                <li className="bg-base-300 rounded-md mb-2">
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
