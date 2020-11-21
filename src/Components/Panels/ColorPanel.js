import React, {useState} from "react";

import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import {IconButton, Popover, makeStyles, useTheme} from "@material-ui/core";

import Color from "./Color";

const useStyles = makeStyles(theme => ({
	icon: {
		padding: theme.spacing(1),
		marginLeft: theme.spacing(1),
	},
	popover: {
		pointerEvents: "none",
	},
	colors: {
		pointerEvents: "auto",
		display: "flex",
		flexWrap: "wrap",
		maxWidth: theme.spacing(18),
	},
}));

export default ({color, setColor}) => {
	const classes = useStyles();
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState(null);
	const handlePopoverOpen = e => {
		setAnchorEl(e.currentTarget);
	};
	const handlePopoverClose = () => {
		setAnchorEl(null);
	};
	const palette = Boolean(anchorEl);
	const handleClick = e => {
		e.stopPropagation();
		palette ? handlePopoverClose() : handlePopoverOpen(e);
	};
	return (
		<IconButton
			edge="start"
			aria-label="palette"
			className={classes.icon}
			onMouseEnter={handlePopoverOpen}
			onMouseLeave={handlePopoverClose}
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
					<div className={classes.colors} onMouseLeave={handlePopoverClose}>
						{Object.keys(theme.custom.palette.noteBackground).map(item =>
							<Color
								key={item}
								color={item}
								selectedColor={color}
								checked={color === item}
								setColor={setColor}
							/>
						)}
					</div>
				}
			</Popover>
		</IconButton>
	);
};
