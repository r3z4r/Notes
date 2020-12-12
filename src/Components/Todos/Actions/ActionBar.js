import React, {Fragment} from "react";

import {IconButton, makeStyles} from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import ColorPanel from "./Panels/ColorPanel";
import CheckBoxToggle from "./CheckBoxToggle";
import LabelPanel from "./Panels/LabelPanel";

const useStyles = makeStyles(theme => ({
	icon: {
		padding: theme.spacing(1),
		margin: theme.spacing(1, 0),
	},
	popover: {
		pointerEvents: "none",
	},
}));

export default ({
	onDelete,
	id,
	color,
	setColor,
	toggleListMode,
	isChecklist,
	labels,
	selectedLabels,
	setLabels,
}) => {
	const classes = useStyles({});

	return (
		<Fragment>
			<ColorPanel color={color} setColor={setColor} />
			<CheckBoxToggle isChecklist={isChecklist} setChecklist={toggleListMode} />
			<LabelPanel
				selectedLabels={selectedLabels}
				labels={labels}
				setLabels={setLabels}
			/>
			<IconButton
				aria-label="delete"
				className={classes.icon}
				onClick={e => {
					onDelete(e, id);
				}}>
				<DeleteOutlinedIcon style={{fontSize: 18}} />
			</IconButton>
		</Fragment>
	);
};
