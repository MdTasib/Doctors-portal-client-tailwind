import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const MyAppointment = () => {
	const [appointments, setAppointments] = useState([]);
	const [user, loading] = useAuthState(auth);

	useEffect(() => {
		fetch(`http://localhost:5000/booking?patient=${user?.email}`)
			.then(res => res.json())
			.then(data => setAppointments(data));
	}, [user]);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className='px-5'>
			<h2>my appointment page : {appointments.length}</h2>
			<div className='overflow-x-auto'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Date</th>
							<th>Time</th>
							<th>Treatment</th>
						</tr>
					</thead>
					<tbody>
						{appointments.map((appointment, index) => (
							<tr key={appointment._id}>
								<th>{index}</th>
								<td>{appointment.patientName}</td>
								<td>{appointment.date}</td>
								<td>{appointment.slot}</td>
								<td>{appointment.treatment}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyAppointment;
