import React from "react";
import { useStateValue } from "../contexts/GlobalContext";
import "../styles/CheckoutProduct.css";

function CheckoutProduct({ item, hideButton }) {
	const { image, title, id, rating, price } = item;

	const { dispatch } = useStateValue();

	const removeFromBasket = (itemId) => {
		dispatch({
			type: "REMOVE_FROM_BASKET",
			payload: itemId,
		});
	};
	return (
		<div className="checkoutProduct">
			<img alt="" src={image} className="checkoutProduct__image" />

			<div className="checkoutProduct__info">
				<p className="checkoutProduct__title">{title}</p>
				<p className="checkoutProduct__price">
					<small>$</small>
					<strong>{price}</strong>
				</p>

				<div className="checkoutProduct__rating">
					{Array(rating)
						.fill()
						.map((_, index) => (
							<img src="star.svg" alt="" key={index} />
						))}
				</div>
				{!hideButton && (
					<button onClick={() => removeFromBasket(id)}>
						Remove from Checkout
					</button>
				)}
			</div>
		</div>
	);
}

export default CheckoutProduct;
