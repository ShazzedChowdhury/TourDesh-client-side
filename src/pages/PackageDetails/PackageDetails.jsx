import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import AllTourGuides from "./AllTourGuides";
import BookingForm from "./BookingForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const PackageDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const { width, height } = useWindowSize();

  // Fetch package details
  const { data: pkg = {}, isLoading } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`packages/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    try {
      const fetchBookings = async () => {
        const res = await axiosSecure(`/bookings?email=${user.email}`);
        setBookings(res.data);
      };

      fetchBookings();
    } catch (err) {
      console.log(err.message);
    }
  }, [user, refetch]);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (isLoading) return <p>Loading...</p>;
  console.log(pkg.tourPlans);
  return (
    <div className="max-w-6xl mx-auto p-6">
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
      <BookingForm
        bookings={bookings}
        setRefetch={setRefetch}
        pkg={pkg}
        setShowConfetti={setShowConfetti}
      />

      {showConfetti && (
        <div className="fixed top-0 right-0 w-full h-screen z-100">
          <Confetti width={width} height={height} />
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
