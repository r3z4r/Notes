export default (state = {}, action = {}) => {
	const data = action.payload;
	switch (action.type) {
		case "START":
			return {...state, loading: true};
		case "END":
			return {...state, loading: false};
		case "FETCH":
			return {...state, notes: data, loading: false};
		case "USERINFO":
			return {...state, userInfo: data, loading: false};
		case "LABELS":
			return {
				...state,
				userInfo: {...state.userInfo, labels: data},
				loading: false,
			};
		case "ADD":
			const newNotes = [...state.notes];
			newNotes.push(data);
			return {...state, notes: newNotes, loading: false};
		case "DELETE":
			const updatedNotes = state.notes.filter(item => item.id !== data);
			return {...state, notes: updatedNotes, loading: false};
		case "UPDATE":
			const modifiedNotes = state.notes.map(
				item => (item.id === data.id ? data : item)
			);
			return {...state, notes: modifiedNotes};
		case "ERROR":
			return {...state, error: data, loading: false};
		case "FILTER":
			return {...state, filter: data};
		case "SEARCH":
			return {...state, searchValue: data};
		case "THEME":
			return {
				...state,
				userInfo: {...state.userInfo, darkTheme: !state.userInfo.darkTheme},
			};
		case "LISTVIEW":
			return {
				...state,
				userInfo: {...state.userInfo, listview: !state.userInfo.listview},
			};
		default:
			throw new Error("Action not defined");
	}
};
