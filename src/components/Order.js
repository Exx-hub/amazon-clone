import React from "react";
import "../styles/Order.css";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "./CheckoutProduct";

function Order({ order }) {
	console.log(order);
	return (
		<div className="order">
			<h2>Order</h2>
			<p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
			<p className="order__id">
				<small>{order.id}</small>
			</p>
			{order.data.basket?.map((item) => (
				<CheckoutProduct key={item.id} item={item} hideButton />
			))}
			<CurrencyFormat
				renderText={(value) => (
					<h3 className="order__total"> Order Total: {value}</h3>
				)}
				decimalScale={2}
				value={order.data.amount / 100}
				displayType="text"
				thousandSeparator={true}
				prefix="$"
			/>
		</div>
	);
}

export default Order;
