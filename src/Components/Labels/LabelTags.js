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
		"&:hover": {
			backgroundColor: theme.custom.palette.labelHoverBackground,
		},
	},
}));

export default ({selectedLabels, onDelete}) => {
	const classes = useStyles();
	const {labels, setFilter} = useContext(globalContext);

	return (
		<div className={classes.root}>
			{selectedLabels &&
				labels &&
				selectedLabels.map(
					id =>
						labels[id] &&
						<Chip
							className={classes.chip}
							key={id}
							size="small"
							label={labels[id]}
							onClick={e => {
								e.stopPropagation();
								setFilter(id);
							}}
							onDelete={() => onDelete(id)}
						/>
				)}
		</div>
	);
};
