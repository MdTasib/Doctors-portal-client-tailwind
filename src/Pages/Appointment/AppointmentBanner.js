import React, { useState } from "react";
import chair from "../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const AppointmentBanner = () => {
	const [date, setDate] = useState(new Date());

	let footer = <p>Please pick a day.</p>;
	if (date) {
		footer = <p>You picked {format(date, "PP")}.</p>;
	}

	return (
		<div className='hero min-h-screen'>
			<div className='hero-content flex-col flex flex-row justify-between lg:flex-row-reverse'>
				<img
					src={chair}
					alt='doctors portal'
					className='max-w-sm rounded-lg shadow-2xl basis-2/4'
				/>
				<div className='basis-2/4 px-10'>
					<DayPicker
						mode='single'
						selected={date}
						onSelect={setDate}
						footer={footer}
					/>
				</div>
			</div>
		</div>
	);
};

export default AppointmentBanner;
