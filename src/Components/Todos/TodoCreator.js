import React, {useState, useContext} from "react";

import {InputBase, makeStyles, Paper, Button} from "@material-ui/core";
import {globalContext} from "../../context/store";
import ColorPanel from "./Actions/Panels/ColorPanel";
import CheckBoxToggle from "./Actions/CheckBoxToggle";
import CheckListView from "./CheckListView";

const useStyles = makeStyles(theme => ({
	root: {
		padding: "8px 12px",
		maxWidth: theme.spacing(70),
		margin: "36px auto",
		outline: "none",
		backgroundColor: ({col}) => theme.custom.palette.noteBackground[col],
	},
	gap: {
		flexGrow: 1,
	},
	input: {
		flexGrow: 1,
	},
	action: {
		display: "flex",
	},
}));

const Todo = () => {
	const [typing, setTyping] = useState(false);
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");
	const [color, setColor] = useState("default");
	const [isChecklist, setCheckbox] = useState(false);
	const [expandcompleted, setExpandCompleted] = useState(true);

	const classes = useStyles({col: color});
	const {addTodo, startLoading, setError} = useContext(globalContext);

	const addTodoHandler = async () => {
		setColor("default");
		setTyping(false);
		setCheckbox(false);
		if (note === "" && title === "") {
			return;
		}
		try {
			setNote("");
			setTitle("");
			startLoading();
			const todo = {
				title: title,
				note: note,
				color: color,
				isChecklist: isChecklist,
				editedOn: new Date().toISOString(),
			};
			const res = await fetch("https://notes-94d5f.firebaseio.com/todos.json", {
				method: "POST",
				body: JSON.stringify(todo),
			});
			const response = await res.json();
			if (res.ok) {
				addTodo({...todo, id: response.name});
			} else {
				setError(res.statusText);
			}
		} catch (err) {
			console.error(err);
			setError(err.message);
		}
	};

	const cancelHandler = () => {
		setNote("");
		setTitle("");
		setColor("default");
		setTyping(false);
		setCheckbox(false);
	};

	const loseFocuse = ({relatedTarget, currentTarget}) => {
		if (relatedTarget === null) {
			addTodoHandler();
			return;
		}
		let node = relatedTarget;
		while (node !== null) {
			if (currentTarget === node) {
				return;
			}
			node = node.parentNode;
		}
		addTodoHandler();
	};

	const toggleListMode = () => {
		if (isChecklist) {
			setNote(perv => perv.map(item => item.text).join("\n"));
		} else {
			setNote(perv =>
				perv.split("\n").map(item => ({text: item, isCompleted: false}))
			);
		}
		setCheckbox(perv => !perv);
	};

	return (
		<Paper
			tabIndex="-1"
			className={classes.root}
			elevation={6}
			onBlur={e => loseFocuse(e)}>
			{typing
				? <InputBase
						fullWidth
						placeholder="Title"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				: null}
			{isChecklist
				? <CheckListView
						expandcompleted={expandcompleted}
						setExpandCompleted={setExpandCompleted}
						editMode
						notes={note}
						setNote={setNote}
					/>
				: <InputBase
						autoFocus
						placeholder="Take a note"
						multiline
						fullWidth
						value={note}
						onChange={e => {
							setNote(e.target.value);
							!typing && setTyping(true);
						}}
						onClick={() => setTyping(true)}
					/>}
			{typing &&
				<div className={classes.action}>
					<div className={classes.gap}>
						<ColorPanel
							color={color}
							setColor={col => setColor(col)}
							disablePortal
						/>
						<CheckBoxToggle
							isChecklist={isChecklist}
							setCheckbox={toggleListMode}
						/>
					</div>
					<Button onClick={cancelHandler}>Cancel</Button>
					<Button color="secondary" onClick={addTodoHandler}>
						Add
					</Button>
				</div>}
		</Paper>
	);
};

export default Todo;
