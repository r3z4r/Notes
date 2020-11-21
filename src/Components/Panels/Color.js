import React from "react";

import {Checkbox, makeStyles} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const useStyle = makeStyles(theme => ({
	checkboxRoot: {
		padding: theme.spacing(0.5),
	},
	circle: {
		height: theme.spacing(3.5),
		width: theme.spacing(3.5),
		flex: 1,
		backgroundColor: ({color}) => theme.custom.palette.noteBackground[color],
		borderRadius: "50%",
	},
}));

export default ({color, checked, setColor}) => {
	const classes = useStyle();

	return (
		<Checkbox
			classes={{root: classes.checkboxRoot}}
			checkedIcon={<CheckedIcon color={color} />}
			icon={<UncheckedIcon color={color} />}
			checked={checked}
			onChange={() => setColor(color)}
		/>
	);
};

const UncheckedIcon = ({color}) => {
	const classes = useStyle({color: color});
	return <span className={classes.circle} />;
};
const CheckedIcon = ({color}) => {
	const classes = useStyle({color: color});
	return (
		<span className={classes.circle}>
			<CheckIcon />
		</span>
	);
};
