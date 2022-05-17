import { Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import Navbar from "./Pages/Shared/Navbar";
import Login from "./Pages/Login/Login";
import Appointment from "./Pages/Appointment/Appointment";
import Singup from "./Pages/Login/Singup";
import RequireAuth from "./Pages/Login/RequireAuth";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyAppointment from "./Pages/Dashboard/MyAppointment";
import MyReview from "./Pages/Dashboard/MyReview";
import History from "./Pages/Dashboard/History";
import Users from "./Pages/Dashboard/Users";
import RequireAdmin from "./Pages/Dashboard/RequireAdmin";
import AddDoctor from "./Pages/Dashboard/AddDoctor";
import ManageDoctor from "./Pages/Dashboard/ManageDoctor";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/home' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route
					path='/appointment'
					element={
						<RequireAuth>
							<Appointment />
						</RequireAuth>
					}
				/>
				<Route
					path='/dashboard'
					element={
						<RequireAuth>
							<Dashboard />
						</RequireAuth>
					}>
					<Route index element={<MyAppointment />} />
					<Route path='/dashboard/review' element={<MyReview />} />
					<Route path='/dashboard/history' element={<History />} />
					<Route
						path='/dashboard/users'
						element={
							<RequireAdmin>
								<Users />
							</RequireAdmin>
						}
					/>
					<Route
						path='/dashboard/addDoctor'
						element={
							<RequireAdmin>
								<AddDoctor />
							</RequireAdmin>
						}
					/>
					<Route
						path='/dashboard/manageDoctor'
						element={
							<RequireAdmin>
								<ManageDoctor />
							</RequireAdmin>
						}
					/>
				</Route>
				<Route path='/login' element={<Login />} />
				<Route path='/singup' element={<Singup />} />
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
