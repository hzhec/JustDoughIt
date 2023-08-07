import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Cart from "../Cart/Cart";
import UserProfile from "../UserProfile/UserProfile";
import NotFound from "../NotFound/NotFound";
import ProductsList from "../ProductsList/ProductsList";
import Product from "../Product/Product";
import "./Main.css";
import Search from "../Search/Search";

const Main = () => {
	return (
		<div className="main">
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/cart" element={<Cart />} />
				<Route exact path="/profile" element={<UserProfile />} />
				<Route exact path="/products" element={<ProductsList />} />
				<Route exact path="/product/:productTitle" element={<Product />} />
				<Route exact path="/search/:searchProduct" element={<Search />} />
				<Route
					path="*"
					element={<NotFound message={`Error 404 - Page Not Found!`} />}
				/>
			</Routes>
		</div>
	);
};

export default Main;
