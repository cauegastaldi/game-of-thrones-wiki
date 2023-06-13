import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	TextField,
} from "@mui/material";
import style from "../../Assets/Styles/Form/FormStyle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { findAllFamilies } from "../../Api/Services/FamilyService";
import {
	createCharacter,
	findAllCharacters,
	updateCharacter,
} from "../../Api/Services/CharacterService";

const CharacterForm = ({ character }) => {
	const [families, setFamilies] = useState([]);
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		findAllFamilies(setFamilies);
		if (character) {
			findAllCharacters(setCharacters);
		}
	}, []);

	const schema = yup.object({
		nome: yup.string().required("Por favor, insira um nome válido"),
		sexo: yup.string().required("Por favor, selecione um gênero"),
		idFamilia: yup.string().required("Por favor, selecione uma família"),
		estadoVida: yup.string().required("Por favor, selecione um estado de vida"),
	});
	const form = useForm({
		defaultValues: {
			nome: character ? character.nome : "",
			sexo: character ? character.sexo : "",
			idFamilia: character ? character.idFamilia : "",
			estadoVida: character ? character.estadoVida : "",
			titulos: character ? character.titulos : "",
		},
		resolver: yupResolver(schema),
	});

	const { register, handleSubmit, formState, control } = form;
	const { errors } = formState;

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const formCharacter = {
			nome: data.nome,
			sexo: data.sexo,
			idFamilia: data.idFamilia,
			estadoVida: data.estadoVida,
			titulos: data.titulos,
		};

		try {
			if (character === null) {
				await createCharacter(formCharacter);
				navigate("/personagens");
			} else {
				await updateCharacter(character.id, formCharacter);
				const updatedCharacters = [...characters];
				formCharacter.id = character.id;

				updatedCharacters[characters.findIndex((c) => c.id == character.id)] =
					formCharacter;
				navigate("/personagens", { state: { updatedCharacters: updatedCharacters } });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			autoComplete="off"
			sx={style.form}
		>
			<FormControl error={errors.nome ? true : false}>
				<TextField
					{...register("nome")}
					required
					label="Nome"
					error={errors.nome ? true : false}
					size="small"
					variant="filled"
				/>
				{errors.nome && <FormHelperText>{errors.nome.message}</FormHelperText>}
			</FormControl>

			<FormControl error={errors.idFamilia ? true : false}>
				<InputLabel required>Familia</InputLabel>
				<Controller
					render={({ field }) => {
						return (
							<Select
								{...field}
								variant="filled"
								required
							>
								{families.map((family) => {
									return <MenuItem value={family.id}>{family.nome}</MenuItem>;
								})}
							</Select>
						);
					}}
					name="idFamilia"
					control={control}
				/>

				{errors.idFamilia && <FormHelperText>{errors.idFamilia.message}</FormHelperText>}
			</FormControl>

			<FormControl error={errors.sexo ? true : false}>
				<FormLabel required>Gênero</FormLabel>
				<Controller
					render={({ field }) => {
						return (
							<RadioGroup
								{...field}
								required
								row
								sx={{ color: "black" }}
							>
								<FormControlLabel
									value="Masculino"
									control={<Radio />}
									label="Masculino"
								/>
								<FormControlLabel
									value="Feminino"
									control={<Radio />}
									label="Feminino"
								/>
							</RadioGroup>
						);
					}}
					name="sexo"
					control={control}
				/>

				{errors.sexo && <FormHelperText>{errors.sexo.message}</FormHelperText>}
			</FormControl>

			<FormControl error={errors.estadoVida ? true : false}>
				<FormLabel required>Estado de vida</FormLabel>
				<Controller
					render={({ field }) => {
						return (
							<RadioGroup
								{...field}
								required
								row
								sx={{ color: "black" }}
							>
								<FormControlLabel
									value="Vivo"
									control={<Radio />}
									label="Vivo"
								/>
								<FormControlLabel
									value="Morto"
									control={<Radio />}
									label="Morto"
								/>
							</RadioGroup>
						);
					}}
					name="estadoVida"
					control={control}
				/>

				{errors.estadoVida && <FormHelperText>{errors.estadoVida.message}</FormHelperText>}
			</FormControl>

			<FormControl>
				<TextField
					{...register("titulos")}
					label="Títulos"
					size="small"
					variant="filled"
				/>
			</FormControl>

			<Button
				type="submit"
				variant="contained"
				disableRipple
				disableElevation
			>
				Salvar
			</Button>
		</Box>
	);
};

export default CharacterForm;
