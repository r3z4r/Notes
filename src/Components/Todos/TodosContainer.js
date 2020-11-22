import React, {useContext} from "react";
import {globalContext} from "../../context/store";
import Todo from "./Todo";

export default () => {
	const {notes, deleteTodo, updateTodo, startLoading,endLoading,setError} = useContext(
		globalContext
	);
	const onDelete = async (e, id) => {
		e.stopPropagation();
		startLoading();
		try {
			const res = await fetch(
				`https://notes-94d5f.firebaseio.com/todos/${id}.json`,
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
	const onEdit = async (todo) => {
		const {id,title,note,color,editedOn} = todo
		updateTodo(todo)
		startLoading();
		try {
			const res = await fetch(
				`https://notes-94d5f.firebaseio.com/todos/${id}.json`,
				{
					method: "PATCH",
					body: JSON.stringify({
						title: title,
						note: note,
						color: color,
						editedOn: editedOn,
					}),
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
	return (
		<>
			{notes &&
				notes
					.slice(0)
					.reverse()
					.map(todo =>
						<Todo
							key={todo.id}
							todo={todo}
							onDelete={onDelete}
							onEditFinish={onEdit}
							updateTodo={updateTodo}
						/>
					)}
		</>
	);
};
