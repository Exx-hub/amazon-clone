export const initialState = {
	basket: [],
	user: null,
};

// Selector (professional practice)
export const getBasketTotal = (basket) =>
	basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
	// console.log(action);
	switch (action.type) {
		case "ADD_TO_BASKET":
			return {
				...state,
				basket: [...state.basket, action.payload],
			};
		case "REMOVE_FROM_BASKET":
			const index = state.basket.findIndex(
				(basketItem) => basketItem.id === action.payload
			);
			let newBasket = [...state.basket];

			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				console.warn(
					`Can't remove product (id" ${action.payload}) as it's not in the basket!`
				);
			}

			return {
				...state,
				basket: newBasket,
			};
		case "EMPTY_BASKET":
			return {
				...state,
				basket: action.payload,
			};
		case "SET_USER":
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;

// this is okay if each item has different id values even if they are identical items
// the above finds the first item in the array with same id as the action.payload and returns its index
// if the index is more than or equal to zero, which means there was a match, it uses the index to splice
// the array using the index and 1 as 2nd argument which removes one item with that index on the array

// this uses the index to filter but drawback is does not use individual item ids at all even
// if array items are different items
// return {
// 	...state,
// 	basket: [...state.basket.filter((_, index) => index !== action.payload)],
// };

// used if all items have different ids even identical ones
// return {
// 	...state,
// 	basket: [...state.basket.filter((item) => item.id !== action.payload)],
// };
