import React from "react";

import {IconButton, Tooltip} from "@material-ui/core";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";

export default ({isArchived, setLabels}) => {
	return (
		<Tooltip title={isArchived ? "Unarchive" : "Archive"}>
			<IconButton
				aria-label="archive"
				onClick={e => {
					e.stopPropagation();
					setLabels("archive");
				}}>
				{isArchived
					? <UnarchiveOutlinedIcon style={{fontSize: 18}} />
					: <ArchiveOutlinedIcon style={{fontSize: 18}} />}
			</IconButton>
		</Tooltip>
	);
};
