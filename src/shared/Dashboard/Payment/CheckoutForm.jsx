import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import sweetMessage from '../../../Utils/sweetMessage';

const CheckoutForm = ({ booking, onSuccess }) => {
     const stripe = useStripe();
     const elements = useElements();
     const axiosSecure = useAxiosSecure();
     const { user } = useAuth();
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");

     const handleSubmit = async (e) => {
         e.preventDefault();
         if (!stripe || !elements) return;

         setLoading(true);
         setError("");

          try {
      // 1. Create PaymentIntent
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price: booking.price,
      });
      console.log(data)
      // 2. Confirm payment
      const card = elements.getElement(CardElement);
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: booking.touristName,
              email: booking.touristEmail,
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // 3. Save payment & update booking status
        await axiosSecure.post("/confirm-payment", {
          bookingId: booking._id,
          transactionId: paymentIntent.id,
          paymentBy: user.email,
          amount: booking.price,
          packageId: booking.packageId,
        });
        sweetMessage("Payment successfull!")
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed");
    } finally {
      setLoading(false);
    }
     }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="p-2 border rounded" />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : `Pay $${booking.price}`}
        </button>
      </form>
    );
};

export default CheckoutForm;