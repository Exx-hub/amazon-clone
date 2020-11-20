import React, { useContext, useReducer } from "react";

export const GlobalContext = React.createContext();

export const GlobalContextProvider = ({ reducer, initialState, children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { basket, user } = state;
	return (
		<GlobalContext.Provider value={{ basket, user, dispatch }}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useStateValue = () => useContext(GlobalContext);
