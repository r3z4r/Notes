import React, {useState} from "react";

import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import {IconButton, Popover, makeStyles, Typography} from "@material-ui/core";
import LabelSelect from "../../../Labels/LabelSelect";

const useStyles = makeStyles(theme => ({
	icon: {
		padding: theme.spacing(1),
	},
	popover: {
		pointerEvents: "none",
	},
	labels: {
		pointerEvents: "auto",
		width: theme.spacing(24),
		padding: theme.spacing(1),
	},
}));

export default ({labels, selectedLabels, setLabels, disablePortal}) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const handlePopoverOpen = e => {
		setAnchorEl(e.currentTarget);
	};
	const handlePopoverClose = () => {
		setAnchorEl(null);
	};
	const labelPanel = Boolean(anchorEl);
	const handleClick = e => {
		e.stopPropagation();
		labelPanel ? handlePopoverClose() : handlePopoverOpen(e);
	};
	return (
		<IconButton
			aria-label="labelPanel"
			className={classes.icon}
			onClick={handleClick}>
			<LabelOutlinedIcon style={{fontSize: 18}} />
			<Popover
				disablePortal={disablePortal}
				disableAutoFocus
				disableEnforceFocus
				className={classes.popover}
				open={labelPanel}
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
					<div className={classes.labels}>
						<Typography align="left" variant="body2" color="textSecondary">
							Label note
						</Typography>
						{labels &&
							labels.map(label =>
								<LabelSelect
									key={label}
									isChecked={
										selectedLabels ? selectedLabels.includes(label) : false
									}
									setLabels={setLabels}
									label={label}
								/>
							)}
					</div>
				}
			</Popover>
		</IconButton>
	);
};
