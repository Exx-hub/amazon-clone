import React from "react";
import "../styles/Checkout.css";
import Subtotal from "./Subtotal";

import { useStateValue } from "../contexts/GlobalContext";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
	const { basket, user } = useStateValue();
	return (
		<div className="checkout">
			<div className="checkout__left">
				<img
					className="checkout__ad"
					src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
					alt=""
				/>
				<div>
					<h3 className="checkout__greeting">
						Hey, {user ? user.email : "Guest"}!
					</h3>
					<h2 className="checkout__title">Your Shopping Basket</h2>

					{basket.map((item, i) => (
						<CheckoutProduct key={i} item={item} />
					))}
				</div>
			</div>

			<div className="checkout__right">
				<Subtotal basket={basket} />
			</div>
		</div>
	);
}

export default Checkout;
