import React from 'react';
import { NavLink } from 'react-router';
import './navbar.css'
import NotLoggedIn from '../NotLoggedIn';
import LoggedIn from '../LoggedIn';
import LifeDrop from '../../shared/LifeDrop/LifeDrop';
import sweetMessage from "../../Utils/sweetMessage.js"
import useAuth from '../../hooks/useAuth.jsx';

const Navbar = () => {
    const { user, setUser, logOut } = useAuth();

  console.log(user)
    const handleUserLogOut = () => {
      logOut()
        .then(() => {
          sweetMessage("logged out successfully", "success");
          setUser(null);
        })
        .catch((error) => {
          sweetMessage("Somethings went wrong. try again.");
        });
    };


    const links = (
      <>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/donation-ruquests">Donation Requests</NavLink>
        </li>
        <li>
          <NavLink to="/blogs">Blogs</NavLink>
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
        {user && (
          <li>
            <NavLink to="/pending-assignments">Funding</NavLink>
          </li>
        )}
        {!user && (
          <>
            <li>
              <NavLink to="/sign-in" className="block md:hidden">
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="block md:hidden">
                Register
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <li>
            <button onClick={handleUserLogOut} className="block md:hidden">
              Logout
            </button>
          </li>
        )}
      </>
    );
    return (
      <div className="navbar bg-base-100 shadow-sm px-5 py-5 md:px-30">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="flex gap-1 items-center">
            <LifeDrop />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-5">
          {user ? (
            <LoggedIn handleUserLogOut={handleUserLogOut} />
          ) : (
            <NotLoggedIn />
          )}
        </div>
      </div>
    );
};

export default Navbar;