import React, {useState, useRef, useContext, useEffect} from "react";

import {InputBase, makeStyles, Paper, Button} from "@material-ui/core";
import {globalContext} from "../../context/store";

const useStyles = makeStyles(theme => ({
	root: {
		padding: "8px 12px",
		maxWidth: 550,
		margin: "36px auto",
		outline: "none",
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
	const titleRef = useRef(null);
	const classes = useStyles({});
	const [typing, setTyping] = useState(false);
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");
	const {addTodo, startLoading, setError} = useContext(globalContext);
	useEffect(() => {
		console.log("creator rendered");
	});
	const addTodoHandler = async () => {
		try {
			setNote("");
			setTitle("");
			setTyping(false);
			startLoading();
			const todo = {
				title: title,
				note: note,
				color: "default",
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
				alert(res.statusText);
			}
		} catch (err) {
			console.error(err);
			setError(err.message);
		}
	};

	const cancelHandler = () => {
		setNote("");
		setTitle("");
		setTyping(false);
	};

	const loseFocuse = ({relatedTarget, currentTarget}) => {
		if (relatedTarget === null) {
			cancelHandler();
			return;
		}
		let node = relatedTarget;
		while (node !== null) {
			if (currentTarget === node) {
				return;
			}
			node = node.parentNode;
		}
		cancelHandler();
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
				<div className={classes.action}>
					<div className={classes.gap} />
					<Button onClick={cancelHandler}>cancel</Button>
					<Button color="secondary" onClick={addTodoHandler}>
						Add
					</Button>
				</div>}
		</Paper>
	);
};

export default Todo;
