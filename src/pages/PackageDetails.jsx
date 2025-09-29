import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosPublic from '../hooks/axiosPublic';
import AllTourGuides from '../shared/PackageDetails/AllTourGuides';
import BookingForm from '../shared/PackageDetails/BookingForm';

const PackageDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
const [activeIndex, setActiveIndex] = useState(null);

  // Fetch package details
  const { data: pkg = {}, isLoading } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`packages/${id}`);
      return res.data;
    },
  });

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  if (isLoading) return <p>Loading...</p>;
  console.log(pkg.tourPlans)
  return (
    <div className="max-w-6xl mx-auto p-6 ">
      {/* Gallery Section */}
      <section className="mb-10 bg-base-100 shadow-lg p-5 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {pkg.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`gallery-${idx}`}
              className="w-full h-64 object-cover rounded-lg shadow"
            />
          ))}
        </div>
      </section>

      {/* Package Info Section */}
      <section className=" bg-base-100 shadow-lg p-5 rounded-md">
        <h1 className="text-3xl font-bold mb-2">{pkg.title}</h1>
        <p className="text-gray-600 mb-2">{pkg.location}</p>
        <p className="text-lg font-semibold mb-4">${pkg.price}</p>
        <p className="text-gray-700">{pkg.description}</p>
      </section>

      {/* Tour Plan Section */}
      <section className="bg-base-100 shadow-lg p-5 rounded-lg mt-5">
        <h2 className="text-2xl font-bold mb-4">Tour Plan</h2>
        {/* Accordion */}
        <div className="space-y-3">
          {pkg?.tourPlans?.map((plan, idx) => (
            <div key={idx} className="">
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full px-4 py-3 text-left flex justify-between items-center font-semibold"
              >
                {plan.day}
                <span>{activeIndex === idx ? "-" : "+"}</span>
              </button>
              {activeIndex === idx && (
                <div className="px-4 py-3 bg-white">
                  <p>{plan.plan}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <AllTourGuides />
      <BookingForm pkg={pkg} />
    </div>
  );
};

export default PackageDetails;