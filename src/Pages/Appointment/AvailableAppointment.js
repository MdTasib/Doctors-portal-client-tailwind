import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Service from "./Service";

const AvailableAppointment = ({ date }) => {
	const [services, setServices] = useState([]);

	useEffect(() => {
		fetch("services.json")
			.then(res => res.json())
			.then(data => setServices(data));
	}, []);

	return (
		<div className='py-10'>
			<h4 className='text-secondary text-center text-xl'>
				Available Appointments on <b>{format(date, "PP")}</b>
			</h4>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10'>
				{services.map(service => (
					<Service key={service._id} service={service} />
				))}
			</div>
		</div>
	);
};

export default AvailableAppointment;
