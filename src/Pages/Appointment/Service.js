import React from "react";
import PrimaryButton from "../Shared/PrimaryButton";

const Service = ({ service, setTreatment }) => {
	const { name, slots } = service;

	return (
		<div className='card bg-white text-neutral-content drop-shadow-lg'>
			<div className='card-body items-center text-center'>
				<h2 className='card-title text-secondary'>{name}</h2>
				{slots.length ? (
					<span className='text-black text-sm'>{slots[0]}</span>
				) : (
					<span className='text-red-500 text-sm'>Try another date</span>
				)}
				<p className='text-black text-xs'>
					{slots.length} {slots.length > 1 ? "SPACES" : "SPACE"} AVAILABLE
				</p>
				<div className='card-actions justify-end'>
					<label
						onClick={() => setTreatment(service)}
						htmlFor='booking-modal'
						className={`btn btn-primary text-white font-bold bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary border-0 modal-button ${
							slots.length === 0 && "btn-disabled"
						}`}>
						Book Appointment
					</label>
				</div>
			</div>
		</div>
	);
};

export default Service;
