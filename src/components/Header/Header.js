import React from "react";
import { Link } from "react-router-dom";
import { GrMenu } from "react-icons/gr";

const Header = () => {
  const menu = (
    <>
      <li>
        <Link>Home</Link>
      </li>
      <li>
        <Link>Portfolio</Link>
      </li>
      <li>
        <Link to="/login" className="btn">
          Log In
        </Link>
      </li>
    </>
  );
  return (
    <header className="bg-base-200">
      <div className="navbar  container mx-auto">
        <div className="navbar-start">
          <Link
            to="/home"
            className="text-2xl md:text-3xl font-bold text-rose-500 hover:text-red-600 duration-200"
          >
            BikroyStore
          </Link>
        </div>

        <div className="navbar-end">
          <div className="dropdown md:hidden">
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

          <ul className="items-center gap-8 text-[17px] font-semibold hidden md:flex">
            {menu}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
