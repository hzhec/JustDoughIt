import { getPastriesData } from "./firebase/firebaseData";
import { useEffect, useState } from "react";
import NavBar from "./components/Navigation/NavBar";
import Main from "./components/Main/Main";
import DataContext from "./components/pastries-data";
import "./App.css";

function App() {
	const [pastriesData, setPastriesData] = useState([]);

	useEffect(() => {
		getPastriesData()
			.then((data) => {
				for (let i = 0; i < data.length; i++) {
					setPastriesData((prev) => {
						return [...prev, { ...data[i] }];
					});
				}
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<DataContext.Provider value={pastriesData}>
			<div className="error-container">
				<h1>Invalid width size! Minimum 390px!</h1>
			</div>
			<div className="main-container">
				<NavBar />
				<Main />
			</div>
		</DataContext.Provider>
	);
}

export default App;
