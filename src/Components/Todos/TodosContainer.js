import React, {useContext} from "react";
import {globalContext} from "../../context/store";
import Todo from "./Todo";

export default () => {
	const {notes, deleteTodo, updateTodo, startLoading,setError} = useContext(
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
			const response = await res.json();
			console.log(response);
			if (res.ok) {
				deleteTodo(id);
			} else {
				alert(res.statusText);
			}
		} catch (err) {
			console.error(err);
			setError(err.message);
		}
	};
	const onEdit = async (id,todo) => {
		startLoading();
		try {
			const res = await fetch(
				`https://notes-94d5f.firebaseio.com/todos/${id}.json`,
				{
					method: "PATCH",
					body: JSON.stringify(todo),
				}
			);
			await res.json();
			if (res.ok) {
				updateTodo(todo);
			} else {
				alert(res.statusText);
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
