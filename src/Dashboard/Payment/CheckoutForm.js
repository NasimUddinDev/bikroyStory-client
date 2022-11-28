import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ booking }) => {
  const [paymentError, setPaymentError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const { price, buyerEmail, buyerName, _id, ProductId } = booking;

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setPaymentError(error.message);
    } else {
      setPaymentError("");
    }

    setSuccess("");
    setLoading(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: buyerName,
            email: buyerEmail,
          },
        },
      });

    if (confirmError) {
      setPaymentError(confirmError.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        bookingId: _id,
        ProductId,
        price,
        buyerEmail,
        transactionId: paymentIntent.id,
      };

      fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.acknowledged && data.insertedId) {
            setSuccess("Payment Success");
            setPaymentId(paymentIntent.id);
            toast("Payment Success");
            navigate("/dashboard");
          }
        });
    }
    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "17px",
                color: "#000",
                "::placeholder": {
                  color: "#000",
                },
              },
              invalid: {
                color: "#000",
              },
            },
          }}
        />

        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn mt-2 w-full"
        >
          Pay
        </button>
      </form>

      <p className="mt-4 text-red-600">{paymentError}</p>
      {success && (
        <>
          <p className="text-teal-600 font-semibold text-3xl">{success}</p>
          <p className="text-teal-600">{paymentId}</p>
        </>
      )}
    </div>
  );
};

export default CheckoutForm;
