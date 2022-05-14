import React from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import {
	useCreateUserWithEmailAndPassword,
	useSignInWithGoogle,
	useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import useToken from "../../hooks/useToken";

const Singup = () => {
	const [signInWithGoogle, googleUser, googleLoading, googleError] =
		useSignInWithGoogle(auth);
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);
	const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const [token] = useToken(googleUser || user);

	// loading spinner
	if (googleLoading || loading || updating) {
		return <Loading />;
	}

	// error message
	let errorSingup;
	if (googleError || error || updateProfileError) {
		errorSingup = (
			<small className='text-red-500 pb-2 block'>
				{googleError?.message.split(":")[1] ||
					error?.message.split(":")[1] ||
					error?.updateProfileError.split(":")[1]}
			</small>
		);
	}

	// submit login from
	const onSubmit = async data => {
		await createUserWithEmailAndPassword(data.email, data.password);
		await updateProfile({ displayName: data.name });
	};

	if (token) {
		navigate("/appointment");
	}

	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='card w-96 shadow-xl'>
				<div className='card-body'>
					<h2 className='text-center text-xl font-bold'>SING UP</h2>
					<div>
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
									<span className='label-text'>Password</span>
								</label>
								<input
									type='password'
									placeholder='Password'
									className='input input-bordered w-full max-w-xs'
									{...register("password", {
										required: {
											value: true,
											message: "Password is Required",
										},
										minLength: {
											value: 6,
											message: "Must be 6 characters or longer",
										},
									})}
								/>
								<label className='label'>
									{errors.password?.type === "required" && (
										<span className='label-text-alt text-red-500'>
											{errors.password.message}
										</span>
									)}
									{errors.password?.type === "minLength" && (
										<span className='label-text-alt text-red-500'>
											{errors.password.message}
										</span>
									)}
								</label>
								<label className='label pt-0'>
									<p className='label-text-alt link link-hover'>
										Forgot password?
									</p>
								</label>
							</div>
							{errorSingup}
							<input
								className='btn w-full max-w-xs text-white'
								type='submit'
								value='Sing Up'
							/>
						</form>
						<div className='form-control mt-2'>
							<p className='text-xs text-center'>
								Already have an account ?
								<Link to='/login' className='text-primary'>
									Please Login
								</Link>
							</p>
						</div>
						<div className='divider'>OR</div>
						<div className='text-center'>
							<button
								onClick={() => signInWithGoogle()}
								className='btn btn-outline'>
								CONTINUE WITH GOOGLE
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Singup;
