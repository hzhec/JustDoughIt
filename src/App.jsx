import NavBar from "./components/Navigation/NavBar";
import Recommendation from "./components/Recommendation/Recommendation";
import Products from "./components/Products/Products";
import SideBar from "./components/Sidebar/Sidebar";
import "./App.css";

function App() {
	return (
		<div className="main-container">
			<NavBar />
			<Recommendation />
			<div className="product-container">
				<SideBar />
				<Products />
			</div>
		</div>
	);
}

export default App;
