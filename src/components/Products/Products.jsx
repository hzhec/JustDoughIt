import "./Products.css";

// pastry data includes category, currentPrice, description, imgUrl, rating, title, usualPrice
const Products = (props) => {
	const product = props.productArr.map((product, index) => {
		return (
			<div className="product" key={index}>
				<div className="product-overlay">{product.title}</div>
				<img src={product.imgUrl} alt={product.title} />
			</div>
		);
	});

	return <div className="products">{product}</div>;
};

export default Products;
