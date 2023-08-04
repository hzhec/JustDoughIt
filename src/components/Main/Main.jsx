import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Favourites from "../Favourites/Favourites";
import Cart from "../Cart/Cart";
import UserProfile from "../UserProfile/UserProfile";
import NotFound from "../NotFound/NotFound";

const Main = () => {
	return (
		<div className="main">
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/favourites" element={<Favourites />} />
				<Route exact path="/cart" element={<Cart />} />
				<Route exact path="/profile" element={<UserProfile />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};

export default Main;
