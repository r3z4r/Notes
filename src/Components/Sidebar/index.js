import React, {useState} from "react";
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
	EditOutlined as LabelEditIcon,
} from "@material-ui/icons";
import LabelEdit from "../Labels/LabelEdit";

const drawerWidth = 200;
const useStyles = makeStyles(theme => ({
	root: {
		[theme.breakpoints.up("sm")]: {
			display: "flex",
		},
	},
	drawer: {
		marginTop: theme.spacing(8),
		width: drawerWidth,
		[theme.breakpoints.down("sm")]: {
			marginTop: theme.spacing(0),
		},
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
	const [editLabels, setEditLabels] = useState(false);

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
					<ListItem
						onClick={() => setEditLabels(true)}
						selected={false}
						className={classes.menuItem}
						button>
						<ListItemIcon>
							<LabelEditIcon />
						</ListItemIcon>
						<ListItemText primary="Edit labels" />
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
			<LabelEdit show={editLabels} close={() => setEditLabels(false)} />
		</div>
	);
};
