import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/loading";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const { bookingId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const { data } = await axiosSecure.get(`bookings/${bookingId}`);
      setBooking(data);
    };
    fetchBooking();
  }, [bookingId]);

  if (!booking) return <Loading />;

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <Elements stripe={stripePromise}>
        <CheckoutForm
          booking={booking}
          onSuccess={() => navigate("/dashboard/my-bookings")}
        />
      </Elements>
    </div>
  );
};

export default PaymentPage;
