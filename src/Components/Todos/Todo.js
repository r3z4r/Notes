import React, {useState} from "react";

import {
	Paper,
	Modal,
	Grid,
	InputBase,
	Zoom,
	makeStyles,
	Typography,
	Fade,
	useTheme,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import ActionBar from "./ActionBar";

const useStyles = makeStyles(theme => ({
	todo: {
		padding: theme.spacing(1, 0),
		whiteSpace: "pre-line",
		margin: theme.spacing(2, 1),
		outline: "none",
		backgroundColor: ({color}) => color,
		"& p, h6, div": {
			margin: theme.spacing(0, 2),
		},
		"&:hover": {
			boxShadow: theme.shadows[3],
		},
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},

	popover: {
		pointerEvents: "none",
	},
}));

export default ({todo, onDelete, onEditFinish, updateTodo}) => {
	const {id, title, note, color, editedOn} = todo;
	const date = new Date(editedOn).toDateString();
	const theme = useTheme();
	const classes = useStyles({
		color: theme.custom.palette.noteBackground[color],
	});

	const [isEditMode, setEditMode] = useState(false);
	const [isHovered, setHovered] = useState(false);

	const handleOpenModal = () => {
		setEditMode(true);
	};
	const handleCloseModal = () => {
		setEditMode(false);
		onEditFinish(id, {
			title: title,
			note: note,
			color: color,
			editedOn: new Date().toISOString(),
		});
	};

	const handleColorUpdate = col => {
		const editedOn = new Date().toISOString();
		updateTodo({
			id: id,
			title: title,
			note: note,
			color: col,
			editedOn: editedOn,
		});
		onEditFinish(id, {
			title: title,
			note: note,
			color: col,
			editedOn: editedOn,
		});
	};

	return isEditMode
		? <>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<Skeleton height="100%" />
				</Grid>
				<Modal
					className={classes.modal}
					open={isEditMode}
					onClose={handleCloseModal}>
					<Zoom in={isEditMode}>
						<Paper className={classes.todo}>
							<InputBase
								fullWidth
								autoFocus
								placeholder="Title"
								value={title}
								onChange={e =>
									updateTodo({id: id, title: e.target.value, note: note})}
							/>
							<InputBase
								fullWidth
								placeholder="Take a note"
								multiline
								value={note}
								onChange={e =>
									updateTodo({id: id, title: title, note: e.target.value})}
							/>
							<br />
							<Typography
								variant="caption"
								display="block"
								align="right"
								color="textSecondary"
								style={{fontSize: 10, marginRight: 8}}>
								{`Edited ${date}`}
							</Typography>
							<ActionBar
								id={id}
								onDelete={onDelete}
								color={color}
								setColor={col =>
									updateTodo({
										id: id,
										title: title,
										note: note,
										color: col,
										editedOn: new Date().toISOString(),
									})}
							/>
						</Paper>
					</Zoom>
				</Modal>
			</>
		: <Grid item xs={12} sm={6} md={4} lg={3}>
				<Paper
					className={classes.todo}
					variant="outlined"
					onClick={handleOpenModal}
					onMouseOver={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}>
					<Typography variant="h6">
						{title}
					</Typography>
					<Typography variant="subtitle1">
						{note}
					</Typography>
					<Fade in={isHovered}>
						<div>
							<ActionBar
								id={id}
								onDelete={onDelete}
								color={color}
								setColor={col => handleColorUpdate(col)}
							/>
						</div>
					</Fade>
				</Paper>
			</Grid>;
};
