import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";
import {grey, lightBlue} from "@material-ui/core/colors";

//light theme
const lightTheme = createMuiTheme({
	palette: {
		type: "light",
		primary: grey,
		secondary: lightBlue,
	},
	custom: {
		palette: {
			headerBG: "#FFF6",
			iconColor: "#5f6368",
			itemBorderColor: "#DDDDDD",
			iconHighlight: grey[900],
			notesCheckbox: grey[700],
			profilePopColor: "#FFF",
			noteBackground: {
				default: "#FFF",
				red: "#F28B82",
				orange: "#FBBC04",
				yellow: "#FFF475",
				green: "#CCFF90",
				cyan: "#A7FFEB",
				lightblue: "#CBF0F8",
				darkblue: "#AECBFA",
				purple: "#D7AEFB",
				pink: "#FDCFE8",
				brown: "#E6C9A8",
				grey: "#E8EAED",
			},
			noteColorCheck: "#0007",
			labelBackground: "#0002",
		},
	},
});

//dark theme
const darkTheme = createMuiTheme({
	palette: {
		background: {
			paper: "#303030",
		},
		type: "dark",
		primary: {
			main: "#202124",
		},
		secondary: {
			main: grey[200],
		},
	},
	custom: {
		palette: {
			headerBG: "#0006",
			iconColor: "#949596",
			itemBorderColor: "#5F6368",
			iconHighlight: "#888A8B",
			notesCheckbox: "#5F6368",
			profilePopColor: "#2D2E30",
			noteBackground: {
				default: "#303030",
				red: "#5C2B29",
				orange: "#614A19",
				yellow: "#635D18",
				green: "#345920",
				cyan: "#16504B",
				lightblue: "#2D555E",
				darkblue: "#1E3A5F",
				purple: "#42275E",
				pink: "#5B2245",
				brown: "#442F19",
				grey: "#3C3F43",
			},
			noteColorCheck: "#FFF7",
			labelBackground: "#0002",
		},
	},
});

export const light = responsiveFontSizes(lightTheme);
export const dark = responsiveFontSizes(darkTheme);
