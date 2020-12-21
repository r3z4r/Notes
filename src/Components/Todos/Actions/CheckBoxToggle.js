import React from "react";

import {IconButton, Tooltip} from "@material-ui/core";
import IndeterminateCheckBoxOutlinedIcon from "@material-ui/icons/IndeterminateCheckBoxOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";

export default ({isChecklist, setChecklist}) => {
	return (
		<Tooltip title="Toggle checkboxes">
			<IconButton
				onClick={e => {
					e.stopPropagation();
					setChecklist();
				}}>
				{isChecklist
					? <IndeterminateCheckBoxOutlinedIcon style={{fontSize: 18}} />
					: <CheckBoxOutlinedIcon style={{fontSize: 18}} />}
			</IconButton>
		</Tooltip>
	);
};
