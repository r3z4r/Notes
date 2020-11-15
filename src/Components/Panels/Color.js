import React from "react";

import {IconButton, makeStyles} from "@material-ui/core";

const useStyle = makeStyles({
	Color: {
		width: 18,
		height: 18,
		flex: 1,
		backgroundColor: color => color[500],
		borderRadius: 25,
	},
});

export default ({color}) => {
	const classes = useStyle(color);

	return (
		<IconButton style={{padding: 10}}>
			<div className={classes.Color} />
		</IconButton>
	);
};
