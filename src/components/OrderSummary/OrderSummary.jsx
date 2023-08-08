import { useContext, useEffect, useState } from "react";
import CombinedContext from "../combined-context";
import "./OrderSummary.css";

const OrderSummary = () => {
	const { cart } = useContext(CombinedContext);
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const productList = cart.items;
		setCartItems(productList);
	}, [cart]);

	return (
		<div>
			<div className="order-summary-header">Order Summary</div>
			<ul className="order-summary">
				<li className="order-item-header">
					<div>Product item</div>
					<div>Qty</div>
					<div>Unit Price</div>
				</li>
				{cartItems.map((product, index) => (
					<li key={index} className="order-item">
						<div>{product.title}</div>
						<div>{product.amount}</div>
						<div>{product.currentPrice.toFixed(2)}</div>
					</li>
				))}
			</ul>
			<div className="total-summary">Total: $ {cart.total.toFixed(2)}</div>
		</div>
	);
};

export default OrderSummary;
