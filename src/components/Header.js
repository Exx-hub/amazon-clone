import React from "react";
import "../styles/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import { Link, useHistory } from "react-router-dom";

import { useStateValue } from "../contexts/GlobalContext";
import { auth } from "../firebase";

function Header() {
	const history = useHistory();
	const { basket, user } = useStateValue();

	const handleAuthentication = () => {
		auth.signOut();
	};
	const handleLogin = () => {
		history.push("/login");
	};
	const returnToOrders = () => {
		history.push("/orders");
	};

	return (
		<div className="header">
			<Link to="/">
				<img
					className="header__logo"
					src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
					alt="amazon logo"
				/>
			</Link>
			<div className="header__search">
				<input className="header__searchInput" type="text" />
				<SearchIcon className="header__searchIcon" />
			</div>

			<div className="header__nav">
				<div
					onClick={user ? handleAuthentication : handleLogin}
					className="header__option"
				>
					<span className="header__optionLineOne">
						Hello, {user ? user.email : "Guest"}
					</span>
					<span className="header__optionLineTwo">
						{user ? "Sign Out" : "Sign In"}
					</span>
				</div>

				<div className="header__option" onClick={returnToOrders}>
					<span className="header__optionLineOne">Returns</span>
					<span className="header__optionLineTwo">& Orders</span>
				</div>
				<div className="header__option">
					<span className="header__optionLineOne">Your</span>
					<span className="header__optionLineTwo">Prime</span>
				</div>
				<Link to="/checkout">
					<div className="header__optionBasket">
						<ShoppingBasketIcon className="header__basketIcon" />

						<span className="header__optionLineTwo header__basketCount">
							{basket?.length}
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Header;
