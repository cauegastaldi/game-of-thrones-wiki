const Familia = require("../models/Familia.js");

async function criar(familia) {
	const familiaCriada = await Familia.create({
		nome: familia.nome,
	});

	return familiaCriada;
}

async function editar(familia) {
	await familia.save();
}

async function deletar(familia) {
	await familia.destroy();
}

async function listarUm(id) {
	return await Familia.findByPk(id);
}

async function listarPorNome(nome) {
	return await Familia.findOne({ where: { nome: nome } });
}

async function listarTodos() {
	let resultado = await Familia.findAll();

	resultado = resultado.map(function (familia) {
		return familia.dataValues;
	});

	return resultado;
}

module.exports = { criar, editar, deletar, listarUm, listarPorNome, listarTodos };
