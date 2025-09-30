import React from 'react';
import { Link } from 'react-router';

const TourDesh = () => {
    return (
        <Link to={"/"} className="text-2xl text-[#2E2E2E]">
          Tour<span className="font-bold text-primary">Desh</span>
        </Link>
    );
};

export default TourDesh;