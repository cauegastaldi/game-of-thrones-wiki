import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import { findAllFamilies, removeFamily } from "../Api/Services/FamilyService";
import FamilyCard from "../Components/Card/FamilyCard";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import AlertDialog from "../Components/Dialog/AlertDialog";

const FamiliesPage = () => {
	const theme = useTheme();

	const [families, setFamilies] = useState([]);
	const [isOpen, setOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const loadData = () => {
		findAllFamilies(setFamilies);
	};

	useEffect(() => {
		loadData();
	}, [location.pathname]);

	const handleFamilyDeletion = async (id) => {
		try {
			const response = await removeFamily(id);

			if (response.error?.codigoErro === "ERRO_PERSONAGENS_ASSOCIADOS") {
				setOpen(true);
			} else {
				loadData();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleFamilyEdit = (id) => {
		try {
			navigate(`/familias/edit/${id}`);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Grid
				container
				justifyContent={"flex-end"}
			>
				<Grid item>
					<Button
						component={Link}
						to="/familias/add"
						variant="contained"
						color="success"
						disableRipple
						sx={{ marginTop: theme.spacing(2) }}
					>
						Adicionar
					</Button>
				</Grid>
				<Grid item>
					<Outlet />
				</Grid>
			</Grid>
			<Grid
				container
				gap="20px"
			>
				{families.map((family) => {
					return (
						<Grid item>
							<FamilyCard
								key={family.id}
								family={family}
								handleFamilyDeletion={() => handleFamilyDeletion(family.id)}
								handleFamilyEdit={() => handleFamilyEdit(family.id)}
							/>
						</Grid>
					);
				})}
			</Grid>
			<AlertDialog
				isOpen={isOpen}
				setOpen={setOpen}
			>
				Família não pode ser removida, pois possui personagens associados a ela.
			</AlertDialog>
		</>
	);
};

export default FamiliesPage;
