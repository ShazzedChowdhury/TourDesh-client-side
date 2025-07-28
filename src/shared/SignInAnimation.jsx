import React from "react";
import Lottie from "lottie-react";
import signInAnimation from "../assets/animation/signInAnimation.json";

const SignInAnimation = () => {
  return (
    <div className="max-w-md w-full">
      <Lottie animationData={signInAnimation} loop={true} />
    </div>
  );
};

export default SignInAnimation;
