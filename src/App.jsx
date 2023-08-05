import NavBar from "./components/Navigation/NavBar";
import "./App.css";
import Main from "./components/Main/Main";
import { getPastriesData } from "./firebase/firebaseData";
import { useEffect, useState } from "react";
import DataContext from "./components/pastries-data";

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
			<div className="main-container">
				<NavBar />
				<Main />
			</div>
		</DataContext.Provider>
	);
}

export default App;
