import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingBasket, FaUser, FaSearch } from "react-icons/fa";
import { MdOutlineBakeryDining } from "react-icons/md";

import "./NavBar.css";

const NavBar = () => {
	const [searchToggle, setSearchToggle] = useState(false);
	const enteredInput = useRef();
	const navigate = useNavigate();

	const clickHandler = () => {
		setSearchToggle((prev) => !prev);
	};

	const formHandler = (event) => {
		event.preventDefault();

		navigate("/search/" + enteredInput.current.value);
		enteredInput.current.value = "";
	};

	return (
		<nav>
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

			<div className="user-container">
				<div className="search-icon" onClick={clickHandler}>
					<FaSearch className="nav-icons" />
				</div>
				<Link to="/favourites">
					<FaHeart className="nav-icons" />
				</Link>
				<Link to="/cart">
					<FaShoppingBasket className="nav-icons" />
				</Link>
				<Link to="/profile">
					<FaUser className="nav-icons" />
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;
