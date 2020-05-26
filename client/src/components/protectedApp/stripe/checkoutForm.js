import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";

import CardSection from "./CardSection";

// import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function CheckoutForm() {
  const dispatch = useDispatch();
  // const [client, setClient] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { id, c_id } = useParams();
  const { push } = useHistory();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    //  try {
    //    const getData = await axiosWithAuth().get(
    //      `/api/clients/${params.id}/classes/${class_id}/payment`
    //    );
    //    console.dir("getData ", getData);
    //  } catch (error) {
    //    console.log("error ", error);
    //  }
    setIsProcessing(true);
    //  dispatch({ type: "PROCCESSING_PAYMENT" });

    axiosWithAuth()
      .post(`/api/clients/${id}/classes`, { class_id: c_id })
      .then(async (res) => {
        dispatch({ type: "PROCCESSING_PAYMENT" });

        const clientSecret = res.data.client_secret;

        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          console.log(result.error.message);
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === "succeeded") {
            setIsProcessing(false);
            dispatch({ type: "PAYMENT_PROCCESSED" });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cssClasses = isProcessing
    ? "proccessing-payment-btn confirm-btn"
    : "confirm-btn";

  return (
    <form onSubmit={handleSubmit} className="checkoutForm">
      <CardSection />
      <button disabled={isProcessing} className={cssClasses}>
        {isProcessing ? "proccesing..." : "confirm payment"}
      </button>
    </form>
  );
}
