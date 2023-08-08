import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "../OrderSummary/OrderSummary";
import "./Checkout.css";
import Stripe from "stripe";
import CombinedContext from "../combined-context";

const stripe = Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

const initStripe = async () => {
	const res = await axios.get("/api/publishable-key");
	const publishableKey = await res.data.publishable_key;

	return loadStripe(publishableKey);
};

const Checkout = () => {
	const stripePromise = initStripe();
	const { cart } = useContext(CombinedContext);
	const [clientSecretSettings, setClientSecretSettings] = useState({
		clientSecret: "",
		loading: true,
	});

	useEffect(() => {
		async function createPaymentIntent() {
			const totalAmount = (cart.total * 100).toFixed(0);
			// const response = await axios.post("/api/create-payment-intent", {});
			const paymentIntent = await stripe.paymentIntents.create({
				amount: totalAmount,
				currency: "sgd",
				automatic_payment_methods: {
					enabled: true,
				},
			});

			setClientSecretSettings({
				clientSecret: paymentIntent.client_secret,
				loading: false,
			});
		}
		createPaymentIntent();
	}, [cart]);

	return (
		<div className="checkout-container">
			<h1 className="checkout-header">Checkout</h1>

			{clientSecretSettings.loading ? (
				<h1 className="loading-page">Loading ...</h1>
			) : (
				<div className="checkout-content">
					<div className="summary-content">
						<OrderSummary />
					</div>
					<div className="payment-content">
						<Elements
							stripe={stripePromise}
							options={{
								clientSecret: clientSecretSettings.clientSecret,
								appearance: { theme: "stripe" },
							}}
						>
							<CheckoutForm />
						</Elements>
					</div>
				</div>
			)}
		</div>
	);
};

export default Checkout;
