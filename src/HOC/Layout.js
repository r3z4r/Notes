import React, {useContext, useState} from "react";
import {globalContext} from "../context/store";
import Header from "../Components/Header";
import {
	LinearProgress as LoadingBar,
	Paper,
	makeStyles,
} from "@material-ui/core";
import SnackBar from "../Components/UI/SnackBar";
import Sidebar from "../Components/Sidebar";

const useStyle = makeStyles(theme => ({
	loadingBar: {
		position: "fixed",
		top: 0,
		width: "100%",
		zIndex: theme.zIndex.drawer + 2,
	},
}));
export default props => {
	const classes = useStyle();
	const {loading, error} = useContext(globalContext);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<div>
			{loading &&
				<LoadingBar color="secondary" className={classes.loadingBar} />}
			<Paper square style={{minHeight: "100vh"}}>
				<SnackBar message={error} severity="error" open={error} />
				<Header toggleSidebar={() => setSidebarOpen(perv => !perv)} />
				<Sidebar open={sidebarOpen}>
					{props.children}
				</Sidebar>
			</Paper>
		</div>
	);
};
