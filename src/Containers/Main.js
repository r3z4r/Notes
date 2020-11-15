import React from "react";
import Layout from "../HOC/Layout";
import Todos from "./Todos";
import {globalContext} from "../context/store";
import {ThemeProvider} from "@material-ui/core";
import {light, dark} from "../theme";

export default () => {
	const {darkTheme} = React.useContext(globalContext);

	React.useEffect(() => {
		console.log("main rendered");
	});
	return (
		<ThemeProvider theme={darkTheme ? dark : light}>
			<Layout>
				<Todos />
			</Layout>
		</ThemeProvider>
	);
};
