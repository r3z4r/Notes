import React, {useContext} from "react";

import {Chip, makeStyles} from "@material-ui/core";
import {globalContext} from "../../context/store";

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

export default ({selectedLabels, onDelete}) => {
	const classes = useStyles();
	const {labels} = useContext(globalContext);

	const handleClick = () => {};
	return (
		<div className={classes.root}>
			{selectedLabels &&
				selectedLabels.map(id =>
					<Chip
						className={classes.chip}
						key={id}
						size="small"
						label={labels && labels[id]}
						onClick={handleClick}
						onDelete={() => onDelete(id)}
					/>
				)}
		</div>
	);
};
