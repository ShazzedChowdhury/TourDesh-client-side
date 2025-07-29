import React from 'react';
import { Link, NavLink } from 'react-router';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useAuth from '../../hooks/useAuth';

const UserProfile = ({ onClick, isOpen, handleUserLogOut }) => {
  const { user } = useAuth();
  return (
    <>
      <div onClick={onClick} className="avatar">
        <div
          data-tooltip-id="user-profile"
          data-tooltip-content={user?.displayName}
          className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2"
        >
          <img src={user?.photoURL} />
        </div>
      </div>
      <Tooltip id="user-profile" place="bottom-start" />
      {isOpen && (
        <ul className="p-2 bg-base-100 rounded-sm absolute top-20 right-5 md:right-20 shadow-sm z-10">
          <li>
            <NavLink
              to="/dashboard"
              className="p-1 rounded-sm block"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <button
            id='log-out'
              onClick={handleUserLogOut}
              className="w-full"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default UserProfile;