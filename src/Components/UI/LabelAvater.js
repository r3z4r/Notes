import React from "react";

import {useTheme} from "@material-ui/core";

export default ({letter}) => {
	const theme = useTheme();
	return (
		<svg
			width="24"
			height="20"
			viewBox="0 0 32 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M21.3992 2H5C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H21.4396C22.4056 22 23.3125 21.5348 23.8761 20.7503L30 12.2256L23.8722 3.30179C23.3127 2.48693 22.3877 2 21.3992 2Z"
				stroke={theme.palette.action.active}
				strokeWidth="2.4"
				fill="none"
			/>
			<text
				x="9"
				y="17"
				fontSize={12}
				fontWeight="bold"
				fill={theme.palette.text.secondary}>
				{letter.toUpperCase()}
			</text>
		</svg>
	);
};
