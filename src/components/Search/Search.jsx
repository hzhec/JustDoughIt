/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import CombinedContext from "../combined-context";
import NotFound from "../NotFound/NotFound";

import "./Search.css";
import { Link, useParams } from "react-router-dom";

const Search = () => {
	const { data } = useContext(CombinedContext);
	const { searchProduct } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		const timer = setTimeout(() => {
			const filteredProducts = data.filter((item) =>
				item.title.toLowerCase().includes(searchProduct.toLowerCase())
			);
			setSearchResults(filteredProducts);
			setIsLoading(false);
		}, 1000);
		return () => clearTimeout(timer);
	}, [searchProduct, data]);

	console.log(searchProduct);

	return (
		<div className="search-container">
			<h1>
				Search Results: <q>{searchProduct}</q>
			</h1>
			{isLoading && (
				<div className="loading-page">Searching product(s)...</div>
			)}
			{!isLoading && searchResults.length !== 0 && (
				<div className="products">
					{searchResults.map((product, index) => (
						<Link
							to={`/product/${product.title.replace(/\s/g, "")}`}
							className="product"
							key={index}
						>
							<div className="product-overlay">{product.title}</div>
							<img src={product.imgUrl} alt={product.title} />
						</Link>
					))}
				</div>
			)}
			{!isLoading && searchResults.length === 0 && (
				<NotFound message={`Unable to find product. Please try again...`} />
			)}
		</div>
	);
};

export default Search;
