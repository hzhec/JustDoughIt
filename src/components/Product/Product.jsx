import { useContext, useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CombinedContext from "../combined-context";
import NotFound from "../NotFound/NotFound";
import "./Product.css";

const Product = () => {
	const dataContext = useContext(CombinedContext);
	const navigate = useNavigate();
	const amountInputRef = useRef();
	const { productTitle } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [productData, setProductData] = useState(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		setIsLoading(true);
		const product = dataContext.data.find(
			(item) => item.title.replace(/\s/g, "") === productTitle
		);
		if (product) {
			setProductData(product);
			setIsLoading(false);
		}
	}, [dataContext.data, productTitle]);

	const addToCartHandler = (product, amount) => {
		dataContext.cart.addProduct({
			title: product.title,
			imgUrl: product.imgUrl,
			currentPrice: product.currentPrice,
			amount: amount,
		});
	};

	const selectedProduct = productData ? (
		<div className="product-details">
			<div className="product-image">
				<img src={productData.imgUrl} alt={productData.title} />
			</div>
			<div className="product-info">
				<div className="product-title">{productData.title}</div>
				<div className="product-rating">
					<div className="rating">{productData.rating}</div>
					<div className="star">
						<div className="star-background">★★★★★</div>
						<div
							className="star-rating"
							style={{
								width: `calc(125px * (${productData.rating} / 5))`,
							}}
						>
							★★★★★
						</div>
					</div>
				</div>
				<div className="product-desc">
					<div className="description">{productData.description}</div>
				</div>
				<div className="product-price">
					<div className="product-usual-price">
						Usual Price: <span>${productData.usualPrice.toFixed(2)}</span>
					</div>
					<div className="product-current-price">
						<h3>Current Price: ${productData.currentPrice.toFixed(2)}</h3>
					</div>
					<div className="add-to-cart">
						<div className="input-cart">
							<input
								ref={amountInputRef}
								type="number"
								min="1"
								max="10"
								defaultValue="1"
							></input>
						</div>
						<div className="cart-button">
							<button
								onClick={() =>
									addToCartHandler(
										productData,
										parseInt(amountInputRef.current.value)
									)
								}
							>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<NotFound message={`Error 404 - Page Not Found!`} />
	);

	const backHandler = () => {
		navigate("/products");
	};

	return (
		<>
			{isLoading && <div className="loading-page">Loading product...</div>}
			{!isLoading && (
				<>
					{selectedProduct}
					<div className="back-button">
						<button onClick={backHandler}>
							Browse other products...
						</button>
					</div>
				</>
			)}
		</>
	);
};

export default Product;
