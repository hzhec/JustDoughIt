import { useContext, useRef } from "react";
import CombinedContext from "../combined-context";
import "./QuickPreview.css";
import { useNavigate } from "react-router";

const QuickPreview = (props) => {
	const { cart } = useContext(CombinedContext);
	const amountInputRef = useRef();
	const navigate = useNavigate();

	const addToCartHandler = (product, amount) => {
		cart.addProduct({
			title: product.title,
			imgUrl: product.imgUrl,
			currentPrice: product.currentPrice,
			amount: amount,
		});
	};

	const viewProductHandler = () => {
		navigate("/product/" + props.product.title.replace(/\s/g, ""));
	};

	return (
		<div className="qp-details">
			<div className="qp-image">
				<img src={props.product.imgUrl} alt={props.product.title} />
			</div>
			<div className="qp-info">
				<div className="qp-title">{props.product.title}</div>
				<div className="qp-rating-container">
					<div className="qp-rating">{props.product.rating}</div>
					<div className="qp-star">
						<div className="qp-star-background">★★★★★</div>
						<div
							className="qp-star-rating"
							style={{
								width: `calc(125px * (${props.product.rating} / 5))`,
							}}
						>
							★★★★★
						</div>
					</div>
				</div>
				<div className="qp-price">
					<div className="qp-usual-price">
						Usual Price:{" "}
						<span>${props.product.usualPrice.toFixed(2)}</span>
					</div>
					<div className="qp-current-price">
						<h3>
							Current Price: ${props.product.currentPrice.toFixed(2)}
						</h3>
					</div>
					<div className="qp-add-to-cart">
						<div className="qp-input-cart">
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
										props.product,
										parseInt(amountInputRef.current.value)
									)
								}
							>
								Add to Cart
							</button>
						</div>
					</div>
					<div className="qp-button">
						<button onClick={viewProductHandler}>View product...</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuickPreview;
