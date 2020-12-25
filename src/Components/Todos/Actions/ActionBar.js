import React, {Fragment, useState} from "react";

import {IconButton, makeStyles, Tooltip} from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import ColorPanel from "./Panels/ColorPanel";
import CheckBoxToggle from "./CheckBoxToggle";
import LabelPanel from "./Panels/LabelPanel";
import ArchiveToggle from "./ArchiveToggle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import AlertMessage from "../../UI/AlertMessage";

const useStyles = makeStyles(theme => ({
	actions: {
		margin: theme.spacing(0.5, 0),
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
	const classes = useStyles();
	const [deleteAlert, setDeleteAlert] = useState(false);
	return (
		<div className={classes.actions}>
			{selectedLabels.some(label => label === "trash")
				? <Fragment>
						<Tooltip title="Delete note forever">
							<IconButton
								aria-label="delete"
								onClick={e => {
									e.stopPropagation();
									setDeleteAlert(true);
								}}>
								<DeleteForeverIcon style={{fontSize: 18}} />
							</IconButton>
						</Tooltip>
						<Tooltip title="Restore note">
							<IconButton
								aria-label="restore"
								onClick={() => {
									setLabels("trash");
								}}>
								<RestoreFromTrashIcon style={{fontSize: 18}} />
							</IconButton>
						</Tooltip>
					</Fragment>
				: <Fragment>
						<ColorPanel color={color} setColor={setColor} />
						<CheckBoxToggle
							isChecklist={isChecklist}
							setChecklist={toggleListMode}
						/>
						<LabelPanel
							selectedLabels={selectedLabels}
							labels={labels}
							setLabels={setLabels}
						/>
						<ArchiveToggle
							isArchived={selectedLabels.some(label => label === "archive")}
							setLabels={setLabels}
						/>
						<Tooltip title="Delete note">
							<IconButton
								aria-label="delete"
								onClick={() => {
									setLabels("trash");
								}}>
								<DeleteOutlinedIcon style={{fontSize: 18}} />
							</IconButton>
						</Tooltip>
					</Fragment>}
			<AlertMessage
				show={deleteAlert}
				onCancel={e => {
					e.stopPropagation();
					setDeleteAlert(false);
				}}
				onConfirm={e => {
					e.stopPropagation();
					onDelete(id);
				}}
			/>
		</div>
	);
};
