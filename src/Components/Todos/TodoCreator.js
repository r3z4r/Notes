import React, {useState, useContext, useEffect} from "react";

import {
	InputBase,
	makeStyles,
	Paper,
	Button,
	IconButton,
	Tooltip,
} from "@material-ui/core";
import {globalContext} from "../../context/store";
import ColorPanel from "./Actions/Panels/ColorPanel";
import CheckBoxToggle from "./Actions/CheckBoxToggle";
import CheckListView from "./CheckListView";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import LabelPanel from "./Actions/Panels/LabelPanel";
import LabelTags from "../Labels/LabelTags";

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

export default () => {
	const {labels, addTodo, startLoading, setError, filter} = useContext(
		globalContext
	);
	const [typing, setTyping] = useState(false);
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");
	const [color, setColor] = useState("default");
	const [isChecklist, setChecklist] = useState(false);
	const [expandcompleted, setExpandCompleted] = useState(true);
	const [todoLabels, setTodoLabels] = useState([]);

	const classes = useStyles({col: color});

	useEffect(
		() => {
			filter !== "all" && setTodoLabels([filter]);
			console.log("creator rendered");
		},
		[filter]
	);
	const addTodoHandler = async () => {
		setColor("default");
		setTyping(false);
		setChecklist(false);
		setTodoLabels([]);
		setNote("");
		setTitle("");
		if (
			title === "" &&
			(note.length === 0 ||
				(isChecklist && note.length === 1 && note[0].text === ""))
		) {
			return;
		}
		try {
			startLoading();
			const todo = {
				title: title,
				note: note,
				color: color,
				isChecklist: isChecklist,
				labels: todoLabels,
				editedOn: new Date().toISOString(),
			};
			const res = await fetch(`${process.env.REACT_APP_BASE_URL}/todos.json`, {
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
		setChecklist(false);
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
		setChecklist(perv => !perv);
	};

	const addRemoveLabels = selected => {
		const newLabels = [...todoLabels];
		const index = todoLabels.indexOf(selected);
		if (index === -1) {
			newLabels.push(selected);
		} else {
			newLabels.splice(index, 1);
		}
		setTodoLabels(newLabels);
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
				: <div style={{display: "flex"}}>
						<InputBase
							style={{flexGrow: 1}}
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
						{!typing &&
							<Tooltip title="New list">
								<IconButton
									onClick={() => {
										setTyping(true);
										toggleListMode();
									}}>
									<CheckBoxOutlinedIcon />
								</IconButton>
							</Tooltip>}
					</div>}
			{typing &&
				<React.Fragment>
					<LabelTags
						selectedLabels={todoLabels}
						onDelete={label => addRemoveLabels(label)}
					/>
					<div className={classes.action}>
						<div className={classes.gap}>
							<ColorPanel
								color={color}
								setColor={col => setColor(col)}
								disablePortal
							/>
							<CheckBoxToggle
								isChecklist={isChecklist}
								setChecklist={toggleListMode}
							/>
							<LabelPanel
								labels={labels}
								selectedLabels={todoLabels}
								disablePortal
								setLabels={label => addRemoveLabels(label)}
							/>
						</div>
						<Button onClick={cancelHandler}>Cancel</Button>
						<Button color="secondary" onClick={addTodoHandler}>
							Add
						</Button>
					</div>
				</React.Fragment>}
		</Paper>
	);
};
