import { useState, useEffect, useRef, useContext } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
// import { getPastriesData } from "../../firebase/firebaseData";
import DataContext from "../pastries-data";
import "./Recommendation.css";

const Recommendation = () => {
	// const [recProducts, setRecProducts] = useState([]);
	const [currentProduct, setCurrentProduct] = useState(0);
	const dataContext = useContext(DataContext);
	const timeRef = useRef(null);

	const resetTimeOut = () => {
		if (timeRef.current !== null) {
			clearTimeout(timeRef.current);
		}
	};

	const recProducts = dataContext.filter(
		(item) => item.recommendation === true
	);
	const productLength = recProducts.length;

	// useEffect(() => {
	// 	getPastriesData()
	// 		.then((data) => {
	// 			for (let i = 0; i < data.length; i++) {
	// 				if (data[i].recommendation === true) {
	// 					setRecProducts((prev) => {
	// 						return [...prev, { ...data[i] }];
	// 					});
	// 				}
	// 			}
	// 		})
	// 		.catch((error) => console.log(error));
	// }, []);

	useEffect(() => {
		resetTimeOut();
		timeRef.current = setTimeout(() => {
			setCurrentProduct(
				currentProduct === productLength - 1 ? 0 : currentProduct + 1
			);
		}, 5000);

		return () => {
			resetTimeOut();
		};
	}, [currentProduct]);

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

	if (!Array.isArray(dataContext) || productLength <= 0) {
		return null;
	}

	return (
		<>
			<div className="recommendation-header">
				<h1>Recommendations</h1>
			</div>
			<div className="recommendation-container">
				<FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
				<FaArrowAltCircleRight
					className="right-arrow"
					onClick={nextSlide}
				/>
				<div className="image-container">
					{recProducts.map((product, index) => {
						return (
							<div
								className={
									index === currentProduct ? "slide active" : "slide"
								}
								key={index}
							>
								{index === currentProduct && (
									<div className="rec-product-image">
										<div className="image-title-overlay">
											<h3>{product.title}</h3>
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
