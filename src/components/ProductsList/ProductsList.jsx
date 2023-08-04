import { getPastriesData } from "../../firebase/firebaseData";
import { useEffect, useState } from "react";
import "./ProductsList.css";
import { Link } from "react-router-dom";

// pastry data includes category, currentPrice, description, imgUrl, rating, title, usualPrice
const ProductsList = () => {
	const [productsArray, setProductsArray] = useState([]);

	useEffect(() => {
		getPastriesData()
			.then((data) => {
				for (let i = 0; i < data.length; i++) {
					setProductsArray((prev) => {
						return [...prev, { ...data[i] }];
					});
					// console.log(data[i]);
				}
			})
			.catch((error) => console.log(error));
	}, []);

	const products = productsArray.map((product, index) => {
		return (
			<Link
				to={`/product/${product.title.replace(/\s/g, "")}`}
				state={product}
				className="product"
				key={index}
			>
				<div className="product-overlay">{product.title}</div>
				<img src={product.imgUrl} alt={product.title} />
			</Link>
		);
	});

	return (
		<>
			<div className="product-header">
				<h1>All Products</h1>
			</div>
			<div className="product-container">
				<div className="products">{products}</div>
			</div>
		</>
	);
};

export default ProductsList;
