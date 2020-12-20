import reducer from "./reducer";
import React, {createContext, useReducer, useEffect} from "react";

export const globalContext = createContext({});

export const ContextProvider = ({children, todos}) => {
	const [state, dispatch] = useReducer(reducer, todos);
	function addTodo(todo) {
		dispatch({type: "ADD", payload: todo});
	}
	function startLoading() {
		dispatch({type: "START"});
	}
	function endLoading() {
		dispatch({type: "END"});
	}
	function deleteTodo(id) {
		dispatch({type: "DELETE", payload: id});
	}
	function updateTodo(todo) {
		dispatch({type: "UPDATE", payload: todo});
	}
	function setTheme() {
		dispatch({type: "THEME"});
	}
	function setError(error) {
		dispatch({type: "ERROR", payload: error});
	}
	function setListview() {
		dispatch({type: "LISTVIEW"});
	}
	function setLabels(labels) {
		dispatch({type: "LABELS", payload: labels});
	}
	function setFilter(by) {
		dispatch({type: "FILTER", payload: by});
	}
	useEffect(() => {
		const getNotes = async () => {
			try {
				startLoading();
				const res = await fetch(`${process.env.REACT_APP_BASE_URL}/todos.json`);
				const response = await res.json();
				if (res.ok) {
					const fetchedNotes = response
						? Object.keys(response).map(id => ({
								id: id,
								title: response[id].title,
								note: response[id].note,
								color: response[id].color,
								editedOn: response[id].editedOn,
								isChecklist: response[id].isChecklist,
								labels: response[id].labels ? response[id].labels : [],
							}))
						: [];
					dispatch({type: "FETCH", payload: fetchedNotes});
				} else {
					setError(res.statusText);
				}
			} catch (error) {
				console.error(error);
				setError(error.message);
			}
		};
		getNotes();
	}, []);
	useEffect(() => {
		const getUserInfo = async () => {
			try {
				startLoading();
				const res = await fetch(
					`${process.env.REACT_APP_BASE_URL}/userInfo.json`
				);
				const response = await res.json();
				if (res.ok) {
					dispatch({
						type: "USERINFO",
						payload: response
							? response
							: {
									darkTheme: false,
									listview: false,
									labels: {},
								},
					});
				} else {
					setError(res.statusText);
				}
			} catch (error) {
				console.error(error);
				setError(error.message);
			}
		};
		getUserInfo();
	}, []);
	return (
		<globalContext.Provider
			value={{
				addTodo: addTodo,
				deleteTodo: deleteTodo,
				updateTodo: updateTodo,
				startLoading: startLoading,
				endLoading: endLoading,
				setError: setError,
				setTheme: setTheme,
				setListview: setListview,
				setLabels: setLabels,
				setFilter: setFilter,
				notes: state.notes,
				loading: state.loading,
				error: state.error,
				darkTheme: state.userInfo.darkTheme,
				listview: state.userInfo.listview,
				labels: state.userInfo.labels,
				filter: state.filter,
			}}>
			{children}
		</globalContext.Provider>
	);
};
