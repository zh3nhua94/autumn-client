import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			// create filter object & compare with existing cart products
			const { _id, colors, sizes } = action.payload;
			const filtersObj = { _id, colors, sizes };
			Object.keys(filtersObj).forEach((key) => {
				if (filtersObj[key] === null || filtersObj[key] === "") {
					delete filtersObj[key];
				}
			});

			//filter existing cart to check matching product ID & color & size
			const getFilterRows = (rows, filters) => {
				return rows.filter((row) =>
					//match every [key, value] in filters
					Object.keys(filters)
						.map((key) => (filters[key].length ? filters[key].includes(row[key]) : true))
						.every(Boolean)
				);
			};
			let filtered = getFilterRows(state.products, filtersObj);

			// console.log(filtered);

			//if product really exist before, just update existing quantity
			if (filtered.length) {
				const updateProducts = state.products.map((product) => {
					if (
						//match every [key, value] in filters
						Object.keys(filtersObj)
							.map((key) => (filtersObj[key].length ? filtersObj[key].includes(product[key]) : true))
							.every(Boolean)
					) {
						return {
							...product,
							quantity: product.quantity + action.payload.quantity,
						};
					} else {
						return product;
					}
				});
				state.quantity += action.payload.quantity;
				state.products = updateProducts;
				state.total += action.payload.price * action.payload.quantity;
			} else {
				//else if product doesn't exist before, push new product in state
				state.quantity += action.payload.quantity;
				state.products.push(action.payload);
				state.total += action.payload.price * action.payload.quantity;
			}
		},
	},
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
