import React from "react";
import toast from "react-hot-toast";

const Doctor = ({ doctor, index, refetch }) => {
	const { img, name, specialty, email } = doctor;

	const handleDelete = email => {
		const confirm = window.confirm(`Are you sure delete Doctor ${name}?`);
		if (confirm) {
			fetch(`http://localhost:5000/doctor/${email}`, {
				method: "DELETE",
				headers: {
					authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			})
				.then(res => res.json())
				.then(data => {
					toast.success(`Doctor ${name} is deleted`);
					refetch();
				});
		}
	};
	return (
		<tr>
			<th>{index + 1}</th>
			<td>
				<div className='avatar'>
					<div className='w-12 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2'>
						<img src={img} alt={name} />
					</div>
				</div>
			</td>
			<td className='font-bold'>{name}</td>
			<td>{specialty}</td>
			<td>
				<button
					onClick={() => handleDelete(email)}
					className='btn btn-circle btn-outline btn-error btn-sm'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</button>
			</td>
		</tr>
	);
};

export default Doctor;
