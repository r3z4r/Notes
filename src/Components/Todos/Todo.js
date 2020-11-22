import React, {useState} from "react";

import {
	Paper,
	Modal,
	Grid,
	InputBase,
	Grow,
	makeStyles,
	Typography,
	Fade,
	useTheme,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import ActionBar from "./ActionBar";

const useStyles = makeStyles(theme => ({
	todo: {
		padding: theme.spacing(1),
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
	const [changed,setChanged] = useState(false)

	const handleOpenModal = () => {
		setEditMode(true);
	};
	const handleCloseModal = () => {
		setEditMode(false);
		if(changed){
			onEditFinish({...todo,
				editedOn: new Date().toISOString(),
			});
		}
	};

	const handleColorUpdate = col => {
		onEditFinish({
			...todo,
			color: col,
			editedOn: new Date().toISOString(),
		});
	};

	const Note = (
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
	);

	return (
		<>
			<Modal
				className={classes.modal}
				open={isEditMode}
				onClose={handleCloseModal}>
				<Grow in={isEditMode}>
					<Paper className={classes.todo}>
						<InputBase
							style={{fontSize:24}}
							fullWidth
							autoFocus
							placeholder="Title"
							value={title}
							onChange={e =>
								{
									updateTodo({...todo, title: e.target.value});
									setChanged(true)
								}}
						/>
						<InputBase
							style={{width:"95%"}}
							placeholder="Take a note"
							multiline
							value={note}
							onChange={e =>
								{
									updateTodo({...todo, note: e.target.value})
									setChanged(true)
								}}
						/>
						<br />
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
								{
									updateTodo({
										...todo,
										color: col,
									})
									setChanged(true)
								}}
						/>
					</Paper>
				</Grow>
			</Modal>
			<Grid item xs={12} sm={6} md={4} lg={3} >
				{isEditMode
					? <Skeleton className={classes.todo} height="65%" style={{transform:"none"}}>
							{Note}
						</Skeleton>
					: <Grow in={!isEditMode} style={{transformOrigin: "0 0 0"}}>
							{Note}
						</Grow>}
			</Grid>
		</>
	);
};
