import React from "react";
import { toast } from "react-hot-toast";

const User = ({ user, index, refetch }) => {
	const { email, role } = user;

	const makeAdmin = () => {
		fetch(`http://localhost:5000/user/admin/${email}`, {
			method: "PUT",
			headers: {
				authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then(res => {
				if (res.status === 403) {
					toast.error("You don't make an admin");
				}
				return res.json();
			})
			.then(data => {
				if (data.modifiedCount > 0) {
					refetch();
					toast.success(`Successfully Create An Admin.`);
				}
			});
	};
	return (
		<tr>
			<th>{index + 1}</th>
			<td>{email}</td>
			<td>
				{role !== "admin" && (
					<button
						onClick={makeAdmin}
						className='btn btn-outline btn-xs btn-secondary text-white'>
						Make Admin
					</button>
				)}
			</td>
			<td>
				<button className='btn btn-outline btn-error btn-xs text-white'>
					Remove user
				</button>
			</td>
		</tr>
	);
};

export default User;
