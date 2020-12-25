import React, {useContext} from "react";

import clsx from "clsx";
import Logo from "../../Images/logo.svg";
import {
	Typography,
	IconButton,
	makeStyles,
	AppBar,
	useScrollTrigger,
	Tooltip,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import {
	Brightness4 as Brightness4Icon,
	ViewStream as ListViewIcon,
	Apps as GridViewIcon,
} from "@material-ui/icons";
import {globalContext} from "../../context/store";
import Search from "./Search";

const useStyle = makeStyles(theme => ({
	header: {
		display: "flex",
		flexDirection: "row",
		padding: theme.spacing(0, 1),
		alignItems: "center",
		height: theme.spacing(8),
		backgroundColor: theme.custom.palette.headerBG,
		backdropFilter: "blur(10px)",
		zIndex: theme.zIndex.drawer + 1,
	},
	headerScroll: {
		borderBottom: `solid 1px ${theme.palette.divider}`,
	},
	logo: {
		height: "60%",
		margin: theme.spacing(2),
	},
	hideOnSM: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	grow: {
		flex: 1,
	},
}));

export default ({toggleSidebar}) => {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});
	const classes = useStyle();
	const {listview, setListview, setTheme} = useContext(globalContext);

	return (
		<AppBar
			elevation={trigger ? 4 : 0}
			position="sticky"
			className={clsx(classes.header, {[classes.headerScroll]: !trigger})}>
			<IconButton onClick={toggleSidebar} aria-label="menu">
				<MenuIcon color="secondary" />
			</IconButton>
			<img className={classes.logo} src={Logo} alt="logo" />
			<Typography className={classes.hideOnSM} variant="h6" color="secondary">
				Notes
			</Typography>
			<Search />
			<div className={classes.grow} />
			<Tooltip title="Change view" className={classes.hideOnSM}>
				<IconButton onClick={setListview}>
					{listview ? <GridViewIcon /> : <ListViewIcon />}
				</IconButton>
			</Tooltip>
			<Tooltip title="Change theme">
				<IconButton onClick={setTheme}>
					<Brightness4Icon />
				</IconButton>
			</Tooltip>
		</AppBar>
	);
};
