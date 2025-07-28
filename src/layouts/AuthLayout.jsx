import React from 'react';
import { Outlet } from 'react-router';
import { BsArrowLeft } from "react-icons/bs";
import SignInAnimation from '../shared/SignInAnimation';

const AuthLayout = () => {
    return (
      <section className="min-h-screen flex justify-center items-center px-5 md:px-0 py-10">
        <div className="h-fit max-w-4xl md:p-10">
          <div>
            <button
              className="btn bg-transparent border-0 shadow-none"
              title="Go back"
              onClick={() => navigate("/")}
            >
              <BsArrowLeft size={25} className="text-primary" />
            </button>
          </div>
          <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse gap-10 p-0">
              <div className="text-center lg:text-left">
                <SignInAnimation />
              </div>
              <div className="card w-full max-w-md shrink-0">
                <div className="card-body p-0">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default AuthLayout;