import { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { getPastriesData } from "../../firebase/firebaseData";
import CombinedContext from "../combined-context";
import NotFound from "../NotFound/NotFound";
import "./Product.css";

const Product = () => {
	const dataContext = useContext(CombinedContext);
	const navigate = useNavigate();
	const amountInputRef = useRef();
	const { productTitle } = useParams();
	const [isLoading, setIsLoading] = useState(true);

	setTimeout(() => {
		setIsLoading(false);
	}, 1000);

	const addToCartHandler = (product, amount) => {
		dataContext.cart.addProduct({
			title: product.title,
			imgUrl: product.imgUrl,
			currentPrice: product.currentPrice,
			amount: amount,
		});
		// console.log(dataContext.cart);
	};

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	const timer = setTimeout(() => {
	// 		getPastriesData()
	// 			.then((data) => {
	// 				setProductData(
	// 					data.filter(
	// 						(item) => item.title.replace(/\s/g, "") === productTitle
	// 					)[0]
	// 				);
	// 				setIsLoading(false);
	// 			})
	// 			.catch((error) => setErrMessage(error.message));
	// 	}, 1000);

	// 	return () => clearInterval(timer);
	// }, []);

	const selectedProduct = dataContext.data
		.filter((item) => item.title.replace(/\s/g, "") === productTitle)
		.map((product, index) => {
			return (
				<div className="product-details" key={index}>
					<div className="product-image">
						<img src={product.imgUrl} alt={product.title} />
					</div>
					<div className="product-info">
						<div className="product-title">{product.title}</div>

						<div className="product-rating">
							<div className="rating">{product.rating}</div>
							<div className="star">
								<div className="star-background">★★★★★</div>
								<div
									className="star-rating"
									style={{
										width: `calc(125px * (${product.rating} / 5))`,
									}}
								>
									★★★★★
								</div>
							</div>
						</div>
						<div className="product-desc">
							<div className="description">{product.description}</div>
						</div>

						<div className="product-price">
							<div className="product-usual-price">
								Usual Price:{" "}
								<span>${product.usualPrice.toFixed(2)}</span>
							</div>
							<div className="product-current-price">
								<h3>
									Current Price: ${product.currentPrice.toFixed(2)}
								</h3>
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
												product,
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
			);
		});

	const backHandler = () => {
		navigate("/products");
	};

	return (
		<>
			{isLoading && <div className="loading-page">Loading product...</div>}
			{!isLoading &&
				(selectedProduct.length !== 0 ? (
					<>
						{selectedProduct}
						<div className="back-button">
							<button onClick={backHandler}>
								Browse other products...
							</button>
						</div>
					</>
				) : (
					<NotFound />
				))}
		</>
	);
};

export default Product;
