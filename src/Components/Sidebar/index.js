import React from "react";
import clsx from "clsx";
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
} from "@material-ui/core";

import {
	EmojiObjectsOutlined as EmojiObjectsOutlinedIcon,
	ArchiveOutlined as ArchiveOutlinedIcon,
	DeleteOutlined as DeleteOutlinedIcon,
} from "@material-ui/icons";

const drawerWidth = 200;
const useStyles = makeStyles(theme => ({
	root: {
		[theme.breakpoints.up("sm")]: {
			display: "flex",
		},
	},
	drawer: {
		paddingTop: theme.spacing(8),
		width: drawerWidth,
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		border: "none",
		[theme.breakpoints.down("sm")]: {
			backgroundColor: "#0000",
		},
	},
	content: {
		flexGrow: 1,
		[theme.breakpoints.down("sm")]: {
			marginLeft: theme.spacing(1.7),
		},
	},
	menuItem: {
		height: theme.spacing(7),
		borderRadius: open => (open ? 0 : "50%"),
	},
}));

export default ({open, children}) => {
	const classes = useStyles(open);

	return (
		<div className={classes.root}>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}>
				<List>
					<ListItem selected={true} className={classes.menuItem} button>
						<ListItemIcon>
							<EmojiObjectsOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Notes" />
					</ListItem>
					<ListItem selected={false} className={classes.menuItem} button>
						<ListItemIcon>
							<ArchiveOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Archive" />
					</ListItem>
					<ListItem selected={false} className={classes.menuItem} button>
						<ListItemIcon>
							<DeleteOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Delete" />
					</ListItem>
				</List>
			</Drawer>
			<main className={classes.content}>
				{children}
			</main>
		</div>
	);
};
