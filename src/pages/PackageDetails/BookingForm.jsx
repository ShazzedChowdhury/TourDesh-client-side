import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import sweetMessage from '../../Utils/sweetMessage';
import { useWindowSize } from 'react-use';
import Swal from 'sweetalert2';


const BookingForm = ({ pkg, bookings, setRefetch, setShowConfetti }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const { register, handleSubmit, reset } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  //   const [windowDimensions, setWindowDimensions] = useState({
  //     width: window.innerWidth,
  //     height: window.innerWidth,
  //   });

  // Fetch tour guides for dropdown
  const { data: guides = [] } = useQuery({
    queryKey: ["tour-guides"],
    queryFn: async () => {
      const res = await axiosPublic.get("get-tour-guides");
      return res.data;
    },
  });

  // Handle resizing (so confetti always fits screen)
  //   useEffect(() => {
  //     const handleResize = () => {
  //       setWindowDimensions({
  //         width: window.innerWidth,
  //         height: window.innerHeight,
  //       });
  //     };
  //     window.addEventListener("resize", handleResize);
  //     return () => window.removeEventListener("resize", handleResize);
  //   }, []);

  const onSubmit = async (data) => {
    if (!user) {
      return navigate("/login"); // Protect booking
    }
    console.log(data.guideEmail);
    const booking = {
      packageId: pkg._id,
      packageName: pkg.title,
      touristName: user.displayName,
      touristEmail: user.email,
      touristImage: user.photoURL,
      price: pkg.price,
      tourDate: startDate,
      guideEmail: data.guideEmail,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    console.log(bookings.length);

    try {
      const res = await axiosPublic.post("bookings", booking);
      sweetMessage("Booking successfull.");
      if (res.data.insertedId) {
        reset();
        setRefetch(true);
        setTimeout(() => {
          if (bookings.length > 2) {
            setShowConfetti(true);
            Swal.fire(`Congratulation
                      You have booked ${bookings.length + 1}`
            ).then((result) => {
                if(result.isConfirmed) {
                     setShowConfetti(false);
                      setShowModal(true);
                }
            })
          }
        }, 1000);
      }
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-left">Book This Package</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-5">
          {/* Package Name */}
          <div>
            <label className="block mb-1 font-semibold">Package Name</label>
            <input
              type="text"
              value={pkg.title}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Tourist Name */}
          <div>
            <label className="block mb-1 font-semibold">Tourist Name</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Tourist Email */}
          <div>
            <label className="block mb-1 font-semibold">Tourist Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Tourist Image */}
          <div>
            <label className="block mb-1 font-semibold">Tourist Image</label>
            <input
              type="text"
              defaultValue={user?.photoURL}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-semibold">Price</label>
            <input
              type="text"
              value={`$${pkg.price}`}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Tour Date */}
          <div>
            <label className="block mb-1 font-semibold">Tour Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="input input-bordered w-full"
              dateFormat="yyyy-MM-dd"
              minDate={new Date()} // prevent past dates
            />
          </div>

          {/* Guide Name */}
          <div>
            <label className="block mb-1 font-semibold">Tour Guide</label>
            <select
              {...register("guideEmail")}
              className="select select-bordered w-full"
            >
              <option value="">Select a Guide</option>
              {guides.map((guide) => (
                <option key={guide._id} value={guide.email}>
                  {guide.userName}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Book Now
        </button>
      </form>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">Confirm your Booking</h3>
            <p className="mb-4">Your booking request has been sent!</p>
            <div className="flex gap-3 justify-center">
              <button className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/dashboard/my-bookings")}
              >
                My Bookings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;