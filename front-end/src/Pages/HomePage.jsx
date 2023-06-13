import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

const HomePage = () => {
	const theme = useTheme();

	return (
		<>
			<Box>
				<Typography sx={{ fontSize: "1.2rem", marginTop: theme.spacing(2) }}>
					Seja bem vindo à Game Of Thrones Wiki, um site dedicado à série de televisão,
					produzida pela HBO, Game Of Thrones. Neste site, você poderá ver, adicionar e
					editar informações sobre os personagens e famílias da série.
				</Typography>
			</Box>
		</>
	);
};

export default HomePage;
