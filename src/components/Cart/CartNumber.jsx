import { useContext, useEffect, useState } from "react";
// import { FaShoppingBasket } from "react-icons/fa";
import CombinedContext from "../combined-context";
// import { Link } from "react-router-dom";
import "./CartNumber.css";

const CartNumber = () => {
	const [cartAdded, setCartAdded] = useState(false);
	const { cart } = useContext(CombinedContext);

	const numOfCartItems = cart.items.reduce((currentNum, item) => {
		return currentNum + item.amount;
	}, 0);

	useEffect(() => {
		if (cart.items.length === 0) {
			return;
		}
		setCartAdded(true);

		const timer = setTimeout(() => {
			setCartAdded(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [cart.items]);

	return (
		<>
			<span className={`cart-item-number ${cartAdded ? "bump" : ""}`}>
				{numOfCartItems}
			</span>
		</>
	);
};

export default CartNumber;
