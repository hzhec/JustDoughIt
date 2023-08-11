import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Cart from "../Cart/Cart";
import NotFound from "../NotFound/NotFound";
import ProductsList from "../ProductsList/ProductsList";
import Product from "../Product/Product";
import "./Main.css";
import Search from "../Search/Search";
import Checkout from "../Checkout/Checkout";
import OrderStatus from "../OrderStatus/OrderStatus";

const Main = () => {
	return (
		<div className="main">
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/cart" element={<Cart />} />
				<Route exact path="/products" element={<ProductsList />} />
				<Route path="/product/:productTitle" element={<Product />} />
				<Route path="/search/:searchProduct" element={<Search />} />
				<Route
					path="*"
					element={<NotFound message={`Error 404 - Page Not Found!`} />}
				/>
				<Route exact path="/checkout" element={<Checkout />} />
				<Route path="/order/" element={<OrderStatus />} />
			</Routes>
		</div>
	);
};

export default Main;
