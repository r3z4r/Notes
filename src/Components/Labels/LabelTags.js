import React from "react";

import {Chip, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		"& > *": {
			margin: theme.spacing(1, 0.4, 0, 0),
		},
	},
	chip: {
		backgroundColor: theme.custom.palette.labelBackground,
	},
}));

export default ({labels, onDelete}) => {
	const classes = useStyles();

	const handleClick = () => {};
	return (
		<div className={classes.root}>
			{labels &&
				labels.map(label =>
					<Chip
						className={classes.chip}
						key={label}
						size="small"
						label={label}
						onClick={handleClick}
						onDelete={() => onDelete(label)}
					/>
				)}
		</div>
	);
};
