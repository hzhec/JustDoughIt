import NavBar from "./components/Navigation/NavBar";
import Recommendation from "./components/Recommendation/Recommendation";
import Products from "./components/Products/Products";
import SideBar from "./components/Sidebar/Sidebar";
import "./App.css";
import { pastriesData } from "./components/pastries-data";

function App() {
	return (
		<div className="main-container">
			<NavBar />
			<Recommendation />
			<div className="product-container">
				<SideBar />
				<Products />
				{pastriesData()}
			</div>
		</div>
	);
}

export default App;
