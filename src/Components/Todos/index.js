import React from "react";

import {makeStyles, Grid} from "@material-ui/core";
import TodoCreator from "./TodoCreator";
import TodosContainer from "./TodosContainer";

const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(1, 4),
	},
}));

const Todos = () => {
	const classes = useStyles();
	const todoCreator = React.useMemo(() => <TodoCreator />, []);
	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					{todoCreator}
				</Grid>
				<TodosContainer />
			</Grid>
		</div>
	);
};

export default Todos;
