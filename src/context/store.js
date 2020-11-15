import reducer from "./reducer";
import React, {createContext, useReducer, useEffect} from "react";

export const globalContext = createContext({});

export const ContextProvider = ({children, todos}) => {
	const [state, dispatch] = useReducer(reducer, todos);
	function addTodo(todo) {
		console.log(todo); //debug
		dispatch({type: "ADD", payload: todo});
	}
	function startLoading() {
		dispatch({type: "START"});
	}
	function deleteTodo(id) {
		console.log(id); //debug
		dispatch({type: "DELETE", payload: id});
	}
	function updateTodo(todo) {
		dispatch({type: "UPDATE", payload: todo});
	}
	function setTheme() {
		dispatch({type: "THEME"});
	}
	useEffect(() => {
		const getNotes = async () => {
			try {
				startLoading();
				const res = await fetch(
					"https://notes-94d5f.firebaseio.com/todos.json"
				);
				const response = await res.json();
				if (res.ok) {
					const fetchedNotes = Object.keys(response).map(id => ({
						id: id,
						title: response[id].title,
						note: response[id].note,
					}));
					dispatch({type: "FETCH", payload: fetchedNotes});
				} else {
					alert(res.statusText);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getNotes();
	}, []);
	return (
		<globalContext.Provider
			value={{
				addTodo: addTodo,
				deleteTodo: deleteTodo,
				updateTodo: updateTodo,
				startLoading: startLoading,
				setTheme: setTheme,
				notes: state.notes,
				loading: state.loading,
				darkTheme: state.darkTheme,
			}}>
			{children}
		</globalContext.Provider>
	);
};
