import React, {useState ,useContext} from "react";

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
import ActionBar from "./Actions/ActionBar";
import {globalContext} from '../../context/store'
import ChecklistView from "./CheckListView";

const useStyles = makeStyles(theme => ({
	todo: {
		padding: theme.spacing(1,1.5,0),
		whiteSpace: "pre-line",
		margin: "auto",
		outline: "none",
		backgroundColor: ({color}) => color,
		maxWidth : theme.spacing(70),
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
	const {id, title, note, color, editedOn, isChecklist} = todo;
	const [expandcompleted,setExpandCompleted]= useState(false)
	const {listview} = useContext(globalContext)
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
		setChanged(false);
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

	const handleToggleChecklist= ()=>{
		let newNote;
		if (isChecklist) {
			newNote = note.map(item => item.text).join("\n");
		} else {
			newNote= note.split("\n").map(item => ({text: item, isCompleted: false}))
		}
		return({
			...todo,
			isChecklist: !isChecklist,
			note: newNote,
			editedOn: new Date().toISOString(),
		});
	}

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
			{isChecklist?<ChecklistView 
							expandcompleted={expandcompleted} 
							setExpandCompleted={setExpandCompleted}  
							notes={note}
							setNote={(notes)=>
								onEditFinish({...todo, note: notes})
							}/>
						:<Typography variant="subtitle1">
							{note}
						</Typography>}
			<Fade in={isHovered}>
				<div>
					<ActionBar
						id={id}
						onDelete={onDelete}
						color={color}
						setColor={col => handleColorUpdate(col)}
						isChecklist = {isChecklist}
						toggleListMode = {()=>{
							onEditFinish(handleToggleChecklist());
						}}
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
						{isChecklist?<ChecklistView 
										expandcompleted={expandcompleted} 
										setExpandCompleted={setExpandCompleted} 
										editMode notes={note} 
										setNote={notes =>
										{
											updateTodo({...todo, note: notes})
											setChanged(true)
										}} />
									:<InputBase
										style={{width:"95%"}}
										placeholder="Take a note"
										multiline
										value={note}
										onChange={e =>
											{
												updateTodo({...todo, note: e.target.value})
												setChanged(true)
											}}
									/>}
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
							isChecklist = {isChecklist}
							toggleListMode = {() =>
								{
									updateTodo(handleToggleChecklist());
									setChanged(true);
								}}
						/>
					</Paper>
				</Grow>
			</Modal>
			<Grid item xs={12} sm={listview?12:6} md={listview?12:4} lg={listview?12:3} xl={listview?12:2} >
				{isEditMode
					? <Skeleton className={classes.todo} height="60%" style={{transform:"none"}}>
							{Note}
						</Skeleton>
					: <Grow in={!isEditMode} >
							{Note}
						</Grow>}
			</Grid>
		</>
	);
};
