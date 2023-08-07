import { getPastriesData } from "./firebase/firebaseData";
import { useEffect, useReducer, useState } from "react";
import NavBar from "./components/Navigation/NavBar";
import Main from "./components/Main/Main";
import cartReducer from "./components/Cart/cartReducer";
import CombinedContext from "./components/combined-context";
import "./App.css";

function App() {
	const [pastriesData, setPastriesData] = useState([]);

	useEffect(() => {
		getPastriesData()
			.then((data) => {
				setPastriesData(data.map((item) => ({ ...item })));
			})
			.catch((error) => console.log(error));
	}, []);

	const initialCartState = {
		items: [],
		total: 0,
	};
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		initialCartState
	);

	const addProductHandler = (item) => {
		dispatchCartAction({ type: "ADD", item });
	};

	const removeProductHandler = (title) => {
		dispatchCartAction({ type: "REMOVE", title });
	};

	const dataContext = { data: pastriesData };
	const cartContext = {
		cart: {
			items: cartState.items,
			total: cartState.total,
			addProduct: addProductHandler,
			removeProduct: removeProductHandler,
		},
	};

	return (
		<CombinedContext.Provider value={{ ...dataContext, ...cartContext }}>
			<div className="error-container">
				<div className="error-message">
					Invalid width size! Minimum 390px!
				</div>
			</div>
			<div className="main-container">
				<NavBar />
				<Main />
			</div>
		</CombinedContext.Provider>
	);
}

export default App;
