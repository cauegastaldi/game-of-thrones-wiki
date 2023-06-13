import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import CharacterCard from "../Components/Card/CharacterCard";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { findAllCharacters, removeCharacter } from "../Api/Services/CharacterService";
import { useTheme } from "@emotion/react";

const CharactersPage = () => {
	const theme = useTheme();
	const [characters, setCharacters] = useState([]);
	const navigate = useNavigate();
	const location = useLocation();

	const loadData = () => {
		findAllCharacters(setCharacters);
	};

	useEffect(() => {
		if (location.state?.updatedCharacters) {
			setCharacters(location.state.updatedCharacters);
		} else {
			loadData();
		}
	}, [location.pathname]);

	const handleCharacterDeletion = async (id) => {
		try {
			await removeCharacter(id);
			loadData();
		} catch (error) {
			console.error(error);
		}
	};

	const handleCharacterEdit = (id) => {
		try {
			navigate(`/personagens/edit/${id}`);
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
						to="/personagens/add"
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
				{characters.map((character) => {
					return (
						<Grid item>
							<CharacterCard
								key={character.id}
								character={character}
								handleCharacterDeletion={() =>
									handleCharacterDeletion(character.id)
								}
								handleCharacterEdit={() => handleCharacterEdit(character.id)}
							/>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
};

export default CharactersPage;
