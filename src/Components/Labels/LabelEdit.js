import React, {useContext} from "react";

import {
	Button,
	Divider,
	Fade,
	Input,
	InputBase,
	makeStyles,
	Modal,
	Paper,
	Typography,
} from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import EditIcon from "@material-ui/icons/Edit";

import {globalContext} from "../../context/store";

const useStyles = makeStyles(theme => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		border: "none",
	},
	container: {
		boxShadow: theme.shadows[8],
		width: theme.spacing(36),
		padding: theme.spacing(1),
		outline: "none",
	},
	footer: {
		display: "flex",
		justifyContent: "flex-end",
		padding: theme.spacing(1),
	},
	row: {
		display: "flex",
		alignItems: "center",
		color: theme.custom.palette.iconColor,
		"& > *": {
			margin: theme.spacing(1),
		},
		"&:hover": {
			color: theme.custom.palette.iconHighlight,
		},
	},
}));

export default ({show, close}) => {
	const classes = useStyles();
	const {labels} = useContext(globalContext);
	return (
		<Modal className={classes.modal} open={show} onClose={close}>
			<Fade in={show}>
				<Paper className={classes.container}>
					<Typography variant="h6" paragraph>
						Edit labels
					</Typography>
					<Input placeholder="Create a new label" fullWidth />
					{labels && labels.map(label => <Label name={label} />)}
					<Divider />
					<div className={classes.footer}>
						<Button>Done</Button>
					</div>
				</Paper>
			</Fade>
		</Modal>
	);
};

const Label = ({name}) => {
	const classes = useStyles();
	const [isHovered, setIsHovered] = React.useState(false);
	return (
		<div
			className={classes.row}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<LabelIcon style={{fontSize: 18}} />
			<InputBase fullWidth placeholder="Enter label name" value={name} />
			<EditIcon style={{fontSize: 18}} />
		</div>
	);
};
