import React from 'react';
import { useNavigate } from 'react-router';

const NotLoggedIn = () => {
    const navigate = useNavigate();
    return (
      <>
        <button
          onClick={() => navigate("/register")}
          className="btn btn-soft btn-primary hidden md:block"
        >
          Register
        </button>
        <button
          onClick={() => navigate("/login")}
          className="btn btn-outline btn-primary hidden md:block"
        >
          Sign in
        </button>
      </>
    );
};

export default NotLoggedIn;