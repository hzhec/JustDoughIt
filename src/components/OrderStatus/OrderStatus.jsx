import { useEffect, useState } from "react";
import Stripe from "stripe";
import "./OrderStatus.css";

const stripe = Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);
const OrderStatus = () => {
	const [paymentIntent, setPaymentIntent] = useState(null);

	useEffect(() => {
		const retrievePaymentIntent = async () => {
			const paymentIntentId = new URLSearchParams(
				window.location.search
			).get("payment_intent");
			const paymentIntent = await stripe.paymentIntents.retrieve(
				paymentIntentId
			);
			setPaymentIntent(paymentIntent);
		};
		retrievePaymentIntent();
	}, []);

	const getMessage = (status) => {
		const messages = {
			succeeded: "Payment succeeded!",
			processing: "Your payment is processing.",
			requires_payment_method:
				"Your payment was not successful, please try again.",
			default: "Something went wrong.",
		};

		return messages[status] || messages.default;
	};

	const getOrderStatus = () => {
		if (!paymentIntent) return null;

		const { status, amount, metadata } = paymentIntent;
		const statusMessage = getMessage(status);
		const amountPaid =
			status === "succeeded" ? `$${(amount / 100).toFixed(2)}` : null;

		const parseMetadata = Object.values(metadata).map((item) =>
			JSON.parse(item)
		);

		const orderList = parseMetadata.map((item, index) => (
			<li key={index} className="list-item">
				<img src={item.imgUrl} alt={item.title} className="item-img" />
				<div className="item-name">{item.title}</div>
				<div className="item-qty">{item.amount}</div>
				<div className="item-price">${item.currentPrice.toFixed(2)}</div>
				<div className="item-total">
					${(item.amount * item.currentPrice).toFixed(2)}
				</div>
			</li>
		));

		return (
			<div className="order-container">
				<div className="order-details">
					<div className="status">
						<h1>Order Status: </h1>
						<h1>{statusMessage}</h1>
					</div>
					{amountPaid && (
						<>
							<div className="amount-paid">
								<h1>Amount Paid: {amountPaid}</h1>
							</div>
							<ul className="order-list">
								<div className="order-list-header">Order List</div>
								{orderList}
							</ul>
						</>
					)}
				</div>
			</div>
		);
	};

	return getOrderStatus();
};

export default OrderStatus;
