// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");

const express = require("express");

const cors = require("cors");
const { request, response } = require("express");

const stripe = require("stripe")(
	"sk_test_51HVenzEQKuJpzb7TCiUx9gqanlI6OJXjjrryrfKGOkDhphYXUR85Ru72ZTAc1M0XipOdJ5eOeJoUf7cW5Jxk2nbY00Roa4w0pW"
);
// secret key

// ** API SET UP ** //
// this is the setup needed to get the backend express app running on cloud functions

// - App Config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world")); // this tests the api if it is working

app.post("/payments/create", async (request, response) => {
	const total = request.query.total;

	// console.log("total is >>>", request.query); // testing
	console.log("payment request received boom! >>>>>", total);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total, // subcurrencies (cents for dollars)
		currency: "usd",
	});

	// OK - created something
	response.status(201).send({
		clientSecret: paymentIntent.client_secret,
		name: "alvin", // added for testing
	});
});

// - Listen Command
exports.api = functions.https.onRequest(app);

// this is the api end point -- example end point
//http://localhost:5001/clone-54c59/us-central1/api
// put this in the axios create instance. this will be the base url
