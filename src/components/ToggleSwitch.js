import React from "react";


const ToggleSwitch = ({ label, open, onChange }) => {
return (
	<>
		<div className="toggle-switch">
			<input type="checkbox" className="checkbox" checked={open} onChange={onChange}
				name={label} id={label}/>
			<label className="label" htmlFor={label}>
				<span className="inner" />
				<span className="switch" />
			</label>
		</div>
		<p className="hide">Make it public</p>
	</>
);
};

export default ToggleSwitch;
