import NavBar from "./components/Navigation/NavBar";
import "./App.css";
import Main from "./components/Main/Main";
// import { pastriesData } from "./components/pastries-data";
// import allProducts from "./components/pastries-data";

function App() {
	return (
		<div className="main-container">
			<NavBar />
			<Main />
		</div>
	);
}

export default App;
