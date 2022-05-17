import React from "react";
import toast from "react-hot-toast";

const DeleteDoctorModal = ({ deleteDoctor, refetch, setDeleteDoctor }) => {
	const { name, img, specialty, email } = deleteDoctor;

	const handleDelete = () => {
		fetch(`http://localhost:5000/doctor/${email}`, {
			method: "DELETE",
			headers: {
				authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then(res => res.json())
			.then(data => {
				toast.success(`Doctor ${name} is deleted`);
				setDeleteDoctor(null);
				refetch();
			});
	};

	return (
		<div>
			<input
				type='checkbox'
				id='delete-docotr-modal'
				className='modal-toggle'
			/>
			<div className='modal modal-bottom sm:modal-middle'>
				<div className='modal-box text-center'>
					<div className='avatar'>
						<div className='w-28 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2'>
							<img src={img} alt={name} />
						</div>
					</div>
					<h3 className='text-lg text-red-500'>
						Are you sure delete a Doctor <b>{name}</b> ?
					</h3>
					<p className='py-4'>
						<b>Specialty :</b> {specialty}
					</p>
					<div className='modal-action'>
						<button className='btn-error btn text-white' onClick={handleDelete}>
							Delete
						</button>
						<label htmlFor='delete-docotr-modal' className='btn'>
							Cencle
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteDoctorModal;
