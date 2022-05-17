import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import DeleteDoctorModal from "./DeleteDoctorModal";
import Doctor from "./Doctor";

const ManageDoctor = () => {
	const [deleteDoctor, setDeleteDoctor] = useState(null);

	const {
		data: doctors,
		isLoading,
		refetch,
	} = useQuery("doctors", () =>
		fetch("http://localhost:5000/doctor", {
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
			<h2 className='text-2xl'>Doctors - {doctors.length}</h2>
			<div className='overflow-x-auto'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th>SR</th>
							<th>Photo</th>
							<th>Name</th>
							<th>Specialty</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{doctors.map((doctor, index) => (
							<Doctor
								key={doctor._id}
								doctor={doctor}
								index={index}
								refetch={refetch}
								setDeleteDoctor={setDeleteDoctor}
							/>
						))}
					</tbody>
				</table>
				{deleteDoctor && (
					<DeleteDoctorModal
						deleteDoctor={deleteDoctor}
						refetch={refetch}
						setDeleteDoctor={setDeleteDoctor}
					/>
				)}
			</div>
		</div>
	);
};

export default ManageDoctor;
