import { useContext, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import CombinedContext from "../combined-context";
import "./ProductsList.css";
import Modal from "../Modal/Modal";
import QuickPreview from "../QuickPreview/QuickPreview";
// pastry data includes category, currentPrice, description, imgUrl, rating, title, usualPrice

const ProductsList = () => {
	const { data } = useContext(CombinedContext);
	const [isLoading, setIsLoading] = useState(true);
	const [productIsShown, setProductIsShown] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const showProductHandler = (item) => {
		setProductIsShown(true);
		setSelectedProduct(item);
	};

	const hideProductHandler = () => {
		setProductIsShown(false);
	};

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);

	const products = data.map((product, index) => {
		return (
			// <Link
			// 	to={`/product/${product.title.replace(/\s/g, "")}`}
			// 	className="product"
			// 	key={index}
			// >
			<div
				className="product"
				key={index}
				onClick={() => showProductHandler(product)}
			>
				<div className="product-overlay">{product.title}</div>
				<img src={product.imgUrl} alt={product.title} />
			</div>
			// </Link>
		);
	});

	return (
		<>
			<div className="product-header">
				<h1>All Products</h1>
			</div>
			<div className="product-container">
				{!isLoading ? (
					<>
						{productIsShown && (
							<Modal onClose={hideProductHandler}>
								<QuickPreview product={selectedProduct} />
							</Modal>
						)}
						<div className="products">{products}</div>
					</>
				) : (
					<div className="loading-page">Loading all products...</div>
				)}
			</div>
		</>
	);
};

export default ProductsList;
