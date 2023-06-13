import axios from "axios";
import { findOneFamily } from "./FamilyService";

const baseUrl = "http://localhost:8000/personagem";

export const createCharacter = async (data) => {
	const response = await axios
		.post(baseUrl, data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response) {
				return { errors: error.response.data.dadosErro };
			} else if (error.request) {
				console.error(error.request);
			} else {
				console.error(error.message);
			}
		});
	return response;
};

export const findAllCharacters = async (setData) => {
	axios.get(`${baseUrl}`).then((response) => {
		setData(response.data.personagens);
	});
};

export const findOneCharacter = async (id) => {
	const response = await axios
		.get(`${baseUrl}/${id}`)
		.then((response) => {
			return response.data.personagem;
		})
		.catch((error) => {
			if (error.response) {
				return { errors: error.response.data.dadosErro };
			} else if (error.request) {
				console.error(error.request);
			} else {
				console.error(error.message);
			}
		});
	return response;
};

export const updateCharacter = async (id, data) => {
	const response = await axios.put(`${baseUrl}/${id}`, data).catch((error) => {
		if (error.response) {
			return { errors: error.response.data.dadosErro };
		} else if (error.request) {
			console.error(error.request);
		} else {
			console.error(error.message);
		}
	});
	return response;
};

export const removeCharacter = async (id) => {
	const response = await axios.delete(`${baseUrl}/${id}`).catch((error) => {
		if (error.request) {
			console.error(error.request);
			return {};
		} else {
			console.error(error.message);
			return {};
		}
	});
	return response;
};

export const getFamilyName = async (character, setFamilyName) => {
	const response = await findOneFamily(character.idFamilia).then((family) => {
		setFamilyName(family.nome);
	});
	return response;
};
