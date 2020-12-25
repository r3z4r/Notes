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
		searchValue,
	} = useContext(globalContext);
	const onDelete = async id => {
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
			: filter === "search"
				? notes
						.filter(note => {
							if (
								note.title.toLowerCase().includes(searchValue.toLowerCase())
							) {
								return true;
							}
							if (note.isChecklist) {
								return note.note.some(item =>
									item.text.toLowerCase().includes(searchValue.toLowerCase())
								);
							} else {
								return note.note
									.toLowerCase()
									.includes(searchValue.toLowerCase());
							}
						})
						.map(note => {
							let newTitle = note.title.replace(
								new RegExp(searchValue, "gi"),
								match =>
									`<mark style="background : #fdd663 ; color: black;">${match}</mark>`
							);
							let newNote;
							if (note.isChecklist) {
								newNote = note.note.map(item => {
									let newText = item.text.replace(
										new RegExp(searchValue, "gi"),
										match =>
											`<mark style="background : #fdd663 ; color: black;">${match}</mark>`
									);
									return {...item, text: newText};
								});
							} else {
								newNote = note.note.replace(
									new RegExp(searchValue, "gi"),
									match =>
										`<mark style="background : #fdd663 ; color: black;">${match}</mark>`
								);
							}

							return {...note, title: newTitle, note: newNote};
						})
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
