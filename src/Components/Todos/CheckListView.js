import React, {useState, useEffect, useRef} from "react";
import clsx from 'clsx'
import {
	makeStyles,
	Checkbox,
	IconButton,
	Typography,
	Divider,
	Collapse,
	Fade,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import _ from "lodash";

const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(0, -1.5),
	},
	row: {
		display: "flex",
		"&:hover": {
			boxShadow: "0 0 2px grey inset",
		},
		"&:focus-within": {
			boxShadow: "0 0 2px grey inset",
		},
	},
	input: {
		backgroundColor: "#0000",
		color: theme.palette.text.primary,
		fontSize: 18,
		outline: "none",
		border: "none",
		alignSelf: "stretch",
		flexGrow: 1,
	},
	collapse:{
		display:"flex",
		color: theme.palette.text.hint,
		margin: theme.spacing(1),
		cursor: "pointer",
		"&:hover":{
			color: theme.palette.text.primary,
		}
	},
	done:{
		textDecoration:"line-through"
	}
}));

export default ({notes, setNote, editMode, expandcompleted, setExpandCompleted}) => {
	const classes = useStyles();
	const [activeInput, setActiveinput] = useState(0);
	const inputRef = useRef(null);

	useEffect(
		() => {
			inputRef.current&&inputRef.current.focus();
		},
		[activeInput]
	);

	const onListChange = (e, order) => {
		const changedNotes = [...notes];
		if (e.key === "Enter") {
			if (changedNotes[order].text === "") {
				return;
			}
			changedNotes.splice(order + 1, 0, {text: "", isCompleted: false});
			setActiveinput(perv => perv + 1);
			} else {
				changedNotes[order] =
					e.target.getAttribute("type") === "checkbox"
						? {...notes[order], isCompleted: e.target.checked}
						: {...notes[order], text: e.target.value};
			}
		setNote(changedNotes);
	};

	const onDelete = (order)=>{
		const changedNotes = [...notes];
		changedNotes.splice(order, 1);
		setNote(changedNotes)
	}

	const partitionedNotes = notes?_.partition(notes.map((note,index)=>({...note,order:index})), ["isCompleted", false]):[[],[]];
	const notDoneLength = partitionedNotes[0].length;
	const doneLength = partitionedNotes[1].length;

	return (
		<div className={classes.root}>
			{editMode?
				partitionedNotes[0].map((note, index) =>
					<ChecklistEditView key={note.order} onDelete={()=>onDelete(note.order)}  showDelete={notes.length>1}>
						<Checkbox
							checked={note.isCompleted}
							onChange={e => onListChange(e, note.order)}
						/>
						<input
							className={classes.input}
							placeholder="+ List Item"
							ref={index === activeInput ? inputRef : null}
							onFocus={() => setActiveinput(index)}
							value={note.text}
							onKeyDown={e => {
								e.key === "Enter" && onListChange(e, note.order);
							}}
							onChange={e => onListChange(e, note.order)}
						/>
					</ChecklistEditView>
				)
			:partitionedNotes[0].map((note) =>
				<div style={{display: "flex"}} key={note.order}>
					<Checkbox
						checked={note.isCompleted}
						size="small"
						style={{alignSelf: "baseline"}}
						onClick={e=>{
							e.stopPropagation();
							onListChange(e, note.order);
						}}
					/>
					<Typography variant="subtitle1" style={{alignSelf: "center"}}>
						{note.text}
					</Typography>
				</div>
			)}
			{doneLength>0&&<>
				<Divider variant='middle'/>
				<div className={classes.collapse} onClick={(e)=>{
						e.stopPropagation();
						setExpandCompleted(perv=>!perv);
					}}>
					{expandcompleted?<ExpandMoreIcon/>:<NavigateNextIcon/>}
					<Typography
						variant="body1"
						gutterBottom>{`${doneLength} is completed`}</Typography>
				</div>
			</>}
			<Collapse in={expandcompleted}>
				{editMode? 
					partitionedNotes[1].map((note, index) =>
						<ChecklistEditView key={note.order} onDelete={()=>onDelete(note.order)}>
							<Checkbox
								checked={note.isCompleted}
								color="default"
								onChange={e => onListChange(e, note.order)}
							/>
							<input
								className={clsx(classes.input,classes.done)}
								placeholder="+ List Item"
								ref={index+notDoneLength === activeInput ? inputRef : null}
								onFocus={() => setActiveinput(index+notDoneLength)}
								value={note.text}
								onKeyDown={e => {
									e.key === "Enter" && onListChange(e, note.order);
								}}
								onChange={e => onListChange(e, note.order)}
							/>
						</ChecklistEditView>
						)
					:partitionedNotes[1].map((note, index) =>
						<div style={{display: "flex"}} key={index + notDoneLength}>
							<Checkbox
								checked={note.isCompleted}
								size="small"
								color="default"
								style={{alignSelf: "baseline"}}
								onClick={e=>{
									e.stopPropagation();
									onListChange(e, note.order);
								}}
							/>
							<Typography variant="subtitle1" className={classes.done} style={{alignSelf: "center"}}>
								{note.text}
							</Typography>
						</div>
					)}
			</Collapse>
		</div>
	);
};


const ChecklistEditView = ({children,onDelete,showDelete})=>{
	const classes = useStyles();
	const [isHovered, setHovered] = useState(false);
	return(
		<div
			className={classes.row}
			onMouseOver={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}>
				{children}
				<Fade in={isHovered && showDelete}>
					<IconButton onClick={onDelete}>
						<ClearIcon />
					</IconButton>
				</Fade>
		</div>
	)

}