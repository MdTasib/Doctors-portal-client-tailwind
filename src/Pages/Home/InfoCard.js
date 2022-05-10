import React from "react";

const InfoCard = ({ info }) => {
	const { img, title, description, color } = info;
	return (
		<div className={`card card-side shadow-xl text-white px-3 ${color}`}>
			<figure>
				<img src={img} alt='Movie' />
			</figure>
			<div className='card-body'>
				<h2 className='card-title'>{title}</h2>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default InfoCard;
