import { Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import Navbar from "./Pages/Shared/Navbar";
import Login from "./Pages/Login/Login";
import Appointment from "./Pages/Appointment/Appointment";
import Singup from "./Pages/Login/Singup";

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/home' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/appointment' element={<Appointment />} />
				<Route path='/login' element={<Login />} />
				<Route path='/singup' element={<Singup />} />
			</Routes>
		</div>
	);
}

export default App;
