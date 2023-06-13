import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import image from "../../Assets/Images/families-got.jpg";
import { useState } from "react";
import CardButton from "../Button/CardButton";
import ConfirmationDialog from "../Dialog/ConfirmationDialog";

const FamilyCard = ({ family, handleFamilyDeletion, handleFamilyEdit }) => {
	const theme = useTheme();
	const [mouseIsOverCard, setMouseIsOverCard] = useState(false);
	const [open, setOpen] = useState(false);

	return (
		<>
			<Card
				onMouseOver={() => setMouseIsOverCard(true)}
				onMouseLeave={() => setMouseIsOverCard(false)}
				sx={{
					minWidth: 340,
					maxWidth: 340,
					cursor: "pointer",
					color: "white",
					backgroundColor: "#27272a",

					willChange: "transform",
					transition: ".3s all",
					"&:hover": {
						backgroundColor: "rgb(59, 59, 64)",
					},
					marginTop: theme.spacing(2),
				}}
			>
				<CardMedia
					sx={{ height: 140, backgroundSize: "cover", backgroundPosition: "center 40%" }}
					image={image}
				/>

				<CardContent>
					<Typography
						gutterBottom
						fontSize="1.4em"
						component="div"
						textAlign={"center"}
					>
						{family.nome}
					</Typography>
				</CardContent>
				<CardActions sx={{ display: "flex", justifyContent: "center" }}>
					<CardButton
						mouseIsOverCard={mouseIsOverCard}
						color={"error"}
						onClickButton={() => setOpen(true)}
					>
						Excluir
					</CardButton>
					<CardButton
						mouseIsOverCard={mouseIsOverCard}
						color={"warning"}
						onClickButton={handleFamilyEdit}
					>
						Editar
					</CardButton>
				</CardActions>
			</Card>
			<ConfirmationDialog
				isOpen={open}
				setOpen={setOpen}
				acceptAction={handleFamilyDeletion}
			>
				Tem certeza de que deseja deletar a família selecionada? A ação não poderá ser
				desfeita!
			</ConfirmationDialog>
		</>
	);
};

export default FamilyCard;
