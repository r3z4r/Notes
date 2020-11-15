import React, {useContext} from "react";
import {globalContext} from "../../context/store";
import Todo from "../../Components/Todo";

export default () => {
	const {notes, deleteTodo, updateTodo, startLoading} = useContext(
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
		}
	};
	const onEdit = async (id,todo) => {
		startLoading();
		console.log(todo);
		
		try {
			const res = await fetch(
				`https://notes-94d5f.firebaseio.com/todos/${id}.json`,
				{
					method: "PATCH",
					body: JSON.stringify(todo),
				}
			);
			const response = await res.json();
			console.log(response);
			if (res.ok) {
				updateTodo(todo);
			} else {
				alert(res.statusText);
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<>
			{notes &&
				notes
					.slice(0)
					.reverse()
					.map(({id, title, note}) =>
						<Todo
							key={id}
							title={title}
							note={note}
							id={id}
							onDelete={onDelete}
							onEditFinish={onEdit}
							updateTodo={updateTodo}
						/>
					)}
		</>
	);
};
