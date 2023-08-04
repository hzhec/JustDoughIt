import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPastriesData } from "../../firebase/firebaseData";
import "./Product.css";

const Product = () => {
	const navigate = useNavigate();
	const { productTitle } = useParams();
	const [productData, setProductData] = useState({});

	useEffect(() => {
		getPastriesData()
			.then((data) => {
				for (let i = 0; i < data.length; i++) {
					if (data[i].title.replace(/\s/g, "") === productTitle) {
						setProductData({ ...data[i] });
					}
				}
			})
			.catch((error) => console.log(error));
	}, []);

	const backHandler = () => {
		navigate("/products");
	};

	return (
		<>
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
							Usual Price: <span>${productData.usualPrice}</span>
						</div>
						<div className="product-current-price">
							<h3>Current Price: ${productData.currentPrice}</h3>
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
			<div className="back-button">
				<button onClick={backHandler}>See all products...</button>
			</div>
		</>
	);
};

export default Product;
