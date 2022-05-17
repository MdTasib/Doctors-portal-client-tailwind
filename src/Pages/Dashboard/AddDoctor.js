import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";

const AddDoctor = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const { data: services, isLoading } = useQuery("services", () =>
		fetch("http://localhost:5000/service").then(res => res.json())
	);

	const imageApiKey = "eb7bb93d7839539a8bddb41471f7e0da";

	const onSubmit = async data => {
		const image = data.image[0];
		const formData = new FormData();
		formData.append("image", image);

		fetch(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, {
			method: "POST",
			body: formData,
		})
			.then(res => res.json())
			.then(result => {
				if (result.success) {
					const img = result.data.url;

					const doctor = {
						name: data.name,
						email: data.email,
						specialty: data.specialty,
						img,
					};

					fetch(`http://localhost:5000/doctor`, {
						method: "POST",
						headers: {
							"content-type": "application/json",
							authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
						body: JSON.stringify(doctor),
					})
						.then(res => res.json())
						.then(data => {
							if (data.insertedId) {
								toast.success("Doctor Added Successfully");
							} else {
								toast.error("Failed To Add Doctor");
							}
							reset();
						});
				}
			});
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			<h3 className='text-3xl'>ADD A DOCTOR</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='form-control w-full max-w-xs'>
					<label className='label'>
						<span className='label-text'>Full Name</span>
					</label>
					<input
						type='text'
						placeholder='Your Full Name'
						className='input input-bordered w-full max-w-xs'
						{...register("name", {
							required: {
								value: true,
								message: "Name is Required",
							},
						})}
					/>
					<label className='label'>
						{errors.name?.type === "required" && (
							<span className='label-text-alt text-red-500'>
								{errors.name.message}
							</span>
						)}
					</label>
				</div>
				<div className='form-control w-full max-w-xs'>
					<label className='label'>
						<span className='label-text'>Email</span>
					</label>
					<input
						type='email'
						placeholder='Your Email'
						className='input input-bordered w-full max-w-xs'
						{...register("email", {
							required: {
								value: true,
								message: "Email is Required",
							},
							pattern: {
								value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
								message: "Provide a valid Email",
							},
						})}
					/>
					<label className='label'>
						{errors.email?.type === "required" && (
							<span className='label-text-alt text-red-500'>
								{errors.email.message}
							</span>
						)}
						{errors.email?.type === "pattern" && (
							<span className='label-text-alt text-red-500'>
								{errors.email.message}
							</span>
						)}
					</label>
				</div>

				<div className='form-control w-full max-w-xs'>
					<label className='label'>
						<span className='label-text'>Specialty</span>
					</label>
					<select
						{...register("specialty")}
						className='select select-bordered w-full max-w-xs mb-4'>
						{services.map(service => (
							<option key={service._id} value={service.name}>
								{service.name}
							</option>
						))}
					</select>
				</div>

				<div className='mb-4'>
					<label className='block'>
						<span className='sr-only'>Choose profile photo</span>
						<input
							type='file'
							className='block w-full text-sm text-secondary
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-secondary file:text-white
                      hover:file:bg-[#009678]
                    '
							{...register("image", {
								required: {
									value: true,
									message: "Image is Required",
								},
							})}
						/>
					</label>
					<label className='label'>
						{errors.image?.type === "required" && (
							<span className='label-text-alt text-red-500'>
								{errors.image.message}
							</span>
						)}
					</label>
				</div>

				<input
					className='btn w-full max-w-xs text-white'
					type='submit'
					value='Add doctor'
				/>
			</form>
		</div>
	);
};

export default AddDoctor;
