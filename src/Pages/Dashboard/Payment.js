import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Shared/Loading";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
	"pk_test_51IeAZaFLS713LSSjm5z39rde0Dw558BCbCNNKnHZznQzN9khB8LRy5SdjLKzazWus6sKcNwr70ajIgGmWBloqgCy00pmDjThkv"
);

const Payment = () => {
	const { id } = useParams();
	const url = `http://localhost:5000/booking/${id}`;

	const { data: appointment, isLoading } = useQuery(["booking", id], () =>
		fetch(url, {
			method: "GET",
			headers: {
				authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		}).then(res => res.json())
	);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			<div class='card w-50 max-w-md bg-base-100 shadow-xl my-12'>
				<div class='card-body'>
					<p className='text-secondary font-bold text-xl'>
						Hello, {appointment.patientName}
					</p>
					<h2 class='card-title'>Please Pay for {appointment.treatment}</h2>
					<p>
						<b className='text-secondary'>Your Appointment:</b>{" "}
						{appointment.date} at {appointment.slot}
					</p>
					<p>
						<b className='text-secondary'>Please pay:</b> ${appointment.price}
					</p>
				</div>
			</div>
			<div class='card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100'>
				<div class='card-body'>
					<Elements stripe={stripePromise}>
						<CheckoutForm />
					</Elements>
				</div>
			</div>
		</div>
	);
};

export default Payment;
