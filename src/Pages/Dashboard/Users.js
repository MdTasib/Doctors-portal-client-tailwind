import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import User from "./User";

const Users = () => {
	const {
		data: users,
		isLoading,
		refetch,
	} = useQuery("users", () =>
		fetch("http://localhost:5000/user", {
			method: "GET",
			headers: {
				authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		}).then(res => res.json())
	);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			<h4>This is users page - {users.length}</h4>
			<div className='overflow-x-auto'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th>sr</th>
							<th>Email</th>
							<th>Admin</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<User
								key={user._id}
								user={user}
								index={index}
								refetch={refetch}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
