import React from "react";

import { IconButton, makeStyles} from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import ColorPanel from "../Panels/ColorPanel";

const useStyles = makeStyles(theme => ({
	icon: {
		padding: theme.spacing(1),
		margin: theme.spacing(1, 0),
	},
	popover: {
		pointerEvents: "none",
	},
}));

export default ({onDelete,id,color,setColor}) => {
	const classes = useStyles({});

	return (
		<>
			<ColorPanel color={color} setColor={setColor}/>
			<IconButton aria-label="delete" className={classes.icon} onClick={(e)=>{onDelete(e,id)}}>
				<DeleteOutlinedIcon style={{fontSize: 18}} />
			</IconButton>
		</>
	);
};
