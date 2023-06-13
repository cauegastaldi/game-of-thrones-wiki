import { Box, Button, FormControl, FormHelperText, TextField } from "@mui/material";
import style from "../../Assets/Styles/Form/FormStyle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createFamily, updateFamily } from "../../Api/Services/FamilyService";
import { useNavigate } from "react-router-dom";

const FamilyForm = ({ family }) => {
	const schema = yup.object({
		nome: yup.string().required("Por favor, insira um nome válido"),
	});
	const form = useForm({
		defaultValues: { nome: family ? family.nome : "" },
		resolver: yupResolver(schema),
	});
	const { register, handleSubmit, formState, setError } = form;
	const { errors } = formState;

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const formFamily = { nome: data.nome };

		try {
			let response = null;
			if (family === null) {
				response = await createFamily(formFamily);
			} else {
				response = await updateFamily(family.id, formFamily);
			}
			if (response.errors?.codigoErro === "ERRO_FAMILIA_EXISTENTE") {
				setError("nome", { message: "Por favor, informe um nome não existente" });
			} else {
				navigate("/familias");
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

export default FamilyForm;
