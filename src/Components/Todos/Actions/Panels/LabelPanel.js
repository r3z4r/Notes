import React, {useState} from "react";

import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import {
	IconButton,
	Popover,
	makeStyles,
	Typography,
	Tooltip,
} from "@material-ui/core";
import LabelSelect from "../../../Labels/LabelSelect";

const useStyles = makeStyles(theme => ({
	labels: {
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
		<Tooltip title="Change labels">
			<IconButton aria-label="labelPanel" onClick={handleClick}>
				<LabelOutlinedIcon style={{fontSize: 18}} />
				<Popover
					disablePortal={disablePortal}
					disableAutoFocus
					disableEnforceFocus
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
							<Typography
								align="left"
								variant="body2"
								color="textSecondary"
								gutterBottom>
								Label note
							</Typography>
							{labels &&
								Object.keys(labels).map(id =>
									<LabelSelect
										key={id}
										isChecked={selectedLabels.includes(id)}
										setLabels={setLabels}
										label={{id: id, name: labels[id]}}
									/>
								)}
						</div>
					}
				</Popover>
			</IconButton>
		</Tooltip>
	);
};
