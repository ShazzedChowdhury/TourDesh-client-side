import React, { useState } from 'react';
import UserProfile from "../components/UserProfile/UserProfile.jsx"

const LoggedIn = ({ handleUserLogOut }) => {
  const [isOpen, setOpen] = useState(false);
  

  return (
    <>
      <UserProfile
        onClick={() => setOpen((prev) => !prev)}
        isOpen={isOpen}
        handleUserLogOut={handleUserLogOut}
      />
    </>
  );
};

export default LoggedIn;