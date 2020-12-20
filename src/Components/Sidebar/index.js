import React, {useState, useContext} from "react";
import clsx from "clsx";
import {
	Divider,
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
import LabelAvater from "../UI/LabelAvater";
import {globalContext} from "../../context/store";

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
	divider: {
		opacity: open => (open ? 1 : 0),
	},
}));

export default ({open, children}) => {
	const classes = useStyles(open);
	const [editLabels, setEditLabels] = useState(false);
	const {labels, filter, setFilter} = useContext(globalContext);

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
					<SidebarItem
						open={open}
						label="Notes"
						onClick={() => setFilter("all")}
						icon={<EmojiObjectsOutlinedIcon />}
						selected={filter === "all"}
					/>
					<Divider className={classes.divider} />
					{labels &&
						Object.keys(labels).map(id =>
							<SidebarItem
								key={id}
								open={open}
								label={labels[id]}
								onClick={() => setFilter(id)}
								icon={<LabelAvater letter={labels[id][0]} />}
								selected={filter === id}
							/>
						)}
					<Divider className={classes.divider} />
					<SidebarItem
						open={open}
						label="Edit labels"
						onClick={() => setEditLabels(true)}
						icon={<LabelEditIcon />}
						selected={false}
					/>
					<SidebarItem
						open={open}
						label="Archive"
						onClick={() => setFilter("archive")}
						icon={<ArchiveOutlinedIcon />}
						selected={filter === "archive"}
					/>
					<SidebarItem
						open={open}
						label="Trash"
						onClick={() => setFilter("trash")}
						icon={<DeleteOutlinedIcon />}
						selected={filter === "trash"}
					/>
				</List>
			</Drawer>
			<main className={classes.content}>
				{children}
			</main>
			<LabelEdit show={editLabels} close={() => setEditLabels(false)} />
		</div>
	);
};

const SidebarItem = ({label, icon, selected, onClick, open}) => {
	const classes = useStyles(open);
	return (
		<ListItem
			selected={selected}
			onClick={onClick}
			className={classes.menuItem}
			button>
			<ListItemIcon>
				{icon}
			</ListItemIcon>
			<ListItemText primary={label} />
		</ListItem>
	);
};
