import React from "react";
import Banner from "./Banner";
import Contact from "./Contact";
import DentelCare from "./DentelCare";
import Info from "./Info";
import MakeAppointment from "./MakeAppointment";
import Services from "./Services";
import Testimonials from "./Testimonials";

const Home = () => {
	return (
		<div className='px-10'>
			<Banner />
			<Info />
			<Services />
			<DentelCare />
			<MakeAppointment />
			<Testimonials />
			<Contact />
		</div>
	);
};

export default Home;
