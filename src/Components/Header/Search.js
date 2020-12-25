import React, {useContext, useRef} from "react";

import {IconButton, makeStyles, fade, InputBase} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

import {globalContext} from "../../context/store";

const useStyle = makeStyles(theme => ({
	search: {
		position: "relative",
		display: "flex",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.action.active, 0.05),
		"&:hover": {
			backgroundColor: fade(theme.palette.action.hover, 0.1),
		},
		margin: theme.spacing(0, 10),
		height: "75%",
		width: "90%",
		maxWidth: theme.spacing(100),
		[theme.breakpoints.down("sm")]: {
			margin: theme.spacing(0, 2),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
		height: "100%",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

export default () => {
	const classes = useStyle();
	const inputRef = useRef(null);
	const {setFilter, setSearchValue, searchValue, filter} = useContext(
		globalContext
	);

	const searchHandler = async e => {
		setSearchValue(e.target.value);
		setFilter("search");
	};
	const clearHandler = () => {
		setSearchValue("");
		setFilter("all");
	};
	return (
		<div className={classes.search}>
			<div className={classes.searchIcon}>
				<SearchIcon />
			</div>
			<InputBase
				fullWidth
				inputRef={inputRef}
				placeholder="Search…"
				value={searchValue}
				onChange={searchHandler}
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput,
				}}
				inputProps={{"aria-label": "search"}}
			/>
			<IconButton onClick={clearHandler} disabled={filter !== "search"}>
				<ClearIcon />
			</IconButton>
		</div>
	);
};
