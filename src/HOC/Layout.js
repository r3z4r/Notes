import React, {useContext} from "react";
import {globalContext} from "../context/store";
import Header from "../Components/Header";
import {LinearProgress, Paper, Snackbar, IconButton} from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";
import Alert from "@material-ui/lab/Alert";

export default props => {
	const {loading, error} = useContext(globalContext);
	return (
		<>
			{loading &&
				<LinearProgress
					color="secondary"
					style={{position: "fixed", top: 0, width: "100%"}}
				/>}
			{error &&
				<Snackbar 
					open={true}
					anchorOrigin={{vertical: "bottom", horizontal: "left"}}>
					<Alert severity="error" variant="filled" >
						{error}
						<IconButton style={{marginLeft: "20vw" , padding:0}} size='small' onClick={() => window.location.reload()}>
							<ReplayIcon style={{marginLeft:"auto"}}/>
						</IconButton>
					</Alert>
				</Snackbar>}
			<Paper square style={{height: "100%"}}>
				<Header />
				<main>
					{props.children}
				</main>
			</Paper>
		</>
	);
};
