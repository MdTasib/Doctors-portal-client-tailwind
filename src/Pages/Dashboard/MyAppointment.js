import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const MyAppointment = () => {
	const [appointments, setAppointments] = useState([]);
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`http://localhost:5000/booking?patient=${user?.email}`, {
			method: "GET",
			headers: {
				authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then(res => {
				if (res.status === 401 || res.status === 403) {
					signOut(auth);
					localStorage.removeItem("accessToken");
					navigate("/");
				}
				return res.json();
			})
			.then(data => setAppointments(data));
	}, [user, navigate]);

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
						{appointments?.map((appointment, index) => (
							<tr key={appointment._id}>
								<th>{index + 1}</th>
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
