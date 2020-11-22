import React from "react";

import {Snackbar, IconButton} from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";
import Alert from "@material-ui/lab/Alert";

export default ({open, message, severity}) => {
	return (
		<Snackbar
			open={open}
			anchorOrigin={{vertical: "bottom", horizontal: "left"}}>
			<Alert severity={severity} variant="filled">
				{message}
				<IconButton
					style={{marginLeft: "20vw", padding: 0}}
					size="small"
					onClick={() => window.location.reload()}>
					<ReplayIcon style={{marginLeft: "auto"}} />
				</IconButton>
			</Alert>
		</Snackbar>
	);
};
