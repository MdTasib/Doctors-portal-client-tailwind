import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import Loading from "../Shared/Loading";

const CheckoutForm = ({ appointment }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [cardError, setCardError] = useState("");
	const [success, setSuccess] = useState("");
	const [transactionId, setTransacticeId] = useState("");
	const [clientSecret, setClientSecret] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);

	const { _id, patient, patientName, price } = appointment;

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
			setSuccess("");
			setIsProcessing(true);
		} else {
			setCardError("");
			console.log("[PaymentMethod]", paymentMethod);
			if (paymentMethod) {
				console.log("success");
			}
		}

		// confirm card payment
		const { paymentIntent, error: intentError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						name: patientName,
						email: patient,
					},
				},
			});

		if (intentError) {
			setCardError(intentError.message);
			setSuccess("");
			setIsProcessing(false);
		} else {
			setTransacticeId(paymentIntent.id);
			setCardError("");
			setSuccess("Congrats!! Your payment is complete. 😀🤩");

			// store payment on database
			const payment = {
				appointment: _id,
				transactionId: paymentIntent.id,
			};

			console.log(payment);

			fetch(`http://localhost:5000/booking/${_id}`, {
				method: "PATCH",
				headers: {
					"content-type": "application/json",
					authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
				body: JSON.stringify(payment),
			})
				.then(res => res.json())
				.then(data => {
					setIsProcessing(false);
					console.log(data);
				});
		}
	};

	if (isProcessing) {
		return <Loading />;
	}

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
			{success && (
				<div className='pt-2'>
					<p className='text-green-500'>{success}</p>
					<span className='text-orange-500'>
						Your Transactice id: <b>{transactionId}</b>
					</span>
				</div>
			)}
		</>
	);
};

export default CheckoutForm;
