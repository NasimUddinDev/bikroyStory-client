import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GrMenu } from "react-icons/gr";
import { AuthContext } from "../../contextApi/AuthProvider";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const menu = (
    <>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      <li>
        {user ? (
          <>
            <Link to="/dashboard" className="mr-8">
              My orders
            </Link>
            <button onClick={logout} className="btn">
              Log Out
            </button>
          </>
        ) : (
          <Link to="/login" className="btn">
            Log In
          </Link>
        )}
      </li>
    </>
  );
  return (
    <header className="bg-white">
      <div className="navbar w-[80%] mx-auto">
        <div className="navbar-start">
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
