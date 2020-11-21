import React, {useContext} from "react";

import Logo from "../../Images/logo.svg";
import {Typography, IconButton, makeStyles} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import {globalContext} from "../../context/store";

const useStyle = makeStyles(theme => ({
	header: {
		display: "flex",
		alignItems: "center",
		height: 64,
		backgroundColor: theme.palette.primary.main,
		boxShadow: theme.shadows[1],
	},
	logo: {
		height: "60%",
		margin: theme.spacing(2),
	},
	grow: {
		flex: 1,
	},
}));
export default () => {
	const classes = useStyle({});
	const {setTheme} = useContext(globalContext);
	return (
		<header className={classes.header}>
			<IconButton color="inherit" aria-label="menu">
				<MenuIcon color="secondary" />
			</IconButton>
			<img className={classes.logo} src={Logo} alt="logo" />
			<Typography variant="h5" color="secondary" className={classes.grow}>
				Notes
			</Typography>
			<IconButton onClick={setTheme}>
				<Brightness4Icon />
			</IconButton>
		</header>
	);
};
