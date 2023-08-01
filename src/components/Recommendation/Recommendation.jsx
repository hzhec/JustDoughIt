import { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "./Recommendation.css";

const Recommendation = (props) => {
	const [currentProduct, setCurrentProduct] = useState(0);
	const productLength = props.recProductArr.length;

	const nextSlide = () => {
		setCurrentProduct(
			currentProduct === productLength - 1 ? 0 : currentProduct + 1
		);
	};

	const prevSlide = () => {
		setCurrentProduct(
			currentProduct === 0 ? productLength - 1 : currentProduct - 1
		);
	};

	if (!Array.isArray(props.recProductArr) || props.recProductArr.length <= 0) {
		return null;
	}

	return (
		<>
			<div className="recommendation-container">
				<FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
				<FaArrowAltCircleRight
					className="right-arrow"
					onClick={nextSlide}
				/>
				<div className="image-container">
					{props.recProductArr.map((product, index) => {
						return (
							<div
								className={
									index === currentProduct ? "slide active" : "slide"
								}
								key={index}
							>
								{index === currentProduct && (
									<div className="product-image">
										<div className="image-title-overlay">
											{product.title}
										</div>
										<img src={product.imgUrl} alt={product.title} />
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Recommendation;
