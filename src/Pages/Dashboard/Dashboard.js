import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
	return (
		<div className='drawer drawer-mobile'>
			<input id='dashboard-sidebar' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content'>
				{/* <!-- Page content here --> */}
				<h1 className='text-3xl text-secondary font-bold'>Dashboad</h1>
				<Outlet />
			</div>
			<div className='drawer-side z-0'>
				<label htmlFor='dashboard-sidebar' className='drawer-overlay'></label>
				<ul className='menu p-4 overflow-y-auto w-80 bg-secondary text-base-content'>
					{/* <!-- Sidebar content here --> */}
					<li>
						<Link to='/dashboard'>My Appointment</Link>
					</li>
					<li>
						<Link to='/dashboard/review'>My Review</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Dashboard;
