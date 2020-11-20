import React from "react";
import "../styles/Product.css";

import { useStateValue } from "../contexts/GlobalContext";

function Product({ id, title, price, image, rating }) {
	const { dispatch } = useStateValue();
	// console.log(state);

	const addToBasket = () => {
		dispatch({
			type: "ADD_TO_BASKET",
			payload: {
				id,
				title,
				price,
				image,
				rating,
			},
		});
	};

	return (
		<div className="product">
			<div className="product__info">
				<p>{title}</p>
				<p className="product__price">
					<small>$</small>
					<strong>{price}</strong>
				</p>

				<div className="product__rating">
					{Array(rating)
						.fill()
						.map((item, index) => (
							<img src="star.svg" alt="" key={index} />
						))}
				</div>
			</div>

			<img src={image} alt="" />

			<button onClick={addToBasket}>Add to basket</button>
		</div>
	);
}

export default Product;

// let arr = [];
// for (let i = 0; i < rating; i++) {
//   arr.push(1);
// }
// {arr.map((item) => (
//   <img src="star.svg" alt="" /> ))}
