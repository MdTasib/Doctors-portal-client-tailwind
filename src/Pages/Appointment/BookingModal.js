import { format } from "date-fns";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../../firebase.init";

const BookingModal = ({ treatment, setTreatment, date, refetch }) => {
	const [user] = useAuthState(auth);
	const { _id, name, slots, price } = treatment;
	const formattedDate = format(date, "PP");

	const handleBooking = event => {
		event.preventDefault();
		const slot = event.target.slot.value;
		const phone = event.target.phone.value;

		const booking = {
			treatmentId: _id,
			treatment: name,
			date: formattedDate,
			slot,
			price,
			patient: user?.email,
			patientName: user?.displayName,
			phone,
		};

		fetch("http://localhost:5000/booking", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(booking),
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					toast.success(`Appointment set on ${formattedDate} at ${slot}`);
				} else {
					toast.error(
						`Already have an appointment on ${data.booking?.date} at ${data.booking?.slot}`
					);
				}
				refetch();
				setTreatment(null);
			});
	};

	return (
		<div>
			<input type='checkbox' id='booking-modal' className='modal-toggle' />
			<div className='modal modal-bottom sm:modal-middle'>
				<div className='modal-box'>
					<label
						htmlFor='booking-modal'
						className='btn btn-sm btn-circle absolute right-2 top-2'>
						✕
					</label>
					<h3 className='font-bold text-lg pb-5 text-secondary'>{name}</h3>
					<form onSubmit={handleBooking}>
						<input
							value={format(date, "PP")}
							disabled
							type='text'
							name='date'
							className='input input-sm input-bordered input-secondary w-full my-2'
						/>
						<select
							name='slot'
							className='select select-sm select-secondary w-full my-2'>
							{slots.map(slot => (
								<option key={slot}>{slot}</option>
							))}
						</select>
						<input
							type='text'
							disabled
							value={user?.displayName}
							name='name'
							className='input input-sm input-bordered input-secondary w-full my-2'
						/>
						<input
							type='text'
							name='phone'
							placeholder='Phone Number'
							className='input input-sm input-bordered input-secondary w-full my-2'
						/>
						<input
							type='email'
							name='email'
							disabled
							value={user?.email}
							className='input input-sm input-bordered input-secondary w-full my-2'
						/>
						<input
							type='submit'
							value='SUBMIT'
							className='btn btn-secondary text-white btn-sm w-full my-2'
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default BookingModal;
