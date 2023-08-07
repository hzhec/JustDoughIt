/* eslint-disable no-unused-vars */
import { createContext } from "react";

const CombinedContext = createContext({
	data: [],
	cart: {
		items: [],
		total: 0,
		addProduct: (item) => {},
		removeProduct: (title) => {},
		updateProduct: (item) => {},
	},
});

export default CombinedContext;
