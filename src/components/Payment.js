import React, { useState, useEffect } from "react";
import "../styles/Payment.css";
import { useStateValue } from "../contexts/GlobalContext";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer/reducer";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import axios from "../axios/axios"; // this is from the instance axios created

import { db } from "../firebase";

function Payment() {
	const history = useHistory();
	const { basket, user, dispatch } = useStateValue();

	const stripe = useStripe();
	const elements = useElements();

	const [processing, setProcessing] = useState(false);
	const [succeeded, setSucceeded] = useState(false);

	const [disabled, setDisabled] = useState(true);
	const [error, setError] = useState(null);

	const [clientSecret, setClientSecret] = useState(true);

	useEffect(() => {
		// generate the special stripe secret which allows us to charge a customer

		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
				// params: {
				// 	total: getBasketTotal(basket) * 100,
				// 	name: "alvin",
				// },
			}); // stripe expects the total in a currency's subunits like cents for dollars
			console.log(response);
			setClientSecret(response.data.clientSecret);
		};

		getClientSecret();
	}, [basket]);

	console.log("the secret is >>>", clientSecret);
	console.log(":person >>>", user);

	const handleSubmit = async (event) => {
		// do all the fancy stripe stuff
		event.preventDefault();
		setProcessing(true);

		// clientsecret is how stripe knows how much the client is paying for,
		// payment method is grabbed info from the card element below
		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				// paymentIntent = payment confirmation

				// no SQL database
				db.collection("users")
					.doc(user?.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				setSucceeded(true);
				setError(null);
				setProcessing(false);

				// after successful payment need to empty basket and proceed to orders page
				dispatch({
					type: "EMPTY_BASKET",
					payload: [],
				});

				history.replace("/orders");
			});
	};
	const handleChange = (event) => {
		//listen for changes in the CardElement
		setDisabled(event.empty);
		setError(event.error ? event.error.message : "");
	};
	return (
		<div className="payment">
			<h1>
				Checkout
				<Link to="/checkout" className="link">
					({basket?.length} items)
				</Link>
			</h1>
			<div className="payment-container">
				{/* delivery address  */}
				<div className="payment__section">
					<div className="payment__title">
						<h3>Delivery Address</h3>
					</div>
					<div className="payment__address">
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>Siargao, Ph</p>
					</div>
				</div>
				{/* review items  */}
				<div className="payment__section">
					<div className="payment__title">
						<h3>Review Items and Delivery</h3>
					</div>
					{/* reused the checkout product component  */}
					<div className="payment__items">
						{basket?.map((item, i) => (
							<CheckoutProduct key={i} item={item} hideButton />
						))}
					</div>
				</div>
				{/* payment method  */}
				<div className="payment__section">
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>
					<div className="payment__details">
						{/* stripe magic  */}
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />
							<div className="payment__priceContainer">
								<CurrencyFormat
									renderText={(value) => <h3>Order Total: {value}</h3>}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType="text"
									thousandSeparator={true}
									prefix="$"
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? "Processing" : "Buy Now"}</span>
								</button>

								{error && <div>{error.message}</div>}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
