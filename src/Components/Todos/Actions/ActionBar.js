import React from "react";

import { IconButton, makeStyles} from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import ColorPanel from "./Panels/ColorPanel";
import CheckBoxToggle from "./CheckBoxToggle";

const useStyles = makeStyles(theme => ({
	icon: {
		padding: theme.spacing(1),
		margin: theme.spacing(1, 0),
	},
	popover: {
		pointerEvents: "none",
	},
}));

export default ({onDelete,id,color,setColor, toggleListMode, isChecklist}) => {
	const classes = useStyles({});

	return (
		<>
			<ColorPanel color={color} setColor={setColor}/>
			<CheckBoxToggle
							isChecklist={isChecklist}
							setCheckbox={toggleListMode}
						/>
			<IconButton aria-label="delete" className={classes.icon} onClick={(e)=>{onDelete(e,id)}}>
				<DeleteOutlinedIcon style={{fontSize: 18}} />
			</IconButton>
		</>
	);
};
