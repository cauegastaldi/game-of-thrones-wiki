import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material";
import logo from "../Assets/Images/logo-site.png";

const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

const navItems = [
	{ name: "Início", link: "/" },
	{ name: "Famílias", link: "familias" },
	{ name: "Personagens", link: "personagens" },
];

const NavBar = (props) => {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box
			onClick={handleDrawerToggle}
			sx={{ textAlign: "center" }}
		>
			<DrawerHeader>
				<IconButton sx={{ color: "white" }}>
					<CloseIcon />
				</IconButton>
			</DrawerHeader>
			<List>
				{navItems.map((item) => (
					<ListItem
						key={item.name}
						disablePadding
					>
						<ListItemButton
							component={Link}
							to={item.link}
							sx={{
								"&:hover": {
									backgroundColor: "#3a3b3c",
								},
							}}
						>
							<ListItemText
								primaryTypographyProps={{
									fontSize: "1rem",
									letterSpacing: "0.04em",
								}}
								primary={item.name}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar
				component="nav"
				sx={{
					boxSizing: "border-box",
					backgroundColor: "#27272a",
					color: "#ccc",
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Box
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
					>
						<Box
							component="img"
							src={logo}
							maxWidth="100px"
							maxHeight="80px"
						/>
					</Box>
					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						{navItems.map((item) => (
							<Button
								key={item.name}
								component={Link}
								to={item.link}
								disableRipple
								sx={{
									color: "#fff",
									"&:hover": {
										backgroundColor: "#3a3b3c",
									},

									fontSize: "1rem",
									letterSpacing: "0.04em",
									height: "84px",
								}}
							>
								{item.name}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: "100%",
							backgroundColor: "#27272a",
							color: "#ccc",
						},
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
};

export default NavBar;
