import React from "react";

import IconButton from "@material-ui/core/IconButton";
import IndeterminateCheckBoxOutlinedIcon from "@material-ui/icons/IndeterminateCheckBoxOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";

export default ({isChecklist, setCheckbox}) => {
	return (
		<IconButton
			onClick={e => {
				e.stopPropagation();
				setCheckbox();
			}}>
			{isChecklist
				? <IndeterminateCheckBoxOutlinedIcon style={{fontSize: 18}} />
				: <CheckBoxOutlinedIcon style={{fontSize: 18}} />}
		</IconButton>
	);
};
