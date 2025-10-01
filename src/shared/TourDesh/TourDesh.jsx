import React from 'react';
import { Link, useNavigate } from 'react-router';

const TourDesh = () => {
    const navigate = useNavigate();
    return (
      <div onClick={() => navigate('/')} className="text-2xl text-[#2E2E2E]">
        Tour<span className="font-bold text-primary">Desh</span>
      </div>
    );
};

export default TourDesh;