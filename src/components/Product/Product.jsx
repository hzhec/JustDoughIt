import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { getPastriesData } from "../../firebase/firebaseData";
import DataContext from "../pastries-data";
import NotFound from "../NotFound/NotFound";
import "./Product.css";

const Product = () => {
	const dataContext = useContext(DataContext);
	const navigate = useNavigate();
	const { productTitle } = useParams();
	const [isLoading, setIsLoading] = useState(true);

	setTimeout(() => {
		setIsLoading(false);
	}, 1000);

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

	const selectedProduct = dataContext
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
								Usual Price: <span>${product.usualPrice}</span>
							</div>
							<div className="product-current-price">
								<h3>Current Price: ${product.currentPrice}</h3>
							</div>
							<div className="add-to-cart">
								<div className="input-cart">
									<input
										type="number"
										placeholder="1"
										min={1}
										max={10}
									></input>
								</div>
								<div className="cart-button">
									<button>Add to Cart</button>
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
