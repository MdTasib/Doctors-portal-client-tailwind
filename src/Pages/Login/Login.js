import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import {
	useSignInWithEmailAndPassword,
	useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";

const Login = () => {
	const [signInWithGoogle, googleUser, googleLoading, googleError] =
		useSignInWithGoogle(auth);
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || "/";

	// loading spinner
	if (googleLoading || loading) {
		return <Loading />;
	}

	// error message
	let errorLogin;
	if (googleError || error) {
		errorLogin = (
			<small className='text-red-500 pb-2 block'>
				{googleError?.message.split(":")[1] || error?.message.split(":")[1]}
			</small>
		);
	}

	// submit login from
	const onSubmit = async data => {
		await signInWithEmailAndPassword(data.email, data.password);
	};

	if (googleUser || user) {
		navigate(from, { replace: true });
	}

	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='card w-96 shadow-xl'>
				<div className='card-body'>
					<h2 className='text-center text-xl font-bold'>LOGIN</h2>
					<div>
						<form onSubmit={handleSubmit(onSubmit)}>
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
							{errorLogin}
							<input
								className='btn w-full max-w-xs text-white'
								type='submit'
								value='Login'
							/>
						</form>
						<div className='form-control mt-2'>
							<p className='text-xs text-center'>
								New to Doctors Portal?{" "}
								<Link to='/singup' className='text-primary'>
									Create new account
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

export default Login;
