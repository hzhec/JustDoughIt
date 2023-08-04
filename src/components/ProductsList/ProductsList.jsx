import "./ProductsList.css";

// pastry data includes category, currentPrice, description, imgUrl, rating, title, usualPrice
const ProductsList = (props) => {
	const allProducts = [...props.productArr];

	const products = allProducts.map((product, index) => {
		return (
			<div className="product" key={index}>
				<div className="product-overlay">{product.title}</div>
				<img src={product.imgUrl} alt={product.title} />
			</div>
		);
	});

	return <div className="products">{products}</div>;
};

export default ProductsList;
