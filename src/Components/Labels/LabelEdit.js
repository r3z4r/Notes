import React, {useContext, useRef, useState} from "react";

import {
	Button,
	Divider,
	Fade,
	Input,
	InputBase,
	makeStyles,
	Modal,
	Paper,
	Typography,
	IconButton,
} from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Close";

import {globalContext} from "../../context/store";

const useStyles = makeStyles(theme => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		border: "none",
	},
	container: {
		boxShadow: theme.shadows[8],
		width: theme.spacing(32),
		padding: theme.spacing(3, 2),
		outline: "none",
	},
	footer: {
		display: "flex",
		justifyContent: "flex-end",
		padding: theme.spacing(1),
	},
	row: {
		display: "flex",
		alignItems: "center",
		outline: "none",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	icon: {
		padding: theme.spacing(0.8),
		color: isHovered =>
			isHovered
				? theme.custom.palette.iconHighlight
				: theme.custom.palette.iconColor,
	},
}));

export default ({show, close}) => {
	const classes = useStyles();
	const {startLoading, endLoading, setError, labels, setLabels} = useContext(
		globalContext
	);
	const [newLabel, setNewLabel] = useState("");

	const handleCreateLabel = async () => {
		setNewLabel("");
		startLoading();
		try {
			const res = await fetch(
				`${process.env.REACT_APP_BASE_URL}/userInfo/labels.json`,
				{
					method: "POST",
					body: JSON.stringify(newLabel),
				}
			);
			const response = await res.json();
			endLoading();
			if (res.ok) {
				const updatedLabels = {...labels};
				updatedLabels[response.name] = newLabel;
				setLabels(updatedLabels);
			} else {
				setError(res.statusText);
			}
		} catch (err) {
			console.error(err);
			setError(err.message);
		}
	};

	const onEdit = async id => {
		startLoading();
		try {
			const res = await fetch(
				`${process.env.REACT_APP_BASE_URL}/userInfo/labels/${id}.json`,
				{
					method: "PUT",
					body: JSON.stringify(labels[id]),
				}
			);
			endLoading();
			if (res.ok) {
			} else {
				setError(res.statusText);
			}
		} catch (err) {
			setError(err.message);
		}
	};

	const onDelete = async id => {
		startLoading();
		try {
			const res = await fetch(
				`${process.env.REACT_APP_BASE_URL}/userInfo/labels/${id}.json`,
				{
					method: "DELETE",
				}
			);
			endLoading();
			if (!res.ok) {
				setError(res.statusText);
			} else {
				const updatedLabels = {...labels};
				delete updatedLabels[id];
				setLabels(updatedLabels);
			}
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<Modal className={classes.modal} open={show} onClose={close}>
			<Fade in={show}>
				<Paper className={classes.container} square>
					<Typography variant="h6" paragraph>
						Edit labels
					</Typography>
					<div className={classes.row}>
						<IconButton className={classes.icon}>
							<CancelIcon style={{fontSize: 18}} />
						</IconButton>
						<Input
							autoFocus
							placeholder="Create a new label"
							fullWidth
							value={newLabel}
							onChange={e => setNewLabel(e.target.value)}
						/>
						<IconButton
							className={classes.icon}
							disabled={newLabel.length === 0}
							onClick={handleCreateLabel}>
							<DoneIcon
								color={newLabel.length === 0 ? "primary" : "secondary"}
								style={{fontSize: 18}}
							/>
						</IconButton>
					</div>
					{labels &&
						Object.keys(labels).map(id =>
							<Label
								key={id}
								name={labels[id]}
								onChange={editedName =>
									setLabels({...labels, [id]: editedName})}
								onEdit={() => onEdit(id)}
								onDelete={() => onDelete(id)}
							/>
						)}
					<Divider />
					<div className={classes.footer}>
						<Button color="secondary" onClick={close}>
							Done
						</Button>
					</div>
				</Paper>
			</Fade>
		</Modal>
	);
};

const Label = ({name, onChange, onEdit, onDelete}) => {
	const [editedName, setEditedName] = useState(name);
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const classes = useStyles(isHovered);
	const inputRef = useRef(null);

	return (
		<div
			className={classes.row}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<IconButton className={classes.icon} onClick={onDelete}>
				{isHovered
					? <DeleteIcon style={{fontSize: 18}} />
					: <LabelIcon style={{fontSize: 18}} />}
			</IconButton>
			<InputBase
				onFocus={() => setIsFocused(true)}
				onBlur={e => {
					if (e.relatedTarget === null) {
						setIsFocused(false);
					} else if (e.relatedTarget.id === `${name}-button`) {
						return;
					}
					setIsFocused(false);
				}}
				className={classes.input}
				inputRef={inputRef}
				onChange={e => setEditedName(e.target.value)}
				fullWidth
				placeholder="Enter label name"
				value={editedName}
			/>
			<IconButton
				id={`${name}-button`}
				onClick={() => {
					if (isFocused) {
						if (editedName !== name) {
							onChange(editedName);
							onEdit();
						}
						setIsFocused(false);
					} else {
						inputRef.current.select();
					}
				}}
				className={classes.icon}>
				{isFocused
					? <DoneIcon color="secondary" style={{fontSize: 18}} />
					: <EditIcon style={{fontSize: 18}} />}
			</IconButton>
		</div>
	);
};
