export default (state = {}, action = {}) => {
	const data = action.payload;
	switch (action.type) {
		case "START":
			return {...state, loading: true};
		case "END":
			return {...state, loading: false};
		case "FETCH":
			return {...state, notes: data, loading: false};
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
		case "THEME":
			return {...state, darkTheme: !state.darkTheme};
		default:
			throw new Error("Action not defined");
	}
};
