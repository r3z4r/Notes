import React from "react";
import Main from "./Components/Main";
import {ThemeProvider} from "@material-ui/core";
import {light} from "./theme";
import {ContextProvider} from "./context/store";

function App() {
	return (
		<ContextProvider
			todos={{
				loading: false,
				error: null,
				filter: "all",
				searchValue: "",
				notes: [],
				userInfo: [],
			}}>
			<ThemeProvider theme={light}>
				<Main />
			</ThemeProvider>
		</ContextProvider>
	);
}

export default App;
