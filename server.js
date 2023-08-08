/* eslint-disable no-undef */
require("dotenv").config();

const fastify = require("fastify")({ logger: true });

// Fetch the publishable key to initialize Stripe.js
fastify.get("/publishable-key", () => {
	return { publishable_key: process.env.STRIPE_PUBLISHABLE_KEY };
});

// Run the server
const start = async () => {
	try {
		await fastify.listen(5252);
		console.log("Server listening ... ");
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
