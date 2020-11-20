import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Payment from "./components/Payment";
import Orders from "./components/Orders";

import { auth } from "./firebase";
import { useStateValue } from "./contexts/GlobalContext";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
	"pk_test_51HVenzEQKuJpzb7TQlh59oFF5Zyq3iXfcr3hwq2pKUVJHJZxpTdEIVHgEeol8w43u9OLE5er0wQOI9XY08VaQ1FJ00WlqqRatd"
);

function App() {
	const { dispatch } = useStateValue();
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			// console.log("the user is >>>>", authUser);

			if (authUser) {
				// the user is logged in / just logged in
				dispatch({
					type: "SET_USER",
					payload: authUser,
				});
			} else {
				// the user logs out
				dispatch({
					type: "SET_USER",
					payload: null,
				});
			}
		});
	}, [dispatch]);

	//BEM
	return (
		<Router>
			<div className="app">
				<Switch>
					<Route path="/login">
						<Login />
					</Route>

					<Route path="/payment">
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>

					<Route path="/checkout">
						<Header />
						<Checkout />
					</Route>

					<Route path="/orders">
						<Header />
						<Orders />
					</Route>

					<Route path="/">
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
