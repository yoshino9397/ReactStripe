import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const KEY =
  "pk_test_51KfrjdF19OTpJSTE2oCDz7OnY2ZoOknrgnjXuMQ577CxryPXSRQ1MQU7YtRYfWZP4E9Lai9rr7JwATolbgMDk5na004ZJR6za9";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5001/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 30000,
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StripeCheckout
        name="Yoshino Shop"
        image="https://live.staticflickr.com/65535/51939942692_9e93d5d4e2_b.jpg"
        billingAddress
        shippingAddress
        description="Your total is $100"
        locale="en"
        amount={30000}
        token={onToken}
        stripeKey={KEY}
      >
        <button
          style={{
            border: "none",
            width: 120,
            height: 50,
            borderRadius: "5px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Pay;
