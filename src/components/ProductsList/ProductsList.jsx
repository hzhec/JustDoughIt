// import { getPastriesData } from "../../firebase/firebaseData";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DataContext from "../pastries-data";
import "./ProductsList.css";
// pastry data includes category, currentPrice, description, imgUrl, rating, title, usualPrice
const ProductsList = () => {
	const dataContext = useContext(DataContext);
	const [isLoading, setIsLoading] = useState(false);
	// const [productsArray, setProductsArray] = useState([]);

	setTimeout(() => {
		setIsLoading(true);
	}, 1200);

	// useEffect(() => {
	// 	console.log(getPastriesData());
	// 	getPastriesData()
	// 		.then((data) => {
	// 			for (let i = 0; i < data.length; i++) {
	// 				setProductsArray((prev) => {
	// 					return [...prev, { ...data[i] }];
	// 				});
	// 				// console.log(data[i]);
	// 			}
	// 		})
	// 		.catch((error) => console.log(error));
	// }, []);

	const products = dataContext.map((product, index) => {
		return (
			<Link
				to={`/product/${product.title.replace(/\s/g, "")}`}
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
				{isLoading && <div className="products">{products}</div>}
				{!isLoading && (
					<div className="loading-page">Loading all products...</div>
				)}
			</div>
		</>
	);
};

export default ProductsList;
