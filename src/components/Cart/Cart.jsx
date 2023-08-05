import { useContext } from "react";
import "./Cart.css";
import CombinedContext from "../combined-context";

const Cart = () => {
	const cartContext = useContext(CombinedContext);

	const total = `${cartContext.cart.total.toFixed(2)}`;
	// const hasProductInCart = cartContext.cart.items.length > 0;

	const cartItems = (
		<ul className="cart-items">
			{cartContext.cart.items.map((item, index) => (
				<li key={index} className="cart-item">
					<>
						<img
							src={item.imgUrl}
							alt={item.title}
							className="item-image"
						/>
						<h2>{item.title}</h2>
						<div className="summary">
							<span className="price">
								${item.currentPrice.toFixed(2)}
							</span>
							<span className="amount">{item.amount}</span>
						</div>
					</>
				</li>
			))}
		</ul>
	);

	return (
		<div className="cart">
			<h1>Cart Page</h1>
			<div className="cart-container">
				{cartItems}
				<div className="cart-total">
					<span>Total Amount</span>
					<span>${total}</span>
				</div>
			</div>
		</div>
	);
};

export default Cart;
