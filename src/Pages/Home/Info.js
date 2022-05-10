import React from "react";
import clock from "../../assets/icons/clock.svg";
import marker from "../../assets/icons/marker.svg";
import phone from "../../assets/icons/phone.svg";
import InfoCard from "./InfoCard";

const Info = () => {
	const infos = [
		{
			title: "Opening Hours",
			description: "Lorem Ipsum is simply dummy text of the pri",
			img: clock,
			color: "bg-gradient-to-r from-secondary to-primary",
		},
		{
			title: "Visit our location",
			description: "Brooklyn, NY 10036, United States",
			img: marker,
			color: "bg-accent",
		},
		{
			title: "Contact us now",
			description: "+000 123 456789",
			img: phone,
			color: "bg-gradient-to-r from-secondary to-primary",
		},
	];

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-x-4 p-5'>
			{infos.map(info => (
				<InfoCard key={info.title} info={info} />
			))}
		</div>
	);
};

export default Info;
