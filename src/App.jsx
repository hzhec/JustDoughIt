import NavBar from "./components/Navigation/NavBar";
import Recommendation from "./components/Recommendation/Recommendation";
import Products from "./components/Products/Products";
import SideBar from "./components/Sidebar/Sidebar";
import "./App.css";
// import { pastriesData } from "./components/pastries-data";
// import allProducts from "./components/pastries-data";
import { getPastriesData } from "./firebase/firebaseData";
import { useEffect, useState } from "react";

function App() {
	const [productsArray, setProductsArray] = useState([]);
	const [recProductArray, setRecProductArray] = useState([]);

	useEffect(() => {
		getPastriesData()
			.then((data) => {
				for (let i = 0; i < data.length; i++) {
					if (data[i].recommendation === true) {
						setRecProductArray((prev) => {
							return [...prev, { ...data[i] }];
						});
					}
					setProductsArray((prev) => {
						return [...prev, { ...data[i] }];
					});
					// console.log(data[i]);
				}
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<div className="main-container">
			<NavBar />
			<Recommendation recProductArr={recProductArray} />
			<div className="content-container">
				<div className="header-sidebar">
					<h1>Menu</h1>
				</div>
				<div className="sidebar-container">
					<SideBar />
				</div>
				{/* {console.log("allProduct", productsArray)} */}
				<div className="header-product">
					<h1>All Products</h1>
				</div>
				<div className="product-container">
					<Products productArr={productsArray} />
				</div>
			</div>
		</div>
	);
}

export default App;
