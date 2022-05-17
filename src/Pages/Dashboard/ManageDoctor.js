import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";

const ManageDoctor = () => {
	const { data: doctors, isLoading } = useQuery("doctors", () =>
		fetch("http://localhost:5000/doctor", {
			headers: {
				authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		}).then(res => res.json())
	);

	console.log(doctors);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			<h2 className='text-2xl'>Doctors - {doctors.length}</h2>
		</div>
	);
};

export default ManageDoctor;
