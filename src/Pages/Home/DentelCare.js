import React from "react";
import dentelCareImg from "../../assets/images/treatment.png";
import PrimaryButton from "../Shared/PrimaryButton";

const DentelCare = () => {
	return (
		<div className='hero min-h-screen'>
			<div className='hero-content flex-col flex flex-row justify-between lg:flex-row-reverse'>
				<div className='basis-2/4'>
					<h1 className='text-5xl font-bold'>
						Exceptional Dental Care, on Your Terms!
					</h1>
					<p className='py-6'>
						It is a long established fact that a reader will be distracted by
						the readable content of a page when looking at its layout. The point
						of using Lorem Ipsumis that it has a more-or-less normal
						distribution of letters,as opposed to using 'Content here, content
						here', making it look like readable English. Many desktop publishing
						packages and web page
					</p>
					<PrimaryButton>Get Started</PrimaryButton>
				</div>
				<img
					src={dentelCareImg}
					alt='doctors portal'
					className='max-w-sm rounded-lg shadow-2xl basis-2/4'
				/>
			</div>
		</div>
	);
};

export default DentelCare;
