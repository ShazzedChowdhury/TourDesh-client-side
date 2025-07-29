import React from 'react';
import { BiSolidBadgeCheck } from "react-icons/bi";
import bloodImage from "../../../assets/images/blood-drop.png";
import { useNavigate } from 'react-router';


const BannerSection = () => {
    const navigate = useNavigate();
    return (
      <section className=" bg-gradient-to-br from-[#ffffff] to-[#f0f4ff] dark:from-[#1d232a] dark:to-[##1a1f26]">
        <div className="flex flex-col-reverse md:flex-row py-10 gap-10 items-center justify-between max-w-7xl mx-auto px-5 md:px-10 h-auto md:h-[calc(100vh-89px)]">
          <div className="space-y-5">
            <h1 className="text-3xl md:text-5xl font-bold">
              Give the Gift of Life <br /> Donate Blood
            </h1>
            <p className="text-lg font-semibold text-gray-400">
              Blood is something money can't buy but every human can give. Be
              the reason <br /> someone lives another day.
            </p>

            <div className="flex gap-5 items-center">
              <button
                onClick={() => navigate("/register")}
                className="btn  btn-primary"
              >
                Join as a donor
              </button>
              <button
                onClick={() => navigate("/search")}
                className="btn btn-outline btn-primary"
              >
                Search Donors
              </button>
            </div>
          </div>

          <div className="max-w-sm w-full relative z-1  overflow-hidden">
            <img
              src={bloodImage}
              alt="banner image"
              className="object-cover object-top w-full"
            />
          </div>
        </div>
      </section>
    );
};

export default BannerSection;