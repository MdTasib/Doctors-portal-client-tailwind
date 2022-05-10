import React from "react";
import chair from "../../assets/images/chair.png";
import headerBG from "../../assets/images/bg.png";
import PrimaryButton from "../Shared/PrimaryButton";

const Banner = () => {
	return (
		<div
			className='hero min-h-screen'
			style={{ backgroundImage: `url(${headerBG})` }}>
			<div className='hero-content flex-col flex flex-row justify-between lg:flex-row-reverse'>
				<img
					src={chair}
					alt='doctors portal'
					className='max-w-sm rounded-lg shadow-2xl basis-2/4'
				/>
				<div className='basis-2/4'>
					<h1 className='text-5xl font-bold'>Your New Smile Starts Here!</h1>
					<p className='py-6'>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the
					</p>
					<PrimaryButton>GET STARTED</PrimaryButton>
				</div>
			</div>
		</div>
	);
};

export default Banner;
