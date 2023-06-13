import { Outlet } from "react-router-dom";
import { Box, Container, useTheme } from "@mui/material";
import "../Assets/Styles/Layout/index.css";

import NavBar from "../Components/NavBar";

const Layout = () => {
	const theme = useTheme();

	return (
		<>
			<NavBar />

			<Container
				component={"main"}
				sx={{
					marginTop: theme.spacing(8),
					p: 3,
					color: "#ffffff",
				}}
			>
				<Outlet />
			</Container>
		</>
	);
};

export default Layout;
