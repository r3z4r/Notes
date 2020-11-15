import React from "react";
import Main from "./Containers/Main";
import {ThemeProvider} from "@material-ui/core";
import {light} from "./theme";
import {ContextProvider} from "./context/store";

function App() {
	return (
		<ContextProvider todos={{loading: false, darkTheme: false, notes: []}}>
			<ThemeProvider theme={light}>
				<Main />
			</ThemeProvider>
		</ContextProvider>
	);
}

export default App;
