import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../shared/loading';
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { motion } from "framer-motion";
import { SlLocationPin } from "react-icons/sl";

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
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {packages.map((pkg) => (
        <div
          key={pkg._id}
          className=" bg-base-100 rounded-lg shadow hover:shadow-lg p-4 flex flex-col justify-between"
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
          <h3 className="text-sm sm:text-lg font-bold">{pkg.title}</h3>
          <p className="text-[0.6rem] sm:text-lg text-gray-600 flex gap-2 items-center">
            <SlLocationPin />
            {pkg.location}
          </p>
          <div className="flex justify-between gap-4 items-center">
            <p className="text-primary text-[0.7rem] sm:text-lg font-semibold mt-2">
              Price: ${pkg.price}
            </p>
            <button
              onClick={() => navigate(`/package-details/${pkg._id}`)}
              className="btn btn-primary btn-sm mt-3"
            >
              Explore
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default OurPackagesTab;