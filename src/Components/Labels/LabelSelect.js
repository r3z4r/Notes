import React from "react";
import {makeStyles, Checkbox, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {},
	row: {
		margin: theme.spacing(0, -1.5),
		cursor: "pointer",
		display: "flex",
		"&:hover": {
			backgroundColor: theme.custom.palette.labelBackground,
		},
	},
}));

export default ({label, isChecked, setLabels}) => {
	const classes = useStyles();
	return (
		<div
			className={classes.row}
			onClick={e => {
				e.stopPropagation();
				setLabels(label.id);
			}}>
			<Checkbox checked={isChecked} size="small" color="default" />
			<Typography variant="body2" style={{alignSelf: "center"}}>
				{label.name}
			</Typography>
		</div>
	);
};
