import React, { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Container = styled.div`
	max-width: 800px;
	margin: 0px auto 50px;
	padding: 20px;
	min-height: 50vh;
`;

const CheckoutWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 20px;
	align-items: center;
`;
const Title = styled.h1`
	margin: 30px 0;
`;

const Price = styled.p`
	font-size: 24px;
	font-weight: 500;
`;

const Pay = () => {
	const [clientSecret, setClientSecret] = useState("");
	const initialized = useRef(false);
	const cart = useSelector((state) => state.cart);

	useEffect(() => {
		const makeRequest = async () => {
			try {
				// Create PaymentIntent as soon as the page loads
				fetch(import.meta.env.VITE_API_URL + "/checkout/payment", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ amount: cart.total * 100 }),
				})
					.then((res) => res.json())
					.then((data) => setClientSecret(data.clientSecret));
			} catch (err) {
				console.log(err);
			}
		};
		//only allow useEffect run once, prevent Stripe generating duplicate orders
		if (!initialized.current) {
			initialized.current = true;
			makeRequest();
		}
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<>
			<Announcement />
			<Navbar />
			<Container>
				{clientSecret && (
					<Elements
						options={options}
						stripe={stripePromise}
					>
						{" "}
						<CheckoutWrapper>
							<Title>Checkout</Title>
							<Price>Total: ${cart.total}</Price>
						</CheckoutWrapper>
						<CheckoutForm />
					</Elements>
				)}
			</Container>
			<Footer />
		</>
	);
};

export default Pay;
