import React, { useEffect, useState } from "react";
import "../styles/Orders.css";

import { db } from "../firebase"; // now we use the data from data base to render in this page
import { useStateValue } from "../contexts/GlobalContext";
import Order from "./Order";

function Orders() {
	const { user } = useStateValue();
	const [orders, setOrders] = useState();

	useEffect(() => {
		if (user) {
			db.collection("users")
				.doc(user?.uid)
				.collection("orders")
				.orderBy("created", "desc")
				.onSnapshot((snapshot) => {
					setOrders(
						snapshot.docs.map((doc) => {
							return {
								id: doc.id,
								data: doc.data(),
							};
						})
					);
				});
		} else {
			setOrders([]);
		}
	}, [user]);
	console.log(orders);
	return (
		<div className="orders">
			<h1>Your Orders</h1>
			<div className="orders__order">
				{orders?.map((order) => (
					<Order key={order.id} order={order} />
				))}
			</div>
		</div>
	);
}

export default Orders;
