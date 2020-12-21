import React, {Fragment, useContext} from "react";
import {globalContext} from "../../context/store";
import Todo from "./Todo";

export default () => {
	const {
		notes,
		deleteTodo,
		updateTodo,
		startLoading,
		endLoading,
		setError,
		listview,
		labels,
		filter,
	} = useContext(globalContext);
	const onDelete = async id => {
		// e.stopPropagation();
		startLoading();
		try {
			const res = await fetch(
				`${process.env.REACT_APP_BASE_URL}/todos/${id}.json`,
				{
					method: "DELETE",
				}
			);
			if (res.ok) {
				deleteTodo(id);
			} else {
				setError(res.statusText);
			}
		} catch (err) {
			console.error(err);
			setError(err.message);
		}
	};
	const onEdit = async todo => {
		updateTodo(todo);
		const {id} = todo;
		const request = {...todo};
		delete request.id;
		startLoading();
		try {
			const res = await fetch(
				`${process.env.REACT_APP_BASE_URL}/todos/${id}.json`,
				{
					method: "PATCH",
					body: JSON.stringify(request),
				}
			);
			await res.json();
			if (res.ok) {
				endLoading();
			} else {
				setError(res.statusText);
			}
		} catch (err) {
			console.error(err);
			setError(err.message);
		}
	};

	const filteredNotes =
		filter === "all"
			? notes.filter(
					note =>
						!note.labels.some(label => label === "archive" || label === "trash")
				)
			: notes.filter(note => note.labels.some(label => label === filter));
	return (
		<Fragment>
			{filteredNotes &&
				filteredNotes
					.slice(0)
					.reverse()
					.map(todo =>
						<Todo
							key={todo.id}
							todo={todo}
							onDelete={onDelete}
							onEditFinish={onEdit}
							updateTodo={updateTodo}
							listview={listview}
							labels={labels}
						/>
					)}
		</Fragment>
	);
};
