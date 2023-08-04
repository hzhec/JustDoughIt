import Recommendation from "../Recommendation/Recommendation";
import ProductsList from "../ProductsList/ProductsList";

import { getPastriesData } from "../../firebase/firebaseData";
import { useEffect, useState } from "react";

const Home = () => {
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
		<div className="home">
			<Recommendation recProductArr={recProductArray} />
			<div className="content-container">
				{/* {console.log("allProduct", productsArray)} */}
				<div className="header-product">
					<h1>All Products</h1>
				</div>
				<div className="product-container">
					<ProductsList productArr={productsArray} />
				</div>
			</div>
		</div>
	);
};

export default Home;
