import Lottie from "lottie-react";
import React from "react";
import loadingAnimation from "../assets/animation/loadingAnimation.json";

const Loading = () => {
  return (
    <div className="py-20 flex justify-center min-h-screen">
      <Lottie className="w-xs" animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default Loading;
