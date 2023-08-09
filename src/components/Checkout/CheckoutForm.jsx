import { useState } from "react";
import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";
import "./CheckoutForm.css";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const [errorMessage, setErrorMessage] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) return;

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "http://localhost:4242/order",
			},
		});

		if (error) setErrorMessage(error.message);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="payment-element">
				<PaymentElement />
			</div>
			<div className="checkout-form">
				{errorMessage && (
					<div className="error-checkout">{errorMessage}</div>
				)}
				<button className="checkoutBtn" disabled={!stripe}>
					Submit
				</button>
			</div>
		</form>
	);
};

export default CheckoutForm;
