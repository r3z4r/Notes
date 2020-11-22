import React, {useContext} from "react";

import Logo from "../../Images/logo.svg";
import {Typography, IconButton, makeStyles, AppBar} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import {globalContext} from "../../context/store";

const useStyle = makeStyles(theme => ({
	header: {
		display: "flex",
		flexDirection: "row",
		padding: theme.spacing(0, 1),
		alignItems: "center",
		height: theme.spacing(8),
		backgroundColor: theme.palette.primary.main,
		boxShadow: theme.shadows[1],
		zIndex: theme.zIndex.drawer + 1,
	},
	logo: {
		height: "60%",
		margin: theme.spacing(2),
	},
	grow: {
		flex: 1,
	},
}));
export default ({toggleSidebar}) => {
	const classes = useStyle({});
	const {setTheme} = useContext(globalContext);
	return (
		<AppBar position="sticky" className={classes.header}>
			<IconButton onClick={toggleSidebar} aria-label="menu">
				<MenuIcon color="secondary" />
			</IconButton>
			<img className={classes.logo} src={Logo} alt="logo" />
			<Typography variant="h5" color="secondary" className={classes.grow}>
				Notes
			</Typography>
			<IconButton onClick={setTheme}>
				<Brightness4Icon />
			</IconButton>
		</AppBar>
	);
};
