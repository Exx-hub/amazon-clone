import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/Login.css";

import { auth } from "../firebase";

function Login() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signIn = (e) => {
		e.preventDefault();

		// checks if user email and password exists and correct then logs the user in and
		// redirects to home page

		auth
			.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				if (auth) {
					history.push("/");
				}
			})
			.catch((error) => alert(error.message));
	};

	const register = (e) => {
		e.preventDefault();

		// creates a new user with email and password or returns an error if any then if successful
		// redirects the page to the home page
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((auth) => {
				if (auth) {
					history.push("/");
				}
			})
			.catch((error) => alert(error));
	};
	return (
		<div className="login">
			<Link to="/">
				<img
					className="login__logo"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
					alt="amazon logo"
				/>
			</Link>
			<div className="login__container">
				<h1>Sign-in</h1>
				<form className="login__form">
					<h5>Email</h5>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<h5>Password</h5>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						type="submit"
						onClick={signIn}
						className="login__signInbutton"
					>
						Log in
					</button>
				</form>
				<p>
					By signing-in you agree to AMAZON FAKE CLONE's Conditions of Use &
					Sale. Please see our Privacy Notice, our Cookies Notice and our
					Interest-Based Ads Notice.
				</p>
				<button onClick={register} className="login__registerButton">
					Create your Amazon Account
				</button>
			</div>
		</div>
	);
}

export default Login;
