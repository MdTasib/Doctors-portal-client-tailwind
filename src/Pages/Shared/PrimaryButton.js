import React from "react";

const PrimaryButton = ({ children, disable }) => {
	return (
		<button
			disabled={disable}
			className='btn btn-primary text-white font-bold bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary border-0'>
			{children}
		</button>
	);
};

export default PrimaryButton;
