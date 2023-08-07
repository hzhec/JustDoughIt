import Recommendation from "../Recommendation/Recommendation";
import ProductsList from "../ProductsList/ProductsList";

const Home = () => {
	return (
		<div className="home">
			<Recommendation />
			<div className="content-container">
				<ProductsList />
			</div>
		</div>
	);
};

export default Home;
