import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormContainer, PaymentButton, PaymentFormContainer } from "./payment-form.styles";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selectors";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useState } from "react";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: "post",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({ amount: amount }),
    }).then(res => res.json());

    const { paymentIntent: { client_secret }} = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.name : 'Guest',
        }
      }
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
        alert(paymentResult.error)
    } else {
      if(paymentResult.paymentIntent.status === 'succeeded') {
        alert("Payment Successful")
      }
    }
  }


  return (
    <PaymentFormContainer>
     <FormContainer onSubmit={paymentHandler}>
       <h2>Credit card payment: </h2>
       <CardElement />
       <PaymentButton  isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</PaymentButton>
     </FormContainer>
     </PaymentFormContainer>
  )
}