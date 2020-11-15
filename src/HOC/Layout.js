import React, {useContext} from "react";
import {globalContext} from "../context/store";
import Header from "../Containers/Header";
import {LinearProgress, Paper} from "@material-ui/core";

export default props => {
	const {loading} = useContext(globalContext);
	return (
		<>
			{loading &&
				<LinearProgress
					color="secondary"
					style={{position: "fixed", top: 0, width: "100%"}}
				/>}
			<Paper square style={{height:"100vh"}}>
				<Header />
				<main>
					{props.children}
				</main>
			</Paper>
		</>
	);
};
