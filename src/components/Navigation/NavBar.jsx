import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaShoppingBasket, FaUser, FaSearch } from "react-icons/fa";
import { MdOutlineBakeryDining } from "react-icons/md";

import "./NavBar.css";

const NavBar = () => {
	const [searchToggle, setSearchToggle] = useState(false);

	const clickHandler = () => {
		setSearchToggle((prev) => !prev);
	};

	return (
		<nav>
			<div className="shop-container">
				<a href="#">
					<MdOutlineBakeryDining className="shop-icon" />
					<div className="shop-text">Just Dough It</div>
				</a>
			</div>

			<div
				className="search-container"
				style={
					searchToggle
						? { visibility: "visible" }
						: { visibility: "hidden" }
				}
			>
				<input className="search-input" type="text" placeholder="Search" />
			</div>

			<div className="user-container">
				<div className="search-icon" onClick={clickHandler}>
					<FaSearch className="nav-icons" />
				</div>
				<a href="#">
					<FaHeart className="nav-icons" />
				</a>
				<a href="#">
					<FaShoppingBasket className="nav-icons" />
				</a>
				<a href="#">
					<FaUser className="nav-icons" />
				</a>
			</div>
		</nav>
	);
};

export default NavBar;
