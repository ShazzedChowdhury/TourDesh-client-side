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
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import { FaMapMarkerAlt, FaDollarSign, FaInfoCircle } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

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
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // 🧭 Fetch package details
  const { data: pkg = {}, isLoading } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`packages/${id}`);
      return res.data;
    },
  });

  // 🧾 Fetch user bookings
  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      try {
        const res = await axiosSecure(`/bookings?email=${user.email}`);
        setBookings(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchBookings();
  }, [user, refetch]);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 mt-[80px]">
      {/* === Main Overview Section (Images + Details Side by Side) === */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100 shadow-lg p-6 rounded-xl">
        {/* Left: Image Slider */}
        <div>
          <Swiper
            spaceBetween={10}
            // navigation={true}
            pagination={{ clickable: true }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Pagination, Thumbs]}
            className="rounded-xl"
          >
            {pkg.images?.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Package image ${idx + 1}`}
                  className="w-full h-[400px] object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="mt-3"
          >
            {pkg.images?.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full h-20">
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg cursor-pointer opacity-80 hover:opacity-100 border border-base-300"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right: Package Info */}
        <div className="flex flex-col justify-start space-y-4">
          <h1 className="text-3xl font-bold">{pkg.title}</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-primary" />
            <span>{pkg.location}</span>
          </div>
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <FaDollarSign className="text-primary" />${pkg.price}
          </div>
          <div className="flex items-start gap-3 text-gray-700">
            <FaInfoCircle className="mt-1 text-primary" />
            <p className="leading-relaxed">{pkg.description}</p>
          </div>
        </div>
      </section>

      {/* === Tour Guides & Booking Section === */}
      <AllTourGuides />
      <BookingForm
        bookings={bookings}
        setRefetch={setRefetch}
        pkg={pkg}
        setShowConfetti={setShowConfetti}
      />

      {/* Confetti on Booking */}
      {showConfetti && (
        <div className="fixed top-0 right-0 w-full h-screen z-50">
          <Confetti width={width} height={height} />
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
