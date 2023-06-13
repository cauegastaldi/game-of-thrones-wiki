import axios from "axios";

const baseUrl = "http://localhost:8000/familia";

export const createFamily = (data) => {
	const response = axios
		.post(baseUrl, data)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response) {
				return { errors: error.response.data };
			} else if (error.request) {
				console.error(error.request);
			} else {
				console.error(error.message);
			}
		});
	return response;
};

export const findAllFamilies = (setData) => {
	axios.get(`${baseUrl}`).then((response) => {
		setData(response.data.familias);
	});
};

export const findOneFamily = (id) => {
	const response = axios
		.get(`${baseUrl}/${id}`)
		.then((response) => {
			return response.data.familia;
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

export const updateFamily = async (id, data) => {
	const response = await axios.put(`${baseUrl}/${id}`, data).catch((error) => {
		if (error.response) {
			return { errors: error.response.data };
		} else if (error.request) {
			console.error(error.request);
			return {};
		} else {
			console.error(error.message);
			return {};
		}
	});
	return response;
};

export const removeFamily = async (id) => {
	const response = await axios.delete(`${baseUrl}/${id}`).catch((error) => {
		if (error.response) {
			return { error: error.response.data };
		} else if (error.request) {
			console.error(error.request);
			return {};
		} else {
			console.error(error.message);
			return {};
		}
	});

	return response;
};
