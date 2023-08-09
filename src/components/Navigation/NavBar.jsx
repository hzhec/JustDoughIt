import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineBakeryDining } from "react-icons/md";

import "./NavBar.css";
import CartNumber from "../Cart/CartNumber";

const NavBar = () => {
	const [searchToggle, setSearchToggle] = useState(false);
	const enteredInput = useRef();
	const navigate = useNavigate();

	const searchHandler = () => {
		setSearchToggle((prev) => !prev);
	};

	const clickHandler = (location) => {
		navigate("/" + location);
	};

	const formHandler = (event) => {
		event.preventDefault();

		navigate("/search/" + enteredInput.current.value);
		enteredInput.current.value = "";
	};

	return (
		<div className="nav">
			<div className="shop-container">
				<Link to="/">
					<MdOutlineBakeryDining className="shop-icon" />
					<div className="shop-text">JustDoughIt</div>
				</Link>
			</div>

			<div
				className="searchbar-container"
				style={
					searchToggle
						? { visibility: "visible" }
						: { visibility: "hidden" }
				}
			>
				<form onSubmit={formHandler}>
					<input
						className="search-input"
						type="text"
						placeholder="Search"
						ref={enteredInput}
					/>
				</form>
			</div>

			<div className="icon-container">
				<div className="nav-icons" onClick={searchHandler}>
					<FaSearch className="icon" />
				</div>

				<div
					className="nav-icons"
					onClick={() => {
						clickHandler("cart");
					}}
				>
					<CartNumber />
				</div>
			</div>
		</div>
	);
};

export default NavBar;
