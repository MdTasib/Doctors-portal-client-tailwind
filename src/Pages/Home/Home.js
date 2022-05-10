import React from "react";
import Banner from "./Banner";
import DentelCare from "./DentelCare";
import Info from "./Info";
import MakeAppointment from "./MakeAppointment";
import Services from "./Services";

const Home = () => {
	return (
		<div className='px-10'>
			<Banner />
			<Info />
			<Services />
			<DentelCare />
			<MakeAppointment />
		</div>
	);
};

export default Home;
