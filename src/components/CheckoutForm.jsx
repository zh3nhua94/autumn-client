import React, { useEffect, useRef, useState } from "react";
import {
	PaymentElement,
	useStripe,
	useElements,
	LinkAuthenticationElement,
	AddressElement,
} from "@stripe/react-stripe-js";
import styled from "styled-components";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const Title = styled.h2`
	margin: 30px 0;
`;

const PayButton = styled.button`
	padding: 15px 30px;
	margin: 30px 0 0;
	background-color: teal;
	color: white;
	font-weight: 600;
	cursor: pointer;
	font-size: 16px;
	border: none;
	border-radius: 8px;
`;

export default function CheckoutForm() {
	const { currentUser } = useSelector((state) => state.user);
	const cart = useSelector((state) => state.cart);
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [address, setAddress] = useState({});

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again.");
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	//create order
	const createOrder = async (e) => {
		try {
			await userRequest.post(`/orders`, {
				userId: currentUser._id,
				products: cart.products,
				amount: cart.total,
				address: address,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		//create order
		await createOrder();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: import.meta.env.VITE_PUBLIC_URL + "/success",
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs",
	};

	return (
		<form
			id="payment-form"
			onSubmit={handleSubmit}
		>
			{/* EMAIL INPUT */}
			<LinkAuthenticationElement id="link-authentication-element" />
			{/* PAYMENT INPUT */}
			<PaymentElement
				id="payment-element"
				options={paymentElementOptions}
			/>
			<Title>Address</Title>
			{/* ADDRESS INPUT */}
			<AddressElement
				options={{ mode: "shipping" }}
				onChange={(event) => {
					if (event.complete) {
						// Extract potentially complete address
						setAddress(event.value.address);
					}
				}}
			/>
			<PayButton
				disabled={isLoading || !stripe || !elements}
				id="submit"
			>
				<span id="button-text">
					{isLoading ? (
						<div
							className="spinner"
							id="spinner"
						></div>
					) : (
						"Pay now"
					)}
				</span>
			</PayButton>
			{/* Show any error or success messages */}
			{message && <div id="payment-message">{message}</div>}
		</form>
	);
}
