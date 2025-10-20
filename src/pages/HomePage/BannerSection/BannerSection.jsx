import React from "react";
import { BiSolidBadgeCheck } from "react-icons/bi";
import bannerImg from "../../../assets/images/Banner-img.png";
import { useNavigate } from "react-router";
import useRole from "../../../hooks/useRole";

const BannerSection = () => {
  const navigate = useNavigate();
  return (
    <div
      className="hero h-[700px]"
      style={{
        backgroundImage: "url(https://i.ibb.co/bggrrLq4/tour-Desh-banner.jpg)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content">
        <div className="space-y-5">
          <h1 className="text-3xl md:text-6xl font-bold">
            Discover <br />
            the <span className="text-[#3fd0d3]">World</span> with <br />{" "}
            Trusted Tour Guides
          </h1>
          <p className="text-lg font-semibold text-white lg:w-3/5">
            Turn every trip into an unforgettable adventure. Explore hidden
            gems, connect with local cultures, and enjoy stress-free travel with
            our experienced tour guides by your side
          </p>

          <div className="flex gap-5 items-center">
            <button
              onClick={() => navigate("/dashboard/join-as-tour-guide")}
              className="btn  btn-primary"
            >
              Join as tour guide
            </button>
            <button
              onClick={() => navigate("/all-trips")}
              className="btn btn-outline btn-primary"
            >
              All packages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
