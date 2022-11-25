import React, { useContext } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { GrMenu } from "react-icons/gr";
import { AuthContext } from "../../contextApi/AuthProvider";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const menu = (
    <>
      <li>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : "text-black")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li>
        {user ? (
          <>
            <NavLink to="/dashboard" className="mr-8">
              Dashboard
            </NavLink>
            <button onClick={logout} className="btn btn-accent">
              Log Out
            </button>
          </>
        ) : (
          <NavLink to="/login" className="btn btn-accent">
            Log In
          </NavLink>
        )}
      </li>
    </>
  );
  return (
    <header className="bg-base-200 border-b border-teal-600">
      <div className="navbar w-[80%] mx-auto">
        <div className="navbar-start items-center gap-2">
          <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
            <GrMenu className="text-2xl" />
          </label>
          <Link
            to="/home"
            className="text-2xl md:text-3xl font-bold text-teal-700 hover:text-teal-600 duration-200"
          >
            BikroyStore
          </Link>
        </div>

        <div className="navbar-end">
          <div className="dropdown lg:hidden">
            <label tabIndex={0}>
              <GrMenu className="text-3xl" />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-4 p-2 shadow-lg bg-base-200 rounded-box w-52 right-0"
            >
              {menu}
            </ul>
          </div>

          <ul className="items-center gap-8 text-[17px] font-semibold hidden lg:flex">
            {menu}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
