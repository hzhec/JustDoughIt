import { useContext, useRef, useEffect } from "react";
import "./Cart.css";
import CombinedContext from "../combined-context";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
	const { cart } = useContext(CombinedContext);
	const navigate = useNavigate();
	const total = cart.total.toFixed(2);
	const hasProductInCart = cart.items.length > 0;
	const qtyRef = useRef({});

	const cartAddHandler = (item) => {
		cart.addProduct({ ...item, amount: 1 });
	};

	const cartRemoveHandler = (title) => {
		cart.removeProduct(title);
	};

	const qtyUpdateHandler = () => {
		cart.items.forEach((item) => {
			const itemTitle = item.title.replace(/\s/g, "");
			const itemValue = qtyRef.current[itemTitle].value;
			cart.updateProduct({ ...item, amount: parseInt(itemValue) });
		});
	};

	const backHandler = () => {
		navigate("/products");
	};

	useEffect(() => {
		cart.items.forEach((item) => {
			const itemTitle = item.title.replace(/\s/g, "");
			qtyRef.current[itemTitle].value = item.amount;
		});
	}, [cart.items]);

	const cartItems = cart.items.map((item, index) => {
		const itemTitle = item.title.replace(/\s/g, "");
		return (
			<li key={index} className="cart-item">
				<Link to={`/product/${itemTitle}`} className="item-title">
					<img src={item.imgUrl} alt={item.title} className="item-image" />
					<h2>{item.title}</h2>
				</Link>
				<div className="summary">
					<span className="price">${item.currentPrice.toFixed(2)}</span>
					<span className="price">
						${(item.currentPrice * item.amount).toFixed(2)}
					</span>
					<input
						className={`amount`}
						type="text"
						defaultValue={item.amount}
						ref={(value) => (qtyRef.current[itemTitle] = value)}
					/>
				</div>
				<div className="actions">
					<button onClick={() => cartAddHandler(item)}>+</button>
					<button onClick={() => cartRemoveHandler(item.title)}>-</button>
				</div>
			</li>
		);
	});

	return (
		<div className="cart">
			<h1>Cart Page</h1>
			{hasProductInCart && (
				<div className="cart-container">
					<div className="cart-header">
						<h2 className="cart-title">Product</h2>
						<div className="qty-price">
							<h2>Unit Price</h2>
							<h2>Total Price</h2>
							<h2 className="qty-header">Qty</h2>
						</div>
						<h2 className="actions-header">Actions</h2>
					</div>
					<ul className="cart-items">{cartItems}</ul>

					<div className="cart-total">
						<span>Total Amount</span>
						<span className="total-amount">${total}</span>
					</div>

					<div className="cart-actions">
						<button
							className="cartActionBtn update"
							onClick={qtyUpdateHandler}
						>
							Update Cart
						</button>
						<button
							className="cartActionBtn checkout"
							onClick={qtyUpdateHandler}
						>
							Checkout
						</button>
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
