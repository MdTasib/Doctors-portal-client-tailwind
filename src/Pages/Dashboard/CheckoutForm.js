import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ appointment }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [cardError, setCardError] = useState("");
	const [clientSecret, setClientSecret] = useState("");

	console.log("clinent sectret", clientSecret);

	const { price } = appointment;

	useEffect(() => {
		fetch("http://localhost:5000/create-payment-intent", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
			body: JSON.stringify({ price }),
		})
			.then(res => res.json())
			.then(data => {
				if (data?.clientSecret) {
					setClientSecret(data.clientSecret);
				}
			});
	}, [price]);

	const handleSubmit = async event => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);

		if (card === null) {
			return;
		}

		// Use your card Element with other Stripe.js APIs
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			setCardError(error?.message);
		} else {
			setCardError("");
			console.log("[PaymentMethod]", paymentMethod);
			if (paymentMethod) {
				console.log("success");
			}
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: "16px",
								color: "#424770",
								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#9e2146",
							},
						},
					}}
				/>
				<button
					type='submit'
					className='btn-secondary btn btn-sm text-white mt-10'
					disabled={!stripe || !clientSecret}>
					Pay
				</button>
			</form>
			{cardError && <small className='text-red-500'>{cardError}</small>}
		</>
	);
};

export default CheckoutForm;
