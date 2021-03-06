import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
	const [user] = useAuthState(auth);
	const [admin] = useAdmin(user);

	return (
		<div className='drawer drawer-mobile'>
			<input id='dashboard-sidebar' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content p-5'>
				{/* <!-- Page content here --> */}
				<h1 className='text-3xl text-secondary font-bold pb-5'>DASHBOARD</h1>
				<Outlet />
			</div>
			<div className='drawer-side z-0'>
				<label htmlFor='dashboard-sidebar' className='drawer-overlay'></label>
				<ul className='menu p-4 overflow-y-auto w-70 bg-secondary text-base-content'>
					{/* <!-- Sidebar content here --> */}
					<li className='text-white'>
						<Link to='/dashboard'>My Appointment</Link>
					</li>
					<li className='text-white'>
						<Link to='/dashboard/review'>My Review</Link>
					</li>
					<li className='text-white'>
						<Link to='/dashboard/history'>My History</Link>
					</li>
					{admin && (
						<>
							<li className='text-white'>
								<Link to='/dashboard/users'>All Users</Link>
							</li>
							<li className='text-white'>
								<Link to='/dashboard/manageDoctor'>All Doctors</Link>
							</li>
							<li className='text-white'>
								<Link to='/dashboard/addDoctor'>Add Doctor</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Dashboard;
