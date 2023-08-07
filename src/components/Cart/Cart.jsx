import { useContext } from "react";
import "./Cart.css";
import CombinedContext from "../combined-context";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
	const { cart } = useContext(CombinedContext);
	const navigate = useNavigate();
	const total = cart.total.toFixed(2);
	const hasProductInCart = cart.items.length > 0;

	const cartAddHandler = (item) => {
		cart.addProduct({ ...item, amount: 1 });
	};

	const cartRemoveHandler = (title) => {
		cart.removeProduct(title);
	};

	const backHandler = () => {
		navigate("/products");
	};

	const cartItems = cart.items.map((item, index) => (
		<li key={index} className="cart-item">
			<Link
				to={`/product/${item.title.replace(/\s/g, "")}`}
				className="item-title"
			>
				<img src={item.imgUrl} alt={item.title} className="item-image" />
				<h2>{item.title}</h2>
			</Link>
			<div className="summary">
				<span className="price">${item.currentPrice.toFixed(2)}</span>
				<span className="amount">{item.amount}</span>
			</div>
			<div className="actions">
				<button onClick={() => cartAddHandler(item)}>+</button>
				<button onClick={() => cartRemoveHandler(item.title)}>-</button>
			</div>
		</li>
	));

	return (
		<div className="cart">
			<h1>Cart Page</h1>
			{hasProductInCart && (
				<div className="cart-container">
					<ul className="cart-items">{cartItems}</ul>
					<div className="cart-total">
						<span>Total Amount</span>
						<span>${total}</span>
					</div>
				</div>
			)}
			{!hasProductInCart && <div className="no-items">No items in cart</div>}
			<div className="back-button">
				<button onClick={backHandler}>Browse other products...</button>
			</div>
		</div>
	);
};

export default Cart;
