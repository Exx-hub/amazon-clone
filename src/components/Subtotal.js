import React from "react";
import "../styles/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer/reducer";

import { useHistory } from "react-router-dom";

function Subtotal({ basket }) {
	const history = useHistory();
	const proceedToCheckOut = () => {
		history.push("/payment");
	};
	return (
		<div className="subtotal">
			<CurrencyFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal ({basket.length} items): <strong>{value}</strong>
						</p>
						<small className="subtotal__gift">
							<input type="checkbox" /> <span>This order contains a gift</span>
						</small>
						<button onClick={proceedToCheckOut}>Proceed to Checkout</button>
					</>
				)}
				decimalScale={2}
				value={getBasketTotal(basket)}
				displayType="text"
				thousandSeparator={true}
				prefix="$"
			/>
		</div>
	);
}

export default Subtotal;
