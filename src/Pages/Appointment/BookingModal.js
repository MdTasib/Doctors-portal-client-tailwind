import { format } from "date-fns";
import React from "react";

const BookingModal = ({ treatment, setTreatment, date }) => {
	const { _id, name, slots } = treatment;

	const handleBooking = event => {
		event.preventDefault();
		const slot = event.target.slot.value;
		console.log(_id, name, slot, date);

		setTreatment(null);
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
							placeholder='Full Name'
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
							placeholder='Email'
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
