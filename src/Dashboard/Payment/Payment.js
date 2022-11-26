import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51M8NwDJeC4qvGKxQW7z7Amcfz6VvBeFqbYhnu2aJodAsryYkjqJu4y4KJ3CMuEUVhfln5LPEApIz4AkhVVP9MsCO005LzUU2FI"
);

const Payment = () => {
  const booking = useLoaderData();

  return (
    <div className="p-4">
      <div className="w-[80%] mx-auto border bg-white rounded-md shadow-md p-12">
        <div className="text-xl text-center mb-4">
          <h2 className="text-3xl font-semibold">{booking.productName}</h2>
          <h2>Price: {booking.price}</h2>
        </div>

        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm booking={booking} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
