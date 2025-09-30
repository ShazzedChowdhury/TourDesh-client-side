import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../shared/loading';
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const OurPackagesTab = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
  // Fetch random 3 packages
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["randomPackages"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/packages/random?limit=3");
      return data;
    },
  });

  if(isLoading) return <Loading />
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {packages.map((pkg) => (
        <div
          key={pkg._id}
          className=" bg-base-100 rounded-lg shadow hover:shadow-lg p-4"
        >
          <div className="mb-4">
            <Swiper spaceBetween={10} slidesPerView={1}>
              {pkg.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={pkg.title}
                    className="w-full h-48 object-cover rounded"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <h3 className="text-lg font-bold">{pkg.title}</h3>
          <p className="text-sm text-gray-600">{pkg.location}</p>
          <p className="text-primary font-semibold mt-2">Price: ${pkg.price}</p>
          <button
            onClick={() => navigate(`/package-details/${pkg._id}`)}
            className="btn btn-primary btn-sm mt-3"
          >
            View Package
          </button>
        </div>
      ))}
    </div>
  );
};

export default OurPackagesTab;