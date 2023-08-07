const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD": {
			const updatedTotal =
				state.total + action.item.currentPrice * action.item.amount;
			const existingCartProductIndex = state.items.findIndex(
				(item) => item.title === action.item.title
			);
			const existingCartProduct = state.items[existingCartProductIndex];

			let updatedProducts;
			if (existingCartProduct) {
				const updatedProduct = {
					...existingCartProduct,
					amount: existingCartProduct.amount + action.item.amount,
				};
				updatedProducts = [...state.items];
				updatedProducts[existingCartProductIndex] = updatedProduct;
			} else {
				updatedProducts = state.items.concat(action.item);
			}

			return {
				items: updatedProducts,
				total: updatedTotal,
			};
		}

		case "REMOVE": {
			const existingCartProductIndex = state.items.findIndex(
				(item) => item.title === action.title
			);
			const existingCartProduct = state.items[existingCartProductIndex];
			const updatedTotal = state.total - existingCartProduct.currentPrice;
			let updatedProducts;
			if (existingCartProduct.amount === 1) {
				updatedProducts = state.items.filter(
					(item) => item.title !== action.title
				);
			} else {
				const updatedProduct = {
					...existingCartProduct,
					amount: existingCartProduct.amount - 1,
				};
				updatedProducts = [...state.items];
				updatedProducts[existingCartProductIndex] = updatedProduct;
			}
			return {
				items: updatedProducts,
				total: updatedTotal,
			};
		}

		case "UPDATE": {
			const existingCartProductIndex = state.items.findIndex(
				(item) => item.title === action.item.title
			);
			const existingCartProduct = state.items[existingCartProductIndex];

			const updatedTotal =
				state.total -
				existingCartProduct.currentPrice * existingCartProduct.amount +
				action.item.currentPrice * action.item.amount;

			let updatedProducts;
			if (action.item.amount !== 0) {
				const updatedProduct = {
					...existingCartProduct,
					amount: action.item.amount,
				};
				updatedProducts = [...state.items];
				updatedProducts[existingCartProductIndex] = updatedProduct;
			} else {
				updatedProducts = state.items.filter(
					(item) => item.title !== action.item.title
				);
			}

			return {
				items: updatedProducts,
				total: updatedTotal,
			};
		}

		default:
			return {
				items: [],
				total: 0,
			};
	}
};

export default cartReducer;
