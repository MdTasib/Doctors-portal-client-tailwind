import React from "react";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const Login = () => {
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

	if (user) {
		console.dir(user);
	}

	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='card w-96 shadow-xl'>
				<div className='card-body'>
					<h2 className='text-center text-2xl font-bold'>LOGIN</h2>
					<div>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Email</span>
							</label>
							<input
								type='text'
								className='input input-bordered input-primary'
							/>
						</div>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Password</span>
							</label>
							<input
								type='text'
								className='input input-bordered input-primary'
							/>
							<label className='label'>
								<p className='label-text-alt link link-hover'>
									Forgot password?
								</p>
							</label>
						</div>
						<div className='form-control mt-6'>
							<button className='btn btn-primary text-white font-bold'>
								Login
							</button>
							<p className='text-xs text-center mt-2'>
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
								className='btn btn-outline btn-primary'>
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
