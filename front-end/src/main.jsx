import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Router from "./Router.jsx";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
	typography: {
		fontFamily: ["Poppins", "Lato", "sans-serif"].join(","),
	},
	/*components: {
		MuiInputBase: {
			styleOverrides: {
				input: {
					border: "1px solid white",
					backgroundColor: "white",
					color: "white",
				},
			},
		},
	},*/
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<ThemeProvider theme={theme}>
		<RouterProvider router={Router} />
	</ThemeProvider>
);
