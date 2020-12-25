import React, {useContext, useMemo} from "react";

import {makeStyles, Grid} from "@material-ui/core";
import TodoCreator from "./TodoCreator";
import TodosContainer from "./TodosContainer";
import {globalContext} from "../../context/store";

const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(2, 10),
		[theme.breakpoints.down("sm")]: {
			margin: theme.spacing(2, 6),
		},
	},
}));

const Todos = () => {
	const classes = useStyles();
	const {filter} = useContext(globalContext);
	const todoCreator = useMemo(() => <TodoCreator />, []);
	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				{filter !== "archive" &&
					filter !== "trash" &&
					filter !== "search" &&
					<Grid item xs={12}>
						{todoCreator}
					</Grid>}
				<TodosContainer />
			</Grid>
		</div>
	);
};

export default Todos;
