import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";

const Navbar = () => {
	const [user] = useAuthState(auth);

	const logout = () => {
		signOut(auth);
	};

	const menuItems = (
		<>
			<li>
				<Link to='/home'>Home</Link>
			</li>
			<li>
				<Link to='/about'>About</Link>
			</li>
			<li>
				<Link to='/appointment'>Appointment</Link>
			</li>
			<li>
				<Link to='/reviews'>Reviews</Link>
			</li>
			<li>
				<Link to='/contact'>Contact</Link>
			</li>
			{user && (
				<li>
					<Link to='/dashboard'>Dashboard</Link>
				</li>
			)}
			<li>
				{user ? (
					<button className='btn btn-ghost' onClick={logout}>
						<small className='font-bold text-secondary'>Sign Out</small>
					</button>
				) : (
					<Link to='/login'>Login</Link>
				)}
			</li>
		</>
	);
	return (
		<div className='navbar bg-base-100 sticky top-0 z-10 border-b-2 border-gray-100 px-10'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<label tabIndex='0' className='lg:hidden'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h8m-8 6h16'
							/>
						</svg>
					</label>
					<ul
						tabIndex='0'
						className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
						{menuItems}
					</ul>
				</div>
				<Link to='/' className='font-bold normal-case text-xl ml-5'>
					Doctors <small className='text-secondary'>Portal</small>
				</Link>
			</div>
			<div className='navbar-end hidden lg:flex'>
				<ul className='menu menu-horizontal p-0'>{menuItems}</ul>
			</div>
			<label
				htmlFor='dashboard-sidebar'
				tabIndex='1'
				className='drawer-button lg:hidden navbar-end'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M4 6h16M4 12h8m-8 6h16'
					/>
				</svg>
			</label>
		</div>
	);
};

export default Navbar;
