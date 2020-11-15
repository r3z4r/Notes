import React, {useState, useRef, useContext, useEffect} from "react";

import {InputBase, makeStyles, Paper, Button} from "@material-ui/core";
import {globalContext} from "../../context/store";

const useStyles = makeStyles(theme => ({
	root: {
		padding: "8px 12px",
		maxWidth: 550,
		margin: "36px auto",
	},
	gap: {
		flexGrow: 1,
	},
	input: {
		flexGrow: 1,
	},
}));

const Todo = () => {
	const titleRef = useRef(null);
	const classes = useStyles({});
	const [typing, setTyping] = useState(false);
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");
	const {addTodo, startLoading} = useContext(globalContext);
	useEffect(() => {
		console.log("creator rendered");
	});
	const addTodoHandler = async () => {
		try {
			setNote("");
			setTitle("");
			startLoading();
			const res = await fetch("https://notes-94d5f.firebaseio.com/todos.json", {
				method: "POST",
				body: JSON.stringify({title: title, note: note}),
			});
			const response = await res.json();
			if (res.ok) {
				addTodo({
					id: response.name,
					title: title,
					note: note,
				});
			} else {
				alert(res.statusText);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const cancelHandler = () => {
		setNote("");
		setTitle("");
		setTyping(false);
	};

	return (
		<Paper className={classes.root} elevation={6}>
			{typing
				? <InputBase
						fullWidth
						placeholder="Title"
						ref={titleRef}
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				: null}
			<InputBase
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
			/>
			{typing &&
				<div style={{display: "flex"}}>
					<div className={classes.gap} />
					<Button color="primary.main" onClick={addTodoHandler}>
						Add
					</Button>
					<Button color="secondary" onClick={cancelHandler}>
						Close
					</Button>
				</div>}
		</Paper>
	);
};

export default Todo;
