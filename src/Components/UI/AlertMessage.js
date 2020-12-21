import React from "react";

import {
	Modal,
	Fade,
	makeStyles,
	Paper,
	Typography,
	Button,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		border: "none",
	},
	container: {
		width: theme.spacing(56),
		padding: theme.spacing(3),
		outline: "none",
	},
	footer: {
		display: "flex",
		justifyContent: "flex-end",
		"& >*": {
			margin: theme.spacing(0, 1),
		},
	},
}));

export default ({show, text, onConfirm, onCancel}) => {
	const classes = useStyles();

	return (
		<Modal className={classes.modal} open={show} onClose={onCancel}>
			<Fade in={show}>
				<Paper className={classes.container}>
					<Typography variant="subtitle2" paragraph>
						Delete note forever?
					</Typography>
					<div className={classes.footer}>
						<Button onClick={onCancel}>Cancel</Button>
						<Button color="secondary" onClick={onConfirm}>
							Delete
						</Button>
					</div>
				</Paper>
			</Fade>
		</Modal>
	);
};
