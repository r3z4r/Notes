import React, {useState} from "react";

import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import {IconButton, Popover, makeStyles} from "@material-ui/core";
import {orange, red, green} from "@material-ui/core/colors";

import Color from "./Color";

const useStyles = makeStyles(theme => ({
	icon: {
		padding: theme.spacing(1),
		margin: theme.spacing(1, 0),
	},
	popover: {
		pointerEvents: "none",
	},
	colors: {
		margin: theme.spacing(0.6),
		display: "flex",
		flexWrap: "wrap",
		maxWidth: 120,
	},
}));

const colors = [orange, red, green];

export default () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);

	const handlePopoverOpen = e => {
		setAnchorEl(e.currentTarget);
	};
	const handlePopoverClose = () => {
		setAnchorEl(null);
	};
	const handleClick = e => {
		e.stopPropagation();
	};
	const palette = Boolean(anchorEl);
	return (
		<IconButton
			aria-label="palette"
			className={classes.icon}
			onMouseEnter={handlePopoverOpen}
			onBlur={handlePopoverClose}
			onClick={handleClick}>
			<PaletteOutlinedIcon style={{fontSize: 18}} />
			<Popover
				className={classes.popover}
				open={palette}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				onClose={handlePopoverClose}
				elevation={2}>
				{
					<div className={classes.colors}>
						{colors.map(color => <Color color={color} />)}
					</div>
				}
			</Popover>
		</IconButton>
	);
};
