import React from "react";

import {IconButton, makeStyles} from "@material-ui/core";
import IndeterminateCheckBoxOutlinedIcon from "@material-ui/icons/IndeterminateCheckBoxOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";

const useStyles = makeStyles(theme => ({
	icon: {
		padding: theme.spacing(1),
	},
}));

export default ({isChecklist, setChecklist}) => {
	const classes = useStyles();
	return (
		<IconButton
			className={classes.icon}
			onClick={e => {
				e.stopPropagation();
				setChecklist();
			}}>
			{isChecklist
				? <IndeterminateCheckBoxOutlinedIcon style={{fontSize: 18}} />
				: <CheckBoxOutlinedIcon style={{fontSize: 18}} />}
		</IconButton>
	);
};
